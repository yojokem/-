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
pres.layout = "LAYOUT_WIDE";
const W = 13.33, H = 7.5;

function baseSlide(bg) {
  const s = pres.addSlide();
  s.background = { color: bg || C.paper };
  return s;
}

function titleBar(s, kicker, title) {
  s.addText(kicker, {
    x: 0.6, y: 0.45, w: 10, h: 0.4,
    fontFace: BODY_FONT, fontSize: 13, bold: true,
    color: C.secondary, charSpacing: 1, isTextBox: true, margin: 0,
  });
  s.addText(title, {
    x: 0.6, y: 0.82, w: 12.1, h: 1.0,
    fontFace: TITLE_FONT, fontSize: 28, bold: true,
    color: C.ink, isTextBox: true, margin: 0,
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
    x: 0.9, y: 1.55, w: 10, h: 0.5, fontFace: BODY_FONT, fontSize: 15, bold: true,
    color: C.accent, charSpacing: 1, isTextBox: true, margin: 0,
  });
  s.addText("코르티코스테로이드·비타민D·PGE2가\n교정 치아이동 가속 및 재발에 미치는 영향", {
    x: 0.9, y: 2.1, w: 11.3, h: 2.0, fontFace: TITLE_FONT, fontSize: 30, bold: true,
    color: C.white, isTextBox: true, margin: 0, lineSpacingMultiple: 1.2,
  });
  s.addText("원제  Three pharmacological agents for acceleratory orthodontic tooth movement and subsequent relapse: A randomized controlled animal study", {
    x: 0.9, y: 4.0, w: 11.3, h: 0.8, fontFace: BODY_FONT, fontSize: 12, italic: true,
    color: C.secondary, isTextBox: true, margin: 0, lineSpacingMultiple: 1.25,
  });

  s.addShape(pres.ShapeType.rect, { x: 0.9, y: 5.15, w: 11.3, h: 0.02, fill: { color: C.muted, transparency: 60 }, line: { type: "none" } });

  s.addText([
    { text: "저널  ", options: { bold: true, color: C.accent } },
    { text: "International Orthodontics, 2026;24:101112 (Elsevier)\n", options: { color: C.white } },
    { text: "발표자  ", options: { bold: true, color: C.accent } },
    { text: "김민성", options: { color: C.white } },
  ], { x: 0.9, y: 5.4, w: 8, h: 1.0, fontFace: BODY_FONT, fontSize: 14, isTextBox: true, margin: 0, lineSpacingMultiple: 1.4 });

  s.addNotes("발표 시작 인사. 이 연구는 동물실험(랫드)이라는 점을 처음부터 명확히 밝힐 것. 논문 출처(International Orthodontics, Elsevier, 프랑스교정학회 공식저널), 선정 사유(치과약리학1 20장 PGE2/COX 경로 + 구강생화학 '치아이동의 생화학적 변화' 학습목표와 직결)를 한 줄로 언급.");
}

