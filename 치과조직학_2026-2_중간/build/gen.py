# -*- coding: utf-8 -*-
import json, base64, collections, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from data_q import Q, ev, D03, D05, D04, Y22, Y23, YJ
from data_n import CH, CH_SRC, SUM, NEW
from data_r import R as WHY_RAW
from data_s import MEM, VS
import re, glob

B = os.path.dirname(__file__)
YT = "조직학 중간 총정리본 2차_(영준).pdf (1~3주차만)"

# 후속 근거 패치 (총정리본 열람 결과)
PATCH = {
 "3-12": [ev("T2p", YT, "결과적으로 근육이 수축하면 A대를 제외한 모든 band 길이가 줄어든다.")],
 "3-05": [ev("T2p", YT, "T tubule이 Z line 쪽으로 들어옴 / Diad: 삼조체가 아닌 이조체 (1 tubule + 1 SR)")],
 "6-06": [ev("T2p", YT, "Stem cells: mesenchymal stem cell들이 다른 세포들 주변에 있다가 손상될 경우 분화해서 자리를 채움 (주변에 있어서 pericyte라고 함)")],
 "3-01": [ev("T2p", YT, "Purkinje fibers: 일반 심장근세포보다 크기가 큰 특수한 심장근세포")],
 "3-06": [ev("T2p", YT, "가로방향(Transverse): Desmosome, Fascia adherens / 세로방향(Lateral): Gap junction")],
}
for q in Q:
    for e in PATCH.get(q["id"], []):
        q["ev"].append(e)


# ───────── v6.8 §14 ① 보기별 판단 이유 ─────────
def norm(t):
    return re.sub(r"[\s*\\•]+", "", t).lower()
CORPUS = ""
for f in sorted(glob.glob(os.path.join(B, "corpus", "*.txt"))):
    CORPUS += norm(open(f, encoding="utf-8").read())
AUTO = bool(CORPUS)

# 2026판 04 교안 확보: 04 인용은 새 교안 텍스트와 대조해, 통과하지 못하면 2025판 출처 표기로 되돌림
if AUTO:
    for _q in Q:
        if int(_q["ch"]) >= 7:
            for _e in _q["ev"]:
                if _e["t"] == "T4" and _e.get("q") and not all(norm(_p) in CORPUS for _p in re.split(r"\s·\s|\s?\.\.\.\s?|\s→\s", _e["q"]) if len(_p.strip()) >= 4):
                    _e["s"] = _e["s"].replace("교안04 신경조직, 혈구.pdf(2026판)", "교안04 2025판 pptx(2026판 텍스트에서 미확인)")
qmap = {q["id"]: q for q in Q}
nq_total = nq_ok = nq_down = 0  # 7·8단원은 04 교안이 없어 자동 대조 제외(수기 유지)
for qid, rows in WHY_RAW.items():
    q = qmap[qid]
    assert len(rows) == len(q["opts"]), qid
    ans = q["ans"]
    out = []
    for i, (tv, sent, basis, quote) in enumerate(rows, 1):
        b = basis
        if b == "T4" and quote:
            nq_total += 1
            if AUTO:
                if norm(quote) in CORPUS: nq_ok += 1
                else: b = "G"; nq_down += 1
        elif b == "T4" and not quote:
            b = "G"
        review = (tv == "?") or not ans
        ok = None if review else (i in ans)
        out.append({"l": i, "ok": ok, "s": sent, "b": b, "q": quote if b == "T4" else ""})
    q["why"] = out
    q["whyRev"] = any(w["ok"] is None for w in out)
for q in Q:
    q.setdefault("why", [])
WHYSTAT = {"cards": len(WHY_RAW), "quotes": nq_total, "auto": AUTO, "autoOk": nq_ok, "downgraded": nq_down,
           "noOpts": [q["id"] for q in Q if not q["opts"]]}

