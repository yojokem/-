const pptxgen = require("pptxgenjs");

const TITLE_FONT = "맑은 고딕";
const SERIF_FONT = "Cambria";
const BODY_FONT = "맑은 고딕";
const PHOTO_DIR = __dirname + "/dental_photos/insert";

// palette — deep teal + warm coral + warm paper (Figma 시안 기준)
const C = {
  primary: "114B3F",     // deep teal
  primaryDark: "0B332A",
  accent: "F2704A",      // warm coral
  ink: "1C2321",
  paper: "FBF8F3",       // warm paper background
  card: "FFFFFF",
  muted: "6B7568",
  line: "E4DED2",
  headerFill: "114B3F",
  headerText: "FFFFFF",
  rowAlt: "F3EFE4",
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
const W = 13.33, H = 7.5;
const MX = 0.7; // outer margin
const CW = W - MX * 2; // usable content width

function baseSlide() {
  const s = pres.addSlide();
  s.background = { color: C.paper };
  return s;
}

function titleBar(s, kicker, title, sub) {
  s.addText(kicker, {
    x: MX, y: 0.4, w: CW, h: 0.32,
    fontFace: BODY_FONT, fontSize: 12, bold: true, charSpacing: 1,
    color: C.accent, isTextBox: true, margin: 0,
  });
  s.addText(title, {
    x: MX, y: 0.7, w: CW, h: 0.6,
    fontFace: TITLE_FONT, fontSize: 24, bold: true,
    color: C.primary, isTextBox: true, margin: 0,
  });
  s.addShape(pres.ShapeType.rect, { x: MX, y: 1.32, w: 0.55, h: 0.05, fill: { color: C.accent }, line: { type: "none" } });
  if (sub) {
    s.addText(sub, {
      x: MX, y: 1.42, w: CW, h: 0.35,
      fontFace: BODY_FONT, fontSize: 12.5, italic: true, color: C.muted, isTextBox: true, margin: 0,
    });
  }
}

function pageNum(s, n) {
  s.addText(String(n), {
    x: W - 0.9, y: H - 0.5, w: 0.5, h: 0.35,
    fontFace: SERIF_FONT, fontSize: 11, color: C.muted, align: "right", isTextBox: true, margin: 0,
  });
}

function sectionLabel(s, text, x, y, w) {
  s.addText(text, { x, y, w, h: 0.38, fontFace: TITLE_FONT, fontSize: 14.5, bold: true, color: C.primary, isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.rect, { x, y: y + 0.34, w: 0.35, h: 0.035, fill: { color: C.accent }, line: { type: "none" } });
}

function bulletBlock(s, items, opts) {
  s.addText(
    items.map((t, i) => ({ text: "•  " + t, options: { breakLine: i < items.length - 1 } })),
    Object.assign({ fontFace: BODY_FONT, fontSize: 13, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.4, valign: "top" }, opts)
  );
}

// icon-in-rounded-square + text row list
function iconRows(s, x, y, w, rowH, items, badgeColor) {
  items.forEach((it, i) => {
    const ry = y + i * rowH;
    s.addShape(pres.ShapeType.roundRect, { x, y: ry, w: 0.5, h: 0.5, rectRadius: 0.1, fill: { color: badgeColor || C.primary }, line: { type: "none" } });
    s.addText(it.icon, { x, y: ry, w: 0.5, h: 0.5, fontFace: "Arial", fontSize: 15, color: C.card, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(it.text, { x: x + 0.68, y: ry, w: w - 0.68, h: rowH - 0.06, fontFace: BODY_FONT, fontSize: 13, color: C.ink, valign: "middle", isTextBox: true, margin: 0, lineSpacingMultiple: 1.2 });
  });
}

// classification chip row — white card + alternating teal/coral numbered badge
function chipRow(s, x, y, w, h, gap, items) {
  const cw = (w - gap * (items.length - 1)) / items.length;
  items.forEach((it, i) => {
    const cx = x + i * (cw + gap);
    const badge = i % 2 === 0 ? C.primary : C.accent;
    s.addShape(pres.ShapeType.roundRect, {
      x: cx, y, w: cw, h, rectRadius: 0.1, fill: { color: C.card }, line: { type: "none" },
      shadow: { type: "outer", color: "1C2321", opacity: 0.12, blur: 6, offset: 2, angle: 90 },
    });
    s.addShape(pres.ShapeType.roundRect, { x: cx + 0.15, y: y + 0.14, w: 0.38, h: 0.38, rectRadius: 0.08, fill: { color: badge }, line: { type: "none" } });
    s.addText(String(i + 1), { x: cx + 0.15, y: y + 0.14, w: 0.38, h: 0.38, fontFace: TITLE_FONT, fontSize: 13, bold: true, color: C.card, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(it.label, { x: cx + 0.15, y: y + 0.58, w: cw - 0.3, h: 0.32, fontFace: TITLE_FONT, fontSize: 12.5, bold: true, color: C.primary, isTextBox: true, margin: 0 });
    s.addText(it.sub, { x: cx + 0.15, y: y + 0.94, w: cw - 0.3, h: h - 1.04, fontFace: BODY_FONT, fontSize: 11.5, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.2 });
  });
}

function dataTable(s, rows, opts) {
  const formatted = rows.map((row, ri) =>
    row.map((cell) =>
      ri === 0
        ? { text: cell, options: { bold: true, color: C.headerText, fill: { color: C.headerFill } } }
        : { text: cell, options: { color: C.ink } }
    )
  );
  s.addTable(formatted, Object.assign({
    fontFace: BODY_FONT, fontSize: 12, border: { type: "solid", color: C.line, pt: 0.5 },
    autoPage: false, valign: "middle", align: "center", margin: [0.06, 0.09, 0.06, 0.09],
  }, opts));
}

// photo box sized to the source's true 4:3 ratio (all 7 photos are 900x675) — pass w OR h, the other is derived
function photoCard(s, file, x, y, dims, cap) {
  const RATIO = 4 / 3;
  let { w, h } = dims;
  if (w && !h) h = w / RATIO;
  if (h && !w) w = h * RATIO;
  s.addImage({ path: file, x, y, w, h, sizing: { type: "cover", w, h } });
  s.addShape(pres.ShapeType.rect, { x, y, w, h, fill: { type: "none" }, line: { color: C.line, width: 1 } });
  const capH = 0.46;
  if (cap) {
    s.addText(cap, { x, y: y + h + 0.03, w, h: capH, fontFace: BODY_FONT, fontSize: 11, italic: true, color: C.muted, isTextBox: true, margin: 0, align: "center", valign: "top", lineSpacingMultiple: 1.1 });
  }
  return { w, h, total: h + (cap ? capH + 0.03 : 0) };
}

function card(s, x, y, w, h) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.1, fill: { color: C.card }, line: { type: "none" },
    shadow: { type: "outer", color: "1C2321", opacity: 0.1, blur: 6, offset: 2, angle: 90 },
  });
}

// ---------- Slide 1: Title ----------
{
  const s = baseSlide();
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.primary }, line: { type: "none" } });
  s.addShape(pres.ShapeType.ellipse, { x: W - 4.2, y: -2.0, w: 6.5, h: 6.5, fill: { color: C.primaryDark }, line: { type: "none" } });

  s.addText("수복치과재료학실험 · A2조", {
    x: 0.9, y: 0.85, w: 8, h: 0.4, fontFace: BODY_FONT, fontSize: 14, bold: true, charSpacing: 1,
    color: C.accent, isTextBox: true, margin: 0,
  });
  s.addText([
    { text: "Dental Cements", options: { bold: true } },
  ], {
    x: 0.9, y: 1.35, w: 11, h: 0.95, fontFace: TITLE_FONT, fontSize: 46, bold: true,
    color: C.card, isTextBox: true, margin: 0,
  });
  s.addText("Setting Time & Film Thickness", {
    x: 0.9, y: 2.25, w: 11, h: 0.5, fontFace: SERIF_FONT, fontSize: 20, italic: true,
    color: "CFE0D8", isTextBox: true, margin: 0,
  });
  s.addShape(pres.ShapeType.rect, { x: 0.9, y: 2.95, w: 0.7, h: 0.06, fill: { color: C.accent }, line: { type: "none" } });

  s.addText([
    { text: "실험일  ", options: { bold: true, color: C.accent } },
    { text: "2026. 9. 22 (화) · A2조\n", options: { color: C.card } },
    { text: "주작성자  ", options: { bold: true, color: C.accent } },
    { text: "김민서A 김민성\n", options: { color: C.card } },
    { text: "김나영 김다솔 김도연 김민서A 김민서B 김민성", options: { color: "CFE0D8", fontSize: 13 } },
  ], { x: 0.9, y: 3.45, w: 11.3, h: 1.4, fontFace: BODY_FONT, fontSize: 15, isTextBox: true, margin: 0, lineSpacingMultiple: 1.6 });
  pageNum(s, 1);
}

