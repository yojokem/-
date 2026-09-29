# 수복치과재료학실험 — Dental Cements (Setting Time & Film Thickness)

2026. 9. 22 실습(A2조) 결과 보고 PPT. Figma에서 디자인 시안을 먼저 잡고, 그 결과를 pptxgenjs로 재구현한 17슬라이드 덱입니다. (팔레트는 navy + sky blue로 재조정됨)

- `build.js` — pptxgenjs 기반 슬라이드 생성 스크립트 (Node.js)
- `scripts/add_errorbars.py` — pptxgenjs가 지원하지 않는 오차 막대(에러바)를 생성된 .pptx의 차트 XML(chart1~4.xml)에 직접 주입하는 후처리 스크립트. `node build.js` 다음에 반드시 실행할 것. 슬라이드 11의 두 차트 + 슬라이드 12(Setting time)·13(Film thickness)의 비교 차트("전체 평균" 시리즈만) 총 4개를 처리함
- `수복치과재료학실험_DentalCements_20260922.pptx` — 생성된 결과물
- `발표대본.md` — 발표 대본 (17슬라이드, 약 10분 55초 분량)
- `dental_photos/insert/` — 실습 사진 자료

## 빌드 방법

```
npm install pptxgenjs
node build.js
python3 scripts/add_errorbars.py 수복치과재료학실험_DentalCements_20260922.pptx
```

## 데이터 출처

슬라이드 11·12·13(비교 차트 포함)의 평균·표준편차는 `2026\2학기\원본\수복치과재료학실험\20260922 Dental Cements\Results.xlsx`(A반 6개 조 원자료, 9/29 최종본)를 분 단위로 정규화해 직접 재계산한 것. Setting time 원자료는 조별로 표기 형식이 제각각(소수 분, `M'SS''`, `M:SS`)이라 스프레드시트 자체 수식은 `#NAME?` 오류가 났었음 — `build.js` 상단 주석에 계산 과정과 조건별 SD 값을 남겨뒀으니, 값이 의심스러우면 거기서부터 검증할 것. A4조가 독립적으로 집계한 반 전체 평균·SD(별도 공유 자료)와 대조해봐도 값이 일치해 교차검증됨.

## 남은 작업 (사용자가 직접)

- 슬라이드 1 발표자 이름 채우기
- A3조 film thickness 이상치(슬라이드 11) 발표 전 재확인 — 원 데이터 대비 3~10배 높게 나와 측정/단위 오류 가능성으로 표시해둠
- 슬라이드 12(조별 경향성 & 우리 조 위치)의 해석 — 우리 조가 왜 다른 조보다 느리게 경화 판정했는지 팀 내에서 한 번 더 논의해보면 Q&A 대비에 좋음
- 발표 리허설 — 피막도 비교(슬라이드 13)가 추가되며 전체 분량이 약 10분 55초로 늘어남, 시간 초과 시 슬라이드 13·15를 줄여서 연습할 것

## 수정 원칙

`build.js`가 원본입니다. pptx를 PowerPoint에서 직접 고쳤다면 같은 내용을 `build.js`(위치·글자 크기 포함)와 `발표대본.md`에도 반영해야 다시 빌드해도 수정이 유지됩니다. 사진은 `dental_photos/insert/`에 크롭본으로 저장해 둡니다.
