const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs=require('fs');
const SP='/tmp/claude-0/-home-user--/45cdc023-c8c5-5da4-af46-9b3dfdc2bd40/scratchpad/build';
(async()=>{
  const src=fs.readFileSync(__dirname+'/../치과병리학_중간대비.html','utf8');
  fs.writeFileSync(SP+'/wrapped.html','<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light}body{margin:0;font-size:14px}[hidden]{display:none!important}</style></head><body>'+src.replace(/<title>.*?<\/title>/,'')+'</body></html>');
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}).catch(()=>chromium.launch());
  const p=await b.newPage({viewport:{width:1200,height:900}});
  const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE '+m.text())});
  await p.route('**/*',r=>{const u=r.request().url();if(u.startsWith('file:'))r.continue();else r.abort();});
  await p.goto('file://'+SP+'/wrapped.html');
  const info=await p.evaluate(()=>({past:PAST.length,inScope:PAST.filter(q=>!q.oos).length,nw:NEWQ.length,notes:NOTES.length,
    badNk:PAST.concat(NEWQ).filter(q=>q.nk&&!NOTES.some(n=>n.id===q.nk)).map(q=>q.id),dup:PAST.concat(NEWQ).map(q=>q.id).filter((x,i,a)=>a.indexOf(x)!==i),badEv:PAST.concat(NEWQ).flatMap(q=>(q.ev||[]).filter(e=>!SRC[e[1]]).map(e=>q.id+e[1])),badW:PAST.concat(NEWQ).filter(q=>q.opts.length&&q.w&&q.w.length!==q.opts.length).map(q=>q.id),badAns:PAST.concat(NEWQ).filter(q=>q.ans&&q.ans.some(a=>a>q.opts.length)).map(q=>q.id),badNoteQ:NOTES.flatMap(n=>(n.q||[]).filter(i=>!PAST.concat(NEWQ).some(q=>q.id===i)).map(i=>n.id+':'+i))}));
  console.log(JSON.stringify(info));
  async function shot(n,w=1200,h=900){await p.setViewportSize({width:w,height:h});await p.screenshot({path:SP+'/'+n+'.png',fullPage:false})}
  await shot('past');
  // click option & OMR bubble
  await p.click('#q-23-2025-M-MC-01 .opt[data-i="2"]');
  console.log('omr pressed', await p.evaluate(()=>document.querySelector('.bub[data-q="23-2025-M-MC-01"][data-i="2"]').getAttribute('aria-pressed')));
  await p.click('#q-23-2025-M-MC-01 [data-show]');
  console.log('reveal', (await p.textContent('#q-23-2025-M-MC-01 .reveal')).slice(0,80));
  await p.click('#b-grade');
  console.log('score', (await p.textContent('#score')).replace(/\s+/g,' '));
  await shot('past2');
  // tabs
  for(const t of ['new','notes','all','mock','status']){
    await p.click('[data-tab="'+t+'"]');
    console.log(t, await p.evaluate(()=>document.querySelector('#main').innerText.length));
    await shot('tab_'+t);
  }
  await p.click('[data-tab="mock"]');
  console.log('mock cards', await p.evaluate(()=>document.querySelectorAll('#main article.q').length));
  await p.click('#m-start');await p.waitForTimeout(1200);
  console.log('timer', await p.textContent('#timer'));
  // exam mode
  await p.click('[data-tab="past"]');
  await p.check('#t-exam');
  await shot('exam');
  console.log('badges visible in exam', await p.evaluate(()=>[...document.querySelectorAll('.badge')].filter(e=>e.offsetParent).length));
  // mobile
  await p.uncheck('#t-exam');
  await shot('mobile',390,800);
  console.log('hscroll', await p.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth));
  console.log('ERRORS',JSON.stringify(errs));
  await b.close();
})();