// ---------- Slide 2: 목차 ----------
{
  const s = baseSlide();
  titleBar(s, "CONTENTS", "목차");
  const items = ["이론적 배경", "실험 목적 및 시행 항목", "실험 재료 및 방법", "실험 결과", "결과 해석 및 고찰"];
  let y = 2.0;
  items.forEach((t, i) => {
    const badge = i % 2 === 0 ? C.primary : C.accent;
    s.addShape(pres.ShapeType.roundRect, { x: 0.9, y, w: 0.55, h: 0.55, rectRadius: 0.1, fill: { color: badge }, line: { type: "none" } });
    s.addText(String(i + 1), { x: 0.9, y, w: 0.55, h: 0.55, fontFace: TITLE_FONT, fontSize: 16, bold: true, color: C.card, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(t, { x: 1.65, y, w: 9, h: 0.55, fontFace: BODY_FONT, fontSize: 16, color: C.ink, valign: "middle", isTextBox: true, margin: 0 });
    y += 0.72;
  });
  pageNum(s, 2);
}

// ---------- Slide 3: 이론적 배경 (1) ----------
{
  const s = baseSlide();
  titleBar(s, "이론적 배경 · 01", "Dental Cement의 용도와 유지 인자");

  sectionLabel(s, "Dental Cement의 용도", MX, 1.7, 5.8);
  iconRows(s, MX, 2.15, 5.8, 0.82, [
    { icon: "🔗", text: "Luting agent — 인레이, 금관, 수복물, 교정장치 등의 합착·고정" },
    { icon: "🛡", text: "Cement base — 치수 보호 및 수복물 하부 구조(와동 이장재·베이스)" },
    { icon: "◆", text: "Restorative materials — 형성된 와동의 영구/임시 충전" },
    { icon: "✚", text: "수술용 드레싱재" },
  ], C.primary);

  sectionLabel(s, "Cement의 유지(retention) 인자", MX + 6.1, 1.7, 5.8);
  iconRows(s, MX + 6.1, 2.15, 5.8, 0.82, [
    { icon: "▾", text: "피막도(film thickness)가 작을수록 우수" },
    { icon: "★", text: "기계적 성질이 우수해야 함" },
    { icon: "≈", text: "경화 중 크기 변화(수축·팽창)가 작아야 함" },
    { icon: "⚗", text: "치질과 화학적 결합능이 있으면 우수" },
  ], C.accent);

  sectionLabel(s, "Cement의 분류 (결합 기전 기준)", MX, 5.3, CW);
  chipRow(s, MX, 5.78, CW, 1.2, 0.25, [
    { label: "인산염계", sub: "phosphate-bonded\nZPC" },
    { label: "페놀염계", sub: "phenolate-bonded\nZOE, 수산화칼슘" },
    { label: "폴리카복실레이트계", sub: "polycarboxylate-bonded\nPC, GI(GIC)" },
    { label: "레진계", sub: "resin-bonded\n레진 시멘트, RMGI" },
  ]);
  pageNum(s, 3);
  s.addNotes("출처: 치과재료학(제9판), 한국치과재료학교수협의회 / Dental Cements 강의PPT 2026S(수복치과재료학 이론 교안, 9/22).");
}

// ---------- Slide 4: 이론적 배경 (2) ----------
{
  const s = baseSlide();
  titleBar(s, "이론적 배경 · 02", "오늘 다루는 시멘트: ZPC · PC · GIC · RMGI");

  const cols = [
    ["ZPC", "(Zinc Phosphate Cement)", "Powder: ZnO, MgO\nSolution: 인산, 물", "간접 수복물 영구 합착, 교정용 밴드 접착,\n고강도 베이스, 임시수복재", "Glass slab 위, metal spatula", null, null],
    ["PC", "(Polycarboxylate)", "Powder: ZnO, MgO\nSolution: 폴리아크릴산, 물", "영구 합착용, 이장용, 베이스용,\n교정용 밴드 정착", "Paper pad 위, plastic spatula", "photo_09.jpg", "PC 재료 — Hy-Bond Carbo Plus"],
    ["GIC", "(Glass Ionomer)", "Powder: F-Al-실리케이트 글라스\nSolution: 폴리아크릴산 등, 물", "수복물 영구 합착, 유치 수복, 임시 수복,\n소와열구전색, 교정용 밴드 합착", "Paper pad 위, plastic spatula", "photo_10.jpg", "GIC 재료 — GC Fuji I"],
  ];
  let x = MX;
  const cw = 3.95;
  const cardTop = 1.65, cardH = 4.6;
  cols.forEach(([name, sub, comp, purpose, mix, photo, cap]) => {
    card(s, x, cardTop, cw, cardH);
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.28, y: cardTop + 0.22, w: 0.7, h: 0.32, rectRadius: 0.06, fill: { color: C.primary }, line: { type: "none" } });
    s.addText(name, { x: x + 0.28, y: cardTop + 0.22, w: 0.7, h: 0.32, fontFace: SERIF_FONT, fontSize: 14, bold: true, color: C.card, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(sub, { x: x + 1.08, y: cardTop + 0.22, w: cw - 1.36, h: 0.32, fontFace: SERIF_FONT, fontSize: 10.5, italic: true, color: C.muted, valign: "middle", isTextBox: true, margin: 0 });
    let bodyY = cardTop + 0.72;
    let bodyH = 2.75;
    let lineSpacing = 1.2;
    if (photo) {
      const pw = 1.5;
      const px = x + (cw - pw) / 2;
      const RATIO = 4 / 3;
      const ph = pw / RATIO;
      s.addImage({ path: `${PHOTO_DIR}/${photo}`, x: px, y: bodyY, w: pw, h: ph, sizing: { type: "cover", w: pw, h: ph } });
      s.addShape(pres.ShapeType.rect, { x: px, y: bodyY, w: pw, h: ph, fill: { type: "none" }, line: { color: C.line, width: 1 } });
      s.addText(cap, { x: x + 0.28, y: bodyY + ph + 0.03, w: cw - 0.56, h: 0.24, fontFace: BODY_FONT, fontSize: 10, italic: true, color: C.muted, isTextBox: true, margin: 0, align: "center" });
      bodyY += ph + 0.03 + 0.24 + 0.1;
      bodyH = cardTop + cardH - 0.2 - bodyY;
      lineSpacing = 1.1;
    }
    s.addText([
      { text: "Composition\n", options: { bold: true, color: C.accent } },
      { text: comp + "\n\n", options: {} },
      { text: "Purpose\n", options: { bold: true, color: C.accent } },
      { text: purpose + "\n\n", options: {} },
      { text: "Mixing\n", options: { bold: true, color: C.accent } },
      { text: mix, options: {} },
    ], { x: x + 0.28, y: bodyY, w: cw - 0.56, h: bodyH, fontFace: BODY_FONT, fontSize: 11.5, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: lineSpacing });
    x += cw + 0.2;
  });

  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 6.35, w: CW, h: 0.85, rectRadius: 0.08, fill: { color: C.card }, line: { type: "none" } });
  s.addText([
    { text: "냉각판 혼합법(frozen slab method): ", options: { bold: true, color: C.primary } },
    { text: "냉동고에 보관해 둔 유리판. 15% 높은 분액비 조건에서 사용 — 작업시간은 길고 경화시간은 짧음, 필요 분말량은 보통보다 50~70% 많으나 결로는 분액비로 보상. 압축·인장강도·용해도는 상온 혼합과 큰 차이 없음.\n", options: {} },
    { text: "RMGI(Resin-Modified GI): ", options: { bold: true, color: C.primary } },
    { text: "GIC 개량형 — 1:1 auto-mixing tip으로 혼합, 광중합/화학중합 병행(dual-cure) 가능.", options: {} },
  ], { x: MX + 0.25, y: 6.47, w: CW - 0.5, h: 0.65, fontFace: BODY_FONT, fontSize: 11, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.25 });
  pageNum(s, 4);
}

