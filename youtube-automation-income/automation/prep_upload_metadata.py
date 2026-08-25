#!/usr/bin/env python3
"""Generate draft upload metadata (title/description/tags) per episode from the content calendar.

Usage:
    python3 prep_upload_metadata.py --calendar ../templates/content_calendar.csv --out ../episodes/metadata
"""
import argparse
import csv
import os


def build_metadata(row: dict) -> str:
    topic = row.get("topic") or "(제목 미정)"
    ep_no = row.get("ep_no", "")
    return (
        f"제목: {topic} | 하루 만에 알게 된 이야기 #shorts\n"
        f"설명: {topic}\n\n"
        f"팔로우하면 다음 편도 놓치지 않아요.\n\n"
        f"태그: shorts, {ep_no}\n"
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--calendar", required=True, help="Path to content_calendar.csv")
    parser.add_argument("--out", required=True, help="Output directory for per-episode metadata files")
    args = parser.parse_args()

    os.makedirs(args.out, exist_ok=True)

    with open(args.calendar, encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        count = 0
        for row in reader:
            ep_no = row.get("ep_no", "").strip()
            if not ep_no:
                continue
            out_path = os.path.join(args.out, f"{ep_no}_metadata.txt")
            with open(out_path, "w", encoding="utf-8") as out_f:
                out_f.write(build_metadata(row))
            count += 1

    print(f"Wrote {count} metadata draft(s) to {args.out}")


if __name__ == "__main__":
    main()
