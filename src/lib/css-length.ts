/** Resolve a :root custom property length to pixels (for layout math in JS). */
export function getRootLengthPx(varName: string, fallbackRem: number): number {
  if (typeof window === "undefined") return fallbackRem * 16
  const root = document.documentElement
  const rootFont = parseFloat(getComputedStyle(root).fontSize) || 16
  const raw = getComputedStyle(root).getPropertyValue(varName).trim()
  if (!raw) return fallbackRem * rootFont
  if (raw.endsWith("rem")) return parseFloat(raw) * rootFont
  if (raw.endsWith("px")) return parseFloat(raw)
  return fallbackRem * rootFont
}

/** IntersectionObserver rootMargin — must be px/%, not CSS variables. */
export function getRevealObserverRootMargin(): string {
  const bottom = getRootLengthPx("--motion-reveal-root-margin-bottom", -2.5)
  return `0px 0px ${bottom}px 0px`
}
