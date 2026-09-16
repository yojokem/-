const pptxgen = require("pptxgenjs");

const TITLE_FONT = "Wanted Sans";
const BODY_FONT = "Pretendard";

const C = {
  primary: "028090",
  secondary: "00A896",
  accent: "02C39A",
  ink: "0B2E33",
  paper: "F7FBFB",
  white: "FFFFFF",
  muted: "5B7A7E",
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
const W = 13.33, H = 7.5;

function baseSlide(bg) {
  const s = pres.addSlide();
  s.background = { color: bg || C.paper };
  return s;
}

function titleBar(s, kicker, title, opts = {}) {
  const dark = !!opts.dark;
  s.addText(kicker, {
    x: 0.6, y: 0.45, w: 10, h: 0.4,
    fontFace: BODY_FONT, fontSize: 13, bold: true,
    color: dark ? C.accent : C.secondary, charSpacing: 1, isTextBox: true, margin: 0,
  });
  s.addText(title, {
    x: 0.6, y: 0.82, w: 12.1, h: 1.0,
    fontFace: TITLE_FONT, fontSize: 30, bold: true,
    color: dark ? C.white : C.ink, isTextBox: true, margin: 0,
  });
}

function pageNum(s, n) {
  s.addText(String(n), {
    x: W - 0.9, y: H - 0.55, w: 0.5, h: 0.35,
    fontFace: BODY_FONT, fontSize: 11, color: C.muted, align: "right", isTextBox: true, margin: 0,
  });
}

// ---------- Slide 1: Title ----------
{
  const s = baseSlide(C.ink);
  s.addShape(pres.ShapeType.ellipse, { x: 9.6, y: -2.2, w: 7, h: 7, fill: { color: C.primary, transparency: 55 }, line: { type: "none" } });
  s.addShape(pres.ShapeType.ellipse, { x: -2.5, y: 4.5, w: 5.5, h: 5.5, fill: { color: C.secondary, transparency: 65 }, line: { type: "none" } });

  s.addText("치과약리학실험2 · 논문 발표", {
    x: 0.9, y: 1.7, w: 10, h: 0.5, fontFace: BODY_FONT, fontSize: 15, bold: true,
    color: C.accent, charSpacing: 1, isTextBox: true, margin: 0,
  });
  s.addText("제3대구치 발치 시 리도카인과 아티카인의\n진통 효과 비교 — 스플릿마우스 무작위대조시험", {
    x: 0.9, y: 2.25, w: 11.3, h: 2.0, fontFace: TITLE_FONT, fontSize: 34, bold: true,
    color: C.white, isTextBox: true, margin: 0, lineSpacingMultiple: 1.15,
  });
  s.addText("원제  Efficacy of Analgesia Promoted by Lidocaine and Articaine in Third Molar Extraction Surgery: A Split-Mouth, Randomized, Controlled Trial", {
    x: 0.9, y: 4.15, w: 11.3, h: 0.7, fontFace: BODY_FONT, fontSize: 12, italic: true,
    color: C.secondary, isTextBox: true, margin: 0, lineSpacingMultiple: 1.25,
  });

  s.addShape(pres.ShapeType.rect, { x: 0.9, y: 5.35, w: 11.3, h: 0.02, fill: { color: C.muted, transparency: 60 }, line: { type: "none" } });

  s.addText([
    { text: "저널  ", options: { bold: true, color: C.accent } },
    { text: "Oral and Maxillofacial Surgery (Springer), 2024\n", options: { color: C.white } },
    { text: "발표자  ", options: { bold: true, color: C.accent } },
    { text: "김민성", options: { color: C.white } },
  ], { x: 0.9, y: 5.6, w: 8, h: 1.0, fontFace: BODY_FONT, fontSize: 14, isTextBox: true, margin: 0, lineSpacingMultiple: 1.4 });

  s.addNotes("발표 시작 인사. 논문 출처(Springer, Oral and Maxillofacial Surgery, 2024), 선정 사유(치과약리학 직결, 최근 5년 이내, 국제학술지 Original article)를 한 줄로 언급.");
}

// ---------- Slide 2: Clinical background ----------
{
  const s = baseSlide();
  titleBar(s, "배경", "왜 국소마취제 선택이 중요한가");

  const items = [
    ["하악 제3대구치 발치", "가장 흔한 구강악안면외과 시술 중 하나 — 마취 실패/지연 시 환자 불안·통증 급증"],
    ["리도카인 (Lidocaine)", "가장 널리 쓰이는 표준 국소마취제, 2% 농도 + 에피네프린 병용이 일반적"],
    ["아티카인 (Articaine)", "티오펜 고리 구조로 조직 침투력이 높다고 알려진 4세대 아마이드계 마취제"],
  ];
  let y = 2.1;
  items.forEach(([h, d], i) => {
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y, w: 12.1, h: 1.35, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.secondary, width: 0.75, transparency: 70 }, shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 90 } });
    s.addShape(pres.ShapeType.ellipse, { x: 0.85, y: y + 0.35, w: 0.65, h: 0.65, fill: { color: C.primary }, line: { type: "none" } });
    s.addText(String(i + 1), { x: 0.85, y: y + 0.35, w: 0.65, h: 0.65, fontFace: TITLE_FONT, fontSize: 18, bold: true, color: C.white, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(h, { x: 1.75, y: y + 0.15, w: 4.6, h: 0.5, fontFace: TITLE_FONT, fontSize: 17, bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
    s.addText(d, { x: 6.5, y: y + 0.15, w: 5.9, h: 1.05, fontFace: BODY_FONT, fontSize: 13.5, color: C.muted, isTextBox: true, margin: 0, valign: "middle" });
    y += 1.55;
  });
  pageNum(s, 2);
  s.addNotes("발치 시 통증 조절 실패가 환자 경험과 시술 효율에 미치는 영향을 도입부에서 강조. 리도카인/아티카인의 약리학적 차이(조직 침투력, pKa 등)는 다음 슬라이드로 연결.");
}

// ---------- Slide 3: Pharmacological mechanism ----------
{
  const s = baseSlide();
  titleBar(s, "약리기전", "왜 아티카인이 더 빠르게 발현하는가");

  const rows = [
    ["화학구조", "아티카인은 티오펜(thiophene) 고리, 리도카인은 벤젠 고리 — 티오펜 고리가 지질용해도를 높여 신경막·연조직·피질골 투과를 향상시킴"],
    ["대사 경로", "아티카인은 에스터 곁사슬을 가져 혈장 esterase에 의해 일부 가수분해됨(간 대사 의존도↓) → 전신독성이 낮아 4% 고농도 제형 사용이 가능"],
    ["제형 농도", "이번 연구는 4% 아티카인 vs 2% 리도카인 비교 — 농도가 2배 높은 만큼 단위시간당 확산 가능한 분자 수 자체가 많아짐(순수 약리작용 차이와 분리해서 봐야 할 교란요인)"],
    ["단백결합률", "아티카인 약 95% vs 리도카인 약 65% — 단백결합률이 높을수록 지속시간이 길어지는 경향과 관련(발현시간과는 별개 지표)"],
  ];
  let y = 2.0;
  rows.forEach(([h, d]) => {
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y, w: 12.1, h: 1.2, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.secondary, width: 0.75, transparency: 70 }, shadow: { type: "outer", color: "000000", opacity: 0.1, blur: 5, offset: 2, angle: 90 } });
    s.addShape(pres.ShapeType.roundRect, { x: 0.85, y: y + 0.25, w: 1.9, h: 0.7, rectRadius: 0.3, fill: { color: C.primary, transparency: 88 }, line: { type: "none" } });
    s.addText(h, { x: 0.85, y: y + 0.25, w: 1.9, h: 0.7, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.primary, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(d, { x: 3.0, y: y + 0.1, w: 9.4, h: 1.0, fontFace: BODY_FONT, fontSize: 12.5, color: C.ink, isTextBox: true, margin: 0, valign: "middle", lineSpacingMultiple: 1.2 });
    y += 1.35;
  });
  pageNum(s, 3);
  s.addNotes("Q&A 예상질문(농도 4% vs 2% 차이로 인한 교란)을 여기서 선제적으로 짚어주면 좋음. 아티카인의 티오펜 고리·에스터 곁사슬 구조는 약리학 교과서 표준 설명이므로 실습 교재/강의자료와 대조해 표현을 맞출 것.");
}

