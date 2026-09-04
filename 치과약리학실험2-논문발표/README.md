# 치과약리학실험2 논문 발표 PPT

논문: *Efficacy of analgesia promoted by lidocaine and articaine in third molar extraction surgery. A split-mouth, randomized, controlled trial* (2024, Oral and Maxillofacial Surgery, Springer)

- `build.js` — pptxgenjs 기반 슬라이드 생성 스크립트 (Node.js)
- `치과약리학실험2_논문발표.pptx` — 생성된 초안 (10슬라이드: Title / Background / Objective·가설 / Methods x2 / Results x2 / Discussion / Critical appraisal / Q&A 대비 메모)

## 폰트

- 제목: Wanted Sans (Bold/ExtraBold)
- 본문: Pretendard (Regular/Bold)

용량 문제로 폰트 파일(.ttf)은 저장소에 포함하지 않았습니다. 재빌드 시 아래에서 받아 `fonts_ttf/`에 배치 후 `build.js` 실행:
- `npm pack pretendard` (registry.npmjs.org)
- `npm pack wanted-sans` (registry.npmjs.org)

## 빌드 방법

```
npm install pptxgenjs
node build.js
```

## 남은 작업 (사용자가 직접)

- 논문 원문 정독 및 방법론·통계 이해 (Q&A 대비)
- Critical appraisal 슬라이드 본인 의견 보강
- 발표 리허설 (10분 시간 준수)
- 슬라이드 디자인/문구 최종 검토 (LibreOffice 시각 QA는 샌드박스 환경 제약으로 미실시 — 실제 PowerPoint/Keynote에서 열어 레이아웃 확인 필요)
