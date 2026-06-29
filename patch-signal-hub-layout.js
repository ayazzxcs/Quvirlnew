const fs = require('fs');
const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

const hub = `<section class="quvirlSignalHub" aria-label="Quvirl signal hub">
  <div class="hubDetails">
    <span>Quvirl overview</span>
    <h2>A dropshipping research hub built around real market signals.</h2>
    <p>Quvirl helps sellers discover, compare and shortlist trending product ideas using connected demand, marketplace and supplier signals in one dashboard.</p>
    <div class="hubDetailList">
      <b>Market discovery</b><small>Find product ideas using search trend direction and demand signals.</small>
      <b>Supplier context</b><small>Compare availability, source pricing and CJdropshipping readiness.</small>
      <b>Decision support</b><small>Use scoring, margins and product pages to decide what is worth testing.</small>
    </div>
  </div>
  <div class="hubMap" aria-hidden="true">
    <svg class="hubLines" viewBox="0 0 420 300" preserveAspectRatio="none">
      <path d="M170 164 C130 164, 112 164, 94 164" />
      <path d="M248 144 C290 126, 306 114, 326 104" />
      <path d="M248 184 C290 202, 306 214, 326 224" />
      <circle cx="112" cy="164" r="6" />
      <circle cx="306" cy="114" r="6" />
      <circle cx="306" cy="214" r="6" />
    </svg>
    <div class="hubCore"><b><span class="brandQu">Qu</span><span class="brandVirl">virl</span></b></div>
    <div class="hubNode nGoogle"><i class="logoGoogle"><span>G</span></i><b>Google</b><small>Trends</small></div>
    <div class="hubNode nAmazon"><i class="logoAmazon"><span>amazon</span><em></em></i><b>Amazon</b><small>Demand</small></div>
    <div class="hubNode nCJ"><i class="logoCJ"><span>CJ</span></i><b>CJ</b><small>Supplier</small></div>
  </div>
</section>`;

html = html.replace(/<section class="quvirlSignalHub"[\s\S]*?<\/section>\s*/g, '');
html = html.replace(/<p class="small" id="apiStatus"/, hub + '\n<p class="small" id="apiStatus"');