// ---------- Slide 4: Evidence gap ----------
{
  const s = baseSlide();
  titleBar(s, "선행연구 비교", "기존 근거의 공백");

  s.addText("아티카인 vs 리도카인 비교 연구, 조건에 따라 결과가 엇갈림", {
    x: 0.6, y: 1.95, w: 12, h: 0.5, fontFace: BODY_FONT, fontSize: 16, bold: true, color: C.ink, isTextBox: true, margin: 0,
  });

  const rows = [
    ["신경차단 · 건강한 치아 · 숙련 시술자 (본 연구, 2024)", "아티카인 발현시간 유의하게 단축", C.accent],
    ["침윤마취만 시행 (Majid & Ahmed 2018 등)", "두 약물 간 유의차 없음", C.muted],
    ["치수염(pH 변화) · 비숙련 시술자 조건 (여러 RCT, refs 18–21)", "아티카인이 더 효과적", C.accent],
  ];
  let y = 2.65;
  rows.forEach(([label, res, color]) => {
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y, w: 12.1, h: 1.05, rectRadius: 0.06, fill: { color: C.white }, line: { type: "none" }, shadow: { type: "outer", color: "000000", opacity: 0.1, blur: 5, offset: 2, angle: 90 } });
    s.addText(label, { x: 0.95, y: y + 0.12, w: 7.3, h: 0.8, fontFace: BODY_FONT, fontSize: 13.5, bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
    s.addShape(pres.ShapeType.roundRect, { x: 8.5, y: y + 0.22, w: 4.0, h: 0.6, rectRadius: 0.3, fill: { color: color, transparency: 85 }, line: { type: "none" } });
    s.addText(res, { x: 8.5, y: y + 0.22, w: 4.0, h: 0.6, fontFace: BODY_FONT, fontSize: 12, bold: true, color: color === C.muted ? C.muted : "047857", align: "center", valign: "middle", isTextBox: true, margin: 0 });
    y += 1.25;
  });

  s.addText("→ 저자들 스스로도 밝히듯, 결과 차이는 마취 기법(신경차단 vs 침윤)·치아 상태(건강 vs 치수염)·시술자 숙련도 차이에서 기인 — 본 연구는 가장 표준적인 조건(신경차단·건강한 치아·숙련자)에서의 근거", {
    x: 0.6, y: 6.5, w: 12.1, h: 0.7, fontFace: BODY_FONT, fontSize: 13, italic: true, color: C.primary, isTextBox: true, margin: 0,
  });
  pageNum(s, 4);
  s.addNotes("원문 Discussion 문단(923쪽) 그대로 재구성한 내용 — refs 10,12(유의차 없음), refs 18-21(아티카인 우세, 각각 치수염/침윤단독/비숙련자 조건) 인용. '완충 제형' 관련 언급은 원문에 전혀 없으므로 슬라이드에서 완전히 제외함.");
}

