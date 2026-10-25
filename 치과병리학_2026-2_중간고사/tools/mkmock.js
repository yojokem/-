/* 모의고사 1·2 / 실제 사진 연습 데이터를 만든다 → src/data_mock.js
   사용: node tools/mkmock.js  (저장소 루트의 치과병리학_2026-2_중간고사 폴더에서)
   입력: src/data_past.js, src/data_new.js, src/data_photo.js, tools/fixopts.json */
const fs=require('fs');
const rd=f=>fs.readFileSync(f,'utf8');
const {PAST,NEWQ,PHOTO}=new Function(['src/data_past.js','src/data_new.js','src/data_photo.js'].map(rd).join('\n')+';return {PAST,NEWQ,PHOTO}')();
const FIX=JSON.parse(rd('tools/fixopts.json'));
function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
function shuf(a,r){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const plainLen=s=>s.replace(/<[^>]+>/g,'').length;

/* ---------- 이론 텍스트 문항 ---------- */
const BASE={};PAST.concat(NEWQ).forEach(q=>BASE[q.id]=q);
const okQ=q=>q.ans&&q.ans.length===1&&q.ch>=2&&q.ch<=4&&!q.oos&&q.opts&&q.opts.length===5&&q.id!=='23-2025-M-MC-17';
const pastIds=PAST.filter(okQ).map(q=>q.id);
const derIds=NEWQ.filter(q=>okQ(q)&&q.derive).map(q=>q.id);
const nonIds=NEWQ.filter(q=>okQ(q)&&!q.derive).map(q=>q.id);
const chOf=ids=>{const c={2:0,3:0,4:0};ids.forEach(i=>c[BASE[i].ch]++);return c};
function partition(){
  for(let seed=1;seed<5000;seed++){
    const r=rng(seed*31+7);
    const P=shuf(pastIds,r),D=shuf(derIds,r),N=shuf(nonIds,r);
    const nP1=Math.ceil(P.length/2),nD1=9,nN1=Math.floor(N.length/2);
    const m1=P.slice(0,nP1).concat(D.slice(0,nD1),N.slice(0,nN1));
    const m2=P.slice(nP1).concat(D.slice(nD1,nD1+(24-(P.length-nP1)-(N.length-nN1))),N.slice(nN1));
    if(m1.length!==24||m2.length!==24)continue;
    const a=chOf(m1),b=chOf(m2),ok=c=>c[2]>=9&&c[2]<=12&&c[3]>=6&&c[3]<=9&&c[4]>=5&&c[4]<=8;
    if(ok(a)&&ok(b))return {m1,m2,seed};
  }
  throw new Error('no partition');
}
const TAG=id=>{const q=BASE[id];return q.set==='past'?'야마 그대로(23학번 기출)':q.derive?'야마 변형(기출 개념)':'비야마(교안 신규)'};

/* ---------- 사진 표: d 진단명 · g 군(같은 군끼리는 오답 선지로 쓰지 않음) · f 소견 ---------- */
const PT={
1:['심장 비대(hypertrophy)','hyp','심장근육 세포 크기가 커져 장기가 비대해짐'],
2:['허혈성 세포사(경색 부위)','isch','허혈 부위는 밝고 괴사 부위는 어둡게 보임'],
3:['임신성 자궁(생리적 비대)','hyp','호르몬 자극에 의한 생리적 비대'],
4:['정상 자궁(평활근)','uter','정상 평활근 다발'],
5:['임신성 자궁(평활근 비대)','hyp',''],
6:['뇌 위축(atrophy)','atr','병리적 위축'],
7:['상피화생(metaplasia)','meta','원주상피가 편평상피로 대체됨'],
8:['가역적 세포손상','rev','세포종창과 지방변화(표면 공포)'],
9:['비가역적 세포손상(괴사)','nec','핵 소실과 세포 단편화'],
10:['Apoptosis(전자현미경)','apo',''],
11:['Necrosis(전자현미경)','nec',''],
12:['응고괴사(신장경색)','nec','신장 경색에서 조직 윤곽이 유지됨'],
13:['Necrosis의 myelin figure','nec','손상된 세포막 유래의 친수성+소수성(인지질) 층'],
14:['응고괴사','nec','핵 소실(오른쪽 위)'],
15:['액화괴사(고름)','nec',''],
16:['건락괴사(결핵 감염병소)','nec',''],
17:['건락괴사(육아종)','nec','괴사 부위를 둘러싼 염증성 경계의 육아종'],
18:['지방괴사','nec','지방산+칼슘이 만든 백색 부위'],
19:['섬유소성괴사','nec','항원-항체 복합체가 동맥벽에 침착, 유사섬유소'],
20:['섬유소성괴사','nec','항원-항체 복합체가 동맥벽에 침착, 유사섬유소'],
21:['Apoptosis(Type 1 cell death)','apo','사멸 예정 세포'],
23:['Necroptosis','necropt','caspase 비의존, necrosome 형성, DAMPs로 염증 유발'],
26:['Autophagy(Type 2 cell death)','auto','autophagosome과 lysosome이 합쳐져 소화'],
28:['지방증(steatosis)','steat',''],
29:['콜레스테롤 침착증','chol','대식세포(거품세포)'],
30:['세포 내 단백질 방울 축적','prot',''],
32:['비정상 조직 석회화','calc','조직 손상 부위에 칼슘이 축적됨'],
33:['장액성 염증','inf','체액이 삼출됨'],
34:['섬유소성 심장막염','inf','fibrin 침착'],
35:['섬유소성 심장막염','inf','fibrin 침착(F)과 정상 부위(P)'],
36:['만성염증','chr','대식세포·림프구·형질세포 침윤, 실질세포 파괴, 섬유화'],
37:['화농성 염증(고름)','inf','부종성 체액이 고름이 됨'],
38:['화농성 염증(농양)','inf','호중구와 세포 찌꺼기'],
40:['급성염증','inf','호중구 침윤과 혈관 울혈'],
41:['이물형 육아종','chr','봉합사 주위 상피양세포와 다핵거대세포'],
42:['면역 육아종','chr','핵이 없는 괴사 부위와 주변 면역세포'],
43:['육아조직','rep','혈관, 부종, 염증세포, 세포외기질'],
44:['육아조직(trichrome 염색)','rep','콜라겐은 파랑, 혈관은 빨강'],
45:['이차유합의 궤양(당뇨 환자)','rep','압박성 궤양'],
46:['궤양','rep',''],
47:['궤양의 치유','rep','외피 재상피화와 육아조직 형성'],
48:['궤양의 치유','rep','외피 재상피화와 창상 수축'],
49:['켈로이드','rep','과도한 콜라겐 침착'],
50:['켈로이드','rep','두꺼운 결합조직'],
51:['급성염증(초기)','inf','호중구 침윤과 혈관 울혈'],
52:['급성염증(후기)','inf','단핵구·대식세포 침윤'],
53:['호중구 세포외덫(NETs)','nets','미생물을 포획하여 퍼지는 것을 막음'],
54:['급성염증','inf','혈관 울혈'],
55:['급성염증','inf','호중구 침윤'],
56:['림프부종(하지)','edema','림프관 폐쇄로 하지가 부음'],
57:['림프부종(상지)','edema','림프관 폐쇄로 상지가 부음'],
58:['함요부종(pitting edema)','edema','누르면 함몰됨'],
59:['안와주위부종','edema',''],
60:['뇌부종','edema',''],
61:['만성수동성 간울혈(육두구간)','cong','중심부 적갈색, 압박'],
62:['만성수동성 간울혈','cong','중심소엽 괴사'],
63:['일차 지혈 결함','hemo','혈소판 감소증, 점상출혈'],
64:['이차 지혈 결함','hemo','응고인자 결함, 대뇌 내부 출혈'],
65:['벽혈전(mural thrombus)','thr',''],
67:['혈전의 기질화와 재관통','thr','동맥 내강의 기질화와 재관통'],
68:['폐색전증','emb','심부정맥혈전증에서 기원'],
69:['골수색전증','emb','빈 공포(골수 지방)와 기질화된 혈전'],
70:['양수색전증','emb','폐 세동맥 안의 태아 편평세포'],
71:['적색경색(폐)','inf2','정맥 폐쇄, 폐에서 광범위'],
72:['백색경색(지라)','inf2','동맥 폐쇄, 이중혈액공급이 없는 장기']
};
/* 군 → 같은 가족(서로 오답 선지로 쓰면 모호) */
const FAM={nec:'N',apo:'N',necropt:'N',auto:'N',isch:'N',rev:'N',hyp:'H',uter:'H',inf:'I',nets:'I',chr:'C',rep:'R',edema:'E',cong:'E',hemo:'T',thr:'T',emb:'T',inf2:'T',
  atr:'A',meta:'M',steat:'S',chol:'S',prot:'S',calc:'K'};
const fam=p=>FAM[PT[p.n][1]]||PT[p.n][1];
/* 시험 모의에서 뺄 사진(라벨 의심·혼합 패널·정답 미확정) — 연습에서도 뺌 */
const SKIP=new Set([22,31,39,66,73,24,25,27,20]);
const usable=PHOTO.filter(p=>PT[p.n]&&!SKIP.has(p.n));
const KD={'육안':'육안','전자현미경':'전자현미경','형광':'형광','임상 사진':'임상','MRI':'MRI','현미경(H&E)':'현미경(H&E)','조직(특수염색)':'조직(특수염색)'};

function photoQ(p,pool,r,type,pos,id,n,lab){
  const T=PT[p.n];
  const txt=(x,t)=>t==='B'&&PT[x.n][2]?PT[x.n][0]+' – '+PT[x.n][2]:PT[x.n][0];
  if(type==='B'&&!T[2])type='A';
  const own=txt(p,type);
  const taken={};taken[fam(p)]=1;taken[T[0]]=1;
  const cand=shuf(pool.filter(x=>x.n!==p.n&&PT[x.n]&&fam(x)!==fam(p)&&PT[x.n][0]!==T[0]&&(type==='A'||PT[x.n][2])),r)
    .map(x=>({x,t:txt(x,type),s:Math.abs(txt(x,type).length-own.length)+(x.ch===p.ch?0:4)+r()*3}))
    .sort((a,b)=>a.s-b.s);
  const dis=[];
  for(const c of cand){if(dis.length>=4)break;if(taken[fam(c.x)]||taken[c.t])continue;if(dis.some(d=>d.t===c.t))continue;taken[fam(c.x)]=1;dis.push(c)}
  /* 같은 군이 부족하면 군 제한을 풀어 채움 */
  for(const c of cand){if(dis.length>=4)break;if(dis.some(d=>d.t===c.t)||c.t===own)continue;dis.push(c)}
  const rest=shuf(dis,r),opts=rest.map(d=>d.t),w=rest.map(d=>'사진 '+d.x.n+'번('+PT[d.x.n][0]+')에 해당하는 서술입니다. 이 사진과 다릅니다.');
  opts.splice(pos-1,0,own);
  w.splice(pos-1,0,'정답. 선배 정답 라벨(2025-2): '+p.t+(p.k&&p.k.length?' · '+p.k.join(' / '):''));
  const kind=KD[p.kd]||p.kd;
  return {id,set:'mock',photo:p.n,img:'ph_'+(p.n<10?'0':'')+p.n+'.jpg',ch:p.ch,n:n+'번',lab,
    src:'사진 '+p.n+'번 · 선배 라벨',stem:type==='B'?'다음 사진('+kind+')에 해당하는 설명으로 옳은 것은?':'다음 사진('+kind+')의 진단명으로 옳은 것은?',
    opts,ans:[pos],st:'추정',tier:'선배 라벨',conf:'중',w,
    ev:[['선배 라벨','PHOTO','사진 '+p.n+'번',p.t]],nk:p.nk,
    note:'정답은 선배 손글씨 라벨(2025-2)이며 올해 정답이 아닙니다.'+(p.nt?' '+p.nt:'')};
}
function positions(n,r){const a=[];for(let i=0;i<n;i++)a.push(i%5+1);return shuf(a,r)}

/* ---------- 모의 구성 ---------- */
const {m1,m2,seed}=partition();
const GEN=[],SET={m1:{T:[],L:[]},m2:{T:[],L:[]},pp:[]};
const slidePool=usable.filter(p=>p.cls==='slide'),grossPool=usable.filter(p=>p.cls==='gross');
const rG=rng(97);const gShuf=shuf(grossPool,rG);
const G1=gShuf.slice(0,12),G2=gShuf.slice(12,24);
const rS=rng(131);const sShuf=shuf(slidePool,rS);
const S1=sShuf.slice(0,30),S2=sShuf.slice(sShuf.length-30);   /* 슬라이드 풀이 30~33장이라 1·2회가 크게 겹침 */
function textQ(ids,mk,k0,r){
  const L=ids.slice().sort((a,b)=>BASE[a].ch-BASE[b].ch||r()-.5);
  const pos=positions(L.length,r);
  return L.map((id,i)=>{
    const b=BASE[id],opts0=(FIX[id]||b.opts).slice(),a0=b.ans[0]-1;
    if(opts0.length!==5)throw new Error('opts '+id);
    const idx=[0,1,2,3,4].filter(x=>x!==a0),rest=shuf(idx,r),order=rest.slice();order.splice(pos[i]-1,0,a0);
    return {id:'M'+mk+'T-'+String(k0+i).padStart(2,'0'),set:'mock',ch:b.ch,n:(k0+i)+'번',lab:TAG(id),src:'원문항 '+id,stem:b.stem,
      opts:order.map(x=>opts0[x]),ans:[pos[i]],st:b.st,tier:b.tier,conf:b.conf,ck:b.ck,nk:b.nk,
      w:order.map(x=>(b.w||[])[x]||''),ev:b.ev,note:b.note};
  });
}
function build(mk,textIds,G,S,type){
  const r=rng(1000+mk*17);
  const T=textQ(textIds,mk,1,r);
  const gs=G.slice().sort((a,b)=>a.ch-b.ch||r()-.5),pg=positions(gs.length,r);
  const TG=gs.map((p,i)=>photoQ(p,grossPool,r,type,pg[i],'M'+mk+'T-'+String(25+i).padStart(2,'0'),25+i,'사진(육안·기타)'));
  const ss=S.slice().sort((a,b)=>a.ch-b.ch||r()-.5),ps=positions(ss.length,r);
  const L=ss.map((p,i)=>photoQ(p,slidePool,r,type,ps[i],'M'+mk+'L-'+String(1+i).padStart(2,'0'),1+i,'조직 사진'));
  T.concat(TG).forEach(q=>{SET['m'+mk].T.push(q.id);GEN.push(q)});
  L.forEach(q=>{SET['m'+mk].L.push(q.id);GEN.push(q)});
}
build(1,m1,G1,S1,'A');
build(2,m2,G2,S2,'B');
/* 실제 사진 연습: 사용 가능한 사진 전부, 진단명 고르기 */
{const r=rng(555),list=usable.slice().sort((a,b)=>a.n-b.n),pos=positions(list.length,r);
 list.forEach((p,i)=>{const q=photoQ(p,p.cls==='gross'?grossPool:slidePool,r,'A',pos[i],'PP-'+String(p.n).padStart(2,'0'),p.n,p.cls==='gross'?'이론 사진':'실험 사진');
   q.cls=p.cls;q.src='사진 '+p.n+'번 · 선배 라벨';GEN.push(q);SET.pp.push(q.id)});}

/* 검증 */
GEN.forEach(q=>{
  if(q.opts.length!==5||new Set(q.opts).size!==5)throw new Error('dup opts '+q.id);
  if(q.ans.length!==1||q.ans[0]<1||q.ans[0]>5)throw new Error('ans '+q.id);
});
const stat=GEN.filter(q=>q.id[0]==='M'&&q.id.includes('T-')&&!q.photo).map(q=>{const ls=q.opts.map(plainLen);return ls[q.ans[0]-1]===Math.max(...ls)});
const out='/* 자동 생성(tools/mkmock.js). 직접 고치지 말고 fixopts.json·mkmock.js를 고친 뒤 다시 실행 */\n'+
 'SRC.PHOTO={n:"병리실 사진 모음 중간(답X/답O) 분할본 · 2025-2 선배 손글씨 라벨(사용자 업로드 2026-10-24)"};\n'+
 'var GENQ='+JSON.stringify(GEN)+';\nvar MOCKSET='+JSON.stringify(SET)+';\n';
fs.writeFileSync('src/data_mock.js',out);
console.log('seed',seed,'GEN',GEN.length,'m1T',SET.m1.T.length,'m1L',SET.m1.L.length,'m2T',SET.m2.T.length,'m2L',SET.m2.L.length,'pp',SET.pp.length);
console.log('text answer-is-longest',stat.filter(x=>x).length,'/',stat.length);
console.log('ch m1',JSON.stringify(chOf(m1)),'m2',JSON.stringify(chOf(m2)));
const tags=ids=>ids.reduce((a,i)=>{const t=TAG(i);a[t]=(a[t]||0)+1;return a},{});
console.log('tags m1',JSON.stringify(tags(m1)),'m2',JSON.stringify(tags(m2)));
console.log('slide pool',slidePool.length,'gross pool',grossPool.length);
