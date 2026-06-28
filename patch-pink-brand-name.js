const fs = require('fs');
const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

const css = `
/* Quvirl pink brand name */
.brandText b,.miniBrand,.miniBrand span,.sideBrand,.sideBrand span,.brandTrend,.brandWord{
  color:#ff4fd8!important;
  -webkit-text-fill-color:#ff4fd8!important;
}
.brandText b{
  text-shadow:0 0 18px rgba(255,79,216,.35)!important;
}
`;

html = html.replace(/\/\* Quvirl pink brand name \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace('</style>', css + '\n</style>');

fs.writeFileSync(file, html, 'utf8');
console.log('Applied pink Quvirl brand name.');
