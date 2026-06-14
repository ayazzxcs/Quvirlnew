const fs = require('fs');
const path = require('path');

const SITE_URL = (process.env.SITE_URL || 'https://YOUR-DOMAIN.com').replace(/\/$/, '');
const PRODUCTS_URL = process.env.PRODUCTS_URL || 'https://raw.githubusercontent.com/ayazzxcs/Droptrendv2-backend/main/products.json';
const MAX_PRODUCT_PAGES = Number(process.env.MAX_PRODUCT_PAGES || 1000);

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function num(v) {
  if (v === null || v === undefined || v === '') return 0;
  const n = Number(String(v).replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function cleanProductName(value) {
  let s = Array.isArray(value) ? value.filter(Boolean).join(' ') : String(value ?? '');
  s = s.trim();
  if ((s.startsWith('[') && s.endsWith(']')) || s.includes('\",\"') || s.includes("','")) {
    try {
      const parsed = JSON.parse(s.replace(/'/g, '"'));
      if (Array.isArray(parsed)) s = parsed.filter(Boolean).join(' ');
    } catch (e) {
      s = s.replace(/^\s*\[+/, '').replace(/\]+\s*$/, '').replace(/["']/g, '').replace(/,/g, ' ');
    }
  }
  return s.replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim() || 'Untitled product';
}

function first(...vals) {
  for (const v of vals) if (v !== undefined && v !== null && v !== '') return v;
  return '';
}

function proof(p) {
  return p?.trendProof || p?.proof || {};
}

function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'product';
}

function normalize(raw) {
  const name = cleanProductName(first(raw.name, raw.productName, raw.title, raw.raw?.productName, 'Untitled product'));
  const category = first(raw.category, raw.categoryName, raw.raw?.categoryName, 'General');
  const image = first(raw.image, raw.productImage, raw.raw?.productImage, '');
  const supplierUrl = first(raw.supplierUrl, raw.productUrl, raw.raw?.productUrl, 'https://www.cjdropshipping.com/');
  const cost = num(first(raw.cost, raw.supplierPrice, raw.raw?.sellPrice, proof(raw).cjSupplier?.price));
  const sell = num(first(raw.sell, raw.suggestedPrice, raw.salePrice)) || Math.max(9.99, cost * 2.2);
  const profit = num(first(raw.profit, sell - cost - num(raw.shipping)));
  const margin = sell ? Math.round((profit / sell) * 100) : 0;
  const google = proof(raw).googleTrends || {};
  const amazon = proof(raw).amazon || {};
  const cj = proof(raw).cjSupplier || {};
  return {
    ...raw,
    name,
    category,
    image,
    supplierUrl,
    cost,
    sell,
    profit,
    margin,
    score: num(first(raw.dropTrendScore, raw.trend, raw.winningScore)),
    googleGrowth: num(first(google.growthPercent, raw.googleGrowth)),
    amazonScore: num(first(amazon.score, raw.amazonScore, raw.amazonDemandScore)),
    amazonRating: first(amazon.bestRating, raw.bestRating, ''),
    amazonReviews: num(first(amazon.bestRatingsTotal, raw.bestRatingsTotal, 0)),
    cjScore: num(first(cj.score, raw.cjScore, raw.cjSupplierScore)),
    confidence: first(proof(raw).confidence, raw.confidence, 'Low')
  };
}

function formatGrowth(n) {
  n = Math.round(num(n));
  if (!n) return 'No Google growth signal matched';
  return n > 0 ? `Google searches up ${n}%` : `Google searches down ${Math.abs(n)}%`;
}

function pageTemplate(p, url) {
  const title = `${p.name} - Trending Dropshipping Product | DropTrend`;
  const desc = `${p.name} trend research: DropTrend score ${p.score}/100, ${formatGrowth(p.googleGrowth)}, Amazon demand ${p.amazonScore || 0}/100, CJ supplier score ${p.cjScore || 0}/100.`;
  const imgTag = p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">` : '';
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    image: p.image ? [p.image] : undefined,
    category: p.category,
    description: desc,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: p.sell || p.cost || 0,
      availability: 'https://schema.org/InStock',
      url
    }
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${esc(url)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="product">
${p.image ? `<meta property="og:image" content="${esc(p.image)}">` : ''}
<style>
body{margin:0;font-family:Inter,system-ui,Arial,sans-serif;background:#0b1020;color:#edf2ff;line-height:1.6}.wrap{max-width:980px;margin:auto;padding:24px}.card{background:#101832;border:1px solid #26345e;border-radius:22px;padding:22px}a{color:#6ee7b7}.grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.hero img{width:100%;border-radius:18px;background:#111}.pill{display:inline-block;background:#1a254a;color:#cbd5ff;padding:7px 10px;border-radius:999px;margin:4px}.metric{background:#0a1128;border:1px solid #26345e;border-radius:14px;padding:12px;margin:8px 0}.metric b{color:#6ee7b7}@media(max-width:700px){.grid{grid-template-columns:1fr}}
</style>
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>
</head>
<body>
<div class="wrap">
<p><a href="/">← Back to DropTrend</a></p>
<div class="card hero">
  <div class="grid">
    <div>${imgTag}</div>
    <div>
      <h1>${esc(p.name)}</h1>
      <p><span class="pill">${esc(p.category)}</span><span class="pill">Confidence: ${esc(p.confidence)}</span></p>
      <div class="metric">DropTrend Score: <b>${p.score}/100</b></div>
      <div class="metric">Google Trends: <b>${esc(formatGrowth(p.googleGrowth))}</b></div>
      <div class="metric">Amazon Demand: <b>${p.amazonScore || 0}/100</b>${p.amazonReviews ? ` • ${p.amazonReviews.toLocaleString()} reviews` : ''}${p.amazonRating ? ` • ${esc(p.amazonRating)}★` : ''}</div>
      <div class="metric">CJ Supplier Score: <b>${p.cjScore || 0}/100</b></div>
      <div class="metric">Estimated Profit: <b>$${Number(p.profit || 0).toFixed(2)}</b> • Margin: <b>${p.margin}%</b></div>
      <p><a href="${esc(p.supplierUrl)}" target="_blank" rel="noopener">Open CJ supplier</a></p>
    </div>
  </div>
</div>
<section class="card" style="margin-top:22px">
<h2>Why this product appears on DropTrend</h2>
<p>${esc(p.name)} is included because it matched DropTrend's product research system combining Google Trends signals, Amazon demand validation and CJdropshipping supplier data.</p>
<p>This page is for dropshipping product research and does not mean the exact CJ SKU is officially sold by Amazon or endorsed by Google, Amazon or CJdropshipping.</p>
</section>
</div>
</body>
</html>`;
}

async function loadProducts() {
  if (fs.existsSync('products.json')) {
    return JSON.parse(fs.readFileSync('products.json', 'utf8'));
  }
  const res = await fetch(PRODUCTS_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return await res.json();
}

async function main() {
  const data = await loadProducts();
  const products = (Array.isArray(data) ? data : data.products || [])
    .map(normalize)
    .filter(p => p.name && p.image && p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_PRODUCT_PAGES);

  const sitemap = [`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, `  <url><loc>${SITE_URL}/</loc><priority>1.0</priority></url>`];
  const used = new Set();
  for (const p of products) {
    let slug = slugify(p.name);
    let baseSlug = slug;
    let i = 2;
    while (used.has(slug)) slug = `${baseSlug}-${i++}`;
    used.add(slug);
    const dir = path.join('product', slug);
    fs.mkdirSync(dir, { recursive: true });
    const url = `${SITE_URL}/product/${slug}/`;
    fs.writeFileSync(path.join(dir, 'index.html'), pageTemplate(p, url), 'utf8');
    sitemap.push(`  <url><loc>${url}</loc><priority>0.7</priority></url>`);
  }
  sitemap.push(`</urlset>`);
  fs.writeFileSync('sitemap.xml', sitemap.join('\n'), 'utf8');
  console.log(`Generated ${products.length} product SEO pages and sitemap.xml`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
