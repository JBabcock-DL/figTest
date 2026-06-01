"use client"

/**
 * Dim overlay on the property image carousel until the block scrolls into view.
 *
 * Pairs with {@link PropertyCarousel} inside `property-detail.tsx`.
 *
 * @module components/layout/carousel-reveal
 */

import { useEffect, useRef, useState } from "react"

import { getRevealObserverRootMargin } from "@/lib/css-length"

/** Fades a semi-transparent black overlay from 50% → 0% when the carousel intersects. */
export function CarouselReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: getRevealObserverRootMargin() }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative w-full min-w-0 overflow-hidden">
      {children}
      <div
        className="pointer-events-none absolute inset-0 bg-black"
        style={{
          opacity: visible ? 0 : 0.5,
          transition: "opacity 700ms ease-in-out",
        }}
      />
    </div>
  )
}
