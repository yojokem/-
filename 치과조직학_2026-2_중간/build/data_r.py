# -*- coding: utf-8 -*-
# v6.8 §14 ① 보기별 판단 이유. 항목: (tv, 문장, 근거구분 'T4'|'G', 인용)
# tv: T=진술 참, F=진술 거짓, ?=판단 불가. ok(정답 여부)는 gen.py가 ans로 계산한다.
# 인용은 교안 원문에서 수기로 옮긴 짧은 조각이며, gen.py가 교안 코퍼스가 있으면 부분문자열 대조로 확인한다.
R = {}
def r(i, *rows): R[i] = list(rows)
T, F, U = "T", "F", "?"

r("1-01",
  (T, "상피는 apical/basolateral 극성을 가진다.", "T4", "Polarity of epithelial cell"),
  (T, "상피에는 혈관이 없고 기저판 너머 결합조직 모세혈관에서 확산으로 영양을 받는다.", "T4", "capillary beds in the adjacent"),
  (T, "데스모솜 등 접합복합체로 세포가 서로 부착한다(세포사이다리).", "T4", "weld-like junctions along the lateral cell membranes"),
  (F, "간·이자는 내배엽 기원 샘이라 '모두 외배엽'은 거짓.", "T4", "liver, gall bladder, the pancreas"))
r("1-02",
  (F, "소화관 상피는 내배엽 기원이다.", "T4", "and gastrointestinal tract"),
  (F, "혈관 내피는 중배엽 기원이다.", "T4", "endothelial lining of the circulatory system"),
  (T, "젖샘은 외배엽 기원(피부샘·젖샘).", "T4", "glands of the skin and the mammary glands"),
  (T, "땀샘은 피부샘이라 외배엽 기원.", "T4", "glands of the skin and the mammary glands"))
r("1-03",
  (F, "자극이 많을수록 각질화·중층화되므로 '비각질화'는 틀린 서술(교안에 자극-각질화 직접 문장 없음).", "G", ""))
r("1-04",
  (T, "상피는 모양(편평·입방·원주)과 층수로 분류한다.", "G", ""),
  (F, "술잔세포는 점액을 분비하는 단세포샘이라 '장액성 단순샘'은 틀림.", "T4", "goblet cells, minor salivary glands"),
  (T, "중층편평상피는 마찰·외부 자극에서 보호한다.", "G", ""),
  (T, "상피의 기능에는 보호·분비·흡수·윤활이 포함된다.", "G", ""))
r("1-05",
  (F, "소장 상피는 단층원주상피다.", "T4", "much of digestive tract"),
  (T, "난소 표면(covering of ovary)은 단층입방상피.", "T4", "covering of ovary"),
  (F, "구강 상피는 비각질 중층편평상피.", "T4", "mouth, epiglottis, esophagus"),
  (F, "콩팥 집합관은 입방/원주 경계라 22학번 필기도 애매하다고 적음(교안 직접 근거 없음).", "G", ""))
r("1-06",
  (U, "[검토 포인트] 술잔세포의 점액은 H&E에서 잘 안 보이는 대표 예(필기본 'HE에서 점액성은 안됨').", "G", ""),
  (U, "[검토 포인트] 장액성 꽈리는 H&E에서 호염기성으로 잘 염색된다.", "G", ""),
  (U, "[검토 포인트] 탄력섬유는 H&E로 약하게 보이고 Orcein·Verhoeff로 염색한다(교안 염색표).", "T4", "Elastin brown with Orcein"),
  (U, "[검토 포인트] 분비관 세포는 H&E로 보인다.", "G", ""))
r("1-07",
  (T, "cadherin은 부착띠(E-cadherin)·데스모솜 등 다른 부착에도 쓰인다.", "T4", "E-cadherin + actin filaments"),
  (T, "integrin은 반부착반(기저막 쪽)에서 쓰는 단백질이라 '다른 부착에 사용되지 않는' 쪽에 해당.", "T4", "integrins (transmembrane linker proteins)"),
  (F, "laminin은 기저판의 세포외 당단백질로 integrin이 결합하는 대상이다.", "T4", "laminin and type IV collagen of the basal"))
