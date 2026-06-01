---
type: work-order
jira_issue: JAK-6
jira_issue_id: "94741"
---

## Goal

Replace the static map image currently displayed in the neighborhood section of the property detail page with a real interactive or dynamic map centered on the property at 300 River Place, Detroit MI. The map should allow users to explore the surrounding neighborhood, zoom in/out, and see context about the property's location — improving the overall utility and polish of the property detail experience.

---

## Problem story

As a prospective buyer or renter, I want to see an interactive map of the neighborhood around 300 River Place so that I can explore the surrounding area, assess walkability, nearby amenities, and get a real sense of the location without leaving the property detail page.

**Problem:** The current neighborhood section displays a static image of a map, which provides no interactivity, cannot be panned or zoomed, and may be outdated or inaccurate.

**Opportunity:** Replacing it with a live embedded map dramatically improves the utility of the property detail page and aligns with user expectations from comparable real estate platforms.

---

## User stories

- [ ] As a user viewing a property detail page, I can see an interactive map centered on 300 River Place, Detroit MI in the neighborhood section.
- [ ] As a user, I can zoom in and out of the map to explore the surrounding area.
- [ ] As a user, I can pan the map to view adjacent streets and neighborhoods.
- [ ] As a user, I see a pin/marker indicating the exact property location (300 River Place, Detroit MI).

## Design reference *(when UI work applies)*

| | |
| --- | --- |
| **Figma** | See WO-002 property detail page design for neighborhood section layout reference |
| **File key** | N/A — use existing section layout from WO-002 |
| **Node ID** | N/A |
| **Frame / scope** | Property Detail Page — Neighborhood section |

**Screenshot / preview:** See WO-002 research assets for neighborhood section context.

---

## Requirements

> **Research complete.** Confirmed approach: `react-leaflet` + CartoDB Positron tiles (OpenStreetMap). No API key required. See [research/interactive-map-implementation.md](research/interactive-map-implementation.md).

### Functional

1. Remove the `<Image src={property.mapImage} ... />` element (and its wrapping `div.relative.size-[712px]`) from section 4 of `src/components/layout/property-detail.tsx`.
2. Replace it with a `NeighborhoodMap` React component rendered via `next/dynamic` with `ssr: false` to satisfy Leaflet's browser-only requirement.
3. Create `src/components/layout/neighborhood-map.tsx` as a `"use client"` component using `react-leaflet` with a `MapContainer`, `TileLayer` (CartoDB Positron), and `Marker` + `Popup` at coordinates `[42.3314, -83.0458]`.
4. The map must display a pin/marker at 300 River Place, Detroit MI (`[42.3314, -83.0458]`).
5. The map must support zoom in/out controls (Leaflet default zoom control is sufficient).
6. The map must support pan/drag interaction (Leaflet default).
7. The map must load without blocking page render — `dynamic(..., { ssr: false })` satisfies this.

### Visual / UX

- The map container **must retain the exact outer wrapper**: `relative size-[712px] shrink-0 overflow-hidden bg-[#d9d9d9]` from the existing neighborhood section. The Leaflet map must fill this container using `w-full h-full` on the `MapContainer`.
- Use CartoDB Positron tile layer URL: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png` for a clean, light/neutral map style consistent with the site aesthetic.
- Zoom controls should be visible but unobtrusive (default Leaflet positioning is acceptable).
- Default zoom level: 14 (street-level view showing the immediate neighborhood).

### Technical / architectural

- Install `leaflet` and `react-leaflet` as dependencies; add `@types/leaflet` as a devDependency.
- **No API key is required** — CartoDB Positron and OpenStreetMap tiles are free and open with no credentials.
- Create `.env.example` in the project root (it does not currently exist) documenting that no map key is needed for this WO, as general project hygiene.
- The `NeighborhoodMap` component must declare `"use client"` and be placed at `src/components/layout/neighborhood-map.tsx`.
- Import Leaflet's default CSS in the component: `import "leaflet/dist/leaflet.css"`.
- Fix Leaflet's default marker icon broken-image issue in Next.js by overriding `L.Icon.Default` prototype `_getIconUrl` or by using a custom icon pointing to the bundled marker assets.
- Ensure no console errors or CSP violations are introduced (no new `next.config.js` CSP headers needed for OpenStreetMap/CartoDB tile requests).

---

## Acceptance criteria *(definition of done)*

- [ ] The static map image in the neighborhood section is removed.
- [ ] An interactive map is rendered in its place, centered on 300 River Place, Detroit MI.
- [ ] A property marker/pin is visible on the map at the correct location.
- [ ] The map supports zoom and pan interactions.
- [ ] The map container matches the existing layout dimensions with no visual regressions.
- [ ] The map loads without blocking page render.
- [ ] The implementation works on both desktop and mobile viewport sizes.
- [ ] No new console errors are introduced.
- [ ] Any required API key is documented in `.env.example` (if applicable).

## Out of scope

- Adding points of interest layers (restaurants, transit, etc.) — future enhancement.
- Street View integration.
- Map styling/theming beyond a clean neutral tile style.
- Supporting multiple property addresses — this WO targets 300 River Place, Detroit MI only.

---

## Testing & verification

### Functional QA

- Navigate to the property detail page and verify the neighborhood section shows a live map (not a static image).
- Confirm the map centers on 300 River Place, Detroit MI with a visible pin.
- Confirm zoom in/out controls work.
- Confirm the map can be panned.

### Visual / design QA

- Confirm map container dimensions match the original static image container.
- Confirm no layout shift occurs on page load.
- Confirm responsive behavior at mobile breakpoints (< 768px).

### Accessibility *(WCAG AA where applicable)*

- Map iframe/container must have a meaningful `title` attribute (e.g. "Neighborhood map for 300 River Place, Detroit MI").
- Keyboard focus should skip or bypass the map embed gracefully (standard iframe tab behavior).

### Telemetry / observability *(if needed)*

- N/A for this WO.

---

## Figma VQA Checklist

**N/A — no new Figma artifact for this ticket.** The map replaces an existing static image in a layout already defined by WO-002. VQA for this ticket focuses on functional and layout regression testing rather than Figma design parity. See WO-002 for the neighborhood section layout reference.

---

## Ready for `/research`

- Investigate whether any map library (Google Maps, Mapbox, Leaflet) is already present in `package.json` or configured via env vars.
- Confirm exact coordinates for 300 River Place, Detroit MI.
- Review the current neighborhood section component to understand the static image implementation and container dimensions.
- Evaluate free vs. API-key-required map options given the project stack.

## Ready for `/plan`

- Research findings on map library choice must be complete before planning.
- Plan should include: component creation, static image removal, env var documentation (if needed), and responsive QA steps.

## Ready for `/build`

- Approved map library / embed approach confirmed in plan.md.
- Any required API key obtained or documented.

## References

- WO-002 property detail page — neighborhood section layout
- 300 River Place, Detroit MI — approx. coordinates 42.3314° N, 83.0458° W
- [Interactive map implementation research](research/interactive-map-implementation.md)
