const {chromium}=require('/opt/node-tools/node_modules/playwright');
const path=require('path');
(async()=>{
 const b=await chromium.launch();const errs=[];
 for(const vp of [{width:1280,height:900},{width:390,height:800}]){
  const pg=await b.newPage({viewport:vp});
  pg.on('pageerror',e=>errs.push('PAGE '+e.message));
  pg.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE '+m.text())});
  await pg.goto('file://'+path.resolve(__dirname,'..','치과병리학_중간대비.html')+'#photo');
  await pg.waitForTimeout(400);
  const r=await pg.evaluate(async()=>{
   const cards=document.querySelectorAll('.sp').length;
   const imgs=[...document.querySelectorAll('.sp img')];
   imgs.forEach(i=>i.loading='eager');
   await new Promise(r=>setTimeout(r,1500));
   return {cards,imgs:imgs.length,broken:imgs.filter(i=>!(i.complete&&i.naturalWidth>0)).length,hs:document.documentElement.scrollWidth>innerWidth+1};
  });
  console.log(vp.width,'study',JSON.stringify(r));
  await pg.click('#pm-on');await pg.waitForTimeout(200);
  const m=await pg.evaluate(()=>({cards:document.querySelectorAll('.sp').length,txt:document.querySelector('.bar .chip.w').textContent,sc:document.querySelector('#pscore').textContent,hs:document.documentElement.scrollWidth>innerWidth+1}));
  console.log(' mock',JSON.stringify(m));
  await pg.click('button[data-pmk]');
  console.log(' mark',await pg.evaluate(()=>document.querySelector('#pscore').textContent));
  await pg.click('#pm-draw');await pg.click('#pm-off');
  await pg.click('button[data-pc="slide"]');
  console.log(' filter slide',await pg.evaluate(()=>document.querySelectorAll('.sp').length));
  await pg.click('button[data-ch="4"]');
  console.log(' slide+ch4',await pg.evaluate(()=>document.querySelectorAll('.sp').length));
  await pg.close();
 }
 console.log('ERRORS',JSON.stringify(errs));await b.close();
})();
