# -*- coding: utf-8 -*-
# 기출 문항 대장 (25학번 · 2026-2 · 치과조직학 중간고사 대비)
D01 = "교안01 세포학 상피조직.pdf"
D02 = "교안02 결합조직.pdf"
D03 = "교안03 근육조직, 연골뼈.pdf"
D05 = "교안05 림프 순환기.pdf"
D04 = "교안04(2025판) 신경조직, 혈구.pptx"
Y22 = "22학번 야마_(영준) 필기본"
Y23 = "23학번 치과조직학 중간.docx"
YJ = "조직학 야마 답안 정리_(영준).pdf"
NJ = "나올것같은 거.docx"

def ev(t, s, q, para=False):
    return {"t": t, "s": s, "q": q, "p": para}

def src(k, no, note=""):
    return {"k": k, "no": no, "n": note}

Q = []

def add(**kw):
    kw.setdefault("opts", [])
    kw.setdefault("multi", False)
    kw.setdefault("ans", None)
    kw.setdefault("conf", "")
    kw.setdefault("ev", [])
    kw.setdefault("cf", [])
    kw.setdefault("note", "")
    kw.setdefault("var", [])
    kw.setdefault("img", "")
    kw.setdefault("mk", "c")
    kw.setdefault("proposed", "")
    kw.setdefault("cand", "")
    kw.setdefault("anstext", "")
    Q.append(kw)

# ───────────────────────── Ch1 세포학·상피조직 ─────────────────────────
add(id="1-01", ch=1, key="1.상피 일반", stem="상피에 대한 설명으로 옳은 것을 모두 고르시오.",
    opts=["극성이 있다.", "혈관이 분포되어 있지 않다.", "세포사이다리가 있다.", "외분비세포는 모두 외배엽 기원이다."],
    multi=True, ans=[1, 2, 3], status="추정", conf="상",
    srcs=[src("24", "1"), src("23", "1"), src("22", "2", "ㄱ~ㄹ·5지 조합형")],
    ev=[ev("T4", D01 + " p.41", "Endoderm: liver, gall bladder, the pancreas, and the lining of the respiratory and gastrointestinal tract"),
        ev("T4", D01 + " p.42", "capillary beds in the adjacent supporting connective tissue supplies nourishment and oxygen via diffusion"),
        ev("T4", D01 + " p.75", "Desmosomes (Maculae Adherens) – weld-like junctions along the lateral cell membranes"),
        ev("T2p", Y22, "ㄱ O / ㄴ O / ㄷ O / ㄹ X (손글씨 표시, 표시 주체 불명)")],
    note="④ 반례: 간·이자 등 내배엽 기원 샘. 22학번 조합형 정답 ①(ㄱ,ㄴ,ㄷ)과 일치.",
    var=[{"k": "22", "stem": "상피세포에 대한 설명으로 맞는 것은? ㄱ. 극성이 있다 ㄴ. 혈관이 분포되어 있지 않다. ㄷ. 세포다리연결이 있다. ㄹ. 외분비세포는 외배엽유래다. (1. ㄱ,ㄴ,ㄷ 2. ㄱ,ㄷ 3. ㄴ,ㄹ 4. ㄹ 5. ㄱ,ㄴ,ㄷ,ㄹ)"}])

add(id="1-02", ch=1, key="1.배엽 기원", stem="외배엽 기원인 것?",
    opts=["소화기 상피", "혈관 내피", "젖샘", "땀샘"], multi=True, ans=[3, 4], status="추정", conf="상",
    srcs=[src("24", "4", "원문 번호 '2 3 4' 중 4"), src("23", "4"), src("22", "4")],
    ev=[ev("T4", D01 + " p.41", "Ectoderm: oral and nasal mucosae, cornea, epidermis of the skin, and glands of the skin and the mammary glands."),
        ev("T4", D01 + " p.41", "Mesoderm: ... endothelial lining of the circulatory system"),
        ev("T2p", Y23 + " 이미지(손글씨)", "22학번판 선택지 중 '땀샘의 분비관 상피'·'젖샘 상피'에 동그라미, '소화관 상피'에 endoderm, '혈관 내피'에 mesoderm 메모")],
    note="선지 순서가 학번마다 다르다(22·23: 땀샘/소화관/젖샘/혈관, 24: 소화기/혈관/젖샘/땀샘). 24학번 정답 위치는 ③④.",
    var=[{"k": "22·23", "stem": "외배엽이 유래한 곳은? 1.땀샘의 분비관 상피 2.소화관 상피 3.젖샘 상피 4.혈관 내피"}])

add(id="1-03", ch=1, key="1.각질화", stem="상피세포에 대해 옳지 않은 것은?",
    opts=["자극을 많이 받을수록 비각질화되며 중층화된다."], multi=False, ans=[1], status="추정", conf="중",
    srcs=[src("24", "6", "원문 번호 '5 6' 중 6, 선지 1개만 복기"), src("22", "6", "(1)호흡기 내부 원주상피… (2)이 선지, 답 (2)")],
    ev=[ev("T2", "22학번 야마 본문", "답 (2)", False),
        ev("T2p", YJ, "자극 받으면 각질화된다"),
        ev("T4", D01 + " p.44", "Squamous, keratinized ... Epidermis of skin, gingiva, hard palate / Squamous, nonkeratinized ... mouth, epiglottis, esophagus", True)],
    note="24학번은 선지 1개만 복기되어 있어 이 선지를 정답(옳지 않은 설명)으로 보았다. 교안에 '자극'과 각질화를 직접 잇는 문장은 없다(개념 수준).",
    cf=[])

add(id="1-04", ch=1, key="1.술잔세포", stem="상피세포에 대한 설명으로 잘못된 것은?",
    opts=["상피세포는 모양과 층수에 따라 나눈다.", "술잔세포는 장액성 단순샘이다.", "중층편평상피는 외부로부터 보호하는 역할을 한다.", "상피세포는 보호, 분비, 윤활, 흡수의 기능을 한다."],
    ans=[2], status="추정", conf="상",
    srcs=[src("24", "7"), src("23", "7", "이미지"), src("22", "7", "⑤ 케라틴의 기능(맞는 설명) 추가")],
    ev=[ev("T4", D01 + " p.54", "Mucous glands: goblet cells, minor salivary glands ... secrete Mucin"),
        ev("T4", D01 + " p.56", "Unicellular Exocrine Glands ... goblet cell"),
        ev("T2p", Y22, "2번 X, 메모 '점액성 단순샘'")],
    note="술잔세포는 점액을 분비하는 단세포샘이다. 22학번판은 ⑤가 하나 더 있다.")

add(id="1-05", ch=1, key="1.단층입방상피", stem="단층입방상피가 나타나는 것을 모두 고르시오.",
    opts=["소장 상피", "난소", "구강 상피", "콩팥 집합관"], multi=True, ans=[2], status="추정", conf="중", cand="④ 콩팥 집합관(교안 직접 근거 없음)",
    srcs=[src("24", "8"), src("23", "8"), src("22", "8", "ㄱ소장의 내피 ㄴ난포의 표피 ㄷ구강의 상피 ㄹ집합관의 표피")],
    ev=[ev("T4", D01 + " p.44", "Cuboidal ... Ducts of many glands, covering of ovary, convoluted tubules of kidney"),
        ev("T2p", Y22, "ㄴ(난포) 표시, 메모 '단순입방 or 단순원주 애매해서 ㄴ이 더 맞음'")],
    note="집합관은 단순입방/단순원주 경계라 22학번 필기도 애매하다고 적었다. 소장·구강은 각각 단순원주·중층편평.")

add(id="1-06", ch=1, key="1.H&E 염색", stem="H&E로 잘 염색되지 않는 구조는?",
    opts=["술잔세포", "장액성꽈리", "탄력혈관", "땀샘의 분비관세포"], ans=None, status="추론", conf="하",
    proposed="① 술잔세포(점액 성분이 H&E에서 비어 보임). 대안 ③ 탄력(섬유)은 Orcein 등 특수염색이 필요.",
    srcs=[src("24", "9"), src("23", "9", "④ 땀샘 분비관, ③ 혈관탄력")],
    ev=[ev("T4", D02 + " Fibrous Components 표", "Elastic f. ... Elastin brown with Orcein; purple with Resorcin-fuchsin; blue black with Verhoeff", True),
        ev("T2p", "조직학 야마 정리·나올것같은 거.docx", "Staining: HE에서 점액성은 안됨")],
    note="정답 근거가 T1~T3에 없고 교안 직접 문장도 없다. 재판정 조건: 교수 공개 정답 또는 T2 정답 표기.")

