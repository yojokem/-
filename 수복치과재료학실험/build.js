const pptxgen = require("pptxgenjs");

const TITLE_FONT = "맑은 고딕";
const SERIF_FONT = "Cambria";
const BODY_FONT = "맑은 고딕";
const PHOTO_DIR = __dirname + "/dental_photos/insert";

// palette — navy + sky blue, kept low-saturation/monochrome (no coral/warm accent)
const C = {
  primary: "1B3A5C",     // deep navy
  primaryDark: "10253D",
  accent: "4A90C2",      // muted sky blue
  ink: "1C2733",
  paper: "F5F6F8",       // near-white cool-gray background (light content slides) — cards sit on this in pure white
  card: "FFFFFF",
  muted: "5B6B7A",
  line: "DCE3EA",
  headerFill: "1B3A5C",
  headerText: "FFFFFF",
  rowAlt: "EDF2F7",
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
  if (sub) {
    s.addText(sub, {
      x: MX, y: 1.38, w: CW, h: 0.35,
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
}

function bulletBlock(s, items, opts) {
  s.addText(
    items.map((t, i) => ({ text: "•  " + t, options: { breakLine: i < items.length - 1 } })),
    Object.assign({ fontFace: BODY_FONT, fontSize: 13, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.4, valign: "top" }, opts)
  );
}

// icon-in-rounded-square + text row list
function iconRows(s, x, y, w, rowH, items, badgeColor) {
  const textH = rowH - 0.06;
  const iconY = (textH - 0.5) / 2; // center the icon badge on the text box's vertical center, not its top
  items.forEach((it, i) => {
    const ry = y + i * rowH;
    s.addShape(pres.ShapeType.roundRect, { x, y: ry + iconY, w: 0.5, h: 0.5, rectRadius: 0.1, fill: { color: badgeColor || C.primary }, line: { type: "none" } });
    s.addText(it.icon, { x, y: ry + iconY, w: 0.5, h: 0.5, fontFace: "Arial", fontSize: 15, color: C.card, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(it.text, { x: x + 0.68, y: ry, w: w - 0.68, h: textH, fontFace: BODY_FONT, fontSize: 13, color: C.ink, valign: "middle", isTextBox: true, margin: 0, lineSpacingMultiple: 1.2 });
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
    s.addText(it.sub, { x: cx + 0.15, y: y + 0.92, w: cw - 0.3, h: h - 1.02, fontFace: BODY_FONT, fontSize: 11.5, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.2, valign: "top" });
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

  s.addText("2026-2 〈수복치과재료학실험〉 A2조", {
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

  s.addText([
    { text: "실험일  ", options: { bold: true, color: C.accent } },
    { text: "2026. 9. 22 (화) · A2조\n", options: { color: C.card } },
    { text: "주작성자  ", options: { bold: true, color: C.accent } },
    { text: "김민서A 김민성\n", options: { color: C.card } },
    { text: "김나영 김다솔 김도연 김민서A 김민서B 김민성", options: { color: "CFE0D8", fontSize: 13 } },
  ], { x: 0.9, y: 3.45, w: 11.3, h: 1.4, fontFace: BODY_FONT, fontSize: 15, isTextBox: true, margin: 0, lineSpacingMultiple: 1.6 });
  pageNum(s, 1);
  s.addNotes("[대본 0:00~0:20]\n안녕하세요, A2조 발표를 맡은 [이름]입니다. 오늘은 9월 22일에 진행한 Dental Cements 실습, setting time과 film thickness 측정 결과를 정리해서 발표하겠습니다.");
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
  s.addNotes("[대본 0:20~0:35]\n발표는 이론적 배경, 실험 목적, 실험 재료·방법, 실험 결과, 마지막으로 결과 해석 순으로 진행하겠습니다.");
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
  chipRow(s, MX, 5.78, CW, 1.55, 0.25, [
    { label: "인산염계", sub: "phosphate-bonded\nZPC" },
    { label: "페놀염계", sub: "phenolate-bonded\nZOE, 수산화칼슘" },
    { label: "폴리카복실레이트계", sub: "polycarboxylate-bonded\nPC, GI(GIC)" },
    { label: "레진계", sub: "resin-bonded\n레진 시멘트, RMGI" },
  ]);
  pageNum(s, 3);
  s.addNotes("[대본 0:35~1:30]\n먼저 dental cement가 임상에서 쓰이는 용도부터 보면, 크게 네 가지입니다. 인레이나 금관 같은 수복물을 합착·고정하는 luting agent, 치수를 보호하는 base, 와동을 직접 채우는 restorative material, 그리고 수술용 드레싱재로 쓰입니다.\n\ncement가 잘 유지되려면 피막도가 작을수록 좋고, 기계적 성질이 우수해야 하며, 경화되는 동안 부피 변화가 작아야 하고, 치아 조직과 화학적으로 결합할 수 있으면 더 유리합니다.\n\n결합 기전으로 분류하면 인산염계인 ZPC, 페놀염계인 ZOE, 폴리카복실레이트계인 PC·GIC, 그리고 레진계인 레진 시멘트·RMGI로 나뉩니다. 오늘 저희가 다룬 건 이 중 ZPC, PC, GIC, RMGI 네 가지입니다.\n\n[발표 팁] 출처: 치과재료학(제9판), 한국치과재료학교수협의회 / Dental Cements 강의PPT 2026S(수복치과재료학 이론 교안, 9/22).");
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
    { text: "냉동고에 보관해 둔 유리판. 15% 높은 분액비 조건에서 사용 — 작업시간은 길고 경화 시간은 짧음, 필요 분말량은 보통보다 50~70% 많으나 결로는 분액비로 보상. 압축·인장강도·용해도는 상온 혼합과 큰 차이 없음.\n", options: {} },
    { text: "RMGI(Resin-Modified GI): ", options: { bold: true, color: C.primary } },
    { text: "GIC 개량형 — 1:1 auto-mixing tip으로 혼합, 광중합/화학중합 병행(dual-cure) 가능.", options: {} },
  ], { x: MX + 0.25, y: 6.47, w: CW - 0.5, h: 0.65, fontFace: BODY_FONT, fontSize: 11, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.25 });
  pageNum(s, 4);
  s.addNotes("[대본 1:30~2:30]\nZPC는 분말이 산화아연, 용액이 인산인 구조로, 간접 수복물을 영구 합착하거나 고강도 베이스로 씁니다. PC는 폴리아크릴산 용액을 쓰는 게 ZPC와 다른 점이고, GIC는 불소·알루미늄 실리케이트 글라스 분말을 씁니다.\n\n한 가지 짚고 넘어갈 부분이 냉각판 혼합법인데요, 냉동고에 보관해 둔 유리판 위에서 혼합하는 방식으로, 분액비를 15% 높게 쓸 때 함께 적용합니다. 작업시간은 늘리면서 경화시간은 줄이는 효과를 노린 방법입니다. RMGI는 GIC를 레진으로 개량한 재료로, 오늘은 1:1 auto-mixing tip으로 혼합했습니다.");
}

// ---------- Slide 5: ISO 9917-1:2007 측정 규격 & 제조사 공식 값 ----------
{
  const s = baseSlide();
  titleBar(s, "이론적 배경 · 03", "ISO 9917-1:2007 측정 규격 & 제조사 공식 값");

  sectionLabel(s, "Setting Time 규격", MX, 1.65, 6.0);
  bulletBlock(s, [
    "Indentor: (400±5)g, flat end 지름 (1±0.1)mm",
    "Metal mould/block: 37±1°C(구강 내 온도) · Cabinet: 37±1°C·습도 90%(구강 내 습도) 유지",
    "Net setting time(순경화 시간) = mixing 종료 시점부터 indentor가 완전한 원형 압흔을 남기지 못하는 시점까지",
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
    colW: [0.5, 1.3, 0.85, 0.8, 0.85, 0.8],
    rowH: [0.6, 0.65, 0.65, 0.6],
    fontSize: 9.5, valign: "middle",
  });
  s.addText(
    "* mixing 종료(합착) 기준  † mixing 시작 기준  ‡ 수복물 장착 이후 최종 마무리 가능 시점\n— 제품마다 기준 시점이 다르므로 직접 비교 시 유의.",
    { x: MX + 6.55, y: 4.85, w: 5.1, h: 0.45, fontFace: BODY_FONT, fontSize: 9, italic: true, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.2 }
  );

  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 6.05, w: CW, h: 0.95, rectRadius: 0.08, fill: { color: "EAF2EE" }, line: { type: "none" } });
  s.addText([
    { text: "실습 조건 vs ISO 표준:  ", options: { bold: true, color: C.primary } },
    { text: "실습실은 ISO 표준 조건(37±1°C·습도 90%)이 아닌 상온(약 23°C, 습도 통제 없음)에서 진행 — 온도가 낮을수록 반응속도가 느려지므로, 실측 setting time이 제조사 공식 값보다 전반적으로 길게 나온 주요 원인으로 추정됨.", options: {} },
  ], { x: MX + 0.3, y: 6.2, w: CW - 0.55, h: 0.7, fontFace: BODY_FONT, fontSize: 11, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.25 });
  pageNum(s, 5);
  s.addNotes("[대본 2:30~3:30]\n측정 기준이 된 ISO 9917-1:2007 규격을 보면, setting time은 400±5g 무게의 indentor로 압입해서 완전한 원형 압흔이 안 남는 시점까지의 시간입니다. film thickness는 유리판 사이에 시멘트를 끼우고 150N 하중을 10분간 가한 뒤 두께 변화를 재는 방식이고요.\n\n오른쪽 표는 제조사가 공식적으로 제시한 값인데, 저희 실측값과 비교해 보면 꽤 차이가 큽니다. 이유는 아래 박스에 정리했듯이, ISO 규격은 37도·습도 90%를 기준으로 하는데 저희 실습실은 상온 23도 정도였거든요. 온도가 낮으면 반응이 느려지니까, 이게 실측이 더 느리게 나온 주된 이유로 보입니다.\n\n[발표 팁] 출처: ISO 9917-1:2007 규격 원문(강의 자료 인용) 및 각 제품 설명서(Elite Cement 100 / Hy-Bond Carbo Plus / GC Fuji I, 첨부 설명서 원문 기준).");
}

// ---------- Slide 6: 실험 목적 및 시행 항목 ----------
{
  const s = baseSlide();
  titleBar(s, "실험 개요 · 01", "실험 목적 및 시행 항목");

  sectionLabel(s, "9월 22일 A분반 실험", MX, 1.65, 6);
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
    "분액비의 차이가 경화 시간에 미치는 영향",
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
  s.addNotes("[대본 3:30~4:15]\n오늘 실습은 ZPC를 중심으로 분액비를 정상, 15% 높게, 15% 낮게, 그리고 냉각판까지 네 조건으로 바꿔가며 setting time을 재고, 같은 재료로 film thickness도 측정했습니다. PC·GIC·RMGI는 정상 조건에서 setting time만 쟀고, ZOE는 시연만 진행했습니다.\n\n수업에서 제시된 실험 목적은 혼합 방법·점도 차이, 분액비가 경화시간에 미치는 영향, 냉각판의 의미, 그리고 재료별 특성을 확인하는 것이었습니다.\n\n[발표 팁] 출처: Notion 수업일지 9.22 (수복치과재료학실험) + 강의 슬라이드 「Aims of experiment」 원문. 수업 초반 하이브리드 콤포짓 Q&A는 지난 주 복습 성격이라 요약에서 제외, 오늘의 재료실험 파트만 정리함.");
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
    "Slide glass 2매 × 2 set",
    "Metal spatula, cotton swab",
    "Micrometer(두께 측정기)",
    "하중장치(150N, load compressor)",
  ], { x: x + 0.32, y: 2.3, w: cw - 0.64, h: 1.75, fontSize: 12.5 });
  {
    const pw = 2.9;
    photoCard(s, `${PHOTO_DIR}/photo_05.jpg`, x + (cw - pw) / 2, 4.15, { w: pw }, "피막도 측정 장치 (하중장치, 조립 전)");
  }
  pageNum(s, 7);
  s.addNotes("[대본 4:15~4:45]\n재료는 이렇게 구성했습니다. setting time 쪽은 시멘트 다섯 종류와 유리판, 스파툴라, 금속 몰드, indentor를 썼고, film thickness 쪽은 슬라이드글라스 두 장과 마이크로미터, 그리고 150N 하중을 가하는 장치를 사용했습니다.");
}

// ---------- Slide 8: 실험 방법 ① ----------
{
  const s = baseSlide();
  titleBar(s, "실험 개요 · 03", "실험 방법 ① — 분액비 조건 & Mixing 절차");

  sectionLabel(s, "① 분액비(P/L ratio) 조건", MX, 1.75, 6);
  const table1 = [
    ["재료", "조건", "Scoop / Drop"],
    ["ZPC", "정상 P/L", "3 / 15"],
    ["ZPC", "15% 높음(High)", "3 / 13"],
    ["ZPC", "15% 낮음(Low)", "3 / 18"],
    ["ZPC", "15% 높음 + 냉각판", "3 / 13"],
    ["PC", "정상 P/L", "3 / 9"],
    ["GIC", "정상 P/L", "3 / 6"],
    ["RMGI", "1:1 auto-mixing tip", "-"],
  ];
  dataTable(s, table1, { x: MX, y: 2.25, w: 6.1, h: 4.35, colW: [1.3, 3.0, 1.8], rowH: [0.5, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55], fontSize: 13.5 });

  sectionLabel(s, "② Mixing 절차 (공통)", MX + 6.4, 1.75, 5.53);
  bulletBlock(s, [
    "Powder를 scoop 수에 맞춰 먼저 덜어냄 (포션끼리 합치지 않음)",
    "Mix 시작 직전에 liquid를 방울 단위로 옆에 떨어뜨림",
    "떨어뜨린 liquid는 하나로 합쳐 넓게 폄",
    "Liquid 위로 powder를 나눠 첨가하며 혼합 (한꺼번에 X)",
    "가급적 빠른 시간 내에 혼합 완료",
  ], { x: MX + 6.4, y: 2.25, w: 3.0, h: 4.3, fontSize: 15, lineSpacingMultiple: 1.5 });
  photoCard(s, `${PHOTO_DIR}/photo_04.jpg`, MX + 9.6, 2.6, { w: 2.33 }, "Molding after Mixing");
  pageNum(s, 8);
  s.addNotes("[대본 4:45~5:20]\n분액비 조건은 표에 정리한 대로 scoop·drop 비율을 조정했고, 혼합은 분말을 먼저 덜어놓고 액체를 한 곳에 모은 뒤 나눠 넣는 순서로 진행했습니다.");
}

// ---------- Slide 9: 실험 방법 ② ----------
{
  const s = baseSlide();
  titleBar(s, "실험 개요 · 04", "실험 방법 ② — Setting time / Film thickness 측정");

  sectionLabel(s, "Setting time 측정 절차", MX, 1.8, 8.3);
  s.addText("검정 사각 금속 주형을 Al foil로 덮은 metal block에 올리고 mix 완료 재료를 채움 → 표준 혼합 시간 종료 후부터 indentor를 수직으로 5초간 압입, 30초 간격 반복 → 예상 경화 시점 30초 전부터 10초 간격으로 전환 → 완전한 원형 압흔이 안 남는 시점을 기록", {
    x: MX, y: 2.25, w: 8.3, h: 2.0, fontFace: BODY_FONT, fontSize: 15, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.45,
  });

  sectionLabel(s, "Film thickness 측정 절차", MX, 4.5, 8.3);
  s.addText("유리판 2매를 포개어 접촉 상태 두께 선측정(A) → 혼합 종료 cement 0.10mL을 유리판 사이 중앙에 위치 → 작업 시간 10초 전부터 하중 장치로 150N을 1분간 적용 → 재측정(B) → 피막도 = B − A", {
    x: MX, y: 4.95, w: 8.3, h: 1.7, fontFace: BODY_FONT, fontSize: 15, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.45,
  });

  photoCard(s, `${PHOTO_DIR}/photo_02.jpg`, MX + 8.7, 1.8, { w: 2.53 }, "Scene applying cement for measuring film thickness");

  s.addText("※ ISO 9917-1 규격 문서는 시멘트량을 0.1g으로 표기하나, 실제 강의 프로토콜은 0.10mL 기준 — 실질량은 유사한 것으로 간주한다.", {
    x: MX, y: 6.85, w: CW, h: 0.4, fontFace: BODY_FONT, fontSize: 10.5, italic: true, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.2,
  });
  pageNum(s, 9);
  s.addNotes("[대본 5:20~6:00]\n측정은, setting time의 경우 혼합 종료 90초 뒤부터 indentor로 30초 간격으로 눌러보다가 경화가 임박하면 10초 간격으로 좁혀서 완전한 원형 압흔이 안 남는 시점을 기록했고, film thickness는 유리판 두께를 먼저 재고(A) 시멘트를 끼운 뒤 150N을 10분간 가한 상태에서 다시 재서(B) 그 차이를 피막도로 계산했습니다.");
}

// ---------- Slide 10: 실험 결과 ----------
{
  const s = baseSlide();
  titleBar(s, "실험 결과 · 01", "조건별 경화 시간(setting time) 및 유리판 측정값");
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

  s.addText("※ Setting time(경화 시간) = Total time − Mixing time.\nZPC, PC, GIC는 표준 혼합 시간으로 간주. RMGI는 auto-mixing으로 0으로 간주.", {
    x: MX, y: 5.95, w: CW, h: 0.5, fontFace: BODY_FONT, fontSize: 11, italic: true, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.2,
  });
  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 6.5, w: CW, h: 0.55, rectRadius: 0.08, fill: { color: C.card }, line: { type: "none" } });
  s.addText("Setting time 빠른 순:  RMGI(6:24) < GIC(8:43) < PC(9:41) < ZPC 냉각판(12:03) < ZPC 15%↑(12:45) < ZPC 정상(16:20) < ZPC 15%↓(16:46)", {
    x: MX + 0.25, y: 6.5, w: CW - 0.5, h: 0.55, fontFace: BODY_FONT, fontSize: 12, bold: true, color: C.primary, valign: "middle", isTextBox: true, margin: 0,
  });
  pageNum(s, 10);
  s.addNotes("[대본 6:00~7:00]\n저희 조 실측 결과입니다. setting time이 빠른 순으로 보면 RMGI가 6분 24초로 가장 빨랐고, 그다음이 GIC, PC 순이었습니다. ZPC 네 조건 중에서는 15% 높음이 가장 빨랐고, 15% 낮음이 가장 느렸습니다.");
}

// ---------- Slide 11: 조별 데이터 종합 비교 ----------
{
  const s = baseSlide();
  titleBar(s, "실험 결과 · 02", "조별 데이터 종합 비교 — A분반");

  // 평균·SD는 Results.xlsx(9/29, A1~A6 6개조 원자료)를 분 단위로 정규화해 직접 재계산.
  // SD는 build.js에서 직접 그리지 않고, node build.js 이후 scripts/add_errorbars.py가
  // 이 순서 그대로 각 차트의 <c:errBars>로 주입함 — 두 배열의 순서를 반드시 맞출 것.
  const settingLabels = ["ZPC\n15%↓", "ZPC\n정상", "ZPC\n15%↑", "ZPC\n15%↑+냉각판", "PC\n정상", "GIC\n정상", "RMGI"];
  const settingAvgMin = [13.21, 11.22, 7.67, 10.12, 10.29, 6.08, 6.4];
  const settingAvgLabel = ["13:13", "11:13", "7:40", "10:07", "10:17", "6:05", "6:24*"];
  const settingSD = [4.02, 3.85, 2.73, 2.17, 4.04, 1.58, 0]; // RMGI: 취합 표에 항목 없어 A2조 단독값, SD=0

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
    valAxisMinVal: 0, valAxisMaxVal: 18,
    barGapWidthPct: 40,
  });
  s.addText(
    settingLabels.map((l, i) => `${l.replace("\n", " ")}: ${settingAvgLabel[i]}`).join("   ·   ") + "   (* RMGI는 취합 표에 setting time 항목 자체가 없어 A2조 단독 값)",
    { x: MX + 0.15, y: 5.15, w: 5.7, h: 0.4, fontFace: BODY_FONT, fontSize: 8.5, italic: true, color: C.muted, isTextBox: true, margin: 0 }
  );

  const ftLabels = ["ZPC\n15%↓", "ZPC\n정상", "ZPC\n15%↑", "ZPC\n15%↑+냉각판", "RMGI"];
  const ftAvg = [0.0352, 0.0470, 0.0492, 0.0123, 0.0152];
  const ftSD = [0.0433, 0.0531, 0.0727, 0.0072, 0.0040]; // Results.xlsx SD열 그대로

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
    valAxisMinVal: 0, valAxisMaxVal: 0.13,
    barGapWidthPct: 40,
  });

  s.addText(
    "※ Results.xlsx(9/29, A1~A6 6개조 원자료) 기준 재계산 — 오차 막대는 표준편차(SD) 1개. 막대가 길수록 조별 편차가 크다는 뜻. ZPC 15%↓·정상·15%↑ 세 조건의 Film thickness SD가 특히 큰 것은 한 조(A3)의 값이 다른 조 대비 3~10배 높게 나온 영향(0.117/0.153/0.196) — 같은 조의 냉각판 조건 값은 정상 범위라 측정·단위 오류 가능성 있음, 발표 전 해당 조에 재확인 권장. RMGI Setting time은 취합 표 자체에 항목이 없어 A2조 단독 값(6:24)만 반영, 오차 막대 없음.",
    { x: MX, y: 5.5, w: CW, h: 1.4, fontFace: BODY_FONT, fontSize: 9.5, italic: true, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.25 }
  );
  pageNum(s, 11);
  s.addNotes("[대본 7:00~8:00]\n이건 저희 조만이 아니라 A반 6개 조 데이터를 다 모아서 평균 낸 결과입니다. setting time 그래프를 보면 ZPC는 분액비가 높을수록(15%↑) 빨리 굳고 낮을수록(15%↓) 느리게 굳는 경향이 반 전체 평균에서도 비슷하게 나타났습니다. 막대 위에 그려진 세로선은 표준편차, 그러니까 조별로 값이 얼마나 흩어져 있는지를 보여주는 오차 막대입니다.\n\nfilm thickness 그래프를 보면 ZPC 세 조건 모두 오차 막대가 유독 긴 걸 볼 수 있는데요, 한 조(A3)의 값이 다른 조보다 3~10배 높게 나온 영향입니다. 같은 조의 냉각판 조건 값은 정상 범위였던 걸 보면 측정이나 단위 표기 과정에서 오류가 있었을 가능성이 있어 보이고, 이 부분은 참고용으로만 봐주시면 좋겠습니다.\n\n[발표 팁] 출처: Results.xlsx(반 전체 취합 데이터, 6개 조 A1~A6, 9/29 최종본). Notion 9.22 수업일지의 '보고서: 전체조 데이터 평균/비교' 지시에 따라 구성. 오차 막대(에러바)는 표준편차 1개 폭.");
}

