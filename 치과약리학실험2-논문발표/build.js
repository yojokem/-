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
  s.addText("교정치료 중 진통제 선택이 치아이동 속도에 미치는 영향\n— 이부프로펜 vs 아세트아미노펜 —", {
    x: 0.9, y: 2.25, w: 11.3, h: 2.0, fontFace: TITLE_FONT, fontSize: 32, bold: true,
    color: C.white, isTextBox: true, margin: 0, lineSpacingMultiple: 1.15,
  });
  s.addText("원제  Evaluation of Systemic Nonsteroidal Anti-inflammatory Drugs on Orthodontic Tooth Movement Rate: A Clinical and Biomarker-Based Study", {
    x: 0.9, y: 4.15, w: 11.3, h: 0.7, fontFace: BODY_FONT, fontSize: 12, italic: true,
    color: C.secondary, isTextBox: true, margin: 0, lineSpacingMultiple: 1.25,
  });

  s.addShape(pres.ShapeType.rect, { x: 0.9, y: 5.35, w: 11.3, h: 0.02, fill: { color: C.muted, transparency: 60 }, line: { type: "none" } });

  s.addText([
    { text: "저널  ", options: { bold: true, color: C.accent } },
    { text: "Journal of Pharmacy and Bioallied Sciences, 2026 (Vol.18, No.1)\n", options: { color: C.white } },
    { text: "발표자  ", options: { bold: true, color: C.accent } },
    { text: "김민성", options: { color: C.white } },
  ], { x: 0.9, y: 5.6, w: 8, h: 1.0, fontFace: BODY_FONT, fontSize: 14, isTextBox: true, margin: 0, lineSpacingMultiple: 1.4 });

  s.addNotes("발표 시작 인사. 논문 출처(J Pharm Bioallied Sci, 2026 최신호), 선정 사유(치과약리학 20장 NSAID/PGE2 내용과 직결, 5년 이내, 국제학술지 Original article)를 한 줄로 언급.");
}

// ---------- Slide 2: Background ----------
{
  const s = baseSlide();
  titleBar(s, "배경", "교정치료 중 진통제 선택, 왜 중요한가");

  const items = [
    ["치아이동(OTM)의 생물학적 기반", "교정력 → 국소 저산소증·체액이동 → 「무균성 염증」 캐스케이드 → 압박측 골흡수·긴장측 골형성"],
    ["진통제 처방의 현실", "환자의 최대 95%가 장치 활성화 후 통증 호소 → NSAID(이부프로펜 등)가 1차 진통제로 흔히 처방됨"],
    ["이론적 우려", "NSAID의 COX 억제 기전이 진통엔 유효하나, 골개조에 필수적인 PGE2 생성까지 차단 → 치아이동 속도 자체를 늦출 가능성"],
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
  s.addNotes("치과약리학1 20장(통증·염증·관절질환 치료제)에서 배운 COX/PGE2/NSAID 내용이 그대로 이어짐을 언급하면 좋음.");
}

// ---------- Slide 3: Pharmacological mechanism ----------
{
  const s = baseSlide();
  titleBar(s, "약리기전", "PGE2 → RANKL 경로 — 왜 NSAID가 치아이동을 늦추는가");

  const rows = [
    ["1. 기계적 자극", "교정력 → PDL·치조골 국소 저산소증/체액이동 → phospholipase A2 활성화 → 아라키돈산 유리"],
    ["2. COX 경로", "COX-1/2가 아라키돈산을 PGE2로 전환 — 이 단계가 이부프로펜(비선택적 COX 억제제)의 표적"],
    ["3. PGE2 → RANKL", "PGE2가 조골세포·PDL세포에서 RANKL 발현을 유도 → RANKL이 파골세포 전구세포의 RANK 수용체에 결합"],
    ["4. 파골세포 활성 → 골흡수", "RANKL-RANK 결합으로 파골세포 분화·활성 촉진 → 압박측 치조골 흡수 → 치아이동 실현"],
  ];
  let y = 2.0;
  rows.forEach(([h, d]) => {
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y, w: 12.1, h: 1.15, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.secondary, width: 0.75, transparency: 70 }, shadow: { type: "outer", color: "000000", opacity: 0.1, blur: 5, offset: 2, angle: 90 } });
    s.addShape(pres.ShapeType.roundRect, { x: 0.85, y: y + 0.25, w: 2.3, h: 0.65, rectRadius: 0.3, fill: { color: C.primary, transparency: 88 }, line: { type: "none" } });
    s.addText(h, { x: 0.85, y: y + 0.25, w: 2.3, h: 0.65, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.primary, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(d, { x: 3.4, y: y + 0.1, w: 9.0, h: 0.95, fontFace: BODY_FONT, fontSize: 12.5, color: C.ink, isTextBox: true, margin: 0, valign: "middle", lineSpacingMultiple: 1.2 });
    y += 1.3;
  });
  s.addText("아세트아미노펜은 주로 중추(뇌)에서 작용해 말초 PGE2·이 경로에는 영향이 적음 — 그래서 대조약물로 선택됨", {
    x: 0.6, y: 6.65, w: 12.1, h: 0.55, fontFace: BODY_FONT, fontSize: 12.5, italic: true, color: C.primary, isTextBox: true, margin: 0,
  });
  pageNum(s, 3);
  s.addNotes("이 슬라이드가 발표의 핵심 뼈대. Q&A에서 '왜 아세트아미노펜을 대조군으로 썼나'라는 질문이 나오면 이 슬라이드로 바로 답변 가능.");
}