// ---------- Slide 5: ISO 9917-1:2007 측정 규격 & 제조사 공식 값 ----------
{
  const s = baseSlide();
  titleBar(s, "이론적 배경 · 03", "ISO 9917-1:2007 측정 규격 & 제조사 공식 값");

  sectionLabel(s, "Setting Time 규격", MX, 1.65, 6.0);
  bulletBlock(s, [
    "Indentor: (400±5)g, flat end 지름 (1±0.1)mm",
    "Metal mould/block: 37±1°C(구강 내 온도) · Cabinet: 37±1°C·습도 90%(구강 내 습도) 유지",
    "Net setting time(순경화시간) = mixing 종료 시점부터 indentor가 완전한 원형 압흔을 남기지 못하는 시점까지",
  ], { x: MX, y: 2.05, w: 6.0, h: 1.5, fontSize: 12 });

  sectionLabel(s, "Film Thickness 규격 (Luting cement 한정)", MX, 3.7, 6.0);
  bulletBlock(s, [
    "½ 슬라이드글라스 2매의 두께를 1µm 단위로 선측정(A)",
    "글라스판 사이에 혼합 시멘트 0.1g을 개재",
    "정하중 압축기 150N의 힘을 10분간 가함",
    "시멘트가 개재된 상태로 재측정(B) → 피막도 = B − A (µm)",
  ], { x: MX, y: 4.1, w: 6.0, h: 1.9, fontSize: 12 });

  card(s, MX + 6.3, 1.65, 5.6, 3.75);
  s.addText("제조사 공식 값 (제품 설명서 기준)", { x: MX + 6.55, y: 1.8, w: 5.1, h: 0.35, fontFace: TITLE_FONT, fontSize: 13.5, bold: true, color: C.primary, isTextBox: true, margin: 0 });
  const specTable = [
    ["재료", "제품명", "P/L ratio", "Mixing", "Working", "Setting"],
    ["ZPC", "Elite Cement 100", "1.45g/0.5mL", "60~90초", "3~4분*", "7분 10초*"],
    ["PC", "Hy-Bond Carbo Plus", "2.2g/1.0g", "45초 이내", "3분*", "4분*"],
    ["GIC", "GC Fuji I", "1.8g/1.0g", "20초", "2분†", "4분 30초‡"],
  ];
  dataTable(s, specTable, {
    x: MX + 6.55, y: 2.2, w: 5.1, h: 2.5,
    colW: [0.55, 1.55, 0.95, 0.75, 0.65, 0.65],
    rowH: [0.6, 0.65, 0.65, 0.6],
    fontSize: 9.5, valign: "middle",
  });
  s.addText(
    "* mixing 종료(합착) 기준  † mixing 시작 기준  ‡ 수복물 장착 이후 최종 마무리 가능 시점 — 제품마다 기준 시점이 달라 직접 비교 시 유의.",
    { x: MX + 6.55, y: 4.85, w: 5.1, h: 0.45, fontFace: BODY_FONT, fontSize: 9, italic: true, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.2 }
  );

  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 6.05, w: CW, h: 0.95, rectRadius: 0.08, fill: { color: C.card }, line: { type: "none" } });
  s.addShape(pres.ShapeType.rect, { x: MX, y: 6.05, w: 0.08, h: 0.95, fill: { color: C.accent }, line: { type: "none" } });
  s.addText([
    { text: "실습 조건 vs ISO 표준:  ", options: { bold: true, color: C.primary } },
    { text: "실습실은 ISO 표준 조건(37±1°C·습도 90%)이 아닌 상온(약 23°C, 습도 통제 없음)에서 진행 — 온도가 낮을수록 반응속도가 느려지므로, 실측 setting time이 제조사 공식 값보다 전반적으로 길게 나온 주요 원인으로 추정됨.", options: {} },
  ], { x: MX + 0.3, y: 6.2, w: CW - 0.55, h: 0.7, fontFace: BODY_FONT, fontSize: 11, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.25 });
  pageNum(s, 5);
  s.addNotes("출처: ISO 9917-1:2007 규격 원문(강의 자료 인용) 및 각 제품 설명서(Elite Cement 100 / Hy-Bond Carbo Plus / GC Fuji I, 첨부 설명서 원문 기준).");
}

