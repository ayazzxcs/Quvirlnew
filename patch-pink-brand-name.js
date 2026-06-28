const fs = require('fs');
const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

// Reset old split markup, then split visible Quvirl brand into Qu + virl.
html = html.replace(/<span class="brandQu">Qu<\/span><span class="brandVirl">virl<\/span>/g, 'Quvirl');
html = html.replace(/<b>Quvirl<\/b>/g, '<b><span class="brandQu">Qu</span><span class="brandVirl">virl</span></b>');
html = html.replace(/>Quvirl</g, '><span class="brandQu">Qu</span><span class="brandVirl">virl</span><');

const css = `
/* Quvirl split brand name final: Qu white, virl pink */
.brandQu,.brandVirl,
.brandText b .brandQu,.brandText b .brandVirl,
.miniBrand .brandQu,.miniBrand .brandVirl,
.sideBrand .brandQu,.sideBrand .brandVirl{
  display:inline!important;
  white-space:nowrap!important;
  line-height:1!important;
  text-shadow:none!important;
}
.brandQu,.brandText b .brandQu,.miniBrand .brandQu,.sideBrand .brandQu{
  color:#ffffff!important;
  -webkit-text-fill-color:#ffffff!important;
}
.brandVirl,.brandText b .brandVirl,.miniBrand .brandVirl,.sideBrand .brandVirl{
  color:#ff4fd8!important;
  -webkit-text-fill-color:#ff4fd8!important;
}
.brandLogo .brandText b,
.hero .brandLogo .brandText b,
.heroCard .brandLogo .brandText b{
  display:block!important;
  font-size:72px!important;
  line-height:1!important;
  letter-spacing:-2px!important;
  white-space:nowrap!important;
  text-shadow:none!important;
  font-weight:950!important;
}
.brandLogo .brandText b .brandQu,
.brandLogo .brandText b .brandVirl,
.hero .brandLogo .brandText b .brandQu,
.hero .brandLogo .brandText b .brandVirl,
.heroCard .brandLogo .brandText b .brandQu,
.heroCard .brandLogo .brandText b .brandVirl{
  font-size:inherit!important;
  line-height:inherit!important;
  font-weight:inherit!important;
}
.miniBrand{
  font-size:22px!important;
  line-height:1!important;
  white-space:nowrap!important;
  text-shadow:none!important;
}
.sideBrand{
  white-space:nowrap!important;
  text-shadow:none!important;
}
@media(max-width:700px){
  .brandLogo .brandText b,
  .hero .brandLogo .brandText b,
  .heroCard .brandLogo .brandText b{font-size:54px!important;line-height:1!important;letter-spacing:-1.5px!important}
  .miniBrand{font-size:22px!important}
}
`;

html = html.replace(/\/\* Quvirl pink brand name \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace(/\/\* Quvirl split brand name: Qu white, virl pink \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace(/\/\* Quvirl split brand name final: Qu white, virl pink \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace('</style>', css + '\n</style>');

fs.writeFileSync(file, html, 'utf8');
console.log('Applied final split Quvirl brand name: Qu white, virl pink, no glow, much bigger hero brand.');
