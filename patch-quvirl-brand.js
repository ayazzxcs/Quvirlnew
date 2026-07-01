const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const TEXT_EXTS = new Set(['.html', '.xml', '.txt', '.json']);

function read(file) { return fs.readFileSync(file, 'utf8'); }
function write(file, text) { fs.writeFileSync(file, text, 'utf8'); }
function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (TEXT_EXTS.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}
function replaceBrandText(text) {
  return text
    .replace(/DropTrend v2/g, 'Quvirl')
    .replace(/DropTrend Score/g, 'Quvirl Score')
    .replace(/DropTrend score/g, 'Quvirl score')
    .replace(/DropTrend scoring/g, 'Quvirl scoring')
    .replace(/DropTrend Signal Engine/g, 'Quvirl Signal Engine')
    .replace(/DropTrend guides/g, 'Quvirl guides')
    .replace(/DropTrend/g, 'Quvirl')
    .replace(/Droptrend/g, 'Quvirl')
    .replace(/Drop trend/g, 'Quvirl')
    .replace(/Drop\s*Trend/g, 'Quvirl')
    .replace(/droptrend score/gi, 'Quvirl score')
    .replace(/Drop<span class="brandWord">Trend<\/span>/g, 'Quvirl')
    .replace(/<b>Drop<\/b>\s*<span[^>]*>Trend<\/span>/g, '<b>Quvirl</b>')
    .replace(/<span>Drop<\/span>\s*<span[^>]*>Trend<\/span>/g, '<span>Quvirl</span>');
}

let changed = 0;
for (const file of walk(ROOT)) {
  const before = read(file);
  const after = replaceBrandText(before);
  if (after !== before) { write(file, after); changed++; }
}