// ---------- Slide 12: 조별 경향성 & 우리 조(A2) 위치 ----------
{
  const s = baseSlide();
  titleBar(s, "실험 결과 · 03", "조별 경향성 & 우리 조(A2) 위치");

  sectionLabel(s, "전체 조 경향성 (Setting time, 6개 조 평균)", MX, 1.55, CW);
  bulletBlock(s, [
    "분액비(P/L ratio)가 높을수록(15%↑) 평균 7:40으로 가장 빠르고, 낮을수록(15%↓) 13:13으로 가장 느림 — high < normal < low 순으로 느려질 것이라는 이론적 예측이 반 전체 데이터에서도 일관되게 확인됨",
    "재료 간 경향도 일관됨: GIC(6:05)·RMGI(6:24)가 가장 빠르고, ZPC 계열이 전반적으로 가장 느림 — 재료 자체의 반응 속도 차이가 조건 차이보다 더 크게 작용",
  ], { x: MX, y: 1.9, w: CW, h: 1.05, fontSize: 12, lineSpacingMultiple: 1.3 });

  sectionLabel(s, "우리 조(A2)는 전체 평균 대비 어디에 위치하는가", MX, 3.05, CW);
  bulletBlock(s, [
    "6개 조건 중 5개에서 전체 평균보다 느리게 경화 — 유일하게 PC 정상 조건만 평균과 거의 같음(평균 대비 −0.2 SD)",
    "편차가 가장 큰 조건은 ZPC 15%↑(+1.9 SD)와 GIC(+1.7 SD) — 우리 조가 indentor 판정 기준을 다른 조보다 보수적으로(늦게 경화로 판단) 적용했거나, 혼합 속도가 상대적으로 느렸을 가능성을 시사",
  ], { x: MX, y: 3.4, w: CW, h: 1.0, fontSize: 12, lineSpacingMultiple: 1.3 });

  const cmpTable = [
    ["조건", "전체 평균", "우리 조(A2)", "차이(SD 배수)"],
    ["ZPC 15%↓", "13:13", "16:46", "+0.9 SD"],
    ["ZPC 정상", "11:13", "16:20", "+1.3 SD"],
    ["ZPC 15%↑", "7:40", "12:45", "+1.9 SD"],
    ["ZPC 15%↑+냉각판", "10:07", "12:03", "+0.9 SD"],
    ["PC 정상", "10:17", "9:41", "−0.2 SD"],
    ["GIC 정상", "6:05", "8:43", "+1.7 SD"],
  ];

  // 비교 그래프 — 슬라이드 11과 같은 형식(막대+오차막대). "전체 평균" 시리즈에만
  // scripts/add_errorbars.py가 SD를 주입함(TREND_SD, chart3.xml) — 순서를 cmpTable과 맞출 것.
  const trendLabels = ["ZPC\n15%↓", "ZPC\n정상", "ZPC\n15%↑", "ZPC\n15%↑+냉각판", "PC\n정상", "GIC\n정상"];
  const trendOverallMean = [13.21, 11.22, 7.67, 10.12, 10.29, 6.08]; // = settingAvgMin[0..5] (슬라이드 11)
  const trendA2 = [16.77, 16.33, 12.75, 12.05, 9.68, 8.72]; // cmpTable "우리 조(A2)" 열을 분 단위로 환산

  card(s, MX, 4.5, CW, 2.45);
  s.addChart(pres.ChartType.bar, [
    { name: "전체 평균", labels: trendLabels, values: trendOverallMean },
    { name: "우리 조(A2)", labels: trendLabels, values: trendA2 },
  ], {
    x: MX + 0.2, y: 4.62, w: CW - 0.4, h: 1.75,
    barDir: "col", barGrouping: "clustered", barGapWidthPct: 35,
    showTitle: true, title: "Setting time — 전체 평균 vs 우리 조(A2)", titleFontSize: 12, titleColor: C.primary, titleFontFace: TITLE_FONT,
    showLegend: true, legendPos: "t", legendFontSize: 9, legendColor: C.muted,
    chartColors: [C.primary, C.accent],
    showValue: true, dataLabelFormatCode: "0.0", dataLabelPosition: "outEnd", dataLabelFontSize: 8.5, dataLabelColor: C.ink,
    catAxisLabelFontSize: 9, catAxisLabelColor: C.muted, catAxisLabelFontFace: BODY_FONT,
    valAxisLabelFontSize: 9, valAxisLabelColor: C.muted,
    valGridLine: { color: C.line, size: 0.75 }, catGridLine: { style: "none" },
    valAxisMinVal: 0, valAxisMaxVal: 20,
  });
  s.addText(
    "※ 오차 막대는 전체 평균의 표준편차(SD) 1개. " +
    cmpTable.slice(1).map((r) => `${r[0]} ${r[1]}→${r[2]}(${r[3]})`).join("  ·  "),
    { x: MX + 0.2, y: 6.44, w: CW - 0.4, h: 0.45, fontFace: BODY_FONT, fontSize: 7.5, italic: true, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.15 }
  );
  pageNum(s, 12);
  s.addNotes("[대본 8:00~8:50]\n이번엔 저희 조가 전체 평균과 비교해서 어디쯤 있는지를 짚어보겠습니다. 저희 조는 6개 조건 중 5개에서 전체 평균보다 느리게 경화됐습니다. 유일하게 PC 정상 조건만 평균과 거의 비슷했고요.\n\n특히 ZPC 15% 높음 조건과 GIC에서 편차가 가장 컸는데, 표준편차 기준으로 각각 1.9배, 1.7배 정도 평균에서 벗어나 있습니다. 저희가 indentor로 경화 여부를 판단할 때 다른 조보다 좀 더 보수적으로, 그러니까 조금 더 늦게 \"다 굳었다\"고 판단했거나, 혼합 속도 자체가 상대적으로 느렸을 가능성이 있다고 봅니다.\n\n[발표 팁] SD 배수 = (A2 값 − 전체 평균) ÷ 표준편차. 일반적으로 ±1 SD 이내면 정상 범위, 그 밖이면 눈에 띄는 편차로 해석. ZPC 15%↑·GIC 두 조건에서 A2가 유독 느린 이유는 Q&A에서 나올 수 있으니, 혼합 균질도·indentor 판정 시점 등 슬라이드 13(결과 해석)의 오차 요인과 연결지어 답변할 것.");
}

