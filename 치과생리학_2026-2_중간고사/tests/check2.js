const { chromium } = require('playwright');
(async()=>{
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}).catch(async()=>chromium.launch());
  const p = await b.newPage({viewport:{width:1100,height:900}});
  const errs=[]; p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
  await p.route('**/*',r=>{const u=r.request().url(); if(u.startsWith('file:'))r.continue(); else r.abort();});
  await p.goto('file:///tmp/claude-0/-home-user--/52832755-39cd-5fa6-98d7-26b4c1c0abac/scratchpad/dental_physiology_midterm.html');
  const out=await p.evaluate(()=>{
    const ids=Q.map(q=>q.id), dup=ids.filter((x,i)=>ids.indexOf(x)!==i);
    const bad=[]; B.forEach(b=>b.der.forEach(d=>{if(!ids.includes(d))bad.push(b.id+'->'+d)}));
    const cnt=c=>[Q.filter(q=>q.ch===c).length,B.filter(b=>b.ch===c).length];
    const stat={};Q.forEach(q=>stat[q.status]=(stat[q.status]||0)+1);
    const srcMiss=[];Q.forEach(q=>{(q.ev||[]).forEach(e=>{if(!SRC[e[1]])srcMiss.push(q.id+':'+e[1])});(q.srcs||[]).forEach(s=>{if(!SRC[s[4]])srcMiss.push(q.id+':'+s[4])})});
    B.forEach(b=>{if(!SRC[b.ev[0]])srcMiss.push(b.id)});
    const noAns=B.filter(b=>b.form==='MC'&&(!b.ans||b.ans.some(i=>i>=b.opts.length))).map(b=>b.id);
    const qBad=Q.filter(q=>q.form==='MC'&&q.ans&&q.ans.some(i=>i>=q.opts.length)).map(q=>q.id);
    return {Q:Q.length,B:B.length,dup,bad,ch:[1,2,3,4,5].map(cnt),stat,srcMiss,noAns,qBad};
  });
  console.log(JSON.stringify(out));
  for(const t of ['mc','ds','sum','exp','mock','info']){await p.click(`[data-t="${t}"]`);}
  console.log('ERRORS',errs);
  await b.close();
})();
