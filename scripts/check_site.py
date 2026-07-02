"""Structural verification for Conference FV static pages. Stdlib only."""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

REQUIRED_NAV_HREFS = [
    "index.html", "about.html", "call-for-papers.html", "speakers.html",
    "committee.html", "program.html", "registration.html", "venue.html",
    "sponsors.html", "contact.html",
]


def check_page(path: Path, must_contain=None):
    failures = []
    if not path.exists():
        return [f"{path.name}: file does not exist"]
    text = path.read_text(encoding="utf-8")

    if "<h1" not in text:
        failures.append(f"{path.name}: missing <h1>")
    if text.count("<h1") > 1:
        failures.append(f"{path.name}: more than one <h1>")
    if 'class="site-nav"' not in text:
        failures.append(f"{path.name}: missing .site-nav header")
    if 'class="site-footer"' not in text:
        failures.append(f"{path.name}: missing .site-footer")
    for href in REQUIRED_NAV_HREFS:
        if f'href="{href}"' not in text:
            failures.append(f"{path.name}: nav missing link to {href}")
    if "css/style.css" not in text or "css/nav.css" not in text:
        failures.append(f"{path.name}: missing shared CSS links")
    if "js/nav.js" not in text:
        failures.append(f"{path.name}: missing js/nav.js")

    for needle in (must_contain or []):
        if needle not in text:
            failures.append(f"{path.name}: missing expected content {needle!r}")

    return failures


def check_internal_links(html_files):
    failures = []
    known = {f.name for f in html_files}
    href_re = re.compile(r'href="([^"]+\.html)"')
    for f in html_files:
        text = f.read_text(encoding="utf-8")
        for href in href_re.findall(text):
            if href not in known:
                failures.append(f"{f.name}: links to missing page {href!r}")
    return failures


def main():
    html_files = sorted(ROOT.glob("*.html"))
    if not html_files:
        print("FAIL: no .html files found in project root")
        sys.exit(1)

    all_failures = []
    for f in html_files:
        result = check_page(f)
        if result:
            all_failures.extend(result)
        print(f"{'FAIL' if result else 'PASS'}: {f.name} ({len(result)} issue(s))")

    link_failures = check_internal_links(html_files)
    all_failures.extend(link_failures)
    if link_failures:
        print(f"FAIL: {len(link_failures)} broken internal link(s)")
    else:
        print("PASS: all internal links resolve")

    if all_failures:
        print("\n--- Failures ---")
        for fail in all_failures:
            print(" -", fail)
        sys.exit(1)
    print("\nAll pages passed structural checks.")


if __name__ == "__main__":
    main()
