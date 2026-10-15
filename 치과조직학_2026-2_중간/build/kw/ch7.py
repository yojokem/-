K = {
 "ch": 7,
 "tagline": "신경세포 구조와 아교세포 구분",
 "flow": [
  {"t":"구성", "k":["neuron","neuroglia"], "d":"신경세포 + 중추·말초 신경아교세포"},
  {"t":"세포체", "k":["Nissl 소체","Golgi","lipofuscin"], "d":"단백질합성은 세포체, 축삭엔 장치 없음"},
  {"t":"돌기", "k":["축삭","가지돌기","말이집"], "d":"말이집은 축삭에만 연결"},
  {"t":"분류", "k":["단극","거짓단극","쌍극","다극"], "d":"거짓단극 = DRG 감각세포"},
  {"t":"아교세포", "k":["별","희소돌기","미세","뇌실막"], "d":"CNS 4종 / PNS 2종, 말이집 담당 구분"},
  {"t":"손상·수송", "k":["Wallerian","axon reaction","수송"], "d":"원위부 변성 vs 체부 chromatolysis"},
 ],
 "kw": [
  {"g":"세포체", "items":[
   {"w":"Nissl 소체","d":"r-ER, 축삭둔덕엔 없음","q":"Nissl substance: r-ER"},
   {"w":"Golgi 복합체","d":"세포체에 발달","q":"Golgi complex"},
   {"w":"미토콘드리아","d":"이온교환·축삭수송의 에너지원","q":"energy source for ion exchange"},
   {"w":"lipofuscin","d":"노화 색소 과립","q":"Lipofuscin granule"},
   {"w":"melanin 과립","d":"색소 과립(카테콜아민계 신경)","q":"Melanin granule"},
   {"w":"축삭 단백질합성","d":"축삭에는 합성 장치 없음","q":"no protein-synthesizing assembly in axon"}]},
  {"g":"축삭 vs 가지돌기", "items":[
   {"w":"말이집","d":"축삭에만 연결 가능","q":"Axon could be associated, Dendrite not associated"},
   {"w":"Nissl 소체 유무","d":"축삭 없음 / 가지돌기 있을 수 있음","q":"could be present"},
   {"w":"neurofilament","d":"중간섬유(축삭 골격)","q":"Neurofilament: Intermediate Filament"},
   {"w":"microtubule","d":"tubulin, 축삭 수송 매개","q":"Microtubule - tubulin - axonal transport"},
   {"w":"빠른 축삭수송","d":"200~400 mm/day (소포·효소)","q":"Fast Transport 200-400"},
   {"w":"백색질","d":"신경세포체 없음(축삭 위주)","q":""}]},
  {"g":"신경원 분류", "items":[
   {"w":"거짓단극(DRG)","d":"감각, 두 돌기 모두 축삭 형태","q":"Pseudounipolar neuron in DRG (dorsal root ganglion)"},
   {"w":"단극·쌍극·다극","d":"돌기 수에 따른 분류","q":""}]},
  {"g":"중추 아교세포", "items":[
   {"w":"Astrocyte","d":"GFAP, 혈관주위발, BBB 유도","q":"Central Neuroglia"},
   {"w":"Oligodendrocyte","d":"CNS 말이집, 돌기마다 한 분절","q":"Each process constitutes a internodal segment"},
   {"w":"Microglia","d":"대식세포 역할(MPS)","q":"Macrophage (Mononuclear Phagocytic System)"},
   {"w":"Ependymal cell","d":"뇌실 상피 아교세포, 섬모·미세융모","q":"cilia and microvilli on luminal surface"},
   {"w":"BBB","d":"분자량 약 500 dalton 미만만 통과","q":"restricts passage of certain ions and substances (MW < 500 dalton)"}]},
  {"g":"말초 아교세포·신경", "items":[
   {"w":"Schwann cell","d":"PNS 말이집, 한 세포가 한 분절","q":"Schwann Cell in PNS"},
   {"w":"Satellite cell","d":"신경절 세포체를 둘러쌈","q":"Cells encircling neuronal cell body in Ganglion"},
   {"w":"Schmidt-Lanterman 틈","d":"말이집 속 세포질 틈","q":""},
   {"w":"endoneurium","d":"가장 안쪽 결합조직(축삭 단위)","q":""},
   {"w":"perineurium","d":"신경다발을 싸는 중간층","q":""},
   {"w":"epineurium","d":"가장 바깥층","q":""}]},
  {"g":"손상 반응", "items":[
   {"w":"Wallerian 변성","d":"손상 원위부(anterograde) 변성","q":"Wallerian Degeneration = anterograde degeneration"},
   {"w":"axon reaction","d":"체부 반응, chromatolysis","q":"Large reduction in number"}]},
 ],
 "cmp": [
  {"t":"축삭 vs 가지돌기","h":["항목","축삭","가지돌기"],
   "r":[["말이집","연결 가능","없음"],["Nissl 소체","없음","있을 수 있음"],["단백질합성 장치","없음","(세포체 쪽 연속)"]],"q":"Nissl substance absent could be present"},
  {"t":"희소돌기아교세포 vs 슈반세포","h":["항목","희소돌기","슈반세포"],
   "r":[["위치","중추(CNS)","말초(PNS)"],["말이집 분절","돌기마다 각각 한 분절","한 세포가 한 분절"]],"q":"A Schwann cell constitutes a internodal Segment"},
  {"t":"아교세포 분류","h":["구분","CNS","PNS"],
   "r":[["세포","astrocyte, oligodendrocyte","Schwann cell"],["","microglia, ependymal","satellite cell"],["섬모 보유","ependymal 만","없음"]],"q":""},
 ],
 "seq": [
  {"t":"말초신경 결합조직(안→밖)","kind":"steps","items":[
   {"l":"endoneurium","d":"축삭 주변 가장 안쪽"},{"l":"perineurium","d":"신경다발을 둘러쌈"},{"l":"epineurium","d":"신경 전체 바깥"}],"q":""},
 ],
 "tags": ["cytoskel","vessel"],
 "tagnote": {"cytoskel":"신경원세사·미세소관, 축삭수송","vessel":"별아교세포 혈관주위발, BBB"},
 "traps": [
  "Nissl 소체는 축삭둔덕·축삭에 없다(세포체·가지돌기에).",
  "말이집은 축삭에만 연결, 가지돌기엔 없다.",
  "미세아교세포·상의세포·성상세포도 모두 중추 아교세포; 말초는 슈반·위성 2개뿐.",
  "섬모는 뇌실막(상의)세포만 가진다.",
  "거짓단극(DRG)은 두 돌기 모두 축삭 형태.",
  "Wallerian은 원위부, axon reaction은 세포체 변화.",
 ],
 "pg": ""
}
