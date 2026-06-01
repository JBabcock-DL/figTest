# Plan — WO-002: Build Property Detail Page (/properties/[propertyName])

## Context

A Figma design for a Bedrock property detail page was handed off via `/dev-handoff` (JAK-5) and promoted to a work order. The route `src/app/properties/[propertyName]/page.tsx` does not exist. All required primitives (Input, Button, Field, lucide-react, next/image) are confirmed available. Research resolved all open questions. This plan covers building the full page from scratch in a single sprint.

---

## Approach

Build the page as a Next.js Server Component that reads from a static data file, extracts two `"use client"` sub-components (`PropertyNav` and `PropertyCarousel`) to handle `usePathname` and `useState` respectively, and composes all 8 design sections inline. Quiet-style action buttons use `Button variant="ghost"` (confirmed available) rather than raw `<button>` elements, keeping consistency with the design system. Typography tokens without existing Tailwind utilities (`text-display-lg`, `text-headline-md`) are added to `globals.css` before the page build begins.

---

## Steps

- [x] Step 1 — Add `text-display-lg` and `text-headline-md` utility classes to `src/app/globals.css` using the `--display-lg-*` and `--headline-md-*` token variables already defined in `tokens.css`
- [x] Step 2 — Create `src/data/properties.ts`: define the `Property` interface (all fields from ticket data model), export `PROPERTIES` array with one placeholder entry for slug `"300-river-place"`, and export `getAllProperties()` and `getPropertyBySlug(slug)` helpers
- [x] Step 3 — Create `src/components/ui/property-nav.tsx`: `"use client"` component; renders logo placeholder + 5 nav links (Our Story, Our Properties, News, Careers, Contact Us); uses `usePathname()` from `next/navigation` to toggle `opacity-0` ↔ `opacity-100` on the 2px `var(--color-primary)` underline bar for the active route
- [x] Step 4 — Create `src/components/ui/property-carousel.tsx`: `"use client"` component; accepts `images: string[]` prop; `useState<number>(0)` for active index; renders 1728×960 wrapper with `overflow-hidden`; prev (`ArrowLeft`) and next (`ArrowRight`) from `lucide-react`, clamped to `[0, images.length - 1]`; 4-segment progress bar — segment fills `bg-[var(--color-primary)]` when `i <= activeIndex`, `bg-[var(--color-primary-subtle)]` otherwise; inactive images get `absolute inset-0 bg-black/50` overlay; all images via `next/image`
- [x] Step 5 — Create `src/app/properties/[propertyName]/page.tsx`: Server Component; `generateStaticParams` from `getAllProperties()`; `params.propertyName` → `getPropertyBySlug()` for data; imports `PropertyNav` and `PropertyCarousel`; assembles all 8 sections in order:
  1. `<PropertyNav />` (absolute top)
  2. Hero — back button (`Button variant="ghost"` + `ArrowLeft`), property title (`text-display-lg`), subtitle (`text-title-lg`), description, info bullet list, website link, 750×750 hero image (`next/image object-cover`)
  3. Property Details dark section (`bg-[var(--color-inverse-surface)]`) — heading, `<a href="#contact-form">` "Contact for more info" with `ArrowRight`, 6-cell data grid (Property Type, Size, Floors, Year Built, Year Acquired, Architect)
  4. `<PropertyCarousel images={property.images} />`
  5. Map + Neighborhood — 712×712 map image left, "Campus Martius" heading, description, "Get Directions" (`Button variant="ghost"` + `ArrowRight`)
  6. Explore More dark section — heading, 4 property tile cards (372×372 `next/image`, `text-headline-md` name, `text-body-lg` city), "View all properties" (`Button variant="ghost"`)
  7. Contact Form (`id="contact-form"`) — "Find the perfect space." heading, 6 `Field`→`FieldLabel`→`Input`→`FieldDescription` groups in 2-col flex-wrap (`gap-8`), `Button variant="default" size="lg"` Send Message CTA
  8. `<footer>` — "Connect with us." heading, 4 social icon links with `aria-label` (placeholder Lucide icons), 4 nav columns with `border-b border-[var(--color-primary-fixed-dim)]`, address block + tel link, copyright with external links

---

## Build Agents

### Phase 1 — Foundations (parallel)
- `code-build` (agent A) — Steps 1–2: add globals.css utilities + create `src/data/properties.ts`
- `code-build` (agent B) — Steps 3–4: create `PropertyNav.tsx` + `PropertyCarousel.tsx`

