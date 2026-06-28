const fs = require('fs');
const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

const currencyBox = `<div class="currencyBox">
<span class="small">Currency:</span>
<button class="currencyBtn" id="currencyUSD" onclick="setCurrency('USD')">USD $</button>
<button class="currencyBtn active" id="currencyINR" onclick="setCurrency('INR')">INR ₹</button>
<button class="currencyBtn" id="currencyEUR" onclick="setCurrency('EUR')">EUR €</button>
<button class="currencyBtn" id="currencyGBP" onclick="setCurrency('GBP')">GBP £</button>
<button class="currencyBtn" id="currencyCAD" onclick="setCurrency('CAD')">CAD C$</button>
<button class="currencyBtn" id="currencyAUD" onclick="setCurrency('AUD')">AUD A$</button>
<span class="rateText" id="fxStatus">Loading exchange rate...</span>
</div>`;

html = html.replace(/<div class="currencyBox">[\s\S]*?<span class="rateText" id="fxStatus">Loading exchange rate\.\.\.<\/span>\s*<\/div>/, currencyBox);
html = html.replace(/<select id="market" onchange="resetAndRender\(\)">[\s\S]*?<\/select>\s*<button onclick="exportCSV\(\)">Export CSV<\/button>/, `<select id="market" onchange="resetAndRender()"><option value="all" selected>All markets</option></select>`);
html = html.replace(/<select id="market" onchange="resetAndRender\(\)">[\s\S]*?<\/select>/, `<select id="market" onchange="resetAndRender()"><option value="all" selected>All markets</option></select>`);
html = html.replace(/<button onclick="exportCSV\(\)">Export CSV<\/button>/g, '');

html = html.replace(/let usdToInr = 83\.5;\s*let fxIsLive = false;/, `const currencyRates = { USD: 1, INR: 83.5, EUR: 0.92, GBP: 0.78, CAD: 1.36, AUD: 1.52 };
const currencySymbols = { USD: "$", INR: "₹", EUR: "€", GBP: "£", CAD: "C$", AUD: "A$" };
let usdToInr = currencyRates.INR;
let fxIsLive = false;`);
html = html.replace(/function convertFromUSD\(value\) \{[\s\S]*?\n\}/, `function convertFromUSD(value) {
  const v = num(value);
  return v * (currencyRates[currentCurrency] || 1);
}`);
html = html.replace(/function fmt\(n\) \{[\s\S]*?\n\}/, `function fmt(n) {
  const value = convertFromUSD(n);
  const symbol = currencySymbols[currentCurrency] || "$";
  const localeMap = { USD: "en-US", INR: "en-IN", EUR: "de-DE", GBP: "en-GB", CAD: "en-CA", AUD: "en-AU" };
  return symbol + Number(value).toLocaleString(localeMap[currentCurrency] || "en-US", { maximumFractionDigits: 2 });
}`);
html = html.replace(/function updateCurrencyButtons\(\) \{[\s\S]*?\n\}\n\nasync function loadExchangeRate/, `function updateCurrencyButtons() {
  Object.keys(currencyRates).forEach(code => {
    const btn = document.getElementById("currency" + code);
    if (btn) btn.classList.toggle("active", currentCurrency === code);
  });
  const fx = document.getElementById("fxStatus");
  if (fx) {
    if (currentCurrency === "USD") fx.textContent = "Showing original CJ USD prices";
    else {
      const rate = currencyRates[currentCurrency] || 1;
      const symbol = currencySymbols[currentCurrency] || "";
      fx.textContent = (fxIsLive ? "Live FX" : "Fallback FX") + ": 1 USD ≈ " + symbol + rate.toFixed(2);
    }
  }
}

async function loadExchangeRate`);
html = html.replace(/const rate = Number\(data\?\.rates\?\.INR\);\s*if \(Number\.isFinite\(rate\) && rate > 1\) \{\s*usdToInr = rate;\s*fxIsLive = true;\s*\}/, `let updated = false;
    Object.keys(currencyRates).forEach(code => {
      const rate = Number(data?.rates?.[code]);
      if (Number.isFinite(rate) && rate > 0) { currencyRates[code] = rate; updated = true; }
    });
    usdToInr = currencyRates.INR;
    fxIsLive = updated;`);