MISMATCH = [
 ["1-03", "교안에 '자극 → 각질화'를 직접 잇는 문장이 없어 개념 수준으로 판정했습니다."],
 ["1-05", "콩팥 집합관은 단순입방/단순원주 경계라 22학번 필기도 애매하다고 적었습니다. 교안 직접 근거가 없습니다."],
 ["1-09", "ㄹ '미토콘드리아'는 교안에 직접 문장이 없고 기저주름만 직접 근거입니다."],
 ["2-03", "교안의 Sudan 염색 문장은 백색지방세포 슬라이드에 있고, 갈색지방에는 개념 수준으로 적용했습니다."],
 ["3-08", "22학번 필기는 액틴만 표시했으나 교안은 액틴·트로포마이오신·트로포닌을 얇은 세사로 적습니다. 정답은 교안 기준 유지."],
 ["4-05", "필기에 ㄱ(뼈 테두리) 표시가 없으나 교안은 긴뼈 연골내골화 과정에 포함합니다."],
 ["4-06", "조골세포의 분열 가능성은 교안에 직접 문장이 없습니다."],
 ["5-04", "지시문 '림프관'은 '림프절' 오기일 수 있습니다. 교안 직접 근거가 부족해 필기 기반 추정입니다."],
 ["5-05", "교안 요약표(모두 공통)와 22학번 필기('림프절일 경우 답 가·나·다')가 어긋납니다. 양쪽 보존."],
 ["6-07", "22학번 필기에서 4번 표현이 애매하다고 적었습니다."],
 ["7-02", "교안에 '멜라닌 과립 = 카테콜아민' 직접 문장이 없습니다(2026판 04 기준)."],
 ["8-01", "교안은 rRNA로 적고 문항 선지는 mRNA라 가장 가까운 선지로 판정했습니다."],
]

# ───────── v6.8 §13 인용 그림 번호·색인 ─────────
FIGS = [
 {"q": "Q1", "img": "plasma", "kind": "문항", "src": "23학번 치과조직학 중간.docx 이미지(형질세포 전자현미경 사진)", "emb": "내장(base64 JPEG)", "hist": "교체 이력 없음"},
 {"q": "Q2", "img": "em", "kind": "문항", "src": "23학번 치과조직학 중간.docx 이미지(골격근 세로 전자현미경, 손글씨 표시 제거·흔적 일부 잔존)", "emb": "내장(base64 JPEG)", "hist": "교체 이력 없음"},
 {"q": "Q3", "img": "cardiac", "kind": "문항", "src": "24학번 완전본 docx 이미지(근육 세로 단면, 화살표 = 사이원반)", "emb": "내장(base64 JPEG)", "hist": "교체 이력 없음"},
]
FIGNO = {f["img"]: f["q"] for f in FIGS}

