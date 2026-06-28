const fs = require('fs');
const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

const css = `
/* Product card animation fix: show cards immediately */
.card,.grid .card,.winnerGrid .card,.motion-ready .card,.motion-ready .dt-in.card{
  opacity:1!important;
  visibility:visible!important;
  transform:none!important;
  animation:none!important;
}
.card::after{display:none!important;animation:none!important}
.card:hover{transform:translateY(-3px)!important}
.img img{opacity:1!important;visibility:visible!important}
.grid,.winnerGrid{min-height:0!important;overflow:visible!important}
.premiumTrending,.winningPanel{overflow:visible!important}
@media(max-width:700px){
  .card,.grid .card,.winnerGrid .card,.motion-ready .card,.motion-ready .dt-in.card{opacity:1!important;visibility:visible!important;transform:none!important;animation:none!important}
  .card:hover{transform:none!important}
}
`;

html = html.replace(/\/\* Product card animation fix: show cards immediately \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace('</style>', css + '\n</style>');

fs.writeFileSync(file, html, 'utf8');
console.log('Disabled product-card reveal animation so cards show immediately.');
