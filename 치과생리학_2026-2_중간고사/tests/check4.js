const { chromium } = require('playwright');
(async()=>{
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const p = await b.newPage({viewport:{width:1100,height:900}});
  const errs=[]; p.on('pageerror',e=>errs.push('PAGEERR '+e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.route('**/*',r=>{const u=r.request().url(); if(u.startsWith('file:'))r.continue(); else r.abort();});
  await p.goto('file://'+process.argv[2]);
  console.log(JSON.stringify(await p.evaluate(()=>({Q:Q.length,B:B.length,KS:KS.length,sum:SUM.map(s=>s.items.length),kwMiss:SUM.flatMap(s=>s.items.filter(i=>!KW[i[0]]).map(i=>i[0])),conc:concStats().map(c=>[c.name,c.qs.length,c.ks.length]),yr:yearRows().map(r=>[r.y,r.lab,r.c.slice(1).join("")])}))));
  await p.click('[data-t="sum"]'); console.log('sum cards',await p.evaluate(()=>document.querySelectorAll('.sumcard').length));
  await p.screenshot({path:'sum.png'});
  await p.click('[data-t="all"]'); console.log('all rows',await p.evaluate(()=>[document.querySelectorAll('.sumtbl tr').length,document.querySelectorAll('.crow').length,document.querySelectorAll('table.yr tr').length]));
  await p.screenshot({path:'all.png',fullPage:true});
  await p.setViewportSize({width:390,height:800}); await p.screenshot({path:'all_m.png'});
  console.log(await p.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1));
  await p.evaluate(()=>{document.documentElement.dataset.theme='dark'}); await p.screenshot({path:'all_d.png'});
  console.log('ERRORS',JSON.stringify(errs));
  await b.close();
})();