// ---------- Slide 6: 실험 목적 및 시행 항목 ----------
{
  const s = baseSlide();
  titleBar(s, "실험 개요 · 01", "실험 목적 및 시행 항목");

  sectionLabel(s, "9/22 수업일지 요약", MX, 1.65, 6);
  s.addText("오늘 실습은 ZPC를 중심으로 분액비(P/L ratio)를 정상·±15%·냉각판 네 조건으로 바꿔가며 mixing·setting time을 측정하고, 슬라이드글라스 사이에 시멘트를 끼워 피막도(film thickness)를 재는 두 갈래로 진행됨. 같은 틀로 PC·GIC·RMGI·ZOE도 함께 다룸.", {
    x: MX, y: 2.0, w: CW, h: 0.6, fontFace: BODY_FONT, fontSize: 12, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.25,
  });

  const overview = [
    ["재료", "조건 변수", "측정 항목"],
    ["ZPC", "정상 / 15%↑ / 15%↓ / 냉각판(frozen)", "setting time, film thickness"],
    ["PC", "정상 P/L", "setting time"],
    ["GIC", "정상 P/L", "setting time"],
    ["RMGI", "1:1 auto-mixing tip", "setting time, film thickness"],
    ["ZOE", "적당량(구경·시연만)", "-"],
  ];
  dataTable(s, overview, { x: MX, y: 2.65, w: CW, h: 1.9, colW: [2.4, 5.7, 3.9], rowH: [0.38, 0.305, 0.305, 0.305, 0.305, 0.305], fontSize: 12 });

  sectionLabel(s, "실험 목적 (수업 슬라이드 원문)", MX, 4.75, CW);
  bulletBlock(s, [
    "시멘트의 혼합 방법의 차이",
    "시멘트 혼합 시 점도의 차이",
    "분액비의 차이가 경화시간에 미치는 영향",
  ], { x: MX, y: 5.1, w: 5.9, h: 1.05, fontSize: 12 });
  bulletBlock(s, [
    "냉각판 사용의 의미",
    "피막도 측정오류의 이유",
    "각 시멘트 혼합물의 특징",
  ], { x: MX + 6.1, y: 5.1, w: 5.8, h: 1.05, fontSize: 12 });

  sectionLabel(s, "측정 원리", MX, 6.3, 6);
  bulletBlock(s, [
    "ISO 9917-1:2007 규격의 indentor(400±5g, 끝 지름 1±0.1mm)로 압입 — 일정 간격(초기 30초 → 임박 시 10초)으로 눌러 완전한 원형 압흔이 안 남는 시점을 setting time으로 기록",
  ], { x: MX, y: 6.65, w: CW, h: 0.55, fontSize: 11.5 });
  pageNum(s, 6);
  s.addNotes("출처: Notion 수업일지 9.22 (수복치과재료학실험) + 강의 슬라이드 「Aims of experiment」 원문. 수업 초반 하이브리드 콤포짓 Q&A는 지난 주 복습 성격이라 요약에서 제외, 오늘의 재료실험 파트만 정리함.");
}

