const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const p=await b.newPage({viewport:{width:1280,height:900}});
 const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('file:///'+process.cwd()+'/full.html'); await p.waitForTimeout(400);
 await p.click('button[data-tab="stat"]'); await p.waitForTimeout(300);
 const h=await p.evaluate(()=>document.body.scrollHeight);console.log('h',h);
 await p.screenshot({path:'stat_full.png',fullPage:true});
 console.log(JSON.stringify(errs));await b.close();
})();
