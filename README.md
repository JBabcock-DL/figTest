# Bedrock Property Detail (figTest)

Next.js application implementing the **Bedrock property detail** experience from Figma, with a Detroit Labs Foundations design token layer, shadcn/ui primitives, and sprint-tracked delivery in `.github/Sprint 1/`.

**Production:** https://figtest.vercel.app

---

## Quick start

| Requirement | Version |
|-------------|---------|
| Node.js | 20+ recommended |
| Package manager | npm (lockfile in repo) |

```bash
git clone https://github.com/JBabcock-DL/figTest.git
cd figTest
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the home route renders the default property (`300 River Place`). The canonical slug route is `/properties/300-river-place`.

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build + static generation |
| `npm run start` | Serve production build locally |
| `npm run lint` | ESLint (Next.js config) |
| `npm run tokens:validate-components` | Lint UI components for required Figma state tokens |

### Environment variables

No variables are required for local dev or the interactive map (OpenStreetMap / CARTO tiles are key-free). See [`.env.example`](.env.example).

---

## What this repo contains

- **Primary feature:** Long-form property marketing page (hero, carousel, details, neighborhood map, explore row, contact form).
- **Design system:** Generated CSS variables in [`src/styles/tokens.css`](src/styles/tokens.css) (Primitives, Theme, Typography, Layout, Effects) consumed via Tailwind v4 in [`src/app/globals.css`](src/app/globals.css).
- **UI kit:** shadcn/ui under [`src/components/ui/`](src/components/ui/) plus Figma Code Connect sidecars (`*.figma.tsx`).
- **Workflow artifacts:** Tickets, plans, and research under [`.github/Sprint 1/`](.github/Sprint%201/) (Jira project `JAK` / claude-ops mirror).

Placeholder routes (`/careers`, `/contact`, `/news`, etc.) exist for navigation shell QA; only the property detail path is fully designed.

---

## Architecture (for reviewers)

See **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** for routing, data model, layout components, motion, tokens, and third-party map loading.

See **[docs/CODE_REVIEW.md](docs/CODE_REVIEW.md)** for a PR/review checklist (accessibility, tokens, motion, assets, deploy).

---

## Project layout

```
src/
  app/                    # App Router pages and globals.css
  components/
    layout/               # Page chrome + PropertyDetail + motion + map
    ui/                   # shadcn/ui + property-carousel
  data/properties.ts      # Static property content (SSG source of truth)
  hooks/                  # useBreakpoint, use-mobile
  lib/                    # cn(), CSS length helpers for IntersectionObserver
  styles/tokens.css       # Design tokens (rem-based; do not hand-edit casually)
public/
  properties/             # Figma-exported imagery for 300 River Place
  leaflet/                # Default marker assets for react-leaflet
scripts/                  # Token validation and design-ops utilities
.github/Sprint 1/         # WO tickets, plans, research, QA scripts
```

Path alias: `@/*` → `src/*` ([`tsconfig.json`](tsconfig.json)).

---

## Design tokens and theming

- Root layout sets `data-theme="light"` and `data-font-scale="100"` on `<html>` ([`src/app/layout.tsx`](src/app/layout.tsx)).
- Typography uses a **major second** scale (1.125) with **16px body lock** across breakpoints; display sizes are viewport-tuned (see WO-005 research).
- Layout/spacing tokens drive responsive property page sections (`--layout-content-max`, carousel dimensions, explore tile flex basis, etc.).
- **Rule for JS:** `IntersectionObserver` `rootMargin` must be px/`%` — never raw `var()`. Use [`getRevealObserverRootMargin()`](src/lib/css-length.ts).

Token changes should stay aligned with Figma variable collections when syncing the design system; component token usage is guarded by `npm run tokens:validate-components`.

---

## Deployment

Hosted on **Vercel** (project `figtest`).

```bash
npx vercel deploy --yes          # preview
npx vercel deploy --prod --yes   # production
```

Connect the GitHub repo in the Vercel dashboard for automatic deploys on push. Local link metadata lives in `.vercel/` (gitignored).

---

## Contributing

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for branch expectations, review focus, and sprint workflow pointers.

---

## Known limitations / follow-ups

| Item | Notes |
|------|--------|
| `tile-4.png` (~16MB) | Compress for faster Explore More loads |
| Explore tile images | `unoptimized` on `next/image` so fade/slide animation parent does not block lazy load |
| Single property | `PROPERTIES` array has one entry; add slugs + `generateStaticParams` when scaling |
| Sign-up / auth routes | UI shell only; no backend |
| Figma ↔ code token sync | Documented as out-of-scope in WO-005; separate ticket |

---

## Related documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — system design
- [docs/CODE_REVIEW.md](docs/CODE_REVIEW.md) — reviewer checklist
- [memory.md](memory.md) — claude-ops project memory (Jira IDs, sprint folder)
- [.github/templates/workflow.md](.github/templates/workflow.md) — team workflow template