add(id="1-07", ch=1, key="1.반부착반", stem="반부착반단백질의 구성 요소로 세포막에 부착하는 다른 부착방법에 사용되지 않는 단백질은?",
    opts=["cadherin", "integrin", "laminin"], ans=[2], status="교차확인", conf="상",
    srcs=[src("23", "2", "원문에 '답:integrin' 표기"), src("22", "1", "객관식, 보기 미복기")],
    ev=[ev("T2", Y23, "답:integrin"),
        ev("T4", D01 + " p.79", "integrins (transmembrane linker proteins) attached to the plaque and laminin and type IV collagen of the basal lamina"),
        ev("T4", D01 + " p.74", "E-cadherin + actin filaments")],
    note="4·5번 선지는 복기되지 않았다. 22학번 필기: Integrin은 hemidesmosome이 유일하게 쓰는 연결 단백질 중 하나.")

add(id="1-08", ch=1, key="1.샘 분류", stem="연결이 옳은 것을 고르시오 (ㄱ 복합관포상 - 기름샘 / ㄴ 단순관상 - 땀샘,장샘 / ㄷ 단순포상 - (미복기) / ㄹ 복합관상 - 위샘)",
    opts=["ㄱ 복합관포상 - 기름샘", "ㄴ 단순관상 - 땀샘,장샘", "ㄷ 단순포상 - (미복기)", "ㄹ 복합관상 - 위샘"], mk="g", ans=None, status="미확정", conf="",
    proposed="추론(T5): ㄱ·ㄹ은 교과서상 각각 단순분지포상샘·단순분지관상샘이라 부적합, ㄴ만 맞을 가능성.",
    srcs=[src("23", "3", "보기 형식 미복기")],
    ev=[ev("T4", D01 + " p.56", "according to the ductal branch » simple » compound / according to the morphology of secretory units » tubular » acinar (= alveolar) » tubuloalveolar", True)],
    note="교안에는 분류 기준만 있고 기관별 예시가 없다. 교안 근거 없음.")

add(id="1-09", ch=1, key="1.기능-구조", stem="상피세포 기능과 특징구조를 바르게 연결한 것을 모두 고르시오.",
    opts=["보호상피 - 부착반", "단백질합성상피 - 골지복합체", "지방분비세포 - sER", "이온수송세포 - 기저주름과 미토콘드리아"], mk="g", multi=True, ans=[1, 2, 3, 4], status="추정", conf="중",
    srcs=[src("22", "5"), src("23", "5", "이미지로 첨부")],
    ev=[ev("T4", D01 + " p.63", "Serous cell ... Secretory granules, r-ER and Golgi complex"),
        ev("T4", D01 + " p.63", "Steroid-secreting cell ... Lipid droplet, s-ER, mitochondria"),
        ev("T4", D01 + " p.79", "plasma membrane enfoldings ... active transport of ions"),
        ev("T2p", Y22, "ㄱ V / ㄴ √ / ㄷ √ / ㄹ √ (손글씨)")],
    note="ㄹ의 '미토콘드리아'는 교안에 직접 문장이 없다(기저주름만 직접).")

# ───────────────────────── Ch2 결합조직 ─────────────────────────
add(id="2-01", ch=2, key="2.세망조직", stem="골수의 기질을 이루는 결합 조직?",
    opts=["세망조직", "지방조직", "성긴결합조직", "치밀규칙결합조직", "점액결합조직"], ans=[1], status="추정", conf="상",
    srcs=[src("24", "13", "원문 번호 '10 11 12 13' 중 13"), src("23", "13", "보기 부정확: '골수의 골지체를 구성하는 조직'", )],
    ev=[ev("T4", D02 + " Reticular Tissue 슬라이드", "provide the architectural framework of the myeloid, lymphoid and hematopoietic organs. • Distribution - Bone marrow, Lymph node, Spleen etc.")],
    note="23학번판은 복기 오류가 있어 짝 후보로만 연결했다.")

add(id="2-02", ch=2, key="2.와튼젤리", stem="탯줄의 와튼젤리를 구성하는 조직은?",
    opts=["세망조직", "지방조직", "loose connective tissue", "dense regular connective tissue", "mucous connective tissue"], ans=[5], status="추정", conf="상",
    srcs=[src("24", "14"), src("22", "14", "번호 고르기, 보기 미복기"), src("23", "14", "이미지, 보기 미복기")],
    ev=[ev("T4", D02 + " Embryonic CT 슬라이드", "Mucous CT : • the umbilical cord (Wharton’s jelly): rich hyaluronic acid"),
        ev("T2p", Y22, "Embryonic connective tissue → Mucous connective tissue")])

add(id="2-03", ch=2, key="2.염색법", stem="갈색지방세포 염색법?",
    opts=["Vereoff’s", "톨루이딘", "수단", "마송 블루", "인디아 핑크"], ans=[3], status="추정", conf="상",
    srcs=[src("24", "15"), src("23", "15"), src("22", "15")],
    ev=[ev("T4", D02 + " White Adipose Cell 슬라이드", "osmium tetroxide(OsO4) Sudan dyes."),
        ev("T2p", Y22, "3)수단 √, 메모 '수단III, 사산화오스뮴'")],
    note="교안의 Sudan 염색 문장은 백색지방세포 슬라이드에 있다. 갈색지방은 다소포 지질방울이므로 같은 지질 염색을 적용(개념 수준).")

add(id="2-04", ch=2, key="2.GAG 염색", stem="glycosaminoglycan의 염색법은?",
    opts=[], anstext="Toluidine blue(변색성 염색)", status="추정", conf="중",
    srcs=[src("24", "16", "선지 미복기"), src("23", "16"), src("22", "16")],
    ev=[ev("T4", D02 + " Mast Cell 슬라이드", "stained by basic aniline dyes; methylene blue, azure A ... toluidine blue; Metachromasia ... heparin (sulfated GAG)"),
        ev("T2p", Y22, "Toluidine blue 등 (뒤에 blue 있으면 됨)")],
    note="선지가 복기되지 않았다. 교안의 변색성 염색 문장에서 황산화 GAG(헤파린)와 톨루이딘 블루가 연결된다(개념 수준).")

add(id="2-05", ch=2, key="2.비만세포", stem="비만세포(Mast cell)에 발달되어 있는 것은?",
    opts=["Secretory granule(분비 과립)"], anstext="Secretory granule(분비 과립)", ans=[1], status="교차확인", conf="상",
    srcs=[src("24", "19", "복기본에 정답 문구만 남음"), src("23", "19", "보기 미복기"), src("22", "19")],
    ev=[ev("T2", "2025학년도 24학번 완전본", "➢ Secretory granule(분비 과립)"),
        ev("T4", D02 + " Mast Cell 슬라이드", "filled with abundant secretory granules prominent Golgi"),
        ev("T2p", Y22, "allergy reaction 관련된 분비과립(secretory granule), Heparin 풍부 → Metachromasia")],
    note="선지가 정답 문구 하나만 복기되어 있다(블라인드본에는 문항 전체가 없다).")

add(id="2-06", ch=2, key="2.대식세포", stem="대식세포에서 가장 특징적으로 나타나는 세포 소기관?",
    opts=[], anstext="리소좀(lysosome)", status="추정", conf="상",
    srcs=[src("24", "20", "선지 미복기"), src("23", "20")],
    ev=[ev("T4", D02 + " Macrophage 슬라이드", "abundant lysosomes, a number of vacuoles (phagocytic vesicle), small dense gr. 1st & 2nd lysosome")])

add(id="2-07", ch=2, key="2.형질세포", stem="그림의 세포에 대한 설명으로 옳은 것은?",
    opts=["헤파린과 히스타민을 분비한다", "열을 생성한다", "항체를 생성한다", "항원제공한다"], mk="n", ans=[3], status="추정", conf="상", img="plasma",
    srcs=[src("22", "11", "그림 문항"), src("23", "11", "그림 첨부(이미지5)")],
    ev=[ev("T4", D02 + " Plasma Cell 슬라이드", "Antibody (Ab) producing cell"),
        ev("T2p", Y22, "3. 항체를 생성한다 √, 메모 '형질세포 B세포가 분화함 항체 생성'")],
    note="그림 라벨(Rough endoplasmic reticulum containing immunoglobulin molecules, Cartwheel nucleus)이 형질세포를 가리킨다. 23학번 11번은 휴식기 세포(→힘줄세포) 문항으로 별개다.")

