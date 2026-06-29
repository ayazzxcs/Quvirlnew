const fs = require('fs');
const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

const hub = `<section class="quvirlSignalHub" aria-label="Quvirl signal hub">
  <div class="hubMap" aria-hidden="true">
    <div class="hubWire wGoogle"></div><div class="hubWire wAmazon"></div><div class="hubWire wCJ"></div>
    <div class="hubCore"><b><span class="brandQu">Qu</span><span class="brandVirl">virl</span></b><small>Signal Hub</small></div>
    <div class="hubNode nGoogle">Google<br><small>Trends</small></div>
    <div class="hubNode nAmazon">Amazon<br><small>Demand</small></div>
    <div class="hubNode nCJ">CJ<br><small>Supplier</small></div>
  </div>
  <div class="hubDetails">
    <span>Real market signal stack</span>
    <h2>See why a product is worth testing before spending money.</h2>
    <p>Quvirl connects three practical signals: search interest from Google Trends, buyer demand from Amazon, and supplier availability from CJdropshipping.</p>
    <div class="hubDetailList">
      <b>Google Trends</b><small>Checks demand direction and search momentum.</small>
      <b>Amazon Demand</b><small>Uses reviews, rating and demand signals.</small>
      <b>CJ Supplier</b><small>Checks product source, price and supply readiness.</small>
    </div>
  </div>
</section>`;

html = html.replace(/<section class="quvirlSignalHub"[\s\S]*?<\/section>\s*/g, '');
html = html.replace(/<p class="small" id="apiStatus"/, hub + '\n<p class="small" id="apiStatus"');

const css = `
/* Signal hub side-layout final override */
.quvirlSignalHub{display:grid!important;grid-template-columns:1.08fr .92fr!important;gap:24px!important;align-items:center!important;overflow:hidden!important;width:min(980px,100%)!important;margin:28px auto 8px!important;padding:26px 24px!important}
.quvirlSignalHub .hubMap{height:430px!important;min-height:430px!important;width:100%!important;max-width:100%!important;position:relative!important;overflow:hidden!important}
.quvirlSignalHub .hubDetails{text-align:left!important;padding:10px 8px!important;position:relative!important;z-index:5!important}
.quvirlSignalHub .hubDetails span{display:inline-block!important;color:#6ee7b7!important;font-size:12px!important;letter-spacing:.12em!important;text-transform:uppercase!important;font-weight:950!important;margin-bottom:10px!important}
.quvirlSignalHub .hubDetails h2{font-size:clamp(28px,3.4vw,46px)!important;line-height:1.04!important;margin:0 0 14px!important;color:#fff!important;-webkit-text-fill-color:#fff!important;letter-spacing:-1.3px!important}
.quvirlSignalHub .hubDetails p{font-size:16px!important;line-height:1.6!important;color:#fff!important;-webkit-text-fill-color:#fff!important;opacity:.92!important;margin:0 0 16px!important}
.quvirlSignalHub .hubDetailList{display:grid!important;gap:10px!important;margin-top:14px!important}
.quvirlSignalHub .hubDetailList b{color:#fff!important;-webkit-text-fill-color:#fff!important;font-size:16px!important}
.quvirlSignalHub .hubDetailList small{display:block!important;color:#fff!important;-webkit-text-fill-color:#fff!important;opacity:.78!important;font-size:13px!important;margin-top:3px!important}
.quvirlSignalHub .hubCore{left:48%!important;top:54%!important;transform:translate(-50%,-50%)!important;width:220px!important;height:138px!important}
.quvirlSignalHub .hubNode{width:142px!important;min-height:84px!important}
.quvirlSignalHub .nGoogle{left:2%!important;top:45%!important;transform:none!important}
.quvirlSignalHub .nAmazon{right:3%!important;top:31%!important;transform:none!important}
.quvirlSignalHub .nCJ{right:3%!important;top:64%!important;transform:none!important}
.quvirlSignalHub .nGoogle::after{right:-24px!important;left:auto!important;top:50%!important;bottom:auto!important}
.quvirlSignalHub .nAmazon::after,.quvirlSignalHub .nCJ::after{left:-24px!important;right:auto!important;top:50%!important;bottom:auto!important}
.quvirlSignalHub .hubWire{left:48%!important;top:54%!important;transform-origin:left center!important}
.quvirlSignalHub .wGoogle{width:220px!important;transform:rotate(180deg)!important}
.quvirlSignalHub .wAmazon{width:218px!important;transform:rotate(-31deg)!important}
.quvirlSignalHub .wCJ{width:220px!important;transform:rotate(32deg)!important}
@media(max-width:700px){
  .quvirlSignalHub{grid-template-columns:1fr!important;gap:8px!important;padding:18px 8px!important;margin-top:24px!important;border-radius:24px!important}
  .quvirlSignalHub .hubMap{height:350px!important;min-height:350px!important;order:1!important}
  .quvirlSignalHub .hubDetails{order:2!important;text-align:center!important;padding:8px 8px 2px!important}
  .quvirlSignalHub .hubDetails h2{font-size:26px!important;letter-spacing:-.8px!important}
  .quvirlSignalHub .hubDetails p{font-size:14px!important;line-height:1.45!important}
  .quvirlSignalHub .hubDetailList{grid-template-columns:1fr!important;text-align:left!important;background:rgba(255,255,255,.04)!important;border:1px solid rgba(110,231,183,.18)!important;border-radius:18px!important;padding:12px!important}
  .quvirlSignalHub .hubCore{left:42%!important;top:52%!important;width:138px!important;height:96px!important}
  .quvirlSignalHub .hubNode{width:94px!important;min-height:62px!important}
  .quvirlSignalHub .nGoogle{left:4%!important;top:43%!important}
  .quvirlSignalHub .nAmazon{right:4%!important;top:31%!important}
  .quvirlSignalHub .nCJ{right:4%!important;top:61%!important}
  .quvirlSignalHub .hubWire{left:42%!important;top:52%!important}
  .quvirlSignalHub .wGoogle{width:108px!important;transform:rotate(180deg)!important}
  .quvirlSignalHub .wAmazon{width:128px!important;transform:rotate(-30deg)!important}
  .quvirlSignalHub .wCJ{width:128px!important;transform:rotate(30deg)!important}
}
`;

html = html.replace(/\/\* Signal hub side-layout final override \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace('</style>', css + '\n</style>');
fs.writeFileSync(file, html, 'utf8');
console.log('Applied signal hub with left visual and right details.');