// ---------- Slide 13: 결과 해석 ① Setting time ----------
{
  const s = baseSlide();
  titleBar(s, "고찰 · 01", "결과 해석 ① — Setting Time");

  sectionLabel(s, "① P/L ratio와 경화 시간", MX, 1.7, CW);
  bulletBlock(s, [
    "이론: 분액비(P/L)가 높을수록 반응할 ZnO 양이 많아 겔 형성이 빠르고 점도가 증가 → 경화가 빨라짐 (high < normal < low 순으로 setting time이 길어질 것으로 예상)",
    "실측: 15%↑(setting 12:45)가 정상(setting 16:20)보다 빠르게 나온 점은 이론과 대체로 부합하나, 정상 조건이 예상보다 오래 걸림 — 혼합 균질도, 실험실 온습도, indentor 판정의 주관성 등이 오차 요인으로 추정",
  ], { x: MX, y: 2.1, w: CW, h: 1.5, fontSize: 13 });

  sectionLabel(s, "② 냉각판(frozen slab) 효과", MX, 3.75, CW);
  bulletBlock(s, [
    "이론: 온도가 낮을수록 분자 운동성·반응성이 저하되어 작업시간은 길어지고 경화 시간도 길어질 것으로 예상됨",
    "실측: 냉각판(setting 12:03)이 동일 조건 상온(setting 12:45)보다 오히려 짧게 나옴 — 예상과 반대 방향. 다만 작업시간(working time) 자체는 별도로 측정하지 못해 직접 비교는 어려움, 경화 시간만으로 임의 추정한 결과",
  ], { x: MX, y: 4.15, w: CW, h: 1.4, fontSize: 13 });

  sectionLabel(s, "③ 재료별 특성 · 제조사 공식 값과의 비교", MX, 5.7, CW);
  bulletBlock(s, [
    "RMGI(6:24)가 전 재료 중 가장 빠르게 경화 — auto-mixing으로 균질 혼합, 이중경화(dual-cure) 특성 영향으로 추정",
    "제조사 공식 값 대비 실측이 전반적으로 느림: ZPC(제조사 7:10 vs 실측 정상 16:20, 약 2.3배) · PC(제조사 4:00 vs 실측 9:41, 약 2.4배) · GIC(제조사 4:30 vs 실측 8:43, 약 1.9배) — ISO 표준 조건(37±1°C)이 아닌 상온(약 23°C)에서 실습했기 때문으로 추정",
  ], { x: MX, y: 6.1, w: CW, h: 1.3, fontSize: 12.5 });
  pageNum(s, 13);
  s.addNotes("[대본 8:50~9:35]\n먼저 분액비와 경화시간 관계를 보면, 이론상으로는 분액비가 높을수록 반응할 산화아연이 많아져서 빨리 굳어야 하는데, 저희 실측도 15% 높음이 정상보다 빠르게 나와서 이론과 대체로 맞았습니다. 다만 정상 조건 자체가 예상보다 오래 걸린 건, 혼합 균질도나 실험실 온습도, indentor 판정 시점의 주관성 같은 요인이 작용했을 것으로 봅니다.\n\n냉각판 효과는 저희 예상과 반대로 나왔는데요, 온도가 낮으면 반응이 느려져서 경화도 늦어질 거라 생각했지만, 실측은 오히려 상온보다 짧게 나왔습니다. 다만 저희가 작업시간을 따로 측정하지 못해서 경화시간만으로 비교한 한계가 있습니다.\n\n마지막으로 제조사 공식 값과 비교하면 전반적으로 실측이 1.9배에서 2.4배 정도 느린데, 이건 ISO 표준 조건인 37도가 아니라 상온에서 실습했기 때문으로 보입니다.\n\n[발표 팁] 참고 PPT(박수진 외, A반 5조) 고찰 구조를 참고해 재구성 — 다만 수치·조건은 오늘 A반 본인 실측 기준으로 새로 정리한 것.");
}