# ───────── v6.8 §14 ④ 연도·시점 카드 (교안에 실제 나온 것만) ─────────
TL = {"years": [
 ["1891", "혈액 도말법(Smear method) — Dimitri Ramanovsky (1891년), 교안 표기 그대로", "도말 염색 종류: Giemsa·Wright·Leishman", "교안04(2026판) Staining of the Blood", "Dimitri Ramanovsky (1891년)"]],
 "times": [
 ["상피(피부·소장)", "28일 / 4~6일", "상피 세포 교체 주기", "교안01 p.83", "Turnover time: 28 days in skin, 4 to 6 days in small intestine"],
 ["적혈구", "수명 120일", "무핵 양면오목 원반", "교안04(2026판) RBC", "Life span: 120 days"],
 ["혈소판", "수명 10일", "무핵 이중볼록 원반", "교안04(2026판) Platelet", "Life span: 10 days"],
 ["적혈구 생성", "7일", "EPO·비타민 B12·철·엽산 필요", "교안04(2026판) Erythropoiesis", "EPO, Vit B12, iron, folic acid 7일"],
 ["과립구 생성", "11일", "골수모세포 → 백혈구", "교안04(2026판) Granulopoiesis", "WBC 11일"],
 ["혈소판 생성", "10일", "거핵모세포 → 거핵세포 → 혈소판", "교안04(2026판) Megakaryopoiesis", "Platelet 10일"],
 ["뼈 재형성", "약 3주 / 6개월", "활성화·흡수 → 반전 → 형성 → 휴지", "교안03 p.98", "6 months"],
 ["뼈 대사", "매주 5~7%", "골량이 매주 교체됨", "교안03 p.98", "5-7% of bone mass turned over each week"],
 ["골 성장 종료", "여성 ~18세 / 남성 ~21세", "청소년기까지 골격 성장", "교안03 p.86", "through adolescence (~18 females, ~21 males)"],
 ["가슴샘", "사춘기까지 성장(35~40 g)", "이후 퇴축·지방 침윤", "교안05 Thymus", "continues to grow until puberty (35 ~ 40 g weight)"],
 ["태생기 조혈", "임신 6주(간) / 6개월(골수)", "간 시기 → 골수 시기", "교안04(2026판) Prenatal Hematopoiesis", "Hepatic phase 6th week of gestation"]],
 "note": "연표는 교안에 연도가 실제로 적힌 1건뿐입니다(참고문헌 연도는 사건이 아니라 제외). 인물 이름은 원문에 없는 정보를 채우지 않았습니다."}

# ───────── v6.9 내용 정리 재구성: 키워드·흐름(kw/chN.py), 반복 개념, 시점 막대 ─────────
import importlib.util
KW = {}
for _n in range(1, 9):
    _p = os.path.join(B, "kw", "ch%d.py" % _n)
    if os.path.exists(_p):
        _sp = importlib.util.spec_from_file_location("kw%d" % _n, _p); _m = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(_m)
        KW[_n] = _m.K
CON_DEF = [
 ("basal", "기저판·기저막", "basal lamina", r"basal lamina|basement|기저판|기저막|hemidesmosome|반데스모솜|laminin"),
 ("junction", "세포 접합", "junction", r"junction|desmosome|접합|tight|zonula|adherens|데스모솜|connexin|cadherin"),
 ("cytoskel", "세포골격", "actin · 중간필라멘트 · 미세소관", r"actin|myosin|intermediate|keratin|microtubule|미세소관|중간 ?필라멘트|액틴|미오신|tubulin|filament"),
 ("collagen", "콜라겐", "collagen", r"collagen|콜라겐"),
 ("ecm", "기질·GAG", "ECM · proteoglycan", r"GAG|glycosaminoglycan|proteoglycan|hyaluron|chondroitin|ground substance|기질|matrix"),
 ("ca", "칼슘", "Ca2+", r"Ca ?2\+|calcium|칼슘|Ca2\+"),
 ("blast", "-blast → -cyte", "모세포 → 성숙세포", r"blast|모세포|fibrocyte|osteocyte|chondrocyte|tenocyte"),
 ("stain", "염색법", "staining", r"stain|염색|PAS|Orcein|Verhoeff|H&E|toluidine|Masson|Sudan|Giemsa|Wright"),
 ("vessel", "혈관·내피", "endothelium · vessel", r"capillar|endotheli|vessel|혈관|내피|lymphatic|림프관|모세"),
 ("immune", "면역세포·항체", "immune", r"macrophage|대식|lymphocyte|림프구|MHC|antibod|항체|Ig[AGEMD]|APC|plasma cell|형질세포|T cell|B cell|mast"),
 ("germ", "배엽 기원", "germ layer", r"ectoderm|endoderm|mesoderm|mesenchym|배엽|중배엽|외배엽|내배엽"),
]
CON = []
for _id, _nm, _en, _rx in CON_DEF:
    _r = re.compile(_rx, re.I)
    _cnt = {c: 0 for c in range(1, 9)}
    for q in Q:
        _t = q["stem"] + " " + " ".join(q["opts"])
        if _r.search(_t): _cnt[int(q["ch"])] += 1
    _where = []
    for c in range(1, 9):
        k = KW.get(c)
        if k and _id in k["tags"]:
            _where.append([c, k["tagnote"].get(_id, "")])
    CON.append({"id": _id, "name": _nm, "en": _en, "qn": sum(_cnt.values()), "byq": _cnt, "where": _where})