add(id="2-08", ch=2, key="2.휴식기 세포", stem="결합 조직에 있는 이 세포는 휴식기와 활동기로 나뉜다. 휴식기에는 세포의 크기가 작아지고, 핵도 작아지며 진하게 염색되는 특징을 가진다. 이 세포는 무엇인가?",
    opts=["형질세포", "비만세포", "갈색지방세포", "힘줄세포", "대식세포"], mk="n", ans=[4], status="추정", conf="상",
    srcs=[src("23", "11", "이미지 문항(2-07)과 번호 중복")],
    ev=[ev("T4", D02 + " Fibroblast 슬라이드", "limited activity in resting stage (fibrocyte)"),
        ev("T4", D02 + " Fibroblast 슬라이드", "fibroblast - fibrocyte (ex. Tenocyte)")],
    note="힘줄세포(tenocyte)는 휴지기 섬유세포의 예로 교안에 명시.")

add(id="2-09", ch=2, key="2.콜라겐 합성", stem="콜라겐 섬유 합성 과정(다)에서 만들어진 단백질로 fibril을 구성하는 collagen은 무엇인가?",
    opts=["Collagen 4", "Collagen 2", "Collagen 9", "Collagen 3"], mk="g", multi=True, ans=[2, 4], status="추정", conf="중",
    srcs=[src("23", "18", "그림(합성 과정) 미복기")],
    ev=[ev("T4", D02 + " Collagen 슬라이드", "Fibril forming (fibrillar) collagens • I, II, III, V, XI"),
        ev("T4", D02 + " Collagen 슬라이드", "Network-forming collagens • IV, VIII, X"),
        ev("T4", D02 + " Collagen 슬라이드", "Fibril-associated collagen • IX, XII, XIV, XVI, XIX")],
    note="단수/복수 지시문이 복기되지 않아 불확실하다. Ⅱ·Ⅲ형은 모두 fibril형성 콜라겐.")

add(id="2-10", ch=2, key="2.콜라겐 결함", stem="- Hydroxylation of after proline and lysine are incorporated into polypeptide chain.\n다음의 결함으로 일어난 비정상적인 아교질결합의 질병은?",
    opts=[], anstext="Scurvy(괴혈병) — 보기 미복기", status="추정", conf="중",
    srcs=[src("22", "(번호 없음)", "보기 미복기"), src("23", "12", "이미지, 손글씨 정답")],
    ev=[ev("T4", D02 + " Examples of clinical disorders 표", "Scurvy Lack of vitamin C, a required cofactor for prolyl hydroxylase"),
        ev("T4", D02 + " 같은 표", "Ehlers–Danlos type VI Faulty lysine hydroxylation"),
        ev("T2p", "22학번 야마_(영준) 필기본, 23학번 이미지(손글씨)", "Scurvy (괴혈병)")],
    cf=[{"s": "교안 표", "a": "Ehlers–Danlos type VI", "n": "lysine hydroxylation 결함은 EDS VI에도 해당. 보기 미복기라 어느 쪽이 선지에 있었는지 알 수 없음."}],
    note="proline·lysine 모두의 hydroxylation 결함이면 괴혈병(비타민 C 결핍)이 우세하나 보기 확인이 필요하다.")

add(id="2-11", ch=2, key="2.basal lamina", stem="주변에 basal lamina가 있는 것은?",
    opts=["상피세포", "근육세포", "지방세포", "내피세포"], multi=True, mk="n", ans=[1, 2, 3, 4], status="추정", conf="하",
    srcs=[src("23", "10", "보기가 정확하지 않을 수 있음")],
    ev=[ev("T4", D01 + " p.79", "basal lamina • extracellular supporting structure • also in muscle cell, adipocyte, Schwann cell"),
        ev("T5", "추론", "내피세포도 바닥판을 가진다(교안 05 흉선 혈액장벽 항목의 Basement membrane·continuous capillary 문장으로 간접 지지)", True)],
    note="지시문(옳은 것/아닌 것)이 복기되지 않았다.")

# ───────────────────────── Ch3 근육조직 ─────────────────────────
add(id="3-01", ch=3, key="3.푸르키니에", stem="다음 중 푸르키니에 섬유에 대한 설명 중 틀린 것은?",
    opts=["심장 전도 세포의 일종", "세포질에 다량의 글리코겐 과립", "심장근세포보다 근원섬유가 적다", "변형된 심장 근육 세포", "심장근세포보다 크기가 작다"], ans=[5], status="추정", conf="상",
    srcs=[src("24", "17", "선지 ① 'Cardiac muscle cell보다 크기가 작다.'만 복기"), src("24", "57", "같은 시험 내 반복, 5지 전부 복기"), src("23", "17", "2021 기출 이미지"), src("22", "29(영준 정리본 기준)", "")],
    ev=[ev("T4", D03 + " p.38", "Purkinje fibers – Large specialized cardiac muscle cells ... Cytoplasm: Pale pink: Glycogen & mitochondria; Striations: weak, poor myofibrils in cytoplasm"),
        ev("T2p", YJ, "일반 × 심장근보다 크다! ×")],
    note="24학번 시험에서 17번과 57번으로 두 번 출제됐다(같은 시험 내 중복).")

add(id="3-02", ch=3, key="3.전자현미경 a-d", stem="[32-35] 세로 절단한 근세포의 전자 현미경 사진을 보고 옳은 것을 모두 고르시오.",
    opts=["a : 근원섬유마디(sarcomere)", "b : 마이오신 분자의 막대모양부분(rodlike portion)으로만 구성된 부위", "c : I-band", "d : 존재하는 주된 단백질은 크레아틴인산전달효소(creatine kinase)이다"], multi=True, ans=None, status="추론", conf="하",
    proposed="③(c : I-band)이 맞을 가능성. 사진의 a–e 라벨이 복기되지 않아 판정 불가.",
    srcs=[src("24", "32", "사진 라벨 미복기")], img="em",
    ev=[ev("T4", D03 + " p.14", "I = I band (isotropic in polarized light) A = A band ... Z = Z disk or Z line ... M = M line"),
        ev("T2p", Y23, "23학번판 라벨 범례: a: A대, c: I대, d: Z선, e: triad, f: H대", True)],
    note="23학번판 범례(c = I대)가 24학번에도 같은 사진이라면 ③이 맞다. 같은 사진이라는 확인이 없다.")

add(id="3-03", ch=3, key="3.thick filament", stem="다음 중 thick filament로만 이루어진 것은?",
    opts=["a", "b", "c", "d", "e"], mk="c", ans=None, status="미확정", conf="",
    proposed="사진 라벨 불명. 23학번판 범례(f: H대)로는 H대가 굵은 세사만으로 이루어진 부위.",
    srcs=[src("24", "33", "a~e"), src("22", "33", "a~e"), src("23", "33", "a·c·d·e·f, 범례 있음")], img="em",
    ev=[ev("T4", D03 + " p.15", "Thick filament – Myosin molecule : 3 nm diameter – Myosin filament: 15 nm diameter, 1.5㎛ long"),
        ev("T2p", Y23, "a: A대, c: I대, d: Z선, e: triad, f: H대")],
    var=[{"k": "23", "stem": "다음 중 thick filament 로만 이루어진 것은? 1.a 2.c 3.d 4.e 5.f (범례: a: A대, c: I대, d: Z선, e: triad, f: H대)", "ans": "5 (f: H대) — 추론"}],
    note="24·22학번은 a~e 5지이고 라벨 범례가 없어 별개로 두었다. 보기 번호와 라벨이 같아도 사진이 같은지 확인되지 않았다.")

