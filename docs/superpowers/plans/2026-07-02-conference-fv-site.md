# Conference FV Static Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, 10-page, dummy-content international academic conference website (ICAVTI 2026) matching the approved design spec.

**Architecture:** Plain HTML/CSS/JS, zero build step, zero dependencies. Every page is a standalone `.html` file that repeats an identical header/nav/footer block (defined verbatim in Task 2) so the site works opened directly via `file://` or via a local static server. Shared visual language lives in two CSS files; shared behavior (mobile menu, active-link highlight, program tab switching) lives in one JS file.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS (ES6), Google Fonts (Crimson Pro, Atkinson Hyperlegible), Python's built-in `http.server` for local preview.

## Global Constraints

- No framework, no bundler, no npm dependencies — plain static files only (per spec "Out of Scope").
- Colors: Primary `#1E3A8A`, Secondary `#1E40AF`, Accent `#B45309`, Background `#F8FAFC`, Foreground `#0F172A`, Muted `#E9EEF5`/`#64748B`, Border `#CBD5E1`, Destructive `#DC2626`.
- Typography: headings use `Crimson Pro`, body uses `Atkinson Hyperlegible`, both loaded via Google Fonts `<link>` (not `@import`, for performance).
- Structural principle: full-bleed alternating "section bands" (navy → white → muted → white) divide page sections instead of hairline borders.
- No hotlinked external images. Any "photo" (speaker, committee, sponsor) is a generated inline SVG placeholder (initials-monogram avatar), so the site is fully self-contained offline.
- Responsive breakpoints: 375 / 768 / 1024 / 1440px. Nav collapses to hamburger below 768px.
- Accessibility: text contrast ≥ 4.5:1, visible focus outlines, `prefers-reduced-motion` respected, one `<h1>` per page, sequential heading levels.
- All 10 nav links (`index.html`, `about.html`, `call-for-papers.html`, `speakers.html`, `committee.html`, `program.html`, `registration.html`, `venue.html`, `sponsors.html`, `contact.html`) must appear, in that order, in the header nav and footer sitemap of **every** page.

## Dummy Content Reference

Use these exact values everywhere they appear — do not invent new names/dates in individual page tasks, so the site reads as internally consistent.

**Identity:** ICAVTI 2026 — *3rd International Conference on Applied Vocational Technology & Innovation*. Theme: "Bridging Vocational Education and Industry 5.0: Innovation, Sustainability, and Digital Transformation." Hybrid, **November 18–19, 2026**, Grand Malang Convention Hotel, Malang, East Java, Indonesia. Organizer: Faculty of Vocational Studies, Nusantara State University (fictitious). Contact: `icavti2026@example.org`, +62 341 000 0000.

**Important dates:**
| Milestone | Date |
|---|---|
| Paper Submission Deadline | August 15, 2026 |
| Notification of Acceptance | September 10, 2026 |
| Early Bird Registration Deadline | September 20, 2026 |
| Camera-Ready Submission | October 5, 2026 |
| Regular Registration Deadline | October 20, 2026 |
| Conference Dates | November 18–19, 2026 |

**Topics/Tracks:** Vocational Education & Curriculum Innovation · Industrial Technology & Automation · Digital Transformation & Applied Informatics · Sustainable Engineering & Renewable Energy · Business, Tourism & Creative Industry · Health Technology & Applied Sciences

**Keynote speakers:**
1. Prof. Dr. Hana Wirawan — Nusantara State University, Indonesia — "Future-Ready Vocational Education"
2. Prof. Michael R. Bennett, PhD — Whitfield University of Technology, United Kingdom — "Industry 5.0 and the Skills Gap"
3. Assoc. Prof. Yuki Tanaka — Sakura Institute of Technology, Japan — "Smart Manufacturing for Applied Education"
4. Dr. Amara Osei — Kente Polytechnic, Ghana — "Sustainable Innovation in Emerging Economies"

**Committee:**
- Conference Chair: Dr. Bagus Prasetyo · Co-Chair: Dr. Ratna Kusumawati
- Steering Committee: Prof. Dr. Hana Wirawan (Chair), Prof. Dr. Slamet Widodo, Prof. Michael R. Bennett
- Organizing Committee: Dr. Ayu Lestari (Secretary), Dr. Fajar Nugroho (Treasurer), Dr. Dian Puspita (Publication), Dr. Rizky Ramadhan (Logistics)
- Technical Program Committee: Assoc. Prof. Yuki Tanaka, Dr. Amara Osei, Dr. Wayan Suartika, Dr. Nur Aisyah, Dr. Kevin Lim

**Program:**
Day 1 (Nov 18): 08:00 Registration · 09:00 Opening · 09:30 Keynote 1 (Wirawan) · 10:45 Parallel 1A–1D · 12:15 Lunch · 13:15 Keynote 2 (Bennett) · 14:15 Parallel 2A–2D · 16:00 Panel Discussion
Day 2 (Nov 19): 08:30 Keynote 3 (Tanaka) · 09:30 Parallel 3A–3D · 11:15 Keynote 4 (Osei) · 12:15 Lunch · 13:15 Parallel 4A–4D · 14:45 Best Paper Award & Closing

**Registration fees:**
| Category | Early Bird | Regular |
|---|---|---|
| Domestic Presenter | IDR 2,500,000 | IDR 3,000,000 |
| International Presenter | USD 250 | USD 300 |
| Domestic Participant | IDR 750,000 | IDR 1,000,000 |
| International Participant | USD 100 | USD 130 |
| Additional Paper (same author) | IDR 1,500,000 | USD 150 |

