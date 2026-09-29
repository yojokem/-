const pptxgen = require("pptxgenjs");

const TITLE_FONT = "맑은 고딕";
const BODY_FONT = "맑은 고딕";
const SERIF_FONT = "Cambria";

// palette — deep clinical blue + warm amber accent (bone/orthodontic tone)
const C = {
  primary: "1B4965",     // deep blue
  primaryDark: "102C3A",
  secondary: "3D7EA6",   // mid blue
  accent: "D97706",      // amber (used for corticosteroid / danger signal)
  ink: "16232E",
  paper: "F5F6F8",       // neutral cool gray background
  card: "FFFFFF",
  muted: "5B6B7A",
  line: "E1E5EA",
};

// categorical drug colors — reused across every chart/callout in the deck
const DRUG = {
  control: "9AA5B1",     // gray — positive control (CPG)
  cortico: "D97706",     // amber — corticosteroid (COG) — biggest accel & biggest relapse
  vitD: "3D7EA6",        // blue — vitamin D (VDG)
  pge2: "2F855A",        // green — PGE2 (PGE2G) — mildest, safest
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
const W = 13.33, H = 7.5;
const MX = 0.7;
const CW = W - MX * 2;

function baseSlide(bg) {
  const s = pres.addSlide();
  s.background = { color: bg || C.paper };
  return s;
}

function titleBar(s, kicker, title, opts = {}) {
  const dark = !!opts.dark;
  s.addText(kicker, {
    x: MX, y: 0.4, w: CW, h: 0.32,
    fontFace: BODY_FONT, fontSize: 12, bold: true, charSpacing: 1,
    color: dark ? C.accent : C.secondary, isTextBox: true, margin: 0,
  });
  s.addText(title, {
    x: MX, y: 0.7, w: CW, h: 0.7,
    fontFace: TITLE_FONT, fontSize: 24, bold: true,
    color: dark ? C.card : C.primary, isTextBox: true, margin: 0,
  });
}

function pageNum(s, n) {
  s.addText(String(n), {
    x: W - 0.9, y: H - 0.5, w: 0.5, h: 0.35,
    fontFace: SERIF_FONT, fontSize: 11, color: C.muted, align: "right", isTextBox: true, margin: 0,
  });
}

function sectionLabel(s, text, x, y, w, color) {
  s.addText(text, { x, y, w, h: 0.38, fontFace: TITLE_FONT, fontSize: 14.5, bold: true, color: color || C.primary, isTextBox: true, margin: 0 });
}

function bulletBlock(s, items, opts) {
  s.addText(
    items.map((t, i) => ({ text: "•  " + t, options: { breakLine: i < items.length - 1 } })),
    Object.assign({ fontFace: BODY_FONT, fontSize: 13, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.4, valign: "top" }, opts)
  );
}

function card(s, x, y, w, h, fill) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.1, fill: { color: fill || C.card }, line: { type: "none" },
    shadow: { type: "outer", color: "16232E", opacity: 0.1, blur: 6, offset: 2, angle: 90 },
  });
}

function statCallout(s, x, y, w, h, num, label, color) {
  card(s, x, y, w, h);
  s.addText(num, { x, y: y + 0.25, w, h: h * 0.55, fontFace: TITLE_FONT, fontSize: 40, bold: true, color, align: "center", isTextBox: true, margin: 0 });
  s.addText(label, { x, y: y + h - 0.6, w, h: 0.5, fontFace: BODY_FONT, fontSize: 14, bold: true, color: C.ink, align: "center", isTextBox: true, margin: 0 });
}

// ---------- Slide 1: Title ----------
{
  const s = baseSlide(C.primaryDark);
  s.addShape(pres.ShapeType.ellipse, { x: 9.4, y: -2.3, w: 7, h: 7, fill: { color: C.primary, transparency: 45 }, line: { type: "none" } });
  s.addShape(pres.ShapeType.ellipse, { x: -2.6, y: 4.6, w: 5.5, h: 5.5, fill: { color: C.secondary, transparency: 60 }, line: { type: "none" } });

  s.addText("치과약리학실험2 · 논문 발표", {
    x: 0.9, y: 1.55, w: 10, h: 0.45, fontFace: BODY_FONT, fontSize: 15, bold: true,
    color: C.accent, charSpacing: 1, isTextBox: true, margin: 0,
  });
  s.addText("Three Pharmacological Agents for Acceleratory\nOrthodontic Tooth Movement and Subsequent Relapse", {
    x: 0.9, y: 2.05, w: 11.3, h: 1.9, fontFace: TITLE_FONT, fontSize: 27, bold: true,
    color: C.card, isTextBox: true, margin: 0, lineSpacingMultiple: 1.25,
  });
  s.addText("A Randomized Controlled Animal Study — 코르티코스테로이드 · 비타민D · PGE₂ 비교", {
    x: 0.9, y: 4.0, w: 11.3, h: 0.5, fontFace: BODY_FONT, fontSize: 16, italic: true,
    color: "AECBDC", isTextBox: true, margin: 0,
  });

  s.addText([
    { text: "저널  ", options: { bold: true, color: C.accent } },
    { text: "International Orthodontics, 2026;24:101112 (Elsevier)\n", options: { color: C.card } },
    { text: "저자  ", options: { bold: true, color: C.accent } },
    { text: "Hamed SA, et al. (Mansoura University, Egypt)\n", options: { color: C.card } },
    { text: "발표자  ", options: { bold: true, color: C.accent } },
    { text: "김민성", options: { color: C.card } },
  ], { x: 0.9, y: 5.15, w: 9, h: 1.5, fontFace: BODY_FONT, fontSize: 14, isTextBox: true, margin: 0, lineSpacingMultiple: 1.5 });

  s.addNotes("[대본 0:00~0:20]\n안녕하세요, 발표를 맡은 김민성입니다.\n\n오늘 소개할 논문은 2026년 International Orthodontics에 게재된 \"Three Pharmacological Agents for Acceleratory Orthodontic Tooth Movement and Subsequent Relapse: A Randomized Controlled Animal Study\"입니다. 코르티코스테로이드, 비타민D, PGE2 세 가지 약물이 교정 치아이동을 얼마나 가속하고, 그만큼 재발도 크게 만드는지를 랫드 모델에서 비교한 연구입니다.\n\n[발표 팁] 이 연구는 랫드(쥐) 동물실험이라는 점을 처음부터 명확히 밝힐 것. 저널 출처(International Orthodontics, Elsevier)와 선정 사유(치과약리학1의 PGE2/COX 경로 + 구강생화학의 골대사·칼슘 항상성 두 과목 내용이 한 논문에서 만난다는 점)를 한 줄로 언급.");
}

