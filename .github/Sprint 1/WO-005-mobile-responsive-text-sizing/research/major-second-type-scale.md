# Major second responsive type scale — research

## Summary

WO-005 should replace ad hoc breakpoint font sizes with a **single modular scale**: the **major second** interval (**ratio 1.125**, 9∶8). **16px body copy** is the immovable anchor (step `0`). Every other M3 role (display, headline, title, label) maps to an integer **step** on that ladder; **viewport** shifts those steps down on tablet (−1) and mobile (−2), with an extra −1 step for **display** tiers only so hero lines do not dominate small screens.

Implementation belongs in `src/styles/tokens.css` (per-breakpoint overrides) plus hardened `text-body-*` utilities in `globals.css` so `[data-font-scale]` cannot resize body copy.

---

## Key findings

### 1. Major second definition

| Source | Ratio | Notes |
| --- | --- | --- |
| Modular scale (“Major Second”) | **1.125** | Standard on type-scale.com / design-system generators |
| 12-TET whole tone | ~1.122 | Slightly tighter; not used here |
| Current M3 `:root` sizes | ~1.07–1.29 between adjacent roles | Legacy hand-tuned; not a single ratio |

**Chosen ratio:** `--type-ratio-major-second: 1.125`

**Size formula (reference ladder):**

`size(step) = round(16px × 1.125^step)` (round to whole pixels)

| Step | Size (px) | Nearest current role (`:root`) |
| ---: | ---: | --- |
| −3 | 11 | `label-sm` (11) |
| −2 | 13 | `label-md` (12) |
| −1 | 14 | `label-lg`, `title-sm` (14) |
| **0** | **16** | **`body-lg` anchor**, `title-md` (16) |
| +1 | 18 | — |
| +2 | 20 | — |
| +3 | 23 | `title-lg` (22) |
| +4 | 26 | `headline-sm` (24) |
| +5 | 29 | `headline-md` (28) |
| +6 | 32 | `headline-lg` (32) |
| +7 | 36 | `display-sm` (36) |
| +8 | 41 | — |
| +9 | 46 | `display-md` (45) |
| +10 | 52 | — |
| +11 | 58 | `display-lg` (57) |

Desktop **reference steps** (align to existing M3 within ~1px):

| Token | Desktop step |
| --- | ---: |
| `display-lg` | +11 |
| `display-md` | +9 |
| `display-sm` | +7 |
| `headline-lg` | +6 |
| `headline-md` | +5 |
| `headline-sm` | +4 |
| `title-lg` | +3 |
| `title-md` | 0 (emphasis via weight 500, not size) |
| `title-sm` | −1 |
| `label-lg` | −1 |
| `label-md` | −2 |
| `label-sm` | −3 |
| `body-lg` / `body-md` / `body-sm` (copy) | **0 (locked 16px)** |

### 2. Breakpoint shifts (matches `use-breakpoint.ts`)

| Viewport | Width | Non-body step shift | Display-only extra shift |
| --- | --- | --- | --- |
| Desktop | ≥1024px | 0 | 0 |
| Tablet | 768–1023px | −1 | −1 (total −2 for display) |
| Mobile | ≤767px | −2 | −1 (total −3 for display) |

**Example — `display-lg` (hero / section titles using `text-display-lg`):**

| Viewport | Effective step | Size |
| --- | ---: | ---: |
| Desktop | +11 | 58px |
| Tablet | +9 | 46px |
| Mobile | +8 | 41px |

**Example — `headline-sm` (mobile menu links today):**

| Viewport | Step | Size |
| --- | ---: | ---: |
| Desktop | +4 | 26px |
| Tablet | +3 | 23px |
| Mobile | +2 | 20px |

(Menu currently targets ~24px; +4 desktop is close. If design wants 24px exactly on mobile, map menu to **+4 mobile-only** in plan — exception table.)

**Example — `title-lg` (hero address line):**

| Viewport | Step | Size |
| --- | ---: | ---: |
| Desktop | +3 | 23px |
| Tablet | +2 | 20px |
| Mobile | +1 | 18px |

### 3. Line heights

Use a **companion major-second ladder** for line-height (same ratio, independent rounding), **except body copy**:

| Body | Font size | Line height (fixed) |
| --- | ---: | ---: |
| All `text-body-*` used for copy | 16px | **24px** (1.5 — do not scale) |

For non-body roles at step `s`:

`line-height(s) = round(size(s) × 1.25)` — keeps ~1.2–1.3× for headings; tune in `/plan` if Figma mobile frames need tighter leading.

Precomputed desktop examples:

| Role | Size | Suggested lh |
| --- | ---: | ---: |
| display-lg | 58 | 72 |
| headline-md | 29 | 36 |
| title-lg | 23 | 28 |

### 4. Body copy vs `data-font-scale`

`tokens.css` defines `[data-font-scale="85"]` … `"200"` blocks that **resize body tokens** (e.g. 85% mode sets `--body-lg-font-size: 14px`). That conflicts with WO-005.

**Recommendation:**