**Venue:** Grand Malang Convention Hotel, Jl. Ijen Boulevard No. 45, Malang, East Java 65119, Indonesia. ~25 min from Abdul Rachman Saleh Airport (MLG).

**Sponsors:** Nusantara State University · PT Teknologi Vokasi Indonesia · IEEE Indonesia Section (sample) · Bank Nusantara · GreenTech Foundation.

---

## File Structure

- `css/style.css` — design tokens (CSS custom properties), reset, typography scale, section-band utilities, button/card components
- `css/nav.css` — header, nav, hamburger menu, footer, sitemap grid
- `js/nav.js` — mobile menu toggle, active-nav-link marking, `program.html` day-tab switching
- `scripts/check_site.py` — structural verification script (no external deps, stdlib only)
- `index.html`, `about.html`, `call-for-papers.html`, `speakers.html`, `committee.html`, `program.html`, `registration.html`, `venue.html`, `sponsors.html`, `contact.html`
- `run-local.bat` — local preview launcher (`python -m http.server`)

---

### Task 1: Design tokens, shared CSS, nav JS, verification script

**Files:**
- Create: `css/style.css`
- Create: `css/nav.css`
- Create: `js/nav.js`
- Create: `scripts/check_site.py`

**Interfaces:**
- Produces: CSS custom properties consumed by every page (`--color-primary`, `--color-secondary`, `--color-accent`, `--color-bg`, `--color-fg`, `--color-muted`, `--color-muted-fg`, `--color-border`, `--font-heading`, `--font-body`); utility classes `.band`, `.band--navy`, `.band--muted`, `.container`, `.btn`, `.btn--primary`, `.btn--ghost`, `.card`; nav/footer classes `.site-header`, `.site-nav`, `.nav-toggle`, `.site-footer`
- Produces: `scripts/check_site.py` importable function `check_page(path, must_contain: list[str]) -> list[str]` returning a list of failure strings (empty list = pass), and a `main()` that scans all `*.html` files in the project root and prints a PASS/FAIL summary.

- [ ] **Step 1: Create `css/style.css` with design tokens and base styles**

```css
/* css/style.css — Conference FV design tokens & base styles */
:root {
  --color-primary: #1E3A8A;
  --color-secondary: #1E40AF;
  --color-accent: #B45309;
  --color-bg: #F8FAFC;
  --color-fg: #0F172A;
  --color-muted: #E9EEF5;
  --color-muted-fg: #64748B;
  --color-border: #CBD5E1;
  --color-destructive: #DC2626;
  --color-on-primary: #FFFFFF;

  --font-heading: "Crimson Pro", Georgia, serif;
  --font-body: "Atkinson Hyperlegible", Arial, sans-serif;

  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 80px;

  --radius-sm: 6px;
  --radius-md: 10px;
  --container-max: 1200px;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

body {
  margin: 0;
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-fg);
  background: var(--color-bg);
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 600;
  line-height: 1.1;
  margin: 0 0 var(--space-4);
  color: var(--color-fg);
}
h1 { font-size: clamp(2.25rem, 4vw, 3.5rem); line-height: 1.05; }
h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); }
h3 { font-size: 1.375rem; }
p { margin: 0 0 var(--space-4); }
a { color: var(--color-primary); }
a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-5);
}

.band { padding: var(--space-8) 0; }
.band--navy { background: var(--color-primary); color: var(--color-on-primary); }
.band--navy h1, .band--navy h2, .band--navy h3 { color: var(--color-on-primary); }
.band--navy a:not(.btn) { color: #DCE6FA; }
.band--muted { background: var(--color-muted); }
.band--white { background: #FFFFFF; }

.btn {
  display: inline-block;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 1rem;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  cursor: pointer;
  border: 2px solid transparent;
  transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease;
}
.btn--primary { background: var(--color-accent); color: #FFFFFF; }
.btn--primary:hover { background: #92400A; }
.btn--ghost { background: transparent; border-color: currentColor; color: inherit; }
.btn--ghost:hover { background: rgba(255,255,255,0.12); }
.band--white .btn--ghost:hover, .band--muted .btn--ghost:hover { background: rgba(15,23,42,0.06); }

.card {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-5);
}

.grid {
  display: grid;
  gap: var(--space-5);
}
@media (min-width: 640px) { .grid--2 { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 768px) { .grid--3 { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .grid--4 { grid-template-columns: repeat(4, 1fr); } }

table { width: 100%; border-collapse: collapse; background: #FFFFFF; }
th, td { text-align: left; padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--color-border); }
th { font-family: var(--font-heading); font-weight: 600; background: var(--color-muted); }

.avatar {
  width: 96px; height: 96px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: var(--color-primary); color: #FFFFFF;
  font-family: var(--font-heading); font-weight: 600; font-size: 1.75rem;
  margin-bottom: var(--space-3);
}
```

- [ ] **Step 2: Create `css/nav.css` for header, nav, hamburger, footer**

