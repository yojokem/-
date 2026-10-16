# 치과약리학2 · 2026-2 중간대비 (단국대 치의학과)

다른 세션이 이어서 작업할 수 있도록 부트스트랩 artifact와 관련 기록을 모아 둔 폴더입니다. (2026-10-14 export)

## 한눈에

| 항목 | 내용 |
|---|---|
| 시험 | 2026-2 〈치과약리학2〉 중간고사 (10/14), 범위 Ch.23~30, 객관식 80문항. Ch.31은 범위 밖 |
| **현행 프롬프트** | Notion 맨 아래의 가장 최신 블록(2026-10-14 기준). 그 아래 블록들은 직전 규칙이며 충돌 시 위쪽 최신 블록이 우선 |
| 규칙 원본 | Notion 페이지 「📚 2026-2 학사 업무 계획」 맨 아래 prompt 블록들 (이 폴더 `prompt/`에 export) |

## artifact 목록 (claude.ai)

| 이름 | 용도 | 주소 |
|---|---|---|
| 시험 대비 부트스트랩 | 새 세션에 붙여 넣는 프롬프트 생성기 (변수 입력 → 신규/갱신 프롬프트) | https://claude.ai/artifact/HZb4qYQKrGtFMBz6mSH4vC |
| 약리2 야마 정리장 | 기출·예상·모의고사·내용 정리 등 본 산출물 | https://claude.ai/artifact/PdooV35AiUcC9xm3U7yuxK |
| 약리2 약물별 지식 총정리 | 생리·기초 → 약물별 카드 → 치과 주의표, 한 페이지 세로 | https://claude.ai/artifact/MG9PhkYpev1MMxrF56BCLN |
| 23학번 중간고사 풀이 | 23학번 54문항 + Ch.30(타 학번) 17문항 퀴즈 | https://claude.ai/artifact/5DMSoUXArMBW6Ffn31Qi3i |

공유 범위는 artifact마다 다릅니다. 정리장은 링크가 있으면 열람 가능하게 공유되어 있고, 나머지는 소유 계정 기준 비공개일 수 있습니다(각 artifact의 공유 메뉴에서 확인).

## 폴더 구성

- `HANDOFF.md` 다음 세션이 먼저 읽을 인계 문서(현황·결정 이력·미결·하지 말 것)
- `bootstrap/bootstrap.html` 부트스트랩 artifact 소스 (변수 치환 로직 포함). 이 파일을 같은 주소에 다시 발행하면 갱신됨
- `prompt/current.md` Notion의 현행 블록(규칙 §0~§19 전문 + 가장 최근 개정 요약)
- `prompt/archive_old_blocks.md` 구판 블록과 복원표, 교훈 목록 기록
- `notes/mcp_drive_limits.md` Drive MCP 대용량 파일 읽기·내려받기 한계와 우회 순서
- `notes/artifact_pipeline.md` 정리장 빌드 구조와 데이터 흐름(로컬 빌드 파일은 유실되어 artifact에서 read로 복구)

## 부트스트랩 작동 방식

1. 사용자가 학교·학기·고사·교과목·학번·Notion 위치 등을 입력하면 두 가지 프롬프트(신규 제작 / 기존 artifact 갱신)가 생성됩니다.
2. 프롬프트는 규칙 본문을 담지 않고 Notion의 가장 최신 prompt 블록을 읽어 따르게 합니다. 규칙이 바뀌어도 부트스트랩은 고칠 필요가 없습니다.
3. 개정안이 따로 있으면 세션이 §18대로 적용 여부를 먼저 묻습니다.
4. 입력값은 브라우저 localStorage에만 저장됩니다.

## 사용 전제

세션에 Notion 도구와 Artifact 도구가 연결되어 있어야 하고, Google Drive 도구가 있으면 야마 자료를 직접 열람합니다.
