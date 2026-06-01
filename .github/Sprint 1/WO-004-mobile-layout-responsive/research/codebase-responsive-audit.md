# Codebase responsive audit — property detail + chrome

Line references are to the repo state at WO-004 research time. Use this file during `/plan` and `/build` for exact edit targets.

---

## Product decisions (locked)

| Decision | Choice | Notes |
| --- | --- | --- |
| Mobile/tablet nav links | **Flat 5 only** | Same as `NAV_LINKS` in `site-nav.tsx` — no expandable Figma subnav (Office, Retail, …) in WO-004 |
| Sign in / Create account | **Footer only** | `site-footer.tsx` L104–111; remove from header; **not** in drawer/menu |
| Figma `56:4076` | **Visual reference** | Full-screen shell, vertical spacing, close control — not a link tree spec |
| Design tokens | **Repo `var(--*)` only** | Ignore handoff variable collection |

### Flat 5 nav (implementation source of truth)

```ts
// site-nav.tsx — export or share with mobile-nav-menu.tsx
{ label: "Our Story", href: "/our-story" },
{ label: "Our Properties", href: "/properties" },
{ label: "News", href: "/news" },
{ label: "Careers", href: "/careers" },
{ label: "Contact Us", href: "/contact" },
```

Mobile menu: single vertical list, `text-body-lg`, optional primary underline on active route (`usePathname`). No chevrons, no nested lists. Footer `COLUMNS` sub-links remain footer-only (different product surface).

---

## Breakpoint system

| Name | CSS | Tailwind | Used for |
| --- | --- | --- | --- |
| Mobile | `max-width: 767px` | default + `max-md` if configured | Full-screen menu |
| Tablet | `768px – 1023px` | between `md` and `lg` | Right `Sheet`, horizontal Explore More |
| Desktop | `min-width: 1024px` | `lg:` | Inline nav, elastic Explore More |

**Existing hook:** `use-mobile.tsx` — `MOBILE_BREAKPOINT = 768` (matches “mobile” column above).

**Tailwind v4 defaults:** `md` = 768px, `lg` = 1024px — align custom `use-breakpoint.ts` with these; prefer `lg:hidden` / `hidden lg:flex` over one-off pixel media queries where possible.

**Recommended `use-breakpoint.ts` API:**

```ts
export function useBreakpoint(): "mobile" | "tablet" | "desktop"
// mobile: width < 768
// tablet: 768 <= width < 1024
// desktop: width >= 1024
```

---

## Root cause — why layouts break

1. **`min-width: auto` on flex items** — Flex children default `min-width: auto`, so they refuse to shrink below content width. Fixed-size images force the row wider than the viewport.
2. **`shrink-0` on media** — Hero and map explicitly cannot shrink (hero L115, map L161).
3. **Large `min-w-[Npx]` on siblings** — Text columns keep 500–600px floor while image is also wide → row min width ≈ sum of mins → horizontal scroll.
4. **`sizes` too narrow on `next/image`** — e.g. `sizes="750px"` always requests large src; doesn’t cause overflow but hurts performance on mobile (fix alongside layout).

---

## File-by-file audit

### `src/components/layout/property-detail.tsx`

| § | Lines | Issue | Severity |
| --- | --- | --- | --- |
| 1 Hero | 74–75, 115–124 | Text `min-w-[500px]`; image `size-[750px] shrink-0`; `sizes="750px"` | **High** — overflow & no scale |
| 2 Facts | 130–147 | `min-w-[350px]`, `min-w-[400px]`, fixed `w-[250px]` cells | **Medium** — wrap OK until narrow |
| 3 Carousel | (delegated) | See `property-carousel.tsx` | **Medium** — fixed slide width |
| 4 Neighborhood | 160–168 | Map `size-[712px] shrink-0`; copy `min-w-[500px]` | **High** |
| 5 Explore More | 188–210 | `w-[372px]`, `size-[372px]` per tile | **High** |
| 6 Contact | 226–244 | Image `h-[960px] min-w-[600px]`; form `min-w-[600px]` | **High** on tablet |

