import re,glob,sys,os,importlib.util
B=os.path.dirname(os.path.abspath(__file__))
def norm(t): return re.sub(r"[\s*\\•·]+","",t).lower()
C="".join(norm(open(f,encoding='utf-8').read()) for f in sorted(glob.glob(os.path.join(B,'..','corpus','*.txt'))))
IDS={'basal','junction','cytoskel','collagen','ecm','ca','blast','stain','vessel','immune','germ'}
def run(n):
    sp=importlib.util.spec_from_file_location('k',os.path.join(B,f'ch{n}.py')); m=importlib.util.module_from_spec(sp); sp.loader.exec_module(m); K=m.K
    bad=0; nq=0
    def chk(q,where):
        nonlocal bad,nq
        if not q: return
        nq+=1
        if norm(q) not in C: bad+=1; print('QUOTE-FAIL',where,repr(q))
    for g in K['kw']:
        for it in g['items']: chk(it.get('q',''),'kw:'+it['w'])
    for t in K['cmp']: chk(t.get('q',''),'cmp:'+t['t'])
    for s in K['seq']: chk(s.get('q',''),'seq:'+s['t'])
    for t in K['tags']:
        if t not in IDS: print('BAD-TAG',t); bad+=1
    for t in K['tagnote']:
        if t not in K['tags']: print('NOTE-NOT-IN-TAGS',t); bad+=1
    for t in K['cmp']:
        for r in t['r']:
            if len(r)!=len(t['h']): print('ROW-LEN',t['t'],r); bad+=1
    print(f'ch{n}: quotes {nq}, problems {bad}, kw items {sum(len(g["items"]) for g in K["kw"])}, flow {len(K["flow"])}, cmp {len(K["cmp"])}, seq {len(K["seq"])}')
if __name__=='__main__': run(int(sys.argv[1]))