add(id="3-04", ch=3, key="3.triad", stem="골격근에서 (e)를 구성하는 것으로 옳은 것은?",
    opts=["rER", "myofibril", "T-tubule", "sarcomere"], ans=[3], status="추정", conf="중",
    srcs=[src("24", "34"), src("23", "34", "e = triad 범례, 보기 ㄱ Sarcomere ㄷ T소관")],
    ev=[ev("T4", D03 + " p.23", "Triad in skeletal muscle = one tubule + two terminal cisternae"),
        ev("T2p", Y23, "e: triad")],
    note="(e)가 triad라는 근거는 23학번 범례뿐이다. 24학번 사진의 (e)가 같은 구조인지는 확인되지 않았다.")

add(id="3-05", ch=3, key="3.심장근 세로단면", stem="다음은 근육의 세로 단면이다. 옳은 것은?",
    opts=["가로 소관의 z선 부위에 존재한다.", "근세사다발이 십자무늬로 비스듬히 배열되어 격장상을 형성한다.", "호르몬에 의해 수축·이완된다.", "이조체가 관찰된다."], multi=True, ans=[1, 4], status="추정", conf="중", cand="③ 호르몬(근거 약함)", img="cardiac",
    srcs=[src("24", "36", "사진: 심장근 세로단면(화살표=사이원반)"), src("23", "36"), src("22", "36", "가)~라) 모두 고르시오")],
    ev=[ev("T4", D03 + " p.34", "T-tubule: large diameter · SR: less in number and small terminal → Not triad but diad"),
        ev("T2p", Y22, "심장근 (A대 가장자리 = 골격근, Z선 = 심장근); 십자모양 = 평활근; 가) 심장근, 라) 이조체 = 심장근")],
    note="이조체(diad)와 Z선 T소관은 심장근 특징. ②는 평활근 서술로 필기에 기록.")

add(id="3-06", ch=3, key="3.사이원반", stem="다음 중 심장근의 intercalated disk에서 가로 부분에서 볼 수 있는 것은?",
    opts=["부착반", "폐쇄막(?)", "Tight junction", "부착막", "Jap junction"], multi=True, ans=[1, 4], status="교차확인", conf="상",
    srcs=[src("24", "38"), src("23", "38", "보기 없이 '부착반, 부착막'만 복기")],
    ev=[ev("T2", Y23, "부착반, 부착막"),
        ev("T4", D03 + " p.36", "Transverse portion (가로부분) - cells joined end-to-end - desmosome, fascia adherens - Lateral portion (세로부분) - gap junction")],
    note="[원문] Jap junction / [수정 제안] Gap junction / [사유] 오탈자 추정. 24학번 ②는 '폐쇄막(?)'으로 물음표가 원문에 있다.")

add(id="3-07", ch=3, key="3.thin filament", stem="Thin filament의 구성 단백질이 아닌 것은?",
    opts=["액틴", "트로포마이오신", "마이오신", "트로포닌"], ans=[3], status="추정", conf="상",
    srcs=[src("24", "40", "원문 번호 '39 40' 중 40"), src("23", "40")],
    ev=[ev("T4", D03 + " p.24", "Actin, Tropomyosin, Troponin in α-helical groove of actin filaments"),
        ev("T4", D03 + " p.4", "Thin myofilament : actin · Thick myofilament : myosin")])

add(id="3-08", ch=3, key="3.thin(긍정형)", stem="가는 세사를 구성하는 단백질은?",
    opts=["액틴", "트로포마이오신", "마이오신", "트로포닌"], mk="ga", multi=True, ans=[1, 2, 4], status="추정", conf="중",
    srcs=[src("22", "40", "가)~라) 형식, 긍정형")],
    ev=[ev("T4", D03 + " p.24", "Actin, Tropomyosin, Troponin in α-helical groove of actin filaments"),
        ev("T2p", Y22, "가) √액틴 (나·라는 표시 없음)")],
    note="필기에는 액틴만 표시되어 있다. 교안 기준 가·나·라. 필기는 정답을 바꾸지 않는다.",
    cf=[{"s": Y22, "a": "가만", "n": "표시 누락 가능(필기는 T2′, 정답 변경 불가)"}])

add(id="3-09", ch=3, key="3.근수축 빈칸", stem="이완상태의 근육원섬유는 굵은세사와 얇은세사가 일부 겹쳐있는 상태로 존재한다. 근육이 수축할 때에는 ATP가 (a)의 머리에 결합한 후 (a)에 있는 ATPase를 통해 분해되는데 이 과정을 빠르고 정확하게 하기 위해 보조인자 (b)의 도움이 필요하다. 근육이 수축하면 (c)는 굵은 세사와 겹쳐진다. (a, b, c는 빈칸)",
    opts=[], anstext="(a) myosin(굵은세사) · (b) TnC · (c) actin(얇은세사) — 22학번 필기 기준, 보기 미복기", status="추정", conf="중",
    srcs=[src("22", "31")],
    ev=[ev("T4", D03 + " p.25–26", "14. Ca2+ binds to TnC 15. conformational change in TnI ... 18. ATP binding on myosin head (→ detach) 19. Hydrolysis of ATP → ADP + Pi"),
        ev("T2p", Y22, "(a) myosin filament (b) TnC (c) actin filament, 메모 'b는 TnC이다'")],
    note="교안상 ATP 가수분해 효소는 myosin 머리, Ca2+가 TnC에 결합하는 단계가 수축 개시. (b)=TnC는 필기 근거.")

add(id="3-10", ch=3, key="3.평활근", stem="이 그림(내장근)은 의 가로 단면을 나타낸 것이다. 옳은 것은?",
    opts=["수의근이다.", "(미복기)", "핵이 1개이다??"], mk="n", ans=[3], status="추정", conf="중",
    srcs=[src("22", "37", "2번 선지 미복기")],
    ev=[ev("T4", D03 + " p.3", "Smooth muscle: no striation, one nucleus, central nucleus, involuntary"),
        ev("T2p", Y22, "1번 X, 3번 O, 메모 '내장근 불수의, 줄무늬 없음, 핵 1개가 중앙에 배열, 방추형'")])

add(id="3-11", ch=3, key="3.적색근", stem="적색근에 대한 특징이 아닌 것은?",
    opts=[], ans=None, status="미확정", conf="",
    proposed="선지 미복기. 적색근(교안): 느리고 지속적 수축·유산소, 혈관·미토콘드리아·myoglobin 많음, 가는 신경섬유.",
    srcs=[src("22", "39", "선지 미복기")],
    ev=[ev("T4", D03 + " p.7", "Red fiber vs white fiber: Contraction Slow, repetitive, not easily fatigued, weaker · Fiber diameter Thin · Vascularization Rich · Mitochondria Numerous · Myoglobin Rich · Innervation Smaller nerve fibers")])

add(id="3-12", ch=3, key="3.수축 시 길이", stem="[사진] 근육 수축 시 길이가 변하지 않는 부분을 찾으시오. (A대 / M선 / M-Z선 사이 길이 / Z선)",
    opts=["A대", "M선", "M선~Z선 사이 길이", "Z선"], mk="n", ans=None, status="추론", conf="중", img="em",
    proposed="A대(활주설에 따라 굵은세사 길이가 일정). 복수 정답 여부는 지시문 미복기.",
    srcs=[src("23", "35", "사진 위치 표시형, 지시문 요약")],
    ev=[ev("T4", D03 + " p.19", "Contraction in muscles; Sliding filament theory", True),
        ev("T5", "추론", "활주설: 굵은세사(A대)는 길이 불변, I대·H대·근절은 단축", True)],
    note="교안에 길이 변화 문장은 없다. 교안 근거 없음(활주설 제목만).")

# ───────────────────────── Ch4 연골·뼈 ─────────────────────────
add(id="4-01", ch=4, key="4.연골 일반", stem="연골에 대한 설명? (지시문 미복기: 옳은 것/옳지 않은 것)",
    opts=["유리연골 기질은 2형 콜라겐으로 이루어졌다", "섬유연골은 척추사이원판에서 관찰할 수 있다", "연골의 관절면에는 연골막이 없다", "연골에는 혈관과 신경은 없지만 림프관은 있다"], ans=None, status="추론", conf="중",
    proposed="'옳은 것' 지시라면 ①②③, '옳지 않은 것'이라면 ④. 교안상 ④가 틀린 문장(림프관도 없음).",
    srcs=[src("24", "22", "원문 번호 '21 22' 중 22, 지시문 '?'")],
    ev=[ev("T4", D03 + " p.51", "No blood vessel ... No nerve ... No lymphatic vessel"),
        ev("T4", D03 + " p.54", "Hyaline: Type II collagen (40%) ... Fibrous: Intervertebral disks, articular disks")],
    note="23학번 21번(4-02)과 선지가 거의 같아 짝 후보로 연결.")