**Section padding:** Most sections use `px-[var(--space-4xl)]` (48px) — at 375px viewport, content width ≈ 279px before inner mins force overflow.

**Mobile stack order (per Figma `56:2962`):** Below `lg`, hero should be single column: order text then image (or image first if design shows image-on-top — Figma stacks content; recommend **text block first**, full-width image second).

### `src/components/ui/property-carousel.tsx`

| Lines | Issue | WO-004 scope |
| --- | --- | --- |
| 9–10 | `SLIDE_WIDTH = 1280`, `SLIDE_GAP = 4` | Offset math assumes desktop slide width |
| 97 | `h-[960px]` fixed strip height | Too tall on mobile; use `aspect-[4/3]` or `min-h-[240px] max-h-[60vh]` |
| 111 | `w-[1280px] shrink-0` per slide | On viewports &lt; 1280px, active slide wider than viewport — translate still uses 1284px steps |

**Recommendation:** Derive slide width from container: `const slideWidth = containerRef.current?.clientWidth ?? 1280` (resize observer), or use `%`-based transform. Minimum change for WO-004: `w-full` slides inside `overflow-hidden` parent + `aspect-[1280/960]` max height on small screens.

### `src/components/layout/site-nav.tsx`

| Lines | Issue |
| --- | --- |
| 18–21, 104–107 | `ACCOUNT_LINKS` in header — **remove** |
| 100–108 | Inline links always visible — hide below `lg`, show menu button |
| 82 | `px-[var(--space-4xl)]` on bar — reduce to `px-[var(--space-md)]` on mobile (`max-lg:px-[var(--space-md)]`) |

No mobile menu implementation yet.

### `src/components/layout/site-footer.tsx`

| Lines | Issue |
| --- | --- |
| 69 | `min-w-[500px]` left column |
| 118 | `w-[800px] min-w-[800px]` nav columns — **critical** footer overflow |
| 150 | `min-w-[500px]` address block |
| 104–111 | **Keep** Sign in / Create account |

### `src/components/ui/sheet.tsx`

- Default `side: right`, `w-3/4 sm:max-w-sm` (384px) — suitable for **tablet drawer** with override `className="w-[min(100vw,360px)] sm:max-w-[360px]"`.
- Built on `@radix-ui/react-dialog` — focus trap included.
- Overlay `bg-black/80` — may darken to `bg-black/40` per ticket visual spec via `className` on overlay.

### `src/app/layout.tsx`

- `SiteNav` + `SiteFooter` wrap all routes — nav/footer changes are global (acceptable for this WO).

---

## Per-section implementation spec

### Hero (§1)

```tsx
// Wrapper — lg: row, default: column
className="flex w-full max-w-[1560px] flex-col flex-wrap items-stretch gap-[var(--space-4xl)] lg:flex-row lg:items-start"

// Text
className="min-w-0 flex-1 basis-full lg:min-w-[280px] lg:max-w-[650px] lg:pr-[var(--space-4xl)]"

// Image
className="relative min-w-0 w-full max-w-[750px] flex-1 aspect-square overflow-hidden lg:max-w-[750px]"
// Image sizes="(max-width: 1023px) 100vw, 750px"
```

### Property details (§2)

```tsx
// dl — allow shrink
className="flex min-w-0 flex-1 flex-wrap gap-[var(--space-4xl)]"
// cells — min-w-[200px] flex-1 instead of w-[250px] only
className="flex min-w-[200px] flex-1 flex-col gap-[var(--space-sm)] max-w-[250px]"
```

### Neighborhood (§4)

