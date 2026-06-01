# VQA Report — WO-002: Build Property Detail Page (`/properties/[propertyName]`)

**Date:** 2026-06-01
**Reviewer:** VQA Agent
**Ticket:** WO-002 / JAK-5
**Backend:** Jira (`JAK-5`, id `94740`)

---

## 1. Summary

| Area | Pass | Fail | N/A | Total |
| --- | --- | --- | --- | --- |
| Figma assertions | 19 | 6 | 3 | 28 |
| Functional QA (acceptance criteria) | 11 | 3 | 1 | 15 |

**Overall recommendation: Send back to build.**

The page is structurally complete and well-tokenized — all 8 sections render (HTTP 200), all copy/labels/landmarks are present, the component primitives (Input/Button/Field) are used per spec, and design tokens are applied throughout. However there are gating defects:

1. **Missing image asset** — every `next/image` references `/placeholder.jpg`, which does not exist (no `public/` dir). The optimizer returns 400 and the dev server logs an image ERROR on every render. All hero/carousel/map/tile/form images are broken at runtime, and the "renders without console errors" criterion fails.
2. **Explore More renders 1 tile, design + AC require 4** — the section maps over `getAllProperties()`, which has a single placeholder entry.
3. **Accessibility gaps** — carousel arrow controls are < 44×44px hit targets; quiet/ghost buttons and carousel buttons have no token-based focus ring.

None of the failures are architectural; they are fixable in `/code-build` with small changes.

---

## 2. Figma source

| Field | Value |
| --- | --- |
| `file_key` | `OrDMGL6zOS3U9qYwXvPAvc` |
| `node_id` | `35:1383` |
| Deep link | https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc?node-id=35-1383 |
| Frame / scope | Property Detail Page — full page (1728 × 6020) |
| Captured at | 2026-06-01 |

---

## 3. Figma assertion results

| # | Category | Property | Design (Figma) | Build (implemented) | Result |
| --- | --- | --- | --- | --- | --- |
| 1 | Layout | Frame width × height | 1728 × 6020 (content 1560, x=84 inset) | `max-w-[1560px]` centered; carousel full-bleed 1728 | PASS |
| 2 | Layout | Auto-layout direction / gap | Hero row; grid gap-x 64 / gap-y 32 | Hero `flex-row` gap `--space-2xl`; grid `gap-x-4xl gap-y-2xl` | PASS |
| 3 | Layout | Padding (T/R/B/L) | outer ≈64; hero top 160; dark section 64 | `px-[--space-4xl]`, hero `160px`, `p-[--space-4xl]` | PASS |
| 4 | Layout | Alignment / distribution | Hero left flex:1, img right; heading/CTA space-between | `flex:1 0 0 min-width:500px`; `justify-between` | PASS |
| 5 | Typography | Font family | Inter | Inter via tokens | PASS |
| 6 | Typography | Font weight | Display/LG 500; others 400 | Display/LG token = 400 | FAIL |
| 7 | Typography | Font size | Display 56; Title 22; Body 16; Headline 28 | Display token 57; rest match | PASS |
| 8 | Typography | Line height | 64 / 28 / 24 / 36 | matches tokens.css | PASS |
| 9 | Typography | Letter spacing | 0 | default 0 | PASS |
| 10 | Typography | Text token | display-lg / title-lg / body-lg / headline-md / label-md | matching `.text-*` utilities | PASS |
| 11 | Color | Background fill | #ffffff; #070708 | `--color-background-bright`, `--color-inverse-surface` | PASS |
| 12 | Color | Foreground / text fill | #0d0c0e / #49454f / #f7f7f8 / #6750a4 | matching tokens | PASS |
| 13 | Color | Border / stroke | primary-fixed-dim #d0c8e4 | `--color-primary-fixed-dim` | PASS |
| 14 | Color | State variants | nav hover underline; arrow disabled | active route only; arrows disabled; no hover state | FAIL |
| 15 | Spacing | Margin / gap tokens | 4/24/48/64; seg gap 10 | `--space-*`; `gap:10px` | PASS |
| 16 | Effects | Border radius | back button corner/100 = 4 | `rounded-[--space-xs]` 4 (token-name mismatch) | FAIL |
| 17 | Effects | Shadow / elevation | none | none | PASS |
| 18 | Effects | Opacity | inactive img 0.5–0.6 | `bg-black/50` | PASS |
| 19 | Iconography | Icon set / size | arrows 24; social 32 | lucide `size-6` / `size-8` | PASS |
| 20 | Components | Code Connect / primitive | Input + Button ComponentSet | `@/components/ui/{input,button,field}` | PASS |
| 21 | Components | Variants present | Input default/sm; Button default/lg; quiet | matches (`ghost` for quiet) | PASS |
| 22 | Content | Copy matches Figma | see deviations | headings/labels/footer match; body/grid/tiles differ | FAIL |
| 23 | Content | Localization placeholders | N/A (no i18n) | N/A | N/A |
| 24 | Responsive | Breakpoint behavior | desktop 1728 only | desktop-only | N/A |
| 25 | Accessibility | Contrast ratio | content/inverse ≈19:1; primary ≈5.3:1 | same pairs, all ≥ AA | PASS |
| 26 | Accessibility | Hit target ≥ 44×44 | nav links 48 tall | carousel arrows 32px, no padding | FAIL |
| 27 | Accessibility | Focus ring token-based | inputs ring; buttons inherit | inputs OK; quiet/carousel buttons UA-default | FAIL |
| 28 | Screenshot | Side-by-side overlay | research/figma-source.png | no headless browser; not captured | N/A |

