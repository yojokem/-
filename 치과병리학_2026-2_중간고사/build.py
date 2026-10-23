import re,sys
d='src/'
t=open(d+'app.template.html',encoding='utf-8').read()
data=''.join(open(d+f,encoding='utf-8').read()+'\n' for f in ['data_past.js','data_new.js','data_notes.js','data_notes_extra.js','data_status.js'])
assert '</script' not in data
out=t.replace('/*@@DATA@@*/','<script>\n'+data+'</script>')
open('치과병리학_중간대비.html','w',encoding='utf-8').write(out)
# syntax check pieces
js=re.findall(r'<script>(.*?)</script>',out,re.S)
for i,j in enumerate(js):
    open('/tmp/claude-0/-home-user--/45cdc023-c8c5-5da4-af46-9b3dfdc2bd40/scratchpad/build/s%d.js'%i,'w',encoding='utf-8').write(j)
print(len(out),'bytes',len(js),'scripts')
