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

## ② 시도했다가 막힌 경로 — Docker + WSL2 + Vulkan
- RX570도 Vulkan 자체는 지원하므로, 처음엔 `localai/localai:latest-gpu-vulkan` 이미지를 Docker(WSL2 백엔드)로 돌리는 방식을 시도함.
- `/dev/dxg` 디바이스 패스스루, `/usr/lib/wsl` 마운트까지 정상 확인했지만 실제 GPU는 계속 안 잡힘 (`vulkaninfo` 결과 `llvmpipe` 소프트웨어 렌더러만 노출).
- 원인: `/dev/dxg`를 실제 GPU 명령으로 변환하는 **Mesa `dzn`(Dozen) Vulkan 드라이버 자체가 없음**. Docker 이미지뿐 아니라 WSL2(Ubuntu) 자체 `/usr/share/vulkan/icd.d/`에도 `dzn_icd.json`이 없는 것으로 확인 — Docker 문제가 아니라 **WSL2 경로 자체가 이 환경에서 막혀 있음**.
- 결론: RX570(Polaris) 세대는 WSL2의 GPU 패스스루(D3D12 변환 경로) 대상에서 빠져 있을 가능성이 높음. Docker/WSL2로는 더 진행 불가.

## ③ 실제로 성공한 방법 — Windows 네이티브 llama.cpp (Vulkan 빌드)
- LocalAI는 Windows용 순정 설치파일이 없음(Linux/macOS 바이너리 + Docker/WSL만 공식 지원) → 대신 **llama.cpp의 Windows Vulkan 빌드를 직접 실행**해서 우회.
- Docker/WSL을 완전히 거치지 않으므로 `dzn` 변환 레이어 문제 자체가 발생하지 않음 (Windows AMD Adrenalin 드라이버가 Vulkan을 네이티브로 지원).
- 조치 순서
  1. https://github.com/ggml-org/llama.cpp/releases/latest 에서 `llama-*-bin-win-vulkan-x64.zip` 다운로드
  2. `D:\RemoteCloud\LocalAI\llama-vulkan`에 압축 해제
  3. PowerShell에서 실행:
     ```
     .\llama-server.exe -m D:\RemoteCloud\LocalAI\models\<모델>.gguf --host 0.0.0.0 --port 8080 -ngl 999
     ```
  4. 성공 확인: 작업관리자 → 성능 → GPU에서 **전용 GPU 메모리**가 모델 크기만큼 차오르는지 확인 (예: Qwen3-4B Q4 로드 시 3.3/4.0GB 사용 확인됨 — 콘솔에 `Found Vulkan devices` 로그 줄이 안 보여도 VRAM 점유가 더 확실한 증거)
  5. 브라우저에서 `localhost:8080` 그대로 접속, `/v1/chat/completions`도 OpenAI 호환으로 동일하게 동작

## ③ 추천 모델 (GGUF, 실사용 기준)
- 주력 추천 — Qwen2.5-7B-Instruct (Q4_K_M, 약 4.7GB): 한국어 처리 품질 좋고 범용성 높음. VRAM 4GB에 다 안 들어가니 일부는 CPU로 분산(하이브리드) — 16GB RAM이면 무리 없음.
- 한국어 특화 — Llama-3.1-Bllossom-8B (Q4_K_M): 한국어 파인튜닝 모델, 비슷한 크기/방식.
- 속도 우선(GPU 인식 전, CPU만으로 돌릴 때) — Phi-3.5-mini-instruct(3.8B) 또는 Qwen2.5-3B-Instruct (Q4, 2~2.5GB): 6코어 CPU로도 체감 속도 준수.
- 8B 이상(Q4 기준 5GB↑)은 VRAM 초과분이 커져서 체감 속도 급격히 저하 — 이 하드웨어에선 7B급이 상한선.