CON.sort(key=lambda x: (-len(x["where"]), -x["qn"]))
# 기간 막대(일 단위, 교안에 적힌 기간만): [라벨, 일수(막대 길이 기준), 표기, 출처행 index]
TLV = [["소장 상피 교체", 5, "4~6일"], ["적혈구 생성", 7, "7일"], ["혈소판 수명·생성", 10, "10일"], ["과립구 생성", 11, "11일"],
       ["뼈 재형성 1주기", 21, "약 3주"], ["피부 상피 교체", 28, "28일"], ["태생기 간 조혈 시작", 42, "임신 6주"], ["적혈구 수명", 120, "120일"], ["뼈 재형성 전체", 180, "6개월"]]

# ───────── v6.8 §16 내용 정리 각주(선배 필기) ─────────
FN_KIND = {"3-12": "교안 밖", "3-05": "보강", "3-01": "보강", "3-06": "보강", "6-06": "교안 밖", "1-06": "교안 밖", "7-05": "교안 밖"}
FN = []; fn_excl = 0
for q in Q:
    for e in q["ev"]:
        if e["t"] != "T2p": continue
        if ("총정리본" in e["s"] or "나올것같은" in e["s"]) and not q["cf"]:
            FN.append({"ch": q["ch"], "q": q["id"], "kind": FN_KIND.get(q["id"], "보강"), "t": e["q"], "src": e["s"], "conf": "중"})
        else:
            fn_excl += 1
FN.sort(key=lambda f: (f["kind"] != "교안 밖", f["ch"]))
FNSTAT = {"shown": len(FN), "excluded": fn_excl, "rule": "기출 정답 표시를 옮겨 적은 항목·모순 항목은 문항 카드에만 두고 각주에서 뺐습니다."}

# 파생 관계
REL = collections.defaultdict(list)
for n in NEW:
    for d in n["der"]:
        REL[d].append(n["id"])

# 통계
dist = collections.Counter(q["status"] for q in Q)
order = ["확정", "교차확인", "추정", "충돌", "미확정", "추론"]
dist_o = collections.OrderedDict((k, dist.get(k, 0)) for k in order)
conf = collections.Counter(q["conf"] or "미표기" for q in Q if q["status"] in ("추정", "추론"))
conf_o = collections.OrderedDict((k, conf.get(k, 0)) for k in ["상", "중", "하", "미표기"])
total = sum(len(q["srcs"]) for q in Q)
dupb = sum(1 for q in Q if len(q["srcs"]) > 1)
byk = collections.Counter(s["k"] for q in Q for s in q["srcs"])
per_ch = collections.Counter(q["ch"] for q in Q)
NEWRATE = round(100 * len(NEW) / len(Q))

STATS = {"uniq": len(Q), "total": total, "dupBundles": dupb, "dist": dist_o, "conf": conf_o}

VER = "v6.10 · 2026-10-16 (현행)"
SCOPE = {"scope": {
  "from": "1주 세포학·상피조직 (9/4)", "to": "7주 신경조직·혈구 (10/14)",
  "excluded": "8주 이후(호흡기, 소화관·소화샘, 내분비, 비뇨기, 특수감각기, 피부)는 기말 범위", "basis":
  "2026 강의계획서(교안 01·03 슬라이드): 중간고사 8주차(10/24). 주차: 1 세포학 상피 / 3 결합조직 / 5 근육·연골&뼈 / 6 림프·순환기(온라인) / 7 신경조직·혈구. 24학번 2025 중간 복기본도 같은 구간. 시험 공지 원문은 미확인(사용자 전달 없음).",
  "confirmed_by_user": True, "exam_format": "객관식(24학번 번호 최대 81, 문항 수·시간 미확인)",
  "conflicts": [
    {"source": "강의계획서 vs 사용자 지정", "range": "시험일", "note": "계획서 10/24, 사용자 지정 2026-10-23 10:00–12:00. 2026-10-24는 토요일이고 강의 요일은 금요일."},
    {"source": "교안 04", "range": "7주 신경조직·혈구", "note": "2026판 04 교안(분할본 부분1~6, 10/16 업로드) 확보. 문구는 자동 대조."}],
  "decided_at": "2026-10-10"}}

