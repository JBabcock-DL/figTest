---
id: WO-002
title: "Build Property Detail Page (/properties/[propertyName])"
backend: jira
jira_issue: JAK-5
jira_issue_id: "94740"
type: work-order
promoted_from: JAK-5
---

## Goal

Ship the Property Detail Page (`/properties/[propertyName]`) — a full-page view presenting a single Bedrock property with its hero, key facts panel, image carousel, neighborhood map, inquiry form, and "Explore More" recommendations. The page must render correctly at the designed 1728px canvas width, be fully navigable via keyboard, and bind all text content to a property data model (name, address, description, type, size, floors, year built/acquired, architect, website URL).

---

## Problem story

As a prospective tenant or visitor, I want to view a rich detail page for a specific Bedrock property so that I can evaluate the space, understand its attributes, explore the neighborhood, and reach out via a contact form — all in one cohesive experience.

---

## Design reference

| | |
| --- | --- |
| **Figma** | [/properties/{propertyName} — handoffTest](https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc?node-id=35-1383) |
| **File key** | `OrDMGL6zOS3U9qYwXvPAvc` |
| **Node ID** | `35:1383` |
| **Frame / scope** | Property Detail Page — full page |

**Screenshot / preview:** https://www.figma.com/api/mcp/asset/0faa8532-a24c-4577-8cdb-bf757539cd84

---

## Requirements

### Functional

1. **Back button** — renders "Back" label with `arrow-left` icon to the left; navigates to the previous route (e.g. `/properties`) on click.
2. **Property title** — displays dynamic property name (e.g. "300 River Place") using `Display/LG` typography; full-width.
3. **Property subtitle** — displays address line (e.g. "300 River Place | Detroit, MI") using `Title/LG` typography in `var(--color-content-muted)`.
4. **Property description** — multi-paragraph body text bound to property description field; `Body/LG/regular` typography.
5. **Property Information** — bold label "Property Information" with a bulleted list of property highlights; `Body/LG/regular`, `list-disc`, 24px indent.
6. **Property website link** — displays property website URL (e.g. "PropertyWebsite.com") as an underlined link in `var(--color-primary, #6750a4)`; opens in a new tab.
7. **Hero image** — 750×750px image bound to property hero image asset; `object-cover`.
8. **Property Details section** — dark `var(--color-inverse-surface, #070708)` section containing:
   - "Property Details" heading (`Display/LG`, `var(--color-inverse-content)`)
   - "Contact for more info" quiet button with `arrow-right` icon; navigates to contact form section
   - Data grid with 6 labeled fields: **Property Type**, **Size**, **Number of Floors**, **Year Built**, **Year Acquired**, **Architect** — all text `var(--color-inverse-content)`
9. **Image Carousel** — 6-image carousel with:
   - Active image at 1280×960px; inactive images overlaid with `rgba(0,0,0,0.5–0.6)`
   - Progress bar: 4 segments, first active (`var(--color-primary)`), remaining 3 in `var(--color-primary-subtle)`; bar `200px` wide × 5px tall, `gap: 10px`
   - Previous/next arrow controls; clicking advances/retreats the carousel
10. **Map + Neighborhood section** — 712×712px map image left; right panel shows "Campus Martius" title (`Display/LG`), description body (`Body/LG/regular`), and "Get Directions" quiet button with `arrow-right`.
11. **Explore More section** — dark section with "Explore More" heading, 4 property tile cards (372×372px image, `Headline/MD` name, `Body/LG` city/state), and "View all properties" quiet button aligned right.
12. **Contact Form** — "Find the perfect space." heading; 6 `Input` fields in a 2-column wrapping grid:
    - **First Name** — `label="First Name"`, `placeholder="you@example.com"`, `helper="We'll never share your email."`, `variant="default"`, `size="sm"`
    - **Last Name** — `label="Last Name"`, `placeholder="you@example.com"`, `helper="We'll never share your email."`, `variant="default"`, `size="sm"`
    - **Email** — `label="Email"`, `placeholder="you@example.com"`, `helper="We'll never share your email."`, `variant="default"`, `size="sm"`
    - **Phone** — `label="Phone"`, `placeholder="you@example.com"`, `helper="We'll never share your email."`, `variant="default"`, `size="sm"`
    - **Company Name** — `label="Company Name"`, `placeholder="you@example.com"`, `helper="We'll never share your email."`, `variant="default"`, `size="sm"`
    - **Message** — `label="Message"`, `placeholder="you@example.com"`, `helper="We'll never share your email."`, `variant="default"`, `size="sm"`
    - **Send Message** `Button` — `label="Send Message"`, `variant="default"`, `size="lg"`, `leadingIcon={false}`, `trailingIcon={false}`