r("1-08",
  (U, "[검토 포인트] 기름샘은 단순포상(피지샘)이 일반적이라 '복합관포상'은 의심.", "G", ""),
  (U, "[검토 포인트] 땀샘은 단순관상이 맞고 장샘도 단순관상.", "G", ""),
  (U, "[검토 포인트] 선지 본문 미복기라 판단 불가.", "G", ""),
  (U, "[검토 포인트] 위샘은 단순관상(분지)이라 '복합관상'은 의심.", "G", ""))
r("1-09",
  (T, "보호상피는 접합복합체(부착반 포함)가 발달.", "T4", "Anchoring junctions"),
  (T, "단백질합성상피(장액세포)는 r-ER·골지복합체가 특징.", "T4", "Secretory granules, r-ER and Golgi complex"),
  (T, "스테로이드·지방 분비세포는 s-ER·지질방울이 특징.", "T4", "Lipid droplet, s-ER, mitochondria"),
  (T, "이온수송세포는 기저 세포막주름과 미토콘드리아(교안은 기저주름만 직접 언급).", "T4", "increase the surface area available for transport"))
r("2-01",
  (T, "세망조직이 골수·림프·조혈기관의 골격(기질)을 이룬다.", "T4", "provide the architectural framework of the myeloid"),
  (F, "지방조직은 에너지 저장 조직이다.", "G", ""),
  (F, "성긴결합조직은 일반 결합조직 충전 조직이다.", "G", ""),
  (F, "치밀규칙결합조직은 힘줄·인대를 이룬다.", "T4", "Dense Regular CT - Tendons, ligaments"),
  (F, "점액결합조직은 탯줄(와튼젤리)·어린 치아 치수.", "T4", "the umbilical cord (Wharton"))
r("2-02",
  (F, "세망조직은 조혈·림프기관의 골격이다.", "T4", "provide the architectural framework of the myeloid"),
  (F, "지방조직은 와튼젤리가 아니다.", "G", ""),
  (F, "성긴결합조직은 탯줄 기질이 아니다.", "G", ""),
  (F, "치밀규칙결합조직은 힘줄·인대 조직이다.", "T4", "Dense Regular CT - Tendons, ligaments"),
  (T, "탯줄 와튼젤리는 히알루론산이 풍부한 점액결합조직.", "T4", "rich hyaluronic acid"))
r("2-03",
  (F, "Verhoeff는 탄력섬유 염색이다.", "T4", "Verhoeff"),
  (F, "톨루이딘블루는 비만세포 이염색성 염색이다.", "T4", "toluidine blue"),
  (T, "갈색지방의 지질방울은 수단·오스뮴으로 염색(교안 문장은 백색지방 슬라이드, 개념 수준 적용).", "T4", "osmium tetroxide(OsO4) Sudan dyes"),
  (F, "마송 트라이크롬은 콜라겐(녹색) 염색이다.", "T4", "green with Masson"),
  (F, "인디아 핑크는 교안에 없다.", "G", ""))
r("2-05",
  (T, "비만세포는 분비과립이 가득 찬 세포.", "T4", "filled with abundant secretory granules"))
r("2-07",
  (F, "헤파린·히스타민은 비만세포(과립) 산물이다.", "T4", "heparin - anticoagulant"),
  (F, "열 생성은 갈색지방세포의 기능이다.", "T4", "heat generation"),
  (T, "그림은 형질세포(cartwheel, rER)이며 항체 생성 세포.", "T4", "Antibody"),
  (F, "항원제공은 대식세포·수지상세포의 역할이다.", "G", ""))
r("2-08",
  (F, "형질세포는 휴지기/활동기로 나뉘는 세포가 아니다.", "G", ""),
  (F, "비만세포는 과립이 풍부한 세포.", "T4", "filled with abundant secretory granules"),
  (F, "갈색지방세포는 열 생성 세포다.", "T4", "heat generation"),
  (T, "휴지기 섬유아세포=섬유세포, 예로 힘줄세포(tenocyte).", "T4", "fibrocyte (ex. Tenocyte)"),
  (F, "대식세포는 휴지/활동 구분이 문항 설명과 다르다.", "G", ""))
