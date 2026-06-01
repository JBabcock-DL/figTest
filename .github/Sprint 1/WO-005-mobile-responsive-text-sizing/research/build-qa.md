# Build QA — WO-005

## Major second implementation

- Ratio **1.125**, base **16px**, steps `--type-step-neg3` … `--type-step-11` in `tokens.css`.
- **Body lock:** 16px / 24px on `:root` and all `[data-font-scale]` selectors.
- **Tablet** (`max-width: 1023px`): non-body −1 step; display −2.
- **Mobile** (`max-width: 767px`): non-body −2 steps; display −**4** steps (so `display-lg` = step +7 = **36px**, aligned with Figma Display/H2 mobile without a one-off size).

## Menu links (true scale — no override)

| Viewport | Token | Size | Line height |
| --- | --- | ---: | ---: |
| Desktop | `headline-lg` step +6 | 32px | 40px |
| Tablet | step +5 | 29px | 36px |
| Mobile | step +4 | **26px** | 33px |

Component: `text-headline-lg font-bold!` in `mobile-nav-menu.tsx`.

**Figma:** Out of scope for WO-005 (separate ticket for Typography collection / scale modes in `OrDMGL6zOS3U9qYwXvPAvc`).

## Expected computed sizes (`/properties/300-river-place`)

| Element | 375px | 768px | 1024px | 1440px |
| --- | ---: | ---: | ---: | ---: |
| `.text-body-lg` (description) | 16 | 16 | 16 | 16 |
| `h1.text-display-lg` | 36 | 46 | 58 | 58 |
| `.text-headline-md` (explore) | 23 | 26 | 29 | 29 |
| Menu link `.text-headline-lg` | 26 | 29 | 32 | 32 |

Verify in DevTools after refresh.

## Build

- `npx tsc --noEmit` — pass
- `npm run build` — pass
