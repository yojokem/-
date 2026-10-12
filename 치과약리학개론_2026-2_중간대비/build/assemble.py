# -*- coding: utf-8 -*-
import json,collections,re,sys
sys.path.insert(0,'.')
import common
from common import ITEMS,SRC,YR
import d15,d18,d19,d20,d22,d23,d24
import newq,content
items=ITEMS
# ---- post-process
seen=set()
for it in items:
    assert it['id'] not in seen,it['id']; seen.add(it['id'])
    tiers=[e[0] for e in it['ev']]
    it['tiers']=sorted(set(tiers))
    st=it['st']
    if st=='교차확인':
        if not (set(tiers)&{'T1','T2','T3'}) or 'T4' not in tiers:
            it['st']='추정'; it['conf']=it['conf'] or ('상' if 'T4' in tiers else '중')
            it['nt']=(it['nt']+' (※ 상태 규칙: T1~T3 키와 교안 T4가 함께 있어야 교차확인 → 추정으로 조정)').strip()
    if it['st']=='추론':
        it['prop']=it['a']; it['a']=None
    if it['st']=='충돌':
        it['a']=None
    if it['st']=='미확정':
        it['a']=None
    it['conflict']=bool(it['cf'])

# GRP-CLUSTER: 학번 간 동일 문항 묶음(같은 유형·지문+보기 유사도>=0.85)
import difflib
def _norm(x):return re.sub(r'[^0-9A-Za-z가-힣]','',x)
def _sig(i):return _norm(i['q']+''.join(i.get('o') or []))
_par=list(range(len(items)))
def _f(x):
    while _par[x]!=x:_par[x]=_par[_par[x]];x=_par[x]
    return x
_sg=[_sig(i) for i in items]
for a in range(len(items)):
    for b in range(a+1,len(items)):
        A,B=items[a],items[b]
        if A['c']==B['c'] or A['t']!=B['t'] or abs(len(_sg[a])-len(_sg[b]))>40:continue
        if difflib.SequenceMatcher(None,_sg[a],_sg[b],autojunk=False).ratio()>=0.85:_par[_f(a)]=_f(b)
_g=collections.defaultdict(list)
for i in range(len(items)):_g[_f(i)].append(i)
_rank={'확정':0,'교차확인':1,'추정':2,'추론':3,'충돌':4,'미확정':5}
for it in items:it['rep']=True;it['dups']=[]
ncl=0
for v in _g.values():
    if len(v)<2:continue
    ncl+=1
    m=sorted(v,key=lambda i:(_rank[items[i]['st']],-int(items[i]['c'])))
    for i in v:
        items[i]['dups']=[items[j]['id'] for j in sorted(v,key=lambda j:(int(items[j]['c']),items[j]['n'])) ]
        items[i]['rep']=(i==m[0])
print('dup clusters',ncl,'unique',sum(1 for i in items if i['rep']))

# concept key -> chapter & freq
freq=collections.Counter(it['k'] for it in items)
byc=collections.Counter(it['c'] for it in items)
stc=collections.Counter(it['st'] for it in items)
print('items',len(items),dict(byc)); print(dict(stc)); print('fig items',sum(1 for i in items if i['fig']))
# derived mapping for new questions
REL={'2.bound':['2.drug-binding'],'3.receptor-types':['3.receptor-speed'],'3.G-subtypes':['3.cholera','3.pertussis','3.cAMP-Gs'],'3.nuclear':['3.nuclear-class','3.nuclear-10pct','3.nuclear-ligand'],'2.acute-delayed':['2.acute-delayed','2.gene-expression'],'2.antagonism-types':['2.antagonism-types','2.chemical-antagonism','2.physiological-antagonism'],'3.desensitization':['3.desensitization']}
for nq in newq.NEW:
    keys=REL.get(nq['k'],[nq['k']])
    m=[i['id'] for i in items if i['k'] in keys][:4]
    nq['derived']=m
# alias list for 학번 × 자료원 table
src_tbl=[]
data=dict(items=items,new=newq.NEW,cards=content.CARDS,senior=content.SENIOR,cross=content.CROSS,missing=content.MISSING,
          freq=freq,byc=byc,stc=stc,SRC=SRC,YR=YR)
json.dump(data,open('data.json','w'),ensure_ascii=False)
print('size',len(json.dumps(data,ensure_ascii=False))//1024,'KB')
# unresolved key check: items per ch
chc=collections.Counter(i['ch'] for i in items); print('by ch',chc)
cc=collections.Counter(i['t'] for i in items); print(cc)
# new q derived empties
for n in newq.NEW:
    if not n['derived']: print('no derived',n['id'],n['k'])