// ---------- Slide 5: Objective & Hypothesis ----------
{
  const s = baseSlide(C.primary);
  s.addText("목적 및 가설", { x: 0.6, y: 0.45, w: 10, h: 0.4, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.accent, charSpacing: 1, isTextBox: true, margin: 0 });
  s.addText("연구 목적 및 가설", { x: 0.6, y: 0.82, w: 12, h: 0.9, fontFace: TITLE_FONT, fontSize: 30, bold: true, color: C.white, isTextBox: true, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 2.1, w: 12.1, h: 1.9, rectRadius: 0.1, fill: { color: C.white, transparency: 8 }, line: { type: "none" } });
  s.addText("연구 목적", { x: 1.0, y: 2.35, w: 4, h: 0.4, fontFace: BODY_FONT, fontSize: 14, bold: true, color: C.accent, isTextBox: true, margin: 0 });
  s.addText("하악·상악 제3대구치 발치 환자에서 4% 아티카인(+에피네프린)과 2% 리도카인(+에피네프린)의 마취 발현시간, 통증(VAS), 추가 마취 필요성을 비교한다.", {
    x: 1.0, y: 2.8, w: 11.3, h: 1.1, fontFace: BODY_FONT, fontSize: 15, color: C.white, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });

  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 4.3, w: 12.1, h: 1.9, rectRadius: 0.1, fill: { color: C.accent }, line: { type: "none" } });
  s.addText("가설 (H1)", { x: 1.0, y: 4.55, w: 4, h: 0.4, fontFace: BODY_FONT, fontSize: 14, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText("아티카인 측 부위가 리도카인 측 부위보다 마취 발현시간이 유의하게 짧고, 추가 마취 필요율이 유의하게 낮을 것이다.", {
    x: 1.0, y: 5.0, w: 11.3, h: 1.0, fontFace: BODY_FONT, fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  pageNum(s, 5);
  s.addNotes("가설은 저자들이 명시한 연구가설이 아니라 발표자가 선행연구 흐름을 근거로 재구성한 것임을 언급하면 좋음.");
}

// ---------- Slide 6: Methods - design ----------
{
  const s = baseSlide();
  titleBar(s, "연구방법", "연구 설계 및 대상");

  const cards = [
    ["설계", "Split-mouth, 이중눈가림,\n무작위 대조 연구"],
    ["대상자 수", "60명\n(양측 상·하악 제3대구치 발치)"],
    ["개입 (좌우 무작위 배정)", "4% 아티카인 + 에피네프린 1:100,000\nvs\n2% 리도카인 + 에피네프린 1:100,000"],
  ];
  let x = 0.6;
  const cw = 3.95, gap = 0.2;
  cards.forEach(([h, d]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.1, w: cw, h: 3.4, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.secondary, width: 1, transparency: 75 }, shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 90 } });
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.35, y: 2.45, w: cw - 0.7, h: 0.55, rectRadius: 0.28, fill: { color: C.primary, transparency: 88 }, line: { type: "none" } });
    s.addText(h, { x: x + 0.35, y: 2.45, w: cw - 0.7, h: 0.55, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.primary, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(d, { x: x + 0.3, y: 3.2, w: cw - 0.6, h: 2.1, fontFace: BODY_FONT, fontSize: 14.5, color: C.ink, align: "center", valign: "middle", isTextBox: true, margin: 0, lineSpacingMultiple: 1.35 });
    x += cw + gap;
  });

  s.addText("측정변수  마취 발현시간(초시계) · 통증(VAS 0-10) · 마취 지속시간 · 추가 마취 필요 여부/횟수", {
    x: 0.6, y: 5.85, w: 12.1, h: 0.6, fontFace: BODY_FONT, fontSize: 13.5, bold: true, color: C.muted, isTextBox: true, margin: 0,
  });
  pageNum(s, 6);
  s.addNotes("split-mouth 설계의 장점(대상자 본인이 대조군 — 개체 간 변이 통제)을 설명. 이중눈가림이 어떻게 이뤄졌는지(투여자/평가자 분리 등) 원문에서 확인해 보충하면 좋음.");
}

