"use client"

/**
 * Scroll-triggered entrance animation for page sections.
 *
 * Observes visibility once via `IntersectionObserver`, then applies a CSS transition.
 * `rootMargin` is computed in pixels via {@link getRevealObserverRootMargin}.
 *
 * @remarks
 * **Explore More tiles** wrap the full card (including `next/image`) and use
 * `unoptimized` images so fade/slide on this wrapper does not block image decode
 * (see `property-detail.tsx`).
 *
 * @module components/layout/animate-in
 */

import { useEffect, useRef, useState } from "react"

import { getRevealObserverRootMargin } from "@/lib/css-length"

/** Props for {@link AnimateIn}. */
export interface AnimateInProps {
  children: React.ReactNode
  className?: string
  /** Stagger delay in ms before the transition starts */
  delay?: number
  /** Slide direction on enter — `below` rises up, `above` drops down */
  from?: "below" | "above"
  /** `fade-slide` (default) or `scale` (110% → 100%, no fade) */
  variant?: "fade-slide" | "scale"
}

/**
 * Fades and slides content into view when it intersects the viewport.
 *
 * - `fade-slide`: opacity 0→1 and translateY(±28px)→0
 * - `scale`: scales inner content 110%→100%; adds corner light overlay (hero image)
 */
export function AnimateIn({
  children,
  className,
  delay = 0,
  from = "below",
  variant = "fade-slide",
}: AnimateInProps) {
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

  const hiddenY = from === "above" ? "-28px" : "28px"

  if (variant === "scale") {
    const scaleTransform = visible ? "scale(1)" : "scale(1.1)"
    return (
      <div ref={ref} className={className}>
        <div
          className="relative size-full"
          style={{
            transform: scaleTransform,
            transformOrigin: "center",
            transition: `transform 700ms ease-in-out ${delay}ms`,
            willChange: "transform",
          }}
        >
          {children}
        </div>
        <div
          aria-hidden
          className={`corner-light-overlay image-reveal-light${visible ? " is-visible" : ""}`}
          style={{ ["--image-reveal-light-delay" as string]: `${delay}ms` }}
        />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${hiddenY})`,
        transition: `opacity 700ms ease-in-out ${delay}ms, transform 700ms ease-in-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}
