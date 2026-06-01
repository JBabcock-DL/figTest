---
id: WO-002
status: stub
---

# Plan — WO-002: Build Property Detail Page (/properties/[propertyName])

> Stub created on promotion. Run `/plan` to fill this out interactively.

## Notes (from Research — 2026-06-01)

### Decisions resolved

- **Placeholder data source:** static file at `src/data/properties.ts` with a `Property` interface and one placeholder entry for `300-river-place`; no API needed for initial build
- **Button `quiet` variant:** does NOT exist in `src/components/ui/button.tsx` — all quiet-style action buttons (Back, "Contact for more info", "Get Directions", "View all properties", "Let's Talk") must be plain `<button>` + Lucide icon inline
- **Carousel image assets:** use `/placeholder.jpg` paths via `next/image`; no real image files required for initial build
- **Contact form label/helper:** use `Field` / `FieldLabel` / `FieldDescription` from `src/components/ui/field.tsx` — confirmed available
- **Carousel component:** do NOT use existing `src/components/ui/carousel.tsx` (Embla); implement custom `useState<number>` carousel

### Constraints

- `src/app/properties/[propertyName]/page.tsx` does not exist — full directory tree must be created
- `"use client"` required for `PropertyNav` (usePathname) and `PropertyCarousel` (useState); keep `page.tsx` as Server Component
- Typography utilities `text-display-lg` and `text-headline-md` are not defined in `globals.css` — use inline `style={}` or add utilities
- Token `var(--space/100)` / `var(--corner/100)` in Figma spec do not exist — use `var(--space-xs)` (4px) instead
- Social brand icons not in lucide-react; use placeholder icons for initial build
- Display/LG token resolves to 57px/weight 400 per `tokens.css`; ticket spec says 56px/weight 500 — follow the token

### Blockers

- None — all open questions from plan stub are resolved

## Open questions

- [x] Confirm placeholder property data shape / source — **resolved: static `src/data/properties.ts`**
- [x] Confirm whether `Button` supports a `quiet` variant — **resolved: no quiet variant; compose inline**
- [x] Confirm carousel image assets — **resolved: `/placeholder.jpg` via next/image**
- [ ] Carousel 6-image count vs. 4-segment progress bar: drive bar as `Math.min(activeIndex, 3)` out of 4 segments (confirm with designer if possible)
- [ ] Footer social icon set: which 4 icons? (check Figma node `35:1383`)

## Build Agents

> `/plan` will define parallel phases here once scope is reviewed.

-