// ---------- Slide 7: Results - onset time ----------
{
  const s = baseSlide();
  titleBar(s, "결과", "마취 발현시간 비교");

  // Stat callouts
  const stats = [
    ["122.1 ± 52.9", "초 · 아티카인", C.accent],
    ["144.5 ± 68.9", "초 · 리도카인", C.muted],
  ];
  let x = 0.9;
  stats.forEach(([num, label, color]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.05, w: 4.9, h: 2.3, rectRadius: 0.12, fill: { color: C.white }, line: { type: "none" }, shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 90 } });
    s.addText(num, { x, y: 2.3, w: 4.9, h: 1.15, fontFace: TITLE_FONT, fontSize: 44, bold: true, color, align: "center", isTextBox: true, margin: 0 });
    s.addText(label, { x, y: 3.55, w: 4.9, h: 0.6, fontFace: BODY_FONT, fontSize: 15, bold: true, color: C.ink, align: "center", isTextBox: true, margin: 0 });
    x += 5.3;
  });
  s.addText("→ 아티카인 측이 평균 22.4초 더 빠르게 발현 (p<0.01, paired t-test)", {
    x: 0.9, y: 4.6, w: 11.4, h: 0.5, fontFace: BODY_FONT, fontSize: 14, italic: true, color: C.primary, isTextBox: true, margin: 0,
  });

  s.addShape(pres.ShapeType.roundRect, { x: 0.9, y: 5.35, w: 11.4, h: 1.3, rectRadius: 0.1, fill: { color: C.paper }, line: { color: C.secondary, width: 1, transparency: 70 } });
  s.addText("추가 소견", { x: 1.2, y: 5.5, w: 3, h: 0.4, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.secondary, isTextBox: true, margin: 0 });
  s.addText("추가 마취(보충 주사) 튜브 수: 아티카인 0.26±0.48개 vs 리도카인 0.50±0.75개 (p<0.01) — 리도카인 측에서 유의하게 더 많이 필요.", {
    x: 1.2, y: 5.85, w: 10.8, h: 0.7, fontFace: BODY_FONT, fontSize: 13, color: C.ink, isTextBox: true, margin: 0,
  });
  pageNum(s, 7);
  s.addNotes("원문 Table 3 기준 수치로 확정. Results 본문에서는 p<0.01, Abstract에서는 p<0.05로 표기되어 있어 발표 시 Table 3 기준(p<0.01)으로 통일해 설명할 것.");
}