// ---------- Slide 4: Prior evidence ----------
{
  const s = baseSlide();
  titleBar(s, "선행연구 비교", "이 연구가 채우는 공백");

  const rows = [
    ["Shetty et al. 2013, Prog Orthod", "이부프로펜·아세트아미노펜의 GCF PGE2 비교 (human study) — 이 연구의 직접적 선행연구", C.accent],
    ["Bartzela et al. 2009, AJODO (systematic review)", "여러 약물이 치아이동 속도에 미치는 영향을 문헌적으로 정리 — NSAID의 억제 효과 시사", C.muted],
    ["Kelderman & Ren 2022, Eur J Orthod (review)", "진통제와 치아이동에 대한 최신 systematic review — 근거의 일관성은 아직 논쟁적", C.muted],
  ];
  let y = 2.4;
  rows.forEach(([label, res, color]) => {
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y, w: 12.1, h: 1.15, rectRadius: 0.06, fill: { color: C.white }, line: { type: "none" }, shadow: { type: "outer", color: "000000", opacity: 0.1, blur: 5, offset: 2, angle: 90 } });
    s.addText(label, { x: 0.95, y: y + 0.12, w: 5.6, h: 0.9, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
    s.addText(res, { x: 6.7, y: y + 0.12, w: 5.7, h: 0.9, fontFace: BODY_FONT, fontSize: 12, color: color === C.muted ? C.muted : "047857", isTextBox: true, margin: 0, valign: "middle" });
    y += 1.35;
  });

  s.addText("→ 본 연구는 Shetty(2013)의 단일시점 PGE2 비교를 「RANKL 지표 추가 + 3개월 종단추적 + 실제 치아이동량 측정」으로 확장 — 기전(PGE2/RANKL)과 임상결과(이동량)를 동시에 검증한 최초 사례", {
    x: 0.6, y: 6.55, w: 12.1, h: 0.7, fontFace: BODY_FONT, fontSize: 13, italic: true, color: C.primary, isTextBox: true, margin: 0,
  });
  pageNum(s, 4);
  s.addNotes("원문 참고문헌 4,5,6,8번 기반. Shetty 2013이 사실상 직계 선행연구이고, 이번 논문은 여기에 RANKL과 3개월 종단설계를 더한 확장연구로 설명.");
}