const home = path.join(ROOT, 'index.html');
if (fs.existsSync(home)) {
  let html = read(home);

  html = html.replace(/<div class="brandLogo">[\s\S]*?<\/div>\s*<\/div>\s*<div class="badge">/, `<div class="brandLogo">
  <div class="brandMark" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="#0C447C"/>
<path d="M16 44 L30 30 L40 38 L52 18" stroke="#378ADD" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="10" y="34" width="13" height="13" rx="3" fill="#B5D4F4"/>
</svg></div>
  <div class="brandText"><b><span class="brandQu">Qu</span><span class="brandVirl">virl</span></b><span>Discover Winning Products Before Everyone Else</span></div>
</div>

<div class="badge">`);

  html = html.replace(/<span class="brandQu">Qu<\/span><span class="brandVirl">virl<\/span>/g, 'Quvirl');
  html = html.replace(/<b>Quvirl<\/b>/g, '<b><span class="brandQu">Qu</span><span class="brandVirl">virl</span></b>');
  html = html.replace(/>Quvirl</g, '><span class="brandQu">Qu</span><span class="brandVirl">virl</span><');

  const hubMarkup = `<section class="quvirlSignalHub" aria-label="Quvirl signal hub">
  <div class="hubMap" aria-hidden="true">
    <div class="hubWire wGoogle"></div><div class="hubWire wAmazon"></div><div class="hubWire wCJ"></div>
    <div class="hubCore"><b><span class="brandQu">Qu</span><span class="brandVirl">virl</span></b><small>Signal Hub</small></div>
    <div class="hubNode nGoogle">Google<br><small>Trends</small></div>
    <div class="hubNode nAmazon">Amazon<br><small>Demand</small></div>
    <div class="hubNode nCJ">CJ<br><small>Supplier</small></div>
  </div>
</section>`;

  html = html.replace(/<section class="quvirlSignalHub"[\s\S]*?<\/section>\s*/g, '');
  html = html.replace(/<p class="small" id="apiStatus"/, hubMarkup + '\n<p class="small" id="apiStatus"');

  const css = `
/* Quvirl consolidated final styling - Wix clean landing style */
:root{--accent:#0c447c!important;--brand-blue:#0c447c!important;--brand-sky:#378add!important;--brand-soft:#b5d4f4!important;--text-dark:#1f2937!important;--text-muted:#5f6b7a!important;--light-border:#e5e7eb!important;--light-bg:#ffffff!important}
html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important;background:#ffffff!important;color:var(--text-dark)!important;font-family:Inter,system-ui,Segoe UI,Arial,sans-serif!important}.dynamicBg,.bgSpark,.bg-orb,body::before,body::after,.wrap::before,.wrap::after{display:none!important;content:none!important;background:none!important;animation:none!important}.wrap{width:100%!important;max-width:1180px!important;margin:auto!important;padding:0 26px 34px!important;box-sizing:border-box!important;position:relative!important;z-index:2!important}
.topNav{position:sticky!important;top:0!important;z-index:60!important;margin:0 -26px 0!important;padding:15px 26px!important;border-radius:0!important;background:#ffffff!important;border:0!important;border-bottom:1px solid #edf0f4!important;box-shadow:0 8px 24px rgba(15,23,42,.05)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}.miniBrand{font-size:27px!important;font-weight:900!important;color:#111827!important;letter-spacing:-.8px!important}.miniMark,.menuBtnLabel{background:#ffffff!important;color:#111827!important;border:1px solid #e5e7eb!important;box-shadow:none!important;border-radius:12px!important}.navPill{background:#ffffff!important;color:#374151!important;border:1px solid #e5e7eb!important;box-shadow:none!important}
.hero{display:block!important;text-align:left!important;min-height:auto!important;padding:78px 0 48px!important;position:relative!important;overflow:hidden!important;background:#ffffff!important}.hero>*{position:relative!important;z-index:2!important}.hero::before{content:""!important;display:block!important;position:absolute!important;right:-120px!important;top:82px!important;width:520px!important;height:520px!important;border-radius:42px!important;background:radial-gradient(circle at 45% 45%,rgba(12,68,124,.18),transparent 38%),linear-gradient(135deg,#f3f7ff,#ffffff)!important;border:1px solid #eef2f7!important;box-shadow:0 28px 80px rgba(12,68,124,.10)!important;transform:rotate(4deg)!important;pointer-events:none!important}.hero::after{content:""!important;display:block!important;position:absolute!important;right:35px!important;top:210px!important;width:300px!important;height:210px!important;border-radius:26px!important;background:linear-gradient(135deg,#0c447c,#378add)!important;box-shadow:0 20px 55px rgba(12,68,124,.25)!important;transform:rotate(-6deg)!important;pointer-events:none!important;opacity:.92!important}.brandLogo{justify-content:flex-start!important;align-items:center!important;margin:0 0 24px!important}.brandMark{width:48px!important;height:48px!important;border-radius:12px!important;background:#0c447c!important;box-shadow:none!important;border:0!important}.brandText b,.brandLogo .brandText b,.hero .brandLogo .brandText b,.heroCard .brandLogo .brandText b{display:block!important;font-size:34px!important;line-height:1!important;letter-spacing:-1px!important;font-weight:900!important;text-shadow:none!important;white-space:nowrap!important}.brandText span{color:#6b7280!important;-webkit-text-fill-color:#6b7280!important;font-size:14px!important}.brandQu{color:#111827!important;-webkit-text-fill-color:#111827!important}.brandVirl{color:#0c447c!important;-webkit-text-fill-color:#0c447c!important}
h1{max-width:760px!important;margin:18px 0 18px!important;font-size:clamp(48px,7vw,86px)!important;line-height:1.05!important;letter-spacing:-3px!important;font-weight:500!important;color:#2f343b!important;-webkit-text-fill-color:#2f343b!important;text-shadow:none!important}.lead{max-width:640px!important;margin:0!important;font-size:20px!important;line-height:1.6!important;color:#4b5563!important;-webkit-text-fill-color:#4b5563!important}.badge{display:inline-flex!important;background:#ffffff!important;color:#0c447c!important;-webkit-text-fill-color:#0c447c!important;border:1px solid #dbeafe!important;box-shadow:none!important;border-radius:999px!important;padding:9px 14px!important;font-weight:800!important}
.stats{max-width:760px!important;margin:28px 0 0!important;grid-template-columns:repeat(3,1fr)!important;gap:14px!important}.stat,.signalCard,.panel,.premiumTrending,.winningPanel,.toolbar,.card,.trendLink,.m,.metric,.siteChip{background:#ffffff!important;border:1px solid #e5e7eb!important;border-radius:18px!important;box-shadow:0 12px 32px rgba(15,23,42,.06)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:hidden!important;color:#1f2937!important}.stat b,.signalCard b,.m b,.metric b,.card b,.card strong,.title,.sectionTitle h2,.winningHead h2,.premiumTrending h2,.panel h2,h2,h3{color:#111827!important;-webkit-text-fill-color:#111827!important}.stat span,.muted,.small,.rateText,.premiumTrending p,.winningHead p,.card .muted,.card .small,.metric span,.m span,.footer,.footer *,.sectionTitle p{color:#6b7280!important;-webkit-text-fill-color:#6b7280!important;opacity:1!important}
.currencyBox{justify-content:flex-start!important;margin-top:18px!important}.currencyBtn,input,select,button{background:#ffffff!important;border:1px solid #d1d5db!important;border-radius:12px!important;color:#111827!important;box-shadow:none!important}.currencyBtn.active,button{background:#0c447c!important;border-color:#0c447c!important;color:#ffffff!important;-webkit-text-fill-color:#ffffff!important;font-weight:800!important}.btn2,.currencyBtn:not(.active){background:#ffffff!important;color:#111827!important;-webkit-text-fill-color:#111827!important}.toolbar{margin:28px 0!important;padding:14px!important;grid-template-columns:1.6fr repeat(3,1fr)!important;position:relative!important;z-index:5!important}
.signalPanel{max-width:760px!important;margin:24px 0 0!important;grid-template-columns:1fr 1fr!important;gap:14px!important}.signalCard span{color:#0c447c!important;-webkit-text-fill-color:#0c447c!important;font-weight:900!important}.signalBar{background:#edf2f7!important;border:1px solid #e5e7eb!important}.signalBar i{background:linear-gradient(90deg,#0c447c,#378add)!important;box-shadow:none!important;animation:none!important}.visualChip,.pill,.winBadge{background:#f3f7ff!important;border:1px solid #dbeafe!important;color:#0c447c!important;-webkit-text-fill-color:#0c447c!important;border-radius:999px!important}.scoreRing{background:conic-gradient(#0c447c calc(var(--score)*1%),#e5e7eb 0)!important}.scoreRing::before{background:#ffffff!important;border:1px solid #e5e7eb!important}.scoreRing b,.profit,.result{color:#0c447c!important;-webkit-text-fill-color:#0c447c!important}
.premiumTrending,.winningPanel,.panel{margin-top:30px!important;padding:22px!important}.trendLinks{gap:14px!important}.grid,.winnerGrid{gap:20px!important}.card{border-radius:22px!important;transition:transform .18s ease,box-shadow .18s ease!important}.card:hover,.trendLink:hover,.stat:hover,.signalCard:hover{transform:translateY(-3px)!important;box-shadow:0 18px 42px rgba(15,23,42,.10)!important;border-color:#c7d2fe!important}.img{height:220px!important;margin:12px 12px 0!important;border-radius:16px!important;background:#f3f4f6!important}.img img{border-radius:16px!important}.body{padding:16px!important}.score{background:rgba(17,24,39,.82)!important;color:#ffffff!important;border:0!important}.save{background:#ffffff!important;color:#111827!important;border:1px solid #e5e7eb!important}.quvirlSignalHub{display:none!important}
.sideMenu{background:#ffffff!important;color:#111827!important;border-right:1px solid #e5e7eb!important;box-shadow:25px 0 70px rgba(15,23,42,.14)!important}.sideHead,.menuItem{border-color:#eef2f7!important}.menuItem,.menuItem b,.sideBrand,.sideBrand span{color:#111827!important}.menuItem span,.chev,.menuSubTitle{color:#6b7280!important}.menuItem:hover{background:#f8fafc!important}.menuIcon{background:#eef6ff!important;color:#0c447c!important}.siteChip{background:#ffffff!important;color:#111827!important}.siteChip small{color:#6b7280!important}
.motion-ready .topNav,.motion-ready .hero,.motion-ready .premiumTrending,.motion-ready .winningPanel,.motion-ready .sectionTitle,.motion-ready .panel,.motion-ready .dt-in,.motion-ready .card{animation:none!important;opacity:1!important;transform:none!important}.card::before,.stat::before,.toolbar::before,.winningPanel::before,.premiumTrending::before,.signalCard::before,.trendLink::before{display:none!important;content:none!important}
@media(max-width:700px){.wrap{padding:0 16px 28px!important}.topNav{margin:0 -16px!important;padding:12px 16px!important}.hero{padding:46px 0 28px!important;text-align:left!important}.hero::before{right:-180px!important;top:90px!important;width:360px!important;height:360px!important;opacity:.65!important}.hero::after{right:-38px!important;top:230px!important;width:160px!important;height:120px!important;border-radius:18px!important;opacity:.65!important}.brandLogo .brandText b,.hero .brandLogo .brandText b,.heroCard .brandLogo .brandText b{font-size:30px!important}h1{font-size:clamp(38px,11vw,58px)!important;line-height:1.08!important;letter-spacing:-1.8px!important}.lead{font-size:16px!important;max-width:100%!important}.stats{grid-template-columns:1fr!important;width:100%!important}.currencyBox{justify-content:flex-start!important}.signalPanel{grid-template-columns:1fr!important;width:100%!important;max-width:100%!important}.toolbar{grid-template-columns:1fr!important;width:100%!important}.premiumTrending,.winningPanel,.panel{padding:16px!important}.trendLinks{grid-template-columns:1fr!important}.winnerGrid,.grid{grid-template-columns:1fr!important;width:100%!important}.card{width:100%!important;max-width:100%!important;display:block!important}.img{height:230px!important;margin:10px 10px 0!important}.body{padding:14px!important}.actions{grid-template-columns:1fr!important}.metricGrid,.money{grid-template-columns:1fr 1fr!important}}
`;

  html = html.replace(/\/\* Quvirl consolidated final styling[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Quvirl brand:[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Quvirl brand cleanup:[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Quvirl blue-only brand cleanup \*\/[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Old mint green theme override \*\/[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Product card animation fix: show cards immediately \*\/[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Product card text contrast fix \*\/[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Remove grey text across site \*\/[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Quvirl split brand name[^*]*\*\/[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace('</style>', css + '\n</style>');
  write(home, html);
}

console.log(`Applied Quvirl branding with Wix clean landing style inside existing patch. Text-updated files: ${changed}.`);