// ---------- Slide 8: Results - pain / summary ----------
{
  const s = baseSlide();
  titleBar(s, "결과", "통증(VAS) 및 종합 소견");

  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 2.1, w: 5.85, h: 4.5, rectRadius: 0.1, fill: { color: C.white }, line: { type: "none" }, shadow: { type: "outer", color: "000000", opacity: 0.1, blur: 5, offset: 2, angle: 90 } });
  s.addText("술 중·후 VAS 및 기타 지표 (Table 3)", { x: 0.95, y: 2.35, w: 5.2, h: 0.5, fontFace: TITLE_FONT, fontSize: 16, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText("VAS 통증 점수: 리도카인 3.62±2.46 vs 아티카인 3.75±2.56 — 유의차 없음\n\n수술 시간(분): 리도카인 33.45±21.85 vs 아티카인 28.86±15.13 — 유의차 없음\n\n마취 지속시간(분): 리도카인 260.4±96.02 vs 아티카인 278.2±127.6 — 유의차 없음", {
    x: 0.95, y: 2.95, w: 5.2, h: 3.4, fontFace: BODY_FONT, fontSize: 13, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.4,
  });

  s.addShape(pres.ShapeType.roundRect, { x: 6.85, y: 2.1, w: 5.85, h: 4.5, rectRadius: 0.1, fill: { color: C.ink }, line: { type: "none" } });
  s.addText("저자 결론 요약", { x: 7.2, y: 2.35, w: 5.2, h: 0.5, fontFace: TITLE_FONT, fontSize: 16, bold: true, color: C.accent, isTextBox: true, margin: 0 });
  s.addText([
    { text: "4% 아티카인이 2% 리도카인 대비 ", options: {} },
    { text: "마취 발현이 더 빠르고", options: { bold: true, color: C.accent } },
    { text: ", 추가 마취 필요성이 ", options: {} },
    { text: "더 낮아", options: { bold: true, color: C.accent } },
    { text: " 제3대구치 발치 시 유리한 선택지가 될 수 있음을 시사한다.", options: {} },
  ], { x: 7.2, y: 2.95, w: 5.2, h: 3.4, fontFace: BODY_FONT, fontSize: 14.5, color: C.white, isTextBox: true, margin: 0, lineSpacingMultiple: 1.45 });
  pageNum(s, 8);
  s.addNotes("VAS 관련 정량 수치는 검색 스니펫만으로 확보되지 않아 플레이스홀더로 남김 — 원문 Table/Figure를 확인해 직접 채워 넣을 것.");
}

// ---------- Slide 9: Critical appraisal ----------
{
  const s = baseSlide();
  titleBar(s, "비평적 고찰", "비평적 고찰 (본인 의견 작성)");

  const cols = [
    ["강점", [
      "· Split-mouth 설계로 개체간 변이(연령·통증 역치 등) 통제",
      "· 이중눈가림 + 무작위 배정(randomization table)",
      "· CONSORT 가이드라인 준수, 사전 임상시험 등록(REBEC)",
      "· 표본수 60명 = β power>0.90 사전 계산 근거 명시",
    ]],
    ["한계 / Bias 위험", [
      "· 상·하악을 동시에 발치해 상/하악별 마취 효과 비교 불가",
      "· 전신 진통제·소염제 병용 처방 — 통증 인지에 교란 가능",
      "· 단일 기관(브라질) 연구 — 인종·시술자 숙련도 일반화 제한",
      "· split-mouth 특성상 인접 부위로의 약물 확산 가능성",
    ]],
    ["임상 적용 가능성", [
      "· 국내 임상에도 대체로 적용 가능(동일 기전의 아마이드계)",
      "· 단, 국내 환자 대상 재현 데이터는 부재(연구계획서 과제와 연결)",
      "· 발현시간 단축은 유의하나 절대적 차이(약 22초)는 임상적",
      "  의미가 제한적일 수 있음 — 통계적 유의성 ≠ 임상적 유의성",
    ]],
  ];
  let x = 0.6;
  const cw = 3.95;
  cols.forEach(([h, lines]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.1, w: cw, h: 4.5, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.accent, width: 1.25, dashType: "dash" } });
    s.addText(h, { x: x + 0.3, y: 2.35, w: cw - 0.6, h: 0.5, fontFace: TITLE_FONT, fontSize: 16, bold: true, color: C.primary, isTextBox: true, margin: 0 });
    s.addText(lines.map((t, i) => ({ text: t, options: { breakLine: i < lines.length - 1 } })),
      { x: x + 0.3, y: 2.95, w: cw - 0.6, h: 2.9, fontFace: BODY_FONT, fontSize: 12, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.35 });
    // blank writing area for personal additions
    s.addText("(발표 시 본인 의견 추가)", { x: x + 0.3, y: 5.95, w: cw - 0.6, h: 0.3, fontFace: BODY_FONT, fontSize: 10.5, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    for (let i = 0; i < 2; i++) {
      s.addShape(pres.ShapeType.line, { x: x + 0.3, y: 6.3 + i * 0.45, w: cw - 0.6, h: 0, line: { color: C.muted, width: 0.75, transparency: 40, dashType: "dash" } });
    }
    x += cw + 0.2;
  });
  pageNum(s, 9);
  s.addNotes("좌측 두 칸은 원문 Discussion·Limitations 절 기준 초안. 우측 임상 적용 가능성 칸의 '통계적 유의성 vs 임상적 유의성' 포인트는 Q&A에서 자주 나오는 포인트이니 본인 의견으로 발전시킬 것. 빈 줄에는 실습·발표 리허설 중 떠오른 개인 의견을 추가.");
}