r("2-09",
  (F, "IV형은 기저판을 이루는 그물형성 콜라겐.", "T4", "IV : component of basal lamina"),
  (T, "II형은 섬유(fibril) 형성 콜라겐(I, II, III, V, XI).", "T4", "I, II, III, V, XI"),
  (F, "IX형은 fibril 연결 콜라겐(fibril-associated).", "T4", "IX, XII, XIV, XVI, XIX"),
  (T, "III형도 fibril 형성 콜라겐이다.", "T4", "I, II, III, V, XI"))
r("2-11",
  (T, "상피는 기저판 위에 놓인다.", "T4", "located at the boundary between the epithelium"),
  (T, "근육세포 주변에도 기저판이 있다.", "T4", "also in muscle cell, adipocyte, Schwann cell"),
  (T, "지방세포 주변에도 기저판이 있다.", "T4", "also in muscle cell, adipocyte, Schwann cell"),
  (T, "내피세포도 기저판(basal lamina) 위에 있다(교안 직접 문장 없음).", "G", ""))
r("3-01",
  (T, "푸르키니에 섬유는 심장 전도 계통 세포.", "T4", "Impulse generating"),
  (T, "세포질이 창백하고 글리코겐이 풍부.", "T4", "Glycogen & mitochondria"),
  (T, "근원섬유가 적고 줄무늬가 약하다.", "T4", "weak, poor myofibrils in cytoplasm"),
  (T, "변형된 심근세포다.", "T4", "Large specialized cardiac muscle cells"),
  (F, "교안은 일반 심근세포보다 '큰(Large)' 세포라고 적어 '작다'는 거짓.", "T4", "Large specialized cardiac muscle cells"))
r("3-02",
  (U, "[검토 포인트] 근절(sarcomere)은 Z선~Z선이라 a가 이 구간이면 참(범례 미확인).", "T4", "Sarcomere(2.5"),
  (U, "[검토 포인트] 마이오신 막대부만 있는 부위(H대)는 사진 대조 필요.", "G", ""),
  (U, "[검토 포인트] 23학번 범례 c=I대면 참(같은 사진인지 미확인).", "T4", "I = I band"),
  (U, "[검토 포인트] creatine kinase는 M선 단백질로 알려져 Z선과 거리가 있다.", "G", ""))
r("3-03",
  (U, "[검토 포인트] a: 사진·범례 대조 필요(굵은세사만 있는 부위는 H대 후보).", "G", ""),
  (U, "[검토 포인트] b: 사진 대조 필요.", "G", ""),
  (U, "[검토 포인트] c: 사진 대조 필요.", "G", ""),
  (U, "[검토 포인트] d: 사진 대조 필요.", "G", ""),
  (U, "[검토 포인트] e: 23학번 범례에선 triad라 해당 없음.", "G", ""))
r("3-04",
  (F, "rER은 triad 구성이 아니다.", "G", ""),
  (F, "myofibril은 triad 구성이 아니다.", "G", ""),
  (T, "triad=T소관 1개+종말조 2개.", "T4", "= one tubule + two terminal cisternae"),
  (F, "sarcomere는 triad 구성 요소가 아니다.", "G", ""))
r("3-05",
  (T, "심장근은 T소관이 Z선 부위에 있다.", "T4", "T-tubule: large diameter"),
  (F, "십자무늬 배열은 평활근 서술(필기본).", "G", ""),
  (F, "근육 수축은 신경·Ca2+에 의해 일어나며 호르몬에 의한 수축이 아님.", "G", ""),
  (T, "심장근은 triad가 아니라 diad(이조체).", "T4", "Not triad but diad"))
