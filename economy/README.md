# economy — 개인 경제생활 관리

이 폴더는 수입/지출, 자산·투자 현황, 수입 증대 전략을 정리하고, Notion·Google Drive 등
외부 소스와 교차검증하며 자동화(정기 리포트 등)를 붙여나가기 위한 스캐폴드입니다.
현재는 소스 연동 전 단계로, 구조와 템플릿만 먼저 세워둔 상태입니다.

## 폴더 구조

| 파일 | 용도 |
|---|---|
| `00-project-identity.md` | 이 프로젝트의 목적, 원칙, 갱신 주기 |
| `01-income-expense.md` | 수입/지출 내역 정리·집계 템플릿 |
| `02-assets-investments.md` | 자산·투자 현황 스냅샷 템플릿 |
| `03-income-growth-advice.md` | 수입 증대 조언을 위한 개인 특성·일정 인터뷰 시트 |
| `04-data-sources.md` | Notion/Drive 연동 대상 및 교차검증 절차 (연동 전 플레이스홀더) |
| `05-report-template.md` | 정기(주간/월간) 리포트 자동 생성 템플릿 |
| `reports/` | 실제로 생성된 리포트 스냅샷 저장 위치 |
| `dashboard.html` | 대시보드 아티팩트 초안(스캐폴드) 원본 |

## 대시보드

발행된 아티팩트: https://claude.ai/code/artifact/91e05df3-a507-4bd5-8bbc-cfc2a07f7c0a
(현재는 예시 데이터. 소스 연동 후 `dashboard.html`을 실데이터로 갱신하고 같은 경로로 재발행하면 링크는 유지됩니다.)

## 다음 단계 (소스 연동 시)

1. `04-data-sources.md`에 실제 Notion 페이지/데이터베이스, Google Drive 파일 링크를 등록
2. `01-income-expense.md`, `02-assets-investments.md`를 실데이터로 채움
3. 두 소스 간 불일치·누락을 `04-data-sources.md`의 교차검증 체크리스트로 점검
4. `05-report-template.md` 양식에 맞춰 정기 리포트를 `reports/`에 축적
5. `dashboard.html`을 실데이터에 연결해 대시보드 아티팩트로 재발행
