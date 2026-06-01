"use client"

/**
 * Client-only boundary for the Leaflet neighborhood map.
 *
 * Leaflet requires `window`; this wrapper uses `next/dynamic` with `ssr: false`
 * so the server render does not touch DOM APIs.
 *
 * @see {@link NeighborhoodMap} in `neighborhood-map.tsx`
 */

import dynamic from "next/dynamic"

const NeighborhoodMap = dynamic(
  () => import("@/components/layout/neighborhood-map"),
  { ssr: false, loading: () => <div className="size-full bg-[#d9d9d9]" /> }
)

/** Renders the interactive map for the neighborhood section. */
export function NeighborhoodMapWrapper() {
  return <NeighborhoodMap />
}
