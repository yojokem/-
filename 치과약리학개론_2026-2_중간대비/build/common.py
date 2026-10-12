# -*- coding: utf-8 -*-
import re,json
LEC={}
for n in (1,2,3):
    LEC[n]=[re.sub(r'\s+','',p) for p in open(f'/tmp/claude-0/-home-user--/eb928969-2dab-5d95-8647-002a39cf61df/scratchpad/lec/y26_{n}.txt').read().split('\f')]
def chk(ch,p,quote):
    return re.sub(r'\s+','',quote) in LEC[ch][p-1]
# T4 quote bank: key -> (ch,page,quote)
K={
 'tox':(1,3,'Every drug is potentially toxic.'),
 'poison':(1,3,'The only difference between a beneficial drug and a poison is the way in which the agent is used.'),
 'par':(1,5,'only the dose permits something not to be poisonous'),
 'sert':(1,6,'1805년, Friedrich Sertürner : opium에서 morphine 정제'),
 'buch':(1,6,'Rudolf Buchheim : 1847년 Estonia에 처음으로 pharmacology institute를 설립. 최초의 약리학 교수'),
 'schm':(1,6,'Oswald Schmiedeberg (1838~1921): 현대약리학을 확립하고 전 세계에 전파'),
 'abel':(1,6,'John Abel (1857~1938): 미국 약리학의 아버지. 부신에서 epinephrine을 순수 분리'),
 'amyl':(1,7,'1859년, amyl nitrite 합성; 첫 번째의 rational therapeutics 로서 협심증에 이용'),
 'ehr':(1,8,'Paul Ehrlich (1909) ; 매독(syphilis)에 비소제가 유효함을 밝힘'),
 'lang':(1,9,'John N Langley (1905); Chemical mediator가 작용하는 living system의 부분을 receptor로서 개념 확립'),
 'pk':(2,2,'PHARMACOKINETICS : the relationship between dosage and the changes in concentration of drugs in different parts of the body with time'),
 'pd':(2,2,'PHARMACODYNAMICS : the ways in which drugs work or act'),
 'targets':(2,3,'Drug targets : Most drugs act on protein molecules.'),
 'carrier':(2,4,'Carrier molecules (transporters)'),
 'bound':(2,3,'A drug will not work unless it is bound'),
 'spec':(2,6,'it must show a high degree of binding-site specificity'),
 'nospec':(2,6,'No drugs are completely specific in their actions.'),
 'affeff':(2,8,'The tendency of a drug to bind to the receptors is governed by its affinity, whereas the tendency for it, once bound, to activate the receptor is denoted by its efficacy.'),
 'partial':(2,10,'Partial agonists (which can produce only submaximal effects) have intermediate efficacy.'),
 'antag0':(2,10,'For antagonists, efficacy is zero.'),
 'comp':(2,12,'In the presence of the antagonist, the agonist log concentration-effect curve is shifted to the right without change in slope or maximum'),
 'irrev':(2,12,'An irreversible antagonist causes a downward shift of the Emax, with no shift of EC50 values.'),
 'irrevcov':(2,12,'Irreversible antagonists bind covalently to the active site of the receptor'),
 'allo':(2,15,'An allosteric antagonist causes a downward shift of the Emax of an agonist, with no change in the EC50 value.'),
 'chem':(2,16,'Chemical antagonism (interaction in solution)'),
 'pkant':(2,16,'Pharmacokinetic antagonism (one drug affecting the absorption'),
 'physant':(2,16,'Physiological antagonism (two agents producing opposing physiological effects)'),
 'physex':(2,16,'histamine -- epinephrine'),
 'inv':(2,17,'Inverse agonists show selectivity for the resting state of the receptor'),
 'two':(2,18,'Agonists show selectivity for the activated state; antagonists show no selectivity.'),
 'ti':(2,19,'TI = TD50/ED50'),
 'tibig':(2,19,'A large number = a wide margin of safety'),
 'tismall':(2,19,'A small number = a small margin of safety'),
 'tisafe':(2,19,'Safe drug: TI is more than 10 or more'),
 'forces':(2,20,'Covalent bonds'),
 'occ':(2,21,'is directly proportional to the number of receptors occupied by the drug'),
 'kd':(2,21,'KD (the dissociation constant)=k2/k1'),
 'spare':(2,23,'Spare receptor'),
 'reg':(2,23,'Desensitization Down-regulation Up-regulation'),
 'acute':(2,24,'The direct effect of the drug on its target produces acute responses at the biochemical, cellular or physiological levels.'),
 'delay':(2,24,'Prolonged receptor activation generally leads to delayed long-term effects, such as desensitization or down-regulation of receptors'),
 'genexp':(2,24,'Long-term delayed responses result from changes in gene expression'),
 'lgic':(3,7,'They are involved mainly in fast synaptic transmission.'),
 'ms':(3,7,'Ligand binding and channel opening occur on a millisecond timescale.'),
 'lgicex':(3,7,'the nicotinic acetylcholine, GABA type A (GABAA), glutamate (NMDA)'),
 'nachr2':(3,8,'There are two acetylcholine binding sites in the extracellular portion of the receptor'),
 'nachr5':(3,8,'form a cluster surrounding a central transmembrane pore'),
 'gpcr7':(3,9,'Structures comprise seven membrane-spanning α-helices.'),
 'gprot':(3,9,'The G-protein is a membrane protein comprising three subunits (α, β, γ), the α subunit possessing GTPase activity.'),
 'gpcrex':(3,10,'Examples include muscarinic acetylcholine receptors, adrenoceptors, neuropeptide and chemokine receptors, and proteinase-activated receptors.'),
 'loop3':(3,11,'third cytoplasmic loop'),
 'gdpgtp':(3,14,'subunit to an agonist-occupied receptor causes the bound GDP to exchange with intracellular GTP'),
 'par_cl':(3,13,'Activation of a proteinase-activated receptor by cleavage of the N-terminal extracellular domain. Inactivation occurs by phosphorylation.'),
 'cholera':(3,16,'Activated by cholera toxin, which'),
 'pertussis':(3,16,'Blocked by pertussis toxin, which'),
 'gas':(3,16,'Stimulates adenylyl cyclase, causing increased cAMP'),
 'gaq':(3,16,'Activates phospholipase C, increasing production of second messengers inositol triphosphate and diacylglycerol'),
 'pka':(3,17,'cAMP activates protein kinases such as protein kinase A(PKA)'),
 'ip3':(3,19,'IP3 acts to increase free cytosolic Ca2+ by releasing Ca2+ from intracellular compartments'),
 'dag':(3,19,'DAG activates various protein kinase C (PKC) isoforms'),
 'plc':(3,19,'catalyses the formation of two intracellular messengers, IP3 and DAG, from membrane phospholipid'),
 'grk':(3,24,'selective G protein-coupled receptor kinases (GRKs) are recruited to the plasma membrane and phosphorylate the receptor'),
 'klgf':(3,25,'Receptors for various growth factors incorporate tyrosine kinase in their intracellular domain.'),
 'klcyt':(3,25,'Cytokine receptors have an intracellular domain that binds and activates cytosolic kinases when the receptor is occupied.'),
 'kl1':(3,25,'connected via a single membrane-spanning helix to the intracellular domain'),
 'ras':(3,26,'the Ras/Raf/mitogen-activated protein (MAP) kinase pathway, which is important in cell division, growth and differentiation'),
 'jak':(3,26,'the Jak/Stat pathway activated by many cytokines, which controls the synthesis and release of many inflammatory mediators'),
 'phos':(3,29,'There is a large family of phosphatases that act to dephosphorylate proteins and thus reverse the effects of kinases.'),
 'nr48':(3,31,'A family of 48 soluble receptors that sense lipid and hormonal signals and modulate gene transcription.'),
 'nr1':(3,31,'Class I NRs are present in the cytoplasm, form homodimers in the presence of their ligand, and migrate to the nucleus.'),
 'nr2':(3,31,'Class II NRs are generally constitutively present in the nucleus and form heterodimers with the retinoid X receptor.'),
 'nrend':(3,31,'Their ligands are mainly endocrine in nature (e.g. steroid hormones).'),
 'hre':(3,32,'binding to hormone response elements in gene promoters'),
 'nr10':(3,32,'The receptor family is the target of approximately 10% of prescription drugs, and the enzymes that it regulates affect the pharmacokinetics of some 60% of all prescription drugs.'),
}
bad=[k for k,(c,p,q) in K.items() if not chk(c,p,q)]
if bad: print('BAD QUOTES',bad)
SRC={
 '15':'15학번 약리학개론 중간고사.pdf(276,676B)',
 '18':'2019학년도 18학번 예과 2학년 2학기 약리학개론 중간고사.pdf(332,612B)',
 '19':'2020학년도 19학번 약리학 중간고사.pdf(558,777B)',
 '20':'2021학년도 20학번 치과약리학개론 중간고사.pdf(410,871B)',
 '22':'22학번 예2-2 약리학 중간 야마.pdf(361,270B)',
 '23':'23학번 24년도 약리학 중간.pdf(415,127B)',
 '24':'2025학년도 24학번 예2-2 치과약리학개론 중간 야마.pdf(213,599B)',
}
YR={'15':'미상','18':'2019','19':'2020','20':'2021','22':'2023','23':'2024','24':'2025'}
ITEMS=[]
def t2(c,loc,quote,kind='typed'):
    lab={'typed':'T2 야마 본문 정답 표기','key':'T2 야마 정답표(쪽)','hand':"T2′ 수기 표시(표시 주체 불명)"}[kind]
    tier='T2′' if kind=='hand' else 'T2'
    return [tier,f'{SRC[c]} · {lab}',loc,quote]
