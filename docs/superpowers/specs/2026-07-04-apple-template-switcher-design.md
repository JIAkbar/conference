# Apple-style Template B + Switcher — Design

## Goal
Prove that ICSAET 2026's content can be adapted 1:1 into a structurally different
template, with a live switcher so the user can compare both side by side.

## Scope
3 pages only (demo, not full-site): Home, Speakers, Program (Timeline).
Content is copied verbatim from the existing Template A pages — only the visual
structure/language changes.

## Reference
Apple design language, sourced from the Refero vault's existing scrape at
`AI Skill/Referensi Refero/01-Projects/Apple/` (`DESIGN.md` + `css-variables.css`).
This is a MacBook product-page scrape — we adapt its typography/color/spacing/
component language to conference content, not replicate the product page itself.

## Architecture
- New folder `template-apple/` with `index.html`, `speakers.html`, `program.html`.
- New `css/apple-theme.css` — Apple tokens (colors, SF Pro type scale, 28px card
  radius, spacing scale) namespaced independently from `css/style.css`.
- New `js/apple-nav.js` — two-layer sticky nav behavior (global nav + section
  sub-nav that activates after the hero).
- New `js/template-switch.js` — shared floating pill toggle ("Classic ⟷
  Apple-style"). Navigates between the two versions of the current page and
  remembers the choice in `localStorage` so it persists across the 3 demo pages.
  Pages without a Template B counterpart stay on Template A only.
- Reuses existing assets (`img/speakers/*.jpg`, `img/brand/icsaet-logo.webp`) —
  no duplication.

## Per-page adaptation
- **Navbar**: two sticky layers — slim global nav (44px, `#f5f5f7`, flush
  full-width, 12px links) + section sub-nav (52px, white, hairline border,
  active-link underline) appearing after the hero. Structurally distinct from
  Template A's single floating blurred pill.
- **Home hero**: centered-stack layout — eyebrow (date/venue), 80-96px display
  headline, single black pill CTA. No particle animation (that's Template A's
  signature); flat `#f5f5f7` canvas.
- **Key Dates**: white feature cards (28px radius, no shadow) on alternating
  white/fog bands instead of bordered card grid.
- **Speakers**: photo cards, 28px radius, generous padding, name as subheading,
  affiliation in Graphite gray — same 5 speakers/photos as Template A.
- **Program/Timeline**: milestone table adapted to Apple's tight label/value
  two-column spec-table pattern instead of a bordered HTML table.
- **Color discipline**: `#0071e3` reserved for exactly one CTA per page
  (Register/Submit); everything else neutral ink/graphite — no teal accent
  used broadly like Template A.
- **Footer**: same content (Conference/Attend/Resources columns, address,
  contact) restyled flat/minimal (12px links, no hover-pill).
- **No light/dark toggle** in Template B — Apple source is light-only; this is
  an intentional scope decision, not a missing feature.

## Out of scope
- Full-site template switching (only 3 demo pages).
- Dark mode for Template B.
- Pixel-perfect replication of Apple's actual MacBook page (content differs
  entirely — this is a design-language adaptation).
