import json,glob
S='/tmp/claude-0/-home-user--/d94f951d-a241-54d8-92fc-b18288f7782d/scratchpad/ext/'
items=json.load(open('build/yq/items.json',encoding='utf-8'))
sol={}
for f in sorted(glob.glob(S+'sol_out_*.json')): sol.update(json.load(open(f,encoding='utf-8')))
n=0;miss=[];diff=[]
for q in items:
    q.pop('sol',None)
    if not q['opts']: continue
    s=sol.get(q['id'])
    if not s: miss.append(q['id']); continue
    L=len(q['opts'])
    assert len(s['opt'])==L and all(1<=i<=L for i in s['final']),q['id']
    q['sol']={k:s.get(k,'') for k in('final','basis','opt','src','conf','note')}; n+=1
    if q.get('ans') and sorted(q['ans'])!=sorted(s['final']): diff.append(q['id'])
json.dump(items,open('build/yq/items.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print('merged',n,'missing',miss,'final!=연대ans',diff)