// ---------- Slide 2: Two rabbits ----------
{
  const s = baseSlide();
  titleBar(s, "BACKGROUND", "교정 치아 이동 가속과 재발, 두 마리 토끼");

  const items = [
    ["재발(relapse)과 고정력 상실", "교정 장치 제거 후 잔재 결합력이 풀리며 치아가 원래 위치로 되돌아가는 현상 — 원인은 아직 명확히 규명되지 않음"],
    ["치아 이동 가속의 필요성", "치료 기간 단축을 위해 수술적·기계적·약리학적 방법으로 치아 이동을 가속하는 연구가 활발 — 국소 주사·전신 투여 모두 시도됨"],
    ["미해결 과제", "가속 효과를 낸 약물들이 보정(retention) 후 재발에 어떤 영향을 주는지는 선행연구가 거의 없음 — 이 논문이 처음으로 3개 약물의 재발까지 비교"],
  ];
  let y = 1.85;
  items.forEach(([h, d], i) => {
    card(s, MX, y, CW, 1.5);
    s.addShape(pres.ShapeType.ellipse, { x: MX + 0.3, y: y + 0.42, w: 0.66, h: 0.66, fill: { color: C.primary }, line: { type: "none" } });
    s.addText(String(i + 1), { x: MX + 0.3, y: y + 0.42, w: 0.66, h: 0.66, fontFace: TITLE_FONT, fontSize: 18, bold: true, color: C.card, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(h, { x: MX + 1.25, y: y + 0.2, w: 4.5, h: 0.5, fontFace: TITLE_FONT, fontSize: 16, bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
    s.addText(d, { x: MX + 5.9, y: y + 0.15, w: CW - 6.15, h: 1.2, fontFace: BODY_FONT, fontSize: 13, color: C.muted, isTextBox: true, margin: 0, valign: "middle" });
    y += 1.68;
  });
  pageNum(s, 2);
  s.addNotes("[대본 0:20~1:10]\n먼저 배경입니다. 교정 치료에서 재발은 여전히 원인이 명확히 밝혀지지 않은 문제입니다. 장치를 제거하면 남아있던 결합력이 풀리면서 치아가 원래 자리로 돌아가려는 현상이죠.\n\n한편 치료 기간을 줄이기 위해 치아 이동을 가속하는 방법도 계속 연구되고 있는데, 문제는 가속 효과를 낸 약물들이 정작 보정 이후 재발에 어떤 영향을 주는지는 거의 연구되지 않았다는 점입니다. 이 논문이 그 공백을 처음으로 다룹니다.\n\n[발표 팁] 발치 시 통증 조절 실패가 환자 경험에 미치는 영향과 유사하게, 재발도 교정 치료의 장기 성공을 좌우하는 문제임을 도입부에서 강조.");
}

// ---------- Slide 3: mechanism cards ----------
{
  const s = baseSlide();
  titleBar(s, "MECHANISM", "약물별 파골세포 형성 경로");

  const cols = [
    ["코르티코스테로이드", DRUG.cortico, "염증 유전자 발현 억제 + 파골세포형성(osteoclastogenesis) 직접 자극 + 콜라게나아제 활성 증가", "→ 골흡수 강하게 촉진"],
    ["비타민D", DRUG.vitD, "파골세포 활성 자체를 증가시키고 면역매개체를 조절", "→ 골개조 촉진 + osteocalcin·비타민D수용체 유전자 발현에도 관여"],
    ["PGE₂", DRUG.pge2, "RANKL 매개 파골세포형성 자극 + 국소 골흡수 강화", "— 교정력에 의한 내인성 경로(COX→PGE2→RANKL)를 외부에서 직접 보충"],
  ];
  let x = MX;
  const cw = 3.95, cardTop = 1.8, cardH = 3.9;
  cols.forEach(([name, color, l1, l2]) => {
    card(s, x, cardTop, cw, cardH);
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.28, y: cardTop + 0.25, w: cw - 0.56, h: 0.5, rectRadius: 0.08, fill: { color }, line: { type: "none" } });
    s.addText(name, { x: x + 0.28, y: cardTop + 0.25, w: cw - 0.56, h: 0.5, fontFace: TITLE_FONT, fontSize: 15, bold: true, color: C.card, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(l1, { x: x + 0.28, y: cardTop + 1.0, w: cw - 0.56, h: 1.7, fontFace: BODY_FONT, fontSize: 12.5, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.35, valign: "top" });
    s.addText(l2, { x: x + 0.28, y: cardTop + 2.85, w: cw - 0.56, h: 0.9, fontFace: BODY_FONT, fontSize: 12, bold: true, italic: true, color, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3, valign: "top" });
    x += cw + 0.2;
  });
  s.addText("※ 세 약물 모두 '파골세포 활성화'를 유발하지만, 도달 경로가 서로 달라 가속 강도와 재발이 나타나는 양상이 다르다.", {
    x: MX, y: cardTop + cardH + 0.15, w: CW, h: 0.5, fontFace: BODY_FONT, fontSize: 12.5, italic: true, color: C.muted, isTextBox: true, margin: 0,
  });
  pageNum(s, 3);
  s.addNotes("[대본 1:10~2:00]\n세 약물이 파골세포를 활성화하는 경로부터 보겠습니다.\n\n코르티코스테로이드는 염증 유전자 발현을 억제하면서 동시에 파골세포형성을 직접 자극하고 콜라게나아제 활성도 높여서, 골흡수를 가장 강하게 촉진합니다. 비타민D는 파골세포 활성 자체를 높이면서 면역매개체를 조절하는 방식으로 작용하고요. PGE2는 RANKL을 매개로 파골세포형성을 자극합니다 — 사실 이건 교정력이 가해졌을 때 우리 몸이 스스로 만들어내는 경로를 외부에서 그대로 보충하는 방식입니다.\n\n세 약물 모두 결국 파골세포를 활성화시키지만, 가는 길이 다르다는 점을 기억해 주시면 됩니다. 이 부분은 슬라이드 10에서 더 자세히 다루겠습니다.\n\n[발표 팁] 구강생화학 '뼈와 치아의 석회화, 혈청칼슘 항상성' 챕터에서 배운 칼슘/인 대사 조절호르몬(비타민D, PTH 등) 내용과 연결지어 설명하면 좋음. 세 경로의 차이는 슬라이드 10(치과약리학적 의의)에서 더 깊게 다룸.");
}

// ---------- Slide 4: Objective & Hypothesis ----------
{
  const s = baseSlide(C.primary);
  s.addText("OBJECTIVE & HYPOTHESIS", { x: MX, y: 0.4, w: 10, h: 0.32, fontFace: BODY_FONT, fontSize: 12, bold: true, color: C.accent, charSpacing: 1, isTextBox: true, margin: 0 });
  s.addText("연구 목적 및 가설", { x: MX, y: 0.7, w: 12, h: 0.8, fontFace: TITLE_FONT, fontSize: 26, bold: true, color: C.card, isTextBox: true, margin: 0 });

  card(s, MX, 1.9, CW, 2.2, C.card);
  s.addText("연구 목적", { x: MX + 0.4, y: 2.15, w: 4, h: 0.4, fontFace: BODY_FONT, fontSize: 14, bold: true, color: C.accent, isTextBox: true, margin: 0 });
  s.addText("랫드 모델에서 코르티코스테로이드·비타민D·PGE₂의 국소(점막하) 주입이 교정 치아이동 가속 및 보정 후 재발에 미치는 영향을 비교한다.\n귀무가설(H0): 세 약물 간 가속기·재발기 효과에 차이가 없다.", {
    x: MX + 0.4, y: 2.6, w: CW - 0.8, h: 1.4, fontFace: BODY_FONT, fontSize: 14.5, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.35,
  });

  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 4.35, w: CW, h: 2.2, rectRadius: 0.1, fill: { color: C.accent }, line: { type: "none" } });
  s.addText("가설 (H1) — 발표자 재구성", { x: MX + 0.4, y: 4.6, w: 6, h: 0.4, fontFace: BODY_FONT, fontSize: 14, bold: true, color: C.primaryDark, isTextBox: true, margin: 0 });
  s.addText("세 약물 모두 대조군보다 치아이동을 가속하되, 가속 정도가 큰 약물일수록 보정 후 재발량도 클 것이다 (가속–재발 트레이드오프).", {
    x: MX + 0.4, y: 5.05, w: CW - 0.8, h: 1.3, fontFace: BODY_FONT, fontSize: 15, bold: true, color: C.primaryDark, isTextBox: true, margin: 0, lineSpacingMultiple: 1.35,
  });
  pageNum(s, 4);
  s.addNotes("[대본 2:00~2:40]\n연구 목적은 랫드 모델에서 세 약물의 국소 주입이 치아이동 가속과 보정 후 재발에 미치는 영향을 비교하는 것입니다.\n\n가설은 제가 결과 패턴을 보고 재구성한 것인데, 세 약물 모두 대조군보다 치아이동을 가속시키되, 가속 정도가 클수록 보정 후 재발량도 클 것이다 — 라는 가속-재발 트레이드오프입니다.\n\n[발표 팁] 이 가설은 저자들이 명시한 공식 가설이 아니라, 발표자가 결과 패턴(코르티코스테로이드=최대가속·최대재발, PGE2=최소가속·최소재발)을 보고 재구성한 것임을 반드시 언급.");
}

// ---------- Slide 5: Study design ----------
{
  const s = baseSlide();
  titleBar(s, "METHODS", "5군 랫드 모델 — 4주 가속 + 2주 보정 + 2주 재발");

  card(s, MX, 1.75, 6.6, 4.9);
  s.addText("설계", { x: MX + 0.35, y: 1.95, w: 5.9, h: 0.4, fontFace: TITLE_FONT, fontSize: 15, bold: true, color: C.primary, isTextBox: true, margin: 0 });
  bulletBlock(s, [
    "무작위배정, 눈가림(2번째 저자가 배정) — 최종 배정 후엔 주 연구자 1인이 개입·측정·평가 전부 수행",
    "Sprague–Dawley 랫드 105마리(수컷, 6–12주령) → 5군, 군당 21마리",
    "장치: 상악 절치 사이 스테인리스 open-coil loop, 25g 힘, tipping 이동",
    "측정: 디지털 캘리퍼(0.01mm)로 절치 간 거리",
  ], { x: MX + 0.35, y: 2.4, w: 5.9, h: 1.9, fontSize: 12 });

  const groups = [
    ["I", "음성대조", "무처치, OTM 없음", DRUG.control],
    ["II", "양성대조(CPG)", "OTM만, 약물 없음", DRUG.control],
    ["III", "코르티코스테로이드(COG)", "50µL 8mg/kg, 매일 주입", DRUG.cortico],
    ["IV", "비타민D(VDG)", "20µL 10⁻¹⁰mol/L, 3일마다 주입", DRUG.vitD],
    ["V", "PGE₂(PGE₂G)", "0.1µg/0.1mL, 매주 주입", DRUG.pge2],
  ];
  let gy = 4.65;
  groups.forEach(([n, name, dose, color]) => {
    s.addShape(pres.ShapeType.roundRect, { x: MX + 0.35, y: gy, w: 0.38, h: 0.33, rectRadius: 0.06, fill: { color }, line: { type: "none" } });
    s.addText(n, { x: MX + 0.35, y: gy, w: 0.38, h: 0.33, fontFace: TITLE_FONT, fontSize: 11, bold: true, color: C.card, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(name, { x: MX + 0.86, y: gy - 0.03, w: 2.5, h: 0.4, fontFace: BODY_FONT, fontSize: 11, bold: true, color: C.ink, valign: "middle", isTextBox: true, margin: 0 });
    s.addText(dose, { x: MX + 3.4, y: gy - 0.03, w: 2.9, h: 0.4, fontFace: BODY_FONT, fontSize: 10.5, color: C.muted, valign: "middle", isTextBox: true, margin: 0 });
    gy += 0.39;
  });

  s.addImage({ path: __dirname + "/assets/fig1_loop.jpg", x: 7.6, y: 1.75, w: 5.0, h: 4.35, sizing: { type: "cover", w: 5.0, h: 4.35 } });
  s.addShape(pres.ShapeType.rect, { x: 7.6, y: 1.75, w: 5.0, h: 4.35, fill: { type: "none" }, line: { color: C.line, width: 1 } });
  s.addText("Figure 1 원문 — Orthodontic loop in place", { x: 7.6, y: 6.15, w: 5.0, h: 0.35, fontFace: BODY_FONT, fontSize: 10.5, italic: true, color: C.muted, align: "center", isTextBox: true, margin: 0 });
  pageNum(s, 5);
  s.addNotes("[대본 2:40~3:40]\n연구 방법입니다. 수컷 랫드 105마리를 5개 군(음성대조·양성대조·코르티코스테로이드·비타민D·PGE2)으로 무작위 배정하고, 상악 절치 사이에 open-coil loop를 걸어 25g 힘으로 치아를 이동시켰습니다.\n\n투여 빈도가 약물마다 다른 점이 특이한데요, 코르티코스테로이드는 매일, 비타민D는 3일마다, PGE2는 매주 주입했습니다. 이 부분은 나중에 비평적 고찰에서 다시 짚겠습니다.\n\n전체 일정은 가속기 4주, 보정기 2주, 재발기 2주로 진행됐습니다.\n\n[발표 팁] 동물실험이므로 Q&A에서 '왜 랫드를 썼나' 물으면 '골개조·치아이동을 통제된 조건에서 관찰하기 위해 — 사람 대상으론 이 정도의 개입·조직검사가 불가능'이라고 답변. 세 약물의 투여 빈도가 매일·3일마다·매주로 서로 다르다는 점은 비평적 고찰(한계)에서 다시 짚음.");
}

// ---------- Slide 6: Statistical methods primer (NEW) ----------
{
  const s = baseSlide();
  titleBar(s, "STATISTICS 101", "이 논문은 어떻게 통계로 검증했나");

  const cols = [
    ["Shapiro–Wilk 검정", C.secondary, "정규성 검정", "데이터의 정규 분포성 확인 ▷ ANOVA 등 모수적 검정 가능"],
    ["One-way ANOVA", C.primary, "일원분산분석", "3개 이상 군의 평균을 한 번에 비교 ▷ \"군 사이에 적어도 하나는 다르다\"까지만 알려줌, 어느 군끼리 다른지는 모름"],
    ["Tukey post-hoc", C.accent, "사후검정", "ANOVA가 유의하면 모든 군을 쌍(pair)으로 나눠 비교 ▷ 정확히 어느 군과 어느 군이 다른지 확정 — 이 논문의 '군간 비교' 표가 전부 이 결과"],
    ["Paired t-test", C.secondary, "대응표본 t-검정", "같은 개체를 두 시점에서 비교 ▷ 예: 같은 랫드의 '가속기 직후' vs '보정 1주 후' 위치 비교(군 내 비교)"],
  ];
  let x = MX;
  const cw = 2.9, cardTop = 1.75, cardH = 3.6;
  cols.forEach(([name, color, sub, body]) => {
    card(s, x, cardTop, cw, cardH);
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.2, y: cardTop + 0.2, w: cw - 0.4, h: 0.85, rectRadius: 0.08, fill: { color }, line: { type: "none" } });
    s.addText(name, { x: x + 0.22, y: cardTop + 0.25, w: cw - 0.44, h: 0.42, fontFace: TITLE_FONT, fontSize: 12.5, bold: true, color: C.card, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(sub, { x: x + 0.22, y: cardTop + 0.63, w: cw - 0.44, h: 0.35, fontFace: BODY_FONT, fontSize: 10, italic: true, color: C.card, align: "center", isTextBox: true, margin: 0 });
    s.addText(body, { x: x + 0.2, y: cardTop + 1.15, w: cw - 0.4, h: cardH - 1.3, fontFace: BODY_FONT, fontSize: 10.5, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3, valign: "top" });
    x += cw + 0.15;
  });

  card(s, MX, cardTop + cardH + 0.2, CW, 1.25, "EAF2F7");
  s.addText([
    { text: "이 논문의 분석 흐름  ", options: { bold: true, color: C.primary } },
    { text: "Shapiro–Wilk ▷ One-way ANOVA ▷ 유의하면 Tukey post-hoc — 군내 시점별 비교(가속 후 vs 보정 후 등)는 paired t-test로 별도 진행\n", options: { color: C.ink } },
    { text: "p < 0.05의 의미  ", options: { bold: true, color: C.primary } },
    { text: "이 차이가 우연히 생겼을 확률이 5% 미만이라는 뜻 — 관행적 기준; 이 논문 대부분의 비교는 p < 0.001로, 우연일 확률이 매우 낮다.", options: { color: C.ink } },
  ], { x: MX + 0.3, y: cardTop + cardH + 0.37, w: CW - 0.6, h: 1.0, fontFace: BODY_FONT, fontSize: 11, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3 });
  pageNum(s, 6);
  s.addNotes("[대본 3:40~4:40]\n결과를 보기 전에 이 논문이 쓴 통계 방법을 간단히 짚고 가겠습니다.\n\n먼저 Shapiro-Wilk 검정으로 데이터가 정규분포를 따르는지 확인했고, 그다음 One-way ANOVA로 5개 군 평균을 한꺼번에 비교했습니다. ANOVA는 '군 사이에 차이가 있다'까지만 알려주기 때문에, 정확히 어느 군과 어느 군이 다른지는 Tukey post-hoc 검정으로 하나하나 다시 비교합니다. 그리고 같은 군을 시점별로 비교할 때는 — 예를 들어 같은 랫드의 가속기 직후와 보정 1주 후를 비교할 때는 — paired t-test를 썼습니다.\n\np값은 이 차이가 우연히 나왔을 확률을 뜻하는데, 관행적으로 5% 미만이면 '통계적으로 유의하다'고 봅니다. 이 논문은 대부분 p<0.001로 나와서, 우연일 가능성이 매우 낮다고 볼 수 있습니다.\n\n[발표 팁] 이 슬라이드는 통계를 잘 모르는 청중을 위한 배경 설명 슬라이드. 너무 길게 끌지 말고 1분 이내로 넘어갈 것 — 핵심은 'ANOVA는 전체 비교, Tukey는 쌍별 비교, paired t-test는 같은 군의 전후 비교'라는 역할 구분.");
}

// ---------- Slide 7: Acceleration results ----------
{
  const s = baseSlide();
  titleBar(s, "RESULTS · 01", "가속기(4주) — 치아이동량 비교");

  const stats = [
    ["6.50 ± 0.88", "mm · 코르티코스테로이드", DRUG.cortico],
    ["3.73 ± 0.14", "mm · 비타민D", DRUG.vitD],
    ["2.80 ± 0.15", "mm · PGE₂", DRUG.pge2],
  ];
  let x = MX;
  const cw = 3.87, gap = 0.2;
  stats.forEach(([num, label, color]) => {
    statCallout(s, x, 1.85, cw, 2.0, num, label, color);
    x += cw + gap;
  });
  s.addText("→ 대조군(1.29±0.11mm) 대비 세 약물 모두 유의하게 가속 (p < 0.001) — 가속 순위: 코르티코스테로이드 > 비타민D > PGE₂, 조직검사(ALP·TRAP)도 동일 순서로 확인됨", {
    x: MX, y: 4.05, w: CW, h: 0.6, fontFace: BODY_FONT, fontSize: 13, italic: true, color: C.primary, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });

  const table = [
    ["군", "양성대조(CPG)", "코르티코스테로이드(COG)", "비타민D(VDG)", "PGE₂(PGE₂G)"],
    ["4주 후 이동량(직후 대비 증가분)", "1.29 ± 0.11 mm", "6.50 ± 0.88 mm", "3.73 ± 0.14 mm", "2.80 ± 0.15 mm"],
  ];
  const formatted = table.map((row, ri) => row.map((c) => ri === 0 ? { text: c, options: { bold: true, color: C.card, fill: { color: C.primary } } } : { text: c, options: { color: C.ink } }));
  s.addTable(formatted, { x: MX, y: 4.8, w: CW, h: 1.1, colW: [3.4, 2.3, 2.7, 2.3, 1.23], fontFace: BODY_FONT, fontSize: 11.5, border: { type: "solid", color: C.line, pt: 0.5 }, autoPage: false, valign: "middle", align: "center" });
  s.addText("※ 모든 군간 비교 p < 0.001 (One-way ANOVA + Tukey post-hoc). 원문 Table I·II 기준.", {
    x: MX, y: 6.05, w: CW, h: 0.4, fontFace: BODY_FONT, fontSize: 11, italic: true, color: C.muted, isTextBox: true, margin: 0,
  });
  pageNum(s, 7);
  s.addNotes("[대본 4:40~5:20]\n가속기 4주 결과입니다. 코르티코스테로이드군이 6.50mm로 가장 많이 이동했고, 비타민D 3.73mm, PGE2 2.80mm 순이었습니다. 대조군은 1.29mm에 그쳤고요. 세 약물 모두 대조군 대비 유의하게 가속됐고(p<0.001), 조직검사 결과도 같은 순서로 나왔습니다.\n\n[발표 팁] 원문 Table I·II 기준. 보정기(2주) 동안은 모든 군에서 유의한 변화 없음(장치를 다시 수동적으로 부착해 이동량을 '고정') — 질문 나오면 이 부분도 설명 가능.");
}

// ---------- Slide 8: Relapse results ----------
{
  const s = baseSlide();
  titleBar(s, "RESULTS · 02", "재발기(2주) — 가속이 컸던 약물이 더 많이 되돌아간다");

  const stats = [
    ["-1.09 ± 0.17", "mm · 양성대조", DRUG.control],
    ["-0.86 ± 0.23", "mm · PGE₂ (최소)", DRUG.pge2],
    ["-2.75 ± 0.15", "mm · 비타민D", DRUG.vitD],
    ["-5.07 ± 0.87", "mm · 코르티코스테로이드 (최대)", DRUG.cortico],
  ];
  let x = MX;
  const cw = 2.83, gap = 0.18;
  stats.forEach(([num, label, color]) => {
    statCallout(s, x, 1.8, cw, 2.0, num, label, color);
    x += cw + gap;
  });

  card(s, MX, 4.1, CW, 1.9);
  s.addText("조직학적 소견이 임상 측정을 뒷받침", { x: MX + 0.35, y: 4.3, w: CW - 0.7, h: 0.4, fontFace: TITLE_FONT, fontSize: 14, bold: true, color: C.primary, isTextBox: true, margin: 0 });
  s.addText("치주인대(PDL) 폭이 코르티코스테로이드군에서 가장 넓게 유지(압박·긴장측 모두) — 대조군이 가장 좁음, 비타민D·PGE₂군은 중간 수준.", {
    x: MX + 0.35, y: 4.75, w: CW - 0.7, h: 1.15, fontFace: BODY_FONT, fontSize: 13, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  s.addText("※ 양성대조 vs PGE₂ 재발량 차이 — 통계적으로 유의하지 않음(p = 0.605). 자세한 내용은 부록(Appendix A) 참고.", {
    x: MX, y: 6.15, w: CW, h: 0.4, fontFace: BODY_FONT, fontSize: 11, italic: true, color: C.muted, isTextBox: true, margin: 0,
  });
  pageNum(s, 8);
  s.addNotes("[대본 5:20~6:10]\n이제 진짜 흥미로운 부분, 재발기 결과입니다. 2주간 재발량을 보면 코르티코스테로이드군이 -5.07mm로 가장 많이 되돌아갔고, 비타민D가 -2.75mm, 그리고 PGE2는 -0.86mm로 가장 적게 재발했습니다. 참고로 대조군은 -1.09mm였는데, PGE2와 거의 비슷한 수준이죠 — 이 부분은 나중에 부록에서 다시 설명하겠습니다.\n\n즉 가속기에서 가장 많이 이동했던 코르티코스테로이드군이, 재발기에서도 가장 많이 되돌아간 겁니다. 조직학적으로도 코르티코스테로이드군의 치주인대 폭이 가장 넓게 유지된 게 확인돼서, 임상 측정과 조직 소견이 서로 맞아떨어집니다.\n\n[발표 팁] 가속량이 클수록(코르티코스테로이드) 재발량도 크고, 가속량이 작을수록(PGE2) 재발도 작다는 '가속-재발 트레이드오프' 패턴이 핵심 메시지. 원문 Table III·VI·VII 기준.");
}

// ---------- Slide 9: Histology ----------
{
  const s = baseSlide();
  titleBar(s, "RESULTS · 03", "조직학적 소견 — 코르티코스테로이드군에서 PDL 폭 가장 넓게 유지");

  s.addImage({ path: __dirname + "/assets/fig3_he.jpg", x: MX, y: 1.75, w: 5.2, h: 4.9, sizing: { type: "contain", w: 5.2, h: 4.9 } });
  s.addText("원문 Figure 3 (H&E, ×40) — A: 음성대조, B: 양성대조, C: 코르티코스테로이드, D: 비타민D, E: PGE₂", {
    x: MX, y: 6.65, w: 5.2, h: 0.5, fontFace: BODY_FONT, fontSize: 10, italic: true, color: C.muted, align: "center", isTextBox: true, margin: 0, lineSpacingMultiple: 1.15,
  });

  bulletBlock(s, [
    "코르티코스테로이드군(C) — 압박·긴장측 모두 해당",
    "대조군(A, B) — PDL 폭 가장 좁음, 재발을 흡수할 조직 여유가 적음을 시사",
    "비타민D(D)·PGE₂(E)군 — 중간 수준의 PDL 폭",
    "캘리퍼 임상 측정 결과와 조직 소견이 서로 뒷받침함",
    "동일한 순서 패턴이 ALP·TRAP 염색(원문 Figure 4, 5)에서도 확인됨",
  ], { x: MX + 5.6, y: 1.9, w: CW - 5.6, h: 4.0, fontSize: 13.5 });
  pageNum(s, 9);
  s.addNotes("[대본 6:10~6:40]\nH&E 염색 결과를 보면, 코르티코스테로이드군(C)의 치주인대 폭이 압박측·긴장측 모두에서 가장 넓게 유지된 반면, 대조군(A, B)은 가장 좁았습니다. 비타민D와 PGE2는 중간 수준이었고요. 같은 패턴이 ALP·TRAP 염색에서도 똑같이 나타났습니다.\n\n[발표 팁] 원문 Figure 3(H&E)·4(ALP)·5(TRAP) 모두 같은 순서(코르티코스테로이드 > 비타민D > PGE2 > 대조군)로 조직학적 활성을 보여줌. 임상측정치와 조직 소견이 일치한다는 점이 이 논문의 방법론적 강점.");
}

// ---------- Slide 10: Pharmacological significance (NEW — core synthesis) ----------
{
  const s = baseSlide();
  titleBar(s, "PHARMACOLOGICAL SIGNIFICANCE", "치과약리학적 의의 — 왜 이 세 약물인가");

  const cols = [
    ["코르티코스테로이드", DRUG.cortico, "스테로이드성 항염증제\n(역설적 골흡수 촉진)", "국소 고용량 투여 ▷ 염증유전자 억제 + 파골세포형성 직접 자극 ▷ 골흡수 급가속\n\n통념(항염증=골흡수 억제)과 반대 — 용량·투여경로·표적조직에 따라 작용이 뒤바뀌는 사례"],
    ["비타민D", DRUG.vitD, "지용성 호르몬\n(핵수용체 리간드)", "VDR(비타민D수용체) 결합 ▷ 골개조 관련 유전자 발현 조절 ▷ 파골세포 활성 + 면역매개체 동시 조절 ▷ 완만한 가속\n\n전신 칼슘 대사 호르몬이 국소 골개조에도 관여하는 사례"],
    ["PGE₂", DRUG.pge2, "지질 매개체(autacoid)\n= 교정력의 자연 신호물질", "[자연 경로] 교정력 ▷ COX-2 ▷ PGE2 자체 생성 ▷ RANKL ▷ 파골세포\n\n이 실험은 PGE2를 외부 직접 주입 — 경로 중간부터 재현·검증"],
  ];
  let x = MX;
  const cw = 3.95, cardTop = 1.75, cardH = 3.35;
  cols.forEach(([name, color, sub, body]) => {
    card(s, x, cardTop, cw, cardH);
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.25, y: cardTop + 0.22, w: cw - 0.5, h: 0.85, rectRadius: 0.08, fill: { color }, line: { type: "none" } });
    s.addText(name, { x: x + 0.25, y: cardTop + 0.28, w: cw - 0.5, h: 0.35, fontFace: TITLE_FONT, fontSize: 14, bold: true, color: C.card, align: "center", isTextBox: true, margin: 0 });
    s.addText(sub, { x: x + 0.25, y: cardTop + 0.62, w: cw - 0.5, h: 0.42, fontFace: BODY_FONT, fontSize: 10.5, italic: true, color: C.card, align: "center", isTextBox: true, margin: 0, lineSpacingMultiple: 1.1 });
    s.addText(body, { x: x + 0.25, y: cardTop + 1.2, w: cw - 0.5, h: cardH - 1.4, fontFace: BODY_FONT, fontSize: 11.5, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.32, valign: "top" });
    x += cw + 0.2;
  });

  card(s, MX, cardTop + cardH + 0.25, CW, 1.6, "EAF2F7");
  s.addText([
    { text: "핵심 시사점  ", options: { bold: true, color: C.primary } },
    { text: "세 약물은 서로 다른 약리학적 경로(유전자 억제·호르몬 수용체·지질 매개체)로 결국 같은 종착점인 '파골세포 활성화'에 도달한다 — 그러나 경로가 다르면 부작용·재발 위험도 달라진다.\n", options: { color: C.ink } },
    { text: "치과교정학 기본원칙과의 연결  ", options: { bold: true, color: C.primary } },
    { text: "압박-긴장설(pressure-tension theory)에서 치아이동은 골흡수뿐 아니라 흡수 이후의 '구조적 재조직화'가 뒤따라야 안정된다 — 코르티코스테로이드처럼 흡수만 급가속하면 재조직화가 못 따라가 재발이 커진다. 이 논문의 '가속↑ = 재발↑' 결과는 곧 \"치아이동 속도는 생물학적 재형성 속도가 제한한다\"는 교정학 기본원칙을 약리학적으로 재확인한 것이다.", options: { color: C.ink } },
  ], { x: MX + 0.3, y: cardTop + cardH + 0.42, w: CW - 0.6, h: 1.3, fontFace: BODY_FONT, fontSize: 12, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3 });
  pageNum(s, 10);
  s.addNotes("[대본 6:40~8:00 — 발표의 핵심]\n이 논문이 저희 수업들과 왜 연결되는지 설명드리겠습니다.\n\n세 약물은 사실 완전히 다른 종류의 약입니다. 코르티코스테로이드는 원래 항염증제로 알려져 있어서, 보통 '염증을 줄이면 골흡수도 줄어든다'고 생각하기 쉽습니다. 그런데 이 연구에서는 국소로 고용량 주입했을 때 오히려 파골세포형성을 직접 자극해서 골흡수를 가장 강하게 촉진했습니다. 같은 약물이라도 용량과 투여 경로, 표적 조직에 따라 정반대 효과가 날 수 있다는 걸 보여주는 사례입니다.\n\n비타민D는 지용성 호르몬이죠. 비타민D 수용체를 통해 유전자 발현을 조절하는 방식으로 작용하는데, 이건 저희가 구강생화학에서 배운 칼슘·인 대사 조절 호르몬이 전신뿐 아니라 국소 골개조에도 관여한다는 걸 실제로 보여주는 사례입니다.\n\n그리고 PGE2가 제일 흥미로운데요, 이건 원래 교정력이 가해지면 치주인대 세포가 COX 경로를 통해 스스로 만들어내는 물질입니다. 그러니까 이 실험에서 PGE2를 외부에서 주입한 건, 우리 몸이 자연적으로 하는 과정을 그대로 재현해본 거예요. 치과약리학1에서 배운 '교정력 → COX → PGE2 → RANKL → 파골세포'라는 신호전달 축을 이 실험이 직접 검증한 셈입니다.\n\n정리하면, 세 약물은 서로 다른 경로 — 유전자 억제, 호르몬 수용체, 지질 매개체 — 로 가지만 결국 같은 목적지인 파골세포 활성화에 도달합니다. 그런데 경로가 다르면 부작용과 재발 위험도 달라진다는 게 이 연구의 핵심입니다.\n\n여기서 교정학 기본 원칙과 연결되는 지점이 나옵니다. 압박-긴장설에 따르면 치아이동은 단순히 뼈가 흡수되는 것만으로 끝나는 게 아니라, 그 이후에 조직이 구조적으로 재조직화되는 과정이 뒤따라야 안정됩니다. 그런데 코르티코스테로이드처럼 흡수만 급격하게 밀어붙이면, 재조직화가 그 속도를 따라가지 못해서 조직이 불안정한 상태로 남고, 결국 장치를 제거했을 때 재발이 커지는 겁니다.\n\n그러니까 이 논문의 '가속이 클수록 재발도 크다'는 결과는, \"치아이동 속도는 결국 생물학적 조직 재형성 속도가 제한한다\"는 교정학의 기본 원리를 약리학적으로 다시 확인해준 셈입니다.\n\n[발표 팁] 이 슬라이드가 발표의 핵심 — 단순 결과 요약이 아니라 '왜 이 세 약물을 비교했는가'를 치과약리학·구강생화학·치과교정학 세 과목의 언어로 설명하는 지점. 발표 중 가장 천천히, 자신의 말로 설명할 것.");
}

// ---------- Slide 11: Critical appraisal ----------
{
  const s = baseSlide();
  titleBar(s, "CRITICAL APPRAISAL", "비평적 고찰");

  const cols = [
    ["강점", [
      "ARRIVE 가이드라인 준수 + 윤리위 승인 + 배정 눈가림(무작위 배정)",
      "임상측정(캘리퍼) + 조직학(PDL 폭, ALP/TRAP)으로 이중 검증",
      "가속기·보정기·재발기를 모두 추적한 최초의 3약물 비교 — 선행연구 공백을 직접 채움",
    ]],
    ["한계 / Bias 위험", [
      "배정만 눈가림, 측정(outcome assessment)은 비맹검 — 원문: 주 연구자 1인이 개입·측정·평가를 전부 수행",
      "약물당 용량 1개뿐 + 투여빈도도 매일·3일마다·매주로 제각각 — 공정 비교인지 불확실(용량-반응 분석 불가)",
      "수컷 랫드만 사용 — 호르몬 변동은 배제했지만 여성(암컷) 적용 가능성은 미확인",
    ]],
    ["임상 적용 가능성", [
      "코르티코스테로이드는 가속 효과 크지만 재발 위험도 가장 큼 — 전신 스테로이드 복용 중인 교정환자에서 특히 신중한 판단 필요",
      "비타민D·PGE₂는 가속은 온건해도 재발이 적어 상대적으로 안전한 보조제일 수 있음 — 다만 PGE2는 고용량 시 치근흡수 위험 보고 있음(타 문헌)",
      "동물(랫드)실험 — 종간 차이로 사람에 그대로 적용은 어려움(저자도 인정), 용량-반응 확립을 위한 후속 임상연구 필요",
    ]],
  ];
  let x = MX;
  const cw = 3.95, cardTop = 1.75, cardH = 4.85;
  cols.forEach(([h, lines]) => {
    card(s, x, cardTop, cw, cardH);
    s.addText(h, { x: x + 0.3, y: cardTop + 0.22, w: cw - 0.6, h: 0.45, fontFace: TITLE_FONT, fontSize: 15.5, bold: true, color: C.primary, isTextBox: true, margin: 0 });
    s.addText(lines.map((t) => ({ text: "•  " + t, options: { breakLine: true } })),
      { x: x + 0.3, y: cardTop + 0.75, w: cw - 0.6, h: cardH - 0.95, fontFace: BODY_FONT, fontSize: 11, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.35, valign: "top" });
    x += cw + 0.2;
  });
  pageNum(s, 11);
  s.addNotes("[대본 8:00~9:00]\n강점으로는 ARRIVE 가이드라인 준수, 윤리위 승인, 무작위 배정과 눈가림, 그리고 임상 측정과 조직학을 함께 사용한 이중 검증을 들 수 있습니다.\n\n한계로는, 배정만 눈가림했고 실제 측정은 한 명의 연구자가 다 했다는 점, 약물마다 용량을 하나씩만 테스트해서 용량-반응 분석이 불가능하다는 점, 그리고 투여 빈도도 매일·3일마다·매주로 제각각이라 공정한 비교인지 의문이 남는다는 점을 지적할 수 있습니다.\n\n임상 적용 측면에서는, 코르티코스테로이드는 가속 효과는 크지만 재발 위험이 가장 크기 때문에, 전신 스테로이드를 복용 중인 교정 환자라면 특히 신중해야 합니다. 반면 비타민D와 PGE2는 온건한 가속에 재발도 적어서 상대적으로 안전한 보조제가 될 수 있어 보입니다. 다만 PGE2는 고용량에서 치근흡수 위험이 있다는 보고도 있어서, 안전성과 효능 사이의 균형이 필요합니다.\n\n[발표 팁] 발표자 본인 의견으로 최종 다듬을 것 — 특히 Q&A 대비를 위해 표본수 검정력·비맹검 측정 부분은 원문 근거로 보강 추천.");
}

// ---------- Slide 12: Comparison with prior studies ----------
{
  const s = baseSlide();
  titleBar(s, "DISCUSSION", "기타 연구와의 결과 비교");

  const rows = [
    ["코르티코스테로이드", DRUG.cortico, "Baofeng·Abtahi 등은 골흡수·파골세포형성 증가로 가속 보고 / 반대로 Yamane·Molina 등은 오히려 치아이동 감소 보고 — 연구기간(1–2주 vs 8주)·용량·힘·표본수 차이로 추정"],
    ["비타민D", DRUG.vitD, "Gowda·Varughese·Al-Attar·Moradinejad 등 다수가 골개조 증가·염증성 사이토카인 감소로 가속 효과를 일관되게 보고 — 본 연구 결과와 부합"],
    ["PGE₂", DRUG.pge2, "Kale·Cağlaroğlu·Seifi 등이 RANKL 발현·파골활성 증가를 보고 — 'PGE2 효과 없음'을 보고한 연구는 없음(저자 확인)"],
  ];
  let y = 1.85;
  rows.forEach(([label, color, text]) => {
    card(s, MX, y, CW, 1.35);
    s.addShape(pres.ShapeType.roundRect, { x: MX + 0.3, y: y + 0.2, w: 2.3, h: 0.95, rectRadius: 0.08, fill: { color }, line: { type: "none" } });
    s.addText(label, { x: MX + 0.3, y: y + 0.2, w: 2.3, h: 0.95, fontFace: TITLE_FONT, fontSize: 13.5, bold: true, color: C.card, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(text, { x: MX + 2.9, y: y + 0.15, w: CW - 3.15, h: 1.05, fontFace: BODY_FONT, fontSize: 12, color: C.ink, valign: "middle", isTextBox: true, margin: 0, lineSpacingMultiple: 1.25 });
    y += 1.5;
  });
  s.addText("※ 상반된 결과는 연구기간·용량·힘·표본수 차이 때문(저자 설명) — 재발까지 세 약물을 비교한 연구는 이번이 최초, 진짜 공백은 여기 있음.", {
    x: MX, y: 6.45, w: CW, h: 0.5, fontFace: BODY_FONT, fontSize: 11.5, italic: true, color: C.primary, isTextBox: true, margin: 0,
  });
  pageNum(s, 12);
  s.addNotes("[대본 9:00~9:30]\n코르티코스테로이드는 선행연구마다 결과가 엇갈리는데, 이건 연구 기간이나 용량 차이 때문으로 보입니다. 비타민D는 여러 선행연구와 일관되게 가속 효과가 확인됐고, PGE2도 마찬가지로 가속 효과를 보고한 연구는 많지만 '효과 없음'을 보고한 연구는 없었습니다.\n\n[발표 팁] 원문 Discussion 'Comparison with previous studies' 문단 재구성. 코르티코스테로이드만 문헌 간 결과가 정반대인 이유(연구기간·용량 차이)를 짚으면 비평적 고찰과 자연스럽게 연결됨.");
}

// ---------- Slide 13: References ----------
{
  const s = baseSlide();
  titleBar(s, "REFERENCE", "참고문헌");
  const refs = [
    "[원 논문] Hamed SA, Mohammad MH, Grawish ME, Fouda AM, Montasser MA. Three pharmacological agents for acceleratory orthodontic tooth movement and subsequent relapse: A randomized controlled animal study. Int Orthod. 2026;24:101112.",
    "Baofeng L, et al. Characterization of a rabbit osteoporosis model induced by ovariectomy and glucocorticoid. Bone 2010;46(3):396-401.",
    "Abtahi M, et al. Effect of corticosteroids administration in rabbit model. J Clin Pediatr Dent 2014;38:285-9.",
    "Yamane A, Fukui T, Chiba M. In vitro measurement of orthodontic tooth movement in rats given beta-aminopropionitrile or hydrocortisone. Eur J Orthod 1997;19(1):21-8.",
    "Kale S, et al. Comparison of 1,25-dihydroxycholecalciferol and prostaglandin E2 on orthodontic tooth movement. Am J Orthod Dentofacial Orthop 2004;125:607-14.",
    "Seifi M, Hamedi R, Khavandegar Z. The effect of thyroid hormone, prostaglandin E2, and calcium gluconate on orthodontic tooth movement and root resorption in rats. J Dent 2015;16(1 Suppl):35.",
  ];
  s.addText(refs.map((t, i) => ({ text: `[${i + 1}] ${t}`, options: { breakLine: i < refs.length - 1 } })),
    { x: MX, y: 1.8, w: CW, h: 4.6, fontFace: BODY_FONT, fontSize: 12, color: C.ink, isTextBox: true, margin: 0, lineSpacingMultiple: 1.55, valign: "top" });
  s.addText("※ 슬라이드 11(선행연구 비교)에서 이름으로 인용한 문헌만 수록. 전체 참고문헌(28건)은 원 논문 References 참고.", {
    x: MX, y: 6.6, w: CW, h: 0.4, fontFace: BODY_FONT, fontSize: 10.5, italic: true, color: C.muted, isTextBox: true, margin: 0,
  });
  pageNum(s, 13);
  s.addNotes("교수님이 '그 인용 어디서 났나' 물으면 이 슬라이드로 바로 답 가능. 전체 28개 문헌은 원 논문 References 섹션에 있음.");
}

// ---------- Slide 14: Conclusion (moved right before Q&A, per author note) ----------
{
  const s = baseSlide(C.primary);
  s.addShape(pres.ShapeType.ellipse, { x: -3, y: -3, w: 8, h: 8, fill: { color: C.secondary, transparency: 55 }, line: { type: "none" } });
  s.addText("TAKE-HOME MESSAGE", { x: MX, y: 1.4, w: 10, h: 0.4, fontFace: BODY_FONT, fontSize: 12, bold: true, color: C.accent, charSpacing: 1, isTextBox: true, margin: 0 });
  s.addText("치아이동을 가장 많이 가속하는 약물이,\n보정 후 가장 많이 되돌아가기도 한다.", {
    x: MX, y: 1.9, w: 11.3, h: 1.9, fontFace: TITLE_FONT, fontSize: 27, bold: true, color: C.card, isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  s.addText("코르티코스테로이드 = 최대가속·최대재발  ·  비타민D = 중간  ·  PGE₂ = 최소가속·최소재발(대조군과 통계적 동률)", {
    x: MX, y: 3.85, w: 11.3, h: 0.6, fontFace: BODY_FONT, fontSize: 14.5, italic: true, color: "CFE0EC", isTextBox: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  s.addText("'빠른 이동'과 '안정적 결과' 사이의 트레이드오프를 보여준 첫 3약물 비교 연구 — 치과약리학1(PGE2/COX 경로)과 구강생화학(골대사·칼슘 항상성)의 내용이 이 논문 하나로 이어진다.", {
    x: MX, y: 4.6, w: 11.3, h: 1.0, fontFace: BODY_FONT, fontSize: 13.5, color: C.card, isTextBox: true, margin: 0, lineSpacingMultiple: 1.35,
  });
  s.addText("※ PGE₂·대조군 relapse 차이 p = 0.605(유의하지 않음) — Appendix A 참고", {
    x: MX, y: 5.75, w: 11.3, h: 0.4, fontFace: BODY_FONT, fontSize: 11.5, italic: true, color: "AECBDC", isTextBox: true, margin: 0,
  });
  pageNum(s, 14);
  s.addNotes("[대본 9:30~10:15]\n정리하면, 치아이동을 가장 많이 가속하는 약물이 보정 후 가장 많이 되돌아가기도 합니다. 코르티코스테로이드는 최대 가속·최대 재발, PGE2는 최소 가속·최소 재발, 비타민D는 그 중간입니다.\n\n'빠른 이동'과 '안정적인 결과' 사이의 트레이드오프를 보여준 첫 3약물 비교 연구이고, 치과약리학1의 PGE2/COX 내용과 구강생화학의 골대사·칼슘 항상성 내용이 이 논문 하나로 이어진다는 점에서 오늘 발표 논문으로 선정했습니다.\n\n[발표 팁] 이 결론 슬라이드는 Q&A 동안 화면에 계속 띄워둘 것(원 저자 의도). 치과약리학1(PGE2/COX)과 구강생화학(골대사·칼슘 항상성) 두 과목 내용이 이 논문 하나로 이어진다는 점을 다시 언급하며 마무리 후 Q&A로 전환.");
}

// ---------- Slide 15: Q&A ----------
{
  const s = baseSlide(C.primaryDark);
  s.addText("Q & A", { x: MX, y: 2.9, w: 11, h: 1.3, fontFace: TITLE_FONT, fontSize: 54, bold: true, color: C.card, isTextBox: true, margin: 0 });
  s.addText("감사합니다", { x: MX, y: 4.1, w: 8, h: 0.6, fontFace: BODY_FONT, fontSize: 18, color: C.accent, isTextBox: true, margin: 0 });
  s.addNotes([
    "[대본 10:15~11:00]",
    "이상으로 발표를 마치겠습니다. 질문 받겠습니다. 감사합니다.",
    "",
    "[예상 질문 & 답변 메모]",
    "",
    "Q1. 동물실험 결과를 사람에게 그대로 적용할 수 있는가?",
    "→ 랫드와 사람은 골대사 속도, 치아 구조가 달라서 절대적인 수치를 그대로 적용하긴 어렵습니다. 다만 파골세포 활성화라는 생물학적 기전 자체는 인종·종을 넘어 보편적이라, 상대적인 경향성(코르티코스테로이드가 가장 위험하다는 점 등)은 참고할 수 있습니다. 저자들도 이 한계를 인정하고 있습니다.",
    "",
    "Q2. 코르티코스테로이드 결과가 일부 선행연구(Yamane, Molina 등)와 정반대인데, 이 연구가 더 신뢰할 만한 이유는?",
    "→ 저자들은 연구 기간(선행연구 1~2주 vs 이 연구 8주 전체), 용량, 적용된 힘, 표본수 차이로 설명합니다. 특히 이 연구는 가속기부터 재발기까지 전체 과정을 추적한 몇 안 되는 연구라는 점에서 의미가 있습니다.",
    "",
    "Q3. 왜 세 약물의 용량을 하나씩만 테스트했는가?",
    "→ 이건 이 논문의 명확한 한계입니다. 용량-반응 관계를 보려면 여러 용량을 비교해야 하는데, 이 연구는 선행연구에서 흔히 쓰인 용량 하나씩만 선택해서 비교했습니다. 후속 연구로 용량별 비교가 필요하다고 답하면 됩니다.",
    "",
    "Q4. PGE2가 치근흡수를 유발할 수 있다는데, 이 연구에서는 그런 부작용을 확인했는가?",
    "→ 이 연구에서는 별도로 치근흡수를 측정하지 않았습니다. 다만 타 문헌에서 PGE2 고용량 투여 시 치근흡수 위험이 보고된 바 있어서, 안전성 평가는 후속 연구 과제로 남아있다고 답하면 됩니다.",
    "",
    "Q5. 암컷 랫드는 왜 제외했는가?",
    "→ 수컷만 사용한 이유는 호르몬 주기에 의한 변동을 배제하기 위해서입니다. 다만 이로 인해 성별에 따른 차이는 이 연구로는 알 수 없고, 여성 환자에게 그대로 적용할 수 있는지는 후속 연구가 필요하다는 한계로 이어집니다.",
  ].join("\n"));
}

// ---------- Slide 16: Appendix A ----------
{
  const s = baseSlide();
  titleBar(s, "APPENDIX A · Q&A 백업", "재발이 '가장 적은' 군은 대조군도 PGE₂군도 아닌, 둘의 통계적 동률이다");

  const table = [
    ["", "양성대조\n(CPG)", "PGE₂\n(PGE₂G)", "비타민D\n(VDG)", "코르티코스테로이드\n(COG)"],
    ["2주 재발량(T0 대비)", "-1.09 ± 0.17 mm", "-0.86 ± 0.23 mm", "-2.75 ± 0.15 mm", "-5.07 ± 0.87 mm"],
    ["원문 유의성 문자", "a", "a", "b", "c"],
  ];
  const formatted = table.map((row, ri) => row.map((c) => ri === 0 ? { text: c, options: { bold: true, color: C.card, fill: { color: C.primary } } } : { text: c, options: { color: C.ink } }));
  s.addTable(formatted, { x: MX, y: 1.8, w: CW, h: 1.3, colW: [2.3, 2.4, 2.4, 2.3, 2.53], fontFace: BODY_FONT, fontSize: 11, border: { type: "solid", color: C.line, pt: 0.5 }, autoPage: false, valign: "middle", align: "center" });
  s.addText("※ 같은 문자(a, a) — 두 군간 통계적 유의차 없음 (Table III, Tukey post-hoc)", {
    x: MX, y: 3.2, w: CW, h: 0.4, fontFace: BODY_FONT, fontSize: 11.5, italic: true, color: C.muted, isTextBox: true, margin: 0,
  });

  card(s, MX, 3.75, CW, 2.9);
  s.addText([
    { text: "핵심 수치  ", options: { bold: true, color: C.primary } },
    { text: "양성대조 vs PGE2군의 2주 재발량 차이는 통계적으로 유의하지 않음(p = 0.605, Table III). 반면 비타민D·코르티코스테로이드는 서로 및 위 두 군과 모두 유의하게 다름(p < 0.001).\n\n", options: { color: C.ink } },
    { text: "통계적으로 유의미한 계층 구조  ", options: { bold: true, color: C.primary } },
    { text: "{양성대조, PGE2} < 비타민D < 코르티코스테로이드 (재발 적은 순)\n\n", options: { color: C.ink } },
    { text: "원문 서술 간 불일치 주의  ", options: { bold: true, color: C.primary } },
    { text: "Results 본문·Conclusions는 \"PGE2가 최소 재발\"이라 서술하지만, Discussion 'Interpretation of findings'는 \"대조군이 최소, 그 다음 PGE2\"라 서술 — 둘 다 raw mean 순위와 통계적 유의성 서술을 혼용한 단순화이며, 정확한 결론은 위 표대로 '대조군·PGE2군 통계적 동률'이다.", options: { color: C.ink } },
  ], { x: MX + 0.35, y: 3.95, w: CW - 0.7, h: 2.55, fontFace: BODY_FONT, fontSize: 12.5, isTextBox: true, margin: 0, lineSpacingMultiple: 1.35 });
  pageNum(s, 16);
  s.addNotes("[Appendix A 사용법 — 교수님 질문 대비]\nQ&A 대비용 백업 슬라이드. 만약 \"원문 Discussion엔 대조군이 재발이 제일 적다고 되어 있는데?\"라는 질문이 나오면 이 슬라이드를 띄우고:\n1. Table III에서 양성대조 vs PGE2군의 p값이 0.605로, 통계적으로 두 군이 구분되지 않는다는 점을 보여주고,\n2. 원문 스스로도 Results/Conclusions와 Discussion에서 서술이 갈린다는 점을 지적하고,\n3. 정확히는 \"대조군과 PGE2군이 통계적으로 동률\"이라고 답하면 됩니다.");
}

pres.writeFile({ fileName: "치과약리학실험2_논문발표.pptx" }).then(() => {
  console.log("done");
});