DISP={'cholera':'Gαs … Activated by cholera toxin, which blocks GTPase activity, thus preventing inactivation','pertussis':'Gαi … Blocked by pertussis toxin, which prevents dissociation of αβγ complex','gdpgtp':'Coupling of the α subunit to an agonist-occupied receptor causes the bound GDP to exchange with intracellular GTP','nachr5':'The five receptor subunits (α2, β, γ, δ) form a cluster surrounding a central transmembrane pore','gas':'Gαs … Stimulates adenylyl cyclase, causing increased cAMP formation'}
def t4(key):
    ch,p,q=K[key]
    q=DISP.get(key,q)
    return ['T4',f'2026 교안 Ch.{ch}',f'p.{p}',q]
def add(c,n,typ,ch,k,q,o=None,a=None,st='미확정',ev=None,cf=None,nt='',cand=None,fig=None,conf=None,alt=None,sources=None,figreveal=False,orig=None):
    alias=f"{c}-{YR[c]}-M-{'MC' if typ=='MC' else ('DS' if typ=='DS' else 'BK')}-{int(n):02d}" if str(n).isdigit() else f"{c}-{YR[c]}-M-{typ}-{n}"
    it=dict(id=alias,gb=None,c=c,y=YR[c],n=n,t=typ,ch=ch,k=k,q=q,o=o,a=a,st=st,ev=ev or [],cf=cf or [],nt=nt,cand=cand,fig=fig,conf=conf,alt=alt,src=sources or [SRC[c]],reveal=figreveal,orig=orig)
    ITEMS.append(it); return it