add(id="4-02", ch=4, key="4.연골 일반(23)", stem="연골에 대한 설명?",
    opts=["가) 유리연골 기질은 II형 collagen으로 이루어져 있다", "나) 섬유연골은 척추사이원판에서 관찰할 수 있다", "다) 연골의 관절면에는 연골막이 없다", "라) 연골에는 혈관과 신경이 있지만 림프절은 없다"], mk="ga", multi=True, ans=[1, 2, 3], status="추정", conf="상",
    srcs=[src("23", "21", "1.가나다 2.가다 3.나라 4.라 5.가나다라")],
    ev=[ev("T4", D03 + " p.51", "No blood vessel ... No nerve ... No lymphatic vessel"),
        ev("T4", D03 + " p.54", "Hyaline: present in most places (exceptions: articular cartilages and epiphyses)")],
    note="5지 조합 중 ① 가나다에 해당.")

add(id="4-03", ch=4, key="4.세포영역기질", stem="세포영역기질(territorial matrix)에 대한 설명으로 옳은 것을 모두 고르시오.",
    opts=["Chondroitin sulfate가 풍부하다", "동일접합세포 주변 영역기질이다", "아교질이 상대적으로 적다", "변색성을 보인다"], multi=True, ans=[1, 2, 3, 4], status="추정", conf="중", cand="② 동형세포집단 주변(교안 직접 문장 없음)",
    srcs=[src("24", "23"), src("23", "23")],
    ev=[ev("T4", D03 + " p.55", "Territorial matrix : 50 μm band, rich chondriotin sulfate, poor in collagen"),
        ev("T2p", "조직학 야마 답안 정리_(영준).pdf (연17)", "강한 염기호성을 띄고, 변색성을 나타낸다")])

add(id="4-04", ch=4, key="4.유리연골 분포", stem="유리연골을 이루는 것을 모두 고르시오.",
    opts=["외이도", "코", "귓바퀴", "갈비뼈의 앞쪽끝"], multi=True, ans=[2, 4], status="추정", conf="상",
    srcs=[src("24", "24"), src("23", "24")],
    ev=[ev("T4", D03 + " p.54", "Hyaline: Articular ends of long bones, nose, larynx, trachea, bronchi, ventral ends of ribs"),
        ev("T4", D03 + " p.54", "Elastic: Pinna of ear, walls of auditory canal, auditory tube, epiglottis, cuneiform cartilage of larynx")])

add(id="4-05", ch=4, key="4.긴뼈 형성", stem="긴뼈 형성에 포함되는 것은?",
    opts=["뼈 테두리", "뼈 끝판", "연골 석회화", "이차 골화 중심"], multi=True, ans=[1, 2, 3, 4], status="추정", conf="중",
    srcs=[src("24", "25"), src("23", "25"), src("22", "25")],
    ev=[ev("T4", D03 + " p.91–93", "Endochondral ossification: Bone collar ... Secondary Center of Ossification ... Growth of bone occurs at epiphyseal plate"),
        ev("T2p", Y22, "ㄱ 표시 없음 / ㄴ √ / ㄷ V / ㄹ √")],
    cf=[{"s": Y22, "a": "ㄴ,ㄷ,ㄹ", "n": "ㄱ(뼈 테두리)은 표시가 없다. 교안은 Bone collar를 긴뼈 형성 과정에 포함."}],
    note="교안 기준 네 항목 모두 긴뼈(연골내골화) 과정. 필기 표시 누락 가능성.")

add(id="4-06", ch=4, key="4.세포분열", stem="세포분열 가능한 것?",
    opts=["Osteoclast", "Erythrocyte", "Osteoblast", "Chondrocyte"], mk="n", ans=[4], status="추정", conf="중",
    srcs=[src("23", "26")],
    ev=[ev("T4", D03 + " p.56", "Chondrocyte • chondroblasts in cartilage lacunae • Still proliferate → isogenous cell group"),
        ev("T4", D03 + " p.81", "Osteocyte ... can not divide", True)],
    note="뼈모세포의 분열 가능성은 교안에 직접 문장이 없다.")

add(id="4-07", ch=4, key="4.뼈 설명", stem="뼈에 관한 설명 중 틀린 것은?",
    opts=["뼈는 칼슘 등 이온을 저장", "뼈 내막에 돌기 존재", "납작뼈에는 해면뼈가 있다.", "뼈세포의 돌기는 한 방향으로만 뻗어 있다.", "모든 뼈는 내막과 외막이 골내막, 골막으로 덮여 있다."], ans=[4], status="추정", conf="상",
    srcs=[src("24", "27", "원문 번호 '26 27' 중 27"), src("23", "27", "② 뼈소관에는 osteocyte의 돌기가 존재한다"), src("22", "27")],
    ev=[ev("T4", D03 + " p.81", "Osteocyte ... Process in bony canaliculi · Cell to cell junction: gap junction"),
        ev("T2p", Y22, "4번 √, 메모 '사방으로 뻗어서 주변 골세포와 연결되어 소통'")],
    var=[{"k": "23", "stem": "2) 뼈소관에는 osteocyte의 돌기가 존재한다 (나머지 동일)"}],
    note="24·22학번 ②는 '뼈 내막에 돌기 존재', 23학번 ②는 '뼈소관에는 osteocyte의 돌기가 존재한다'(선지 변형, 정답 동일).")

add(id="4-08", ch=4, key="4.뼈파괴세포", stem="뼈파괴세포로 맞는 것은? (가·나 미복기 / 다 뼈세포와 기원이 다름 / 라 여러 세포의 융합)",
    opts=["가 (미복기)", "나 (미복기)", "다 뼈세포와 기원이 다름", "라 여러 세포의 융합"], mk="ga", multi=True, ans=[3, 4], status="추정", conf="하",
    srcs=[src("23", "28", "가·나 선지 미복기")],
    ev=[ev("T4", D03 + " p.82", "Origin: hematopoietic stem cells ... Many nuclei (5~50) by cell fusion")],
    note="두 선지만 복기되어 있어 가·나 확인 불가.")

add(id="4-09", ch=4, key="4.섬유연골", stem="섬유 연골에 대한 설명으로 옳은 것을 모두 고르시오",
    opts=["연골소강 내에 연골세포가 존재한다", "type1 콜라겐이 많이 존재한다", "동형세포집단(isogenic cell group)이 존재한다", "type2 콜라겐이 존재하지 않는다"], multi=True, ans=[1, 2, 3], status="추정", conf="상",
    srcs=[src("24", "30", "원문 번호 '28 29 30' 중 30"), src("23", "30")],
    ev=[ev("T4", D03 + " p.54", "Fibrous: -Type I collagen, Type II collagen -acidophilic matrix"),
        ev("T4", D03 + " p.59", "One or isogenous cell group · Type I collagen fiber → acidophilic")])

# ───────────────────────── Ch5 림프 ─────────────────────────
add(id="5-01", ch=5, key="5.림프절", stem="림프절에 대해 설명으로 옳은 것을 모두 고르시오.",
    opts=["림프절 내 이물질 제거", "수입림프관은 문을 통해 림프절로 들어옴", "수입림프관에 판막이 존재한다", "Paracortex는 b cell 의존 구역이다"], multi=True, ans=[1, 3], status="추정", conf="상",
    srcs=[src("24", "41"), src("23", "41", "다·라 미복기"), src("22", "41")],
    ev=[ev("T4", D05 + " Lymph Nodes 슬라이드", "serve as filters for the removal of bacteria and other foreign substances"),
        ev("T4", D05 + " Lymph Nodes 슬라이드", "afferent lymphatic vessels : valves; efferent lymphatic vessels : valves; hilum"),
        ev("T4", D05 + " Lymph node flow 슬라이드", "afferent lymph vessels → subcapsular sinus"),
        ev("T4", D05 + " Paracortex 슬라이드", "mostly T cells and the thymus-dependent zone of the lymph node"),
        ev("T2p", Y22, "가 O / 나 X (valve 통해서 subcapsular sinus로 들어옴) / 라 X (T cell 의존구역)")])

