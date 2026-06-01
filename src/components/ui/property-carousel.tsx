"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

// Figma: img wrapper 1728×960 (bg black), slides 1280×960 laid side-by-side with a 4px gap.
const SLIDE_WIDTH = 1280
const SLIDE_GAP = 4
const SEGMENTS = 4

export interface PropertyCarouselProps {
  images: string[]
}

function PropertyCarousel({ images }: PropertyCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState<number>(0)
  const lastIndex = images.length - 1

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const goNext = () => setActiveIndex((i) => Math.min(lastIndex, i + 1))

  // The active slide is left-aligned in the viewport; the strip translates by one
  // slide (+gap) per step, matching the Figma layout (active sharp, others dimmed).
  const offset = activeIndex * (SLIDE_WIDTH + SLIDE_GAP)

  // Progress bar: first segment is a fixed 60px, the remaining three are flexible.
  // Only the segment for the current slide is highlighted (one at a time).
  const barIndex = Math.min(activeIndex, SEGMENTS - 1)

  return (
    <section className="flex w-full flex-col items-start justify-center gap-[var(--space-xl)]" aria-roledescription="carousel" aria-label="Property images">
      {/* Image strip */}
      <div className="relative h-[960px] w-full overflow-hidden bg-black">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ gap: `${SLIDE_GAP}px`, transform: `translateX(-${offset}px)` }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-[960px] w-[1280px] shrink-0 overflow-hidden"
              aria-hidden={i === activeIndex ? undefined : true}
            >
              <Image
                src={src}
                alt={i === activeIndex ? `Property photo ${i + 1} of ${images.length}` : ""}
                fill
                className="object-cover"
                sizes="1280px"
                priority={i === 0}
              />
              <div
                className={cn(
                  "absolute inset-0 transition-colors",
                  i === activeIndex ? "bg-transparent" : "bg-black/60"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Control row — progress bar left, arrows right */}
      <div className="flex w-full items-center justify-between px-[var(--space-4xl)]">
        <div className="flex h-[5px] w-[200px] items-stretch" style={{ gap: "10px" }}>
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-full rounded-full",
                i === 0 ? "w-[60px] shrink-0" : "min-w-px flex-1",
                i === barIndex
                  ? "bg-[var(--color-primary)]"
                  : "bg-[var(--color-primary-subtle)]"
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-[var(--space-xl)]">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex === 0}
            aria-label="Previous image"
            className="flex size-6 items-center justify-center text-[var(--color-content)] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex === lastIndex}
            aria-label="Next image"
            className="flex size-6 items-center justify-center text-[var(--color-content)] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="size-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

export { PropertyCarousel }
