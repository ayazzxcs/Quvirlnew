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
/* Quvirl consolidated final styling - premium SaaS product research interface */
:root{--q-bg:#070A13!important;--q-bg2:#0B1020!important;--q-card:#111827!important;--q-card2:#0F172A!important;--q-line:rgba(255,255,255,.12)!important;--q-text:#F8FAFC!important;--q-muted:#A7B0C3!important;--q-blue:#2563EB!important;--q-sky:#38BDF8!important;--q-purple:#8B5CF6!important;--q-pink:#EC4899!important;--q-orange:#F97316!important;--q-green:#22C55E!important;--q-glow:0 30px 90px rgba(37,99,235,.28)!important}
html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important;background:radial-gradient(circle at 18% 10%,rgba(139,92,246,.26),transparent 28%),radial-gradient(circle at 84% 8%,rgba(236,72,153,.22),transparent 26%),radial-gradient(circle at 55% 30%,rgba(56,189,248,.18),transparent 32%),linear-gradient(180deg,#060814 0%,#080C19 46%,#0B1020 100%)!important;color:var(--q-text)!important;font-family:Inter,system-ui,Segoe UI,Arial,sans-serif!important}.dynamicBg,.bgSpark,.bg-orb,body::before,body::after,.wrap::before,.wrap::after{display:none!important;content:none!important;background:none!important;animation:none!important}.wrap{width:100%!important;max-width:1240px!important;margin:auto!important;padding:0 24px 42px!important;box-sizing:border-box!important;position:relative!important;z-index:2!important}
.topNav{position:sticky!important;top:14px!important;z-index:60!important;margin:14px 0 0!important;padding:13px 16px!important;border-radius:24px!important;background:rgba(9,13,26,.78)!important;border:1px solid rgba(255,255,255,.12)!important;box-shadow:0 24px 70px rgba(0,0,0,.35)!important;backdrop-filter:blur(22px)!important;-webkit-backdrop-filter:blur(22px)!important}.miniBrand{font-size:26px!important;font-weight:950!important;color:#fff!important;letter-spacing:-1px!important}.miniMark,.menuBtnLabel{background:linear-gradient(135deg,var(--q-blue),var(--q-sky))!important;color:#fff!important;border:1px solid rgba(255,255,255,.16)!important;box-shadow:0 12px 28px rgba(56,189,248,.22)!important;border-radius:15px!important}.navPill{background:linear-gradient(135deg,rgba(249,115,22,.20),rgba(236,72,153,.16))!important;color:#fff!important;border:1px solid rgba(249,115,22,.32)!important;box-shadow:0 12px 30px rgba(249,115,22,.14)!important;font-weight:950!important}
.hero{display:block!important;text-align:center!important;min-height:820px!important;padding:82px 0 330px!important;position:relative!important;overflow:hidden!important;background:transparent!important}.hero>*{position:relative!important;z-index:4!important}.hero::before{content:""!important;display:block!important;position:absolute!important;left:50%!important;bottom:34px!important;width:min(1050px,96vw)!important;height:285px!important;transform:translateX(-50%) perspective(900px) rotateX(8deg)!important;border-radius:34px!important;background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.045)),linear-gradient(135deg,rgba(37,99,235,.22),rgba(139,92,246,.20),rgba(236,72,153,.16))!important;border:1px solid rgba(255,255,255,.18)!important;box-shadow:0 40px 130px rgba(0,0,0,.58),0 0 90px rgba(56,189,248,.18),inset 0 1px 0 rgba(255,255,255,.20)!important;pointer-events:none!important}.hero::after{content:""!important;display:block!important;position:absolute!important;left:50%!important;bottom:78px!important;width:min(900px,84vw)!important;height:190px!important;transform:translateX(-50%)!important;border-radius:24px!important;background:linear-gradient(180deg,#0F172A,#090D1B)!important;border:1px solid rgba(255,255,255,.14)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 30px 80px rgba(0,0,0,.45)!important;pointer-events:none!important}.hero>div::before{content:""!important;position:absolute!important;left:calc(50% - 405px)!important;bottom:-256px!important;width:150px!important;height:118px!important;border-radius:22px!important;background:linear-gradient(135deg,var(--q-orange),var(--q-pink))!important;box-shadow:0 24px 60px rgba(236,72,153,.28)!important;z-index:6!important}.hero>div::after{content:""!important;position:absolute!important;left:calc(50% + 260px)!important;bottom:-238px!important;width:170px!important;height:130px!important;border-radius:24px!important;background:linear-gradient(135deg,var(--q-blue),var(--q-sky))!important;box-shadow:0 24px 60px rgba(56,189,248,.24)!important;z-index:6!important}
.brandLogo{justify-content:center!important;align-items:center!important;margin:0 0 24px!important}.brandMark{width:54px!important;height:54px!important;border-radius:18px!important;background:linear-gradient(135deg,var(--q-blue),var(--q-sky))!important;box-shadow:0 18px 42px rgba(56,189,248,.26)!important;border:1px solid rgba(255,255,255,.14)!important}.brandText b,.brandLogo .brandText b,.hero .brandLogo .brandText b,.heroCard .brandLogo .brandText b{display:block!important;font-size:40px!important;line-height:1!important;letter-spacing:-1.6px!important;font-weight:950!important;text-shadow:none!important;white-space:nowrap!important}.brandText span{color:var(--q-muted)!important;-webkit-text-fill-color:var(--q-muted)!important;font-size:14px!important}.brandQu{color:#fff!important;-webkit-text-fill-color:#fff!important}.brandVirl{color:var(--q-sky)!important;-webkit-text-fill-color:var(--q-sky)!important}
h1{max-width:980px!important;margin:20px auto 20px!important;font-size:clamp(50px,8vw,92px)!important;line-height:.96!important;letter-spacing:-5px!important;font-weight:950!important;color:#fff!important;-webkit-text-fill-color:#fff!important;text-shadow:0 30px 110px rgba(56,189,248,.20)!important}.lead{max-width:760px!important;margin:0 auto!important;font-size:20px!important;line-height:1.65!important;color:#CBD5E1!important;-webkit-text-fill-color:#CBD5E1!important}.badge{display:inline-flex!important;background:rgba(255,255,255,.08)!important;color:#fff!important;-webkit-text-fill-color:#fff!important;border:1px solid rgba(255,255,255,.16)!important;box-shadow:0 18px 45px rgba(0,0,0,.28)!important;border-radius:999px!important;padding:11px 16px!important;font-weight:950!important;backdrop-filter:blur(16px)!important}
.stats{max-width:780px!important;margin:32px auto 0!important;grid-template-columns:repeat(3,1fr)!important;gap:14px!important}.stat,.signalCard,.panel,.premiumTrending,.winningPanel,.toolbar,.card,.trendLink,.m,.metric,.siteChip{background:linear-gradient(180deg,rgba(255,255,255,.085),rgba(255,255,255,.045))!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:22px!important;box-shadow:0 24px 70px rgba(0,0,0,.30),inset 0 1px 0 rgba(255,255,255,.08)!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important;overflow:hidden!important;color:#fff!important}.stat{padding:18px!important}.stat b{font-size:31px!important}.stat b,.signalCard b,.m b,.metric b,.card b,.card strong,.title,.sectionTitle h2,.winningHead h2,.premiumTrending h2,.panel h2,h2,h3{color:#fff!important;-webkit-text-fill-color:#fff!important}.stat span,.muted,.small,.rateText,.premiumTrending p,.winningHead p,.card .muted,.card .small,.metric span,.m span,.footer,.footer *,.sectionTitle p{color:var(--q-muted)!important;-webkit-text-fill-color:var(--q-muted)!important;opacity:1!important}
.currencyBox{justify-content:center!important;margin-top:18px!important}.currencyBtn,input,select,button{background:rgba(255,255,255,.07)!important;border:1px solid rgba(255,255,255,.13)!important;border-radius:14px!important;color:#fff!important;-webkit-text-fill-color:#fff!important;box-shadow:none!important}input:focus,select:focus{outline:none!important;border-color:rgba(56,189,248,.55)!important;box-shadow:0 0 0 4px rgba(56,189,248,.12)!important}.currencyBtn.active,button{background:linear-gradient(135deg,var(--q-blue),var(--q-sky))!important;border-color:rgba(56,189,248,.55)!important;color:#fff!important;-webkit-text-fill-color:#fff!important;font-weight:950!important}.btn2,.currencyBtn:not(.active){background:rgba(255,255,255,.06)!important;color:#fff!important;-webkit-text-fill-color:#fff!important}.toolbar{margin:-238px auto 34px!important;padding:15px!important;grid-template-columns:1.6fr repeat(3,1fr)!important;position:relative!important;z-index:12!important;border-radius:24px!important;max-width:1060px!important;background:rgba(8,13,28,.82)!important}
.signalPanel{max-width:850px!important;margin:26px auto 0!important;grid-template-columns:1fr 1fr!important;gap:14px!important}.signalCard{position:relative!important}.signalCard::after{content:""!important;position:absolute!important;right:-54px!important;bottom:-58px!important;width:170px!important;height:170px!important;border-radius:50%!important;background:radial-gradient(circle,rgba(56,189,248,.22),transparent 68%)!important}.signalCard span{color:var(--q-sky)!important;-webkit-text-fill-color:var(--q-sky)!important;font-weight:950!important}.signalBar{background:rgba(255,255,255,.08)!important;border:1px solid rgba(255,255,255,.10)!important}.signalBar i{background:linear-gradient(90deg,var(--q-orange),var(--q-pink),var(--q-sky))!important;box-shadow:0 0 22px rgba(236,72,153,.28)!important;animation:none!important}.visualChip,.pill,.winBadge{background:rgba(56,189,248,.10)!important;border:1px solid rgba(56,189,248,.22)!important;color:#E0F2FE!important;-webkit-text-fill-color:#E0F2FE!important;border-radius:999px!important;font-weight:900!important}.scoreRing{background:conic-gradient(var(--q-orange) calc(var(--score)*1%),rgba(255,255,255,.10) 0)!important;box-shadow:0 14px 32px rgba(249,115,22,.18)!important}.scoreRing::before{background:#0B1020!important;border:1px solid rgba(255,255,255,.12)!important}.scoreRing b,.profit,.result{color:var(--q-sky)!important;-webkit-text-fill-color:var(--q-sky)!important}
.premiumTrending,.winningPanel,.panel{margin-top:34px!important;padding:26px!important}.premiumTrending{background:linear-gradient(135deg,rgba(37,99,235,.18),rgba(139,92,246,.10))!important}.winningPanel{background:linear-gradient(135deg,rgba(249,115,22,.18),rgba(236,72,153,.10))!important;border-color:rgba(249,115,22,.22)!important}.trendLinks{gap:16px!important}.grid,.winnerGrid{gap:24px!important}.card{border-radius:26px!important;transition:transform .20s ease,box-shadow .20s ease,border-color .20s ease!important;background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.045))!important}.card:hover,.trendLink:hover,.stat:hover,.signalCard:hover{transform:translateY(-6px)!important;box-shadow:0 32px 90px rgba(0,0,0,.38),0 0 0 1px rgba(56,189,248,.16)!important;border-color:rgba(56,189,248,.35)!important}.img{height:236px!important;margin:12px 12px 0!important;border-radius:20px!important;background:rgba(255,255,255,.06)!important}.img img{border-radius:20px!important}.body{padding:18px!important}.title{font-size:18px!important;line-height:1.27!important}.score{background:linear-gradient(135deg,#111827,#2563EB)!important;color:#ffffff!important;border:1px solid rgba(255,255,255,.12)!important;font-weight:950!important}.save{background:rgba(255,255,255,.92)!important;color:#111827!important;border:0!important}.metricGrid{gap:9px!important}.metric{border-radius:16px!important;background:rgba(0,0,0,.14)!important}.m{background:rgba(0,0,0,.14)!important}.notice{background:rgba(249,115,22,.10)!important;border-left-color:var(--q-orange)!important;color:#FED7AA!important}.notice *{color:#FED7AA!important;-webkit-text-fill-color:#FED7AA!important}.quvirlSignalHub{display:none!important}
.sideMenu{background:#090D1B!important;color:#fff!important;border-right:1px solid rgba(255,255,255,.12)!important;box-shadow:25px 0 70px rgba(0,0,0,.45)!important}.sideHead,.menuItem{border-color:rgba(255,255,255,.10)!important}.menuItem,.menuItem b,.sideBrand,.sideBrand span{color:#fff!important}.menuItem span,.chev,.menuSubTitle{color:var(--q-muted)!important}.menuItem:hover{background:rgba(255,255,255,.07)!important}.menuIcon{background:rgba(56,189,248,.12)!important;color:#38BDF8!important}.siteChip{background:rgba(255,255,255,.06)!important;color:#fff!important}.siteChip small{color:var(--q-muted)!important}
.motion-ready .topNav,.motion-ready .hero,.motion-ready .premiumTrending,.motion-ready .winningPanel,.motion-ready .sectionTitle,.motion-ready .panel,.motion-ready .dt-in,.motion-ready .card{animation:none!important;opacity:1!important;transform:none!important}.card:hover{transform:translateY(-6px)!important}.card::before,.stat::before,.toolbar::before,.winningPanel::before,.premiumTrending::before,.signalCard::before,.trendLink::before{display:none!important;content:none!important}
@media(max-width:700px){.wrap{padding:0 14px 30px!important}.topNav{top:8px!important;margin:8px 0 0!important;padding:11px 12px!important;border-radius:18px!important}.navPill{display:none!important}.hero{min-height:auto!important;padding:48px 0 250px!important;text-align:center!important}.hero::before{bottom:24px!important;width:94vw!important;height:205px!important;border-radius:24px!important}.hero::after{bottom:58px!important;width:82vw!important;height:128px!important;border-radius:18px!important}.hero>div::before{left:7vw!important;bottom:-196px!important;width:90px!important;height:72px!important;border-radius:15px!important}.hero>div::after{left:auto!important;right:7vw!important;bottom:-186px!important;width:105px!important;height:78px!important;border-radius:16px!important}.brandLogo{justify-content:center!important}.brandLogo .brandText b,.hero .brandLogo .brandText b,.heroCard .brandLogo .brandText b{font-size:32px!important}h1{font-size:clamp(42px,12vw,62px)!important;line-height:1.02!important;letter-spacing:-2.4px!important}.lead{font-size:16px!important;max-width:100%!important}.stats{grid-template-columns:1fr!important;width:100%!important}.currencyBox{justify-content:center!important}.signalPanel{grid-template-columns:1fr!important;width:100%!important;max-width:100%!important}.toolbar{grid-template-columns:1fr!important;width:100%!important;margin:-194px 0 26px!important}.premiumTrending,.winningPanel,.panel{padding:16px!important;border-radius:20px!important}.trendLinks{grid-template-columns:1fr!important}.winnerGrid,.grid{grid-template-columns:1fr!important;width:100%!important}.card{width:100%!important;max-width:100%!important;display:block!important}.img{height:248px!important;margin:10px 10px 0!important}.body{padding:14px!important}.actions{grid-template-columns:1fr!important}.metricGrid,.money{grid-template-columns:1fr 1fr!important}.heroVisual.signalPanel{margin-top:18px!important}}
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

console.log(`Applied Quvirl premium SaaS product research interface inside existing patch. Text-updated files: ${changed}.`);