// ---------- Slide 5: Objective & Hypothesis ----------
{
  const s = baseSlide(C.primary);
  s.addText("목적 및 가설", { x: 0.6, y: 0.45, w: 10, h: 0.4, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.accent, charSpacing: 1, isTextBox: true, margin: 0 });
  s.addText("연구 목적 및 가설", { x: 0.6, y: 0.82, w: 12, h: 0.9, fontFace: TITLE_FONT, fontSize: 30, bold: true, color: C.white, isTextBox: true, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 2.1, w: 12.1, h: 1.9, rectRadius: 0.1, fill: { color: C.white, transparency: 8 }, line: { type: "none" } });
  s.addText("연구 목적", { x: 1.0, y: 2.35, w: 4, h: 0.4, fontFace: BODY_FONT, fontSize: 14, bold: true, color: C.accent, isTextBox: true, margin: 0 });
  s.addText("상악 제1소구치 발치 및 견치 원심이동이 필요한 교정환자에서, 이부프로펜(400mg)과 아세트아미노펜(500mg)이 치아이동 속도 및 치은열구액(GCF) PGE2·RANKL 농도에 미치는 영향을 비교한다.", {
    x: 1.0, y: 2.8, w: 11.3, h: 1.1, fontFace: BODY_FONT, fontSize: 15, color: C.white, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });

  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 4.3, w: 12.1, h: 1.9, rectRadius: 0.1, fill: { color: C.accent }, line: { type: "none" } });
  s.addText("가설 (H1)", { x: 1.0, y: 4.55, w: 4, h: 0.4, fontFace: BODY_FONT, fontSize: 14, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText("이부프로펜 투여군은 아세트아미노펜 투여군보다 치아이동 속도가 유의하게 느리고, GCF PGE2·RANKL 농도가 유의하게 낮을 것이다.", {
    x: 1.0, y: 5.0, w: 11.3, h: 1.0, fontFace: BODY_FONT, fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  pageNum(s, 5);
  s.addNotes("가설은 저자들이 명시한 것은 아니고, Background에서 제시한 PGE2-RANKL 기전으로부터 발표자가 재구성한 것임을 언급.");
}

// ---------- Slide 6: Methods ----------
{
  const s = baseSlide();
  titleBar(s, "연구방법", "연구 설계 및 대상");

  const cards = [
    ["설계", "전향적, 이중눈가림,\n병렬군 RCT"],
    ["대상자 수", "30명 (남14·여16, 평균 20.5±2.4세)\n군당 15명"],
    ["개입 (무작위 배정)", "A군: 이부프로펜 400mg\nvs\nB군: 아세트아미노펜 500mg\n(8시간마다 1캡슐×3일, 매달×3개월)"],
  ];
  let x = 0.6;
  const cw = 3.95, gap = 0.2;
  cards.forEach(([h, d]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.1, w: cw, h: 3.4, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.secondary, width: 1, transparency: 75 }, shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 90 } });
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.35, y: 2.45, w: cw - 0.7, h: 0.55, rectRadius: 0.28, fill: { color: C.primary, transparency: 88 }, line: { type: "none" } });
    s.addText(h, { x: x + 0.35, y: 2.45, w: cw - 0.7, h: 0.55, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.primary, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(d, { x: x + 0.3, y: 3.2, w: cw - 0.6, h: 2.1, fontFace: BODY_FONT, fontSize: 14, color: C.ink, align: "center", valign: "middle", isTextBox: true, margin: 0, lineSpacingMultiple: 1.3 });
    x += cw + gap;
  });

  s.addText("측정변수  임상: 캘리퍼로 측정한 견치-제2소구치 브라켓 간 거리 변화(누적 이동량) · 생화학: GCF PGE2·RANKL(ELISA)", {
    x: 0.6, y: 5.85, w: 12.1, h: 0.6, fontFace: BODY_FONT, fontSize: 13.5, bold: true, color: C.muted, isTextBox: true, margin: 0,
  });
  pageNum(s, 6);
  s.addNotes("선정기준(Class II, 상악 제1소구치 발치+견치원심이동, 치주건강)과 제외기준(항염제·비스포스포네이트 복용, 흡연, 임신, 기존교정경험)은 원문에 있으므로 질문 오면 답변 가능.");
}