```css
/* css/nav.css — header/nav/footer, responsive */
.site-header {
  position: sticky; top: 0; z-index: 100;
  background: #FFFFFF;
  border-bottom: 1px solid var(--color-border);
}
.site-header .container {
  display: flex; align-items: center; justify-content: space-between;
  min-height: 72px;
}
.brand {
  font-family: var(--font-heading); font-weight: 700; font-size: 1.25rem;
  color: var(--color-fg); text-decoration: none;
}
.brand span { color: var(--color-accent); }

.site-nav { display: flex; }
.site-nav ul {
  list-style: none; display: flex; gap: var(--space-5);
  margin: 0; padding: 0;
}
.site-nav a {
  color: var(--color-fg); text-decoration: none; font-weight: 600; font-size: 0.95rem;
  padding: var(--space-2) 0; border-bottom: 3px solid transparent;
}
.site-nav a:hover, .site-nav a[aria-current="page"] {
  color: var(--color-primary); border-bottom-color: var(--color-accent);
}

.nav-toggle {
  display: none;
  background: none; border: none; cursor: pointer;
  width: 44px; height: 44px; padding: 8px;
}
.nav-toggle span {
  display: block; width: 100%; height: 2px; background: var(--color-fg);
  margin: 6px 0; transition: transform 200ms ease, opacity 200ms ease;
}

@media (max-width: 767px) {
  .nav-toggle { display: block; }
  .site-nav {
    position: absolute; top: 72px; left: 0; right: 0;
    background: #FFFFFF; border-bottom: 1px solid var(--color-border);
    display: none;
  }
  .site-nav.is-open { display: block; }
  .site-nav ul { flex-direction: column; gap: 0; padding: var(--space-3) var(--space-5); }
  .site-nav a { display: block; padding: var(--space-3) 0; }
}

.site-footer {
  background: var(--color-fg); color: #CBD5E1;
  padding: var(--space-7) 0 var(--space-5);
  margin-top: var(--space-8);
}
.site-footer a { color: #FFFFFF; text-decoration: none; }
.site-footer a:hover { text-decoration: underline; }
.footer-grid {
  display: grid; gap: var(--space-5);
  grid-template-columns: 1fr;
}
@media (min-width: 768px) { .footer-grid { grid-template-columns: 2fr 1fr 1fr; } }
.footer-grid h4 { color: #FFFFFF; font-size: 1rem; margin-bottom: var(--space-3); }
.footer-grid ul { list-style: none; margin: 0; padding: 0; }
.footer-grid li { margin-bottom: var(--space-2); }
.footer-bottom {
  margin-top: var(--space-6); padding-top: var(--space-4);
  border-top: 1px solid #334155; font-size: 0.875rem; color: var(--color-muted-fg);
}
```

- [ ] **Step 3: Create `js/nav.js` for mobile menu, active link, program tabs**

```js
// js/nav.js — shared behavior for all pages
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  var currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });

  var tabButtons = document.querySelectorAll("[data-day-tab]");
  var tabPanels = document.querySelectorAll("[data-day-panel]");
  if (tabButtons.length && tabPanels.length) {
    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-day-tab");
        tabButtons.forEach(function (b) {
          b.setAttribute("aria-selected", String(b === btn));
        });
        tabPanels.forEach(function (panel) {
          panel.hidden = panel.getAttribute("data-day-panel") !== target;
        });
      });
    });
  }
})();
```

- [ ] **Step 4: Create `scripts/check_site.py` verification script**

```python
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

    if all_failures:
        print("\n--- Failures ---")
        for fail in all_failures:
            print(" -", fail)
        sys.exit(1)
    print("\nAll pages passed structural checks.")


if __name__ == "__main__":
    main()
```

- [ ] **Step 5: Run the verification script to confirm it executes cleanly (expected FAIL — no HTML pages yet)**

Run: `python scripts/check_site.py`
Expected: `FAIL: no .html files found in project root` and exit code 1 — confirms the script runs without syntax/import errors before any pages exist.

- [ ] **Step 6: Commit**

```bash
git add css/style.css css/nav.css js/nav.js scripts/check_site.py
git commit -m "Add design tokens, shared nav/footer CSS, shared JS, and structural verification script"
```

---

### Task 2: Home page (`index.html`) — establishes the canonical header/footer pattern

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: CSS classes and JS from Task 1 (`css/style.css`, `css/nav.css`, `js/nav.js`)
- Produces: the canonical `<header class="site-header">...</header>` and `<footer class="site-footer">...</footer>` markup block that **every subsequent page task must copy verbatim**, changing only which nav `<a>` carries `aria-current="page"` is handled automatically by `js/nav.js` (do not hardcode `aria-current` in the markup).

