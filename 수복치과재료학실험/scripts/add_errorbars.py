#!/usr/bin/env python3
"""
pptxgenjs has no native error-bar support (confirmed: no errBars/errorBar
option anywhere in its dist bundle). This script post-processes the
generated .pptx and injects <c:errBars> (custom, symmetric SD) into the
two bar charts on the "조별 데이터 종합 비교" slide (chart1/chart2) and the
"전체 평균" series of the two comparison charts on "조별 경향성 & 우리 조(A2)
위치" (chart3, Setting time) and "조별 경향성 & 우리 조(A2) 위치 — Film Thickness" (chart4, 슬라이드 13) —
errBars go on the FIRST <c:cat> found in each file, which is the first
series in the XML, i.e. "전체 평균"; "우리 조(A2)" is left without error
bars by design since it's a single measurement, not an aggregate — per
the pptx skill's guidance: "compute the extra series yourself or
post-process the generated OOXML — do not fall back to a rendered image."

Run after `node build.js`:
    python3 scripts/add_errorbars.py 수복치과재료학실험_DentalCements_20260922.pptx

Values below must stay in the same order as settingSD / ftSD in build.js.
"""
import sys
import re
import shutil
import zipfile
from pathlib import Path

SETTING_SD = [4.02, 3.85, 2.73, 2.17, 4.04, 1.58, 0]  # 7 categories, minutes
FILM_SD = [0.0433, 0.0531, 0.0727, 0.0072, 0.0040]     # 5 categories, mm
TREND_SD = [4.02, 3.85, 2.73, 2.17, 4.04, 1.58]        # 6 categories, minutes (= SETTING_SD[:6])
FILM_TREND_SD = [0.0433, 0.0531, 0.0727, 0.0072, 0.0040]  # 5 categories, mm (= FILM_SD)

ERR_COLOR = "5B6B7A"  # C.muted


def err_bars_xml(values):
    n = len(values)
    pts = "".join(f'<c:pt idx="{i}"><c:v>{v}</c:v></c:pt>' for i, v in enumerate(values))
    num_lit = f'<c:numLit><c:formatCode>General</c:formatCode><c:ptCount val="{n}"/>{pts}</c:numLit>'
    return (
        "<c:errBars>"
        '<c:errBarType val="both"/>'
        '<c:errValType val="cust"/>'
        '<c:noEndCap val="0"/>'
        f"<c:plus>{num_lit}</c:plus>"
        f"<c:minus>{num_lit}</c:minus>"
        f'<c:spPr><a:ln w="9525"><a:solidFill><a:srgbClr val="{ERR_COLOR}"/></a:solidFill></a:ln></c:spPr>'
        "</c:errBars>"
    )


def inject(chart_xml_path, sd_values):
    content = chart_xml_path.read_text(encoding="utf-8")
    marker = "<c:cat>"
    idx = content.find(marker)
    if idx == -1:
        raise RuntimeError(f"{chart_xml_path}: <c:cat> not found — chart structure changed?")
    if "<c:errBars>" in content:
        raise RuntimeError(f"{chart_xml_path}: errBars already present — already patched?")
    patched = content[:idx] + err_bars_xml(sd_values) + content[idx:]
    chart_xml_path.write_text(patched, encoding="utf-8")


def main():
    if len(sys.argv) != 2:
        print("usage: add_errorbars.py <deck.pptx>", file=sys.stderr)
        sys.exit(1)
    pptx_path = Path(sys.argv[1])
    work = Path("/tmp/_errbar_unpack")
    if work.exists():
        shutil.rmtree(work)
    work.mkdir()

    with zipfile.ZipFile(pptx_path) as z:
        z.extractall(work)

    inject(work / "ppt/charts/chart1.xml", SETTING_SD)  # 평균 Setting time
    inject(work / "ppt/charts/chart2.xml", FILM_SD)      # 평균 Film thickness
    inject(work / "ppt/charts/chart3.xml", TREND_SD)     # 전체 평균 vs 우리 조(A2) — Setting time
    inject(work / "ppt/charts/chart4.xml", FILM_TREND_SD) # 전체 평균 vs 우리 조(A2) — Film thickness

    tmp_out = pptx_path.with_suffix(".errbar.pptx")
    if tmp_out.exists():
        tmp_out.unlink()
    with zipfile.ZipFile(tmp_out, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in sorted(work.rglob("*")):
            if f.is_file():
                zf.write(f, f.relative_to(work))
    tmp_out.replace(pptx_path)
    print(f"done — injected error bars into {pptx_path}")


if __name__ == "__main__":
    main()
