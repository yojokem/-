#!/usr/bin/env python3
"""Extract script text from a shorts script markdown file and request TTS audio from Typecast.

Usage:
    python3 generate_tts.py --script path/to/script.md --voice VOICE_ID --out path/to/output.mp3

Requires env var TYPECAST_API_KEY.
"""
import argparse
import os
import re
import sys
import time

import requests

TYPECAST_TTS_ENDPOINT = "https://typecast.ai/api/speak"


def extract_script_text(md_path: str) -> str:
    with open(md_path, encoding="utf-8") as f:
        content = f.read()

    match = re.search(r"## 대본.*?```\n(.*?)```", content, re.DOTALL)
    if not match:
        raise ValueError("Could not find a fenced '## 대본' code block in the script file")

    lines = [line.strip() for line in match.group(1).splitlines()]
    lines = [line for line in lines if line and not line.startswith("[")]
    text = " ".join(lines)
    if not text:
        raise ValueError("Script block was found but contained no spoken text")
    return text


def request_tts(text: str, voice_id: str, api_key: str) -> bytes:
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {"actor_id": voice_id, "text": text}

    resp = requests.post(TYPECAST_TTS_ENDPOINT, json=payload, headers=headers, timeout=30)
    resp.raise_for_status()
    speak_url = resp.json().get("result", {}).get("speak_v2_url") or resp.json().get("speak_url")
    if not speak_url:
        raise RuntimeError(f"Unexpected Typecast response shape: {resp.text}")

    for _ in range(30):
        poll = requests.get(speak_url, headers=headers, timeout=30)
        poll.raise_for_status()
        data = poll.json().get("result", {})
        status = data.get("status")
        if status == "done":
            audio_url = data["audio_download_url"]
            audio = requests.get(audio_url, timeout=60)
            audio.raise_for_status()
            return audio.content
        if status == "failed":
            raise RuntimeError(f"Typecast TTS job failed: {data}")
        time.sleep(2)

    raise TimeoutError("Timed out waiting for Typecast TTS job to complete")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--script", required=True, help="Path to the shorts script markdown file")
    parser.add_argument("--voice", required=True, help="Typecast voice/actor ID")
    parser.add_argument("--out", required=True, help="Output mp3 path")
    args = parser.parse_args()

    api_key = os.environ.get("TYPECAST_API_KEY")
    if not api_key:
        sys.exit("TYPECAST_API_KEY environment variable is not set")

    text = extract_script_text(args.script)
    audio_bytes = request_tts(text, args.voice, api_key)

    with open(args.out, "wb") as f:
        f.write(audio_bytes)

    print(f"Wrote {len(audio_bytes)} bytes to {args.out}")


if __name__ == "__main__":
    main()