r("3-06",
  (T, "가로부분엔 데스모솜(부착반)이 있다.", "T4", "desmosome, fascia adherens"),
  (F, "폐쇄막(?)은 원문에 물음표가 있어 판정 곤란.", "G", ""),
  (F, "tight junction은 교안 가로부분 항목에 없다.", "T4", "desmosome, fascia adherens"),
  (T, "가로부분엔 fascia adherens(부착막).", "T4", "desmosome, fascia adherens"),
  (F, "gap junction은 세로부분(Lateral portion)에 있다.", "T4", "Lateral portion (세로부분)"))
r("3-07",
  (F, "액틴은 얇은 세사 구성 단백질.", "T4", "Thin myofilament : actin"),
  (F, "트로포마이오신은 얇은 세사에 붙는다.", "T4", "Actin, Tropomyosin, Troponin"),
  (T, "마이오신은 굵은 세사 구성이라 정답.", "T4", "Thick myofilament : myosin"),
  (F, "트로포닌은 얇은 세사에 붙는다.", "T4", "Actin, Tropomyosin, Troponin"))
r("3-08",
  (T, "액틴은 얇은 세사 구성.", "T4", "Thin myofilament : actin"),
  (T, "트로포마이오신은 얇은 세사에 붙는다.", "T4", "Actin, Tropomyosin, Troponin"),
  (F, "마이오신은 굵은 세사다.", "T4", "Thick myofilament : myosin"),
  (T, "트로포닌도 얇은 세사에 붙는다.", "T4", "Actin, Tropomyosin, Troponin"))
r("3-10",
  (F, "내장근(평활근)은 불수의근.", "T4", "involuntary"),
  (U, "(선지 본문 미복기)", "G", ""),
  (T, "평활근은 핵이 1개이고 중앙에 위치.", "T4", "one nucleus, central nucleus"))
r("3-12",
  (U, "[검토 포인트] 활주설에서 굵은세사(A대) 길이는 불변.", "G", ""),
  (U, "[검토 포인트] M선은 굵은세사 중앙의 선이다(길이 불변 후보).", "G", ""),
  (U, "[검토 포인트] M~Z 사이는 I대·H대 단축으로 줄어든다.", "G", ""),
  (U, "[검토 포인트] Z선은 점 구조라 길이 개념이 낮음.", "G", ""))
r("4-01",
  (U, "[검토 포인트] 유리연골 기질은 II형 콜라겐: 참.", "T4", "Type II collagen (40%)"),
  (U, "[검토 포인트] 섬유연골은 추간판에서 관찰: 참.", "T4", "Intervertebral disks"),
  (U, "[검토 포인트] 관절면 연골엔 연골막이 없다: 참.", "T4", "articular cartilages and epiphyses"),
  (U, "[검토 포인트] 연골엔 혈관·신경·림프관 모두 없어 '림프관 있다'는 거짓.", "T4", "No lymphatic vessel"))
r("4-02",
  (T, "유리연골 기질은 II형 콜라겐.", "T4", "Type II collagen (40%)"),
  (T, "섬유연골은 척추사이원판(추간판)에 있다.", "T4", "Intervertebral disks"),
  (T, "관절연골은 연골막이 없다.", "T4", "articular cartilages and epiphyses"),
  (F, "연골엔 혈관·신경·림프관이 없다.", "T4", "No lymphatic vessel"))
r("4-03",
  (T, "영역기질은 chondroitin sulfate가 풍부.", "T4", "rich chondriotin sulfate"),
  (T, "영역기질은 동형세포집단 주변 기질.", "T4", "Territorial matrix"),
  (T, "영역기질은 콜라겐이 적다.", "T4", "poor in collagen"),
  (T, "황산화 GAG이 많아 이염색성(필기본).", "G", ""))
r("4-04",
  (F, "외이도는 탄력연골.", "T4", "Pinna of ear, walls of auditory canal"),
  (T, "코는 유리연골.", "T4", "Articular ends of long bones, nose"),
  (F, "귓바퀴(pinna)는 탄력연골.", "T4", "Pinna of ear, walls of auditory canal"),
  (T, "갈비뼈 앞쪽끝은 유리연골.", "T4", "ventral ends of ribs"))
