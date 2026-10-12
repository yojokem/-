import json
head=open('tpl_head.html').read(); body=open('tpl_body.html').read()
data=open('data.json').read(); imgs=open('imgs.json').read()
for s in (data,imgs): assert '</script' not in s.lower()
body=body.replace('__DATA__',data).replace('__IMGS__',imgs)
open('page.html','w').write(head+body)
print(len(head+body)//1024,'KB')