// ---------- Slide 10: Take-home ----------
{
  const s = baseSlide(C.primary);
  s.addShape(pres.ShapeType.ellipse, { x: -3, y: -3, w: 8, h: 8, fill: { color: C.secondary, transparency: 60 }, line: { type: "none" } });
  s.addText("핵심 결론", { x: 0.9, y: 1.6, w: 10, h: 0.4, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.accent, charSpacing: 1, isTextBox: true, margin: 0 });
  s.addText("발치 시 빠른 마취 발현이 필요한 상황이라면,\n아티카인이 리도카인보다 유리한 선택지일 수 있다.", {
    x: 0.9, y: 2.15, w: 11.3, h: 2.0, fontFace: TITLE_FONT, fontSize: 27, bold: true, color: C.white, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  s.addText("단, 근거는 특정 인구집단·단일 연구 기준 — 한국인 대상 재현/후속 연구로 확인이 필요함 (→ 본 과제의 연구계획서 참고)", {
    x: 0.9, y: 4.3, w: 11.3, h: 0.9, fontFace: BODY_FONT, fontSize: 14, italic: true, color: C.paper, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  pageNum(s, 10);
  s.addNotes("연구계획서 과제(완충 아티카인 vs 리도카인, 한국인 대상)와 자연스럽게 연결하며 마무리. Q&A로 전환.");
}

// ---------- Slide 11: Q&A ----------
{
  const s = baseSlide(C.ink);
  s.addText("질의응답", { x: 0.9, y: 2.9, w: 11, h: 1.3, fontFace: TITLE_FONT, fontSize: 54, bold: true, color: C.white, isTextBox: true, margin: 0 });
  s.addText("감사합니다", { x: 0.9, y: 4.1, w: 8, h: 0.6, fontFace: BODY_FONT, fontSize: 18, color: C.accent, isTextBox: true, margin: 0 });
  s.addNotes([
    "예상 질문 1: split-mouth 설계에서 두 마취제가 서로 확산되어 결과를 교란할 가능성은 없는가?",
    "예상 질문 2: 표본수 60명이 통계적으로 충분한가 (검정력 계산 근거)?",
    "예상 질문 3: 에피네프린 농도가 동일(1:100,000)한데 순수 약물 자체의 효과 차이로 볼 수 있는가, 농도(4% vs 2%) 차이의 영향은 아닌가?",
    "예상 질문 4: 이 결과를 한국인 임상 현장에 그대로 적용할 수 있는가(연구계획서 주제와 연결)?",
  ].join("\n"));
}

pres.writeFile({ fileName: "치과약리학실험2_논문발표.pptx" }).then(() => {
  console.log("done");
});
