"use client"

import * as React from "react"

export type Breakpoint = "mobile" | "tablet" | "desktop"

const MOBILE_MAX = 767
const TABLET_MAX = 1023

function getBreakpoint(width: number): Breakpoint {
  if (width <= MOBILE_MAX) return "mobile"
  if (width <= TABLET_MAX) return "tablet"
  return "desktop"
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>("desktop")

  React.useEffect(() => {
    const update = () => setBreakpoint(getBreakpoint(window.innerWidth))
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return breakpoint
}