- [ ] **Step 1: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ICAVTI 2026 — International Conference on Applied Vocational Technology & Innovation</title>
<meta name="description" content="ICAVTI 2026: 3rd International Conference on Applied Vocational Technology & Innovation. November 18–19, 2026, Malang, Indonesia.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Crimson+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/nav.css">
</head>
<body>
<header class="site-header">
  <div class="container">
    <a class="brand" href="index.html">ICAVTI<span>2026</span></a>
    <nav class="site-nav" aria-label="Main navigation">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="call-for-papers.html">Call for Papers</a></li>
        <li><a href="speakers.html">Speakers</a></li>
        <li><a href="committee.html">Committee</a></li>
        <li><a href="program.html">Program</a></li>
        <li><a href="registration.html">Registration</a></li>
        <li><a href="venue.html">Venue</a></li>
        <li><a href="sponsors.html">Sponsors</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
    <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<main>
  <section class="band band--navy">
    <div class="container">
      <p style="text-transform:uppercase; letter-spacing:0.08em; font-weight:700; color:#DCE6FA;">November 18–19, 2026 · Malang, Indonesia · Hybrid</p>
      <h1>ICAVTI 2026</h1>
      <p style="max-width:640px; font-size:1.125rem;">3rd International Conference on Applied Vocational Technology &amp; Innovation — Bridging Vocational Education and Industry 5.0: Innovation, Sustainability, and Digital Transformation.</p>
      <div style="display:flex; gap:var(--space-4); flex-wrap:wrap; margin-top:var(--space-5);">
        <a class="btn btn--primary" href="call-for-papers.html">Submit a Paper</a>
        <a class="btn btn--ghost" href="registration.html">Register Now</a>
      </div>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <h2>Key Dates</h2>
      <div class="grid grid--4">
        <div class="card"><h3>Aug 15, 2026</h3><p>Paper Submission Deadline</p></div>
        <div class="card"><h3>Sep 20, 2026</h3><p>Early Bird Registration Ends</p></div>
        <div class="card"><h3>Oct 5, 2026</h3><p>Camera-Ready Submission</p></div>
        <div class="card"><h3>Nov 18–19, 2026</h3><p>Conference Dates</p></div>
      </div>
    </div>
  </section>

  <section class="band band--muted">
    <div class="container">
      <h2>About ICAVTI 2026</h2>
      <p style="max-width:760px;">ICAVTI is an annual international forum organized by the Faculty of Vocational Studies, Nusantara State University, bringing together researchers, practitioners, and industry leaders working at the intersection of vocational education and applied technology. Accepted papers will be submitted for indexing in IEEE Xplore and Scopus.</p>
      <a class="btn btn--primary" href="about.html">Read More</a>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <h2>Keynote Speakers</h2>
      <div class="grid grid--4">
        <div class="card"><div class="avatar">HW</div><h3>Prof. Dr. Hana Wirawan</h3><p>Nusantara State University, Indonesia</p></div>
        <div class="card"><div class="avatar">MB</div><h3>Prof. Michael R. Bennett, PhD</h3><p>Whitfield University of Technology, UK</p></div>
        <div class="card"><div class="avatar">YT</div><h3>Assoc. Prof. Yuki Tanaka</h3><p>Sakura Institute of Technology, Japan</p></div>
        <div class="card"><div class="avatar">AO</div><h3>Dr. Amara Osei</h3><p>Kente Polytechnic, Ghana</p></div>
      </div>
      <p style="margin-top:var(--space-5);"><a href="speakers.html">View all speakers &rarr;</a></p>
    </div>
  </section>

  <section class="band band--muted">
    <div class="container">
      <h2>Organized &amp; Supported By</h2>
      <div class="grid grid--4">
        <div class="card" style="text-align:center;"><strong>Nusantara State University</strong></div>
        <div class="card" style="text-align:center;"><strong>PT Teknologi Vokasi Indonesia</strong></div>
        <div class="card" style="text-align:center;"><strong>IEEE Indonesia Section</strong></div>
        <div class="card" style="text-align:center;"><strong>GreenTech Foundation</strong></div>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4>ICAVTI 2026</h4>
        <p>Faculty of Vocational Studies, Nusantara State University<br>Jl. Pendidikan Vokasi No. 1, Malang, East Java 65145, Indonesia</p>
        <p>Email: <a href="mailto:icavti2026@example.org">icavti2026@example.org</a><br>Phone: +62 341 000 0000</p>
      </div>
      <div>
        <h4>Conference</h4>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="call-for-papers.html">Call for Papers</a></li>
          <li><a href="speakers.html">Speakers</a></li>
          <li><a href="committee.html">Committee</a></li>
          <li><a href="program.html">Program</a></li>
        </ul>
      </div>
      <div>
        <h4>Attend</h4>
        <ul>
          <li><a href="registration.html">Registration</a></li>
          <li><a href="venue.html">Venue</a></li>
          <li><a href="sponsors.html">Sponsors</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 ICAVTI. All names, dates, and figures on this site are placeholder content for demonstration purposes.</p>
    </div>
  </div>
</footer>

<script src="js/nav.js"></script>
</body>
</html>
```

- [ ] **Step 2: Run the verification script — expect PASS for index.html**

Run: `python scripts/check_site.py`
Expected: `PASS: index.html (0 issue(s))` (may still list FAIL lines for other pages not yet created — only `index.html` must show PASS at this point).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add home page with hero, key dates, about summary, speakers preview, sponsors strip"
```

---

### Task 3: About page (`about.html`)

**Files:**
- Create: `about.html`

**Interfaces:**
- Consumes: header/footer block from Task 2 (copy verbatim, update only `<title>`, meta description, and `<main>` content)

- [ ] **Step 1: Write `about.html`** using the Task 2 header/footer verbatim, with `<title>About — ICAVTI 2026</title>` and this `<main>`:

```html
<main>
  <section class="band band--navy">
    <div class="container">
      <h1>About ICAVTI 2026</h1>
      <p style="max-width:640px; font-size:1.125rem;">Bridging Vocational Education and Industry 5.0: Innovation, Sustainability, and Digital Transformation.</p>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <h2>Overview</h2>
      <p style="max-width:760px;">The International Conference on Applied Vocational Technology &amp; Innovation (ICAVTI) is organized annually by the Faculty of Vocational Studies, Nusantara State University. Now in its 3rd edition, ICAVTI 2026 brings together researchers, educators, industry practitioners, and policymakers to share advances in vocational education, applied engineering, digital transformation, and sustainable innovation. The 2026 edition will be held in hybrid format on November 18&ndash;19, 2026 in Malang, Indonesia.</p>
    </div>
  </section>

  <section class="band band--muted">
    <div class="container">
      <h2>Objectives</h2>
      <div class="grid grid--3">
        <div class="card"><h3>Knowledge Exchange</h3><p>Provide a forum for researchers and practitioners to present original work in applied vocational technology.</p></div>
        <div class="card"><h3>Industry Collaboration</h3><p>Strengthen links between vocational education institutions and industry partners facing Industry 5.0 challenges.</p></div>
        <div class="card"><h3>Sustainable Innovation</h3><p>Promote research addressing sustainability, digital transformation, and inclusive economic growth.</p></div>
      </div>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <h2>Publication &amp; Indexing</h2>
      <p style="max-width:760px;">All accepted and presented papers will be published in the conference proceedings and submitted for indexing in <strong>IEEE Xplore</strong> and <strong>Scopus</strong>. Selected outstanding papers will be invited to extend their work for publication in partner journals.</p>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Run verification**

Run: `python scripts/check_site.py`
Expected: `PASS: about.html (0 issue(s))`

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "Add about page with overview, objectives, publication/indexing info"
```

