# 자동화 스크립트

캡컷은 공식 자동화 API가 없어 편집 단계는 자동화 대상에서 제외했다. 목소리도 기본은 본인 육성 녹음이라 자동화 대상이 아니다 — 아래 두 스크립트 중 `generate_tts.py`는 **TTS를 백업으로 쓸 때만** 사용하는 보조 스크립트이고, `prep_upload_metadata.py`는 **업로드 메타데이터 준비**를 돕는다.

## 준비물

- Typecast API 키 (타입캐스트 계정 → API 발급). 환경변수 `TYPECAST_API_KEY`로 설정.
- Python 3.9+, `pip install requests`

> **2026-08-25 정정 (TTS 예산 기획관 재확인)**: 앞서 "월 5분 다운로드 한도"라고 경고했던 건 **웹 대시보드 무료 플랜** 얘기였다. **`generate_tts.py`가 쓰는 API는 별도로 월 30,000 크레딧(=30,000자) 무료 티어**가 있다 ([typecast.ai/pricing/api](https://typecast.ai/pricing/api/)). 편당 대본이 100~200단어(≈570~1,140자)면 월 20~26편 페이스도 약 2.2~3만자로 대부분 무료 한도 안에 들어간다. 초과해도 $9=10만 크레딧(≈117편분)이라 실질 월 비용은 $0~9 수준 — "매달 정기결제"가 아니라 "가끔 소액 결제"에 가깝다.
> - **보험/백업**: Google Cloud TTS(Neural2)는 월 100만자 무료(영구 갱신)라 이 규모에선 사실상 완전 무료이고, "차분하고 권위 있는" 톤과도 잘 맞는 프리셋(en-US-Neural2-D/J 등)이 있다. 타입캐스트 크레딧이 예상보다 빨리 나가면 언제든 전환 가능한 무료 대체 경로로 계정만 미리 만들어두는 걸 권장.
> - **쓰지 말 것**: ElevenLabs 무료 플랜(약관상 상업적 이용=수익화 콘텐츠 금지), Edge-TTS를 운영 축으로 사용(비상업 목적 외 유료 구독 없이 쓰는 건 MS 약관 회색지대라 매일 업로드하는 수익화 채널엔 부적합), Amazon Polly(무료 티어가 가입 후 12개월로 소멸돼 장기 운영과 안 맞음).
> - 실제 결제(초과분 $9)가 필요해지는 시점이 오면 그때 다시 확인 후 사용자 승인 받고 진행 — 이 문서만 보고 자동으로 결제하지 않는다.

```bash
export TYPECAST_API_KEY="your_api_key_here"
```

## 1. `generate_tts.py` — 대본 → 음성 파일 (백업용, 기본은 본인 육성 녹음)

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