CROSS = [
 ["Ch1 세포학·상피조직", "01 ✓ (1주)", "없음", "미작성", "Q1–9", "없음", "포함"],
 ["Ch2 결합조직", "02 ✓ (3주)", "없음", "미작성", "Q13–20", "없음", "포함"],
 ["Ch3 근육조직", "03 ✓ (5주)", "없음", "미작성", "Q31–40", "없음", "포함"],
 ["Ch4 연골·뼈", "03 ✓ (5주)", "없음", "미작성", "Q21–30", "없음", "포함"],
 ["Ch5 림프", "05 ✓ (6주 온라인)", "없음", "미작성", "Q41–50", "없음", "포함"],
 ["Ch6 순환기", "05 ✓ 일부(텍스트 추출 범위)", "없음", "미작성", "Q51–60", "없음", "포함·교안 근거 일부 부족"],
 ["Ch7 신경조직", "04 ✓ (2026판)", "없음", "미작성", "Q61–70", "없음", "포함"],
 ["Ch8 혈구", "04 ✓ (2026판)", "없음", "미작성", "Q71–81", "없음", "포함"],
 ["9주 이후", "교안 없음", "없음", "—", "—", "—", "제외(기말)"],
]

HAK = [
 ["24", "원본 시험지 완전본 pdf 299KB·docx 392KB", "텍스트·docx 이미지 열람", str(byk["24"]), "pdf·docx 문단 일치 확인", "본문이 복기된 문항 약 48/81. 본문 없음: 2·3·5·10–12·18·21·26·28·29·31·35·37·39·43·44·46·51·53·54·59·61·64·71–74·76–78·80·81"],
 ["24", "블라인드본 pdf 258KB·docx 390KB(#반출)", "텍스트·docx 열람", "0(완전본에 합침)", "이미지 1건 동일", "완전본 대비 15개 문항 본문 없음(16·17·19·22·25·30·38·40·42·48·50·56·57·58·66). 독립 근거 1건으로만 셈"],
 ["24", "24예2-2중간.zip 725KB(#반출)", "내려받아 해제함", "0(합침)", "치과조직학 pdf가 258KB 블라인드본과 바이트 단위로 동일(해시 일치)", "치과생리학·치과약리학개론·치아형태학1 중간 야마 3개가 함께 들어 있으나 다른 과목이라 미반영. 블라인드본 짝의 근거가 됨"],
 ["23", "치과조직학 중간.pdf 464KB·docx 1.1MB(복기본, 손글씨 이미지 10)", "텍스트·이미지 열람", str(byk["23"]), "이미지 10/10 육안 대조", "번호 4·6·12·13·17·22·29·31·32·37·39·43·46·51·53·54·57·59·62·64·66·76–81 등 본문 없음. "],
 ["23", "치과조직학 중간고사 정리.hwpx 1.3MB(2025.10.23 선배 정리)", "xml·그림 4장 열람", "0", "—", "표제 '선택형에 한하여'(2025 중간은 선택형). 개요와 교과서 그림 위주로 문항·정답 근거는 없음"],
 ["22", "치과조직학 중간 야마 pdf 222KB·425KB·필기본(영준) 2.75MB", "3본 열람 + 답안 정리 + 총정리본(1~3주)", str(byk["22"]), "3본 본문 비교(필기본만 표시 있음)", "번호 약 30개만 복기. 영준 총정리본 21MB는 1~3주차까지만 열람"],
 ["25", "해당 없음(이번 시험)", "—", "0", "—", "응시본이 없어 '내 학번' 강조 대상 없음"],
 ["15·19·20·21", "구강조직학(예1) 중간·기말 시험지", "열거·부분 열람", "0", "—", "다른 과목이라 미반영. 영준 답안 정리에 인용된 연세대(연) 문항은 T2′로만 참고"],
]