// ---------- Slide 7: Results - tooth movement ----------
{
  const s = baseSlide();
  titleBar(s, "결과 ①", "치아이동량 비교 (3개월 누적)");

  const stats = [
    ["2.85 ± 0.32", "mm · 이부프로펜", C.muted],
    ["3.45 ± 0.41", "mm · 아세트아미노펜", C.accent],
  ];
  let x = 0.9;
  stats.forEach(([num, label, color]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.95, w: 4.9, h: 2.1, rectRadius: 0.12, fill: { color: C.white }, line: { type: "none" }, shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 90 } });
    s.addText(num, { x, y: 2.15, w: 4.9, h: 1.05, fontFace: TITLE_FONT, fontSize: 40, bold: true, color, align: "center", isTextBox: true, margin: 0 });
    s.addText(label, { x, y: 3.3, w: 4.9, h: 0.6, fontFace: BODY_FONT, fontSize: 15, bold: true, color: C.ink, align: "center", isTextBox: true, margin: 0 });
    x += 5.3;
  });
  s.addText("→ 이부프로펜군이 3개월 총 이동량 17.4% 적음 (p<0.001) — 1개월차엔 유의차 없었으나(p=0.052), 2개월차부터 유의(p=0.001)해져 누적효과로 나타남", {
    x: 0.9, y: 4.25, w: 11.4, h: 0.5, fontFace: BODY_FONT, fontSize: 14, italic: true, color: C.primary, isTextBox: true, margin: 0,
  });

  const table = [
    [{ text: "시점", options: { bold: true, color: C.white, fill: { color: C.primary } } }, { text: "이부프로펜", options: { bold: true, color: C.white, fill: { color: C.primary } } }, { text: "아세트아미노펜", options: { bold: true, color: C.white, fill: { color: C.primary } } }, { text: "p", options: { bold: true, color: C.white, fill: { color: C.primary } } }],
    ["1개월", "0.92 ± 0.15 mm", "1.05 ± 0.18 mm", "0.052"],
    ["2개월", "1.84 ± 0.22 mm", "2.21 ± 0.29 mm", "0.001*"],
    ["3개월(총)", "2.85 ± 0.32 mm", "3.45 ± 0.41 mm", "0.000*"],
  ];
  s.addTable(table, {
    x: 0.9, y: 4.95, w: 11.4, h: 1.8, fontFace: BODY_FONT, fontSize: 13, color: C.ink,
    border: { type: "solid", color: "D8E8E6", pt: 1 }, autoPage: false, valign: "middle", align: "center",
  });
  pageNum(s, 7);
  s.addNotes("원문 Table 1(기저동질성: 연령 p=0.36, 성비 p=1.00)·Table 2 기준. 1개월차 비유의는 '누적효과'라는 포인트로 짚으면 좋음.");
}

