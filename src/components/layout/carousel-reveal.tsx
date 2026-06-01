"use client"

import { useEffect, useRef, useState } from "react"

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
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative w-full">
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
