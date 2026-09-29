# 수복치과재료학실험 — Dental Cements (Setting Time & Film Thickness)

2026. 9. 22 실습(A2조) 결과 보고 PPT. Figma에서 디자인 시안(딥틸 + 웜 코랄 팔레트)을 먼저 잡고, 그 결과를 pptxgenjs로 재구현한 13슬라이드 덱입니다.

- `build.js` — pptxgenjs 기반 슬라이드 생성 스크립트 (Node.js)
- `수복치과재료학실험_DentalCements_20260922.pptx` — 생성된 결과물
- `발표대본.md` — 발표 대본 (13슬라이드, 10분 분량)
- `dental_photos/insert/` — 실습 사진 자료

## 빌드 방법

```
npm install pptxgenjs
node build.js
```

## 남은 작업 (사용자가 직접)

- 슬라이드 1 발표자 이름 채우기
- A3조 film thickness 이상치(슬라이드 10) 발표 전 재확인 — 원 데이터 대비 3~10배 높게 나와 측정/단위 오류 가능성으로 표시해둠
- 발표 리허설 (10분 시간 준수)