---

### Task 4: Call for Papers page (`call-for-papers.html`)

**Files:**
- Create: `call-for-papers.html`

**Interfaces:**
- Consumes: header/footer block from Task 2

- [ ] **Step 1: Write `call-for-papers.html`**, title `Call for Papers — ICAVTI 2026`, `<main>`:

```html
<main>
  <section class="band band--navy">
    <div class="container">
      <h1>Call for Papers</h1>
      <p style="max-width:640px; font-size:1.125rem;">We invite original, unpublished research contributions across the following tracks.</p>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <h2>Topics &amp; Tracks</h2>
      <div class="grid grid--3">
        <div class="card"><h3>Track A</h3><p>Vocational Education &amp; Curriculum Innovation</p></div>
        <div class="card"><h3>Track B</h3><p>Industrial Technology &amp; Automation</p></div>
        <div class="card"><h3>Track C</h3><p>Digital Transformation &amp; Applied Informatics</p></div>
        <div class="card"><h3>Track D</h3><p>Sustainable Engineering &amp; Renewable Energy</p></div>
        <div class="card"><h3>Track E</h3><p>Business, Tourism &amp; Creative Industry</p></div>
        <div class="card"><h3>Track F</h3><p>Health Technology &amp; Applied Sciences</p></div>
      </div>
    </div>
  </section>

  <section class="band band--muted">
    <div class="container">
      <h2>Submission Guidelines</h2>
      <ul style="max-width:760px; line-height:1.8;">
        <li>Papers must be original and not under review elsewhere.</li>
        <li>Manuscripts should be 6&ndash;10 pages, formatted using the IEEE conference template.</li>
        <li>Submissions are handled through the conference's online submission system (dummy link for this demo).</li>
        <li>All papers undergo double-blind peer review by at least two Technical Program Committee members.</li>
        <li>At least one author of each accepted paper must register and present at the conference.</li>
      </ul>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <h2>Key Deadlines</h2>
      <table>
        <thead><tr><th>Milestone</th><th>Date</th></tr></thead>
        <tbody>
          <tr><td>Paper Submission Deadline</td><td>August 15, 2026</td></tr>
          <tr><td>Notification of Acceptance</td><td>September 10, 2026</td></tr>
          <tr><td>Camera-Ready Submission</td><td>October 5, 2026</td></tr>
        </tbody>
      </table>
      <p style="margin-top:var(--space-5);"><a class="btn btn--primary" href="registration.html">Proceed to Registration</a></p>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Run verification** — Run: `python scripts/check_site.py` — Expected: `PASS: call-for-papers.html (0 issue(s))`

- [ ] **Step 3: Commit**

```bash
git add call-for-papers.html
git commit -m "Add call for papers page with tracks, submission guidelines, deadlines"
```

---

### Task 5: Speakers page (`speakers.html`)

**Files:**
- Create: `speakers.html`

**Interfaces:**
- Consumes: header/footer block from Task 2, `.avatar` component from Task 1

- [ ] **Step 1: Write `speakers.html`**, title `Keynote Speakers — ICAVTI 2026`, `<main>`:

```html
<main>
  <section class="band band--navy">
    <div class="container">
      <h1>Keynote Speakers</h1>
      <p style="max-width:640px; font-size:1.125rem;">Leading voices in vocational education and applied technology.</p>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <div class="grid grid--2">
        <div class="card">
          <div class="avatar">HW</div>
          <h3>Prof. Dr. Hana Wirawan</h3>
          <p><em>Nusantara State University, Indonesia</em></p>
          <p>Keynote: "Future-Ready Vocational Education" &mdash; explores curriculum models that adapt vocational training to rapidly evolving industry needs.</p>
        </div>
        <div class="card">
          <div class="avatar">MB</div>
          <h3>Prof. Michael R. Bennett, PhD</h3>
          <p><em>Whitfield University of Technology, United Kingdom</em></p>
          <p>Keynote: "Industry 5.0 and the Skills Gap" &mdash; examines how human-centric automation reshapes workforce skill requirements.</p>
        </div>
        <div class="card">
          <div class="avatar">YT</div>
          <h3>Assoc. Prof. Yuki Tanaka</h3>
          <p><em>Sakura Institute of Technology, Japan</em></p>
          <p>Keynote: "Smart Manufacturing for Applied Education" &mdash; presents case studies integrating smart-factory concepts into vocational labs.</p>
        </div>
        <div class="card">
          <div class="avatar">AO</div>
          <h3>Dr. Amara Osei</h3>
          <p><em>Kente Polytechnic, Ghana</em></p>
          <p>Keynote: "Sustainable Innovation in Emerging Economies" &mdash; discusses low-resource, high-impact approaches to sustainable applied research.</p>
        </div>
      </div>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Run verification** — Run: `python scripts/check_site.py` — Expected: `PASS: speakers.html (0 issue(s))`

- [ ] **Step 3: Commit**

```bash
git add speakers.html
git commit -m "Add speakers page with keynote speaker profiles"
```

---

### Task 6: Committee page (`committee.html`)

**Files:**
- Create: `committee.html`

**Interfaces:**
- Consumes: header/footer block from Task 2

- [ ] **Step 1: Write `committee.html`**, title `Committee — ICAVTI 2026`, `<main>`:

