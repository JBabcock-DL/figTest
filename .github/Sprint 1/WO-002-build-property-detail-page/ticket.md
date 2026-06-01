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
| Captured at | |

**Assertions** *(agent fills `Design (Figma)` and `Build (implemented)` columns, then marks Result):*

| # | Category | Property | Design (Figma) | Build (implemented) | Result |
| --- | --- | --- | --- | --- | --- |
| 1 | Layout | Frame width × height | | | |
| 2 | Layout | Auto-layout direction / gap | | | |
| 3 | Layout | Padding (T/R/B/L) | | | |
| 4 | Layout | Alignment / distribution | | | |
| 5 | Typography | Font family | | | |
| 6 | Typography | Font weight | | | |
| 7 | Typography | Font size | | | |
| 8 | Typography | Line height | | | |
| 9 | Typography | Letter spacing | | | |
| 10 | Typography | Text token (display/body/etc.) | | | |
| 11 | Color | Background fill (hex / token) | | | |
| 12 | Color | Foreground / text fill (hex / token) | | | |
| 13 | Color | Border / stroke (hex / token) | | | |
| 14 | Color | State variants (hover / pressed / disabled) | | | |
| 15 | Spacing | Margin / gap tokens | | | |
| 16 | Effects | Border radius | | | |
| 17 | Effects | Shadow / elevation token | | | |
| 18 | Effects | Opacity | | | |
| 19 | Iconography | Icon set / size | | | |
| 20 | Components | Code Connect target / shadcn primitive used | | | |
| 21 | Components | Component variants present (size, intent, state) | | | |
| 22 | Content | Copy matches Figma exactly | | | |
| 23 | Content | Localization placeholders honored | | | |
| 24 | Responsive | Breakpoint behavior matches Figma variants | | | |
| 25 | Accessibility | Contrast ratio (WCAG AA / AAA) | | | |
| 26 | Accessibility | Hit target >= 44x44 pt | | | |
| 27 | Accessibility | Focus ring visible & token-based | | | |
| 28 | Screenshot | Side-by-side overlay diff (path) | | | |

**Per-row deviations:**

-

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