// ---------- Slide 2: Background ----------
{
  const s = baseSlide();
  titleBar(s, "배경", "교정 치아이동 가속과 재발, 두 마리 토끼");

  const items = [
    ["재발(relapse)과 고정력 상실", "교정장치 제거 후 남아있던 결합력이 풀리면서 치아가 원래 위치로 돌아가려는 재발 현상 — 원인은 아직 명확히 규명되지 않음"],
    ["치아이동 가속의 필요성", "치료기간 단축을 위해 수술적·기계적·약리학적 방법으로 치아이동을 가속하는 연구가 활발 — 국소 약물주사·전신투여 모두 시도됨"],
    ["미해결 과제", "가속 효과를 낸 약물들이 보정(retention) 후 재발에 어떤 영향을 주는지는 선행연구가 거의 없음 — 이 연구가 처음으로 3개 약물의 재발까지 비교"],
  ];
  let y = 2.1;
  items.forEach(([h, d], i) => {
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y, w: 12.1, h: 1.35, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.secondary, width: 0.75, transparency: 70 }, shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 90 } });
    s.addShape(pres.ShapeType.ellipse, { x: 0.85, y: y + 0.35, w: 0.65, h: 0.65, fill: { color: C.primary }, line: { type: "none" } });
    s.addText(String(i + 1), { x: 0.85, y: y + 0.35, w: 0.65, h: 0.65, fontFace: TITLE_FONT, fontSize: 18, bold: true, color: C.white, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(h, { x: 1.75, y: y + 0.15, w: 4.6, h: 0.5, fontFace: TITLE_FONT, fontSize: 16, bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
    s.addText(d, { x: 6.5, y: y + 0.15, w: 5.9, h: 1.05, fontFace: BODY_FONT, fontSize: 13, color: C.muted, isTextBox: true, margin: 0, valign: "middle" });
    y += 1.55;
  });
  pageNum(s, 2);
  s.addNotes("치과약리학1 20장(PGE2/COX/NSAID)에서 배운 '교정력→PGE2→RANKL→파골세포' 경로를 거꾸로 이용해 '외부에서 이 경로를 촉진하면 치아이동을 가속할 수 있지 않을까'라는 발상으로 자연스럽게 연결.");
}

// ---------- Slide 3: Pharmacological mechanism ----------
{
  const s = baseSlide();
  titleBar(s, "약리기전", "세 약물, 서로 다른 경로로 파골세포를 깨우다");

  const rows = [
    ["코르티코스테로이드", "염증유전자 발현 억제 + 파골세포형성(osteoclastogenesis) 직접 자극 + 콜라게나아제 활성 증가 → 골흡수 강하게 촉진"],
    ["비타민D", "파골세포 활성 자체를 증가시키고 면역매개체를 조절 → 골개조 촉진. 골칼슘단백(osteocalcin)·비타민D수용체 유전자 발현에도 관여"],
    ["PGE2", "RANKL 매개 파골세포형성을 자극 + 국소 골흡수 강화 — 교정력이 만드는 내인성 경로(COX→PGE2→RANKL)를 외부에서 직접 보충하는 셈"],
  ];
  let y = 2.1;
  rows.forEach(([h, d]) => {
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y, w: 12.1, h: 1.35, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.secondary, width: 0.75, transparency: 70 }, shadow: { type: "outer", color: "000000", opacity: 0.1, blur: 5, offset: 2, angle: 90 } });
    s.addShape(pres.ShapeType.roundRect, { x: 0.85, y: y + 0.35, w: 2.5, h: 0.65, rectRadius: 0.3, fill: { color: C.primary, transparency: 88 }, line: { type: "none" } });
    s.addText(h, { x: 0.85, y: y + 0.35, w: 2.5, h: 0.65, fontFace: BODY_FONT, fontSize: 13.5, bold: true, color: C.primary, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(d, { x: 3.6, y: y + 0.15, w: 8.8, h: 1.05, fontFace: BODY_FONT, fontSize: 12.5, color: C.ink, isTextBox: true, margin: 0, valign: "middle", lineSpacingMultiple: 1.25 });
    y += 1.55;
  });
  s.addText("→ 세 약물 모두 '파골세포 활성화'라는 종착점은 같지만, 도달 경로(직접 자극 vs RANKL 매개 vs 면역조절)가 달라 가속 강도와 부작용(재발)이 다르게 나타남", {
    x: 0.6, y: 6.6, w: 12.1, h: 0.6, fontFace: BODY_FONT, fontSize: 12.5, italic: true, color: C.primary, isTextBox: true, margin: 0,
  });
  pageNum(s, 3);
  s.addNotes("구강생화학 '뼈와 치아의 석회화, 혈청칼슘 항상성' 챕터에서 배운 칼슘/인 대사 조절호르몬(비타민D, PTH 등) 내용과 연결지어 설명하면 좋음.");
}

