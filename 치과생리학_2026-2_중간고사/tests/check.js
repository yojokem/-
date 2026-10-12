const { chromium } = require('playwright');
(async()=>{
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}).catch(async()=>chromium.launch());
  const p = await b.newPage({viewport:{width:1200,height:900}});
  const errs=[]; p.on('pageerror',e=>errs.push('PAGEERR '+e.message)); p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE '+m.text())});
  await p.route('**/*',r=>{const u=r.request().url(); if(u.startsWith('file:'))r.continue(); else r.abort();});
  await p.goto('file:///tmp/claude-0/-home-user--/52832755-39cd-5fa6-98d7-26b4c1c0abac/scratchpad/dental_physiology_midterm.html');
  const out={};
  for(const t of ['mc','ds','sum','exp','mock','info']){
    await p.click(`[data-t="${t}"]`);
    out[t]=await p.evaluate(()=>({cards:document.querySelectorAll('.card').length,omr:document.querySelectorAll('#omrBody .omr-row').length,len:document.getElementById('main').innerText.length}));
  }
  await p.click('[data-t="mc"]');
  await p.click('#c-mc-24-2025-M-MC-02 li:nth-child(1)');
  await p.click('[data-act="grade"][data-ctx="mc"]');
  out.grade=await p.textContent('#gres');
  await p.click('[data-act="rev"][data-id="24-2025-M-MC-02"]');
  out.revealed=await p.evaluate(()=>!!document.querySelector('#c-mc-24-2025-M-MC-02 .ansbox'));
  await p.check('#optOut'); out.outCards=await p.evaluate(()=>document.querySelectorAll('[id^="c-out-"]').length);
  await p.check('#optPaper'); out.paperHidden=await p.evaluate(()=>getComputedStyle(document.querySelector('.st')||document.body).display);
  await p.uncheck('#optPaper');
  await p.click('[data-t="mock"]'); await p.selectOption('#mN','10'); await p.click('[data-act="mockNew"]');
  out.mockCards=await p.evaluate(()=>document.querySelectorAll('[id^="c-mock-"]').length);
  await p.click('[data-act="mockGrade"]'); out.mres=(await p.textContent('#mres')).slice(0,80);
  await p.click('[data-t="exp"]'); await p.click('[data-act="grade"][data-ctx="exp"]'); out.expgrade=await p.textContent('#gres');
  await p.click('[data-t="mc"]'); await p.screenshot({path:'/tmp/claude-0/-home-user--/52832755-39cd-5fa6-98d7-26b4c1c0abac/scratchpad/tests/desk.png'});
  await p.setViewportSize({width:400,height:850}); out.hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);
  await p.screenshot({path:'/tmp/claude-0/-home-user--/52832755-39cd-5fa6-98d7-26b4c1c0abac/scratchpad/tests/phone.png'});
  console.log(JSON.stringify(out,null,1)); console.log('ERRORS',errs);
  await b.close();
})();
