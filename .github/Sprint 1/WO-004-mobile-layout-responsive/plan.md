---
ticket: WO-004
jira_issue: JAK-7
---

# Plan — WO-004: Mobile layout enhancements and responsive design

## Approach

Refactor property detail and global chrome in three passes: (1) shared breakpoints and navigation with flat five links, footer-only account auth, and Figma-aligned mobile/tablet menus; (2) replace fixed pixel media and column mins in `property-detail.tsx` with fluid `min-w-0` / `aspect-*` / `lg:` stack patterns grounded in `research/codebase-responsive-audit.md`; (3) make the carousel slide width container-driven and fix footer flex locks. Styling stays on existing repo `var(--*)` tokens — Figma `OrDMGL6zOS3U9qYwXvPAvc` nodes `56:2962` and `56:4076` are layout shells only, not handoff variables. First UI build step refreshes `research/figma-design-truth.md` from Figma MCP before coding.

## Steps

- [ ] Step 1 — Pull Figma MCP `get_design_context` (and screenshot) for `file_key` `OrDMGL6zOS3U9qYwXvPAvc`, nodes `56:2962` and `56:4076`; write `research/figma-design-truth.md` per `skills/conventions/03-figma-design-truth.md` (layout hierarchy + shell only; note tokens come from repo CSS).
- [ ] Step 2 — Add `src/hooks/use-breakpoint.ts` returning `"mobile" | "tablet" | "desktop"` (`<768`, `768–1023`, `≥1024`); export shared `NAV_LINKS` (flat 5) from `src/components/layout/nav-links.ts` for nav + menus.
- [ ] Step 3 — Update `src/components/layout/site-nav.tsx`: remove `ACCOUNT_LINKS` and divider; desktop (`lg+`) inline `NAV_LINKS` only; below `lg` show Menu/Close (`aria-expanded`, `aria-controls`); `max-lg:px-[var(--space-md)]`; keep scroll-direction hide behavior.
- [ ] Step 4 — Implement mobile/tablet menu in `site-nav.tsx` or `src/components/layout/mobile-nav-menu.tsx`: tablet (`md`–`lg-1`) — shadcn `Sheet` `side="right"`, `w-[min(100vw,360px)]`, scrim ~40% opacity; mobile (`<md`) — full-viewport panel per Figma `56:4076` shell; flat 5 `Link`s with `text-body-lg`, active route style, close on navigate; no account links; focus trap via Radix.
- [ ] Step 5 — Hero (`property-detail.tsx` §1): `flex-col lg:flex-row`; text `min-w-0 flex-1 lg:min-w-[280px]`; image `min-w-0 w-full max-w-[750px] flex-1 aspect-square` (no `size-[750px] shrink-0`); `sizes="(max-width: 1023px) 100vw, 750px"`.
- [ ] Step 6 — Facts (§2) + neighborhood (§4): `dl` and map row `min-w-0`; map `w-full max-w-[712px] flex-1 aspect-square`; copy `min-w-0 flex-1 lg:min-w-[280px]`; `flex-col lg:flex-row` on neighborhood wrapper.
- [ ] Step 7 — Explore More (§5): row `flex-wrap lg:flex-nowrap max-lg:overflow-x-auto`; tiles `flex-[1_1_280px] min-w-[280px] max-w-[372px] max-lg:shrink-0 max-lg:flex-none max-lg:w-[280px]`; images `aspect-square w-full` (not `size-[372px]`).
- [ ] Step 8 — Contact (§6): `flex-col lg:flex-row`; image `min-w-0 w-full max-w-[646px] flex-1 aspect-[646/960] max-h-[min(960px,70vh)]`; form `min-w-0 flex-1 lg:min-w-[320px]`; responsive `sizes` on form image.
- [ ] Step 9 — `src/components/ui/property-carousel.tsx`: measure container width (`ResizeObserver` or ref); set slide width = container width; replace fixed `h-[960px]` with `aspect-[1280/960] max-h-[60vh]` (or equivalent); keep infinite-loop snap logic working at all widths.
- [ ] Step 10 — `src/components/layout/site-footer.tsx`: replace `w-[800px] min-w-[800px]` with `min-w-0 w-full max-w-[800px] flex-1 flex-wrap`; left/address blocks `min-w-0 flex-1 lg:min-w-[280px]`; **preserve** Sign in / Create account block (L104–111).
- [ ] Step 11 — Section padding pass: add `max-lg:px-[var(--space-md)]` on property-detail outer sections where `space-4xl` causes pinch at 375px (hero, map, contact, explore) if QA shows edge overflow.
- [ ] Step 12 — Run `npx tsc --noEmit` and `npm run build`; fix any type or build errors.
- [ ] Step 13 — Manual QA on a property detail URL at 375px, 768px, 1024px, 1440px: nav modes (inline / drawer / fullscreen), Explore More mode, no `document.documentElement.scrollWidth > clientWidth + 1`, footer auth only in footer, keyboard menu open/close.

## Build Agents

### Phase 1 (parallel)

- `code-build` — Steps 1–4: Figma design-truth snapshot, `use-breakpoint.ts`, `nav-links.ts`, `site-nav.tsx` + mobile/tablet menu

### Phase 2 (parallel, after Phase 1)

- `code-build` — Steps 5–8: `property-detail.tsx` responsive sections (hero, facts, neighborhood, explore, contact)

### Phase 3 (parallel, after Phase 2)

- `code-build` — Steps 9–11: `property-carousel.tsx`, `site-footer.tsx`, optional section padding pass

### Phase 4 (sequential, after Phase 3)

- `code-build` — Steps 12–13: compile, build, manual responsive QA

## Dependencies & Tools

| Dependency | Use |
| --- | --- |
| **Figma MCP** (`plugin-figma-figma`) | `get_design_context`, `get_screenshot` on `OrDMGL6zOS3U9qYwXvPAvc` — `56:2962`, `56:4076` |
| **file_key / node_id** | `OrDMGL6zOS3U9qYwXvPAvc`; primary VQA `56:2962`; menu shell `56:4076`; top bar `56:4132` |
| **shadcn Sheet** | `src/components/ui/sheet.tsx` — tablet drawer |
| **Radix Dialog** | Full-screen mobile menu (Sheet full-width or Dialog) |
| **lucide-react** | `Menu`, `X` icons |
| **Tailwind `lg` (1024px)** | Nav visibility + Explore More elastic vs scroll |
| **WO-002** | Baseline property detail route and data model (no changes) |
| **Research** | [codebase-responsive-audit.md](research/codebase-responsive-audit.md) for class-level specs |

## Open Questions

_None blocking build — locked in research: flat 5 nav, footer-only auth, 360px tablet drawer, repo tokens only._

Optional during build (default if unspecified):

- Hero mobile column order: **text first, image second** (per audit).
- Figma expandable subnav: **out of scope** — footer `COLUMNS` unchanged.

## Notes

- Research: [mobile-responsive-layout.md](research/mobile-responsive-layout.md), [codebase-responsive-audit.md](research/codebase-responsive-audit.md), [figma-mobile-layout-capture.md](research/figma-mobile-layout-capture.md).
- Do **not** import handoff Figma variable collections; compare layout only to MCP snapshot.
- `use-mobile.tsx` (768) may remain; prefer `use-breakpoint.ts` for menu variant selection.
- Carousel refactor is in scope — fixed `SLIDE_WIDTH = 1280` breaks mobile framing.
- After build, run `/vqa` against Figma VQA checklist nodes `56:2962` / `56:4076`.