// ---------- Slide 4: Prior evidence ----------
{
  const s = baseSlide();
  titleBar(s, "선행연구 비교", "왜 결과가 엇갈리는가, 그리고 이 연구의 공백");

  const rows = [
    ["코르티코스테로이드", "Baofeng·Abtahi 등은 골흡수·파골세포형성 증가로 가속 보고 / 반대로 Yamane·Molina 등은 오히려 치아이동 감소 보고", C.muted],
    ["비타민D", "Gowda·Varughese·Al-Attar·Moradinejad 등 다수가 골개조 증가·염증성 사이토카인 감소로 가속 효과 일관되게 보고", C.accent],
    ["PGE2", "Kale·Cağlaroğlu·Seifi 등이 RANKL 발현·파골활성 증가 보고 — 'PGE2 효과 없음'을 보고한 연구는 없음(저자 확인)", C.accent],
  ];
  let y = 2.3;
  rows.forEach(([label, res, color]) => {
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y, w: 12.1, h: 1.2, rectRadius: 0.06, fill: { color: C.white }, line: { type: "none" }, shadow: { type: "outer", color: "000000", opacity: 0.1, blur: 5, offset: 2, angle: 90 } });
    s.addText(label, { x: 0.95, y: y + 0.12, w: 3.0, h: 0.95, fontFace: BODY_FONT, fontSize: 13.5, bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
    s.addText(res, { x: 4.2, y: y + 0.12, w: 8.2, h: 0.95, fontFace: BODY_FONT, fontSize: 12, color: color === C.muted ? C.muted : "047857", isTextBox: true, margin: 0, valign: "middle" });
    y += 1.4;
  });

  s.addText("→ 저자들은 상반된 결과가 연구기간(1-2주 vs 8주)·용량·가해진 힘·표본수 차이에서 온다고 설명. 무엇보다 '재발(relapse)까지 세 약물을 나란히 비교한 연구는 이번이 최초' — 이것이 이 논문의 진짜 공백", {
    x: 0.6, y: 6.55, w: 12.1, h: 0.7, fontFace: BODY_FONT, fontSize: 12.5, italic: true, color: C.primary, isTextBox: true, margin: 0,
  });
  pageNum(s, 4);
  s.addNotes("원문 Discussion 'Comparison with previous studies' 문단 그대로 재구성. 코르티코스테로이드만 문헌 간 결과가 정반대인 이유(연구기간·용량 차이)를 짚으면 비평적 고찰과 자연스럽게 연결됨.");
}

