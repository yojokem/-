import json,re,difflib,collections
d=json.load(open('data.json'));it=d['items']
def norm(s):return re.sub(r'[^0-9A-Za-z가-힣]','',s)
def sig(i):return norm(i['q']+''.join(i.get('o') or []))
n=len(it);par=list(range(n))
def f(x):
    while par[x]!=x:par[x]=par[par[x]];x=par[x]
    return x
for a in range(n):
    for b in range(a+1,n):
        A,B=it[a],it[b]
        if A['c']==B['c'] or A['t']!=B['t']:continue
        sa,sb=sig(A),sig(B)
        if abs(len(sa)-len(sb))>40:continue
        if difflib.SequenceMatcher(None,sa,sb,autojunk=False).ratio()>=0.85:par[f(a)]=f(b)
g=collections.defaultdict(list)
for i in range(n):g[f(i)].append(i)
cl=[v for v in g.values() if len(v)>1]
print(len(cl),sum(map(len,cl)))
def atext(i):
    a=i['a'] or i.get('prop')
    if isinstance(a,list) and i.get('o'):return ' / '.join(norm(i['o'][x-1])[:15] for x in a)
    return str(a)
for v in cl:
    print('---',[ (it[i]['id'][:2],it[i]['n'],it[i]['st']) for i in v])
    ts=set(atext(it[i]) for i in v)
    if len(ts)>1:print('  ANSDIFF',[atext(it[i]) for i in v], it[v[0]]['q'][:50])
