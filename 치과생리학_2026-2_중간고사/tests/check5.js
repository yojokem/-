const { chromium } = require('playwright');
(async()=>{
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const p = await b.newPage({viewport:{width:1100,height:900}});
  const errs=[]; p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
  await p.route('**/*',r=>{r.request().url().startsWith('file:')?r.continue():r.abort()});
  await p.goto('file://'+process.argv[2]);
  console.log(JSON.stringify(await p.evaluate(()=>({
    dsb:DSB.length, keyMiss:DSB.filter(c=>!SUM.some(s=>s.items.some(i=>i[0]===c.key))).map(c=>c.id),
    past:saPast().length, pastNoGroup:saPast().filter(c=>!c.groups.length).map(c=>c.id),
    t:[ saMatch(DSB[0],"항상성").ok, saMatch(DSB[0],"homeostasis").ok, saMatch(DSB[0],"음").ok, saMatch(DSB[1],"감지기, 효과기").hit, saMatch(DSB[1],"감지기 효과기 신호전달기전").ok, saMatch(DSB[2],"60%").ok, saMatch(DSB[2],"").empty ],
    pastT:[ saMatch(saPast().find(c=>c.id==="24-2025-M-DS-04"),"K+").ok, saMatch(saPast().find(c=>c.id==="24-2025-M-DS-04"),"칼륨 이온").ok, saMatch(saPast().find(c=>c.id==="24-2025-M-DS-39"),"전압의존성 Na 통로").ok ]
  }))));
  await p.click('[data-t="sa"]');
  console.log('past cards',await p.evaluate(()=>document.querySelectorAll('.sacard').length));
  await p.fill('.sain[data-id="24-2025-M-DS-01"]','항상성'); await p.click('[data-act="saCheck"][data-id="24-2025-M-DS-01"]');
  console.log(await p.evaluate(()=>document.querySelector('#c-sa-24-2025-M-DS-01').innerText.replace(/\n/g,' | ').slice(0,200)));
  await p.click('[data-act="saMode"][data-m="exp"]');
  await p.fill('.sain[data-id="SA-02"]','감지기 효과기'); await p.click('[data-act="saCheck"][data-id="SA-02"]');
  console.log(await p.evaluate(()=>document.querySelector('#c-sa-SA-02').innerText.replace(/\n/g,' | ').slice(0,260)));
  await p.screenshot({path:'sa.png'});
  await p.click('[data-act="saMode"][data-m="kw"]'); console.log('kw',await p.evaluate(()=>document.querySelectorAll('.sacard').length));
  await p.screenshot({path:'sa_kw.png'});
  await p.reload(); await p.click('[data-t="sa"]'); console.log('persist',await p.evaluate(()=>JSON.stringify(SAR)));
  await p.setViewportSize({width:390,height:800}); console.log('noHscroll',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  console.log('ERRORS',JSON.stringify(errs)); await b.close();
})();
