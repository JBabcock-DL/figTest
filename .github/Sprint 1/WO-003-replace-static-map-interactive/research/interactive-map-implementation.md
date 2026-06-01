# Research: Interactive Map Implementation for WO-003

## Summary

This document covers the findings from auditing the project codebase for existing map tooling, confirming the static map implementation details, evaluating map library options, and providing a recommended approach for replacing the static map image in the neighborhood section of the property detail page.

---

## Key Findings

### 1. No existing map library or API key configured

- `package.json` has **no map library** (no Google Maps SDK, Mapbox GL JS, Leaflet, react-map-gl, or any derivative).
- There are **no `.env` or `.env.example` files** in the project root. The project does not yet document any environment variables.
- The `next.config.js` is minimal — only `allowedDevOrigins` is set. No `headers()`, no CSP configuration, no `images.domains` for external tile hosts.
- **Conclusion:** A fresh map dependency must be added. No existing API keys are in play.

### 2. Static map implementation — exact location identified

File: `src/components/layout/property-detail.tsx`, section 4 (Map + Neighborhood), lines 144–167.

```tsx
{/* 4. Map + Neighborhood */}
<section className="flex w-full flex-col items-center justify-center px-[var(--space-4xl)] py-[160px]">
  <div className="flex w-full max-w-[1560px] flex-wrap items-center gap-[var(--space-4xl)] bg-[var(--color-background-bright)]">
    <div className="relative size-[712px] shrink-0 overflow-hidden bg-[#d9d9d9]">
      <Image
        src={property.mapImage}
        alt=""
        fill
        className="object-cover"
        sizes="712px"
      />
    </div>
    ...
  </div>
</section>
```

Container dimensions: **712×712px** (square), `shrink-0`, `overflow-hidden`, with a `#d9d9d9` placeholder background. Uses Next.js `<Image fill>`.

The `mapImage` field on the `Property` interface (`src/data/properties.ts`) currently resolves to `/public/properties/map-detroit.png`.

### 3. Property data structure

The `Property` interface in `src/data/properties.ts` has a `mapImage: string` field. For the interactive map approach, this field can either be removed (since coordinates are hardcoded for this WO) or repurposed as a lat/lng tuple or coordinate string on the interface for future multi-property support. For this WO scope (single property), it is simplest to ignore `mapImage` in the `NeighborhoodMap` component and hardcode the 300 River Place coordinates.

**Confirmed coordinates for 300 River Place, Detroit MI:**  
- Latitude: `42.3314` N  
- Longitude: `-83.0458` W  
- These are referenced in the ticket and consistent with the property's known location near the Detroit riverfront.

### 4. Map library evaluation

| Option | API Key Required | Bundle Size | React Integration | Tile Cost | Recommendation |
|---|---|---|---|---|---|
| **Google Maps Embed API** (`<iframe>`) | Yes (Maps Embed API key) | ~0 (iframe, no JS bundle) | No React component needed | Free tier generous | Viable but requires key |
| **Google Maps JS API** (`@react-google-maps/api`) | Yes | ~80kb min | Good | Free tier then paid | Overkill for this WO |
| **Mapbox GL JS** (`react-map-gl`) | Yes (Mapbox token) | ~250kb | Excellent | Free tier generous | Best for advanced use |
| **Leaflet.js + OpenStreetMap** (`react-leaflet`) | **No** | ~40kb | Good | **Free / open** | **Recommended** |

**Recommendation: Leaflet.js via `react-leaflet` + OpenStreetMap tiles.**

Rationale:
- Completely free, no API key, no `.env.example` entry required.
- OpenStreetMap tiles are well-maintained and accurate for Detroit.
- `react-leaflet` provides a clean React component API that fits the existing component architecture.
- The `react-leaflet` package + `leaflet` together are ~40kb gzipped — minimal bundle impact for a Next.js app.
- Supports zoom, pan, and custom markers natively.
- Light/neutral tile styles are available via OpenStreetMap standard tiles, or via CartoDB Positron tiles (also free, no key) for a cleaner aesthetic matching the site's minimal design language.