r("4-05",
  (T, "뼈 테두리(bone collar)는 긴뼈 연골내골화 과정.", "T4", "Bone collar"),
  (T, "뼈끝판(epiphyseal plate)에서 길이 성장.", "T4", "Growth of bone occurs at epiphyseal plate"),
  (T, "연골 기질 석회화가 일어난다.", "T4", "Calcified cartilage zone"),
  (T, "이차 골화 중심이 뼈끝에서 생긴다.", "T4", "Secondary Center of Ossification"))
r("4-06",
  (F, "파골세포는 다핵 융합세포로 분열하지 않는다.", "G", ""),
  (F, "적혈구는 무핵이라 분열하지 않는다.", "G", ""),
  (F, "조골세포의 분열 가능성은 교안에 직접 문장 없음.", "G", ""),
  (T, "연골세포는 분열해 동형세포집단을 만든다.", "T4", "Still proliferate"))
r("4-07",
  (T, "뼈는 칼슘을 저장(99%).", "T4", "Mineral store"),
  (T, "뼈막 쪽에 돌기·Sharpey 섬유 존재(해석 필요).", "T4", "Sharpey"),
  (T, "납작뼈엔 해면뼈(diploë)가 있다.", "T4", "diploë"),
  (F, "뼈세포 돌기는 뼈소관을 따라 사방으로 뻗는다.", "T4", "Process in bony canaliculi"),
  (T, "골막·골내막이 뼈를 덮는다.", "T4", "Endosteum"))
r("4-08",
  (U, "(선지 본문 미복기)", "G", ""),
  (U, "(선지 본문 미복기)", "G", ""),
  (T, "파골세포는 조혈줄기세포 기원(뼈세포와 다름).", "T4", "hematopoietic stem cells"),
  (T, "파골세포는 세포 융합으로 다핵.", "T4", "by cell fusion"))
r("4-09",
  (T, "섬유연골 세포는 연골소강(lacuna) 안에 있다.", "T4", "Cells"),
  (T, "섬유연골 기질은 I형 콜라겐이 풍부.", "T4", "Type I collagen fiber"),
  (T, "섬유연골에도 동형세포집단이 있다.", "T4", "One or isogenous cell group"),
  (F, "교안 표에 II형도 있다고 적혀 '존재하지 않는다'는 거짓.", "T4", "Type I collagen, Type II collagen"))
r("5-01",
  (T, "림프절은 이물질을 걸러 제거한다.", "T4", "serve as filters for the removal of bacteria"),
  (F, "수입림프관은 피막으로 들어와 피막밑굴로 간다(문은 수출).", "T4", "afferent lymph vessels"),
  (T, "수입림프관에 판막이 있다.", "T4", "afferent lymphatic vessels : valves"),
  (F, "Paracortex는 T세포(가슴샘 의존) 구역.", "T4", "mostly T cells and the thymus-dependent zone"))
r("5-02",
  (T, "림프절 곁피질(paracortex)은 가슴샘 의존.", "T4", "lymph node- paracortical area"),
  (T, "비장 PALS는 가슴샘 의존.", "T4", "white pulp- PALS (spleen)"),
  (T, "파이어소절(회장)은 가슴샘 의존.", "T4", "Peyer's patch (ileum)"),
  (F, "비장의 림프소절은 B세포 구역.", "T4", "Lymphoid nodules"))
r("5-03",
  (F, "가슴샘엔 림프소절이 없다(소엽·피질·수질).", "G", ""),
  (T, "상피그물세포가 가슴샘 기질.", "T4", "Epithelial reticular cell"),
  (T, "하살소체는 가슴샘 수질의 특징.", "T4", "the most characteristic feature of the thymic medulla"),
  (F, "'수질막'은 의미 불명(오기 추정).", "G", ""))
r("5-04",
  (T, "피막은 가슴샘과 림프절 모두 있다(지시문 '림프관'은 오기 의심).", "T4", "Capsule"),
  (F, "피질은 림프관 구조가 아니다(지시문 오기 시 공통).", "G", ""),
  (F, "수질은 림프관 구조가 아니다(지시문 오기 시 공통).", "G", ""),
  (T, "수출림프관은 가슴샘·림프절 요약표의 공통 항목.", "T4", "Efferent"))