// ---------- Slide 14: 결과 해석 ② Film thickness (NEW) ----------
{
  const s = baseSlide();
  titleBar(s, "고찰 · 02", "결과 해석 ② — Film Thickness");

  sectionLabel(s, "① P/L ratio와 피막도", MX, 1.7, CW);
  bulletBlock(s, [
    "이론: 분액비(P/L)가 높을수록 반죽의 점도가 증가해 압착 시 유동성이 떨어지고, 그만큼 얇게 눌리지 못해 피막도가 커질 것으로 예상됨",
    "실측(반 평균): 이론과 부합 — 15%↓(0.035mm) < 정상(0.047mm) < 15%↑(0.049mm) 순으로 분액비가 높을수록 피막도 증가. 다만 세 조건 모두 표준편차가 매우 커서(한 조(A3)의 이상치 영향, 슬라이드 11 참고) 경향성 해석에는 주의가 필요함",
  ], { x: MX, y: 2.1, w: CW, h: 1.55, fontSize: 13 });

  sectionLabel(s, "② 냉각판·RMGI 효과, 그리고 우리 조(A2)의 위치", MX, 3.85, CW);
  bulletBlock(s, [
    "냉각판 조건은 반 평균 피막도(0.012mm)가 나머지 ZPC 조건보다 훨씬 얇게 나옴 — 낮은 온도가 압착 시 유동성을 오히려 개선했을 가능성(표본이 적어 단정하기는 어려움). RMGI(0.015mm)도 ZPC 대비 얇은 편 — 레진 개량형 특유의 낮은 초기 점도 영향으로 추정",
    "우리 조 실측은 ZPC 세 조건(정상·15%↑·15%↓) 모두 반 평균보다 얇게 나왔고(−0.5~−0.7 SD), 냉각판만 평균보다 두껍게 나옴(+1.1 SD) — Setting time과 마찬가지로 개인별 측정 판정 차이(글라스판 접촉 상태 확인, 하중 적용 타이밍 등)가 영향을 줬을 가능성을 고려할 수 있음",
  ], { x: MX, y: 4.23, w: CW, h: 2.0, fontSize: 13 });

  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 6.45, w: CW, h: 0.8, rectRadius: 0.08, fill: { color: "EAF2EE" }, line: { type: "none" } });
  s.addText([
    { text: "정리: ", options: { bold: true, color: C.primary } },
    { text: "Setting time과 마찬가지로 피막도도 분액비·냉각판 조건에 따라 유의한 차이를 보이며, 개별 조의 측정·판정 방식 차이가 재료 자체의 특성만큼이나 결과에 영향을 줄 수 있음을 시사함.", options: {} },
  ], { x: MX + 0.25, y: 6.58, w: CW - 0.5, h: 0.55, fontFace: BODY_FONT, fontSize: 11, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.25 });
  pageNum(s, 14);
  s.addNotes("[대본 9:35~10:10]\n피막도 결과도 짚고 가겠습니다. 이론상으로는 분액비가 높을수록 반죽이 되직해져서 압착할 때 잘 안 퍼지니까 피막도가 두꺼워질 거라 예상했는데, 반 평균을 보면 실제로 15% 낮음이 가장 얇고 15% 높음이 가장 두꺼워서 이론과 맞았습니다. 다만 세 조건 모두 표준편차가 워낙 커서, 이건 한 조의 이상치 영향이 크다는 걸 슬라이드 11에서 이미 말씀드렸으니 경향성만 참고해 주시면 됩니다.\n\n냉각판 조건은 반 평균이 오히려 가장 얇게 나왔고, RMGI도 ZPC보다 얇은 편이었습니다. 저희 조 실측은 ZPC 세 조건에서는 반 평균보다 얇게, 냉각판에서는 오히려 평균보다 두껍게 나왔는데, 이것도 setting time 때와 비슷하게 저희가 측정하는 과정에서 판정 기준이 다른 조와 조금 달랐을 가능성이 있다고 봅니다.\n\n[발표 팁] 슬라이드 11의 Film thickness 차트·각주(A3 이상치)를 화면에 띄워두고 같이 설명하면 좋음. SD가 커서 통계적으로 단정짓기 어렵다는 점을 솔직히 인정하고 넘어갈 것.");
}

