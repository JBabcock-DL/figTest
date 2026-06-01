# Architecture

This document describes how the Bedrock property detail app is structured for engineering review. It focuses on **application code** under `src/`; design-ops bundles under `.designops/` are build tooling for Figma MCP and are not part of the runtime app.

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 App Router (React 19) |
| Styling | Tailwind CSS v4 + CSS variables from `tokens.css` |
| Components | shadcn/ui (Radix primitives) |
| Maps | react-leaflet + Leaflet (client-only, dynamic import) |
| Images | `next/image` (explore tiles use `unoptimized` — see Motion) |
| Deploy | Vercel static/SSG |

---

## Routing

| Route | Implementation | Notes |
|-------|----------------|-------|
| `/` | `src/app/page.tsx` | Renders `PropertyDetail` with `DEFAULT_PROPERTY` |
| `/properties/[propertyName]` | `src/app/properties/[propertyName]/page.tsx` | SSG via `generateStaticParams()` |
| `/properties` | Redirect/list stub | Not the main experience |
| `/sign-in`, `/signup` | `(auth)/` group | Placeholder forms |
| Other nav links | `placeholder-page.tsx` | Shell pages for header/footer QA |

**Data gate:** `getPropertyBySlug()` in `src/data/properties.ts`; unknown slugs call `notFound()`.

---

## Data model

All property content is **static TypeScript** (no CMS/API). The `Property` interface defines:

- Marketing copy, hero, carousel `images[]`, detail grid, neighborhood copy
- `exploreTiles[]` for the dark “Explore More” band
- Asset paths under `/public/properties/`

To add a property:

1. Export assets to `public/properties/`
2. Add a `Property` object to `PROPERTIES`
3. Ensure `generateStaticParams` includes the new `slug`

---

## Page composition: `PropertyDetail`

`src/components/layout/property-detail.tsx` is the single composition root for the marketing page. Sections (top to bottom):

1. **Hero** — title, address, hero image (`AnimateIn` scale variant)
2. **Carousel** — `PropertyCarousel` inside `CarouselReveal` (dim overlay until in view)
3. **Property information** — highlights, detail grid, website CTA
4. **Neighborhood** — copy + `NeighborhoodMapWrapper` (dynamic, `ssr: false`)
5. **Explore More** — horizontal tile row (flex; mobile horizontal scroll)
6. **Contact** — static form UI (no submit handler)

Shared layout constants (`SECTION_PX`, `MOBILE_FULL_BLEED`, etc.) encode Figma mobile full-bleed behavior using tokenized spacing.

---

## Layout chrome

| Component | Role |
|-----------|------|
| `site-nav.tsx` | Desktop + mobile nav; breakpoint-driven menu |
| `site-footer.tsx` | Footer links and branding |
| `mobile-nav-menu.tsx` | Drawer/sheet navigation |
| `bedrock-logo.tsx` | SVG/wordmark |

Rendered from `src/app/layout.tsx` around all routes.

---

## Motion system

Three client primitives coordinate scroll reveals:

### `AnimateIn` (`animate-in.tsx`)

- **`fade-slide` (default):** opacity 0 → 1 and `translateY(±28px)` → 0 when intersecting.
- **`scale`:** used on hero image wrapper; 110% → 100% scale + corner light overlay.
- Uses `IntersectionObserver` with `getRevealObserverRootMargin()` (px derived from `--motion-reveal-root-margin-bottom`).

### `CarouselReveal` (`carousel-reveal.tsx`)

- Black overlay at 50% opacity until the carousel enters view, then fades out.

### Explore More images

Explore tiles wrap the **entire card** (including image) in `AnimateIn`. `next/image` uses **`unoptimized`** so the optimizer/lazy pipeline is not blocked by transform/opacity on an ancestor (symptom: tiles 3–4 blank until DevTools resize). Prefer keeping animation on the card; if changing this, verify all four tiles load without a viewport resize.

---

## Carousel (`property-carousel.tsx`)

- Client-only; reads layout tokens via `getRootLengthPx()` for slide width/gap.
- **Desktop:** fixed slide width from `--layout-carousel-slide-width`.
- **Mobile/tablet:** `ResizeObserver` on container for fluid slide width.
- Infinite loop via cloned first/last slides; auto-advance every 5s.

---

## Map (`neighborhood-map.tsx`)

- Loaded through `NeighborhoodMapWrapper` with `next/dynamic` and `ssr: false` (Leaflet requires `window`).
- Carto Positron tiles; marker at fixed Detroit coordinates for the demo property.
- Marker icon paths point at `public/leaflet/`.

---

## Styling pipeline

```
tokens.css (:root variables, breakpoints, type scale)
    ↓ @import in globals.css
globals.css (@theme inline, utilities, component-specific rules e.g. explore hover, mobile nav)
    ↓ Tailwind classes in TSX (often var(--token-name))
```

**Breakpoints (CSS):** tablet `max-width: 63.9375rem`, mobile `max-width: 47.9375rem` (1024px / 768px at 16px root).

**`useBreakpoint()`** mirrors those bands in JS for carousel behavior (`767` / `1023` px thresholds).

---

## Figma Code Connect

Files matching `*.figma.tsx` map shadcn components to Figma library nodes for design-ops workflows. They are not imported by the app bundle for runtime UI.

---

## Scripts (repo root)

| Script | Purpose |
|--------|---------|
| `scripts/validate-component-tokens.mjs` | Ensures interactive UI files reference state tokens |
| `scripts/migrate-figma-token-classes.mjs` | One-off migration helper |
| `scripts/sync-axis-a-diff.mjs` | Design-system sync utility |

Sprint-specific QA (e.g. responsive screenshots) lives under `.github/Sprint 1/*/scripts/`.

---

## Extension points

- **New properties:** extend `src/data/properties.ts` + static assets.
- **Real form submit:** add Server Action or API route; wire `property-detail` form fields.
- **Map:** parameterize `POSITION` and tile URL from `Property`.
- **Auth:** `(auth)/` routes are presentational only today.