BLIND = [
 "24학번: 완전본(299KB, 폴더 '치과조직학') ↔ 블라인드본(258KB, '#반출')을 사용자 확인으로 짝지었습니다. 지문 대조 결과 258KB본의 모든 문단이 299KB본에 있고 299KB본에만 62개 문단(15개 문항 본문)이 더 있습니다. 두 사본의 그림도 동일합니다. 문항 집합은 완전본 기준, 짝은 확정입니다.",
 "블라인드본에만 있는 문항: 0건. 완전본 미확인 문항: 0건. 다만 완전본에도 본문이 없는 번호 33개는 '문항 누락 가능'으로 보고합니다.",
 "22학번: 222KB본과 425KB본·영준 필기본은 같은 시험지의 사본으로 보고 독립 근거 1건으로 셉니다(필기본은 필기만 별도 T2′).",
 "24예2-2중간.zip(#반출)에 258KB본이 그대로 들어 있어 '#반출 = 블라인드본'이라는 사용자 확인이 자료로도 뒷받침됩니다(해시 일치).",
 "블라인드 표식 규칙(파일 용량이 작음·'#반출' 폴더)은 사용자 확인으로 기록했습니다.",
]

FILES = [
 ["2026", "2학기/원본/치과조직학", "1FZPP0Mse5q4hCMoSbAZWbh4IwqyrqUW4", "교안 01·02·03·05 (04 없음)", "2026-10-10"],
 ["2026", "2학기/원본(과목 폴더)", "1jP5jUlTiLXtzMXo6zgFpNW4uTkYfMsuO", "치과생화학2·치과해부학·치과생리학·치과약리학개론·치아형태학1 등(다른 과목)", "2026-10-10"],
 ["2026", "2학기", "1hT-3E5PFYQCcPKyY3DoFPlrhmkdmMVtc", "원본, @야마보관소, 출석부", "2026-10-10"],
 ["2026", "2학기/@야마보관소", "1rE4D2BoOnkxYE9rif4nh6cYr8ILGyBes", "본1-2 과목 야마(총의치학개론·국소의치·기초방사선·치과병리학·치아우식학), 치과조직학 없음", "2026-09-17"],
 ["2026", "야마 작업 폴더/치과조직학(상위 1iSk6zp0E_rlRm5oJELH8CZqQNBSuyV16, 이름 미확인)", "19NmJb__4ywSmX_a1r_mBDkcImWzlqp4T", "24학번 중간 야마 완전본(pdf·docx)", "2026-09-30"],
 ["2026", "#반출", "19YuXGtJpGYxlfNHg6BIX-XnEEf0JWP6f", "24학번 블라인드본(pdf·docx), 24예2-2중간.zip", "2026-10-02"],
 ["2025", "2학기/치과조직학", "1cWMEEJDn-GfH-mJMPIQnk33dPvZqdh-0", "중간고사·기말고사 폴더", "2025-11-26"],
 ["2025", "치과조직학/중간고사", "115ZPUEXBjSLsVeHM8JEBrJiILugcDWGq", "23학번 중간 pdf·docx, 04 신경조직·혈구(2025판), 나올것같은 거, 외워 볼 것, 정리 hwpx, 'CMF 23 야마'(1fQc2nZW…)·'캣츠 23 야마'(1W1-J2Gn…) 하위", "2025-11-26"],
 ["2025", "치과조직학/기말고사", "1ZL6GPWwv5CTcLiYtfc01Mb8raVwim5vf", "22·23학번 기말 야마(중간 범위 밖), 조직 기말 범위", "2025-12-04"],
 ["2025", "2학기/#중간고사 준비", "1bsjkaaofeZUwTU54XUgUpcP8qQ06xrC0", "김은기·최준영 선배 야마 하위 '치과조직학'", "2025-10-19"],
 ["2025", "2학기/@야마 보관소", "1Eygb5LcCNQMOfrOyGbFQHrY9Xiw9SVWq", "zip 4개(0.6~2.0GB): 예2-2 코멘트부터!!!·아름 예2-2·은기 예과 2-2", "2025-10-12"],
 ["공유 보관소", "@야마보관소Global", "1eqvQ1wkBfEKciAEPVy-H9Zb7bZQV8XGA", "zip 3개(2.1~4.8GB: 예2-1·예2-2·본1-2 22홍신의), 구강보건학 UCC", "2026-09-28"],
 ["공유받은 폴더", "단치 야마(본과 1·2학년, 예과 2학년 1학기 폴더 열거)", "1UXNP2DK6LxEFbehmz6F5Yyv3dSPZMxeU", "예2-2 폴더 없음(예과 2학년 1학기·본과만). 치과조직학 해당 없음", "2025-03-25"],
 ["공유받은 폴더", "최준영 예2 야마 > 예2-2 > 치과조직학(이동준) > 중간고사·기말고사", "1--QyiSuwrH1SNgm9bglfTrIjuS3-Zcz4 → 1wPTI_XttA5mxZbYvPZ_OMpl26nAou2Zl", "중간고사 폴더 하위 파일 없음(빈 폴더), 기말고사 폴더는 범위 밖", "2025-03-04"],
 ["공유받은 폴더", "아름 예2 > 아름 예 2-2 > 치과조직학실험 - 이동준 등", "1DQhloNqLzKvRQah1lIv7f2ej45YcQDwj → 1Ai4c_s39tN0BlDMHAsrNxU5HlPQaSiBC", "치과조직학(이론) 폴더는 목록 1쪽에 없고 실험 폴더만 확인. 2024-03 시점 자료", "2024-03-05"],
 ["공유받은 폴더", "치과조직학_이동준 교수님", "1WHU-yJD1hb-dsbI1DqSyrmd5rlf5QhEZ", "열람 시 하위 목록이 비어 있음(공유 권한 추정)", "2026-09-30"],
]

