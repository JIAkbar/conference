# Conference FV — Design Spec

**Date:** 2026-07-02
**Status:** Approved

## Purpose

A static, multi-page website for a fictitious international academic conference, built with placeholder/dummy content. Serves as a polished template the user can later swap real content into. Modeled on the structure and tone of three real academic conference sites: CENIM (ITS), EECCIS (UB), ICACSIS (UI).

## Dummy Conference Identity

- **Name:** ICAVTI 2026 — International Conference on Applied Vocational Technology & Innovation
- **Format:** Hybrid, November 2026, fictitious host institution and city
- All names, dates, committee members, speakers, and sponsor logos are placeholders — clearly fabricated, not real people/institutions.

## Pages

Each page is a standalone `.html` file sharing identical header/footer markup (no build step, no fetch-based partials — must work opened directly via `file://` as well as via local server).

1. `index.html` — Home: hero (title, theme, dates, location, CTA), key-dates strip, about summary, speaker preview, sponsor strip
2. `about.html` — About the conference, organizer, objectives, publication/indexing info
3. `call-for-papers.html` — Topics/tracks, submission guidelines
4. `speakers.html` — Keynote speaker grid (dummy photos/bios)
5. `committee.html` — Organizing / steering / technical program committee
6. `program.html` — Tabbed day-by-day schedule
7. `registration.html` — Fee table, how-to-register steps
8. `venue.html` — Location, hotel, travel info
9. `sponsors.html` — Sponsor/partner logo grid
10. `contact.html` — Contact info + static (non-functional) contact form

Navigation: Home · About · Call for Papers · Speakers · Committee · Program · Registration · Venue · Sponsors · Contact, collapsing to a hamburger menu below 768px.

## Design System

**Style:** "Trust & Authority" — professional, editorial, institutional credibility. Avoid generic AI-startup gradients/glassmorphism.

**Colors** (from ui-ux-pro-max, "Authority navy + trust gold"):
| Role | Hex |
|---|---|
| Primary | `#1E3A8A` |
| Secondary | `#1E40AF` |
| Accent | `#B45309` |
| Background | `#F8FAFC` |
| Foreground | `#0F172A` |
| Muted | `#E9EEF5` / `#64748B` |
| Border | `#CBD5E1` |
| Destructive | `#DC2626` |

**Typography:**
- Heading: Crimson Pro (serif, editorial-academic)
- Body: Atkinson Hyperlegible (highly legible, accessibility-focused)
- Display headlines use tight line-height (~0.9–1.1) at large sizes for an editorial, literary feel (borrowed structural principle from the "Fable" reference style in the user's Refero collection, reinterpreted in navy/gold instead of Fable's green/cream).

**Structural principle (borrowed from Fable reference, adapted):** full-bleed alternating "section bands" (navy → white → light-muted → white) act as the primary visual divider between page sections instead of hairline borders — reduces visual clutter, reinforces institutional gravity.

**Decorative elements:** subtle SVG shapes/accents (not stock photography), consistent with the CENIM reference site's visual language. Speaker/committee photos are placeholder avatar SVGs, not hotlinked external images (keeps the site self-contained and reliable offline).

## Technical Approach

- Plain static HTML/CSS/JS. No framework, no build step, no dependencies.
- `css/style.css` — shared design tokens (CSS custom properties) + base styles
- `css/nav.css` — header/footer/nav styles, responsive hamburger
- `js/nav.js` — mobile menu toggle, active-link highlighting, tab switching on `program.html`
- Local preview: `run-local.bat` launching `python -m http.server`, mirroring the convention already used in the user's other static-site project ("Web Template").
- Responsive breakpoints: 375 / 768 / 1024 / 1440px.
- Accessibility: WCAG AA text contrast minimum, visible focus states, `prefers-reduced-motion` respected, semantic heading hierarchy.

## Out of Scope

- No backend, no real form submission, no database, no CMS.
- No real conference data — everything is explicitly placeholder content.
- No build tooling (bundlers, package managers) — deliberately zero-dependency static files.

## Plugins/Tools Used

- `superpowers:brainstorming` — this spec's process
- `ui-ux-pro-max` — design system generation (colors, typography, landing pattern)
- Local harvested Refero style reference (`Fable`) — structural/typographic inspiration only, not literal reuse (live Refero MCP not connected in this project)
