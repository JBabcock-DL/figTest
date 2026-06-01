# WO-004 Step 13 — Build QA record

**Date:** 2026-06-01  
**URL:** `/properties/300-river-place`  
**Tool:** `scripts/responsive-qa.mjs` (Playwright)

## Viewports

| Width | Nav | Menu | Explore More | Page overflow | Footer auth |
| --- | --- | --- | --- | --- | --- |
| 375 | Hamburger | Full-screen | Horizontal scroll | Pass | Footer only |
| 768 | Hamburger | ~360px drawer | Horizontal scroll | Pass | Footer only |
| 1024 | Inline 5 links | Hidden | flex-wrap | Pass | Footer only |
| 1440 | Inline 5 links | Hidden | flex-wrap | Pass | Footer only |

## Keyboard

- Escape closes menu (mobile + tablet)
- Tab moves focus into open menu

## Fixes applied during Step 13

- `body { overflow-x: clip }` + `.leaflet-container` clip (Leaflet proxy was widening `scrollWidth`)
- Property detail root `min-w-0 overflow-x-clip`; Explore row `w-full min-w-0`
- `CarouselReveal` `overflow-hidden`
- Nav menu scrim `bg-black/40` via `SheetContent` `overlayClassName`

## Commands

```bash
npx tsc --noEmit && npm run build
node ".github/Sprint 1/WO-004-mobile-layout-responsive/scripts/responsive-qa.mjs"
```

Ready for `/vqa` against Figma nodes `56:2962` / `56:4076` (layout only).