// ---------- Slide 8: Results - biomarkers ----------
{
  const s = baseSlide();
  titleBar(s, "결과 ②", "GCF 바이오마커 (PGE2·RANKL)");

  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 2.1, w: 5.85, h: 4.4, rectRadius: 0.1, fill: { color: C.white }, line: { type: "none" }, shadow: { type: "outer", color: "000000", opacity: 0.1, blur: 5, offset: 2, angle: 90 } });
  s.addText("GCF 농도 (T1, 염증 최고점)", { x: 0.95, y: 2.35, w: 5.2, h: 0.5, fontFace: TITLE_FONT, fontSize: 16, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText([
    { text: "PGE2\n", options: { bold: true, color: C.primary, fontSize: 14 } },
    { text: "이부프로펜 145.2±22.1 pg/mL\n아세트아미노펜 210.5±35.4 pg/mL\np<0.001\n\n", options: { fontSize: 13 } },
    { text: "RANKL\n", options: { bold: true, color: C.primary, fontSize: 14 } },
    { text: "이부프로펜 58.4±12.3 pg/mL\n아세트아미노펜 89.7±15.6 pg/mL\np<0.001", options: { fontSize: 13 } },
  ], { x: 0.95, y: 2.95, w: 5.2, h: 3.3, fontFace: BODY_FONT, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.35 });

  s.addShape(pres.ShapeType.roundRect, { x: 6.85, y: 2.1, w: 5.85, h: 4.4, rectRadius: 0.1, fill: { color: C.ink }, line: { type: "none" } });
  s.addText("기전적 해석", { x: 7.2, y: 2.35, w: 5.2, h: 0.5, fontFace: TITLE_FONT, fontSize: 16, bold: true, color: C.accent, isTextBox: true, margin: 0 });
  s.addText([
    { text: "이부프로펜이 ", options: {} },
    { text: "PGE2·RANKL 모두 유의하게 낮춤", options: { bold: true, color: C.accent } },
    { text: " → 파골세포 활성 신호(RANKL/OPG 비율)가 골흡수보다 ", options: {} },
    { text: "골밀도 유지 쪽으로 이동", options: { bold: true, color: C.accent } },
    { text: " → 결과①의 이동량 감소와 기전적으로 정합.", options: {} },
  ], { x: 7.2, y: 2.95, w: 5.2, h: 3.3, fontFace: BODY_FONT, fontSize: 14, color: C.white, isTextBox: true, margin: 0, lineSpacingMultiple: 1.45 });
  pageNum(s, 8);
  s.addNotes("결과①(임상)과 결과②(생화학)가 같은 방향으로 정합된다는 점이 이 논문의 설득력 — Discussion에서 저자들이 강조하는 핵심.");
}

// ---------- Slide 9: Critical appraisal ----------
{
  const s = baseSlide();
  titleBar(s, "비평적 고찰", "비평적 고찰 (본인 의견 작성)");

  const cols = [
    ["강점", [
      "· 임상지표(이동량)+생화학지표(PGE2·RANKL) 이중 검증으로 기전-결과 인과 뒷받침",
      "· 무작위배정+이중눈가림, 기저 동질성 확보(연령 p=0.36, 성비 p=1.00)",
      "· 선행연구(Shetty 2013)를 RANKL 지표+3개월 종단설계로 확장",
      "· 재정지원·이해상충 없음(Nil) — 제약회사 개입 우려 낮음",
    ]],
    ["한계 / Bias 위험", [
      "· 군당 15명으로 표본이 작아 검정력 우려",
      "· 진통제는 월 3일만 복용 통제 — 나머지 기간 자가복용(비처방 진통제) 여부 통제 불명",
      "· 단일기관·단일 인종군 대상 — 일반화 제한",
      "· GCF는 T1(1개월차) 1회만 측정 — 2·3개월차 생화학 변화는 추적 안 됨",
    ]],
    ["임상 적용 가능성", [
      "· 국내 교정 임상에도 적용 가능(동일 기전, 약물 둘 다 국내 상용)",
      "· 다만 국내 환자 대상 재현 데이터는 부재",
      "· 17.4%라는 이동량 차이가 실제 총 치료기간에 임상적으로",
      "  체감될 정도인지는 별도 검증 필요 — 통계적 유의성 ≠ 임상적 유의성",
    ]],
  ];
  let x = 0.6;
  const cw = 3.95;
  cols.forEach(([h, lines]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.1, w: cw, h: 4.5, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.accent, width: 1.25, dashType: "dash" } });
    s.addText(h, { x: x + 0.3, y: 2.35, w: cw - 0.6, h: 0.5, fontFace: TITLE_FONT, fontSize: 16, bold: true, color: C.primary, isTextBox: true, margin: 0 });
    s.addText(lines.map((t, i) => ({ text: t, options: { breakLine: i < lines.length - 1 } })),
      { x: x + 0.3, y: 2.95, w: cw - 0.6, h: 2.9, fontFace: BODY_FONT, fontSize: 11.5, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.35 });
    s.addText("(발표 시 본인 의견 추가)", { x: x + 0.3, y: 5.95, w: cw - 0.6, h: 0.3, fontFace: BODY_FONT, fontSize: 10.5, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    for (let i = 0; i < 2; i++) {
      s.addShape(pres.ShapeType.line, { x: x + 0.3, y: 6.3 + i * 0.45, w: cw - 0.6, h: 0, line: { color: C.muted, width: 0.75, transparency: 40, dashType: "dash" } });
    }
    x += cw + 0.2;
  });
  pageNum(s, 9);
  s.addNotes("우측 칸의 '통계적 유의성 vs 임상적 유의성' 포인트는 Q&A에서 자주 나오는 질문이니 본인 의견으로 발전시킬 것.");
}

