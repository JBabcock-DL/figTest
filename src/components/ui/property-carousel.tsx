"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

const SLIDE_WIDTH = 1280
const SLIDE_GAP = 4
const TRANSITION_MS = 1000
const AUTO_ADVANCE_MS = 5000

export interface PropertyCarouselProps {
  images: string[]
}

function PropertyCarousel({ images }: PropertyCarouselProps) {
  const count = images.length

  // Slide strip: [clone_of_last, ...images, clone_of_first]
  // internalIndex starts at 1 (the real first image).
  const slides = React.useMemo(
    () => [images[count - 1], ...images, images[0]],
    [images, count]
  )

  const [internalIndex, setInternalIndex] = React.useState(1)
  const [animated, setAnimated] = React.useState(true)
  const snapTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  const goNext = () => {
    setAnimated(true)
    setInternalIndex((i) => i + 1)
  }

  const goPrev = () => {
    setAnimated(true)
    setInternalIndex((i) => i - 1)
  }

  // After landing on a clone, wait for the CSS transition then snap to the real slide.
  React.useEffect(() => {
    clearTimeout(snapTimer.current)

    if (internalIndex === 0) {
      // Animated to clone-of-last → snap to real last
      snapTimer.current = setTimeout(() => {
        setAnimated(false)
        setInternalIndex(count)
      }, TRANSITION_MS)
    } else if (internalIndex === slides.length - 1) {
      // Animated to clone-of-first → snap to real first
      snapTimer.current = setTimeout(() => {
        setAnimated(false)
        setInternalIndex(1)
      }, TRANSITION_MS)
    }

    return () => clearTimeout(snapTimer.current)
  }, [internalIndex, count, slides.length])

  // Re-enable animation one frame after a snap so the next click animates.
  React.useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() => setAnimated(true))
      return () => cancelAnimationFrame(raf)
    }
  }, [animated])

  // Auto-advance every 5s with a 1s ease transition; timer resets after each slide change.
  React.useEffect(() => {
    const timer = setInterval(() => {
      setAnimated(true)
      setInternalIndex((i) => i + 1)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [internalIndex])

  // Map internal index to the real image index (0-based) for indicators.
  const activeIndex =
    internalIndex === 0
      ? count - 1
      : internalIndex === slides.length - 1
        ? 0
        : internalIndex - 1

  const offset = internalIndex * (SLIDE_WIDTH + SLIDE_GAP)

  return (
    <section
      className="flex w-full flex-col items-start justify-center gap-[var(--space-xl)]"
      aria-roledescription="carousel"
      aria-label="Property images"
    >
      {/* Image strip */}
      <div className="relative h-[960px] w-full overflow-hidden bg-black">
        <div
          className="flex h-full"
          style={{
            gap: `${SLIDE_GAP}px`,
            transform: `translateX(-${offset}px)`,
            transition: animated ? `transform ${TRANSITION_MS}ms ease` : "none",
          }}
        >
          {slides.map((src, i) => {
            const isActive = i === internalIndex
            return (
              <div
                key={i}
                className="relative h-[960px] w-[1280px] shrink-0 overflow-hidden"
                aria-hidden={isActive ? undefined : true}
              >
                <Image
                  src={src}
                  alt={isActive ? `Property photo ${activeIndex + 1} of ${count}` : ""}
                  fill
                  className="object-cover"
                  sizes="1280px"
                  priority={i <= 2}
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-colors",
                    isActive ? "bg-transparent" : "bg-black/60"
                  )}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Control row — one indicator per real image, arrows always enabled */}
      <div className="flex w-full items-center justify-between px-[var(--space-4xl)]">
        <div className="flex h-[5px] items-stretch" style={{ gap: "10px" }}>
          {images.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-full rounded-full",
                i === 0 ? "w-[60px] shrink-0" : "w-[37px] shrink-0",
                i === activeIndex
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
            aria-label="Previous image"
            className="flex size-6 items-center justify-center text-[var(--color-content)] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          >
            <ArrowLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="flex size-6 items-center justify-center text-[var(--color-content)] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          >
            <ArrowRight className="size-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

export { PropertyCarousel }