13. **Top Navigation** — absolute nav at page top: logo left, links right (Our Story, Our Properties, News, Careers, Contact Us); active link shows 2px `var(--color-primary)` underline bar (`opacity-0` inactive, `opacity-100` active).
14. **Footer** — dark section with:
    - "Connect with us." heading + "Let's Talk" quiet button with arrow
    - 4 social icon buttons (32×32px), `gap: 21px`
    - 4 navigation columns: **Our Story** · **Our Properties** · **News** · **Tenants**
    - Address: "630 Woodward Avenue, Detroit, MI 48226 / 250 West Huron Road, Cleveland, OH 44113 / 313.373.8700" (tel link)
    - Copyright: "© 2024 Bedrock Management Services LLC | Privacy Policy | EHOS | DMCA"

### Visual / UX

- **Page background:** `var(--color-background-bright, white)`
- **Max content width:** `1560px` centered; outer horizontal padding: `var(--space-4xl, 64px)`
- **Hero layout:** flex row wrapping; left column `flex: 1 0 0`, `min-width: 500px`, `padding-right: var(--space-4xl, 64px)`; hero image `750×750px`; vertical gap: `var(--space-2xl, 32px)`; section top padding: `160px`
- **Back button:** flex row, `gap: var(--space/100, 4px)`, icon `24×24px`, label `16px bold`, `color: var(--color-content, #0d0c0e)`, `border-radius: var(--corner/100, 4px)`
- **Property name:** `var(--display-lg-font-family)`, weight 500, size `56px`, line-height `64px`, `color: var(--color-content, #0d0c0e)`
- **Property subtitle:** `var(--title-lg-font-family)`, weight 400, size `22px`, line-height `28px`, `color: var(--color-content-muted, #49454f)`
- **Body text:** `var(--body-lg-font-family)`, weight 400, size `16px`, line-height `24px`, `color: var(--color-content, #0d0c0e)`
- **Website link:** `color: var(--color-primary, #6750a4)`, `text-decoration: underline`, `text-underline-position: from-font`
- **Property Details section:** `background: var(--color-inverse-surface, #070708)`, `min-height: 352px`, `padding: var(--space-4xl, 64px)`; data grid `flex-wrap`, `gap-x: var(--space-4xl, 64px)`; each cell `width: 250px`
- **Carousel:** wrapper `1728px × 960px`, `overflow: hidden`; progress bar `200px × 5px`, segment `gap: 10px`
- **Map section:** map `712×712px`; right panel padding `var(--space-4xl, 64px)`, content gap `var(--space-3xl, 48px)`; section `min-height: 1032px`
- **Explore More tiles:** `372×372px` image; tile label `Headline/MD` (28px, 36px line-height); city `Body/LG`; tile gap `var(--space-xl, 24px)`
- **Contact Form:** `gap: 32px` wrapping flex; form panel padding `var(--space-3xl, 48px)`; image column `max-width: 646px`, `min-height: 960px`
- **Footer nav column borders:** `var(--color-primary-fixed-dim, #d0c8e4)`, `border-bottom: 1px solid`; social icons `32×32px`, `gap: 21px`

### Technical / architectural