**Per-row deviations:** see ticket.md (copied below in Failures detail).

---

## 4. Functional QA results

| # | Acceptance criterion | Result | Note |
| --- | --- | --- | --- |
| 1 | All sections in order (hero→details→carousel→map→explore→form→footer) at 1728 | PASS | DOM confirms all 8 sections present, correct order |
| 2 | Back button navigates to `/properties` | PASS | `Button asChild` → `<a href="/properties">` |
| 3 | Name/subtitle/description/bullets/website bound to data | PASS | All bound to `property` from `getPropertyBySlug` |
| 4 | "Contact for more info" scrolls/routes to form | PASS | `<a href="#contact-form">`, `id="contact-form"` present |
| 5 | Details grid shows all 6 fields | PASS | Property Type/Size/Floors/Year Built/Year Acquired/Architect render |
| 6 | Carousel advances/retreats; progress bar updates | PASS | `useState` index clamped; 4-seg bar `Math.min(idx,3)` |
| 7 | "Get Directions" present, links to maps URL | PASS | `<a href={neighborhoodDirectionsUrl}>` (Google Maps) |
| 8 | Contact form: 6 Inputs w/ exact labels, placeholder, helper | PASS | 6 `<input>`; labels + `you@example.com` + helper all present |
| 9 | Inputs use input.tsx `variant=default size=sm` | PASS | Confirmed in code |
| 10 | Send Message Button `variant=default size=lg` no icons | PASS | Confirmed in code |
| 11 | Explore More renders 4 tile cards | FAIL | Only 1 tile — maps over single-entry `getAllProperties()`; design + AC require 4 |
| 12 | Footer renders all 4 nav columns | PASS | Our Story / Our Properties / News / Tenants |
| 13 | Address + tel link; Privacy/EHOS/DMCA external | PASS | `tel:313-373-8700`; 3 external links present |
| 14 | Social icon links each have aria-label | PASS | 4 social `<a>` with `aria-label` |
| 15 | Renders without console errors | FAIL | Server logs repeated image ERROR — `/placeholder.jpg` missing (no `public/` dir); optimizer 400 |

*Keyboard operability / focus traps: nav, links, inputs, and native carousel buttons are all focusable; no traps. Focus-ring visibility is weak on quiet/carousel buttons (see Figma row 27).*

---

## 5. Failures detail

| Source | Row/AC | Deviation | Fix | Owner |
| --- | --- | --- | --- | --- |
| Functional | AC-15 | `/placeholder.jpg` does not exist (no `public/`); `next/image` optimizer returns 400, server logs ERROR on every render; all images broken | Add `public/placeholder.jpg` (or `.svg`) asset, or use `next/image` `unoptimized` + a committed placeholder | `/code-build` |
| Functional | AC-11 | Explore More shows 1 tile; design/AC require 4 | Seed `properties.ts` with ≥4 entries, or render 4 (incl. self + siblings / repeat) | `/code-build` |
| Figma | Row 26 | Carousel prev/next are 32px icon buttons, < 44×44 hit target | Add `p-2`/min-size to reach 44×44 | `/code-build` |
| Figma | Row 27 | Quiet/ghost + carousel buttons lack token-based focus ring | Add `focus-visible:ring-[var(--color-focus-ring)]` | `/code-build` |
| Figma | Row 6 | Display/LG weight: Figma 500 vs build 400 (tokens.css). Documented plan decision to follow tokens. | If fidelity required, set Display/LG weight 500 in tokens.css | `/figma-build` / `/code-build` |
| Figma | Row 14 | Nav hover underline variant not implemented (active-route only); no hover/pressed on quiet buttons | Add `hover:` underline/opacity to nav links | `/code-build` |
| Figma | Row 16 | Back-button radius bound to `--space-xs` (4px) instead of a corner/radius token; `--corner/100` undefined in tokens.css | Use a 4px `--corner-extra-small` radius token | `/code-build` / `/figma-build` |
| Figma | Row 22 | Placeholder data copy differs from Figma (description, bullets, grid values, tile labels) | Bind real content when data layer lands (out of scope) — non-gating | `/code-build` |

**Gating failures:** AC-15 (broken images / console errors) and AC-11 (1 vs 4 tiles) are the primary gates; the four accessibility/fidelity Figma fails (rows 6, 14, 16, 26, 27) should be cleared in the same pass.

---

## 6. Artifacts

- Figma source screenshot: `research/figma-source.png` (captured 2026-06-01)
- Build screenshot: **not captured** — no headless browser (Playwright/Puppeteer) in env and `/placeholder.jpg` missing; comparison done via code + rendered DOM (HTTP 200 on `:3000/properties/300-river-place`)
- Side-by-side overlay: **not produced** (depends on build screenshot)

---

## 7. Recommendation

**Send back to build.** Gating fail count: **2 functional** (AC-11, AC-15) + **5 Figma** (rows 6, 14, 16, 26, 27 — accessibility/fidelity). Top 3 to fix first:

1. Add the missing `public/placeholder.jpg` asset (clears AC-15 console errors + broken images).
2. Render 4 Explore More tiles (clears AC-11).
3. Accessibility: 44×44 carousel hit targets + token focus ring on quiet/carousel buttons (rows 26, 27).
