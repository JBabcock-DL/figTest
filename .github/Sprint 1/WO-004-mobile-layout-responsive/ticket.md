---
type: work-order
jira_issue: JAK-7
jira_issue_id: "94742"
---

## Goal

Improve responsive layout across the property detail experience and shared chrome so tablet and mobile match the handoffTest layout patterns (navigation, Explore More, section wrapping) while keeping all visual styling on the **existing** codebase design tokens and components. Figma is authoritative for **layout and interaction patterns only** — ignore variable collections and colors from the handoff file.

---

## Problem story

As a visitor on tablet or phone, I need the property detail page to scale with the viewport: navigation, images, and multi-column sections should reflow without horizontal page overflow. Today there are three overlapping problems:

1. **Fixed image and media dimensions** — Hero (`750×750`), neighborhood map (`712×712`), contact image (`min-w-[600px]`), and Explore More tiles (`372×372`) use hard pixel widths and `shrink-0`, so they do not grow or shrink with the page. Paired `min-w-[500px]` / `min-w-[600px]` on text columns prevents healthy flex wrapping.
2. **Header clutter** — Sign in and Create account sit in the top nav; product wants them **footer-only** (`site-footer.tsx`).
3. **No mobile/tablet chrome** — No hamburger menu; layout does not match Figma mobile page `56:2962` or full-screen nav `56:4076`.

**Opportunity:** Refactor image sections to fluid widths with sensible `min-width` for wrap, implement Figma-aligned menus (tablet drawer / mobile takeover), elastic Explore More on desktop and horizontal scroll on tablet/mobile — all using existing repo design tokens (not Figma handoff variables).

---

## User stories

- [ ] As a visitor on desktop/wide viewports, I see Explore More tiles grow and shrink within the section while tile images keep a 1:1 aspect ratio.
- [ ] As a visitor on tablet or narrower (or when the Explore More section is too narrow), I can scroll the tile row horizontally without breaking the page layout.
- [ ] As a visitor on tablet, I open navigation via a menu control and the panel slides in from the right.
- [ ] As a visitor on mobile, I open navigation via a menu control and get a full-screen menu takeover.
- [ ] As a visitor at any breakpoint, I do not see Sign in or Create account in the header or mobile/tablet menu — only in the footer.
- [ ] As a visitor on a narrow viewport, hero, neighborhood, contact, and carousel images scale with their section width (no fixed `size-[Npx]` overflow).
- [ ] As a visitor, multi-column sections wrap when space is tight because flex children use `min-w-0` and readable `min-width` floors instead of rigid 500–600px locks.

---

## Design reference *(layout patterns only)*

| | |
| --- | --- |
| **File key** | `OrDMGL6zOS3U9qYwXvPAvc` |
| **Frame / scope** | Responsive property detail + global nav — **do not import Figma color/spacing variables** |

### Primary Figma captures *(authoritative for mobile layout)*

| Frame | Node ID | Deep link |
| --- | --- | --- |
| `/properties/{propertyName} mobile` | `56:2962` | https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-2962 |
| `mobile nav` (full-screen menu) | `56:4076` | https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-4076 |

**Supporting nodes:** `56:4132` mobile top bar (logo + menu/close); canvas `34:18` for context.

**Research capture:** [research/figma-mobile-layout-capture.md](research/figma-mobile-layout-capture.md)

**Styling rule:** Implement with existing `var(--*)` tokens from `src/app/globals.css` / `src/styles/tokens.css` and shadcn components already in the repo.

**Account links:** Footer only — match mobile page footer pattern; **not** in `56:4076` menu tree.

---

## Requirements

> **Research complete.** [mobile-responsive-layout.md](research/mobile-responsive-layout.md) · [codebase-responsive-audit.md](research/codebase-responsive-audit.md) · [figma-mobile-layout-capture.md](research/figma-mobile-layout-capture.md)

### Functional

1. **Account links — footer only:** Remove `ACCOUNT_LINKS` from `src/components/layout/site-nav.tsx`. Keep **Sign in** and **Create account** in `src/components/layout/site-footer.tsx` only. Do **not** render account links in mobile (`56:4076`) or tablet menus.
2. **Desktop nav (≥1024px):** Logo + inline primary links only (`Our Story`, `Our Properties`, `News`, `Careers`, `Contact Us`).
3. **Menu trigger (<1024px):** Menu/close control per Figma `56:4132` — `aria-expanded`, `aria-controls`, "Open menu" / "Close menu".
4. **Tablet menu (768–1023px):** Scrim + right `Sheet` (~360px) with **flat 5** links only (same `NAV_LINKS` as desktop — no Figma subnav).
5. **Mobile menu (≤767px):** **Full-screen** shell per [`56:4076`](https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-4076) — vertical list of flat 5 links, close in top bar; no account links; no expandable Office/Retail/News children.
6. **Responsive images — hero:** Replace `size-[750px] shrink-0` with fluid column: `w-full max-w-[750px] flex-1 min-w-0`, `aspect-square` (or design ratio), `Image` with `fill` + responsive `sizes`; text column `min-w-0 flex-1` with wrap-friendly min (~280px), not `min-w-[500px]` lock.
7. **Responsive images — neighborhood:** Map/media `w-full max-w-[712px] flex-1 min-w-0 aspect-square` (not `size-[712px] shrink-0`); copy column `min-w-0 flex-1`.
8. **Responsive images — contact:** Side image and form columns use `min-w-0 flex-1` with `min-w-[320px]` floor; image uses width-based aspect (not `h-[960px] min-w-[600px]` rigid box); stack vertically on mobile per `56:2962`.
9. **Responsive images — carousel:** `property-carousel.tsx` — slides must use container width (not fixed `1280px` transform steps); cap height on mobile (`aspect` / `max-h-[60vh]`); see [research/codebase-responsive-audit.md](research/codebase-responsive-audit.md).
10. **Responsive images — facts:** Facts grid `min-w-0` on `dl`; cells `flex-1 min-w-[200px] max-w-[250px]` instead of fixed `w-[250px]` only.
11. **Explore More — elastic (≥1024px):** `flex-[1_1_280px] min-w-[280px] max-w-[372px]`, `aspect-square w-full` images.
12. **Explore More — scroll (≤1023px):** `flex-nowrap overflow-x-auto`, tiles `min-w-[280px] shrink-0` — match mobile Figma strip in `56:2962`.
13. **Footer layout:** Fix `site-footer.tsx` rigid widths (`w-[800px] min-w-[800px]`, etc.) so footer wraps on tablet/mobile while preserving Sign in / Create account block.
14. **Scroll-hide nav:** Preserve scroll-direction show/hide on nav wrapper.
15. **Shared nav data:** Export single `NAV_LINKS` array for desktop bar + mobile/tablet menus (flat 5).