// ---------- Slide 7: 실험 재료 ----------
{
  const s = baseSlide();
  titleBar(s, "실험 개요 · 02", "실험 재료");
  let x = MX;
  const cw = 5.85;

  card(s, x, 1.6, cw, 5.2);
  s.addText("Setting time 측정", { x: x + 0.32, y: 1.82, w: cw - 0.64, h: 0.4, fontFace: TITLE_FONT, fontSize: 15, bold: true, color: C.primary, isTextBox: true, margin: 0 });
  bulletBlock(s, [
    "Dental cements: ZPC, PC, GIC, RMGI, ZOE(구경용)",
    "Glass slab / frozen glass, paper pad",
    "Metal spatula, plastic spatula",
    "Metal mold, Al foil, metal block",
    "Indentor(탐침), Timer, Vaseline",
  ], { x: x + 0.32, y: 2.3, w: cw - 0.64, h: 1.75, fontSize: 12.5 });
  {
    const pw = 2.35, gap = 0.2;
    photoCard(s, `${PHOTO_DIR}/photo_06.jpg`, x + 0.32, 4.15, { w: pw }, "분액비 조정 — liquid drop 계량");
    photoCard(s, `${PHOTO_DIR}/photo_07.jpg`, x + 0.32 + pw + gap, 4.15, { w: pw }, "경화 중인 시편 (metal mold rack)");
  }
  x += cw + 0.3;

  card(s, x, 1.6, cw, 5.2);
  s.addText("Film thickness 측정", { x: x + 0.32, y: 1.82, w: cw - 0.64, h: 0.4, fontFace: TITLE_FONT, fontSize: 15, bold: true, color: C.primary, isTextBox: true, margin: 0 });
  bulletBlock(s, [
    "ZPC(정상/±15%/냉각판 조건)",
    "Slide glass 2매",
    "Metal spatula, cotton swab",
    "Micrometer(두께 측정기)",
    "하중장치(150N, load compressor)",
  ], { x: x + 0.32, y: 2.3, w: cw - 0.64, h: 1.75, fontSize: 12.5 });
  {
    const pw = 2.9;
    photoCard(s, `${PHOTO_DIR}/photo_05.jpg`, x + (cw - pw) / 2, 4.15, { w: pw }, "필름두께 측정기 (하중장치)");
  }
  pageNum(s, 7);
}