add(id="5-02", ch=5, key="5.가슴샘 의존구역", stem="다음 중 가슴샘 의존 구역을 모두 고른 것은?",
    opts=["림프절의 곁피질", "비장의 동맥주위림프집", "파이어 소절", "비장의 림프소절"], multi=True, ans=[1, 2, 3], status="추정", conf="상",
    srcs=[src("24", "42"), src("23", "42"), src("22", "42")],
    ev=[ev("T4", D05 + " Thymus 슬라이드", "thymus-dependent area: • lymph node- paracortical area, • Peyer's patch (ileum), • white pulp- PALS (spleen)"),
        ev("T2p", Y22, "림프절의 paracortex, 공장의 Peyer's patch, 비장의 PALS")],
    note="비장의 림프소절은 B세포 구역.")

add(id="5-03", ch=5, key="5.가슴샘 구조", stem="가슴샘에서 관찰되는 구조는?",
    opts=["림프소절", "상피그물세포", "하살소체", "수질막"], multi=True, ans=[2, 3], status="추정", conf="중",
    srcs=[src("24", "45", "원문 번호 '43 44 45' 중 45"), src("23", "45", "보기 미복기")],
    ev=[ev("T4", D05 + " Thymus 슬라이드", "Epithelial reticular cell · Hassall’s corpuscle"),
        ev("T4", D05 + " Thymus 슬라이드", "the most characteristic feature of the thymic medulla")],
    note="[원문] 수질막 / [사유] 의미 불명(‘수질’의 오기 또는 혈액-가슴샘 장벽?). 가슴샘에는 림프소절이 없다.")

add(id="5-04", ch=5, key="5.림프관-가슴샘 공통", stem="림프관과 가슴샘 모두에서 관찰할 수 있는 것을 모두 고르시오.",
    opts=["피막", "피질", "수질", "수출림프관"], multi=True, ans=[1, 4], status="추정", conf="하",
    srcs=[src("24", "47", "원문 번호 '46 47' 중 47"), src("22", "47")],
    ev=[ev("T2p", Y22, "(가) O (capsule), (나) X, (다) X, (라) ? (수출림프관 자체가 림프관이라 맞다고 할 수 있긴 함)")],
    cf=[{"s": Y22, "a": "림프관이 아니라 림프절일 경우 가·나·다", "n": "지시문이 '림프관'이면 가·라, '림프절'이면 가·나·다(필기 메모)"}],
    note="지시문의 '림프관'이 '림프절'의 오기일 가능성이 있다(23학번 47번은 '가슴샘과 림프절 공통점'). 교안 직접 근거 없음 — 필기 기반 추정.")

add(id="5-05", ch=5, key="5.림프절-가슴샘 공통", stem="가슴샘과 림프절 공통점",
    opts=["수출림프관", "수질", "피질", "피막"], mk="n", multi=True, ans=[1, 2, 3, 4], status="추정", conf="하",
    srcs=[src("23", "47")],
    ev=[ev("T4", D05 + " Summary Table 9-1 Lymphoid Organs", "Thymus · Capsule ... Cortex Present · Medulla Present · Lymphatic Vessels Efferent; Lymph nodes · Afferent and efferent", True),
        ev("T2p", Y22, "림프절일 경우 답은 (가)(나)(다)")],
    cf=[{"s": Y22, "a": "가·나·다(피막·피질·수질)", "n": "수출림프관 제외. 교안 요약표는 가슴샘도 efferent를 가진다고 적음."}],
    note="교안 요약표와 필기가 어긋난다. 어느 쪽도 지우지 않고 보존.")

add(id="5-06", ch=5, key="5.APC", stem="항원제공세포(antigen presenting cell)를 모두 고르시오.",
    opts=["가시돌기세포", "랑게르한스 세포", "상피그물", "장상피의 m세포"], mk="g", multi=True, ans=[1, 2, 3, 4], status="추정", conf="상",
    srcs=[src("24", "48"), src("23", "48", "랑게르한스·장상피·상피그물만 복기"), src("22", "48")],
    ev=[ev("T4", D05 + " Antigen-Presenting Cells 슬라이드", "macrophages, dendritic cells (such as Langerhans cells of the epidermis and oral mucosa), M cell of the intestinal epithelium"),
        ev("T4", D05 + " 같은 슬라이드", "non-monocyte-derived cells • B cells and epithelial reticular cells of the thymus"),
        ev("T2p", Y22, "가시돌기세포 = dendritic cell(O), 상피그물 = ERC(O), 랑게르한스 O, M세포 O")])

add(id="5-07", ch=5, key="5.IgG", stem="혈액태반장벽을 통과할 수 있고, 태아의 면역에 보조 역할을 해주는 면역 글로불린은?",
    opts=["lgG", "lgA", "lgM", "lgD", "lgE"], ans=[1], status="추정", conf="상",
    srcs=[src("24", "49", "원문 번호 '48 49' 중 49"), src("23", "49")],
    ev=[ev("T4", D05 + " Classes of Immunoglobulins 슬라이드", "IgG - the only antibody capable of crossing the placenta to give passive immunity to the fetus.")])

add(id="5-08", ch=5, key="5.MHC 2종", stem="2개의 MHC를 가질 수 있는 세포는?",
    opts=["형질 세포", "세포 독성 T cell", "보조 T cell", "가지 돌기 세포", "호성 중성 백혈구"], ans=[4], status="추정", conf="상",
    srcs=[src("24", "50"), src("23", "50"), src("22", "50")],
    ev=[ev("T4", D05 + " Major Histocompatibility Complex 슬라이드", "every cell : MHC I proteins; APCs : MHC I and II proteins"),
        ev("T2p", Y22, "4) 가지돌기 √, 메모 '가지돌기(dendrite)가 아니라 수지상세포(dendritic cell)'")],
    note="'가지 돌기 세포'는 dendritic cell(수지상세포). [원문] 호성 중성 백혈구 / [수정 제안] 호중구 / [사유] 오기 추정.")

# ───────────────────────── Ch6 순환기 ─────────────────────────
add(id="6-01", ch=6, key="6.심장 전도", stem="심장 임펄스의 생성과 전도에 관여하는 것은?",
    opts=["AV node", "SA node", "방실 다발", "푸르키니에 섬유"], multi=True, ans=[1, 2, 3, 4], status="추정", conf="상",
    srcs=[src("24", "52", "원문 번호 '51 52' 중 52"), src("23", "52", "가나다라 / 동방결절·방실결절·방실다발·푸르키녜 2회 복기")],
    ev=[ev("T4", D03 + " p.39", "Impulse generating & impulse-conducting system: 1. Sinoatrial (SA) node 2. Atrioventricular (AV) node 3. Atrioventricular bundle ... 4. Purkinje fibers")],
    note="지시문(‘모두’ 여부)이 24학번에는 없다. 교안 기준 네 구조 모두 해당.")

add(id="6-02", ch=6, key="6.물질교환", stem="다음 중 조직과의 물질 교환이 일어나는 곳은? 가.소동맥 나.모세혈관 다.모세혈관 이전 소동맥 라.모세혈관 이후 소정맥",
    opts=["가,나,다", "가,다", "나,라", "라", "가,나,다,라"], ans=None, status="추론", conf="중",
    proposed="③ 나,라 (모세혈관과 모세혈관 이후 소정맥에서 교환). 교안 본문에는 해당 문장이 없다.",
    srcs=[src("24", "55", "원문 번호 '53 54 55' 중 55"), src("23", "55")],
    ev=[ev("T4", D05 + " Circulatory system 슬라이드", "Microvasculature – Capillary, Arteriole, postcapillary venule", True),
        ev("T5", "추론", "일반 조직학: 물질교환은 모세혈관 및 모세혈관후 소정맥에서", True)],
    note="교안 05 텍스트에서 모세혈관 슬라이드가 추출되지 않아(그림 위주) 직접 근거를 찾지 못했다.")