### Visual / UX

- Menu surfaces: `var(--color-background-bright)`, link text `var(--color-content)`, active/underline `var(--color-primary)`.
- Tablet panel transition: `transform` slide from right, 300–500ms ease; scrim `bg-black/40` or tokenized overlay.
- Mobile menu: full viewport height/width; typography `text-body-lg` consistent with desktop nav links.
- Explore More: keep `gap-[var(--space-xl)]`; optional `snap-x` on scroll row; subtle scrollbar.

### Technical / architectural

- Add `src/hooks/use-breakpoint.ts` (mobile ≤767, tablet 768–1023, desktop ≥1024).
- Replace `shrink-0` + fixed `size-[Npx]` on media with `min-w-0 flex-1 w-full max-w-[designMax] aspect-*` pattern site-wide on property detail + footer.
- Tablet drawer: shadcn `Sheet` `side="right"`; mobile: full-screen `Dialog` or Sheet per `56:4076`.
- `next/image` `sizes` attribute per breakpoint for hero, contact, explore tiles.
- `z-index`: nav `z-[1100]`; menu overlay above content.

---

## Acceptance criteria *(definition of done)*

- [ ] Sign in and Create account appear **only** in the footer; absent from header and mobile/tablet menus.
- [ ] Hero, neighborhood, and contact images scale with section width; no horizontal overflow from fixed 750/712/600px boxes at 375px and 768px.
- [ ] Flex sections wrap cleanly using `min-w-0` + readable min-width floors (no stuck `min-w-[500px]` / `min-w-[600px]` overflow).
- [ ] Tablet: menu button opens right drawer with **5** primary links; mobile: full-screen menu matches `56:4076` shell (flat list, no subnav).
- [ ] Explore More elastic on desktop; horizontal scroll on tablet/mobile.
- [ ] No document-level horizontal scroll at 375px, 768px, 1024px, 1440px on property detail.
- [ ] Styling uses existing design tokens only (no handoff variable collection).
- [ ] Keyboard: menu can be opened/closed; focus managed while open.

## Out of scope

- Re-theming or syncing Figma variable collections from handoffTest.
- Changing property data model or copy.
- Moving or removing footer Sign in / Create account (they remain the canonical account entry).
- Figma expandable subnav (Office, Retail, Press Releases, …) — footer columns may still list these; header menu stays flat 5.
- New authentication flows for Sign in / Create account.

---

## Testing & verification

### Functional QA

- Resize across 375px, 768px, 1024px, 1440px — verify nav modes and Explore More mode transitions.
- Verify all nav links route correctly from drawer and full-screen menu.

### Visual / design QA

- Compare layout (not colors) to Figma [`56:2962`](https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-2962) and [`56:4076`](https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-4076).
- Verify full-width image blocks on mobile page vs implementation.
- Confirm Explore More square crops at multiple tile widths.

### Accessibility *(WCAG AA where applicable)*

- Menu button has accessible name; `aria-expanded` toggles.
- Focus trap and restore focus on close in mobile/tablet menus.

---

## Figma VQA Checklist

| Field | Value |
| --- | --- |
| **file_key** | `OrDMGL6zOS3U9qYwXvPAvc` |
| **node_id** | `56:2962` (primary VQA); `56:4076` (menu) |
| **Deep link** | https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-2962 |
| **Frame name** | `/properties/{propertyName} mobile` + `mobile nav` |

### Assertions

| # | Assertion | Pass |
| --- | --- | --- |
| | | |

---

## Ready for `/research`

- [x] Complete — see [research/mobile-responsive-layout.md](research/mobile-responsive-layout.md).

## Ready for `/plan`

- [x] Complete — [plan.md](plan.md) (13 steps, 4 build phases).

## Ready for `/build`

- Plan approved; run `/build` or Phase 1 `code-build` per plan.md.

## References

- WO-002 — property detail page baseline
- [Codebase responsive audit (line refs + class specs)](research/codebase-responsive-audit.md)
- [Figma mobile layout capture (`56:2962`, `56:4076`)](research/figma-mobile-layout-capture.md)
- [Mobile responsive layout research](research/mobile-responsive-layout.md)
