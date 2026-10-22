import json,glob,re,sys
S='/tmp/claude-0/-home-user--/d94f951d-a241-54d8-92fc-b18288f7782d/scratchpad/ext/'
def norm(s): return re.sub(r'[\s*\\•]','',s).lower()
corp=''.join(norm(open(f,encoding='utf-8').read()) for f in glob.glob('build/corpus/*.txt'))
items=json.load(open('build/yq/items.json',encoding='utf-8'))
est={}
for k in ['12','34','56','78']: est.update(json.load(open(S+f'est_out_{k}.json',encoding='utf-8')))
byid={q['id']:q for q in items}
miss=[i for i in est if i not in byid]; print('est ids not in items',miss)
n=bad=conf=0; confl=[]
for q in items:
    q.pop('est',None)
    e=est.get(q['id'])
    if not e or e.get('support','none')=='none' or not e.get('ans'): continue
    if e.get('quote') and norm(e['quote']) not in corp: bad+=1; print('QUOTE FAIL',q['id']); continue
    q['est']={'ans':e['ans'],'src':e.get('src',''),'quote':e.get('quote',''),'note':e.get('note',''),'support':e['support']}
    n+=1
    if q.get('ans') and sorted(q['ans'])!=sorted(e['ans']): conf+=1; confl.append(q['id'])
json.dump(items,open('build/yq/items.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print('est merged',n,'quote fail',bad,'conflicts',conf,confl)