const animationCss = `
/* DropTrend GitHub-dark motion upgrade */
:root{--dt-black:#010409;--dt-card:#0d1117;--dt-card2:#090d13;--dt-border:#30363d;--dt-border2:#1f6feb;--dt-text:#f0f6fc;--dt-muted:#8b949e;--dt-green:#3fb950;--dt-green2:#56d364;--dt-blue:#58a6ff;--dt-purple:#bc8cff}
html{scroll-behavior:smooth}
body{background:#010409!important;color:var(--dt-text)!important}
body::before,body::after,.bg-orb,.orb1,.orb2,.orb3,.bgSpark{display:none!important;animation:none!important;background:none!important}
.dynamicBg{background:#010409!important;z-index:-5!important}
.dynamicBg .bgSlide{opacity:0!important;background-image:none!important}
.wrap::before{display:none!important}
.wrap::after{content:"";position:fixed;inset:-25%;z-index:-4;pointer-events:none;background:radial-gradient(circle at 50% 0%,rgba(31,111,235,.30),transparent 28%),radial-gradient(circle at 18% 42%,rgba(63,185,80,.16),transparent 24%),radial-gradient(circle at 88% 55%,rgba(188,140,255,.16),transparent 25%);filter:blur(18px);animation:dtGitHubGlow 12s ease-in-out infinite alternate}
.topNav,.heroCard,.panel,.toolbar,.premiumTrending,.winningPanel,.stat,.signalCard,.card,.trendLink,.m,.metric,.siteChip{background:linear-gradient(180deg,#0d1117,#090d13)!important;border:1px solid var(--dt-border)!important;box-shadow:0 16px 44px rgba(0,0,0,.38),inset 0 1px 0 rgba(255,255,255,.035)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
.premiumTrending,.winningPanel,.signalCard,.stat,.card,.trendLink,.toolbar{position:relative;overflow:hidden}
.premiumTrending::before,.winningPanel::before,.signalCard::before,.stat::before,.card::before,.trendLink::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(115deg,rgba(88,166,255,.55),rgba(63,185,80,.46),rgba(188,140,255,.36),rgba(48,54,61,.25));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.22;pointer-events:none;transition:opacity .3s ease}
.premiumTrending:hover::before,.winningPanel:hover::before,.signalCard:hover::before,.stat:hover::before,.card:hover::before,.trendLink:hover::before{opacity:.85}
h1,.sectionTitle h2,.winningHead h2,.premiumTrending h2{color:#f0f6fc!important;text-shadow:0 0 26px rgba(88,166,255,.16)}
.lead,.muted,.small,.premiumTrending p,.winningHead p,.rateText{color:var(--dt-muted)!important}
.badge,.navPill,.winBadge,.visualChip,.pill{background:rgba(35,134,54,.14)!important;border:1px solid rgba(63,185,80,.34)!important;color:#7ee787!important;box-shadow:none!important}
input,select,button,.currencyBtn{background:#0d1117!important;border:1px solid var(--dt-border)!important;color:#f0f6fc!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.03)!important}
button,.currencyBtn.active{background:linear-gradient(180deg,#238636,#1f6f30)!important;border-color:rgba(63,185,80,.55)!important;color:#fff!important}
.currencyBtn:not(.active){background:#0d1117!important;color:#f0f6fc!important}
.motion-ready .topNav,.motion-ready .hero,.motion-ready .premiumTrending,.motion-ready .winningPanel,.motion-ready .sectionTitle,.motion-ready .panel{animation:dtFadeUp .7s cubic-bezier(.22,1,.36,1) both}
.motion-ready .stat,.motion-ready .trendLink,.motion-ready .signalCard,.motion-ready .card{opacity:0;transform:translateY(18px) scale(.985)}
.motion-ready .dt-in{animation:dtFadeUp .62s cubic-bezier(.22,1,.36,1) forwards}
.stat{transition:transform .28s cubic-bezier(.22,1,.36,1),border-color .28s,box-shadow .28s!important}
.stat b{color:#f0f6fc!important;background:none!important;-webkit-text-fill-color:#f0f6fc;text-shadow:0 0 20px rgba(88,166,255,.18)}
.stat::after{content:"";position:absolute;width:110px;height:110px;right:-55px;top:-55px;border-radius:50%;background:radial-gradient(circle,rgba(88,166,255,.20),transparent 66%);animation:dtOrbBreathe 4s ease-in-out infinite;pointer-events:none}
.stat:hover,.signalCard:hover,.trendLink:hover{transform:translateY(-4px);border-color:#58a6ff!important;box-shadow:0 24px 60px rgba(0,0,0,.48),0 0 0 1px rgba(88,166,255,.18)!important}
.signalPanel{position:relative}
.signalCard span{color:#7ee787!important;font-weight:900!important;letter-spacing:.55px!important}
.signalCard b{color:#f0f6fc!important}
.signalBars{gap:12px!important;margin:16px 0!important}
.signalRow{grid-template-columns:82px 1fr 45px!important;gap:10px!important;align-items:center!important;position:relative;z-index:2}
.signalRow>span:first-child{color:#8b949e!important;font-weight:900!important;text-transform:uppercase;letter-spacing:.45px!important}
.signalRow>span:last-child{color:#f0f6fc!important;font-weight:900!important;text-align:right!important}
.signalBar{height:9px!important;background:#010409!important;border:1px solid #30363d!important;border-radius:999px!important;overflow:hidden!important;box-shadow:inset 0 1px 6px rgba(0,0,0,.65)!important;position:relative!important}
.signalBar::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(240,246,252,.16),transparent);transform:translateX(-120%);animation:dtBarSweep 2.2s ease-in-out infinite}
.signalBar i{height:100%!important;border-radius:999px!important;background:linear-gradient(90deg,#238636,#3fb950,#7ee787)!important;background-size:220% 100%!important;box-shadow:0 0 15px rgba(63,185,80,.55)!important;transform-origin:left;animation:dtBarGrow 1.1s cubic-bezier(.22,1,.36,1) both,dtBarFlow 2.4s linear infinite!important;position:relative!important}
.signalBar i::after{content:"";position:absolute;right:-4px;top:50%;width:8px;height:8px;border-radius:50%;background:#f0fff4;box-shadow:0 0 12px #7ee787;transform:translateY(-50%)}
.card{transition:transform .28s cubic-bezier(.22,1,.36,1),border-color .28s,box-shadow .28s!important;will-change:transform}
.card:hover{transform:translateY(-6px);border-color:#58a6ff!important;box-shadow:0 28px 72px rgba(0,0,0,.55),0 0 0 1px rgba(88,166,255,.20)!important}
.card::after,.trendLink::after,.signalCard::after,.stat .dt-shine{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent,rgba(88,166,255,.10),transparent);transform:translateX(-130%);pointer-events:none}
.card:hover::after,.trendLink:hover::after,.signalCard:hover::after{animation:dtShine .8s ease both}
.img img{transition:transform .65s ease,filter .65s ease}.card:hover .img img{transform:scale(1.045);filter:saturate(1.06) contrast(1.04)}
.scoreRing{animation:dtRingPulse 2.8s ease-in-out infinite}.score,.navPill{animation:dtSoftPulse 3s ease-in-out infinite}
button,.currencyBtn,.siteChip,.menuItem{transition:transform .2s ease,filter .2s ease,border-color .2s ease!important}button:hover,.currencyBtn:hover,.siteChip:hover,.menuItem:hover{transform:translateY(-2px);filter:brightness(1.08)}
.sideMenu{background:#0d1117!important;border-right:1px solid #30363d!important;transition:transform .32s cubic-bezier(.22,1,.36,1)!important}.menuItem{opacity:0;transform:translateX(-14px);background:#0d1117!important;border-bottom:1px solid #21262d!important}#menuToggle:checked ~ .sideMenu .menuItem{animation:dtMenuSlide .42s ease forwards}
@keyframes dtFadeUp{from{opacity:0;transform:translateY(22px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes dtShine{from{transform:translateX(-130%)}to{transform:translateX(130%)}}
@keyframes dtSoftPulse{0%,100%{box-shadow:0 0 0 rgba(63,185,80,0)}50%{box-shadow:0 0 22px rgba(63,185,80,.20)}}
@keyframes dtRingPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
@keyframes dtMenuSlide{to{opacity:1;transform:translateX(0)}}
@keyframes dtBarGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes dtBarFlow{from{background-position:0% 50%}to{background-position:220% 50%}}
@keyframes dtBarSweep{0%,35%{transform:translateX(-120%)}100%{transform:translateX(120%)}}
@keyframes dtOrbBreathe{0%,100%{transform:scale(.85);opacity:.35}50%{transform:scale(1.18);opacity:.75}}
@keyframes dtGitHubGlow{0%{transform:translate3d(-1%,0,0) scale(1)}100%{transform:translate3d(2%,-2%,0) scale(1.04)}}
@media(max-width:600px){.signalRow{grid-template-columns:64px 1fr 32px!important;gap:7px!important}.signalBar{height:8px!important}.card:hover,.stat:hover,.signalCard:hover{transform:translateY(-2px)}}
@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}.wrap::after,.motion-ready .topNav,.motion-ready .hero,.motion-ready .premiumTrending,.motion-ready .winningPanel,.motion-ready .sectionTitle,.motion-ready .panel,.motion-ready .dt-in,.score,.navPill,.scoreRing,#menuToggle:checked ~ .sideMenu .menuItem,.signalBar::after,.signalBar i,.stat::after{animation:none!important}.motion-ready .stat,.motion-ready .trendLink,.motion-ready .signalCard,.motion-ready .card,.menuItem{opacity:1!important;transform:none!important}.card:hover,.card:hover .img img,button:hover,.currencyBtn:hover,.siteChip:hover,.menuItem:hover,.stat:hover,.signalCard:hover{transform:none!important}}
`;

