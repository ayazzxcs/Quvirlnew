const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const TEXT_EXTS = new Set(['.html', '.xml', '.txt', '.json']);

function read(file) { return fs.readFileSync(file, 'utf8'); }
function write(file, text) { fs.writeFileSync(file, text, 'utf8'); }
function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (TEXT_EXTS.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

function replaceBrandText(text) {
  return text
    .replace(/DropTrend v2/g, 'Quvirl')
    .replace(/DropTrend Score/g, 'Quvirl Score')
    .replace(/DropTrend score/g, 'Quvirl score')
    .replace(/DropTrend scoring/g, 'Quvirl scoring')
    .replace(/DropTrend Signal Engine/g, 'Quvirl Signal Engine')
    .replace(/DropTrend guides/g, 'Quvirl guides')
    .replace(/DropTrend/g, 'Quvirl')
    .replace(/Droptrend/g, 'Quvirl')
    .replace(/Drop trend/g, 'Quvirl')
    .replace(/Drop\s*Trend/g, 'Quvirl')
    .replace(/droptrend score/gi, 'Quvirl score')
    .replace(/Drop<span class="brandWord">Trend<\/span>/g, 'Quvirl')
    .replace(/<b>Drop<\/b>\s*<span[^>]*>Trend<\/span>/g, '<b>Quvirl</b>')
    .replace(/<span>Drop<\/span>\s*<span[^>]*>Trend<\/span>/g, '<span>Quvirl</span>');
}

let changed = 0;
for (const file of walk(ROOT)) {
  const before = read(file);
  const after = replaceBrandText(before);
  if (after !== before) { write(file, after); changed++; }
}

const home = path.join(ROOT, 'index.html');
if (fs.existsSync(home)) {
  let html = read(home);

  html = html.replace(/<div class="brandLogo">[\s\S]*?<\/div>\s*<\/div>\s*<div class="badge">/, `<div class="brandLogo">
  <div class="brandMark" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="#0C447C"/>
<path d="M16 44 L30 30 L40 38 L52 18" stroke="#378ADD" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="10" y="34" width="13" height="13" rx="3" fill="#B5D4F4"/>
</svg></div>
  <div class="brandText"><b><span class="brandQu">Qu</span><span class="brandVirl">virl</span></b><span>Discover Winning Products Before Everyone Else</span></div>
</div>

<div class="badge">`);

  html = html.replace(/<span class="brandQu">Qu<\/span><span class="brandVirl">virl<\/span>/g, 'Quvirl');
  html = html.replace(/<b>Quvirl<\/b>/g, '<b><span class="brandQu">Qu</span><span class="brandVirl">virl</span></b>');
  html = html.replace(/>Quvirl</g, '><span class="brandQu">Qu</span><span class="brandVirl">virl</span><');
  html = html.replace(/<section class="quvirlSignalHub"[\s\S]*?<\/section>\s*/g, '');

  const css = `
/* Quvirl consolidated final styling - premium product research style */
:root{--accent:#0c447c!important;--brand-blue:#0c447c!important;--brand-sky:#378add!important;--brand-soft:#b5d4f4!important;--ink:#111827!important;--muted-ink:#5f6b7a!important;--soft-line:#e5e7eb!important;--soft-bg:#f6f8fc!important;--card-bg:#ffffff!important;--hot:#ff7a1a!important;--pink:#f04f9e!important;--green:#12b981!important}
html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important;background:linear-gradient(180deg,#ffffff 0%,#f6f8fc 52%,#eef5ff 100%)!important;color:var(--ink)!important;font-family:Inter,system-ui,Segoe UI,Arial,sans-serif!important}.dynamicBg,.bgSpark,.bg-orb,body::before,body::after,.wrap::before,.wrap::after{display:none!important;content:none!important;background:none!important;animation:none!important}.wrap{width:100%!important;max-width:1210px!important;margin:auto!important;padding:0 26px 36px!important;box-sizing:border-box!important;position:relative!important;z-index:2!important}
.topNav{position:sticky!important;top:0!important;z-index:60!important;margin:0 -26px 0!important;padding:16px 26px!important;border-radius:0!important;background:rgba(255,255,255,.92)!important;border:0!important;border-bottom:1px solid #edf0f4!important;box-shadow:0 10px 28px rgba(15,23,42,.05)!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important}.miniBrand{font-size:28px!important;font-weight:950!important;color:#111827!important;letter-spacing:-1px!important}.miniMark,.menuBtnLabel{background:#ffffff!important;color:#111827!important;border:1px solid #e5e7eb!important;box-shadow:0 8px 20px rgba(15,23,42,.06)!important;border-radius:14px!important}.navPill{background:linear-gradient(135deg,#fff7ed,#fff)!important;color:#9a3412!important;border:1px solid #fed7aa!important;box-shadow:0 10px 24px rgba(251,146,60,.10)!important;font-weight:900!important}
.hero{display:block!important;text-align:left!important;min-height:auto!important;padding:82px 0 54px!important;position:relative!important;overflow:hidden!important;background:transparent!important}.hero>*{position:relative!important;z-index:3!important}.hero::before{content:""!important;display:block!important;position:absolute!important;right:-130px!important;top:58px!important;width:585px!important;height:530px!important;border-radius:48px!important;background:radial-gradient(circle at 34% 28%,rgba(255,122,26,.22),transparent 30%),radial-gradient(circle at 70% 30%,rgba(240,79,158,.20),transparent 32%),linear-gradient(135deg,#ffffff 0%,#edf5ff 52%,#fff7ed 100%)!important;border:1px solid #edf2f7!important;box-shadow:0 36px 95px rgba(12,68,124,.12),inset 0 1px 0 rgba(255,255,255,.9)!important;transform:rotate(3deg)!important;pointer-events:none!important}.hero::after{content:""!important;display:block!important;position:absolute!important;right:22px!important;top:158px!important;width:350px!important;height:310px!important;border-radius:34px!important;background:linear-gradient(180deg,#ffffff 0%,#f8fbff 100%)!important;border:1px solid #e5e7eb!important;box-shadow:0 30px 75px rgba(15,23,42,.14)!important;transform:rotate(-4deg)!important;pointer-events:none!important;opacity:.98!important}
.brandLogo{justify-content:flex-start!important;align-items:center!important;margin:0 0 24px!important}.brandMark{width:50px!important;height:50px!important;border-radius:15px!important;background:linear-gradient(135deg,#0c447c,#378add)!important;box-shadow:0 14px 32px rgba(12,68,124,.25)!important;border:0!important}.brandText b,.brandLogo .brandText b,.hero .brandLogo .brandText b,.heroCard .brandLogo .brandText b{display:block!important;font-size:36px!important;line-height:1!important;letter-spacing:-1.2px!important;font-weight:950!important;text-shadow:none!important;white-space:nowrap!important}.brandText span{color:#6b7280!important;-webkit-text-fill-color:#6b7280!important;font-size:14px!important}.brandQu{color:#111827!important;-webkit-text-fill-color:#111827!important}.brandVirl{color:#0c447c!important;-webkit-text-fill-color:#0c447c!important}
h1{max-width:780px!important;margin:18px 0 18px!important;font-size:clamp(50px,7.4vw,88px)!important;line-height:1.02!important;letter-spacing:-3.8px!important;font-weight:800!important;color:#1f2937!important;-webkit-text-fill-color:#1f2937!important;text-shadow:none!important}.lead{max-width:650px!important;margin:0!important;font-size:20px!important;line-height:1.65!important;color:#4b5563!important;-webkit-text-fill-color:#4b5563!important}.badge{display:inline-flex!important;background:#ffffff!important;color:#0c447c!important;-webkit-text-fill-color:#0c447c!important;border:1px solid #dbeafe!important;box-shadow:0 12px 28px rgba(12,68,124,.08)!important;border-radius:999px!important;padding:10px 15px!important;font-weight:900!important}
.heroVisual{position:relative!important}.heroVisual::before{content:"Market signals"!important;position:absolute!important;right:-420px!important;top:-76px!important;width:220px!important;padding:16px 18px!important;border-radius:22px!important;background:#111827!important;color:#ffffff!important;font-weight:950!important;box-shadow:0 22px 55px rgba(15,23,42,.24)!important}.heroVisual::after{content:"Winning score • Demand • Supplier"!important;position:absolute!important;right:-470px!important;top:12px!important;width:270px!important;padding:15px 18px!important;border-radius:20px!important;background:linear-gradient(135deg,#ff7a1a,#f04f9e)!important;color:#ffffff!important;font-weight:900!important;box-shadow:0 22px 55px rgba(240,79,158,.22)!important}
.stats{max-width:760px!important;margin:30px 0 0!important;grid-template-columns:repeat(3,1fr)!important;gap:14px!important}.stat,.signalCard,.panel,.premiumTrending,.winningPanel,.toolbar,.card,.trendLink,.m,.metric,.siteChip{background:rgba(255,255,255,.94)!important;border:1px solid #e5e7eb!important;border-radius:20px!important;box-shadow:0 16px 38px rgba(15,23,42,.07)!important;backdrop-filter:blur(10px)!important;-webkit-backdrop-filter:blur(10px)!important;overflow:hidden!important;color:#1f2937!important}.stat{padding:18px!important}.stat b{font-size:30px!important}.stat b,.signalCard b,.m b,.metric b,.card b,.card strong,.title,.sectionTitle h2,.winningHead h2,.premiumTrending h2,.panel h2,h2,h3{color:#111827!important;-webkit-text-fill-color:#111827!important}.stat span,.muted,.small,.rateText,.premiumTrending p,.winningHead p,.card .muted,.card .small,.metric span,.m span,.footer,.footer *,.sectionTitle p{color:#6b7280!important;-webkit-text-fill-color:#6b7280!important;opacity:1!important}
.currencyBox{justify-content:flex-start!important;margin-top:18px!important}.currencyBtn,input,select,button{background:#ffffff!important;border:1px solid #d1d5db!important;border-radius:13px!important;color:#111827!important;box-shadow:none!important}input:focus,select:focus{outline:none!important;border-color:#0c447c!important;box-shadow:0 0 0 4px rgba(12,68,124,.10)!important}.currencyBtn.active,button{background:linear-gradient(135deg,#0c447c,#378add)!important;border-color:#0c447c!important;color:#ffffff!important;-webkit-text-fill-color:#ffffff!important;font-weight:900!important}.btn2,.currencyBtn:not(.active){background:#ffffff!important;color:#111827!important;-webkit-text-fill-color:#111827!important}.toolbar{margin:30px 0!important;padding:14px!important;grid-template-columns:1.6fr repeat(3,1fr)!important;position:relative!important;z-index:5!important;border-radius:22px!important}
.signalPanel{max-width:760px!important;margin:24px 0 0!important;grid-template-columns:1fr 1fr!important;gap:14px!important}.signalCard{position:relative!important}.signalCard::after{content:""!important;position:absolute!important;right:-42px!important;bottom:-54px!important;width:150px!important;height:150px!important;border-radius:50%!important;background:radial-gradient(circle,rgba(55,138,221,.20),transparent 68%)!important}.signalCard span{color:#0c447c!important;-webkit-text-fill-color:#0c447c!important;font-weight:950!important}.signalBar{background:#edf2f7!important;border:1px solid #e5e7eb!important}.signalBar i{background:linear-gradient(90deg,#0c447c,#378add,#12b981)!important;box-shadow:none!important;animation:none!important}.visualChip,.pill,.winBadge{background:#f3f7ff!important;border:1px solid #dbeafe!important;color:#0c447c!important;-webkit-text-fill-color:#0c447c!important;border-radius:999px!important;font-weight:900!important}.scoreRing{background:conic-gradient(#ff7a1a calc(var(--score)*1%),#e5e7eb 0)!important;box-shadow:0 12px 28px rgba(255,122,26,.14)!important}.scoreRing::before{background:#ffffff!important;border:1px solid #e5e7eb!important}.scoreRing b,.profit,.result{color:#0c447c!important;-webkit-text-fill-color:#0c447c!important}
.premiumTrending,.winningPanel,.panel{margin-top:32px!important;padding:24px!important}.premiumTrending{background:linear-gradient(135deg,#ffffff,#f3f7ff)!important}.winningPanel{background:linear-gradient(135deg,#ffffff,#fff7ed)!important;border-color:#fed7aa!important}.trendLinks{gap:14px!important}.grid,.winnerGrid{gap:22px!important}.card{border-radius:24px!important;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease!important}.card:hover,.trendLink:hover,.stat:hover,.signalCard:hover{transform:translateY(-4px)!important;box-shadow:0 22px 55px rgba(15,23,42,.12)!important;border-color:#b9d8ff!important}.img{height:224px!important;margin:12px 12px 0!important;border-radius:18px!important;background:#f3f4f6!important}.img img{border-radius:18px!important}.body{padding:17px!important}.title{font-size:18px!important;line-height:1.27!important}.score{background:linear-gradient(135deg,#111827,#0c447c)!important;color:#ffffff!important;border:0!important;font-weight:900!important}.save{background:#ffffff!important;color:#111827!important;border:1px solid #e5e7eb!important}.metricGrid{gap:9px!important}.metric{border-radius:15px!important;background:#fbfdff!important}.m{background:#fbfdff!important}.notice{background:#fff7ed!important;border-left-color:#ff7a1a!important;color:#7c2d12!important}.notice *{color:#7c2d12!important;-webkit-text-fill-color:#7c2d12!important}.quvirlSignalHub{display:none!important}
.sideMenu{background:#ffffff!important;color:#111827!important;border-right:1px solid #e5e7eb!important;box-shadow:25px 0 70px rgba(15,23,42,.14)!important}.sideHead,.menuItem{border-color:#eef2f7!important}.menuItem,.menuItem b,.sideBrand,.sideBrand span{color:#111827!important}.menuItem span,.chev,.menuSubTitle{color:#6b7280!important}.menuItem:hover{background:#f8fafc!important}.menuIcon{background:#eef6ff!important;color:#0c447c!important}.siteChip{background:#ffffff!important;color:#111827!important}.siteChip small{color:#6b7280!important}
.motion-ready .topNav,.motion-ready .hero,.motion-ready .premiumTrending,.motion-ready .winningPanel,.motion-ready .sectionTitle,.motion-ready .panel,.motion-ready .dt-in,.motion-ready .card{animation:none!important;opacity:1!important;transform:none!important}.card::before,.stat::before,.toolbar::before,.winningPanel::before,.premiumTrending::before,.signalCard::before,.trendLink::before{display:none!important;content:none!important}
@media(max-width:700px){.wrap{padding:0 16px 28px!important}.topNav{margin:0 -16px!important;padding:12px 16px!important}.hero{padding:48px 0 30px!important;text-align:left!important}.hero::before{right:-192px!important;top:105px!important;width:375px!important;height:370px!important;opacity:.72!important}.hero::after{right:-40px!important;top:252px!important;width:170px!important;height:124px!important;border-radius:20px!important;opacity:.78!important}.heroVisual::before,.heroVisual::after{display:none!important;content:none!important}.brandLogo .brandText b,.hero .brandLogo .brandText b,.heroCard .brandLogo .brandText b{font-size:31px!important}h1{font-size:clamp(40px,11vw,60px)!important;line-height:1.07!important;letter-spacing:-2px!important}.lead{font-size:16px!important;max-width:100%!important}.stats{grid-template-columns:1fr!important;width:100%!important}.currencyBox{justify-content:flex-start!important}.signalPanel{grid-template-columns:1fr!important;width:100%!important;max-width:100%!important}.toolbar{grid-template-columns:1fr!important;width:100%!important}.premiumTrending,.winningPanel,.panel{padding:16px!important;border-radius:20px!important}.trendLinks{grid-template-columns:1fr!important}.winnerGrid,.grid{grid-template-columns:1fr!important;width:100%!important}.card{width:100%!important;max-width:100%!important;display:block!important}.img{height:238px!important;margin:10px 10px 0!important}.body{padding:14px!important}.actions{grid-template-columns:1fr!important}.metricGrid,.money{grid-template-columns:1fr 1fr!important}.heroVisual.signalPanel{margin-top:18px!important}}
`;

  html = html.replace(/\/\* Quvirl consolidated final styling[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Quvirl brand:[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Quvirl brand cleanup:[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Quvirl blue-only brand cleanup \*\/[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Old mint green theme override \*\/[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Product card animation fix: show cards immediately \*\/[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Product card text contrast fix \*\/[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Remove grey text across site \*\/[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace(/\/\* Quvirl split brand name[^*]*\*\/[\s\S]*?(?=<\/style>)/g, '');
  html = html.replace('</style>', css + '\n</style>');
  write(home, html);
}

console.log(`Applied Quvirl branding with premium product research styling inside existing patch. Text-updated files: ${changed}.`);