// ---------- Slide 8: 실험 방법 ----------
{
  const s = baseSlide();
  titleBar(s, "실험 개요 · 03", "실험 방법");

  sectionLabel(s, "① 분액비(P/L ratio) 조건", MX, 1.65, 6);
  const table1 = [
    ["재료", "조건", "Scoop / Drop"],
    ["ZPC", "정상 P/L", "3 / 15"],
    ["ZPC", "15% 높음(High)", "3 / 13"],
    ["ZPC", "15% 낮음(Low)", "3 / 18"],
    ["ZPC", "15% 높음 + 냉각판", "-"],
    ["PC", "정상 P/L", "3 / 9"],
    ["GIC", "정상 P/L", "3 / 6"],
    ["RMGI", "1:1 auto-mixing tip", "-"],
  ];
  dataTable(s, table1, { x: MX, y: 2.05, w: 6.1, h: 3.0, colW: [1.3, 3.0, 1.8], rowH: [0.38, 0.375, 0.375, 0.375, 0.375, 0.375, 0.375, 0.375], fontSize: 11.5 });

  sectionLabel(s, "② Mixing 절차 (공통)", MX + 6.4, 1.65, 5.65);
  bulletBlock(s, [
    "Powder를 scoop 수에 맞춰 먼저 덜어냄 (포션끼리 합치지 않음)",
    "Mix 시작 직전에 liquid를 방울 단위로 옆에 떨어뜨림",
    "떨어뜨린 liquid는 하나로 합쳐 넓게 폄",
    "Liquid 위로 powder를 나눠 첨가하며 혼합 (한꺼번에 X)",
    "가급적 빠른 시간 내에 혼합 완료",
  ], { x: MX + 6.4, y: 2.05, w: 3.3, h: 3.0, fontSize: 11.5 });
  photoCard(s, `${PHOTO_DIR}/photo_04.jpg`, MX + 9.9, 2.05, { w: 2.35 }, "Mixing 과정 (spatula)");

  s.addShape(pres.ShapeType.rect, { x: MX, y: 5.28, w: CW, h: 0.03, fill: { color: C.line }, line: { type: "none" } });
  sectionLabel(s, "③ Setting time / Film thickness 측정", MX, 5.42, CW);
  bulletBlock(s, [
    "Setting time: 검정 사각 금속 주형을 Al foil로 덮은 metal block에 올리고 mix 완료 재료를 채움 → 혼합 종료 90초 후부터 indentor를 수직으로 5초간 압입, 30초 간격 반복 → 예상 경화시점 30초 전부터 10초 간격으로 전환 → 완전한 원형 압흔이 안 남는 시점 기록",
    "Film thickness: 유리판 2매를 포개어 접촉 상태 두께 선측정(A) → 혼합 종료 cement 0.10mL을 유리판 사이 중앙에 위치 → 작업시간 10초 전부터 하중장치로 150N을 10분간 적용 → 재측정(B) → 피막도 = B − A",
  ], { x: MX, y: 5.78, w: 9.0, h: 1.5, fontSize: 11 });
  s.addText("※ ISO 9917-1 규격 문서는 시멘트량을 0.1g으로 표기하나, 실제 강의 프로토콜은 0.10mL 기준 — 단위 표기 차이이며 비중 차로 실질량은 유사.", {
    x: MX, y: 7.1, w: 9.0, h: 0.32, fontFace: BODY_FONT, fontSize: 9, italic: true, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.15,
  });
  photoCard(s, `${PHOTO_DIR}/photo_02.jpg`, MX + 9.35, 5.78, { w: 1.6 }, "Setting time — 금속 몰드");
  pageNum(s, 8);
}

// ---------- Slide 9: 실험 결과 ----------
{
  const s = baseSlide();
  titleBar(s, "실험 결과 · 01", "조건별 경화시간(setting time) 및 유리판 측정값");
  const table = [
    ["재료", "조건", "Scoop/Drop", "유리판 측정값 (A/B, mm)", "피막도(B−A, mm)", "Total time", "Mixing", "Setting time"],
    ["ZPC", "정상 P/L", "3 / 15", "9.464 / 9.480", "0.016", "17:50", "1:30", "16:20"],
    ["ZPC", "15% 높음", "3 / 13", "9.464 / 9.474", "0.010", "14:15", "1:30", "12:45"],
    ["ZPC", "15% 낮음", "3 / 18", "9.466 / 9.470", "0.004", "18:16", "1:30", "16:46"],
    ["ZPC", "15% 높음 + 냉각판", "-", "9.466 / 9.486", "0.020", "13:33", "1:30", "12:03"],
    ["PC", "정상 P/L", "3 / 9", "-", "-", "10:26", "0:45", "9:41"],
    ["GIC", "정상 P/L", "3 / 6", "-", "-", "9:08", "0:25", "8:43"],
    ["RMGI", "1:1 auto-mix", "-", "9.466 / 9.480", "0.014", "6:24", "0:00", "6:24"],
    ["ZOE", "적당량(시연만)", "-", "-", "-", "-", "-", "-"],
  ];
  dataTable(s, table, {
    x: MX, y: 1.85, w: CW, h: 3.85,
    colW: [0.9, 1.9, 1.15, 2.05, 1.35, 1.5, 1.2, 1.6],
    rowH: [0.55, 0.365, 0.365, 0.365, 0.365, 0.365, 0.365, 0.365, 0.365],
    fontSize: 11.5, altRow: true,
  });

  s.addText("※ Setting time(경화시간) = Total time − Mixing time. ZPC는 mixing time 1:30(수업 노트의 \"1분에서 +30초까지\" 구간 기준), RMGI는 auto-mixing으로 0:00으로 보고 계산. 유리판 측정값·피막도 모두 mm 단위(예: 9.480−9.464=0.016mm) — 원본 raw data 수정본(9.27) 반영.", {
    x: MX, y: 5.95, w: CW, h: 0.5, fontFace: BODY_FONT, fontSize: 11, italic: true, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.2,
  });
  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 6.5, w: CW, h: 0.55, rectRadius: 0.08, fill: { color: C.card }, line: { type: "none" } });
  s.addText("Setting time 빠른 순:  RMGI(6:24) < GIC(8:43) < PC(9:41) < ZPC 냉각판(12:03) < ZPC 15%↑(12:45) < ZPC 정상(16:20) < ZPC 15%↓(16:46)", {
    x: MX + 0.25, y: 6.5, w: CW - 0.5, h: 0.55, fontFace: BODY_FONT, fontSize: 12, bold: true, color: C.primary, valign: "middle", isTextBox: true, margin: 0,
  });
  pageNum(s, 9);
}