r("5-05",
  (T, "가슴샘·림프절 모두 수출림프관이 있다.", "T4", "Efferent"),
  (T, "둘 다 수질을 가진다.", "T4", "Medulla"),
  (T, "둘 다 피질을 가진다.", "T4", "Cortex"),
  (T, "둘 다 피막을 가진다.", "T4", "Capsule"))
r("5-06",
  (T, "가시돌기(수지상)세포는 APC.", "T4", "dendritic cells"),
  (T, "랑게르한스 세포는 APC.", "T4", "Langerhans cells of the epidermis"),
  (T, "가슴샘 상피그물세포는 APC.", "T4", "epithelial reticular cells of the thymus"),
  (T, "장상피 M세포는 APC.", "T4", "M cell of the intestinal epithelium"))
r("5-07",
  (T, "IgG만 태반을 통과한다.", "T4", "the only antibody capable of crossing the placenta"),
  (F, "IgA는 점막 분비형이며 태반을 통과하지 못한다.", "T4", "IgA (mucosal) secretory antibody"),
  (F, "IgM은 오량체로 태반 통과 불가.", "T4", "IgM"),
  (F, "IgD는 B세포 표면 면역글로불린.", "T4", "IgD Surface immunoglobulin"),
  (F, "IgE는 비만세포 결합 항체.", "T4", "IgE"))
r("5-08",
  (F, "형질세포는 항체 생산 세포.", "G", ""),
  (F, "세포독성 T세포는 MHC I 중심.", "T4", "CD8 Cytotoxic T cells"),
  (F, "보조 T세포는 MHC II를 인식하는 쪽.", "T4", "CD4 T-helper cells"),
  (T, "수지상세포(APC)는 MHC I·II 모두 가진다.", "T4", "APCs : MHC I and II proteins"),
  (F, "호중구는 APC가 아니다.", "G", ""))
r("6-01",
  (T, "AV node는 충격 전도계.", "T4", "Atrioventricular (AV) node"),
  (T, "SA node는 박동조율기.", "T4", "the pacemaker of the heart"),
  (T, "방실다발(His)은 전도.", "T4", "Atrioventricular bundle"),
  (T, "푸르키니에 섬유가 전도의 말단.", "T4", "Purkinje fibers"))
r("6-02",
  (U, "[검토 포인트] 가·나·다 조합: 소동맥이 교환 장소인지가 쟁점(교안은 모세혈관·모세혈관후 소정맥을 미세혈관으로 묶음).", "T4", "Capillary, Arteriole, postcapillary venule"),
  (U, "[검토 포인트] 가·다 조합: 모세혈관(나)이 빠져 있어 어색.", "G", ""),
  (U, "[검토 포인트] 나·라 조합: 모세혈관과 모세혈관후 소정맥이 교환 장소라는 일반 조직학 설명과 일치(가장 유력 후보).", "G", ""),
  (U, "[검토 포인트] 라 단독: 모세혈관이 빠져 어색.", "G", ""),
  (U, "[검토 포인트] 가·나·다·라 전부: 소동맥까지 포함해 과함.", "G", ""))
r("6-03",
  (U, "[검토 포인트] 가·다만 외막 구조(가+나+다 조합은 내탄력막 때문에 제외).", "G", ""),
  (T, "신경다발은 외막에 분포(동맥은 외막에서만).", "T4", "In artery: only in Tunica adventitia"),
  (F, "내탄력막은 속막/중간막 경계 구조.", "T4", "Internal elastic lamina"),
  (T, "맥관벽혈관(vasa vasorum)은 외막에 있다.", "T4", "Vasa vasorum"),
  (F, "푸르키니에 섬유는 심장 구조.", "T4", "Purkinje fibers"))
