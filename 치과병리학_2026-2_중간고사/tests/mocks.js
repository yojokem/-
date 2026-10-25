const {chromium}=require('/opt/node-tools/node_modules/playwright');
const path=require('path');
(async()=>{
 const b=await chromium.launch();const errs=[];let bad=0;
 const chk=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
 for(const vp of [{width:1280,height:900},{width:390,height:800}]){
  const pg=await b.newPage({viewport:vp});
  pg.on('pageerror',e=>errs.push('PAGE '+e.message));
  pg.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE '+m.text())});
  const url='file://'+path.resolve(__dirname,'..','치과병리학_중간대비.html');
  await pg.goto(url+'#m1');await pg.waitForTimeout(300);
  for(const tab of ['m1','m2']){
    await pg.click('button[data-tab="'+tab+'"]');
    for(const [sub,n] of [['T',36],['L',30]]){
      await pg.click('button[data-sub="'+tab+':'+sub+'"]');await pg.waitForTimeout(150);
      const r=await pg.evaluate(async()=>{
        const imgs=[...document.querySelectorAll('article.q img')];imgs.forEach(i=>i.loading='eager');
        await new Promise(r=>setTimeout(r,1200));
        return {cards:document.querySelectorAll('article.q').length,omr:document.querySelectorAll('.orow').length,imgs:imgs.length,broken:imgs.filter(i=>!(i.complete&&i.naturalWidth>0)).length,hs:document.documentElement.scrollWidth>innerWidth+1,opts:[...document.querySelectorAll('article.q')].every(a=>a.querySelectorAll('.opt').length===5)};
      });
      console.log(vp.width,tab,sub,JSON.stringify(r));
      chk(r.cards===n&&r.omr===n,tab+sub+' count');chk(!r.broken,'broken img');chk(!r.hs,'hscroll');chk(r.opts,'5 opts');
    }
  }
  /* 채점: 첫 문항 정답 마킹 */
  await pg.click('button[data-tab="m1"]');await pg.click('button[data-sub="m1:T"]');
  await pg.click('article.q .opt[data-i="1"]');await pg.evaluate(()=>document.querySelector('#b-grade').click());await pg.waitForTimeout(150);
  console.log(' graded',await pg.evaluate(()=>document.querySelector('#score').textContent.slice(0,60)));
  await pg.evaluate(()=>document.querySelector('#b-clear').click());
  await pg.click('button[data-tab="pp"]');await pg.waitForTimeout(200);
  let r=await pg.evaluate(()=>({cards:document.querySelectorAll('article.q').length,hs:document.documentElement.scrollWidth>innerWidth+1}));
  console.log(' pp',JSON.stringify(r));chk(r.cards===64,'pp 64');
  await pg.click('button[data-ppc="slide"]');r=await pg.evaluate(()=>document.querySelectorAll('article.q').length);console.log(' pp slide',r);
  await pg.click('button[data-ch="4"]');r=await pg.evaluate(()=>document.querySelectorAll('article.q').length);console.log(' pp slide ch4',r);
  await pg.click('#t-exam');
  r=await pg.evaluate(()=>[...document.querySelectorAll('article.q .badge')].filter(b=>b.offsetParent!==null).map(b=>b.textContent));
  console.log(' exam badges visible',JSON.stringify(r.slice(0,4)));
  if(vp.width===1280){await pg.click('button[data-tab="m1"]');await pg.screenshot({path:process.argv[2]||'/tmp/m1.png'});}
  await pg.close();
 }
 console.log('errors',JSON.stringify(errs.filter(e=>!/fonts\.g|ERR_|Failed to load resource/.test(e))),'fails',bad);
 await b.close();
})();
