import difflib,re
for n in (1,2,3):
    a=re.sub(r'\s+',' ',open(f'y25_{n}.txt').read()).split(' ')
    b=re.sub(r'\s+',' ',open(f'y26_{n}.txt').read()).split(' ')
    sm=difflib.SequenceMatcher(None,a,b,autojunk=False)
    print('=== Ch',n,'ratio',round(sm.ratio(),3),len(a),len(b))
    for tag,i1,i2,j1,j2 in sm.get_opcodes():
        if tag!='equal':
            print(tag,'|2025:',' '.join(a[i1:i2])[:200],'|2026:',' '.join(b[j1:j2])[:200])
