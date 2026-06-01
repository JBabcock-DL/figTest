/**
 * Utilities for reading design-token lengths in JavaScript.
 *
 * Used where browser APIs require pixel values (e.g. `IntersectionObserver` `rootMargin`)
 * while tokens in `tokens.css` are expressed in `rem`.
 *
 * @module lib/css-length
 */

/**
 * Read a length custom property from `:root` and convert it to pixels.
 *
 * @param varName - CSS variable name including leading `--`
 * @param fallbackRem - Value used when the variable is missing or on the server (× 16px at default root)
 * @returns Pixel length (negative values preserved)
 */
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

/**
 * Bottom inset for scroll-reveal observers, derived from `--motion-reveal-root-margin-bottom`.
 *
 * IntersectionObserver only accepts px or % in `rootMargin`; never pass `var(...)` directly.
 *
 * @example
 * // tokens.css: --motion-reveal-root-margin-bottom: -2.5rem  →  "0px 0px -40px 0px"
 */
export function getRevealObserverRootMargin(): string {
  const bottom = getRootLengthPx("--motion-reveal-root-margin-bottom", -2.5)
  return `0px 0px ${bottom}px 0px`
}