// ---------- Slide 5: Objective & Hypothesis ----------
{
  const s = baseSlide(C.primary);
  s.addText("목적 및 가설", { x: 0.6, y: 0.45, w: 10, h: 0.4, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.accent, charSpacing: 1, isTextBox: true, margin: 0 });
  s.addText("연구 목적 및 가설", { x: 0.6, y: 0.82, w: 12, h: 0.9, fontFace: TITLE_FONT, fontSize: 28, bold: true, color: C.white, isTextBox: true, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 2.1, w: 12.1, h: 1.9, rectRadius: 0.1, fill: { color: C.white, transparency: 8 }, line: { type: "none" } });
  s.addText("연구 목적", { x: 1.0, y: 2.35, w: 4, h: 0.4, fontFace: BODY_FONT, fontSize: 14, bold: true, color: C.accent, isTextBox: true, margin: 0 });
  s.addText("랫드 모델에서 코르티코스테로이드·비타민D·PGE2의 국소(점막하) 주입이 교정 치아이동 가속 및 보정 후 재발에 미치는 영향을 비교한다. (귀무가설: 세 약물 간 가속기·재발기 효과에 차이가 없다)", {
    x: 1.0, y: 2.8, w: 11.3, h: 1.1, fontFace: BODY_FONT, fontSize: 14.5, color: C.white, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });

  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 4.3, w: 12.1, h: 1.9, rectRadius: 0.1, fill: { color: C.accent }, line: { type: "none" } });
  s.addText("가설 (H1)", { x: 1.0, y: 4.55, w: 4, h: 0.4, fontFace: BODY_FONT, fontSize: 14, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText("세 약물 모두 대조군보다 치아이동을 가속하되, 가속 정도가 큰 약물일수록 보정 후 재발량도 클 것이다 (가속-재발 트레이드오프).", {
    x: 1.0, y: 5.0, w: 11.3, h: 1.0, fontFace: BODY_FONT, fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  pageNum(s, 5);
  s.addNotes("이 가설은 저자들의 공식 가설이 아니라 발표자가 결과 패턴(코르티코스테로이드=최대가속·최대재발, PGE2=최소가속·최소재발)을 보고 재구성한 것임을 언급.");
}

// ---------- Slide 6: Methods ----------
{
  const s = baseSlide();
  titleBar(s, "연구방법", "5군 랫드 모델, 4주 가속 + 2주 보정 + 2주 재발");

  const cards = [
    ["설계", "무작위배정, 눈가림(2번 저자),\n랫드 105마리 → 5군(군당 21마리)"],
    ["군 구성", "I 음성대조(무처치) · II 양성대조(장치만)\nIII 코르티코스테로이드 · IV 비타민D · V PGE2"],
    ["개입 (점막하 주입)", "III: 코르티코스테로이드 8mg/kg 매일\nIV: 비타민D 10⁻¹⁰mol/L 3일마다\nV: PGE2 0.1μg 매주"],
  ];
  let x = 0.6;
  const cw = 3.95, gap = 0.2;
  cards.forEach(([h, d]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.05, w: cw, h: 3.3, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.secondary, width: 1, transparency: 75 }, shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 90 } });
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.3, y: 2.35, w: cw - 0.6, h: 0.55, rectRadius: 0.28, fill: { color: C.primary, transparency: 88 }, line: { type: "none" } });
    s.addText(h, { x: x + 0.3, y: 2.35, w: cw - 0.6, h: 0.55, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.primary, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(d, { x: x + 0.25, y: 3.05, w: cw - 0.5, h: 2.15, fontFace: BODY_FONT, fontSize: 13, color: C.ink, align: "center", valign: "middle", isTextBox: true, margin: 0, lineSpacingMultiple: 1.3 });
    x += cw + gap;
  });

  s.addText("장치: 상악 절치 사이에 스테인리스 open-coil loop(25g 힘, tipping 이동) · 측정: 디지털캘리퍼(0.01mm)로 절치 간 거리 · 조직: PDL 폭, ALP·TRAP 염색(조골·파골세포 활성)", {
    x: 0.6, y: 5.55, w: 12.1, h: 0.85, fontFace: BODY_FONT, fontSize: 12.5, bold: true, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  s.addText("일정: 가속기 4주 → 보정기 2주(장치 재부착, passive) → 재발기 2주(장치 완전 제거)", {
    x: 0.6, y: 6.5, w: 12.1, h: 0.5, fontFace: BODY_FONT, fontSize: 12.5, italic: true, color: C.primary, isTextBox: true, margin: 0,
  });
  pageNum(s, 6);
  s.addNotes("동물실험이므로 Q&A에서 '왜 랫드를 썼나' 물으면 '골개조·치아이동을 통제된 조건에서 관찰하기 위해 — 사람 대상으론 이 정도의 개입·조직검사가 불가능'이라고 답변.");
}

// ---------- Slide 7: Results - acceleration ----------
{
  const s = baseSlide();
  titleBar(s, "결과 ①", "가속기(4주) — 치아이동량 비교");

  const stats = [
    ["6.22 ± 0.90", "mm · 코르티코스테로이드", C.primary],
    ["3.44 ± 0.04", "mm · 비타민D", C.secondary],
    ["2.54 ± 0.13", "mm · PGE2", C.accent],
  ];
  let x = 0.6;
  const cw = 3.9;
  stats.forEach(([num, label, color]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.95, w: cw, h: 2.0, rectRadius: 0.12, fill: { color: C.white }, line: { type: "none" }, shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 90 } });
    s.addText(num, { x, y: 2.15, w: cw, h: 1.0, fontFace: TITLE_FONT, fontSize: 30, bold: true, color, align: "center", isTextBox: true, margin: 0 });
    s.addText(label, { x, y: 3.15, w: cw, h: 0.6, fontFace: BODY_FONT, fontSize: 13.5, bold: true, color: C.ink, align: "center", isTextBox: true, margin: 0 });
    x += cw + 0.2;
  });
  s.addText("→ 대조군(장치만, 1.03±0.11mm) 대비 세 약물 모두 유의하게 가속(p<0.001). 가속 순위: 코르티코스테로이드 > 비타민D > PGE2 — 조직검사(ALP·TRAP)에서도 같은 순서로 파골세포 활성 확인", {
    x: 0.6, y: 4.15, w: 12.1, h: 0.55, fontFace: BODY_FONT, fontSize: 13, italic: true, color: C.primary, isTextBox: true, margin: 0,
  });

  const table = [
    [{ text: "군", options: { bold: true, color: C.white, fill: { color: C.primary } } }, { text: "양성대조", options: { bold: true, color: C.white, fill: { color: C.primary } } }, { text: "코르티코스테로이드", options: { bold: true, color: C.white, fill: { color: C.primary } } }, { text: "비타민D", options: { bold: true, color: C.white, fill: { color: C.primary } } }, { text: "PGE2", options: { bold: true, color: C.white, fill: { color: C.primary } } }],
    ["4주 후 이동량 (직후 대비 증가분)", "1.03 ± 0.11 mm", "6.22 ± 0.90 mm", "3.44 ± 0.04 mm", "2.54 ± 0.13 mm"],
  ];
  s.addTable(table, {
    x: 0.6, y: 4.9, w: 12.1, h: 1.3, fontFace: BODY_FONT, fontSize: 12, color: C.ink,
    border: { type: "solid", color: "D8E8E6", pt: 1 }, autoPage: false, valign: "middle", align: "center",
  });
  s.addText("모든 군간 비교 p<0.001 (One-way ANOVA + Tukey)", { x: 0.6, y: 6.35, w: 12.1, h: 0.4, fontFace: BODY_FONT, fontSize: 11.5, color: C.muted, isTextBox: true, margin: 0 });
  pageNum(s, 7);
  s.addNotes("원문 Table I·II 기준. 보정기(2주) 동안은 모든 군에서 유의한 변화 없음(장치를 다시 수동적으로 부착해 이동량을 '고정') — 질문 나오면 이 부분도 설명 가능.");
}

