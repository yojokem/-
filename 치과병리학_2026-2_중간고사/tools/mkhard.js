/* 심화 탭 데이터 생성: node tools/mkhard.js → src/data_hard.js (tools/hard_items.js 입력) */
const fs=require('fs');
const H=require('./hard_items.js');
function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
const r=rng(2026);
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const LET=['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ'];
const NK={'적응(비대·증식·위축·화생)':'n2a','세포손상과 괴사의 형태':'n2c','괴사의 종류':'n2d','세포사의 유형':'n2f2','세포자멸사(apoptosis)의 경로와 신호':'n2f','칼슘·미토콘드리아·ROS':'n2e','텔로머라아제와 세포 내 축적물':'n2g','석회화':'n2g',
 '급성염증의 5대 징후':'n3a','백혈구의 이동':'n3c','호중구':'n3c','염증 매개체':'n3d','보체계와 키닌계':'n3d','육아종성 염증':'n3f','대식세포 M1·M2':'n3f','창상 치유와 조직 분류':'n3h','삼출액과 누출액':'n4a','염증의 형태':'n3e',
 '부종':'n4a','울혈과 충혈':'n4b','혈소판 부착과 응집':'n4c','정상 내피세포와 트롬빈':'n4c','응고 검사':'n4c','혈전과 색전':'n4d','경색':'n4f','쇼크의 분류와 원인':'n4g',
 '염증반응의 5단계(5R)':'n3a','정상 지혈 과정':'n4c','백혈구가 염증 부위로 이동하는 과정':'n3c','포식작용의 3단계':'n3c','괴사의 종류와 특징':'n2d','세포사의 유형과 특징':'n2f2','염증 매개체와 특징':'n3d','조직의 증식능력 분류와 예':'n3h'};
const out=[];let k=0;
const TP=shuf(Array.from({length:80},(_,i)=>i%5+1));
const key=a=>a.join('|');
function pickOpts(correct,cands,n){ /* correct: 정답 문자열, cands: 오답 후보(우선순위순) */
  const o=[correct];for(const c of cands){if(o.length>=n)break;if(!o.includes(c))o.push(c)}return o}
