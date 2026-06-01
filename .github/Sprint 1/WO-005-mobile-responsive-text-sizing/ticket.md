---
type: work-order
jira_issue: JAK-8
jira_issue_id: "94743"
---

## Goal

Implement responsive typography across the property detail experience and shared chrome using a **major second modular scale (ratio 1.125)** anchored at **16px body copy**. Body text stays fixed at 16px / 24px line-height at every breakpoint; all other roles shift by **integer steps** on the ladder, with viewport-specific step offsets (mobile / tablet / desktop).

Follow-up to **WO-004** (completed). Typography only — no layout breakpoint changes.

---

## Problem story

After WO-004, layout reflows correctly, but type sizes lack a coherent responsive system. `tokens.css` mixes M3 hand-tuned sizes with `[data-font-scale]` modes that shrink body text below 16px. We need a single mathematical scale (major second) so headings shrink predictably on narrow viewports while paragraphs and lists remain readable at **16px**.

---

## Design reference

| | |
| --- | --- |
| **Figma** | [handoffTest — mobile page](https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-2962) |
| **File key** | `OrDMGL6zOS3U9qYwXvPAvc` |
| **Node ID** | `56:2962` (mobile property detail); `56:4076` (mobile nav) |
| **Deep link** | https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-2962 |

Use Figma for **hierarchy validation** only. Colors/spacing stay on repo `var(--*)`.

---

## Requirements

### Functional

1. **Major second scale** — Introduce `--type-ratio-major-second: 1.125` and a stepped ladder `size(n) = round(16px × 1.125^n)` documented in research. Desktop M3 roles map to reference steps (see [research/major-second-type-scale.md](research/major-second-type-scale.md)).
2. **Fixed body copy** — `text-body-lg`, `text-body-md`, and `text-body-sm` (and variants used for paragraphs, lists, footer address, property description, neighborhood copy, form field text on property page) render **16px / 24px line-height** at all viewports. Overrides must win over `[data-font-scale="*"]` blocks.
3. **Breakpoint step shifts** — Non-body roles adjust at:
   - **Desktop** (≥1024px): reference steps (0 shift)
   - **Tablet** (768–1023px): −1 step (−2 for display tiers)
   - **Mobile** (≤767px): −2 steps (−3 for display tiers)
   Media queries use `max-width: 1023px` and `max-width: 767px` to align with `use-breakpoint.ts`.
4. **Chrome** — `text-display-lg` section titles, `text-title-lg` subtitles/labels, `text-headline-md` explore tiles, desktop nav, mobile menu links, and footer headings consume shifted role tokens (not hardcoded px in components).
5. **No layout regression** — No horizontal overflow; WO-004 nav/images/footer unchanged structurally.

### Visual / UX

- **Display-lg mobile** — Target ~36–41px after shifts (research suggests step +7–+8); VQA against `56:2962`.
- **Line heights** — Non-body: ~1.25× font size (rounded). Body: fixed 24px.
- **Nav** — Default: desktop nav stays **16px** (step 0); mobile menu uses headline-sm ladder (confirm 20px vs 24px in plan — see Open Questions in research).

### Technical / architectural

- **Implement in** `src/styles/tokens.css` (primitives + `@media` overrides) and reinforce `src/app/globals.css` body utilities.
- **Avoid** per-component `fontSize` except where plan documents an exception.
- **Do not** remove `[data-font-scale]` blocks globally; reinstate body 16px after them and let breakpoint blocks override non-body sizes.

---

## Success criteria

- [ ] Body copy measures **16px** computed font-size at 375px, 768px, 1024px, and 1440px on `/properties/300-river-place`.
- [ ] `text-display-lg` on hero is **smaller at 375px than at 1440px** by at least one major-second step (~12.5%).
- [ ] Sizes at desktop match research step table within **±1px** of current M3 tokens (display-lg ~57–58px, headline-md ~28–29px, etc.).
- [ ] No document-level horizontal scroll from type changes.
- [ ] Repo semantic colors unchanged.

---

## Out of scope

- WO-004 layout structure.
- Copy changes.
- Auth/signup pages (optional follow-up).
- Replacing M3 font families or weights.

---

## Testing & verification

- DevTools: sample `text-body-lg`, `h1.text-display-lg`, menu link at 375 / 768 / 1024 / 1440.
- Compare hierarchy to Figma `56:2962`.

---

## Figma VQA Checklist

| Field | Value |
| --- | --- |
| **file_key** | `OrDMGL6zOS3U9qYwXvPAvc` |
| **node_id** | `56:2962` |
| **Deep link** | https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-2962 |
| **Frame name** | `/properties/{propertyName} mobile` |

### Assertions

| # | Assertion | Pass |
| --- | --- | --- |
| | | |

---

## Ready for `/research`

- [x] Complete — [major-second-type-scale.md](research/major-second-type-scale.md)

## Ready for `/plan`

- [ ] Pending — generate full role × viewport px table and resolve open questions from research.

## References

- **WO-004** — `.github/Sprint 1/WO-004-mobile-layout-responsive/` (completed)
- [Major second type scale (research)](research/major-second-type-scale.md)
- `src/hooks/use-breakpoint.ts`
- `src/styles/tokens.css`
