---
ticket: WO-005
jira_issue: JAK-8
---

# Plan — WO-005: Mobile responsive text sizing

## Approach

TODO — run `/plan` after research review. Implement the **major second (1.125) modular scale** from [research/major-second-type-scale.md](research/major-second-type-scale.md): 16px body anchor (step 0), desktop role→step table, tablet/mobile step shifts, display-tier extra shift, body lock over `[data-font-scale]`.

## Notes (from research)

- Ratio **1.125**; ladder `round(16 × 1.125^n)`.
- Breakpoints: mobile ≤767 (−2 steps, display −3), tablet 768–1023 (−1, display −2), desktop ≥1024 (reference).
- Property detail uses `text-display-lg` (×5), `text-title-lg`, `text-headline-md`, `text-body-lg` — token-only changes preferred.
- **Open before build:** mobile menu target size (20px formula vs ~24px Figma); whether `text-body-md/sm` on inputs become 16px; `data-font-scale` behavior for headings only.

## Steps

- [ ] Step 1 — TODO (`/plan`)

## Build Agents

TODO
