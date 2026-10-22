# 연대야마 추출 JSON 병합: python3 build/merge_yq.py <추출 JSON들...>  → build/yq/items.json
import json, re, sys, os
B = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, B)
import data_y
items = []
for p in sys.argv[1:]:
    items += json.load(open(p, encoding="utf-8"))
OUT = []; seen = set(); bad = []
for q in items:
    if q["id"] in seen: bad.append(("dup", q["id"])); continue
    seen.add(q["id"])
    if not (1 <= int(q["ch"]) <= 8): bad.append(("ch", q["id"])); continue
    q["opts"] = q.get("opts") or []
    if q["ans"] is not None and q["opts"] and any((a < 1 or a > len(q["opts"])) for a in q["ans"]): bad.append(("ans-range", q["id"])); q["ans"] = None; q["flags"] = q.get("flags", []) + ["정답번호 범위 밖(제외)"]
    q.setdefault("flags", []); q.setdefault("note", ""); q.setdefault("ans_text", ""); q.setdefault("ans_src", "-" if q["ans"] is None else "M")
    q["ours"] = []
    OUT.append(q)
# 우리 기출과의 겹침: data_y.YR 텍스트의 'B22 #4' 같은 표기를 접두로 매핑
PRE = {"B22": "Y22", "B21": "Y21", "B20-2": "Y202", "B20-7": "Y20K", "B18": "Y18", "B17": "Y17", "B08": "Y08", "B07": "Y07", "B06-1": "Y061", "B06-2": "Y062"}
idx = {q["id"]: q for q in OUT}
for oid, (lv, txt) in data_y.YR.items():
    if lv == "R": continue
    for m in re.finditer(r"(B22|B21|B20-2|B20-7|B18|B17|B08|B07|B06-1|B06-2) #?(\d+)", txt):
        k = "%s-%02d" % (PRE[m.group(1)], int(m.group(2)))
        if k in idx and oid not in idx[k]["ours"]: idx[k]["ours"].append(oid)
json.dump(OUT, open(os.path.join(B, "yq", "items.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=0)
print("items", len(OUT), "problems", bad[:10], len(bad))
