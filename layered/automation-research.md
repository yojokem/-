# 레이어드 발행 자동화 — 리서치 및 준비 (2026.08.25)

CLAUDE.md 원칙 1 "자동화 전면 허용, 영상 편집만 예외" + 원칙 4 "저자본·저시간, 새 유료 도구 기본 제안 금지"에 따라
**직접 공식 API 연동(무료)** 을 기본 경로로 잡음. 서드파티 유료 스케줄러(Postproxy, bundle.social 등)는 검색 중 발견했으나
원칙상 기본 제안에서 제외 — 필요 시에만 후보로 남김.

---

## 1. YouTube Data API v3 — 업로드 자동화

- 2026년 6월부터 쿼터 구조 변경: 업로드/검색이 공유 풀에서 분리됨. 기본 쿼터로 하루 약 100건 업로드 가능
  (레이어드 발행 빈도 고려하면 쿼터는 문제 안 됨).
- 필요한 것: Google Cloud 프로젝트, OAuth 2.0 클라이언트(또는 서비스 계정), YouTube Data API v3 활성화.
- 업로드 자체는 `videos.insert` (resumable upload) 하나로 처리 가능 — 제목/설명/썸네일/공개상태(예약 발행 포함)까지 API로 세팅 가능.
- **본인 인증 필요 항목 (대행 불가)**: Google Cloud 프로젝트 생성, OAuth 동의화면 등록, 채널 소유권 인증 — 최초 1회만 프로스트 본인 진행.
- 이후 토큰 발급되면 세션에서 API 호출로 업로드까지 자동화 가능.

## 2. Instagram(Meta) Graph API — 카드뉴스/릴스 발행 자동화

- 요건: Facebook Business 계정 + 연결된 Facebook 페이지 + Instagram 프로페셔널(비즈니스/크리에이터) 계정 +
  Meta 개발자 앱 + `instagram_business_content_publish` 권한 승인.
- **권한 승인(App Review)에 2~4주 소요** — 이게 병목. 지금 바로 신청 시작해야 자동화 시점을 앞당길 수 있음.
- 발행 절차(카드뉴스 = 이미지 캐러셀, 릴스 = 영상 별도 플로우):
  1. `POST /{ig-user-id}/media` — 이미지(또는 릴스는 `media_type=REELS`+`video_url`)로 컨테이너 생성
  2. 상태가 `FINISHED`될 때까지 폴링
  3. `POST /{ig-user-id}/media_publish`로 최종 발행
- 릴스 규격: 9:16, 5~90초, H.264/HEVC. (레이어드는 영상 편집은 프로스트 본인 진행 — 편집 완료본만 API로 발행)
- **본인 인증 필요 항목 (대행 불가)**: Meta 개발자 계정 생성, Business 계정 연결, App Review 신청/승인 — PROGRESS.md에도
  이미 "승인 대기" 항목으로 있음. 신청 자체를 지금 시작하는 게 최우선 (승인까지 대기시간이 기니까).

## 3. 카드뉴스 파이프라인 (PROGRESS.md 다음 할 일 #9)

- 현재: 검수 → (사람이) Meta Business Suite에 수동 업로드.
- 자동화 목표: 검수 승인된 카드뉴스 세트를 위 Graph API 캐러셀 발행 플로우에 그대로 태우는 스크립트.
- 텍스트/이미지 생성(card-news 스킬)은 이미 자동화돼 있으므로, 남은 구간은 "발행" 단 하나.

---

## 자동화 준비 상태 요약

| 항목 | 상태 | 다음 액션 (담당) |
|---|---|---|
| YouTube 업로드 API | 조사 완료, 쿼터 문제없음 | Google Cloud 프로젝트+OAuth 등록 (프로스트, 1회성) |
| Instagram Graph API | 조사 완료, App Review가 병목 | Meta 개발자 계정 생성 + App Review 신청 (프로스트, 지금 시작 권장) |
| 카드뉴스 발행 스크립트 | 설계만, 미구현 | 위 두 인증 완료되는 대로 세션에서 구현 |
| 영상 편집 자동화 | 원칙상 예외 대상 (자동화 안 함) | 해당 없음 |

## 프로스트가 지금 해야 할 일 (가장 앞단 병목부터)

1. **Meta 개발자 계정 생성 + Business 계정 연결 + App Review 신청** — 승인까지 2~4주 걸리므로 오늘 시작할수록 유리.
2. **Google Cloud 프로젝트 생성 + YouTube Data API 활성화 + OAuth 동의화면 등록** — 비교적 빠름 (당일 가능).
3. 이 두 개가 완료되면(자격 증명만 넘겨주면) 발행 자동화 스크립트는 이 세션에서 바로 구현 가능.

## Sources
- [YouTube API Quota Limits 2026](https://www.getphyllo.com/post/youtube-api-limits-how-to-calculate-api-usage-cost-and-fix-exceeded-api-quota)
- [YouTube Data API v3 Complete Guide](https://bundle.social/blog/youtube-api-upload-guide)
- [Upload & Schedule YouTube Videos via API (2026)](https://posteverywhere.ai/blog/post-to-youtube-api)
- [Posting Instagram Reels via Graph API](https://business-automated.medium.com/posting-instagram-reels-via-instagram-facebook-graph-api-9ea192d54dfa)
- [Instagram Reels API: Complete Developer Guide (2026)](https://www.getphyllo.com/post/a-complete-guide-to-the-instagram-reels-api)
- [Instagram Reels API Publishing Guide (2026)](https://postproxy.dev/blog/instagram-reels-api-publishing-guide/)
