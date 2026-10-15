K = {
 "ch": 8,
 "tagline": "혈구 종류별 특징과 생성",
 "flow": [
  {"t":"혈액 구성", "k":["혈장 55%","유형성분 45%"], "d":"혈장 단백질 albumin·globulin·fibrinogen"},
  {"t":"적혈구", "k":["무핵","120일","spectrin"], "d":"양면오목, 막단백질 세포골격"},
  {"t":"적혈구생성", "k":["proerythroblast","reticulocyte"], "d":"-blast 단계를 거쳐 망상적혈구→RBC"},
  {"t":"백혈구", "k":["호중구","호산구","호염기구"], "d":"감별 비율과 과립·핵 모양"},
  {"t":"혈소판", "k":["α과립","δ과립","10일"], "d":"무핵 2~4 µm, 응고·혈관수축"},
  {"t":"조혈 기간", "k":["7일","11일","10일"], "d":"적혈구 7·과립구 11·혈소판 10일"},
 ],
 "kw": [
  {"g":"혈액 구성", "items":[
   {"w":"혈장","d":"55%, 물 90%, 단백질 7%","q":"Plasma protein 7% (albumin, globulin, fibrinogen, etc)"},
   {"w":"혈장 단백질","d":"albumin·globulin·fibrinogen","q":"albumin, globulin, fibrinogen"},
   {"w":"유형성분","d":"45%","q":""},
   {"w":"Hct","d":"남 40~50%, 여 35~45%","q":""},
   {"w":"혈액 도말 염색","d":"Giemsa·Wright·Leishman","q":""}]},
  {"g":"적혈구", "items":[
   {"w":"RBC","d":"무핵 양면오목, 수명 120일","q":"Life span: 120 days"},
   {"w":"내재 막단백질","d":"glycophorin, band 3","q":""},
   {"w":"표재 막단백질","d":"ankyrin·spectrin·band 4.1·4.9·actin","q":""},
   {"w":"Reticulocyte","d":"rRNA 그물 잔존, BCB 염색","q":"Reticulum in RBC (rRNA)"},
   {"w":"HbS","d":"겸상적혈구빈혈, glutamate→valine","q":"Sickle cell anemia (HbS) glutamate -> valine"}]},
  {"g":"적혈구생성 순서", "items":[
   {"w":"Proerythroblast","d":"시작 단계","q":""},
   {"w":"Basophil erythroblast","d":"두 번째","q":""},
   {"w":"Polychromatophil","d":"세 번째","q":""},
   {"w":"Orthochromatophil","d":"normoblast, 마지막 유핵 단계","q":"Orthochromatophil erythroblast"},
   {"w":"Erythropoiesis 7일","d":"EPO·비타민 B12·철·엽산","q":"EPO, Vit B12, iron, folic acid 7일"}]},
  {"g":"백혈구", "items":[
   {"w":"호중구","d":"60~70%, 2~5엽, drumstick","q":"2 – 5 lobe nucleus"},
   {"w":"호산구","d":"2~4%, 2엽, 주염기단백질","q":"Major basic protein (eosinophilic)"},
   {"w":"호염기구","d":"0.5~1%, S자 핵, heparin·histamine","q":""},
   {"w":"림프구","d":"20~30%","q":""},
   {"w":"단핵구","d":"3~8%","q":""},
   {"w":"특수과립","d":"ALP·collagenase·lactoferrin·lysozyme","q":"Specific granule: Alkaline phosphatase, Collagenese Lactoferin, Lysozyme"},
   {"w":"호산구 과립","d":"특수과립 많고 아주르과립 적음","q":"Many specific granule Few azurophilic granule"}]},
  {"g":"혈소판", "items":[
   {"w":"Platelet","d":"무핵 2~4 µm, 수명 10일","q":"Life span: 10 days"},
   {"w":"α과립","d":"응고 관련","q":""},
   {"w":"δ과립","d":"혈관수축·Ca2+·ADP","q":""},
   {"w":"Megakaryopoiesis","d":"거핵모세포→거핵세포→혈소판 10일","q":"Megakaryoblast ↓ Megakaryocyte ↓ Platelet 10일"},
   {"w":"Granulopoiesis","d":"과립구 생성 11일","q":"WBC 11일"}]},
 ],
 "cmp": [
  {"t":"호중구 vs 호산구 vs 호염기구","h":["항목","호중구","호산구","호염기구"],
   "r":[["비율","60~70%","2~4%","0.5~1%"],["핵","2~5엽","2엽","S자"],["특징","drumstick(Barr body)","주염기단백질","IgE 수용체, heparin·histamine"]],"q":"Bilobe nucleus"},
  {"t":"망상적혈구 vs 성숙 적혈구","h":["항목","망상적혈구","성숙 RBC"],
   "r":[["rRNA","그물 잔존","없음"],["핵","없음","없음"],["염색","BCB","—"]],"q":"Reticulum in RBC (rRNA)"},
 ],
 "seq": [
  {"t":"적혈구생성 단계","kind":"steps","items":[
   {"l":"1","d":"proerythroblast"},{"l":"2","d":"basophil erythroblast"},{"l":"3","d":"polychromatophil erythroblast"},
   {"l":"4","d":"orthochromatophil (normoblast)"},{"l":"5","d":"reticulocyte"},{"l":"6","d":"RBC"}],"q":"Proerythroblast → Basophil erythroblast → Polychromatophil erythroblast → Orthochromatophil erythroblast → Reticulocyte → RBC"},
  {"t":"수명·생성 기간","kind":"time","items":[
   {"l":"적혈구 수명","d":"120일"},{"l":"혈소판 수명","d":"10일"},{"l":"적혈구 생성","d":"7일"},
   {"l":"과립구 생성","d":"11일"},{"l":"혈소판 생성","d":"10일"}],"q":""},
 ],
 "tags": ["blast","stain","cytoskel","ca","immune"],
 "tagnote": {"blast":"-blast 단계를 거쳐 reticulocyte→RBC","stain":"BCB, Giemsa·Wright·Leishman 도말","cytoskel":"RBC 막 spectrin·actin","ca":"혈소판 δ과립 Ca2+","immune":"호염기구 IgE 수용체"},
 "traps": [
  "호산구는 특수과립이 많고 아주르친화과립은 적다.",
  "망상적혈구의 그물은 rRNA(mRNA 아님), 염색은 BCB.",
  "호중구·호산구 공통 특수과립 효소: ALP·collagenase·lactoferrin·lysozyme.",
  "수명(RBC 120·혈소판 10일)과 생성기간(7·11·10일)을 구분.",
  "호중구 2~5엽 / 호산구 2엽 / 호염기구 S자 핵.",
 ],
 "pg": ""
}
