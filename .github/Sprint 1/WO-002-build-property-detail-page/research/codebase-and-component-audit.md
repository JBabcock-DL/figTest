# Research: Codebase & Component Audit — WO-002 Property Detail Page

**Date:** 2026-06-01
**Ticket:** WO-002 / JAK-5

---

## Summary

Investigated the existing Next.js/Tailwind codebase to determine exactly what is available, what gaps exist, and what decisions the build agent must make before implementing the Property Detail Page. The page is a net-new route with no existing skeleton. All required component primitives are present in the repo. The primary open questions from `plan.md` are now resolved.

---

## Key Findings

### 1. Project Stack

- **Framework:** Next.js (latest) with App Router, TypeScript
- **Styling:** Tailwind CSS v4 (`@theme inline`) + design token CSS variables in `src/styles/tokens.css`
- **Component library:** Custom shadcn-based components in `src/components/ui/`
- **Icons:** `lucide-react` (already installed; provides `ArrowLeft`, `ArrowRight`, and social icons)
- **Images:** `next/image` available via Next.js
- **Carousel lib:** `embla-carousel-react` is installed (used in `src/components/ui/carousel.tsx`), but the ticket spec calls for a **custom `useState<number>` carousel** (not embla) — the existing `carousel.tsx` wraps Embla and cannot be used as-is for the progress-bar-driven design
- **Routing:** `usePathname()` from `next/navigation` is available for nav active-state

### 2. Route — No Page Exists Yet

`src/app/properties/[propertyName]/page.tsx` does **not exist**. The directory `src/app/properties/` does not exist either. The build agent must create the full directory tree:
```
src/app/properties/[propertyName]/page.tsx
```
Use `generateStaticParams` with a placeholder array (e.g. `["300-river-place"]`) until a real data layer exists.

### 3. Button Component — No `quiet` Variant

`src/components/ui/button.tsx` exports variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. There is **no `quiet` variant**.

Quiet-style buttons (Back, "Contact for more info", "Get Directions", "View all properties", "Let's Talk", "Explore More" arrow links) must be composed inline with a plain `<button>` element plus a Lucide icon and text, styled with `cursor-pointer` and appropriate token colors — **not** with the `Button` component. The `Button` component should only be used for the "Send Message" CTA as specified.

Recommended inline quiet-button pattern:
```tsx
<button className="flex items-center gap-[var(--space-xs)] text-[var(--color-content)] text-body-lg font-bold cursor-pointer">
  <ArrowLeft className="size-6" />
  Back
</button>
```

### 4. Input Component — Confirmed Compatible

`src/components/ui/input.tsx` supports `variant="default"` and `size="sm"`. The component is a raw `<input>` element — it does **not** support `label`, `placeholder` as a custom prop (placeholder is passed as a standard HTML attribute), and there is **no `helper` prop**.

The contact form fields require a label above the input and helper text below. This must be hand-composed as a `<div>` wrapping a `<label>`, `<Input />`, and a `<p>` helper text element. The `src/components/ui/field.tsx` component may provide a `Field`/`Label`/`HelperText` wrapper — this should be checked and used if available to avoid duplication.

### 5. Typography Tokens — Confirmed

All required typography slots exist in `src/styles/tokens.css`:

| Ticket spec | Token | Resolved values |
|---|---|---|
| `Display/LG` | `--display-lg-*` | 57px / 400 / 64px line-height (note: ticket says 56px/500 — **discrepancy**; use token) |
| `Title/LG` | `--title-lg-*` | 22px / 400 / 28px |
| `Body/LG/regular` | `--body-lg-*` | 16px / 400 / 24px |
| `Headline/MD` | `--headline-md-*` | 28px / 400 / 36px |

CSS utility classes available: `.text-body-lg`, `.text-title-lg`, `.text-headline-sm`. **Note: `text-display-lg`, `text-headline-md` are NOT defined as utilities in `globals.css`** — these must be applied via inline `style` or added as utilities. Recommended: use `style={{ fontFamily: "var(--display-lg-font-family)", fontSize: "var(--display-lg-font-size)", ... }}` or extend `globals.css` with the missing utility classes.

### 6. Design Token Gaps vs Ticket Spec

| Token used in ticket spec | Status in `tokens.css` |
|---|---|
| `var(--color-background-bright)` | Defined (`#ffffff` in light mode) |
| `var(--color-content)` | Defined (`#0d0c0e`) |
| `var(--color-content-muted)` | Defined (`#49454f`) |
| `var(--color-inverse-surface)` | Defined (`#070708`) |
| `var(--color-inverse-content)` | Defined (neutral-50) |
| `var(--color-primary)` | Defined (`#6750a4`) |
| `var(--color-primary-subtle)` | Defined (`#eae7f3`) |
| `var(--color-primary-fixed-dim)` | Defined (`#d0c8e4`) |
| `var(--space-4xl)` | Defined (`64px`) |
| `var(--space-3xl)` | Defined (`48px`) |
| `var(--space-2xl)` | Defined (`32px`) |
| `var(--space-xl)` | Defined (`24px`) |
| `var(--space-xs)` | Defined (`4px`) |
| `var(--corner/100)` | **NOT defined** — ticket spec uses slash notation; use `var(--corner-extra-small)` = 4px instead |
| `var(--space/100)` | **NOT defined** — ticket spec uses slash notation; use `var(--space-xs)` = 4px instead |
| `var(--display-lg-font-family)` | Defined |

