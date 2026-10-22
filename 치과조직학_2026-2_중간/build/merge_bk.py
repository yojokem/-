import json,glob,re
S='/tmp/claude-0/-home-user--/d94f951d-a241-54d8-92fc-b18288f7782d/scratchpad/ext/'
def norm(s): return re.sub(r'[\s*\\•]','',s).lower()
corp=''.join(norm(open(f,encoding='utf-8').read()) for f in glob.glob('build/corpus/*.txt'))
L=[]
for f in sorted(glob.glob(S+'bk_out_*.json')): L+=json.load(open(f,encoding='utf-8'))
ids=set();bad=[]
for b in L:
    if b['id'] in ids: bad.append(('dup',b['id']))
    ids.add(b['id'])
    n=len(re.findall(r'\(\s*[①②③④⑤]\s*\)',b['stem']))
    if n!=len(b['blanks']) or n==0: bad.append(('marks',b['id'],n,len(b['blanks'])))
    if norm(b['quote']) not in corp: bad.append(('quote',b['id']))
    for x in b['blanks']:
        if norm(x['ans']) not in corp and not any(norm(a) in corp for a in x.get('alts',[])): bad.append(('ansNotInCorpus',b['id'],x['ans']))

# 검수 보정(2026-10-22): 정답 누설 제거·순서 무관 빈칸 허용
for b in L:
    if b['id']=='b2-05': b['stem']=b['stem'].replace('(thermogenin)','')
    if b['id']=='b2-09':
        b['blanks'][0]['alts']+=['1','type 1','typeI']; b['blanks'][1]['alts']+=['3','type 3','typeIII']
    if b['id']=='b3-08':
        b['blanks'][0]['alts']+=['fascia adherens','접착띠']; b['blanks'][1]['alts']+=['desmosome','데스모좀']
    if b['id']=='b4-07': b['stem']='PTH는 (  ①  )를 자극해 (  ②  )를 분비시키고, 파골세포 분화 신호를 막는 decoy 수용체 (  ③  )는 ②에 결합해 그 신호를 억제한다.'
L.sort(key=lambda b:b['id'])
from collections import Counter
print(len(L),Counter(b['ch'] for b in L),'problems',bad)
json.dump(L,open('build/bk/items.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