html = html.replace(/\/\* DropTrend premium motion upgrade \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace(/\/\* DropTrend GitHub-dark motion upgrade \*\/[\s\S]*?(?=<\/style>)/g, '');
html = html.replace('</style>', animationCss + '\n</style>');

const animationJs = `
<script>
(function(){
  function initDropTrendMotion(){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('motion-ready');
    const targets = '.stat,.trendLink,.signalCard,.card,.sectionTitle,.panel';
    const reveal = (el, index) => {
      if (el.dataset.dtMotion) return;
      el.dataset.dtMotion = '1';
      el.style.animationDelay = Math.min(index * 45, 360) + 'ms';
      el.classList.add('dt-in');
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = Array.from(document.querySelectorAll(targets));
            reveal(entry.target, items.indexOf(entry.target));
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll(targets).forEach(el => observer.observe(el));
      const mo = new MutationObserver(() => document.querySelectorAll(targets).forEach(el => {
        if (!el.dataset.dtMotion) observer.observe(el);
      }));
      mo.observe(document.body, { childList: true, subtree: true });
    } else document.querySelectorAll(targets).forEach(reveal);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initDropTrendMotion);
  else initDropTrendMotion();
})();
</script>`;

html = html.replace(/<script>\s*\(function\(\)\{\s*function initDropTrendMotion\(\)[\s\S]*?<\/script>\s*/g, '');
html = html.replace('</body>', animationJs + '\n</body>');

fs.writeFileSync(file, html, 'utf8');
console.log('Patched homepage UI: GitHub-dark black cards, cleaner signal animations, premium glow.');