```html
<main>
  <section class="band band--navy">
    <div class="container">
      <h1>Committee</h1>
      <p style="max-width:640px; font-size:1.125rem;">The people organizing and reviewing ICAVTI 2026.</p>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <h2>Conference Leadership</h2>
      <div class="grid grid--2">
        <div class="card"><h3>Conference Chair</h3><p>Dr. Bagus Prasetyo</p></div>
        <div class="card"><h3>Co-Chair</h3><p>Dr. Ratna Kusumawati</p></div>
      </div>
    </div>
  </section>

  <section class="band band--muted">
    <div class="container">
      <h2>Steering Committee</h2>
      <ul style="line-height:1.8;">
        <li>Prof. Dr. Hana Wirawan (Chair) &mdash; Nusantara State University, Indonesia</li>
        <li>Prof. Dr. Slamet Widodo &mdash; Nusantara State University, Indonesia</li>
        <li>Prof. Michael R. Bennett &mdash; Whitfield University of Technology, UK</li>
      </ul>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <h2>Organizing Committee</h2>
      <ul style="line-height:1.8;">
        <li>Dr. Ayu Lestari &mdash; Secretary</li>
        <li>Dr. Fajar Nugroho &mdash; Treasurer</li>
        <li>Dr. Dian Puspita &mdash; Publication</li>
        <li>Dr. Rizky Ramadhan &mdash; Logistics</li>
      </ul>
    </div>
  </section>

  <section class="band band--muted">
    <div class="container">
      <h2>Technical Program Committee</h2>
      <ul style="line-height:1.8;">
        <li>Assoc. Prof. Yuki Tanaka &mdash; Sakura Institute of Technology, Japan</li>
        <li>Dr. Amara Osei &mdash; Kente Polytechnic, Ghana</li>
        <li>Dr. Wayan Suartika &mdash; Nusantara State University, Indonesia</li>
        <li>Dr. Nur Aisyah &mdash; Nusantara State University, Indonesia</li>
        <li>Dr. Kevin Lim &mdash; National University of Singapore, Singapore</li>
      </ul>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Run verification** — Run: `python scripts/check_site.py` — Expected: `PASS: committee.html (0 issue(s))`

- [ ] **Step 3: Commit**

```bash
git add committee.html
git commit -m "Add committee page with leadership, steering, organizing, and technical program committees"
```

---

### Task 7: Program page (`program.html`) — includes day-tab JS behavior

**Files:**
- Create: `program.html`

**Interfaces:**
- Consumes: header/footer block from Task 2, `[data-day-tab]` / `[data-day-panel]` behavior from `js/nav.js` (Task 1)

- [ ] **Step 1: Write `program.html`**, title `Program — ICAVTI 2026`, `<main>`:

```html
<main>
  <section class="band band--navy">
    <div class="container">
      <h1>Program</h1>
      <p style="max-width:640px; font-size:1.125rem;">Tentative schedule, subject to change.</p>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <div role="tablist" aria-label="Conference days" style="display:flex; gap:var(--space-3); margin-bottom:var(--space-5);">
        <button class="btn btn--ghost" style="border-color:var(--color-border); color:var(--color-fg);" data-day-tab="day1" role="tab" aria-selected="true">Day 1 &mdash; Nov 18</button>
        <button class="btn btn--ghost" style="border-color:var(--color-border); color:var(--color-fg);" data-day-tab="day2" role="tab" aria-selected="false">Day 2 &mdash; Nov 19</button>
      </div>

      <div data-day-panel="day1">
        <table>
          <thead><tr><th>Time</th><th>Session</th></tr></thead>
          <tbody>
            <tr><td>08:00 &ndash; 09:00</td><td>Registration &amp; Welcome Coffee</td></tr>
            <tr><td>09:00 &ndash; 09:30</td><td>Opening Ceremony</td></tr>
            <tr><td>09:30 &ndash; 10:30</td><td>Keynote 1 &mdash; Prof. Dr. Hana Wirawan</td></tr>
            <tr><td>10:30 &ndash; 10:45</td><td>Coffee Break</td></tr>
            <tr><td>10:45 &ndash; 12:15</td><td>Parallel Session 1A&ndash;1D</td></tr>
            <tr><td>12:15 &ndash; 13:15</td><td>Lunch</td></tr>
            <tr><td>13:15 &ndash; 14:15</td><td>Keynote 2 &mdash; Prof. Michael R. Bennett</td></tr>
            <tr><td>14:15 &ndash; 15:45</td><td>Parallel Session 2A&ndash;2D</td></tr>
            <tr><td>15:45 &ndash; 16:00</td><td>Coffee Break</td></tr>
            <tr><td>16:00 &ndash; 17:00</td><td>Panel Discussion</td></tr>
          </tbody>
        </table>
      </div>

      <div data-day-panel="day2" hidden>
        <table>
          <thead><tr><th>Time</th><th>Session</th></tr></thead>
          <tbody>
            <tr><td>08:30 &ndash; 09:30</td><td>Keynote 3 &mdash; Assoc. Prof. Yuki Tanaka</td></tr>
            <tr><td>09:30 &ndash; 11:00</td><td>Parallel Session 3A&ndash;3D</td></tr>
            <tr><td>11:00 &ndash; 11:15</td><td>Coffee Break</td></tr>
            <tr><td>11:15 &ndash; 12:15</td><td>Keynote 4 &mdash; Dr. Amara Osei</td></tr>
            <tr><td>12:15 &ndash; 13:15</td><td>Lunch</td></tr>
            <tr><td>13:15 &ndash; 14:45</td><td>Parallel Session 4A&ndash;4D</td></tr>
            <tr><td>14:45 &ndash; 15:15</td><td>Best Paper Award &amp; Closing Ceremony</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Run verification** — Run: `python scripts/check_site.py` — Expected: `PASS: program.html (0 issue(s))`

