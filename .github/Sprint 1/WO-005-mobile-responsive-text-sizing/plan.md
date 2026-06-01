---
ticket: WO-005
jira_issue: JAK-8
---

# Plan — WO-005: Mobile responsive text sizing

## Approach

Implement a **major second modular type scale** (ratio `1.125`, base `16px`) entirely in CSS tokens: add a stepped ladder in `tokens.css`, map existing M3 role variables to desktop reference steps, then override non-body roles in `@media (max-width: 1023px)` (tablet) and `@media (max-width: 767px)` (mobile) using the shift rules from [research/major-second-type-scale.md](research/major-second-type-scale.md). **Body** roles (`body-lg` / `body-md` / `body-sm` and variants) stay **16px / 24px** at every viewport and are re-locked after `[data-font-scale]` blocks so accessibility scale modes cannot shrink copy. Layout components already use `text-*` utilities — no structural changes; mobile menu uses `text-headline-lg`. VQA compares hierarchy to Figma `56:2962` / `56:4076` via a fresh `research/figma-design-truth.md`.

## Steps

- [x] Step 1 — **Figma design truth:** Pull `get_design_context` (and screenshot if useful) for `file_key` `OrDMGL6zOS3U9qYwXvPAvc`, nodes `56:2962` (mobile page) and `56:4076` (mobile nav). Write `research/figma-design-truth.md` per `03-figma-design-truth.md`. Record **exact TEXT font sizes** for hero title, section headings, body paragraphs, and menu links — used only to validate scale output, not to replace the major-second system.
- [x] Step 2 — **Scale primitives:** In `src/styles/tokens.css`, add `--type-ratio-major-second: 1.125`, `--type-base: 16px`, and `--type-step-{n}` from step −3 through +11 (px values per research table: 11, 13, 14, 16, 18, 20, 23, 26, 29, 32, 36, 41, 46, 52, 58).
- [x] Step 3 — **Desktop role mapping:** Refactor `:root` M3 `--display-*`, `--headline-*`, `--title-*`, `--label-*` font-size/line-height to alias the step table (desktop reference steps in Notes). Keep font-family and font-weight unchanged. Set all `--body-*-font-size` to `var(--type-step-0)` (16px) and line-height 24px.
- [x] Step 4 — **Tablet overrides:** Add `@media (max-width: 1023px)` block after `[data-font-scale]` sections that reassigns non-body role sizes using **−1 step** (headline/title/label) and **−2 steps** for display tiers. Re-apply body lock (16/24).
- [x] Step 5 — **Mobile overrides:** Add `@media (max-width: 767px)` block with **−2 steps** (non-display) and **−3 steps** (display) from desktop reference. Re-apply body lock. If hero `text-display-lg` exceeds Figma at 375px, tune `display-lg` mobile to step **+7 (36px)** instead of +8 (41px) per design-truth — document choice in `research/build-qa.md`.
- [x] Step 6 — **Body lock vs `data-font-scale`:** After all `[data-font-scale="*"]` blocks, append a `:root` (or shared) **body-lock** snippet forcing `--body-lg/md/sm-font-size: 16px` and `--body-lg/md/sm-line-height: 24px` (and variant aliases). Ensure tablet/mobile media blocks repeat the lock. Non-body tokens in breakpoint media must come **after** font-scale blocks so viewport wins.
- [x] Step 7 — **`globals.css` utilities:** Confirm `.text-body-lg`, `.text-body-md`, `.text-body-sm` (and emphasis/link/italic variants) read locked tokens. If computed styles still change under `data-font-scale="85"`, add explicit `font-size: 16px; line-height: 24px` on body utilities (last resort).
- [x] Step 8 — **Chrome cleanup:** In `mobile-nav-menu.tsx`, `text-headline-lg font-bold!` on menu links so menu links use the responsive token. Leave `site-nav.tsx` on `text-body-lg` (16px desktop nav). No edits to `property-detail.tsx` unless audit finds non-token typography.
- [x] Step 9 — **Audit:** Grep `src/components/layout/` for `text-[length:var(`, `fontSize`, and missing utilities; fix only violations found.
- [x] Step 10 — **Verify build:** Run `npx tsc --noEmit` and `npm run build`.
- [x] Step 11 — **Manual QA:** At 375, 768, 1024, 1440 on `/properties/300-river-place`, record computed font-size for (a) property description `.text-body-lg`, (b) hero `h1.text-display-lg`, (c) explore tile `.text-headline-md`, (d) open menu link. Confirm no horizontal overflow.
- [x] Step 12 — **Document:** Write `research/build-qa.md` with measured sizes vs plan table and note any Figma delta. Update `ticket.md` Figma VQA assertion placeholders if needed.

## Build Agents

