---
ticket: WO-003
jira_issue: JAK-6
---

# Plan — WO-003: Replace static map with interactive Leaflet map

## Context

The neighborhood section of the property detail page currently shows a static PNG (`/public/properties/map-detroit.png`) inside a fixed 712×712px container. This provides no interactivity. Research confirmed no map library exists in the project and no API key is needed — `react-leaflet` + CartoDB Positron tiles (free, no credentials) is the right fit.

## Approach

Install `leaflet` + `react-leaflet` + `@types/leaflet`. Create a `"use client"` `NeighborhoodMap` component that renders a Leaflet `MapContainer` with CartoDB Positron tiles and a marker at 300 River Place (42.3314, -83.0458). Load it in `property-detail.tsx` via `next/dynamic({ ssr: false })` to satisfy Leaflet's browser-only constraint. Remove the `<Image>` element; keep the existing 712×712 wrapper exactly. Create `.env.example` for project hygiene.

## Steps

- [x] Step 1 — Install dependencies: `npm install leaflet react-leaflet` and `npm install -D @types/leaflet`
- [x] Step 2 — Create `src/components/layout/neighborhood-map.tsx` as a `"use client"` component:
  - Import `leaflet/dist/leaflet.css`
  - Fix broken default marker icons (delete `_getIconUrl` from `L.Icon.Default.prototype` and set `iconUrl`, `iconRetinaUrl`, `shadowUrl` from the `leaflet/dist/images/` paths)
  - Render `<MapContainer center={[42.3314, -83.0458]} zoom={14} style={{ width: "100%", height: "100%" }} aria-label="Neighborhood map for 300 River Place, Detroit MI">` with a `TileLayer` (CartoDB Positron URL) and a `Marker` + `Popup` at the coordinates
- [x] Step 3 — Update `src/components/layout/property-detail.tsx`:
  - Add `import dynamic from "next/dynamic"` and `const NeighborhoodMap = dynamic(() => import("@/components/layout/neighborhood-map"), { ssr: false, loading: () => <div className="size-full bg-[#d9d9d9]" /> })`
  - Replace the `<Image src={property.mapImage} ... />` element (and only that element) with `<NeighborhoodMap />` inside the existing `div` wrapper (`relative size-[712px] shrink-0 overflow-hidden bg-[#d9d9d9]`) — wrapper is unchanged
  - Remove the unused `property.mapImage` reference (the `Image` import can stay as it is used elsewhere in the file)
- [x] Step 4 — Create `.env.example` in the project root documenting that no map key is required for this implementation
- [x] Step 5 — Run `npx tsc --noEmit` and `npm run build` to confirm no type errors or build failures

## Build Agents

### Phase 1 — All steps (single agent, sequential dependencies)
- `code-build` — Steps 1–5: install packages, create NeighborhoodMap component, update property-detail.tsx, create .env.example, verify build

## Dependencies & Tools

- `leaflet`, `react-leaflet`, `@types/leaflet` (to be installed)
- No MCP servers, no API keys, no `next.config.js` changes needed

## Open Questions

- None — all resolved in research.

## Notes

- The outer `div.relative.size-[712px].shrink-0.overflow-hidden.bg-[#d9d9d9]` in `property-detail.tsx` must not change — it sets the exact dimensions the map fills.
- Leaflet requires an explicit height on `MapContainer`; `style={{ width: "100%", height: "100%" }}` works because the parent has a fixed `size-[712px]`.
- The `mapImage` field on `Property` and `RIVER_PLACE.mapImage` in `properties.ts` can be left in place — removing it would require a data model change outside this ticket's scope.
- `"use client"` on `neighborhood-map.tsx` alone is not sufficient in Next.js App Router — the `dynamic({ ssr: false })` wrapper in `property-detail.tsx` is also required to prevent SSR attempting to import Leaflet.
