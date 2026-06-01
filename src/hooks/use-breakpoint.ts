"use client"

/**
 * Viewport breakpoint hook aligned with CSS media queries in `tokens.css`.
 *
 * | Breakpoint | Width (px) | CSS |
 * |------------|--------------|-----|
 * | mobile     | ≤ 767        | `max-width: 47.9375rem` |
 * | tablet     | 768–1023     | between mobile and desktop |
 * | desktop    | ≥ 1024       | default / `min-width` rules |
 *
 * @module hooks/use-breakpoint
 */

import * as React from "react"

/** Logical viewport band used by layout components (e.g. carousel). */
export type Breakpoint = "mobile" | "tablet" | "desktop"

const MOBILE_MAX = 767
const TABLET_MAX = 1023

function getBreakpoint(width: number): Breakpoint {
  if (width <= MOBILE_MAX) return "mobile"
  if (width <= TABLET_MAX) return "tablet"
  return "desktop"
}

/**
 * Returns the current breakpoint; updates on `window` `resize`.
 *
 * Initial render is `"desktop"` until the effect runs (avoid layout flash in SSR by
 * matching server default to largest layout when possible).
 */
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