const css = `
/* Signal hub side-layout final override */
.quvirlSignalHub{display:grid!important;grid-template-columns:.9fr 1.1fr!important;gap:16px!important;align-items:center!important;overflow:hidden!important;width:min(980px,100%)!important;margin:24px auto 8px!important;padding:18px 18px!important;min-height:360px!important}
.quvirlSignalHub .hubDetails{text-align:left!important;padding:8px 10px!important;position:relative!important;z-index:5!important;order:1!important}
.quvirlSignalHub .hubMap{height:330px!important;min-height:330px!important;width:100%!important;max-width:100%!important;position:relative!important;overflow:hidden!important;order:2!important}
.quvirlSignalHub .hubDetails span{display:inline-block!important;color:#6ee7b7!important;font-size:11px!important;letter-spacing:.12em!important;text-transform:uppercase!important;font-weight:950!important;margin-bottom:8px!important}
.quvirlSignalHub .hubDetails h2{font-size:clamp(24px,2.7vw,36px)!important;line-height:1.06!important;margin:0 0 12px!important;color:#fff!important;-webkit-text-fill-color:#fff!important;letter-spacing:-1px!important}
.quvirlSignalHub .hubDetails p{font-size:14px!important;line-height:1.55!important;color:#fff!important;-webkit-text-fill-color:#fff!important;opacity:.92!important;margin:0 0 12px!important}
.quvirlSignalHub .hubDetailList{display:grid!important;gap:8px!important;margin-top:10px!important}
.quvirlSignalHub .hubDetailList b{color:#fff!important;-webkit-text-fill-color:#fff!important;font-size:14px!important}
.quvirlSignalHub .hubDetailList small{display:block!important;color:#fff!important;-webkit-text-fill-color:#fff!important;opacity:.78!important;font-size:12px!important;margin-top:2px!important}
.quvirlSignalHub .hubLines{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;z-index:1!important;overflow:visible!important}
.quvirlSignalHub .hubLines path{fill:none!important;stroke:rgba(110,231,183,.58)!important;stroke-width:2!important;stroke-linecap:round!important}
.quvirlSignalHub .hubLines circle{fill:#22c55e!important;filter:drop-shadow(0 0 8px rgba(34,197,94,.85))!important}
.quvirlSignalHub .hubWire{display:none!important}
.quvirlSignalHub .hubCore{left:44%!important;top:54%!important;transform:translate(-50%,-50%)!important;width:160px!important;height:104px!important;border-radius:22px!important;z-index:3!important}
.quvirlSignalHub .hubCore b{font-size:36px!important;line-height:1!important}
.quvirlSignalHub .hubCore small{display:none!important}
.quvirlSignalHub .hubNode{width:112px!important;min-height:88px!important;border-radius:20px!important;font-size:13px!important;line-height:1.1!important;display:grid!important;place-items:center!important;align-content:center!important;gap:3px!important;padding:8px!important;z-index:4!important}
.quvirlSignalHub .hubNode::after{display:none!important}
.quvirlSignalHub .hubNode i{width:36px!important;height:28px!important;border-radius:9px!important;display:grid!important;place-items:center!important;font-style:normal!important;font-weight:950!important;font-size:15px!important;margin-bottom:2px!important;position:relative!important;overflow:hidden!important}
.quvirlSignalHub .hubNode b{color:#05070b!important;-webkit-text-fill-color:#05070b!important;font-size:13px!important;line-height:1!important}
.quvirlSignalHub .hubNode small{font-size:10px!important;color:#23272f!important;-webkit-text-fill-color:#23272f!important;font-weight:800!important}
.logoGoogle{background:#fff!important}.logoGoogle span{font-weight:950!important;font-size:22px!important;background:conic-gradient(from -45deg,#4285f4 0 25%,#34a853 0 50%,#fbbc05 0 75%,#ea4335 0)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;-webkit-text-fill-color:transparent!important}
.logoAmazon{background:#fff!important;color:#111!important;-webkit-text-fill-color:#111!important;font-family:Arial,sans-serif!important;width:54px!important}.logoAmazon span{font-size:12px!important;font-weight:950!important;color:#111!important;-webkit-text-fill-color:#111!important;letter-spacing:-.5px!important}.logoAmazon em{position:absolute!important;width:28px!important;height:9px!important;border-bottom:3px solid #ff9900!important;border-radius:0 0 28px 28px!important;bottom:2px!important;left:13px!important;transform:rotate(-8deg)!important}
.logoCJ{background:#111827!important;color:#6ee7b7!important;-webkit-text-fill-color:#6ee7b7!important;border:1px solid rgba(110,231,183,.45)!important}.logoCJ span{color:#6ee7b7!important;-webkit-text-fill-color:#6ee7b7!important;font-size:15px!important;font-weight:950!important}
.quvirlSignalHub .nGoogle{left:0!important;top:42%!important;transform:none!important}
.quvirlSignalHub .nAmazon{right:0!important;top:23%!important;transform:none!important}
.quvirlSignalHub .nCJ{right:0!important;top:60%!important;transform:none!important}
@media(max-width:700px){
  .quvirlSignalHub{grid-template-columns:1fr!important;gap:8px!important;padding:16px 8px!important;margin-top:20px!important;border-radius:24px!important;min-height:auto!important}
  .quvirlSignalHub .hubDetails{order:1!important;text-align:left!important;padding:8px 10px!important}
  .quvirlSignalHub .hubMap{order:2!important;height:310px!important;min-height:310px!important}
  .quvirlSignalHub .hubDetails h2{font-size:24px!important;letter-spacing:-.8px!important}
  .quvirlSignalHub .hubDetails p{font-size:13px!important;line-height:1.45!important}
  .quvirlSignalHub .hubDetailList{grid-template-columns:1fr!important;background:rgba(255,255,255,.04)!important;border:1px solid rgba(110,231,183,.18)!important;border-radius:18px!important;padding:10px!important}
  .quvirlSignalHub .hubCore{left:42%!important;top:52%!important;width:126px!important;height:86px!important;border-radius:20px!important}
  .quvirlSignalHub .hubCore b{font-size:30px!important}
  .quvirlSignalHub .hubNode{width:90px!important;min-height:76px!important;border-radius:16px!important;font-size:11px!important;padding:6px!important}
  .quvirlSignalHub .hubNode i{width:32px!important;height:25px!important;border-radius:8px!important;font-size:12px!important}
  .quvirlSignalHub .hubNode b{font-size:11px!important}
  .quvirlSignalHub .hubNode small{font-size:9px!important}
  .quvirlSignalHub .nGoogle{left:0!important;top:40%!important}
  .quvirlSignalHub .nAmazon{right:0!important;top:27%!important}
  .quvirlSignalHub .nCJ{right:0!important;top:58%!important}
}
`;

html = html.replace(/\/\* Signal hub side-layout final override \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace('</style>', css + '\n</style>');
fs.writeFileSync(file, html, 'utf8');
console.log('Rebuilt signal hub with SVG-aligned connector lines and logo-style badges.');