add(id="6-03", ch=6, key="6.바깥막", stem="Tunica adventitia에서 관찰 가능한 구조는? 가. 신경다발 나. 내탄력막 다. 맥관벽혈관 라. 푸르키니예 섬유",
    opts=["가,나,다", "가,다", "나,라", "라", "가,나,다"], ans=[2], status="추정", conf="상",
    srcs=[src("24", "56")],
    ev=[ev("T4", D05 + " Tunica adventitia 슬라이드", "Vasa vasorum – small arteries that enter the vessel walls"),
        ev("T4", D05 + " Nerve innervation 슬라이드", "myelinated sympathetic nerve = vasomotor nerve – In artery: only in Tunica adventitia")],
    note="[원문] ①과 ⑤가 모두 '가,나,다'. [수정 제안] ⑤ 가,나,다,라 / [사유] 선지 중복 오기 추정. 내탄력막은 tunica intima 쪽 구조.")

add(id="6-04", ch=6, key="6.불연속 모세혈관", stem="불연속동모양모세혈관에 대하여 옳은 것을 모두 고르시오.",
    opts=["구불한 형태이고 지름이 매우 커서 혈액순환이 느리다.", "내피세포가 불규칙적으로 배열되어있다?", "내피세포 세포질 내에 창이 있다.", "내피세포 사이와 바깥에 포음세포(pinocyte)가 존재한다."], mk="g", multi=True, ans=None, status="추론", conf="하",
    proposed="①·②가 맞을 가능성(일반 조직학). ③ 창은 유창성 모세혈관 특징, ④ 포음소포는 연속형 모세혈관 특징.",
    srcs=[src("24", "58")],
    ev=[ev("T5", "추론", "일반 조직학 교과서 수준", True)],
    note="교안 근거 없음(05 텍스트에 모세혈관 분류 슬라이드 미추출). 판정 보류.")

add(id="6-05", ch=6, key="6.맥관벽혈관", stem="맥관벽혈관 특징으로 옳은 것을 모두 고르시오.",
    opts=["직경 큰 혈관의 중간막, 외막 바깥에 존재", "소동맥 소정맥 모세혈관으로 이루어져 있음", "중간막과 외막에 산소와 영양분 공급", "정맥보다 동맥에서 많이 관찰된다."], mk="g", multi=True, ans=[1, 2, 3], status="추정", conf="상",
    srcs=[src("24", "60", "원문 번호 '59 60' 중 60"), src("23", "60"), src("22", "60", "보기 미복기")],
    ev=[ev("T4", D05 + " Vasa vasorum 슬라이드", "Arteriole, capillary, venule – often in Vein > artery – in large vessels: diameter ≥ 1mm – Tunica adventitia and external layer of tunica media"),
        ev("T4", D05 + " 같은 슬라이드", "tunica media and tunica adventitia: from vasa vasorum (nutrition)"),
        ev("T2p", Y22, "맥관벽혈관 = vasa vasorum ... 정맥에 더 흔함")],
    note="5지 조합 중 ①(ㄱ,ㄴ,ㄷ). ㄹ은 교안(Vein > artery)과 반대.")

add(id="6-06", ch=6, key="6.혈관주위세포", stem="혈관주위세포의 특징이 아닌 것은? (23학번 보기: 1 긴 세포질 돌기 / 2 내배엽 세포에서 기인 / 3 마이오신·액틴·트로포마이오신 함유 / 4 혈관주위세포는 내피세포를 둘러싸고 있다 / 5 성장·분화하여 혈관이나 결합조직세포를 형성)",
    opts=["긴 세포질 돌기가 있다.", "내배엽 세포에서 기인한다.", "마이오신, 액틴, 트로포마이오신을 함유한다", "혈관주위세포는 내피세포를 둘러싸고 있다.", "성장, 분화하여 혈관이나 결합조직세포를 형성하여 재생에도 관여한다"], mk="n", ans=None, status="추론", conf="중",
    proposed="② 내배엽 세포에서 기인 (혈관주위세포는 간엽 기원).",
    srcs=[src("22", "51", "보기 미복기"), src("23", "51", "보기 복기")],
    ev=[ev("T2p", Y22, "혈관주위세포 pericyte 혈관 근처에 있는 줄기세포로 혈관에 필요한 각종 세포로 분화함, 혈관 보수"),
        ev("T5", "추론", "혈관주위세포는 중배엽성 간엽 기원", True)],
    note="교안 05·02에 pericyte 직접 서술 없음. 교안 근거 없음.")

add(id="6-07", ch=6, key="6.모세혈관", stem="모세혈관의 특징과 기능 아닌 것은?",
    opts=["혈액과 조직 사이 물질교환을 한다", "basal lamina 존재 안한다", "동맥과 정맥 연결하는 Capillary bed가 있다", "Smooth muscle 층이 존재 안한다"], mk="n", ans=[2], status="추정", conf="중",
    srcs=[src("22", "53")],
    ev=[ev("T4", D05 + " Blood-thymus barrier 슬라이드", "continuous type capillaries · Endothelial tight junctions · Basement membrane", True),
        ev("T2p", Y22, "1번 O / 2번 X / 3번 O / 4번 O(표현 애매)")],
    note="필기 메모: 4번은 tunica intima의 평활근세포는 있고 tunica media의 평활근층이 없다는 뜻이라 표현이 애매.")

add(id="6-08", ch=6, key="6.탄력동맥 외막", stem="탄력동맥의 외막에서 발견할 수 있는 구조는?",
    opts=[], ans=None, status="미확정", conf="",
    proposed="선지 미복기. 교안: tunica adventitia에는 vasa vasorum과 신경이 분포.",
    srcs=[src("22", "56", "선지 미복기")],
    ev=[ev("T4", D05 + " Tunica adventitia 슬라이드", "Loose C-T – fibroblasts, type I collagen fiber, elastic fibers · Vasa vasorum")])

# ───────────────────────── Ch7 신경조직 (교안04 2025판 근거) ─────────────────────────
add(id="7-01", ch=7, key="7.축삭 소기관", stem="축삭에서 흔히 발견되는 것은?",
    opts=["골지복합체", "미토콘드리아", "니들소체", "용해소체", "바소체"], ans=[2], status="추정", conf="중",
    srcs=[src("24", "62", "원문 번호 '61 62' 중 62")],
    ev=[ev("T4", D04 + " 슬라이드 6~7", "Nissl substance: r-ER ... not in axon hillock · Mitochondria - energy source for ion exchange (Na+/K+ exchange pump) and axonal transport"),
        ev("T4", D04 + " 슬라이드 6", "no protein-synthesizing assembly in axon")],
    note="[원문] 니들소체 / [수정 제안] 니슬소체 / [사유] 오탈자 추정. 교안은 2025학년도판(2026판 04 미확보).")

add(id="7-02", ch=7, key="7.멜라닌 과립", stem="신경원세포질 내에 멜라닌 과립이 많다면 이 세포의 특징이라 생각되는 것은?",
    opts=["호르몬을 생성하는 분비신경세포이다.", "노화가 진행된 신경세포이다.", "신경전달 물질로 카테콜아민을 형성하는 세포이다.", "가성단극뉴런이다.", "축삭의 일부가 손상된 신경세포로 재생 과정에서 나타나는 현상이다."], mk="c", ans=[3], status="추정", conf="중",
    srcs=[src("24", "63"), src("23", "63", "③·④ 순서 바뀜")],
    ev=[ev("T4", D04 + " 슬라이드 7", "Pigment Granules - Melanin granule - Lipofuscin granule", True),
        ev("T2p", YJ, "연20: 멜라닌과립이 있는 세포의 특징 : 카테콜아민을 분비한다. / 연07: 카테콜아민… melanine granule")],
    note="교안에는 '멜라닌 = 카테콜아민'의 직접 문장이 없다. 노화 색소는 lipofuscin.")

add(id="7-03", ch=7, key="7.신경 틀린 것", stem="신경에 대한 설명으로 틀린 것은?",
    opts=["뇌와 척수의 백색질에는 신경세포체가 없다", "축삭에는 neurofilament와 microtuble이 있다", "세포체에는 골지가 발달되어 있다", "니슬소체는 rER이다", "가지돌기는 말이집으로 둘러쌓여 있다."], ans=[5], status="추정", conf="상",
    srcs=[src("24", "65", "원문 번호 '64 65' 중 65"), src("23", "65")],
    ev=[ev("T4", D04 + " 슬라이드 9", "Distinction between Axon and Dendrites: myelin sheath — Axon could be associated, Dendrite not associated"),
        ev("T4", D04 + " 슬라이드 6", "Nissl substance: r-ER")])