r("6-04",
  (U, "[검토 포인트] 불연속 동양모세혈관은 지름이 커서 혈류가 느린 것으로 알려짐(교안 근거 없음).", "G", ""),
  (U, "[검토 포인트] 내피 배열 불규칙: 문항 서술 불명확.", "G", ""),
  (U, "[검토 포인트] 창(fenestra)은 유창형 모세혈관 특징.", "G", ""),
  (U, "[검토 포인트] 포음세포 존재는 연속형 쪽 서술.", "G", ""))
r("6-05",
  (T, "맥관벽혈관은 큰 혈관 중간막·외막 바깥에 있다.", "T4", "Tunica adventitia and external layer of tunica media"),
  (T, "소동맥·소정맥·모세혈관으로 이루어진다.", "T4", "Arteriole, capillary, venule"),
  (T, "중간막과 외막에 영양을 공급.", "T4", "tunica media and tunica adventitia: from vasa vasorum"),
  (F, "교안은 '정맥 > 동맥'(Vein > artery)이라 반대.", "T4", "Vein > artery"))
r("6-06",
  (U, "[검토 포인트] 혈관주위세포는 긴 돌기를 가진다(일반 지식).", "G", ""),
  (U, "[검토 포인트] 중배엽성 간엽 기원이라 '내배엽 기원'이 거짓 후보.", "G", ""),
  (U, "[검토 포인트] 액틴·마이오신 함유(수축성)로 알려져 있다.", "G", ""),
  (U, "[검토 포인트] 내피세포를 둘러싼다.", "G", ""),
  (U, "[검토 포인트] 분화해 혈관·결합조직세포 형성에 관여.", "G", ""))
r("6-07",
  (T, "모세혈관은 혈액-조직 물질교환 장소.", "G", ""),
  (F, "모세혈관에도 기저판이 있다.", "T4", "Basement membrane"),
  (T, "동맥-정맥 사이 모세혈관 그물(bed).", "T4", "Capillary, Arteriole, postcapillary venule"),
  (T, "모세혈관엔 중간막 평활근층이 없다(표현 애매).", "G", ""))
r("7-01",
  (F, "골지복합체는 세포체에 발달.", "T4", "Golgi complex"),
  (T, "미토콘드리아는 축삭 수송과 이온 교환의 에너지원.", "T4", "energy source for ion exchange"),
  (F, "Nissl 소체는 축삭 둔덕엔 없다.", "T4", "not in axon hillock"),
  (F, "용해소체는 세포체의 폐기물 처리.", "T4", "hydrolytic enzymes"),
  (F, "'바소체'는 교안에 없다.", "G", ""))
r("7-02",
  (F, "분비신경세포 표지가 아님.", "G", ""),
  (F, "노화 색소는 lipofuscin이다.", "T4", "Lipofuscin granule"),
  (T, "멜라닌 과립 신경세포는 카테콜아민(도파민·NE)계(교안 직접 문장 없음).", "G", ""),
  (F, "가성단극뉴런은 DRG 감각세포.", "T4", "Pseudounipolar neuron"),
  (F, "축삭 손상은 Nissl 소체 감소(색소 아님).", "T4", "Large reduction in number"))
r("7-03",
  (T, "백색질에는 신경세포체가 없다.", "G", ""),
  (T, "축삭에는 neurofilament·microtubule이 있다.", "T4", "Neurofilament: Intermediate Filament"),
  (T, "신경세포체에 골지복합체가 발달.", "T4", "Golgi complex"),
  (T, "Nissl 소체는 r-ER.", "T4", "Nissl substance: r-ER"),
  (F, "수초는 축삭에 붙고 가지돌기엔 없다.", "T4", "myelin sheath"))
r("7-05",
  (F, "중추·말초 돌기 모두 축삭 형태(둘 중 하나가 '?'면 거짓).", "G", ""),
  (F, "같은 이유로 거짓.", "G", ""),
  (F, "같은 이유로 거짓.", "G", ""),
  (T, "가성단극뉴런은 두 돌기 모두 축삭 형태(수상돌기 기능의 축삭).", "T4", "central process"),
  (F, "상황에 따라 바뀌지 않는다.", "G", ""))