// ---------- Slide 10: 조별 데이터 종합 비교 ----------
{
  const s = baseSlide();
  titleBar(s, "실험 결과 · 02", "조별 데이터 종합 비교 — 6개 조 평균(A반 취합)");

  const settingLabels = ["ZPC\n15%↓", "ZPC\n정상", "ZPC\n15%↑", "ZPC\n15%↑+냉각판", "PC\n정상", "GIC\n정상", "RMGI"];
  const settingAvgMin = [13.13, 11.20, 7.63, 10.08, 10.29, 6.03, 6.4];
  const settingAvgLabel = ["13:08", "11:12", "7:38", "10:05", "10:17", "6:02", "6:24*"];

  card(s, MX, 1.6, 6.0, 3.7);
  s.addChart(pres.ChartType.bar, [{
    name: "평균 Setting time",
    labels: settingLabels,
    values: settingAvgMin,
  }], {
    x: MX + 0.15, y: 1.75, w: 5.7, h: 3.4,
    barDir: "col",
    showTitle: true, title: "평균 Setting time (분)", titleFontSize: 12.5, titleColor: C.primary, titleFontFace: TITLE_FONT,
    showLegend: false,
    chartColors: [...Array(settingLabels.length - 1).fill(C.primary), C.accent],
    showValue: true, dataLabelFormatCode: "0.0", dataLabelPosition: "outEnd", dataLabelFontSize: 10.5, dataLabelColor: C.ink,
    catAxisLabelFontSize: 9.5, catAxisLabelColor: C.muted, catAxisLabelFontFace: BODY_FONT,
    valAxisLabelFontSize: 9.5, valAxisLabelColor: C.muted, valAxisTitle: "분", showValAxisTitle: false,
    valGridLine: { color: C.line, size: 0.75 }, catGridLine: { style: "none" },
    valAxisMinVal: 0,
    barGapWidthPct: 40,
  });
  s.addText(
    settingLabels.map((l, i) => `${l.replace("\n", " ")}: ${settingAvgLabel[i]}`).join("   ·   ") + "   (* RMGI는 취합 표에 setting time 항목 자체가 없어 A2조 단독 값)",
    { x: MX + 0.15, y: 5.15, w: 5.7, h: 0.4, fontFace: BODY_FONT, fontSize: 8.5, italic: true, color: C.muted, isTextBox: true, margin: 0 }
  );

  const ftLabels = ["ZPC\n15%↓", "ZPC\n정상", "ZPC\n15%↑", "ZPC\n15%↑+냉각판", "RMGI"];
  const ftAvg = [0.0352, 0.0470, 0.0492, 0.0123, 0.0152];

  card(s, MX + 6.3, 1.6, 5.8, 3.7);
  s.addChart(pres.ChartType.bar, [{
    name: "평균 Film thickness",
    labels: ftLabels,
    values: ftAvg,
  }], {
    x: MX + 6.45, y: 1.75, w: 5.5, h: 3.4,
    barDir: "col",
    showTitle: true, title: "평균 Film thickness (mm)", titleFontSize: 12.5, titleColor: C.primary, titleFontFace: TITLE_FONT,
    showLegend: false,
    chartColors: Array(ftLabels.length).fill(C.accent),
    showValue: true, dataLabelFormatCode: "0.000", dataLabelPosition: "outEnd", dataLabelFontSize: 10.5, dataLabelColor: C.ink,
    catAxisLabelFontSize: 9.5, catAxisLabelColor: C.muted, catAxisLabelFontFace: BODY_FONT,
    valAxisLabelFontSize: 9.5, valAxisLabelColor: C.muted,
    valGridLine: { color: C.line, size: 0.75 }, catGridLine: { style: "none" },
    valAxisMinVal: 0,
    barGapWidthPct: 40,
  });

  s.addText(
    "※ 9/28 A1~A6 전체 취합 raw data 기준 재계산(본인 조 A2는 원 노트 mm:ss 표기, 나머지 조는 소수점 표기 — 자릿수가 60을 넘는 사례를 근거로 \"분 단위 소수\"로 환산, 콜론(:)으로 명확히 표기된 값은 그대로 사용). ⚠️ ZPC 15%↓·정상·15%↑ 세 조건 모두 한 조(A3)의 Film thickness 값이 다른 조 대비 3~10배 높게 나와(0.117/0.153/0.196) 평균을 끌어올림 — 같은 조의 냉각판 조건 값은 정상 범위인 점을 볼 때 측정·단위 오류 가능성 있음, 발표 전 해당 조에 재확인 권장. RMGI Setting time은 취합 표 자체에 항목이 없어 A2조 단독 값(6:24)만 반영.",
    { x: MX, y: 5.5, w: CW, h: 1.4, fontFace: BODY_FONT, fontSize: 9.5, italic: true, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.25 }
  );
  pageNum(s, 10);
  s.addNotes("출처: 반 전체 취합 데이터(6개 조, A1~A6). Notion 9.22 수업일지의 '보고서: 전체조 데이터 평균/비교' 지시에 따라 구성. 시간 단위 해석에 가정이 포함되어 있으므로 발표 전 원본 스프레드시트로 재확인 필요.");
}

