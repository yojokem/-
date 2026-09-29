# 치과약리학실험2 논문 발표 PPT

논문: *Three Pharmacological Agents for Acceleratory Orthodontic Tooth Movement and Subsequent Relapse: A Randomized Controlled Animal Study* (Hamed SA, et al., 2026, International Orthodontics, Elsevier)

- `build.js` — pptxgenjs 기반 슬라이드 생성 스크립트 (Node.js)
- `치과약리학실험2_논문발표.pptx` — 생성된 결과물 (16슬라이드: Title / Background / Mechanism / Objective·가설 / Methods / **통계 방법 개념(Statistics 101)** / Results×3 / **치과약리학적 의의** / Critical appraisal / Discussion 비교 / References / Conclusion / Q&A / Appendix)
- `발표대본.md` — 발표 대본 (10분 분량, 예상 질문·Appendix 사용법 포함)
- `assets/` — 원 논문 Figure 1(loop 장착), Figure 3(H&E 조직 사진)

## 빌드 방법

```
npm install pptxgenjs
node build.js
```

## 남은 작업 (사용자가 직접)

- 슬라이드 9(치과약리학적 의의)의 논리 흐름을 본인 말로 설명할 수 있도록 이해 위주로 준비
- 슬라이드 10(비평적 고찰) 본인 의견으로 최종 다듬기
- 발표 리허설 (10분 시간 준수)
- Appendix A(양성대조 vs PGE2 재발량 p=0.605, 원문 서술 불일치) 부분은 교수님 질문 대비용 — 미리 한 번 소리 내어 설명해볼 것
