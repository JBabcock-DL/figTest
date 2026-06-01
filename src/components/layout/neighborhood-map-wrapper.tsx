"use client"

import dynamic from "next/dynamic"

const NeighborhoodMap = dynamic(
  () => import("@/components/layout/neighborhood-map"),
  { ssr: false, loading: () => <div className="size-full bg-[#d9d9d9]" /> }
)

export function NeighborhoodMapWrapper() {
  return <NeighborhoodMap />
}
