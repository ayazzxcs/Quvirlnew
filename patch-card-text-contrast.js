const fs = require('fs');
const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

const css = `
/* Product card text contrast fix */
.card .muted,
.card .small,
.card .title + .muted,
.card .body > .muted,
.card .row,
.card .row span,
.card .metric span,
.card .m span,
.card p,
.card li,
.card .reason,
.card .why,
.card .whyBox,
.card .whyBox *{
  color:#f0f6fc!important;
  opacity:.92!important;
}
.card .metric,
.card .m{
  color:#f0f6fc!important;
}
.card .metric b,
.card .m b,
.card .title,
.card b,
.card strong{
  color:#ffffff!important;
  opacity:1!important;
}
.card .profit,
.card .result,
.card .scoreRing b{
  color:#6ee7b7!important;
}
.card .money span,
.card .metric span{
  color:#dbeafe!important;
}
.card .pill,
.card .winBadge,
.card .visualChip{
  color:#bfffe8!important;
}
`;

html = html.replace(/\/\* Product card text contrast fix \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace('</style>', css + '\n</style>');

fs.writeFileSync(file, html, 'utf8');
console.log('Applied product card text contrast fix.');
