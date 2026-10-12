const { chromium } = require('playwright');
(async()=>{
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}).catch(async()=>chromium.launch());
  const p = await b.newPage({viewport:{width:1100,height:900}});
  const errs=[]; p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
  await p.route('**/*',r=>{const u=r.request().url(); if(u.startsWith('file:'))r.continue(); else r.abort();});
  await p.goto('file:///tmp/claude-0/-home-user--/52832755-39cd-5fa6-98d7-26b4c1c0abac/scratchpad/dental_physiology_midterm.html');
  const out=await p.evaluate(()=>{
    const ids=Q.map(q=>q.id);
    return {Q:Q.length,B:B.length,KS:KS.length,badMap:KS.flatMap(k=>k.map.filter(d=>!ids.includes(d))),srcMiss:[...Q.flatMap(q=>(q.ev||[]).filter(e=>!SRC[e[1]]).map(e=>q.id+e[1])),...KS.flatMap(k=>[k.q,k.a].filter(s=>!SRC[s]))],ansOk:KS.every(k=>k.ans.every(i=>i<k.opts.length))};
  });
  console.log(JSON.stringify(out));
  await p.click('[data-t="ks"]');
  await p.click('#c-ks-K-78-2-57 li:nth-child(4)');
  await p.click('[data-act="grade"][data-ctx="ks"]');
  console.log(await p.textContent('#gres'));
  await p.click('[data-act="rev"][data-id="K-78-2-57"]');
  console.log(await p.evaluate(()=>document.querySelector('#c-ks-K-78-2-57 .ansbox').innerText));
  console.log(await p.evaluate(()=>document.querySelectorAll('#main .card').length));
  await p.click('[data-t="info"]'); await p.click('[data-t="mc"]');
  console.log('ERRORS',errs);
  await p.screenshot({path:'/tmp/claude-0/-home-user--/52832755-39cd-5fa6-98d7-26b4c1c0abac/scratchpad/tests/ks.png'});
  await b.close();
})();