/* 합답형 */
H.C.forEach(([ch,nkIgnored,neg,title,st])=>{
  const NN=st.length;const order=shuf([...Array(NN).keys()]);const S=order.map((i,p)=>({t:st[i][0],v:!!st[i][1],w:st[i][2],l:LET[p]}));
  const want=neg?S.filter(s=>!s.v):S.filter(s=>s.v);const A=want.map(s=>s.l);
  const ans=A.join(', ');
  /* 오답: 정답에서 한 칸 더하거나 빼거나 바꾼 조합 → 근접 오답 우선 */
  const all=[];for(let m=1;m<(1<<NN);m++){const c=[];for(let b=0;b<NN;b++)if(m&(1<<b))c.push(LET[b]);all.push(c)}
  const dist=c=>{const a=new Set(A),b=new Set(c);let d=0;LET.slice(0,NN).forEach(l=>{if(a.has(l)!==b.has(l))d++});return d};
  const near=shuf(all.filter(c=>dist(c)===1)).concat(shuf(all.filter(c=>dist(c)===2)),shuf(all.filter(c=>dist(c)>=3)));
  const opts=pickOpts(A,near,5).map(c=>c.join(', '));
  /* 선지 정렬: 항목 수 → 사전순(시험지 관례) */
  const sorted=opts.slice().sort((x,y)=>x.split(', ').length-y.split(', ').length||x.localeCompare(y,'ko'));
  const tp=TP.pop();const others=sorted.filter(x=>x!==ans);others.splice(tp-1,0,ans);sorted.length=0;others.forEach(x=>sorted.push(x));const pos=tp;
  const box='<div class="bo">'+S.slice().sort((a,b)=>LET.indexOf(a.l)-LET.indexOf(b.l)).map(s=>'<div><b>'+s.l+'.</b> '+s.t+'</div>').join('')+'</div>';
  k++;
  out.push({id:'H-'+String(k).padStart(2,'0'),set:'hard',ch,n:k+'번',lab:'심화 · 합답형',src:title,stem:'다음 &lt;보기&gt; 중 '+title+'에 대한 설명으로 '+(neg?'옳지 않은':'옳은')+' 것만을 있는 대로 고른 것은?'+box,
    opts:sorted,ans:[pos],st:'추정',tier:'T4',conf:'중',nk:NK[title],
    sum:S.slice().sort((a,b)=>LET.indexOf(a.l)-LET.indexOf(b.l)).map(s=>s.l+' '+(s.v?'옳음':'옳지 않음')+' — '+s.t+' ('+s.w+')'),
    ev:[['T4','Ch'+ch,title,'기존 문항 해설(교안 근거)의 진술을 조합']],note:'교안 문장 근거(T4) 추정입니다. 진술은 기출·예상 문항의 해설에서 가져와 조합했습니다.'});
});
/* 순서 배열 */
H.O.forEach(([ch,nk,title,steps])=>{
  const n=steps.length;const idx=shuf([...Array(n).keys()]);          // 보기 표시 순서: idx[p]=정답 순서의 index
  const L=idx.map((si,p)=>({l:LET[p],t:steps[si],si}));
  const correct=steps.map((_,si)=>L.find(x=>x.si===si).l);
  const fmt=a=>a.join(' → ');
  const swaps=[];for(let i=0;i<n-1;i++){const c=correct.slice();[c[i],c[i+1]]=[c[i+1],c[i]];swaps.push(c)}
  for(let i=0;i<n-2;i++){const c=correct.slice();[c[i],c[i+2]]=[c[i+2],c[i]];swaps.push(c)}
  const cands=shuf(swaps).map(fmt);const o=pickOpts(fmt(correct),cands,5);
  while(o.length<5){const c=shuf(correct);const f=fmt(c);if(!o.includes(f))o.push(f)}
  const tp=TP.pop();const so=shuf(o.filter(x=>x!==fmt(correct)));so.splice(tp-1,0,fmt(correct));const pos=tp;k++;
  out.push({id:'H-'+String(k).padStart(2,'0'),set:'hard',ch,n:k+'번',lab:'심화 · 순서 배열',src:title,stem:title+'의 순서로 옳은 것은?<div class="bo">'+L.slice().sort((a,b)=>LET.indexOf(a.l)-LET.indexOf(b.l)).map(s=>'<div><b>'+s.l+'.</b> '+s.t+'</div>').join('')+'</div>',
    opts:so,ans:[pos],st:'추정',tier:'T4',conf:'상',nk:NK[title],sum:['정답 순서: '+steps.join(' → ')],ev:[['T4','Ch'+ch,title,'교안 단계 순서']],note:'교안 단계 순서(T4) 기준입니다.'});
});
/* 짝짓기 */
H.M.forEach(([ch,nk,title,[items,descs],amap])=>{
  const n=items.length;const dorder=shuf([...Array(n).keys()]);                 // 표시 순서
  const D=dorder.map((di,p)=>({l:LET[p],t:descs[di],di}));
  const LAB=['가','나','다','라'];
  const correct=items.map((_,i)=>D.find(x=>x.di===amap[i]-1).l);
  const fmt=c=>items.map((_,i)=>LAB[i]+'-'+c[i]).join(', ');
  const cands=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const c=correct.slice();[c[i],c[j]]=[c[j],c[i]];cands.push(c)}
  const o=pickOpts(fmt(correct),shuf(cands).map(fmt),5);
  while(o.length<5){const c=shuf(correct);const f=fmt(c);if(!o.includes(f))o.push(f)}
  const tp=TP.pop();const so=shuf(o.filter(x=>x!==fmt(correct)));so.splice(tp-1,0,fmt(correct));const pos=tp;k++;
  out.push({id:'H-'+String(k).padStart(2,'0'),set:'hard',ch,n:k+'번',lab:'심화 · 짝짓기',src:title,
    stem:title+'에 대하여 (가)~('+LAB[n-1]+')와 &lt;보기&gt;의 설명을 옳게 짝지은 것은?<div class="bo"><div><b>항목</b> '+items.map((t,i)=>'('+LAB[i]+') '+t).join(' · ')+'</div>'+D.map(d=>'<div><b>'+d.l+'.</b> '+d.t+'</div>').join('')+'</div>',
    opts:so,ans:[pos],st:'추정',tier:'T4',conf:'상',nk:NK[title],sum:items.map((t,i)=>t+' → '+correct[i]+'. '+descs[amap[i]-1]),ev:[['T4','Ch'+ch,title,'교안 서술']],note:'교안 문장 근거(T4) 추정입니다.'});
});
/* 그림+이론 합답형 */
{const {PHOTO}=new Function(fs.readFileSync('src/data_photo.js','utf8')+';return {PHOTO}')();
 const HP=require('./hard_photo.js');
 Object.keys(HP).forEach(key=>{
  const n=+key,p=PHOTO.find(x=>x.n===n),[thT,thF,dxF]=HP[n];
  const dx=p.t.replace(/ — /g,' · ');
  const find=(p.k||[]).filter(x=>x&&x.indexOf('추가 설명')<0&&x.indexOf('원문')<0).join(', ');
  const T=[{t:'이 사진의 병변은 '+dx+'에 해당한다.',v:1,w:'선배 정답 라벨(2025-2) 기준'},{t:thT,v:1,w:'교안 근거'}];
  const F=[{t:'이 사진의 병변은 '+dxF+'에 해당한다.',v:0,w:'선배 라벨의 진단은 '+dx},{t:thF,v:0,w:'교안과 다름'}];
  if(find){T.push({t:'이 사진에서 관찰되는 소견은 '+find+'이다.',v:1,w:'선배 라벨 기준'})}
  /* 4진술: 참 2~3, 거짓 1~2 */
  const nT=find&&r()<0.5?3:2;const pickT=shuf(T).slice(0,nT),pickF=shuf(F).slice(0,4-nT);
  const order=shuf(pickT.concat(pickF));const S=order.map((x,i)=>Object.assign({l:LET[i]},x));
  const neg=r()<0.25;const want=S.filter(x=>neg?!x.v:x.v);const A=want.map(x=>x.l);
  const all=[];for(let m=1;m<16;m++){const c=[];for(let b=0;b<4;b++)if(m&(1<<b))c.push(LET[b]);all.push(c)}
  const dist=c=>{let d=0;LET.slice(0,4).forEach(l=>{if(A.includes(l)!==c.includes(l))d++});return d};
  const near=shuf(all.filter(c=>dist(c)===1)).concat(shuf(all.filter(c=>dist(c)===2)),shuf(all.filter(c=>dist(c)>=3)));
  const o=pickOpts(A,near,5).map(c=>c.join(', '));const ans=A.join(', ');
  const tp=TP.pop();const so=o.filter(x=>x!==ans).sort((x,y)=>x.split(', ').length-y.split(', ').length||x.localeCompare(y,'ko'));so.splice(tp-1,0,ans);
  k++;
  out.push({id:'HP-'+String(n).padStart(2,'0'),set:'hard',ch:p.ch,n:k+'번',lab:'심화 · 그림+이론',photo:n,img:'ph_'+(n<10?'0':'')+n+'.jpg',src:'사진 '+n+'번 · 선배 라벨',
   stem:'다음 사진을 보고 &lt;보기&gt; 중 '+(neg?'옳지 않은':'옳은')+' 것만을 있는 대로 고른 것은?<div class="bo">'+S.map(x=>'<div><b>'+x.l+'.</b> '+x.t+'</div>').join('')+'</div>',
   opts:so,ans:[tp],st:'추정',tier:'선배 라벨',conf:'중',nk:p.nk,
   sum:S.map(x=>x.l+' '+(x.v?'옳음':'옳지 않음')+' — '+x.t+' ('+x.w+')'),ev:[['선배 라벨','PHOTO','사진 '+n+'번',p.t]],
   note:'사진의 진단·소견은 선배 라벨(2025-2) 기준, 이론 진술은 교안(T4) 근거입니다. 올해 정답이 아닙니다.'});
 });}
out.forEach(q=>{if(!q.nk)throw new Error('nk '+q.src);if(new Set(q.opts).size!==5)throw new Error('opts '+q.id)});
/* 장·유형 순으로 정렬해 번호를 다시 매긴다 */
out.sort((a,b)=>a.ch-b.ch||a.id.localeCompare(b.id));out.forEach((q,i)=>{q.n=(i+1)+'번'});
fs.writeFileSync('src/data_hard.js','/* 자동 생성(tools/mkhard.js). 직접 고치지 말 것 */\nvar HARDQ='+JSON.stringify(out)+';\n');
const c={};out.forEach(q=>c[q.lab]=(c[q.lab]||0)+1);console.log(out.length,JSON.stringify(c));
const p={};out.forEach(q=>p[q.ans[0]]=(p[q.ans[0]]||0)+1);console.log('answer pos',JSON.stringify(p));