r("7-06",
  (F, "성상세포는 수초를 만들지 않는다.", "G", ""),
  (T, "희소돌기아교세포는 CNS 수초 형성.", "T4", "Oligodendrocyte in CNS"),
  (F, "미세아교세포는 대식세포 역할.", "T4", "Macrophage (Mononuclear Phagocytic System)"),
  (F, "상의세포는 뇌실 상피 아교세포.", "T4", "Epithelial glial cell lining brain ventricles"),
  (T, "슈반세포는 PNS 수초 형성.", "T4", "Schwann Cell in PNS"),
  (F, "위성세포는 신경절 세포체를 둘러싼다.", "T4", "Cells encircling neuronal cell body in Ganglion"))
r("7-07",
  (F, "성상세포는 중추 아교세포.", "T4", "Central Neuroglia"),
  (F, "희소돌기아교세포는 중추 아교세포.", "T4", "Central Neuroglia"),
  (F, "미세아교세포는 중추 아교세포.", "T4", "Central Neuroglia"),
  (F, "상의세포는 중추 아교세포.", "T4", "Central Neuroglia"),
  (T, "슈반세포는 말초 아교세포.", "T4", "Schwann Cell in peripheral nerve"),
  (T, "위성세포는 말초 아교세포.", "T4", "Satellite Cell in ganglion"))
r("7-08",
  (F, "성상세포에는 섬모가 없다.", "G", ""),
  (F, "희소돌기아교세포에는 섬모가 없다.", "G", ""),
  (F, "미세아교세포에는 섬모가 없다.", "G", ""),
  (T, "상의세포는 내강면에 섬모·미세융모.", "T4", "cilia and microvilli on luminal surface"),
  (F, "슈반세포에는 섬모가 없다.", "G", ""),
  (F, "위성세포에는 섬모가 없다.", "G", ""))
r("8-01",
  (F, "헤모글로빈은 성숙 적혈구 성분.", "G", ""),
  (F, "미토콘드리아는 망상적혈구의 특징 성분이 아니다.", "G", ""),
  (T, "망상적혈구의 그물은 rRNA 잔존(선지는 mRNA로 복기됨).", "T4", "Reticulum in RBC (rRNA)"),
  (F, "리소좀은 해당 없음.", "G", ""))
r("8-02",
  (U, "[검토 포인트] 림프계 다능세포는 자가재생.", "G", ""),
  (U, "[검토 포인트] CFU 계열은 증식능이 있다.", "G", ""),
  (U, "[검토 포인트] 다능줄기세포는 자가재생.", "G", ""),
  (U, "[검토 포인트] 적혈모세포는 분화 단계라 재생능 없다는 가설.", "T4", "Orthochromatophil erthroblast"))
r("8-03",
  (U, "[검토 포인트] 피브리노겐은 혈장단백질.", "T4", "albumin, globulin, fibrinogen"),
  (U, "[검토 포인트] 알부민은 혈장단백질.", "T4", "albumin, globulin, fibrinogen"),
  (U, "[검토 포인트] 면역글로불린은 globulin 계열.", "T4", "albumin, globulin, fibrinogen"),
  (U, "[검토 포인트] 지단백(lipoprotein)은 교안 근거 없음, 일반 지식으로는 혈장 구성.", "G", ""))
r("8-04",
  (T, "호산구는 백혈구의 2~4%.", "T4", "Eosinophil : 2 - 4%"),
  (T, "주염기단백질(Major basic protein)을 가진다.", "T4", "Major basic protein (eosinophilic)"),
  (F, "특수과립이 많고 아주르친화과립은 적다.", "T4", "Many specific granule Few azurophilic granule"),
  (U, "(선지 본문 미복기)", "G", ""))
r("8-05",
  (U, "[검토 포인트] 거핵세포 핵엔 핵소체가 있다.", "G", ""),
  (U, "[검토 포인트] 거핵세포는 미토콘드리아가 많은 편(일반 지식).", "G", ""),
  (U, "(선지 본문 미복기)", "G", ""),
  (U, "[검토 포인트] 세포질은 호염기성.", "G", ""))