### Phase 1 (parallel)

- `code-build` — Steps 1–11: Figma design-truth snapshot, token ladder + breakpoint overrides + body lock, `globals.css` reinforcement, mobile menu utility swap, layout audit, tsc/build, manual QA notes in `research/build-qa.md`.

### Phase 2 (sequential, after Phase 1)

- `code-build` — Step 12: Finalize build-qa doc and ticket VQA table prep (no code unless QA found gaps).

## Dependencies & Tools

| Tool | Use |
| --- | --- |
| **Figma MCP** (`plugin-figma-figma`) | `get_design_context`, optional `get_screenshot` — `file_key` `OrDMGL6zOS3U9qYwXvPAvc`, nodes `56:2962`, `56:4076` |
| **Code** | `src/styles/tokens.css`, `src/app/globals.css`, `src/components/layout/mobile-nav-menu.tsx` |
| **Research** | [major-second-type-scale.md](research/major-second-type-scale.md) |
| **Reference** | [WO-004 figma-design-truth.md](../WO-004-mobile-layout-responsive/research/figma-design-truth.md) (layout only; re-pull for type sizes) |
| **Breakpoints** | `src/hooks/use-breakpoint.ts` — 767 / 1023 / 1024 (CSS uses 1023px and 767px max-width) |

## Open Questions

| # | Question | Plan decision |
| --- | --- | --- |
| 1 | Mobile menu size vs Figma ~24px? | Use **`text-headline-lg`** (26px mobile at step +4). |
| 2 | Desktop nav 16 vs 18px? | **16px** — keep `text-body-lg` on `site-nav.tsx`. |
| 3 | `text-body-md/sm` on inputs globally? | **16px everywhere** — ticket locks all body-tier utilities; contact form inherits via `Input` variants. |
| 4 | `data-font-scale` on headings? | **Yes** — existing `[data-font-scale]` blocks remain; **breakpoint media + body-lock** override afterward for viewport and body respectively. |
| 5 | Display-lg mobile 41 vs 36px? | **Default +8 (41px)**; downgrade to **+7 (36px)** in Step 5 if Step 1 Figma TEXT nodes are closer to 36px. |

## Notes

### Role × viewport size table (major second, rounded px)

Line heights for non-body: `round(font-size × 1.25)` unless noted. Body always **16 / 24**.

| Role | Desktop step | Desktop | Tablet step | Tablet | Mobile step | Mobile |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| display-lg | +11 | 58 | +9 | 46 | +7 | 36 |
| display-md | +9 | 46 | +7 | 36 | +6 | 32 |
| display-sm | +7 | 36 | +5 | 29 | +4 | 26 |
| headline-lg | +6 | 32 | +5 | 29 | +4 | 26 |
| headline-md | +5 | 29 | +4 | 26 | +3 | 23 |
| headline-sm | +4 | 26 | +3 | 23 | +2 | 20 |
| title-lg | +3 | 23 | +2 | 20 | +1 | 18 |
| title-md | 0 | 16 | −1 | 14 | −2 | 13 |
| title-sm | −1 | 14 | −2 | 13 | −3 | 11 |
| label-lg | −1 | 14 | −2 | 13 | −3 | 11 |
| label-md | −2 | 13 | −3 | 11 | −4 | 10 |
| label-sm | −3 | 11 | −4 | 10 | −5 | 9 |
| body-lg/md/sm | 0 | 16 | 0 | 16 | 0 | 16 |

\*Mobile `display-lg` may be set to step **+7 → 36px** after Figma pull (Step 1 / 5).

### Shift rules (implementation reference)

- **Tablet** `max-width: 1023px`: `effectiveStep = desktopStep − 1` (display roles: `desktopStep − 2`).
- **Mobile** `max-width: 767px`: `effectiveStep = desktopStep − 2` (display-lg: `desktopStep − 4` → 36px; display-md/sm: `desktopStep − 3`).
- **Display roles:** `display-lg`, `display-md`, `display-sm`.

### Property detail + chrome mapping (no class renames expected)

| Element | Utility | Token |
| --- | --- | --- |
| Hero h1 | `text-display-lg` | display-lg |
| Address | `text-title-lg` | title-lg |
| Body copy / lists / footer | `text-body-lg` | body lock |
| Section h2 ×4 | `text-display-lg` | display-lg |
| DT labels | `text-title-lg` | title-lg |
| Explore name | `text-headline-md` | headline-md |
| Menu links | `text-headline-lg` | headline-lg |
| Desktop nav | `text-body-lg` | body lock |

### Research incorporated

- [major-second-type-scale.md](research/major-second-type-scale.md) — ratio, steps, shifts, body-lock strategy.
- WO-004 completed — layout breakpoints unchanged.
