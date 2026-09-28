# 로컬 AI 셋업 가이드 — RX570 4GB / Ryzen 5 3500 / RAM 16GB

## 시스템 사양
- CPU: AMD Ryzen 5 3500 (6코어, ~3.6GHz)
- RAM: 16GB
- GPU: Radeon RX 570 Series (Polaris, gfx803), VRAM 4GB
- OS: Windows 10 Pro 64비트

## ① GPU 미인식 원인
- RX570(gfx803, Polaris)은 ROCm 지원이 이미 종료된 세대. ROCm 5.x부터 Polaris 계열 제외됨.
- Windows의 ROCm/HIP SDK는 RDNA2 이상(RX 6000번대~)만 공식 지원 — RX570은 대상 아님.
- LocalAI/llama.cpp가 CUDA(NVIDIA 전용) / ROCm 백엔드로 GPU를 찾다가 실패 → "GPU 미인식"으로 표시되는 것은 정상 동작이며 버그가 아님.

## ② 해결책 — Vulkan 백엔드 사용
- RX570도 Vulkan 1.2/1.3 드라이버는 정상 지원 → CUDA/ROCm 대신 Vulkan 경유로 GPU 오프로딩 가능.
- 조치 순서
  1. AMD Adrenalin 드라이버 최신 버전으로 업데이트
  2. LocalAI의 모델 백엔드 선택 시 "auto" 대신 llama.cpp (vulkan) 백엔드를 명시적으로 선택/설치
  3. Vulkan SDK의 `vulkaninfo` 실행 → RX570이 디바이스 목록에 뜨는지 먼저 확인 (안 뜨면 드라이버 문제)
  4. 모델 실행 시 GPU 레이어 수(`n_gpu_layers`)를 자동값에 맡기지 말고 수동 설정 (4GB VRAM 한도 내에서 7B 모델 기준 20~28레이어 정도부터 시작, 작업관리자/GPU-Z로 VRAM 사용량 보며 조절)

## ③ 추천 모델 (GGUF, 실사용 기준)
- 주력 추천 — Qwen2.5-7B-Instruct (Q4_K_M, 약 4.7GB): 한국어 처리 품질 좋고 범용성 높음. VRAM 4GB에 다 안 들어가니 일부는 CPU로 분산(하이브리드) — 16GB RAM이면 무리 없음.
- 한국어 특화 — Llama-3.1-Bllossom-8B (Q4_K_M): 한국어 파인튜닝 모델, 비슷한 크기/방식.
- 속도 우선(GPU 인식 전, CPU만으로 돌릴 때) — Phi-3.5-mini-instruct(3.8B) 또는 Qwen2.5-3B-Instruct (Q4, 2~2.5GB): 6코어 CPU로도 체감 속도 준수.
- 8B 이상(Q4 기준 5GB↑)은 VRAM 초과분이 커져서 체감 속도 급격히 저하 — 이 하드웨어에선 7B급이 상한선.
