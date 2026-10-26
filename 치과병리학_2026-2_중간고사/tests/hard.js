const {chromium}=require('/opt/node-tools/node_modules/playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const errs=[];
for(const vp of [{width:1280,height:900},{width:390,height:800}]){
 const pg=await b.newPage({viewport:vp});pg.on('pageerror',e=>errs.push(e.message));
 await pg.goto('file://'+path.resolve(__dirname,'..','치과병리학_중간대비.html')+'#hard');await pg.waitForTimeout(300);
 const r=await pg.evaluate(()=>({cards:document.querySelectorAll('article.q').length,omr:document.querySelectorAll('.orow').length,opts:[...document.querySelectorAll('article.q')].every(a=>a.querySelectorAll('.opt').length===5),hs:document.documentElement.scrollWidth>innerWidth+1}));
 console.log(vp.width,JSON.stringify(r));
 await pg.click('button[data-ch="4"]');console.log(' ch4',await pg.evaluate(()=>document.querySelectorAll('article.q').length));
 if(vp.width===1280){await pg.click('button[data-ch="all"]');await pg.screenshot({path:process.argv[2]})}
 await pg.close()}
console.log('errors',JSON.stringify(errs));await b.close()})();
