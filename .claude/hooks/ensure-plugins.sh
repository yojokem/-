#!/usr/bin/env bash
# 세션이 새 컨테이너에서 시작될 때 빠진 플러그인만 설치한다. 이미 있으면 아무것도 하지 않는다.
# 설치 직후에는 현재 세션에 스킬이 안 보일 수 있다(새로고침 필요).
set -u
command -v claude >/dev/null 2>&1 || exit 0
installed="$(claude plugin list 2>/dev/null || true)"
ensure() { # <marketplace> <github repo> <plugin>
  grep -q "$3@$1" <<<"$installed" && return 0
  claude plugin marketplace add "$2" >/dev/null 2>&1 || true
  claude plugin install "$3@$1" >/dev/null 2>&1 && echo "installed $3@$1"
}
ensure im-not-ai epoko77-ai/im-not-ai humanize-korean
ensure easy-hwp nathankim0/easy-hwp easy-hwp
exit 0