add(id="7-04", ch=7, key="7.fast axonal transport", stem="fast axonal transport를 매개하는 물질은?",
    opts=[], ans=None, status="추론", conf="하",
    proposed="미세소관(microtubule)을 따라 이동시키는 모터 단백질(키네신·다이닌). 교안은 microtubule–axonal transport까지만 서술.",
    srcs=[src("24", "66", "선지 미복기")],
    ev=[ev("T4", D04 + " 슬라이드 11", "Microtubule - tubulin - axonal transport - anterograde - retrograde", True),
        ev("T5", "추론", "키네신(전행성)·다이닌(후행성)은 일반 지식", True)],
    note="선지가 없고 교안에 모터 단백질 이름이 없다. 교안 근거 없음.")

add(id="7-05", ch=7, key="7.거짓단극", stem="거짓단극신경원에서 중추돌기와 말초돌기의 형태는?",
    opts=["중추돌기는 축삭 말초돌기는 ?이다", "중추돌기는 ?, 말초돌기는 축삭이다", "둘 다 ?이다", "둘 다 축삭이다", "때에 따라 축삭일수도 ?일수도 있다"], ans=[4], status="추정", conf="중",
    srcs=[src("24", "67"), src("23", "67")],
    ev=[ev("T4", D04 + " 슬라이드 14", "Pseudounipolar neuron in DRG (dorsal root ganglion) peripheral process · central process", True),
        ev("T2p", "나올것같은 거.docx", "거짓신경단극원: 감각뉴런, axon 2개(telodendron: dendrite기능의 axon)")],
    note="[원문] '?' (수상돌기 추정, 복기 불가). 교안 슬라이드 9의 '예외: pseudounipolar neuron'도 참고.")

add(id="7-06", ch=7, key="7.말이집 형성", stem="<보기> Astrocyte / Oligodendrocyte / Microglia / Ependymal cell / Schwann cell / Satellite cell 중 Myelin에 속하는 것은?",
    opts=["Astrocyte", "Oligodendrocyte", "Microglia", "Ependymal cell", "Schwann cell", "Satellite cell"], mk="n", multi=True, ans=[2, 5], status="추정", conf="상",
    srcs=[src("24", "68"), src("23", "68")],
    ev=[ev("T4", D04 + " 슬라이드 24", "Myelin Sheath formed by wrapped cell membrane of Oligodendrocyte in CNS, Schwann Cell in PNS")])

add(id="7-07", ch=7, key="7.말초아교세포", stem="위 <보기> 중 말초아교세포에 해당하는 것은? (2개)",
    opts=["Astrocyte", "Oligodendrocyte", "Microglia", "Ependymal cell", "Schwann cell", "Satellite cell"], mk="n", multi=True, ans=[5, 6], status="교차확인", conf="상",
    srcs=[src("24", "69", "원문에 정답 문구 표기"), src("23", "69")],
    ev=[ev("T2", "2025학년도 24학번 완전본", "Schwann cell, Satellite cell"),
        ev("T4", D04 + " 슬라이드 15", "Peripheral Neuroglia: Schwann Cell in peripheral nerve and ganglion; Satellite Cell in ganglion")])

add(id="7-08", ch=7, key="7.섬모", stem="위 <보기> 중 섬모가 있는 것은?",
    opts=["Astrocyte", "Oligodendrocyte", "Microglia", "Ependymal cell", "Schwann cell", "Satellite cell"], mk="n", ans=[4], status="추정", conf="상",
    srcs=[src("24", "70"), src("23", "70")],
    ev=[ev("T4", D04 + " 슬라이드 21", "Ependymal Cell ... cilia and microvilli on luminal surface")])

# ───────────────────────── Ch8 혈구 (교안04 2025판 근거) ─────────────────────────
add(id="8-01", ch=8, key="8.세망적혈구", stem="세망 적혈구의 구성 성분은?",
    opts=["헤모글로빈", "미토콘드리아", "mRNA", "리소좀"], ans=[3], status="추정", conf="중",
    srcs=[src("24", "75", "원문 번호 '71~75' 중 75"), src("23", "75")],
    ev=[ev("T4", D04 + " 혈구 슬라이드(Reticulocyte)", "Reticulocyte · Reticulum in RBC (rRNA) · Immature RBC")],
    note="[원문] mRNA / [수정 제안] rRNA / [사유] 교안은 rRNA로 적혀 있다. 선지 중 가장 가까운 ③으로 판정.")

add(id="8-02", ch=8, key="8.재생능력", stem="세포 재생능력이 없는 것은?",
    opts=["lymphoid multipotential cell", "monocyte-colony-forming cell", "pluripotential cell", "erythroblast"], ans=None, status="추론", conf="하",
    proposed="④ erythroblast(분화 방향이 정해진 세포로 자기재생 능력 없음). 교안에 자기재생 관련 문장이 없다.",
    srcs=[src("24", "79", "원문 번호 '76~79' 중 79")],
    ev=[ev("T4", D04 + " Erythropoiesis 슬라이드", "Proerythroblast → Basophil erythroblast → Polychromatophil erythroblast → Orthochromatophil erythroblast → Reticulocyte → RBC", True),
        ev("T5", "추론", "줄기세포·전구세포는 자기재생, 말단 분화 단계는 불가", True)])

add(id="8-03", ch=8, key="8.혈장 단백질", stem="혈장의 구성 단백질로 올바른 것을 모두 고르세요. 가) fibrinogen 나) albumin 다) immunoglobin 라) lipoprotein",
    opts=["fibrinogen", "albumin", "immunoglobin", "lipoprotein"], mk="ga", multi=True, ans=None, status="추론", conf="하",
    proposed="가·나·다(교안 기재), 라 lipoprotein도 혈장 단백질이나 교안에는 없음.",
    srcs=[src("23", "71")],
    ev=[ev("T4", D04 + " Blood 슬라이드", "Plasma (55%) Water 90% ↑ · Plasma protein 7% (albumin, globulin, fibrinogen, etc)")])

add(id="8-04", ch=8, key="8.호산구", stem="Eosinophil 관련된 설명으로 옳은 것은 ㄱ 2~4프로 / ㄴ 주염기단백질을 가진다 / ㄷ 특수과립의 비율보다 아주르친화과립의 비율이 높다 / ㄹ ?",
    opts=["2~4프로", "주염기단백질을 가진다", "특수과립의 비율보다 아주르필릭한 과립의 비율이 높다", "?"], mk="g", multi=True, ans=[1, 2], status="추정", conf="상",
    srcs=[src("23", "72", "ㄹ 미복기")],
    ev=[ev("T4", D04 + " Differential count 슬라이드", "Eosinophil : 2 - 4%"),
        ev("T4", D04 + " Eosinophil 슬라이드", "Many specific granule Few azurophilic granule · Major basic protein (eosinophilic)")])

add(id="8-05", ch=8, key="8.거핵구", stem="megakaryocyte에 대한 설명으로 옳지 않은 것은?",
    opts=["핵에 핵소체가 존재한다", "미토콘드리아가 적다", "(미복기)", "세포질은 호염기성을 띄어 진하게 염색된다"], mk="g", ans=None, status="미확정", conf="",
    proposed="교안에는 megakaryopoiesis 단계만 있다(megakaryoblast → megakaryocyte → platelet). 교안 근거 없음.",
    srcs=[src("23", "73", "ㄷ 미복기")],
    ev=[ev("T4", D04 + " Megakaryopoiesis 슬라이드", "Megakaryoblast ↓ Megakaryocyte ↓ Platelet 10일", True)])

add(id="8-06", ch=8, key="8.과립 효소", stem="호중구 호산성구 공통 과립 속 효소 고르기",
    opts=[], anstext="Collagenase(교안상 호중구 특수과립·호산구 externum 모두에 기재)", ans=None, status="추론", conf="하",
    proposed="Collagenase. 선지 미복기라 일치 확인 불가.",
    srcs=[src("23", "74", "선지 미복기")],
    ev=[ev("T4", D04 + " Neutrophil 슬라이드", "Specific granule: Alkaline phosphatase, Collagenese Lactoferin, Lysozyme"),
        ev("T4", D04 + " Eosinophil 슬라이드", "Externum: Acid phosphatase Arylsulfatase β-glucuronidase Collagenase Phospholipase Cathepsin RNAase")])
