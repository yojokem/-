import subprocess,base64,io,json,os
from PIL import Image
base='/tmp/claude-0/-home-user--/eb928969-2dab-5d95-8647-002a39cf61df/scratchpad/'
out={}
def enc(im,maxw=760,q=80):
    im=im.convert('RGB')
    if im.width>maxw:
        im=im.resize((maxw,int(im.height*maxw/im.width)),Image.LANCZOS)
    b=io.BytesIO(); im.save(b,'WEBP',quality=q,method=6); return b.getvalue(),im.size
ex={'f15_3':'s5-001-000','f15_4':'s5-001-001','f15_5':'s5-001-002','f15_38':'s5-004-006','f18_7':'s1-001-000','f19_4':'s2-001-000','f20_6':'s3-001-000','f20_7':'s3-002-002','f20_23':'s3-004-004','f22_6':'s4-002-000'}
meta={}
for k,v in ex.items():
    im=Image.open(base+'pdf/img/'+v+'.png')
    b,sz=enc(im,640,82); out[k]=base64.b64encode(b).decode(); meta[k]=dict(w=sz[0],h=sz[1],kb=len(b)//1024)
sl={'L2_13':(2,13),'L2_18':(2,18),'L2_19':(2,19),'L3_4':(3,4),'L3_14':(3,14),'L3_28':(3,28),'L3_33':(3,33)}
os.makedirs(base+'lec/sl',exist_ok=True)
for k,(ch,p) in sl.items():
    subprocess.run(['pdftoppm','-r','85','-png','-f',str(p),'-l',str(p),'-singlefile',base+f'lec/y26_{ch}.pdf',base+f'lec/sl/{k}'],check=True)
    im=Image.open(base+f'lec/sl/{k}.png')
    b,sz=enc(im,820,74); out[k]=base64.b64encode(b).decode(); meta[k]=dict(w=sz[0],h=sz[1],kb=len(b)//1024)
json.dump(out,open(base+'build/imgs.json','w'))
json.dump(meta,open(base+'build/imgmeta.json','w'),ensure_ascii=False)
print(meta, sum(m['kb'] for m in meta.values()),'KB total')