// ---------- Slide 8: Results - relapse ----------
{
  const s = baseSlide();
  titleBar(s, "결과 ②", "재발기(2주) — 가속이 컸던 약물이 더 많이 되돌아간다");

  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 2.05, w: 5.85, h: 4.3, rectRadius: 0.1, fill: { color: C.white }, line: { type: "none" }, shadow: { type: "outer", color: "000000", opacity: 0.1, blur: 5, offset: 2, angle: 90 } });
  s.addText("2주 재발 후 이동량 변화 (T0 대비)", { x: 0.95, y: 2.3, w: 5.2, h: 0.5, fontFace: TITLE_FONT, fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText([
    { text: "양성대조  ", options: { bold: true, color: C.primary } }, { text: "-1.09 ± 0.17 mm\n", options: {} },
    { text: "코르티코스테로이드  ", options: { bold: true, color: C.primary } }, { text: "-5.07 ± 0.87 mm  (최대 재발)\n", options: { bold: true } },
    { text: "비타민D  ", options: { bold: true, color: C.primary } }, { text: "-2.75 ± 0.15 mm\n", options: {} },
    { text: "PGE2  ", options: { bold: true, color: C.primary } }, { text: "-0.86 ± 0.23 mm  (양성대조와 통계적 동률 최소)", options: { bold: true } },
  ], { x: 0.95, y: 2.9, w: 5.2, h: 3.3, fontFace: BODY_FONT, fontSize: 13.5, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.5 });
  s.addText("* 양성대조 vs PGE2 재발량 차이는 통계적으로 유의하지 않음 (p=0.605) — Appendix 참고", {
    x: 0.95, y: 5.95, w: 5.2, h: 0.35, fontFace: BODY_FONT, fontSize: 10, italic: true, color: C.muted, isTextBox: true, margin: 0,
  });

  s.addShape(pres.ShapeType.roundRect, { x: 6.85, y: 2.05, w: 5.85, h: 4.3, rectRadius: 0.1, fill: { color: C.ink }, line: { type: "none" } });
  s.addText("조직학적 소견", { x: 7.2, y: 2.3, w: 5.2, h: 0.5, fontFace: TITLE_FONT, fontSize: 15, bold: true, color: C.accent, isTextBox: true, margin: 0 });
  s.addText([
    { text: "치주인대(PDL) 폭이 ", options: {} },
    { text: "코르티코스테로이드군에서 가장 넓게 유지", options: { bold: true, color: C.accent } },
    { text: "(압박·긴장측 모두) — 대조군이 가장 좁음, 비타민D·PGE2군은 중간 수준. 임상측정 결과와 조직 소견이 서로를 뒷받침.", options: {} },
  ], { x: 7.2, y: 2.9, w: 5.2, h: 3.3, fontFace: BODY_FONT, fontSize: 13.5, color: C.white, isTextBox: true, margin: 0, lineSpacingMultiple: 1.45 });
  pageNum(s, 8);
  s.addNotes("가속량이 클수록(코르티코스테로이드) 재발량도 크고, 가속량이 작을수록(PGE2) 재발도 작다는 '가속-재발 트레이드오프' 패턴이 핵심 메시지. 원문 Table VI·VII, Table VIII·IX 기준.");
}

// ---------- Slide 9: Critical appraisal ----------
{
  const s = baseSlide();
  titleBar(s, "비평적 고찰", "비평적 고찰 (본인 의견 작성)");

  const cols = [
    ["강점", [
      "· 가속기+보정기+재발기를 모두 추적한 최초의 3약물 비교 — 선행연구 공백을 직접 채움",
      "· 임상측정(캘리퍼)+조직학(PDL폭, ALP/TRAP)으로 이중 검증",
      "· ARRIVE 가이드라인 준수, 윤리위 승인, 눈가림 배정",
      "· 공공연구비(만수라대) 지원, 이해상충 없음",
    ]],
    ["한계 / Bias 위험", [
      "· 동물(랫드)실험 — 종간 차이로 사람에 그대로 적용 어려움(저자도 인정)",
      "· 수컷만 사용 — 호르몬 변동은 배제했지만 여성 적용 가능성은 미확인",
      "· 약물당 용량 1개만 테스트 — 용량-반응 관계 분석 불가",
      "· 코르티코스테로이드 결과가 일부 선행연구와 정반대 — 재현성 논쟁 여지",
    ]],
    ["임상 적용 가능성", [
      "· 코르티코스테로이드는 가속 효과 크지만 재발 위험도 가장 큼 — 신중한 임상 판단 필요",
      "· 비타민D·PGE2는 가속은 온건해도 재발이 적어 상대적으로 안전한 보조제일 수 있음",
      "· PGE2는 고용량 시 치근흡수 위험 보고 있음(타 문헌) — 안전성-효능 균형 필요",
      "  → 사람 대상 임상시험으로의 확장이 다음 단계",
    ]],
  ];
  let x = 0.6;
  const cw = 3.95;
  cols.forEach(([h, lines]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.1, w: cw, h: 4.5, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.accent, width: 1.25, dashType: "dash" } });
    s.addText(h, { x: x + 0.3, y: 2.35, w: cw - 0.6, h: 0.5, fontFace: TITLE_FONT, fontSize: 16, bold: true, color: C.primary, isTextBox: true, margin: 0 });
    s.addText(lines.map((t, i) => ({ text: t, options: { breakLine: i < lines.length - 1 } })),
      { x: x + 0.3, y: 2.95, w: cw - 0.6, h: 2.9, fontFace: BODY_FONT, fontSize: 11, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3 });
    s.addText("(발표 시 본인 의견 추가)", { x: x + 0.3, y: 5.95, w: cw - 0.6, h: 0.3, fontFace: BODY_FONT, fontSize: 10.5, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    for (let i = 0; i < 2; i++) {
      s.addShape(pres.ShapeType.line, { x: x + 0.3, y: 6.3 + i * 0.45, w: cw - 0.6, h: 0, line: { color: C.muted, width: 0.75, transparency: 40, dashType: "dash" } });
    }
    x += cw + 0.2;
  });
  pageNum(s, 9);
  s.addNotes("동물실험이라는 한계를 정면으로 짚어주는 게 신뢰도를 높임 — 숨기지 말고 먼저 말할 것. 코르티코스테로이드의 상반된 선행연구 결과는 발표 중 Q&A로 넘어가기 좋은 지점.");
}