// ---------- Slide 11: 결과 해석 ----------
{
  const s = baseSlide();
  titleBar(s, "고찰", "결과 해석 및 고찰");

  sectionLabel(s, "① P/L ratio와 경화시간", MX, 1.7, CW);
  bulletBlock(s, [
    "이론: 분액비(P/L)가 높을수록 반응할 ZnO 양이 많아 겔 형성이 빠르고 점도가 증가 → 경화가 빨라짐 (high < normal < low 순으로 setting time이 길어질 것으로 예상)",
    "실측: 15%↑(setting 12:45)가 정상(setting 16:20)보다 빠르게 나온 점은 이론과 대체로 부합하나, 정상 조건이 예상보다 오래 걸림 — 혼합 균질도, 실험실 온습도, indentor 판정의 주관성 등이 오차 요인으로 추정",
  ], { x: MX, y: 2.1, w: CW, h: 1.5, fontSize: 13 });

  sectionLabel(s, "② 냉각판(frozen slab) 효과", MX, 3.75, CW);
  bulletBlock(s, [
    "이론: 온도가 낮을수록 분자 운동성·반응성이 저하되어 작업시간은 길어지고 경화시간도 길어질 것으로 예상됨",
    "실측: 냉각판(setting 12:03)이 동일 조건 상온(setting 12:45)보다 오히려 짧게 나옴 — 예상과 반대 방향. 다만 작업시간(working time) 자체는 별도로 측정하지 못해 직접 비교는 어려움, 경화시간만으로 임의 추정한 결과",
  ], { x: MX, y: 4.15, w: CW, h: 1.4, fontSize: 13 });

  sectionLabel(s, "③ 재료별 특성 · 제조사 공식 값과의 비교", MX, 5.7, CW);
  bulletBlock(s, [
    "RMGI(6:24)가 전 재료 중 가장 빠르게 경화 — auto-mixing으로 균질 혼합, 이중경화(dual-cure) 특성 영향으로 추정",
    "제조사 공식 값 대비 실측이 전반적으로 느림: ZPC(제조사 7:10 vs 실측 정상 16:20, 약 2.3배) · PC(제조사 4:00 vs 실측 9:41, 약 2.4배) · GIC(제조사 4:30 vs 실측 8:43, 약 1.9배) — ISO 표준 조건(37±1°C)이 아닌 상온(약 23°C)에서 실습했기 때문으로 추정",
  ], { x: MX, y: 6.1, w: CW, h: 1.3, fontSize: 12.5 });
  pageNum(s, 11);
  s.addNotes("참고 PPT(박수진 외, A반 5조) 고찰 구조를 참고해 재구성 — 다만 수치·조건은 오늘 A반 본인 실측 기준으로 새로 정리한 것.");
}

// ---------- Slide 12: 결론 ----------
{
  const s = baseSlide();
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.primary }, line: { type: "none" } });
  s.addShape(pres.ShapeType.ellipse, { x: -2.5, y: H - 3.5, w: 6, h: 6, fill: { color: C.primaryDark }, line: { type: "none" } });
  s.addText("결론", { x: 0.9, y: 0.7, w: 6, h: 0.5, fontFace: BODY_FONT, fontSize: 14, bold: true, charSpacing: 1, color: C.accent, isTextBox: true, margin: 0 });
  s.addText("분액비·혼합 온도·재료 종류 모두 dental cement의 경화 시간과 피막도에 유의한 영향이 있다.", {
    x: 0.9, y: 1.25, w: 11.3, h: 1.3, fontFace: TITLE_FONT, fontSize: 26, bold: true, color: C.card, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  bulletBlock(s, [
    "분액비가 높을수록 경화시간이 짧아지는 경향이 대체로 확인됨(일부 예외 존재 — 혼합·측정 오차 가능성)",
    "냉각판(저온) 조건은 이론상 경화 지연을 예상했으나 실측은 반대 — 작업시간·경화시간을 분리 측정하지 못한 한계",
    "임상에서는 합착 목적·필요 작업시간에 따라 재료와 분액비를 조절해 사용해야 함 — 예: 빠른 경화가 필요하면 high P/L, 여유 있는 작업시간이 필요하면 low P/L 또는 냉각판 활용",
  ], { x: 0.9, y: 2.85, w: 11.3, h: 2.6, color: C.card, fontSize: 14 });
  pageNum(s, 12);
}

// ---------- Slide 13: 참고 문헌 ----------
{
  const s = baseSlide();
  titleBar(s, "REFERENCE", "참고 문헌");
  const refs = [
    "치과재료학 (제9판), 한국치과재료학교수협의회, 군자출판사, 263-277p.",
    "ISO 9917-1:2007. Dentistry — Water-based cements — Part 1: Powder/liquid acid-base cements. International Organization for Standardization.",
    "Windeler AS. The use of film thickness to measure working time of zinc phosphate cements. J Dent Res. 1978;57(5):649-653.",
    "Norman RD, Swartz ML, Phillips RW. Studies on film thickness, solubility, and marginal leakage of dental cements. J Dent Res. 1963;42(4):950-959.",
  ];
  s.addText(refs.map((t, i) => ({ text: `[${i + 1}] ${t}`, options: { breakLine: i < refs.length - 1 } })),
    { x: MX, y: 2.0, w: CW, h: 4.0, fontFace: BODY_FONT, fontSize: 13.5, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.6, valign: "top" });
  pageNum(s, 13);
}

pres.writeFile({ fileName: "수복치과재료학실험_DentalCements_20260922.pptx" }).then(() => {
  console.log("done");
});