REFS = [
 ["교안 05 순환기: 모세혈관 분류·정맥·동맥 종류 슬라이드", "교안05 림프 순환기.pdf (텍스트 추출이 Nerve innervation에서 끝남)", "자료 없음(그림 위주 추정) — 해당 문항 추론/미확정으로 표기, 원문 PDF 확인 요청"],
 ["교안 04 신경조직·혈구 2026판", "04 신경조직, 혈구_unlocked_부분1~6.pdf(1FZPP0Mse5q4hCMoSbAZWbh4IwqyrqUW4)", "2026-10-16 확보·열람. 04 실습 pdf(10MB 초과)는 미열람, 이미지 슬라이드는 텍스트 없음"],
 ["교안 02 '표 N-N 참조' 류", "교안02에는 외부 참조 문구 없음", "해당 없음"],
 ["24학번 EM 사진(32–35번) 라벨 a~e", "원본 시험지 사진(복기본에 그림 없음)", "자료 없음 — '원본 PDF 참조' 문항 3-02·3-03·3-04"],
]

LIMITS = """[알려진 한계 목록 · v6.2 · 2026-10-10]
A 검증하지 못한 것
- 교안 인용 174건 중 1~6단원 142건은 분할본 PDF 텍스트와 사람이 대조 완료(자동 프로그램 대조 아님), 7·8단원 32건은 04 교안 없음으로 수기 상태입니다. 원래 사정: 파일 자동 대조를 하지 못했습니다(교안 PDF가 10MB 한도를 넘어 내려받을 수 없고 텍스트가 대화 안에만 있음).
- 교안 01·02·03·05의 이미지-only 슬라이드와 05 순환기 뒷부분(텍스트 미추출)은 확인하지 못했습니다.
- 04 교안 2026판 분할본(부분1~6)은 확보했으나 이미지 슬라이드는 텍스트가 없어 확인하지 못했습니다.
- 야마 보관소 zip 7개(0.6~4.8GB)는 도구의 10MB 내려받기 한도 때문에 열람하지 못했습니다(분할 제공 필요). 24예2-2중간.zip과 정리 hwpx는 해제해 확인했습니다.
B 근거·정답 쪽 한계
- 공식 정답지(T1)와 국시 키(T3)가 없습니다. 확정 0건, 교차확인은 T2(복기본에 남은 정답 표기)+T4가 일치한 문항뿐입니다.
- 필기 표시(T2′)는 일부만 표시된 경우가 있어(예: 4-05, 3-08) 정답을 바꾸지 않았습니다.
- 사진 라벨(a~e), 지시문, 선지가 복기되지 않은 문항은 미확정·추론으로 두었습니다.
C 프롬프트와 구현의 불일치(결정 필요, 기본값 병기)
- 예상 문제 분량: 단원당 기출 수와 같은 수로 맞췄습니다(71건).
- 서술형·Blank·국시 탭은 해당 자료가 없어 만들지 않았습니다(기본값: 생략).
- 약어 풀이·교안 밖 설명·웹 예시 이미지·AI 호출은 요청이 없어 구현하지 않았습니다(기본값: 미구현).
- 동일 문항 판정은 사람 판독 기준이며 문자열 유사도 0.85 같은 기계 점수는 계산하지 않았습니다(L-4 열린 결정: 예시로만 둠).
D 아직 하지 않은 것
- 시험 공지 원문 확인, 25학번 시험 문항 수·시간 확정, 2026판 04 교안 반영, 야마 보관소 zip 분할본 열람.
""".replace("{NEWRATE}", str(NEWRATE))