### 7. Carousel — Custom Implementation Required

The design calls for a non-Embla carousel with a custom progress bar (4 segments, color-coded by index). The existing `src/components/ui/carousel.tsx` is Embla-based and does not expose segment-based progress control.

**Recommended implementation:**
- `"use client"` component with `useState<number>(0)` for active index
- `images` array prop with `next/image` renders
- Prev/next buttons clamped to `[0, images.length - 1]`
- Progress bar: `Array.from({length: 4})` → each segment `bg-[var(--color-primary)]` when `i <= activeIndex`, `bg-[var(--color-primary-subtle)]` otherwise
- Inactive image overlay: `absolute inset-0 bg-black/50`

### 8. Data Model — Static Placeholder File

Per ticket (out of scope: real API), a static data file at `src/data/properties.ts` (or `.json`) should define the `Property` type and export an array with one placeholder entry for `300-river-place`. The `generateStaticParams` in `page.tsx` should read from this array.

### 9. "Contact for more info" CTA — Scroll Behavior

The "Contact for more info" quiet button inside the dark Property Details section must scroll to the contact form. Since this requires a DOM ref or `id`, the page component must:
- Add `id="contact-form"` to the contact form section
- The button's `onClick` calls `document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })` — requires `"use client"` on the page or extraction to a client component

### 10. Navigation — `usePathname()` Requires Client Component

The top nav uses `usePathname()` to toggle the active underline. This requires the nav to be a `"use client"` component. Since `page.tsx` is a Server Component (for `generateStaticParams`), the nav should be a **separate client component** (e.g., `PropertyNav.tsx`).

### 11. `field.tsx` Component — Confirmed Usable

`src/components/ui/field.tsx` exports `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, and `FieldContent`. The contact form fields should be composed as:

```tsx
<Field>
  <FieldLabel htmlFor="first-name">First Name</FieldLabel>
  <Input id="first-name" variant="default" size="sm" placeholder="you@example.com" />
  <FieldDescription>We'll never share your email.</FieldDescription>
</Field>
```

This fully resolves the "how to compose label + input + helper" question.

---

## Recommendations

1. **Create `src/data/properties.ts`** with a `Property` interface and one placeholder entry. Export `getAllProperties()` for `generateStaticParams`.

2. **Split the page into sub-components** to manage `"use client"` boundaries:
   - `PropertyNav.tsx` (client — uses `usePathname`)
   - `PropertyCarousel.tsx` (client — uses `useState`)
   - `PropertyDetailPage.tsx` or inline in `page.tsx` (server — `generateStaticParams`)
   - Contact form section can be a client component for the scroll-to behavior

3. **Do not use `Button` for quiet-style actions.** Compose inline `<button>` + Lucide icon + label for Back, "Contact for more info", "Get Directions", "View all properties", "Let's Talk".

4. **Resolve `text-display-lg` and `text-headline-md` utility gap** — either add utilities to `globals.css` or apply typography tokens inline via `style={}` props on the relevant heading elements.

5. **Use `var(--corner-extra-small)` (4px) in place of `var(--corner/100)`** wherever the ticket spec uses the slash-notation shorthand.

6. **Use `Field` / `FieldLabel` / `FieldDescription` from `src/components/ui/field.tsx`** for all contact form inputs. The pattern is `<Field> → <FieldLabel> → <Input> → <FieldDescription>` — confirmed available.

7. **Image assets:** Use `/placeholder.svg` or Next.js remote image patterns with `unoptimized` for placeholder images. No actual image files need to be added for initial build — `next/image` with `src="/placeholder.jpg"` and `alt` attributes is acceptable.

8. **Footer social icons:** `lucide-react` does not include brand icons (Twitter/X, LinkedIn, etc.). Use generic `Share2`, `Globe`, or placeholder `ExternalLink` icons, or add `react-icons` if brand icons are required. Keep `aria-label` on each.

---

## Open Questions

1. ~~**`field.tsx` API**~~ — **Resolved.** `Field` / `FieldLabel` / `FieldDescription` are confirmed available and should be used for all contact form inputs.
2. **Display/LG font size discrepancy** — ticket spec says 56px/weight 500, but `--display-lg-font-size` is 57px/weight 400. Which takes precedence: Figma design tokens or the ticket visual spec? **Recommendation: follow the design tokens (`57px/400`).**
3. **Carousel image count vs. progress bar segments** — ticket spec says "6-image carousel" but "progress bar: 4 segments." Are there 4 images (one per segment) or 6 images with the bar only showing first 4? **Recommendation: drive progress bar from active index mod 4 or set `Math.min(activeIndex, 3)`.**
4. **Footer sub-link destinations** — content is out of scope; use `href="#"` placeholders.
5. **Social icon set** — what icons does the design call for? Check Figma node for exact icon names.