1. After all scale modes, add a **body lock** block (or append to each breakpoint section):

   ```css
   --body-lg-font-size: 16px;
   --body-lg-line-height: 24px;
   --body-md-font-size: 16px;
   --body-md-line-height: 24px;
   --body-sm-font-size: 16px;
   --body-sm-line-height: 24px;
   ```

   Apply the same in `@media (max-width: 1023px)` and `(max-width: 767px)`.

2. Optionally scope lock under `.text-body-lg` utilities with explicit `font-size: 16px !important` only if attribute overrides still win — prefer token reinstatement first.

3. **Non-body** roles: breakpoint media queries must **re-set** display/headline/title/label sizes **after** `[data-font-scale]` blocks so viewport math wins over accessibility scale modes (document in plan: viewport responsive ≠ user font-scale preference; user scale may still affect root/browser text if not using px locks).

### 5. Codebase usage (property detail + chrome)

| Surface | Class / pattern | Scale tier |
| --- | --- | --- |
| Hero property name | `text-display-lg` | display-lg |
| Hero address | `text-title-lg` | title-lg |
| Description, lists, links, quiet actions | `text-body-lg` | body lock |
| Section h2 (×4) | `text-display-lg` | display-lg |
| Property details labels | `text-title-lg` | title-lg |
| Property details values | `text-body-lg` | body lock |
| Explore tile name | `text-headline-md` | headline-md |
| Explore tile city | `text-body-lg` | body lock |
| Contact heading | `text-display-lg` | display-lg |
| Footer “Connect with us.” | `text-display-lg` | display-lg |
| Footer links / address | `text-body-lg` | body lock |
| Desktop nav links | `text-body-lg` | **Decision:** keep 16px (step 0) or bump to +1 (18px) for emphasis |
| Mobile menu links | inline headline-sm tokens | headline-sm |

No component changes required if role tokens are updated in CSS; optional: replace mobile menu arbitrary `var(--headline-sm-*)` with `text-headline-sm` utility once responsive.

### 6. Conflict with M3 / Figma

- Figma WO-002 cited **56px / weight 500** for Display/LG; tokens use **57px / 400**. Major-second desktop **58px** is within 1px of token — keep weight from tokens unless design reopen.
- Pure major-second ladder does not reproduce every M3 gap (e.g. headline-sm 24 vs formula 26). **Desktop steps table above** is the source of truth; formula generates mobile/tablet sizes by step shift, not by re-fitting M3 independently per breakpoint.

---

## Recommendations

### A. Add scale primitives to `tokens.css`

```css
:root {
  --type-ratio-major-second: 1.125;
  --type-base: 16px;

  /* Reference ladder (desktop); used to derive role tokens */
  --type-step-neg3: 11px;
  --type-step-neg2: 13px;
  --type-step-neg1: 14px;
  --type-step-0: 16px;
  --type-step-1: 18px;
  /* … through --type-step-11: 58px */
}
```

### B. Desktop role tokens alias steps

Map `--display-lg-font-size: var(--type-step-11)`, etc., per table in §1.

### C. Breakpoint overrides (two media blocks)

```css
@media (max-width: 1023px) { /* tablet: shift non-body −1; display −2 */ }
@media (max-width: 767px) { /* mobile: shift non-body −2; display −3 */ }
```

Inside each block, reassign every non-body `--*-font-size` / `--*-line-height` and body lock 16/24.

Match Tailwind `max-lg` (1024) to tablet block upper bound: use **`max-width: 1023px`** for tablet band and **`max-width: 767px`** for mobile so behavior aligns with `useBreakpoint()` (767 / 1023 thresholds).

### D. Body utilities

Ensure `.text-body-lg`, `.text-body-md`, `.text-body-sm` (and emphasis/link variants) always resolve to 16/24 on property surfaces.

### E. `/plan` deliverables

1. Full px table for all roles × 3 viewports (generated from step shifts).
2. Decision on desktop nav (16 vs 18px) and mobile menu (formula +2 = 20px vs design 24px).
3. Whether `data-font-scale` should still scale non-body type only (recommended: yes for a11y, no for body).
4. Optional script or spreadsheet to regenerate steps if ratio changes.

---

## Open questions

1. **Mobile menu size** — Figma `56:4076` may specify ~24px; formula gives 20px at mobile (−2 from headline-sm). Confirm with design: accept scale math or carve a **menu-link** step override.
2. **Desktop nav** — Stay at body 16px or use step +1 (18px) for primary nav?
3. **`body-md` / `body-sm` in shadcn inputs** — Ticket locks “body copy”; form inputs use `text-body-md` / `text-body-sm`. Confirm all become 16px or only paragraph/list copy (inputs might stay visually smaller for density).
4. **`data-font-scale` product intent** — Should user scale preference affect headings while body stays 16px? Research assumes **yes for non-body, no for body**.
5. **Display-lg mobile at 41px** — Still large on 375px width; VQA against `56:2962` may require **display-lg mobile at step +7 (36px)** instead of +8 — tune display shift to −3 mobile (−4 from desktop +11 → +7).

---

## References

- [WO-005 ticket](../ticket.md)
- `src/styles/tokens.css` — M3 roles + `[data-font-scale]`
- `src/hooks/use-breakpoint.ts` — 767 / 1023 / 1024 thresholds
- [WO-002 typography audit](../../WO-002-build-property-detail-page/research/codebase-and-component-audit.md)