- **Route:** `src/app/properties/[propertyName]/page.tsx` (Next.js dynamic route; use `generateStaticParams` for known properties)
- **Static data file:** `src/data/properties.ts` — define `Property` interface and export a placeholder array; `generateStaticParams` reads from this array
- **Input component:** `import { Input } from "@/components/ui/input"` — `variant="default"`, `size="sm"`; wrap each field in `<Field>` / `<FieldLabel>` / `<FieldDescription>` from `@/components/ui/field` for label + helper text
- **Button component:** `import { Button } from "@/components/ui/button"` — use **only** for "Send Message" CTA (`variant="default"`, `size="lg"`); Button has no `quiet` variant — all other action buttons (Back, "Contact for more info", "Get Directions", "View all properties", "Let's Talk") must be composed as plain `<button>` + Lucide icon + label
- **Icons:** `import { ArrowLeft, ArrowRight, ... } from "lucide-react"` — all icons available; social brand icons not in lucide-react (use placeholder icons or add `react-icons`)
- **Carousel:** custom `"use client"` component with `useState<number>(0)` for active index; do NOT use `src/components/ui/carousel.tsx` (Embla-based, incompatible with segment progress bar); prev/next handlers clamp to `[0, images.length - 1]`; progress bar: 4 segments, `bg-[var(--color-primary)]` when `i <= activeIndex`, `bg-[var(--color-primary-subtle)]` otherwise; inactive image overlay `bg-black/50`; all images via `next/image`
- **Client boundary strategy:** extract `PropertyNav` (needs `usePathname`) and `PropertyCarousel` (needs `useState`) as separate `"use client"` components; page.tsx itself can be a Server Component
- **Contact form scroll:** add `id="contact-form"` to the contact form section; "Contact for more info" button calls `document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })` — must be in a `"use client"` component
- **Typography tokens:** `text-body-lg`, `text-title-lg`, `text-headline-sm` are available as Tailwind utilities; `display-lg` and `headline-md` are not — apply via `style={{ fontFamily: "var(--display-lg-font-family)", fontSize: "var(--display-lg-font-size)", fontWeight: "var(--display-lg-font-weight)", lineHeight: "var(--display-lg-line-height)" }}` or add utility classes to `globals.css`
- **Token correction:** use `var(--space-xs)` (4px) wherever the Figma spec writes `var(--space/100)` or `var(--corner/100)` — slash-notation variables are not defined in `tokens.css`
- **Data model fields:** `name`, `address`, `description`, `propertyType`, `size`, `floors`, `yearBuilt`, `yearAcquired`, `architect`, `websiteUrl`, `images[]`, `heroImage`, `neighborhoodName`, `neighborhoodDescription`, `neighborhoodDirectionsUrl`
- **Images:** use `next/image` with `object-cover` for hero, carousel, map, and tile images; use `/placeholder.jpg` paths for initial build
- **Accessibility:** decorative images use `alt=""`; social icon links require `aria-label`; nav uses `<nav>` landmark; footer uses `<footer>`; tel link `href="tel:313-373-8700"`; all interactive elements keyboard-operable
- **Nav active state:** use `usePathname()` from `next/navigation` in `PropertyNav` client component to toggle underline bar `opacity-0` → `opacity-100` on the matching route

---

## Acceptance criteria

- [ ] Page renders at 1728px viewport with all sections in correct order: hero → property details → carousel → map → explore more → contact form → footer
- [ ] Back button navigates to `/properties` or browser history previous
- [ ] Property name, subtitle, description, info bullets, and website link render from bound data (not hardcoded)
- [ ] "Contact for more info" CTA scrolls to or routes to the contact form
- [ ] Property Details grid displays all 6 fields: Property Type, Size, Number of Floors, Year Built, Year Acquired, Architect
- [ ] Image carousel advances and retreats via arrow buttons; progress bar first-segment updates with active index
- [ ] "Get Directions" button is present and links to a maps URL
- [ ] Contact form renders all 6 Input fields with exact labels, placeholders, and helper text per spec
- [ ] Input fields use `src/components/ui/input.tsx` with `variant="default"`, `size="sm"`
- [ ] "Send Message" Button uses `src/components/ui/button.tsx` with `variant="default"`, `size="lg"`, `leadingIcon={false}`, `trailingIcon={false}`
- [ ] "Explore More" renders 4 property tile cards with image, name, and city/state
- [ ] Footer renders all 4 nav columns with correct sub-links
- [ ] Address block and tel link correct in footer; Privacy Policy, EHOS, DMCA are external links
- [ ] Social icon links each have an `aria-label`
- [ ] All interactive elements keyboard-operable; no focus traps
- [ ] Design tokens (`var(--color-*)`, `var(--space-*)`, typography slots) used throughout

---

## Out of scope

- Backend API / real property data fetching (placeholder data acceptable)
- Form submission / validation logic (visual only for initial build)
- Mobile / responsive breakpoints (desktop 1728px only)
- i18n / localization
- Carousel auto-play or looping behavior
- Map interactivity (static image acceptable)
- Social media link destinations (href TBD by content team)

---

## Testing & verification

### Functional QA

- All 14 page sections render without console errors
- Carousel prev/next controls function correctly; progress bar updates
- Back button and nav links route correctly

### Visual / design QA

- Side-by-side comparison against Figma node `35:1383` at 1728px viewport
- Token usage verified (no hardcoded hex except design-specified fallbacks)

### Accessibility (WCAG AA)

- All interactive elements keyboard-operable
- Social icon `aria-label`s present
- `<nav>` and `<footer>` landmarks used
- Tel link uses `href="tel:..."`

---

## Figma VQA Checklist

**Figma source (must be filled before `/vqa` runs):**

| Field | Value |
| --- | --- |
| `file_key` | `OrDMGL6zOS3U9qYwXvPAvc` |
| `node_id` | `35:1383` |
| Figma deep link | `https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc?node-id=35-1383` |
| Frame / scope | Property Detail Page — full page |
| Captured at | 2026-06-01 |