// ---------- Slide 10: Take-home ----------
{
  const s = baseSlide(C.primary);
  s.addShape(pres.ShapeType.ellipse, { x: -3, y: -3, w: 8, h: 8, fill: { color: C.secondary, transparency: 60 }, line: { type: "none" } });
  s.addText("핵심 결론", { x: 0.9, y: 1.6, w: 10, h: 0.4, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.accent, charSpacing: 1, isTextBox: true, margin: 0 });
  s.addText("교정치료 중 진통제 선택은 단순한 통증관리가 아니라,\n치아이동 속도에 실제로 영향을 주는 생역학적 결정이다.", {
    x: 0.9, y: 2.15, w: 11.3, h: 2.0, fontFace: TITLE_FONT, fontSize: 26, bold: true, color: C.white, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  s.addText("이부프로펜은 진통 효과는 우수하나 PGE2-RANKL 경로 억제로 치아이동을 늦출 수 있음 — 저자들은 교정환자에게 아세트아미노펜을 권장", {
    x: 0.9, y: 4.3, w: 11.3, h: 0.9, fontFace: BODY_FONT, fontSize: 14, italic: true, color: C.paper, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  pageNum(s, 10);
  s.addNotes("치과약리학1 20장(NSAID/PGE2) 내용과의 연결을 다시 한번 언급하며 마무리. Q&A로 전환.");
}

// ---------- Slide 11: Q&A ----------
{
  const s = baseSlide(C.ink);
  s.addText("질의응답", { x: 0.9, y: 2.9, w: 11, h: 1.3, fontFace: TITLE_FONT, fontSize: 54, bold: true, color: C.white, isTextBox: true, margin: 0 });
  s.addText("감사합니다", { x: 0.9, y: 4.1, w: 8, h: 0.6, fontFace: BODY_FONT, fontSize: 18, color: C.accent, isTextBox: true, margin: 0 });
  s.addNotes([
    "예상 질문 1: 표본수가 군당 15명인데 통계적으로 충분한가?",
    "예상 질문 2: 진통제를 월 3일만 복용하게 했는데, 그 외 기간 환자가 임의로 다른 진통제를 먹었을 가능성은 어떻게 통제했는가?",
    "예상 질문 3: GCF 측정을 T1(1개월차) 한 번만 했는데, 2·3개월차의 생화학적 변화도 같은 패턴일 거라고 볼 수 있는가?",
    "예상 질문 4: 17.4% 이동량 차이가 실제 총 교정 치료기간을 얼마나 늘리는지, 임상적으로 의미 있는 수준인가?",
    "예상 질문 5: 아세트아미노펜의 진통 효과가 이부프로펜보다 약하다면, 환자 순응도(통증 참기)에는 문제가 없었는가?",
  ].join("\n"));
}

pres.writeFile({ fileName: "치과약리학실험2_논문발표.pptx" }).then(() => {
  console.log("done");
});
