const fs = require('fs');
const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

const oldGreenCss = `
/* Old mint green theme override */
:root{--accent:#6ee7b7!important;--gh-green:#22c55e!important;--gh-green2:#6ee7b7!important}
.badge,.navPill,.winBadge,.visualChip,.pill{background:rgba(110,231,183,.14)!important;border-color:rgba(110,231,183,.34)!important;color:#6ee7b7!important}
.currencyBtn.active,button{background:linear-gradient(135deg,#22c55e,#14b8a6)!important;border-color:rgba(110,231,183,.45)!important;color:#04110c!important}
.signalCard span{color:#6ee7b7!important}.signalBar i{background:linear-gradient(90deg,#22c55e,#14b8a6,#6ee7b7)!important;box-shadow:0 0 16px rgba(110,231,183,.48)!important}
.scoreRing{background:conic-gradient(#6ee7b7 calc(var(--score)*1%),rgba(255,255,255,.10) 0)!important}.scoreRing b,.profit,.result{color:#6ee7b7!important}
.card:hover,.signalCard:hover,.trendLink:hover,.stat:hover{border-color:#6ee7b7!important;box-shadow:0 28px 80px rgba(0,0,0,.60),0 0 0 1px rgba(110,231,183,.24)!important}
`;

html = html.replace(/\/\* Old mint green theme override \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace('</style>', oldGreenCss + '\n</style>');
fs.writeFileSync(file, html, 'utf8');
console.log('Applied old mint green theme override.');