**Assertions** *(agent fills `Design (Figma)` and `Build (implemented)` columns, then marks Result):*

| # | Category | Property | Design (Figma) | Build (implemented) | Result |
| --- | --- | --- | --- | --- | --- |
| 1 | Layout | Frame width × height | 1728 × 6020 (content block 1560 wide, x=84 inset) | `max-w-[1560px]` centered `<main>`; carousel full-bleed 1728px | PASS |
| 2 | Layout | Auto-layout direction / gap | Hero row; detail grid gap-x 64 / gap-y 32; section gaps via space tokens | Hero `flex-row` gap `--space-2xl`; grid `gap-x-[--space-4xl] gap-y-[--space-2xl]` | PASS |
| 3 | Layout | Padding (T/R/B/L) | Outer x=84 (≈`--space-4xl` 64 + frame); hero top 160; dark section pad 64 | `px-[--space-4xl]` (64), hero `paddingTop:160px`, dark section `p-[--space-4xl]` | PASS |
| 4 | Layout | Alignment / distribution | Hero left col `flex:1`, hero img right; detail heading/CTA space-between | `flex:1 0 0 min-width:500px`; `justify-between` heading row | PASS |
| 5 | Typography | Font family | Inter (all slots) | `var(--*-font-family)` = Inter via tokens.css | PASS |
| 6 | Typography | Font weight | Display/LG 500; Title/LG 400; Body/LG 400; Headline/MD 400 | Display/LG via token = 400 (tokens.css); others match | FAIL |
| 7 | Typography | Font size | Display/LG 56; Title/LG 22; Body/LG 16; Headline/MD 28 | Display/LG token = 57; Title 22, Body 16, Headline 28 | PASS |
| 8 | Typography | Line height | Display/LG 64; Title/LG 28; Body/LG 24; Headline/MD 36 | Matches tokens.css (64/28/24/36) | PASS |
| 9 | Typography | Letter spacing | 0 across all slots | Default 0 (no override) | PASS |
| 10 | Typography | Text token (display/body/etc.) | display-lg, title-lg, body-lg, headline-md, label-md | `.text-display-lg`, `.text-title-lg`, `.text-body-lg`, `.text-headline-md`, `text-label-md` | PASS |
| 11 | Color | Background fill (hex / token) | bright #ffffff; inverse-surface #070708 | `bg-[var(--color-background-bright)]`, `bg-[var(--color-inverse-surface)]` | PASS |
| 12 | Color | Foreground / text fill (hex / token) | content #0d0c0e; content-muted #49454f; inverse-content #f7f7f8; primary #6750a4 | `--color-content`, `--color-content-muted`, `--color-inverse-content`, `--color-primary` | PASS |
| 13 | Color | Border / stroke (hex / token) | footer nav border primary-fixed-dim #d0c8e4 | `border-[var(--color-primary-fixed-dim)]` | PASS |
| 14 | Color | State variants (hover / pressed / disabled) | nav link hover underline; carousel arrow disabled at ends | Nav active via `usePathname`; carousel arrows `disabled:opacity-50`; hover-only nav state not rendered | FAIL |
| 15 | Spacing | Margin / gap tokens | Space/100=4, 600=24, 1200=48, 1600=64; carousel seg gap 10 | `--space-xs/xl/3xl/4xl`; carousel seg `gap:10px` | PASS |
| 16 | Effects | Border radius | back button corner/100 = 4px; tiles/img 0 | back button `rounded-[var(--space-xs)]` = 4px (token name differs from `corner/100`, undefined in tokens.css) | FAIL |
| 17 | Effects | Shadow / elevation token | none on this frame | none applied | PASS |
| 18 | Effects | Opacity | inactive carousel img overlay rgba(0,0,0,0.5–0.6) | inactive layer `bg-black/50` (0.5) | PASS |
| 19 | Iconography | Icon set / size | arrow-left / arrow-right 24×24; social icons 32×32 | lucide `ArrowLeft`/`ArrowRight` `size-6` (24); social `size-8` (32) | PASS |
| 20 | Components | Code Connect target / shadcn primitive used | Input ComponentSet, Button ComponentSet | `@/components/ui/input` + `@/components/ui/button`; Field wrappers | PASS |
| 21 | Components | Component variants present (size, intent, state) | Input default sm; Button default lg; quiet buttons | Input `variant=default size=sm`; Button `variant=default size=lg`; quiet = `Button variant=ghost` | PASS |
| 22 | Content | Copy matches Figma exactly | See per-row deviations | Headings, labels, footer, address, copyright match; body/bullets differ | FAIL |
| 23 | Content | Localization placeholders honored | N/A (no i18n in scope) | N/A | N/A |
| 24 | Responsive | Breakpoint behavior matches Figma variants | Desktop 1728 only (out of scope) | Desktop-only build | N/A |
| 25 | Accessibility | Contrast ratio (WCAG AA / AAA) | content #0d0c0e on #fff ≈ 19:1; inverse-content #f7f7f8 on #070708 ≈ 19:1; primary #6750a4 on #fff ≈ 5.3:1 | Same token pairs; all ≥ 4.5:1 AA | PASS |
| 26 | Accessibility | Hit target >= 44×44 pt | nav links 48 tall; carousel arrows 24; back button 24 | Carousel arrows `size-8` (32px) icon, no padding → < 44px; nav links inline | FAIL |
| 27 | Accessibility | Focus ring visible & token-based | Inputs ring token; buttons inherit | Input `focus-visible:ring-[--color-focus-ring]`; quiet `<a>`/native buttons rely on UA default ring | FAIL |
| 28 | Screenshot | Side-by-side overlay diff (path) | research/figma-source.png | No headless browser available in env; build screenshot not captured | N/A |

