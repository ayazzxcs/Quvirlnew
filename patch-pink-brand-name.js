const fs = require('fs');
const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

// Split visible Quvirl brand into Qu + virl where possible.
html = html.replace(/<b>Quvirl<\/b>/g, '<b><span class="brandQu">Qu</span><span class="brandVirl">virl</span></b>');
html = html.replace(/>Quvirl</g, '><span class="brandQu">Qu</span><span class="brandVirl">virl</span><');

const css = `
/* Quvirl split brand name: Qu white, virl pink */
.brandText b,.miniBrand,.sideBrand,.brandTrend,.brandWord{
  color:#ffffff!important;
  -webkit-text-fill-color:#ffffff!important;
}
.brandQu,.brandVirl{
  display:inline!important;
  white-space:nowrap!important;
  line-height:1!important;
}
.brandText b .brandQu,.brandText b .brandVirl,.miniBrand .brandQu,.miniBrand .brandVirl,.sideBrand .brandQu,.sideBrand .brandVirl{
  display:inline!important;
}
.brandQu{
  color:#ffffff!important;
  -webkit-text-fill-color:#ffffff!important;
  text-shadow:none!important;
}
.brandVirl{
  color:#ff4fd8!important;
  -webkit-text-fill-color:#ff4fd8!important;
  text-shadow:none!important;
}
.brandText b{
  display:block!important;
  font-size:34px!important;
  line-height:1!important;
  letter-spacing:-.8px!important;
  white-space:nowrap!important;
  text-shadow:none!important;
}
.miniBrand{
  font-size:20px!important;
  line-height:1!important;
  white-space:nowrap!important;
  text-shadow:none!important;
}
.sideBrand{
  white-space:nowrap!important;
  text-shadow:none!important;
}
@media(max-width:700px){
  .brandText b{font-size:32px!important;line-height:1!important}
  .miniBrand{font-size:20px!important}
}
`;

html = html.replace(/\/\* Quvirl pink brand name \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace(/\/\* Quvirl split brand name: Qu white, virl pink \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace('</style>', css + '\n</style>');

fs.writeFileSync(file, html, 'utf8');
console.log('Applied split Quvirl brand name: Qu white, virl pink, no glow, larger hero brand.');