### Phase 2 — Page assembly (after Phase 1)
- `code-build` (agent C) — Step 5: create `src/app/properties/[propertyName]/page.tsx` with all 8 sections

---

## Dependencies & Tools

- `next/image` — hero, carousel, map, tile images
- `lucide-react` — `ArrowLeft`, `ArrowRight`, social placeholder icons
- `src/components/ui/button.tsx` — `variant="ghost"` for quiet buttons; `variant="default" size="lg"` for Send Message
- `src/components/ui/input.tsx` — `variant="default" size="sm"` for form fields
- `src/components/ui/field.tsx` — `Field`, `FieldLabel`, `FieldDescription` for form field composition
- `next/navigation` — `usePathname()` in `PropertyNav`
- Figma MCP (for `/vqa` pass after build) — file key `OrDMGL6zOS3U9qYwXvPAvc`, node `35:1383`

---

## Open Questions

- **Carousel 6-image vs 4-segment mismatch:** Design shows 6 images, progress bar has 4 segments. Recommendation: drive bar as `Math.min(activeIndex, 3)` — segment fills through all 4 over the first 4 images, stays full at index 3+. Confirm with designer if possible.
- **Social icons:** `lucide-react` lacks brand icons; use `Share2`, `Globe`, `ExternalLink`, `Rss` as stand-ins and flag for designer review.
- **next/image domain config:** `next.config.js` has no `images.domains` — placeholder images served locally are fine; real images will need domain config when data layer is added.

---

## Notes

- **Ghost variant confirmed:** `Button` exports `ghost` variant — use it for all quiet-style action buttons to stay in the design system
- **`<a href="#contact-form">`** for the scroll target avoids an extra client component; native scroll behavior is acceptable for initial build
- **Token correction:** `var(--space/100)` and `var(--corner/100)` (Figma spec) → `var(--space-xs)` / `var(--corner-extra-small)` (4px each)
- **Display/LG discrepancy:** `--display-lg-font-size` = 57px/400 in `tokens.css`; Figma spec says 56px/500 — follow tokens.css
- **No real image assets needed:** use `src="/placeholder.jpg"` for all images in initial build
- **Server Component boundary:** `page.tsx` → Server Component; `PropertyNav` + `PropertyCarousel` → Client Components only