// ---------- Slide 15: 결론 ----------
{
  const s = baseSlide();
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.primary }, line: { type: "none" } });
  s.addShape(pres.ShapeType.ellipse, { x: -2.5, y: H - 3.5, w: 6, h: 6, fill: { color: C.primaryDark }, line: { type: "none" } });
  s.addText("결론", { x: 0.9, y: 0.7, w: 6, h: 0.5, fontFace: BODY_FONT, fontSize: 14, bold: true, charSpacing: 1, color: C.accent, isTextBox: true, margin: 0 });
  s.addText("분액비·혼합 온도·재료 종류 모두 dental cement의 경화 시간과 피막도에 유의한 영향이 있다.", {
    x: 0.9, y: 1.25, w: 11.3, h: 1.3, fontFace: TITLE_FONT, fontSize: 26, bold: true, color: C.card, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  bulletBlock(s, [
    "분액비가 높을수록 경화 시간이 짧아지는 경향이 대체로 확인됨(일부 예외 존재 — 혼합·측정 오차 가능성)",
    "냉각판(저온) 조건은 이론상 경화 지연을 예상했으나 실측은 반대 — 작업시간·경화 시간을 분리 측정하지 못한 한계",
    "임상에서는 합착 목적·필요 작업시간에 따라 재료와 분액비를 조절해 사용해야 함 — 예: 빠른 경화가 필요하면 high P/L, 여유 있는 작업시간이 필요하면 low P/L 또는 냉각판 활용",
  ], { x: 0.9, y: 2.85, w: 11.3, h: 2.6, color: C.card, fontSize: 14 });
  pageNum(s, 15);
  s.addNotes("[대본 10:10~10:25]\n정리하면, 분액비와 혼합 온도, 재료 종류 모두 dental cement의 경화시간과 피막도에 유의한 영향을 줍니다. 임상에서는 이 특성을 이용해서, 빠른 경화가 필요하면 분액비를 높게, 여유 있는 작업시간이 필요하면 낮은 분액비나 냉각판을 활용하는 식으로 조절해서 쓸 수 있겠습니다.\n\n이상으로 발표를 마치겠습니다. 감사합니다.");
}

// ---------- Slide 16: 참고 문헌 ----------
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
  pageNum(s, 16);
  s.addNotes([
    "[예상 질문 메모]",
    "",
    "Q. 조별 취합 데이터에서 film thickness 값이 이상하게 튄 조(A3)는 어떻게 처리했나?",
    "→ 평균에는 그대로 반영했지만, 슬라이드 11에 측정·단위 오류 가능성이 있다고 명시해뒀다고 답하면 됩니다. 발표 전 실제로 해당 조에 값을 한 번 더 확인해두면 더 좋습니다.",
    "",
    "Q. 실측값이 제조사 공식 값보다 훨씬 느린 이유는 온도 하나뿐인가?",
    "→ 온도(37°C vs 23°C)가 가장 크지만, 습도(90% vs 통제 없음)도 함께 작용했을 가능성이 있고, indentor 판정 시점의 주관성, 개인별 혼합 속도 차이도 오차 요인으로 볼 수 있다고 답하면 됩니다.",
    "",
    "Q. 냉각판 조건이 이론과 반대로 나온 것을 어떻게 설명할 것인가?",
    "→ 작업시간(working time)을 따로 측정하지 못해 경화시간만으로 판단한 한계라고 솔직히 인정하는 게 가장 무난합니다. 냉각판은 분액비를 높게 쓰면서도 여유 있는 작업시간을 확보하기 위한 방법이라, 경화시간 자체보다 작업시간 지표로 봐야 더 정확한 비교가 될 것 같다고 덧붙이면 좋습니다.",
    "",
    "Q. 우리 조만 유독 느리게 나온 이유가 뭐라고 생각하는가?",
    "→ 가장 그럴듯한 설명은 indentor 판정 기준입니다. \"완전한 원형 압흔이 안 남는 시점\"이라는 기준 자체가 다소 주관적이라, 저희 조가 다른 조보다 조금 더 보수적으로(늦게) 판단했을 가능성이 있습니다. 혼합 속도나 실험실 내 위치별 온도 차이도 부차적 요인으로 들 수 있습니다.",
  ].join("\n"));
}

pres.writeFile({ fileName: "수복치과재료학실험_DentalCements_20260922.pptx" }).then(() => {
  console.log("done");
});
