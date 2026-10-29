# CLAUDE.md

단국대 치과대학 본과 1학년(24학번, A2조) 학생의 공부·행정 보조용 저장소. 답변은 한국어로, 반말 톤을 유지한다.

## 작업 규칙
- 개발 브랜치는 `claude/notion-task-automation-c03kth`. 커밋·푸시는 이 브랜치로만 하고, PR은 사용자가 요청할 때만 만든다.
- 지인 환자 정보(차트 내용, 병력, 사진)는 이 저장소에 커밋하지 않는다. 작업 파일은 scratchpad에 둔다.
- 초안의 의학 수치, 용량, 인용은 원문으로 확인되지 않으면 쓰지 않는다. 확인 못 한 줄에는 "미확인"을 붙인다.
- 서브에이전트 조사는 원문을 못 열고 검색 요약만 본다. 결과는 보고서이지 근거가 아니며, 사용자가 가져온 논문으로 다시 대조한다.
- 되돌리기 어렵거나 외부로 나가는 행동(발행, 삭제, 전송)은 먼저 확인한다.

## 플러그인 (세션마다 유지)
클라우드 세션은 컨테이너가 새로 뜨면 사용자 범위 플러그인이 사라진다. 아래 두 가지가 이를 막는다.
1. `.claude/settings.json`의 `extraKnownMarketplaces`와 `enabledPlugins`가 마켓플레이스와 플러그인을 선언한다.
2. `.claude/hooks/ensure-plugins.sh`가 SessionStart에 빠진 플러그인만 설치한다(이미 있으면 아무것도 안 함).

설치 직후에는 스킬 목록이 현재 세션에 안 보일 수 있다. 이때는 새 세션을 열거나 세션을 새로고침한다.

| 플러그인 | 마켓플레이스 | 용도 |
|---|---|---|
| `humanize-korean` 2.3.2 | `epoko77-ai/im-not-ai` | 한글 글의 AI 티 윤문 |
| `easy-hwp` 2.0.0 | `nathankim0/easy-hwp` | HWP/HWPX 읽기·작성·서식 채우기·PDF 변환 |

수동 설치가 필요하면 다음을 실행한다.
```
claude plugin marketplace add epoko77-ai/im-not-ai
claude plugin install humanize-korean@im-not-ai
claude plugin marketplace add nathankim0/easy-hwp
claude plugin install easy-hwp@easy-hwp
claude plugin list
```
`marketplace add`는 자동 모드 분류기가 한 번 막을 수 있다. 사용자가 직접 요청한 경우에 한해 다시 실행한다.

## 스킬 교통 정리
| 하고 싶은 일 | 쓸 것 |
|---|---|
| 글에 AI 티가 있는지 빠르게 점검 | `/humanize-scan` (파일·서브에이전트 없이 대화 안에서 끝남) |
| 글 윤문 | `/humanize` (자동으로 light/standard/heavy 선택, `--strict`는 3콜) |
| 윤문 결과가 B 등급 이하일 때 | `/humanize-redo` |
| HWP/HWPX 파일 작업 | `easy-hwp`의 `hwp` 스킬 |
| 공개·공유용 페이지, 가이드 | Artifact 도구(아래 참고) |
| Drive, Calendar, Notion | 각 MCP 커넥터 |

### 윤문(humanize) 사용 규칙
- 의학 수치, 약물명, 인용 번호, 진단 기준은 그대로 보존해야 한다. 윤문 후 반드시 원본과 대조한다.
- 과제 제출물에 쓰기 전에 해당 과목의 AI 사용 규정을 사용자가 확인해야 한다.
- 입력은 5,000자 이하 단위로 나눠서 돌린다.

### Artifact
- 같은 파일 경로로 다시 발행하면 URL이 유지된다. 발행 후 `read`로 라이브 내용을 확인한다.
- 문자열 치환은 `assert s.count(a)==1`로 감싸서 조용한 무변경을 막는다.
- 변경 알림 구독은 자주 등록에 실패한다. 구독됐다고 단정하지 않는다.

## 커넥터 메모
- **Notion**: "할 일 관리" DB는 `collection://6bea353d-87a3-409a-bfd4-c6e442e61235`. 상태는 할 일/진행 중/검토 대기/보류/완료/폐기, 자동화는 자동 실행/초안만/확인 필요.
- **Google Calendar**: 계정 `frost.q@icloud.com`, 시간대 Asia/Seoul. 종일 일정은 `allDay`와 날짜 문자열, timeZone UTC로 만든다(하루 밀림 방지).
- **Google Drive**: 큰 파일은 `download_file_content`가 base64를 파일로 저장하므로 python으로 디코딩한다. 서식 PDF는 입력 불가형이라 텍스트 상자로 채운다.
- **수업일지(Notion)**: DB `collection://321ae3d0-c565-80da-97bd-000b46cf1c9b`(학교생활 하위). 속성은 수업일(title, 예: "10.12 (보강)"), 교과목(relation → 교과목별 일람), 시작/종료 시각(datetime). 수업·보강 일정을 캘린더에 등록할 때는 여기에도 같은 행을 만든다(둘 다 챙길 것). 본문은 사용자가 채운다. 시험이 수업을 대체하면 해당 수업 행을 "10.26 (중간고사)"처럼 바꾸고 시험 시각으로 고치며, 같은 날 남는 칸은 "(중간고사로 대체 - 수업 없음)"으로 표기한다.
- 일부 외부 사이트(논문, 학회, 일부 한국 사이트)는 이 환경의 프록시가 막는다. 필요한 논문은 사용자가 구해 준다.

- Notion 접근 규칙, AskUserQuestion 사용법, 입출력·프롬프트 운용 원칙은 `docs/notion-access-and-prompting.md`를 따른다.

## 저장소 구성
- `수복치과재료학실험/`, `치과약리학실험2-논문발표/`: 발표 자료(pptxgenjs 덱) 작업물.
- `총의치학개론_저작근_레포트_초안.md`: 총의치학개론 레포트 초안.
- `admission-consulting-1on1/`, `it-consulting/`: 별도 작업 자료.
