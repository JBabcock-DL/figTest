# Mobile responsive layout — research

## Summary

WO-004 delivers responsive property detail + global chrome: fluid image sections (replacing fixed `size-[Npx]` / aggressive `min-w-[Npx]`), **flat five-link** hamburger navigation (tablet drawer / mobile full-screen), and Explore More elastic-on-desktop / scroll-on-tablet-mobile. **Sign in** and **Create account** stay in the **footer only**.

**Deep dives:**

- [codebase-responsive-audit.md](codebase-responsive-audit.md) — line-level audit, per-section class specs, QA matrix
- [figma-mobile-layout-capture.md](figma-mobile-layout-capture.md) — Figma `56:2962` + `56:4076` layout reference (tokens ignored)

---

## Key findings

### 1. Fixed image & section widths (primary defect)

Flex rows cannot shrink when children use `shrink-0`, fixed `size-[750px]` / `size-[712px]`, and sibling `min-w-[500px]`–`600px`. On a 375px viewport with 48px horizontal padding, available width ≈ 279px while declared minimums often exceed **1100px** for a single row.

**Worst offenders:** hero image (L115), neighborhood map (L161), contact columns (L230, L244), footer columns block (L118), Explore tiles (L190–192).

**Fix pattern:** `min-w-0 flex-1 w-full max-w-[designCap] aspect-*` on media; `min-w-0 flex-1` on copy; readable floor `min-w-[280px]` only where wrap is desired; remove `shrink-0` unless in horizontal scroll strips.

See audit file for copy-paste Tailwind specs per section.

### 2. Carousel uses fixed 1280×960 slides

`property-carousel.tsx` sets `SLIDE_WIDTH = 1280`, each slide `w-[1280px] h-[960px]`. Transform offset uses pixel math — on narrow viewports the strip still scrolls in 1284px steps while the viewport may be 393px wide. Container is `overflow-hidden` so overflow is clipped, but **active slide framing and height** are wrong on mobile.

**WO-004:** Make slide width track container (`ResizeObserver` or `100%` slide width); reduce height with `aspect-[1280/960]` + `max-h-[60vh]` on small screens.

### 3. Account links — footer only (locked)

| Surface | Sign in / Create account |
| --- | --- |
| `site-nav.tsx` header | **Remove** |
| Mobile / tablet menu | **Omit** |
| `site-footer.tsx` L104–111 | **Keep** |

Figma `56:4076` shows expandable marketing nav — **not** implemented in WO-004. Footer still has rich `COLUMNS` sub-links (separate from header menu).

### 4. Navigation — flat 5 links (locked)

**Decision:** Implement only the five primary routes already in code — no Office / Retail / Press Releases accordion from Figma.

| # | Label | href |
| --- | --- | --- |
| 1 | Our Story | `/our-story` |
| 2 | Our Properties | `/properties` |
| 3 | News | `/news` |
| 4 | Careers | `/careers` |
| 5 | Contact Us | `/contact` |

**Figma `56:4076` usage:** Full-screen white panel, top bar with close, vertical link spacing — **not** the nested link hierarchy.

**Breakpoints:**

| Tier | Viewport | Chrome |
| --- | --- | --- |
| Desktop | ≥1024px (`lg`) | Inline flat 5 in header |
| Tablet | 768–1023px | Hamburger → `Sheet` from right (~360px) |
| Mobile | ≤767px | Hamburger → full-viewport menu |

**Implementation:** Extend `site-nav.tsx` or add `mobile-nav-menu.tsx`; use existing `Sheet` (`side="right"`); `lg:hidden` on menu button, `hidden lg:flex` on desktop links. Share `NAV_LINKS` constant.

### 5. Explore More

| Viewport | Behavior |
| --- | --- |
| ≥1024px | `flex-wrap`, tiles `flex-[1_1_280px] min-w-[280px] max-w-[372px]`, `aspect-square` images |
| ≤1023px | `flex-nowrap overflow-x-auto`, tiles `w-[280px] shrink-0` |

Matches Figma mobile strip (`56:2962` / child `56:2591`): ~322px tile in ~361px scroll row.

### 6. Figma references (layout only)

| Node | Purpose |
| --- | --- |
| [`56:2962`](https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-2962) | Full mobile page — stacked sections, full-width media |
| [`56:4076`](https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-4076) | Menu shell — fullscreen, close, vertical rhythm |

---

## Recommendations

### Build order

1. **`use-breakpoint.ts`** + shared `NAV_LINKS` export.
2. **Media/flex pass** on `property-detail.tsx` (hero → neighborhood → contact → explore) — highest impact.
3. **`site-nav.tsx`** — remove accounts; add menu + flat 5 drawer/fullscreen.
4. **`site-footer.tsx`** — remove `min-w-[800px]` lock.
5. **`property-carousel.tsx`** — responsive slide width + height cap.
6. **`sizes`** on all `Image` components in touched sections.

### Tailwind conventions

- Prefer `flex-col` default, `lg:flex-row` for two-column sections.
- Prefer `max-lg:overflow-x-auto` for Explore More scroll cutoff at 1024px.
- Nav bar: `max-lg:px-[var(--space-md)]` to recover horizontal space on phones.

### Testing

Run QA matrix in [codebase-responsive-audit.md](codebase-responsive-audit.md) at 375 / 768 / 1024 / 1440 on a property detail URL.

---

## Decisions log

| Date | Decision |
| --- | --- |
| WO-004 intake | Footer-only account links |
| WO-004 intake | Figma tokens out of scope |
| WO-004 update | **Flat 5 nav** — no Figma subnav in this WO |
| WO-004 update | Tablet drawer **360px** recommended |
| WO-004 update | Carousel responsive width in scope |

## Open questions

_None blocking plan — flat nav and footer auth are locked._

Optional later: container queries for Explore More when desktop window &lt; 1024px but not mobile UA; full Figma subnav when routes exist.