- [ ] **Step 3: Commit**

```bash
git add program.html
git commit -m "Add program page with two-day tabbed schedule"
```

---

### Task 8: Registration page (`registration.html`)

**Files:**
- Create: `registration.html`

**Interfaces:**
- Consumes: header/footer block from Task 2

- [ ] **Step 1: Write `registration.html`**, title `Registration — ICAVTI 2026`, `<main>`:

```html
<main>
  <section class="band band--navy">
    <div class="container">
      <h1>Registration</h1>
      <p style="max-width:640px; font-size:1.125rem;">Early bird pricing available until September 20, 2026.</p>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <h2>Registration Fees</h2>
      <table>
        <thead><tr><th>Category</th><th>Early Bird</th><th>Regular</th></tr></thead>
        <tbody>
          <tr><td>Domestic Presenter</td><td>IDR 2,500,000</td><td>IDR 3,000,000</td></tr>
          <tr><td>International Presenter</td><td>USD 250</td><td>USD 300</td></tr>
          <tr><td>Domestic Participant (non-presenter)</td><td>IDR 750,000</td><td>IDR 1,000,000</td></tr>
          <tr><td>International Participant</td><td>USD 100</td><td>USD 130</td></tr>
          <tr><td>Additional Paper (same author)</td><td>IDR 1,500,000</td><td>USD 150</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="band band--muted">
    <div class="container">
      <h2>How to Register</h2>
      <ol style="max-width:760px; line-height:1.8;">
        <li>Complete your paper submission and receive acceptance notification.</li>
        <li>Fill out the online registration form (dummy link for this demo).</li>
        <li>Complete payment via bank transfer to the account listed in your registration confirmation email.</li>
        <li>Upload your camera-ready paper by the October 5, 2026 deadline.</li>
      </ol>
      <a class="btn btn--primary" href="contact.html">Contact Registration Desk</a>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Run verification** — Run: `python scripts/check_site.py` — Expected: `PASS: registration.html (0 issue(s))`

- [ ] **Step 3: Commit**

```bash
git add registration.html
git commit -m "Add registration page with fee table and registration steps"
```

---

### Task 9: Venue page (`venue.html`)

**Files:**
- Create: `venue.html`

**Interfaces:**
- Consumes: header/footer block from Task 2

- [ ] **Step 1: Write `venue.html`**, title `Venue — ICAVTI 2026`, `<main>`:

```html
<main>
  <section class="band band--navy">
    <div class="container">
      <h1>Venue</h1>
      <p style="max-width:640px; font-size:1.125rem;">Grand Malang Convention Hotel, Malang, East Java, Indonesia.</p>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <div class="grid grid--2">
        <div class="card">
          <h3>Address</h3>
          <p>Grand Malang Convention Hotel<br>Jl. Ijen Boulevard No. 45<br>Malang, East Java 65119, Indonesia</p>
        </div>
        <div class="card">
          <h3>Getting There</h3>
          <p>Approximately 25 minutes by car from Abdul Rachman Saleh Airport (MLG). Airport shuttle information will be shared with registered participants.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="band band--muted">
    <div class="container">
      <h2>Accommodation</h2>
      <p style="max-width:760px;">A block of discounted rooms has been reserved at the Grand Malang Convention Hotel for conference participants. Booking details will be sent after registration is confirmed.</p>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Run verification** — Run: `python scripts/check_site.py` — Expected: `PASS: venue.html (0 issue(s))`

- [ ] **Step 3: Commit**

```bash
git add venue.html
git commit -m "Add venue page with address, travel, and accommodation info"
```

---

### Task 10: Sponsors page (`sponsors.html`)

**Files:**
- Create: `sponsors.html`

**Interfaces:**
- Consumes: header/footer block from Task 2

- [ ] **Step 1: Write `sponsors.html`**, title `Sponsors — ICAVTI 2026`, `<main>`:

