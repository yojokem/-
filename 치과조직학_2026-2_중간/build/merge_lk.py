import json,glob,sys
S='/tmp/claude-0/-home-user--/d94f951d-a241-54d8-92fc-b18288f7782d/scratchpad/ext/'
it=json.load(open('build/yq/items.json',encoding='utf-8')); yid={q['id']:q for q in it}
import importlib.util; sys.path.insert(0,'build'); import data_q
oid={q['id'] for q in data_q.Q}
L=[]
for f in sorted(glob.glob(S+'lk_out_*.json')): L+=json.load(open(f,encoding='utf-8'))
seen={};bad=[]
for c in L:
    for y in c['y']:
        if y not in yid: bad.append(('noY',y))
        if y in seen: bad.append(('dup',y))
        seen[y]=1
    for o in c['ours']:
        if o not in oid: bad.append(('noO',o))
miss=[y for y in yid if y not in seen]
print('clusters',len(L),'yonsei covered',len(seen),'/',len(yid),'missing',miss[:10],len(miss),'bad',bad[:10])
json.dump(L,open('build/lk/links.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
