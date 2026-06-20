const fs = require('fs');
const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

html = html
  .replace(/<h2>SEO Research Pages<\/h2>/g, '<h2>Other Helpful Pages</h2>')
  .replace(/Explore dedicated DropTrend pages built for product discovery and Google indexing\./g, 'Explore more DropTrend guides, product lists and research pages for dropshipping ideas.')
  .replace(/<b>Best Products 2026<\/b><span>Programmatic product guide<\/span>/g, '<b>Best Products 2026</b><span>Product research guide</span>');

fs.writeFileSync(file, html, 'utf8');
console.log('Updated homepage Other Helpful Pages copy.');