# 이미지
def b64(path, mime="image/jpeg"):
    return "data:%s;base64,%s" % (mime, base64.b64encode(open(path, "rb").read()).decode())
IMG = {
 "plasma": b64(os.path.join(B, "img", "plasma.jpg")),
 "em": b64(os.path.join(B, "img", "em.jpg")),
 "cardiac": b64(os.path.join(B, "img", "cardiac.jpg")),
}

DATA = {"Q": Q, "NEW": NEW, "SUM": SUM, "CH": CH, "CH_SRC": CH_SRC, "REL": REL, "STATS": STATS,
        "HAK": HAK, "CROSS": CROSS, "FILES": FILES, "REFS": REFS, "BLIND": BLIND, "SCOPE": SCOPE,
        "LIMITS": LIMITS, "NEWRATE": NEWRATE, "VER": VER, "BUILT": "2026-10-14",
        "WHYSTAT": WHYSTAT, "MISMATCH": MISMATCH, "FIGS": FIGS, "FIGNO": FIGNO, "TL": TL, "MEM": MEM, "VS": VS, "FN": FN, "FNSTAT": FNSTAT, "KW": KW, "CON": CON, "TLV": TLV}

def js(o):
    return json.dumps(o, ensure_ascii=False).replace("</", "<\\/")

tpl = open(os.path.join(B, "tpl.html"), encoding="utf-8").read()
tpl = tpl.replace("__DATA__", js(DATA)).replace("__IMG__", js(IMG))
tpl = tpl.replace("${st.dist['확정'] || 0 + 0}", "${st.dist['확정'] || 0}")
out = os.path.join(B, "..", "hist_mid_2026.html")
open(out, "w", encoding="utf-8").write(tpl)
print("WHY", WHYSTAT, "FN", FNSTAT)
print("size KB", len(tpl.encode()) // 1024, "uniq", len(Q), "total", total, "dupb", dupb, dict(dist_o), dict(byk), dict(per_ch), "new", len(NEW), NEWRATE)
