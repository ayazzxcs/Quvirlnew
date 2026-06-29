const fs = require('fs');
const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

html = html.replace(/<section class="quvirlSignalHub"[\s\S]*?<\/section>\s*/g, '');
html = html.replace(/\/\* Signal hub side-layout final override \*\/[\s\S]*?(?=<\/style>)/g, '');

fs.writeFileSync(file, html, 'utf8');
console.log('Removed Quvirl signal hub section.');