// ---------- Slide 10: Take-home ----------
{
  const s = baseSlide(C.primary);
  s.addShape(pres.ShapeType.ellipse, { x: -3, y: -3, w: 8, h: 8, fill: { color: C.secondary, transparency: 60 }, line: { type: "none" } });
  s.addText("핵심 결론", { x: 0.9, y: 1.6, w: 10, h: 0.4, fontFace: BODY_FONT, fontSize: 13, bold: true, color: C.accent, charSpacing: 1, isTextBox: true, margin: 0 });
  s.addText("치아이동을 가장 많이 가속하는 약물이,\n보정 후 가장 많이 되돌아가기도 한다.", {
    x: 0.9, y: 2.15, w: 11.3, h: 2.0, fontFace: TITLE_FONT, fontSize: 27, bold: true, color: C.white, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  s.addText("코르티코스테로이드=최대가속·최대재발 / PGE2=최소가속·최소재발 / 비타민D=중간 — '빠른 이동'과 '안정적 결과' 사이의 트레이드오프를 보여준 첫 3약물 비교 연구", {
    x: 0.9, y: 4.3, w: 11.3, h: 0.9, fontFace: BODY_FONT, fontSize: 14, italic: true, color: C.paper, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  pageNum(s, 10);
  s.addNotes("치과약리학1 20장(PGE2/COX)과 구강생화학(치아이동의 생화학) 두 과목 내용이 이 논문 하나로 이어진다는 점을 다시 언급하며 마무리. Q&A로 전환.");
}

// ---------- Slide 11: Q&A ----------
{
  const s = baseSlide(C.ink);
  s.addText("질의응답", { x: 0.9, y: 2.9, w: 11, h: 1.3, fontFace: TITLE_FONT, fontSize: 54, bold: true, color: C.white, isTextBox: true, margin: 0 });
  s.addText("감사합니다", { x: 0.9, y: 4.1, w: 8, h: 0.6, fontFace: BODY_FONT, fontSize: 18, color: C.accent, isTextBox: true, margin: 0 });
  s.addNotes([
    "예상 질문 1: 동물실험 결과를 사람에게 그대로 적용할 수 있는가?",
    "예상 질문 2: 코르티코스테로이드 결과가 일부 선행연구(Yamane, Molina 등)와 정반대인데, 이 연구가 더 신뢰할 만한 이유는?",
    "예상 질문 3: 왜 세 약물의 용량을 하나씩만 테스트했는가? 용량을 늘리면 결과가 달라질 수 있지 않은가?",
    "예상 질문 4: PGE2가 치근흡수를 유발할 수 있다는데, 이 연구에서는 그런 부작용을 확인했는가?",
    "예상 질문 5: 암컷 랫드는 왜 제외했는가? 성별에 따라 결과가 다를 가능성은?",
  ].join("\n"));
}

// ---------- Slide 12: Appendix A - Q&A backup (relapse "lowest" statistical nuance) ----------
{
  const s = baseSlide();
  s.addText("APPENDIX A · Q&A 백업", {
    x: 0.6, y: 0.45, w: 10, h: 0.4, fontFace: BODY_FONT, fontSize: 13, bold: true,
    color: C.secondary, charSpacing: 1, isTextBox: true, margin: 0,
  });
  s.addText("재발이 '가장 적은' 군은 대조군도 PGE2군도 아닌, 둘의 통계적 동률이다", {
    x: 0.6, y: 0.82, w: 12.1, h: 1.0, fontFace: TITLE_FONT, fontSize: 24, bold: true,
    color: C.ink, isTextBox: true, margin: 0,
  });

  const table = [
    [
      { text: "", options: { bold: true, color: C.white, fill: { color: C.primary } } },
      { text: "양성대조(CPG)", options: { bold: true, color: C.white, fill: { color: C.primary } } },
      { text: "PGE2(PGE2G)", options: { bold: true, color: C.white, fill: { color: C.primary } } },
      { text: "비타민D(VDG)", options: { bold: true, color: C.white, fill: { color: C.primary } } },
      { text: "코르티코스테로이드(COG)", options: { bold: true, color: C.white, fill: { color: C.primary } } },
    ],
    ["2주 재발량 (T0 대비)", "-1.09 ± 0.17 mm", "-0.86 ± 0.23 mm", "-2.75 ± 0.15 mm", "-5.07 ± 0.87 mm"],
    ["원문 유의성 문자", "a", "a", "b", "c"],
  ];
  s.addTable(table, {
    x: 0.6, y: 2.05, w: 12.1, h: 1.1, fontFace: BODY_FONT, fontSize: 11.5, color: C.ink,
    border: { type: "solid", color: "D8E8E6", pt: 1 }, autoPage: false, valign: "middle", align: "center",
  });
  s.addText("같은 문자(a, a)는 그 두 군 사이에 통계적 유의차가 없다는 뜻 (Table III, Tukey post-hoc)", {
    x: 0.6, y: 3.25, w: 12.1, h: 0.4, fontFace: BODY_FONT, fontSize: 11, italic: true, color: C.muted, isTextBox: true, margin: 0,
  });

  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 3.85, w: 12.1, h: 1.5, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.accent, width: 1, transparency: 60 }, shadow: { type: "outer", color: "000000", opacity: 0.1, blur: 5, offset: 2, angle: 90 } });
  s.addText([
    { text: "핵심 수치:  ", options: { bold: true, color: C.primary } },
    { text: "양성대조 vs PGE2군의 2주 재발량 차이는 통계적으로 유의하지 않음 (p = 0.605, Table III). 반면 비타민D·코르티코스테로이드는 서로 및 위 두 군과 모두 유의하게 다름(p<0.001).", options: { color: C.ink } },
  ], { x: 0.95, y: 4.05, w: 11.4, h: 1.15, fontFace: BODY_FONT, fontSize: 13.5, isTextBox: true, margin: 0, lineSpacingMultiple: 1.35 });

  s.addText("→ 통계적으로 유의미한 계층 구조:  {양성대조, PGE2} < 비타민D < 코르티코스테로이드  (재발 적은 순)", {
    x: 0.6, y: 5.55, w: 12.1, h: 0.5, fontFace: BODY_FONT, fontSize: 14, bold: true, color: C.primary, isTextBox: true, margin: 0,
  });
  s.addText("원문 안에서도 서술이 갈린다 — Results 본문·Conclusions는 \"PGE2가 최소 재발\"이라 쓰고, Discussion \"Interpretation of findings\"는 \"대조군이 최소, 그 다음 PGE2\"라고 씀. 둘 다 raw mean 순위 서술과 통계적 유의성 서술을 섞어 쓴 단순화이며, 정확한 결론은 위 표와 같이 '대조군·PGE2군 통계적 동률'이다.", {
    x: 0.6, y: 6.15, w: 12.1, h: 1.1, fontFace: BODY_FONT, fontSize: 11.5, color: C.muted, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  pageNum(s, 12);
  s.addNotes("Q&A 대비용 백업 슬라이드. 교수가 '원문 Discussion엔 대조군이 최저라고 되어있는데?' 라고 물으면 이 슬라이드를 띄우고: (1) Table III의 p3(CPG vs PGE2G)=0.605로 두 군이 통계적으로 구분 안 됨을 보여주고, (2) 원문 스스로도 Results/Conclusion과 Discussion에서 서술이 갈린다는 점을 지적하며, (3) '정확히는 대조군과 PGE2군이 재발 억제 면에서 통계적으로 동급'이라고 답변할 것. 임상적으로는 'PGE2가 가속 효과를 내면서도 재발은 무처치 수준으로 억제한다'는 게 이 발견의 가장 흥미로운 지점.");
}

pres.writeFile({ fileName: "치과약리학실험2_논문발표.pptx" }).then(() => {
  console.log("done");
});
