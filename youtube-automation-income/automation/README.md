# 자동화 스크립트

캡컷은 공식 자동화 API가 없어 편집 단계는 자동화 대상에서 제외했다. 아래 두 스크립트는 **대본 → TTS 음성 생성**, **업로드 메타데이터 준비**만 다룬다.

## 준비물

- Typecast API 키 (타입캐스트 계정 → API 발급). 환경변수 `TYPECAST_API_KEY`로 설정.
- Python 3.9+, `pip install requests`

> **2026-08-25 직접 확인한 비용 현실**: 타입캐스트 웹 무료 플랜은 **월 5분 다운로드 한도**뿐이다 ([typecast.ai/pricing/api](https://typecast.ai/pricing/api/)). 쇼츠 1편(30~45초 TTS)만 잡아도 월 5분으로는 하루 1편 페이스(월 20~26편)를 못 버틴다 — "예산 거의 0원" 전제와 부딪히는 첫 실제 병목. API 종량제(1글자=1크레딧, $9=10만 크레딧)가 구독형보다 훨씬 쌀 가능성이 높다(에피소드당 대본이 100~200단어≈800~1000자면 10만 크레딧으로 100편 안팎 커버 추정). **다만 이건 실제 결제가 필요한 첫 지점이니, 착수 시점에 정확한 단가를 다시 확인하고 사용자 승인 후 진행할 것 — 이 문서만 보고 자동으로 결제하지 않는다.**

```bash
export TYPECAST_API_KEY="your_api_key_here"
```

## 1. `generate_tts.py` — 대본 → 음성 파일

`templates/shorts_script_template.md` 형식의 대본에서 "대본" 섹션 텍스트를 추출해 Typecast API로 mp3를 생성한다.

```bash
python3 generate_tts.py --script ../episodes/ep01_script.md --voice <voice_id> --out ../episodes/ep01.mp3
```

- `--voice`는 타입캐스트 대시보드에서 확인 가능한 보이스 ID
- 실제 엔드포인트/파라미터는 타입캐스트 API 문서 기준으로 조정 필요 (계정별 API 스펙이 바뀔 수 있음)

## 2. `prep_upload_metadata.py` — 업로드 메타데이터 생성

`templates/content_calendar.csv`를 읽어 각 에피소드의 제목/설명/태그 초안을 텍스트 파일로 뽑아준다. 실제 유튜브 업로드(오프라인 인증, OAuth)는 별도 구현이 필요하며 이 스크립트는 초안 생성까지만 담당한다.

```bash
python3 prep_upload_metadata.py --calendar ../templates/content_calendar.csv --out ../episodes/metadata
```

## 하지 않는 것

- 캡컷 편집 자동화 (API 미제공)
- 유튜브 실제 업로드 (계정 인증 필요, 정책 준수 확인 후 별도 셋업 권장)
- 조회수/수익 보장 — 이 폴더는 제작 마찰을 줄이는 도구일 뿐 성과를 보장하지 않음