```tsx
// Row stacks on mobile
className="flex w-full max-w-[1560px] flex-col flex-wrap items-stretch gap-[var(--space-4xl)] lg:flex-row lg:items-center"

// Map
className="relative min-w-0 w-full max-w-[712px] flex-1 aspect-square overflow-hidden ..."

// Copy
className="flex min-w-0 flex-1 flex-col gap-[var(--space-3xl)] p-[var(--space-4xl)] lg:min-w-[280px]"
```

### Explore More (§5)

```tsx
// Row
className="flex gap-[var(--space-xl)] flex-wrap lg:flex-nowrap max-lg:overflow-x-auto max-lg:overscroll-x-contain max-lg:pb-2"

// Tile wrapper (AnimateIn)
className="min-w-0 w-full max-w-[372px] flex-[1_1_280px] max-lg:min-w-[280px] max-lg:max-w-[280px] max-lg:shrink-0 max-lg:flex-none"

// Image box
className="relative aspect-square w-full overflow-hidden"
```

### Contact (§6)

```tsx
// Section row
className="flex w-full max-w-[1560px] flex-col flex-wrap items-stretch gap-[var(--space-3xl)] lg:flex-row lg:items-center"

// Image
className="relative min-w-0 w-full max-w-[646px] flex-1 aspect-[646/960] max-h-[min(960px,70vh)] overflow-hidden"

// Form
className="flex min-w-0 flex-1 flex-col gap-[var(--space-3xl)] p-[var(--space-3xl)] lg:min-w-[320px]"
```

### Footer

```tsx
// Columns block — remove fixed 800
className="flex min-w-0 w-full max-w-[800px] flex-1 flex-wrap items-start gap-[var(--space-3xl)]"

// Left / address blocks
className="flex min-w-0 flex-1 flex-col ... lg:min-w-[280px]"
```

---

## Navigation implementation spec

### Desktop (`lg+`)

- Unchanged link set (flat 5).
- Remove divider + account links.

### Tablet (`md` to `lg-1`)

- `hidden lg:flex` on link row.
- `Menu` icon `lg:hidden` opens `Sheet` `side="right"`.
- Panel: logo optional, flat list of 5 `Link`s, `SheetClose` on navigate.

### Mobile (`< md`)

- Same trigger.
- Option A: `Sheet` with `className="w-full max-w-full h-full"` + full viewport content.
- Option B: Radix `Dialog` with `fixed inset-0` content — match `56:4076` white full-bleed panel.
- Typography: `text-body-lg`, vertical `gap-[var(--space-3xl)]` between links (Figma ~48px section gaps are between **groups**; flat list uses smaller gap ~24px).

### Shared `NavLink` behavior

Reuse active underline pattern from desktop or simplify to bold + underline in menu for clarity.

---

## QA matrix

| Width | Nav | Hero | Map | Explore | Contact | Footer | Page scroll-x |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 375 | Menu fullscreen | Stacked, img 100% | Stacked | H-scroll | Stacked | Wrapped | **Must be false** |
| 768 | Menu drawer | Stacked | Stacked | H-scroll | Stacked | Wrapped | **Must be false** |
| 1024 | Inline | Row wrap | Row | Elastic | Row | 2-col | false |
| 1440 | Inline | Row | Row | Elastic | Row | 3-col feel | false |

**Automated check (manual in dev):** `document.documentElement.scrollWidth <= window.innerWidth + 1` at each width on `/properties/[slug]`.

---

## Out of scope / follow-up

| Item | Reason |
| --- | --- |
| Figma expandable subnav | Product: flat 5 for WO-004 |
| Footer sub-link routes (`#` placeholders) | Pre-existing; not WO-004 |
| Carousel infinite-loop refactor | Only width/height responsiveness unless plan expands |
| Container queries for Explore on desktop narrow | Defer post-MVP |

---

## Open questions (remaining)

| Question | Recommendation |
| --- | --- |
| Tablet drawer width | **360px** — `w-[min(100vw,360px)]` on Sheet |
| Hero mobile order | Text first, image second (matches reading order) |
| Carousel slide width | Use container width via ref + resize observer in same WO |
