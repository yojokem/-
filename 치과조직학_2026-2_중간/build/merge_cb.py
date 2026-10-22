import json,glob,re,sys
S='/tmp/claude-0/-home-user--/d94f951d-a241-54d8-92fc-b18288f7782d/scratchpad/ext/'
def norm(s): return re.sub(r'[\s*\\•]','',s).lower()
corp=''.join(norm(open(f,encoding='utf-8').read()) for f in glob.glob('build/corpus/*.txt'))
sys.path.insert(0,'build'); import data_q
oid={q['id'] for q in data_q.Q}
yid={q['id'] for q in json.load(open('build/yq/items.json',encoding='utf-8'))}
L=[]
for f in sorted(glob.glob(S+'cb_out_*.json')): L+=json.load(open(f,encoding='utf-8'))
bad=[];ids=set()
for c in L:
    if c['id'] in ids: bad.append(('dup',c['id']))
    ids.add(c['id'])
    ks=[s['k'] for s in c['st']]
    if ks!=['가','나','다','라']: bad.append(('keys',c['id']))
    want=[s['k'] for s in c['st'] if s['ok']==(c['ask']=='옳은 것')]
    combo=', '.join(want)
    if len(set(c['opts']))!=5 or c['opts'].count(combo)!=1 or c['opts'][c['ans']-1]!=combo: bad.append(('ans',c['id'],combo,c['ans']))
    for s in c['st']:
        if s['quote'] and norm(s['quote']) not in corp: bad.append(('quote',c['id'],s['k']))
    c['basis']=[b for b in c.get('basis',[]) if b in oid or b in yid]
L.sort(key=lambda c:c['id'])
from collections import Counter
print(len(L),Counter(c['ch'] for c in L),Counter(c['ans'] for c in L),'problems',bad)
json.dump(L,open('build/cb/items.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