**Per-row deviations:**

- Row 6 — Display/LG weight: Figma 500, build 400 (tokens.css `--display-lg-font-weight: 400`). Documented plan decision to follow tokens.css over the Figma spec. Fix (if design fidelity required): set Display/LG weight to 500 in tokens.css or override on the headings. Owner: `/figma-build` (reconcile token) or `/code-build`.
- Row 14 — Nav hover state: Figma `nav link hover` underline variant is not implemented; build only toggles the active-route underline via `usePathname()`. No hover/pressed style on quiet buttons either. Fix: add `hover:opacity-100` / hover underline to nav links. Owner: `/code-build`.
- Row 16 — Back-button radius token: Figma binds `corner/100` (4px); build uses `var(--space-xs)` (4px). Pixel-equal but token-name mismatch, and `--corner/100` is undefined in tokens.css. Plan documents the substitution; strict design-system fidelity = FAIL. Fix: add/use a `--corner-extra-small` (4px) radius token instead of a spacing token for radius. Owner: `/code-build` + `/figma-build`.
- Row 22 — Copy fidelity: Figma description, Property Information bullets, Property Details grid values (e.g. "Office, Residential, Retail", "484,000 SF", "23", "1965", "1993"), and tile labels ("1234 Main St / Detroit, MI") differ from the placeholder data in `src/data/properties.ts` ("Office / Retail", "350,000 sq ft", "5", etc.). Acceptable for a placeholder-data build (real data out of scope), but copy is not 1:1 with Figma. Fix: bind to real content when the data layer lands. Owner: `/code-build` (data) — non-gating.
- Row 26 — Hit target: carousel prev/next are 32px icon buttons with no padding (< 44×44). Fix: add `p-2`/min size to reach 44×44. Owner: `/code-build`.
- Row 27 — Focus ring: quiet action buttons render as `Button variant="ghost"` (`asChild` → `<a>`) and native carousel `<button>`s without an explicit token-based focus ring; they fall back to the UA outline. Inputs do use the token ring. Fix: add `focus-visible:ring-[var(--color-focus-ring)]` to quiet buttons / carousel controls. Owner: `/code-build`.
- Row 28 — No headless browser (Playwright/Puppeteer) or `public/placeholder.jpg` asset in the environment, so a build screenshot / overlay could not be produced. Comparison done code + rendered-DOM (HTTP 200, all sections present). figma-source.png captured.

---

## References

- Figma: https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc?node-id=35-1383
- Promoted from JAK-5 (Context ticket, created via `/dev-handoff`)
- [Codebase & Component Audit](research/codebase-and-component-audit.md)

<details><summary>Original context capture (JAK-5)</summary>

## Goal

Ship the Property Detail Page (`/properties/{propertyName}`) — a full-page view presenting a single Bedrock property with its hero, key facts panel, image carousel, neighborhood map, inquiry form, and "Explore More" recommendations. The page must render correctly at the designed 1728px canvas width, be fully navigable via keyboard, and bind all text content to a property data model (name, address, description, type, size, floors, year built/acquired, architect, website URL).

## Design reference

| | |
| --- | --- |
| **Figma** | [/properties/{propertyName} — handoffTest](https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc?node-id=35-1383) |
| **File key** | `OrDMGL6zOS3U9qYwXvPAvc` |
| **Node ID** | `35:1383` |

_Created via `/dev-handoff` — DesignOps plugin._

</details>
