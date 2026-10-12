import subprocess,re,sys
pages={}
for n in (1,2,3):
    t=open(f'y26_{n}.txt').read().split('\f')
    pages[n]=t
def find(ch,kw):
    r=[i+1 for i,p in enumerate(pages[ch]) if re.search(kw,re.sub(r'\s+',' ',p),re.I)]
    return r
qs={1:['Paracelsus','Boyle','Sert','Buchheim','Schmiedeberg','Abel','amyl nitrite','Aspirin','Ehrlich','Domagk','Chain and Florey','Langley','Virchow','Pasteur','pharmacokinetics','Exendin','Drug vs Poison','Cimetidine','potentially toxic'],
2:['Ehrlich','Protein targets','Carrier','specificity','affinity','efficacy','Full agonists','Partial agonists','Competitive antagonists','Irreversible','Allosteric','Chemical antagonism','Physiological antagonism','Pharmacokinetic antagonism','Inverse agonist','two-state','Therapeutic index','Covalent','Occupation','Spare','Desensitization','Down-regulation','Up-regulation','acute responses','gene expression','Emax','dissociation constant','EC50','PHARMACODYNAMICS'],
3:['Ligand-gated','ionotropic','millisecond','GABA','NMDA','5-?hydroxytryptamine','nicotinic','two acetylcholine','metabotropic','seven','GTPase','Family','rhodopsin','secretin','Gαs','cholera','pertussis','Gαq','Gα12','adenylyl cyclase','PKA','Phospholipase C','IP3','DAG','protein kinase C','potassium channels','arrestin','GRK','Proteinase-activated','Kinase-linked','tyrosine','Ras/Raf','Jak/Stat','SH2','phosphatase','Nuclear receptors','48 soluble','Class I','Class II','hormone response','10% of prescription','60%','retinoid X','AGGTCA','Lithium','phosphodiesterase','PDE','insulin','Warfarin','thrombin','single transmembrane','cytokine receptors','dimerisation']}
for ch,l in qs.items():
    for k in l:
        print(ch,k,find(ch,k))
