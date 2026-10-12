const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(async e=>{console.log('launch1 fail',e.message.slice(0,200));return await chromium.launch()});
 const p=await b.newPage({viewport:{width:1280,height:900}});
 const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
 const html='<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+require('fs').readFileSync('page.html','utf8')+'</body></html>';
 require('fs').writeFileSync('full.html',html);
 await p.goto('file:///'+process.cwd()+'/full.html');
 await p.waitForTimeout(800);
 const tabs=['mc','ds','sum','new','mock','stat'];
 for(const t of tabs){await p.click('button[data-tab="'+t+'"]');await p.waitForTimeout(300);const n=await p.evaluate(()=>document.querySelectorAll('.card,details.cd').length);console.log(t,'cards',n);}
 await p.click('button[data-tab="mc"]');
 await p.click('.omr-c');await p.click('button[data-act="grade"]');await p.waitForTimeout(200);
 console.log('score',await p.evaluate(()=>document.querySelector('#score').textContent));
 await p.screenshot({path:'shot_mc.png'});
 await p.click('button[data-tab="stat"]');await p.waitForTimeout(200);await p.screenshot({path:'shot_stat.png',fullPage:false});
 await p.setViewportSize({width:400,height:850});await p.click('button[data-tab="mc"]');await p.waitForTimeout(300);
 const ov=await p.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);console.log('overflowX',ov);
 await p.screenshot({path:'shot_phone.png'});
 console.log('ERRORS',JSON.stringify(errs));
 await b.close();
})();