### Agent A (Steps 1–2) build notes
- **Step 1:** Added `.text-display-lg` and `.text-headline-md` to the `@layer utilities` block in `src/app/globals.css`, immediately after `.text-display-sm`, matching the existing 4-property pattern (font-family / font-size / font-weight / line-height) and referencing the `--display-lg-*` / `--headline-md-*` token vars. These base tokens auto-adjust across the Android font-scale modes already defined in `tokens.css`.
- **Step 2:** Created `src/data/properties.ts`. `Property` interface includes all 15 ticket data-model fields plus a `slug` field. Single placeholder entry for `"300-river-place"`; all image fields use `/placeholder.jpg`. Exported `getAllProperties()` and `getPropertyBySlug(slug)` (returns `Property | undefined`).
- **Deviation/decision:** Added `slug: string` to the interface (not in the ticket's explicit field list) because the slug-lookup helper and the route's `generateStaticParams` require it.
- **Verification:** `npx tsc --noEmit` passes clean.
- **Files changed:** `src/app/globals.css` (modified), `src/data/properties.ts` (created).

### Agent B (Steps 3–4) build notes
- **Step 3 — `src/components/ui/property-nav.tsx` (created):** `"use client"`; `<nav>` landmark, absolute top, logo placeholder left + 5 `next/link` nav links right (Our Story `/our-story`, Our Properties `/properties`, News `/news`, Careers `/careers`, Contact Us `/contact`). Active state via `usePathname()` (exact match or `startsWith(href + "/")`); 2px `var(--color-primary)` underline bar toggles `opacity-0` → `opacity-100`. Spacing/typography via tokens (`--space-4xl`, `--space-2xl`, `--space-xs`, `text-label-md`); `cn` from `@/lib/utils`. Underline span is `aria-hidden`.
- **Step 4 — `src/components/ui/property-carousel.tsx` (created):** `"use client"`; `images: string[]` prop, `useState<number>(0)`. 1728×960 wrapper `overflow-hidden`; active image 1280×960 via `next/image` (`fill` + `object-cover`); inactive layers get `absolute inset-0 bg-black/50` overlay. Prev/Next = `ArrowLeft`/`ArrowRight` (lucide-react), clamped to `[0, images.length - 1]` and disabled at the ends. 4-segment bar (`200px × 5px`, `gap: 10px`) fills `bg-[var(--color-primary)]` when `i <= barIndex` else `bg-[var(--color-primary-subtle)]`.
- **Open Question applied:** bar driven by `barIndex = Math.min(activeIndex, 3)` per plan recommendation — stays full at index 3+ for the 6-image carousel.
- **Decision:** images rendered as stacked `absolute inset-0` layers with z-index swap (active on top); clamping is the only length assumption, so it works for 4 or 6 images. Arrow controls are native `<button>` with `aria-label` (keyboard-operable).
- **Files changed:** `src/components/ui/property-nav.tsx` (created), `src/components/ui/property-carousel.tsx` (created).

### Agent C (Step 5) build notes
- **Step 5 — `src/app/properties/[propertyName]/page.tsx` (created):** async Server Component. `generateStaticParams()` maps `getAllProperties()` → `{ propertyName: slug }`. `params` typed as `Promise<{ propertyName: string }>` and awaited (Next 16 async-params API); resolved via `getPropertyBySlug()`, `notFound()` if missing. All 8 sections assembled in order: PropertyNav → Hero → Property Details (dark) → PropertyCarousel → Map+Neighborhood → Explore More (dark) → Contact Form (`id="contact-form"`) → footer.
- **Quiet buttons:** used `Button variant="ghost"` with `asChild` so they render as `<a>`/`<Link>` (Back → `/properties`, Contact for more info → `#contact-form`, Get Directions → `neighborhoodDirectionsUrl`, View all properties → `/properties`, Let's Talk → `#contact-form`). Send Message uses `Button variant="default" size="lg"` with no icons.
- **Layout tokens:** page bg `--color-background-bright`; content wrapped in `max-w-[1560px]` centered `<main>` blocks with `px-[var(--space-4xl)]`. Hero left column `flex:1 0 0 / min-width:500px / padding-right:var(--space-4xl)`, section `padding-top:160px`. Detail grid cells `width:250px`, `gap-x:var(--space-4xl)`. Map 712×712, hero 750×750, tiles 372×372, all `next/image object-cover`.
- **Data binding:** name, address, description (split on `\n\n` into paragraphs), 6-cell detail grid, website link (display strips protocol, opens new tab), neighborhood name/description/directions, and Explore More tiles all bound to the `property` object. Property Information bullets derived from propertyType/size/floors/yearBuilt.
- **Contact form:** 6 `Field`→`FieldLabel`→`Input`→`FieldDescription` groups in a `flex-wrap gap-8` 2-col layout (`w-[calc(50%-1rem)]`); every Input `placeholder="you@example.com"`, `variant="default"`, `size="sm"`; helper "We'll never share your email." `htmlFor`/`id` wired per field.
- **Footer:** social icons use placeholder Lucide icons (Share2, Globe, ExternalLink, Rss) each 32×32 with `aria-label`; 4 nav columns with `border-b border-[var(--color-primary-fixed-dim)]` headers; `<address>` block + `tel:313-373-8700` link; copyright line with external Privacy Policy / EHOS / DMCA links.
- **Carousel full-bleed:** PropertyCarousel is fixed 1728px wide (>1560 content), so it's placed in its own `flex justify-center overflow-hidden` section outside the centered `<main>` wrapper to avoid horizontal overflow at narrower viewports while preserving the 1728px design width.
- **Deviation:** Explore More and footer image columns reuse `property.heroImage`/`/placeholder.jpg` since the data model has no separate tile/map/neighborhood images (placeholder-only build per plan). Footer sub-links are placeholder `#` hrefs (destinations out of scope per ticket).
- **Verification:** `npx tsc --noEmit` clean; `npm run build` succeeds — `/properties/[propertyName]` prerenders as SSG (`/properties/300-river-place`). `npm run lint` not run (the `next lint` script in this repo mis-parses its args and errors with "no such directory .../lint" regardless of input — pre-existing, unrelated to this change).
- **Files changed:** `src/app/properties/[propertyName]/page.tsx` (created).

---

## Verification

1. Run `npm run dev` and navigate to `http://localhost:3000/properties/300-river-place`
2. Confirm all 8 sections render without console errors at 1728px viewport
3. Test carousel prev/next — active index updates, progress bar segment changes
4. Click "Contact for more info" — page scrolls to `#contact-form`
5. Click Back — navigates to `/properties` (404 acceptable for now; route doesn't exist yet)
6. Inspect form: 6 Input fields render with correct labels, placeholders, helper text
7. Run `/vqa` against Figma node `35:1383` for visual parity check
