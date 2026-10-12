const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const p=await b.newPage({viewport:{width:1280,height:900}});
 const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
 await p.goto('file:///'+process.cwd()+'/full.html'); await p.waitForTimeout(500);
 // reload full.html from page.html
 const fs=require('fs');fs.writeFileSync('full.html','<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+fs.readFileSync('page.html','utf8')+'</body></html>');
 await p.goto('file:///'+process.cwd()+'/full.html'); await p.waitForTimeout(500);
 console.log('chip',await p.evaluate(()=>document.querySelector('#chips .chip').textContent));
 // show answers on first conflict card via filter
 await p.click('button[data-act="st"][data-v="충돌"]'); await p.waitForTimeout(100);
 console.log('conflict list',await p.evaluate(()=>document.querySelectorAll('#cards .card').length));
 await p.click('#cards .card button[data-act="toggle"]'); await p.waitForTimeout(100);
 await p.screenshot({path:'shot_conf.png'});
 // ua
 await p.click('button[data-act="ua"][data-k="4"]'); await p.waitForTimeout(100);
 console.log('ua badge',await p.evaluate(()=>document.querySelector('#cards .card .st-사용자')?.textContent));
 await p.click('button[data-act="export"]'); await p.waitForTimeout(300);
 console.log('export',await p.evaluate(()=>document.querySelector('#exportbox')?.innerText.slice(0,200)));
 // exam mode
 await p.click('button[data-act="st"][data-v="충돌"]');
 await p.click('button[data-act="exam"]'); await p.waitForTimeout(200); await p.screenshot({path:'shot_exam.png'});
 await p.click('button[data-act="showall"]'); await p.waitForTimeout(200);
 // mock
 await p.click('button[data-act="exam"]');
 await p.click('button[data-tab="mock"]'); await p.waitForTimeout(300);
 console.log('mock n',await p.evaluate(()=>document.querySelectorAll('#cards .card').length));
 await p.click('button[data-act="minew"]'); await p.waitForTimeout(200);
 console.log('mock n(new)',await p.evaluate(()=>document.querySelectorAll('#cards .card').length));
 for(let i=0;i<5;i++){ await p.click('#cards .card:nth-child('+(i+1)+') li:nth-child(2)'); }
 await p.click('button[data-act="grade"]'); await p.waitForTimeout(200);
 console.log('mock score',await p.evaluate(()=>document.querySelector('#score').innerText));
 await p.screenshot({path:'shot_mock.png'});
 await p.click('button[data-tab="sum"]'); await p.click('details.cd:nth-of-type(3) summary'); await p.waitForTimeout(200); await p.screenshot({path:'shot_sum.png'});
 await p.click('button[data-tab="new"]'); await p.waitForTimeout(200); await p.click('#app .card button[data-act="toggle"]'); await p.screenshot({path:'shot_new.png'});
 console.log('ERRORS',JSON.stringify(errs));
 await b.close();
})();