```html
<main>
  <section class="band band--navy">
    <div class="container">
      <h1>Sponsors &amp; Partners</h1>
      <p style="max-width:640px; font-size:1.125rem;">ICAVTI 2026 is made possible with support from these organizations.</p>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <h2>Host &amp; Organizer</h2>
      <div class="grid grid--2">
        <div class="card" style="text-align:center; padding:var(--space-6);"><strong>Nusantara State University</strong></div>
        <div class="card" style="text-align:center; padding:var(--space-6);"><strong>Faculty of Vocational Studies</strong></div>
      </div>
    </div>
  </section>

  <section class="band band--muted">
    <div class="container">
      <h2>Technical &amp; Industry Sponsors</h2>
      <div class="grid grid--3">
        <div class="card" style="text-align:center; padding:var(--space-6);"><strong>PT Teknologi Vokasi Indonesia</strong></div>
        <div class="card" style="text-align:center; padding:var(--space-6);"><strong>IEEE Indonesia Section</strong></div>
        <div class="card" style="text-align:center; padding:var(--space-6);"><strong>Bank Nusantara</strong></div>
        <div class="card" style="text-align:center; padding:var(--space-6);"><strong>GreenTech Foundation</strong></div>
      </div>
      <p style="margin-top:var(--space-5);">Interested in sponsoring ICAVTI 2026? <a href="contact.html">Get in touch</a>.</p>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Run verification** — Run: `python scripts/check_site.py` — Expected: `PASS: sponsors.html (0 issue(s))`

- [ ] **Step 3: Commit**

```bash
git add sponsors.html
git commit -m "Add sponsors page with host, organizer, and industry sponsor listing"
```

---

### Task 11: Contact page (`contact.html`)

**Files:**
- Create: `contact.html`

**Interfaces:**
- Consumes: header/footer block from Task 2

- [ ] **Step 1: Write `contact.html`**, title `Contact — ICAVTI 2026`, `<main>`:

```html
<main>
  <section class="band band--navy">
    <div class="container">
      <h1>Contact Us</h1>
      <p style="max-width:640px; font-size:1.125rem;">Questions about submission, registration, or the venue? Reach out.</p>
    </div>
  </section>

  <section class="band band--white">
    <div class="container">
      <div class="grid grid--2">
        <div class="card">
          <h3>Secretariat</h3>
          <p>Faculty of Vocational Studies<br>Nusantara State University<br>Jl. Pendidikan Vokasi No. 1<br>Malang, East Java 65145, Indonesia</p>
          <p>Email: <a href="mailto:icavti2026@example.org">icavti2026@example.org</a><br>Phone: +62 341 000 0000</p>
        </div>
        <div class="card">
          <h3>Send a Message</h3>
          <form onsubmit="event.preventDefault(); alert('This is a demo form — no data is sent.');">
            <label for="name" style="display:block; font-weight:700; margin-bottom:var(--space-1);">Name</label>
            <input id="name" name="name" type="text" required style="width:100%; padding:var(--space-3); margin-bottom:var(--space-4); border:1px solid var(--color-border); border-radius:var(--radius-sm); font-family:var(--font-body); font-size:1rem;">

            <label for="email" style="display:block; font-weight:700; margin-bottom:var(--space-1);">Email</label>
            <input id="email" name="email" type="email" required style="width:100%; padding:var(--space-3); margin-bottom:var(--space-4); border:1px solid var(--color-border); border-radius:var(--radius-sm); font-family:var(--font-body); font-size:1rem;">

            <label for="message" style="display:block; font-weight:700; margin-bottom:var(--space-1);">Message</label>
            <textarea id="message" name="message" rows="4" required style="width:100%; padding:var(--space-3); margin-bottom:var(--space-4); border:1px solid var(--color-border); border-radius:var(--radius-sm); font-family:var(--font-body); font-size:1rem;"></textarea>

            <button type="submit" class="btn btn--primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Run verification** — Run: `python scripts/check_site.py` — Expected: `PASS: contact.html (0 issue(s))`

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "Add contact page with secretariat info and demo contact form"
```

---

### Task 12: Local preview launcher, full-site link integrity check, and final visual QA

**Files:**
- Create: `run-local.bat`
- Modify: `scripts/check_site.py:1-70` (add cross-page link resolution check)

**Interfaces:**
- Consumes: all 10 HTML pages from Tasks 2–11

- [ ] **Step 1: Create `run-local.bat`**

```bat
@echo off
setlocal
title ICAVTI 2026 — Local Preview

set FOLDER=%~dp0
set PORT=8090
set URL=http://localhost:%PORT%/index.html

color 0B
echo.
echo  ====================================================
echo    ICAVTI 2026 Conference Site -- Local Preview
echo    %URL%
echo  ====================================================
echo.

cd /d "%FOLDER%"

python --version >nul 2>&1
if %errorlevel% equ 0 goto :start_server
python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    set PYTHON_CMD=python3
    goto :start_server
)

color 0E
echo  [WARN] Python not found. Opening index.html directly instead.
start "" "%FOLDER%index.html"
pause
exit /b

:start_server
netstat -ano | find ":%PORT% " >nul 2>&1
if %errorlevel% equ 0 (
    set PORT=8091
    set URL=http://localhost:%PORT%/index.html
)

echo  [START] Server starting at %URL%
ping 127.0.0.1 -n 2 >nul
start "" "%URL%"
python -m http.server %PORT% 2>nul
if %errorlevel% neq 0 python3 -m http.server %PORT%
```

- [ ] **Step 2: Extend `scripts/check_site.py` with a cross-page internal-link resolution check**

Add this function and call it from `main()`, right after the per-page loop and before the `sys.exit(1)` check:

```python
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
```

Update `main()` so the call site looks like:

```python
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
```

- [ ] **Step 3: Run the full verification suite**

Run: `python scripts/check_site.py`
Expected: all 10 pages report `PASS`, plus `PASS: all internal links resolve`, ending with `All pages passed structural checks.` and exit code 0.

- [ ] **Step 4: Visual QA in a real browser**

Start the local server (`run-local.bat` or `python -m http.server 8090`), then for each of the 10 pages: confirm the hero/section bands render with navy/white/muted alternation, nav highlights the current page, hamburger menu opens/closes below 768px width, `program.html` day tabs switch content, and the contact form shows the demo alert on submit without a page reload.

- [ ] **Step 5: Commit**

```bash
git add run-local.bat scripts/check_site.py
git commit -m "Add local preview launcher and cross-page link integrity check"
```

---

## Self-Review Notes

- **Spec coverage:** all 10 pages from the spec's page list are covered (Tasks 2–11); design tokens/typography/section-band pattern (Task 1); responsive nav + accessibility (Task 1 CSS + Task 12 visual QA); local preview convention (Task 12); dummy-only content with no external images (Dummy Content Reference + `.avatar` component, no `<img>` tags anywhere).
- **Placeholder scan:** no TBD/TODO; every step has complete, runnable code.
- **Type/name consistency:** `check_page()` signature (`path`, `must_contain`) and `REQUIRED_NAV_HREFS` defined once in Task 1, reused unchanged through Task 12; `data-day-tab` / `data-day-panel` attribute names match between `js/nav.js` (Task 1) and `program.html` (Task 7); all internal `href` targets match the 10 filenames declared in Global Constraints.