**Tile style recommendation:** CartoDB Positron (`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`) — free, no API key, very clean neutral/light style that aligns with the site's design aesthetic.

### 5. Next.js SSR / Leaflet compatibility

Leaflet uses browser-only APIs (`window`, `document`). In Next.js (App Router), any component using Leaflet **must be rendered client-side only**. The standard pattern is:

```tsx
"use client"
// AND/OR use next/dynamic with ssr: false
import dynamic from "next/dynamic"
const NeighborhoodMap = dynamic(() => import("@/components/layout/neighborhood-map"), { ssr: false })
```

The inner `NeighborhoodMap` component file must also declare `"use client"` at the top.

This is a well-known, documented constraint of Leaflet + Next.js. It does not affect page load since the map is below the fold in the neighborhood section.

### 6. Required packages

```
leaflet
react-leaflet
@types/leaflet  (devDependency)
```

No changes to `next.config.js` or CSP headers are required for OpenStreetMap/CartoDB tiles (unlike Google Maps iframes, which require `frame-src` CSP entries).

### 7. Layout constraints

The map component must render inside the existing `div` with class `relative size-[712px] shrink-0 overflow-hidden bg-[#d9d9d9]`. The Leaflet map container requires an **explicit height** to render. Using `w-full h-full` on the map container inside the fixed-size wrapper will satisfy this — the outer `size-[712px]` sets both width and height.

On responsive/mobile breakpoints, the outer container is `shrink-0` and square at 712px. At narrow viewports this may overflow. A responsive-aware approach would be to make the outer container `w-full aspect-square` at mobile sizes (capping at 712px on desktop), but this is outside the minimum scope — the existing static `<Image>` has the same constraint, so no regression is introduced.

### 8. Accessibility

Leaflet renders a `<div>` container, not an `<iframe>`. Accessibility for the map requires:
- Setting `aria-label` on the map container div.
- The existing requirement for a `title` attribute (from the ticket) applies to iframe-based embeds; for Leaflet, the `aria-label` on the wrapper div is the correct approach.
- Leaflet's built-in keyboard navigation is limited; standard practice is to wrap the map in a `role="region"` with an `aria-label`.

---

## Recommendations

1. **Use `react-leaflet` + OpenStreetMap (CartoDB Positron tiles) — no API key needed.**
2. Create `src/components/layout/neighborhood-map.tsx` as a `"use client"` component.
3. In `property-detail.tsx`, replace the `<Image>` block with a `dynamic(() => import("./neighborhood-map"), { ssr: false })` wrapper.
4. Hardcode coordinates `[42.3314, -83.0458]` for this WO; the `Property` interface's `mapImage` field can be left as-is or optionally repurposed as optional `mapCoordinates` in a future WO.
5. Create `.env.example` in the project root even if no key is needed (good hygiene) — note that no env var is required for this WO's map implementation.
6. Install: `npm install leaflet react-leaflet` and `npm install -D @types/leaflet`.

---

## Open Questions

- **None blocking.** All pre-research questions have been resolved:
  - No existing map library or API key found. ✓
  - Exact container dimensions confirmed: 712×712px fixed square. ✓
  - Component location confirmed: `src/components/layout/property-detail.tsx` section 4. ✓
  - No `.env.example` file exists; should be created as part of this WO for documentation hygiene even though no key is needed. ✓
  - Recommended library: `react-leaflet` + OpenStreetMap/CartoDB tiles (zero cost, no key). ✓

---

## References

- [react-leaflet documentation](https://react-leaflet.js.org/)
- [CartoDB Positron tiles (free, no API key)](https://github.com/CartoDB/basemap-styles)
- [Next.js dynamic imports / SSR: false pattern](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)
- Codebase: `src/components/layout/property-detail.tsx` (lines 144–167, section 4)
- Codebase: `src/data/properties.ts` (Property interface, `mapImage` field)
