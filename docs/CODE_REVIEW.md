# Code review checklist

Use this list when reviewing PRs for **figTest**. Not every item applies to every change; skip sections that are out of scope and call out what you verified.

---

## Setup verification

- [ ] `npm install` succeeds on a clean clone
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes (or explain intentional exceptions)
- [ ] `npm run tokens:validate-components` passes when `src/components/ui/` changed
- [ ] No secrets committed (`.env`, API keys); `.env.example` updated if new vars added

---

## Routing and data

- [ ] New routes documented in README / ARCHITECTURE if user-facing
- [ ] Property slugs added to `getAllProperties()` / `generateStaticParams` when applicable
- [ ] `notFound()` used for unknown `[propertyName]` slugs
- [ ] Static assets live under `public/` with reasonable file size (flag assets > 1MB)

---

## Design tokens and CSS

- [ ] Colors, spacing, and type use `var(--…)` from `tokens.css` — avoid new magic numbers unless tied to a token
- [ ] Breakpoints align with `tokens.css` media queries (`63.9375rem` / `47.9375rem`) when responsive
- [ ] JS that reads lengths uses `getRootLengthPx()` / `getRevealObserverRootMargin()` — **never** pass CSS `var()` to `IntersectionObserver` `rootMargin`
- [ ] `html { font-size: 100%; }` preserved if touching root typography
- [ ] Dark/inverse sections use semantic inverse tokens (`--color-inverse-*`) on Explore/footer bands

---

## Layout and responsive behavior

- [ ] Test at **375px**, **768px**, **1024px**, and **1440px** for property page changes
- [ ] Mobile full-bleed sections use established patterns (`MOBILE_FULL_BLEED`) rather than one-off negative margins
- [ ] Horizontal scroll rows (Explore More) do not trap focus; tiles remain reachable on mobile
- [ ] Leaflet map still loads (`NeighborhoodMapWrapper` + `ssr: false` unchanged unless intentional)

---

## Motion and images

- [ ] `AnimateIn` / `CarouselReveal` still disconnect observers after reveal (no leak on long sessions)
- [ ] Explore More: all four tile images visible without opening DevTools after hard refresh
- [ ] If moving `AnimateIn` relative to `next/image`, retest explore row (known transform + lazy-load interaction)
- [ ] Hero/carousel animations match design intent (scale vs fade-slide variants)

---

## Accessibility

- [ ] Images have meaningful `alt` or empty alt with adjacent text (decorative)
- [ ] Icon-only controls have `aria-hidden` on icons + visible text or `aria-label`
- [ ] Focus rings visible on interactive elements (`focus-visible:ring-*`)
- [ ] Map has `aria-label` on `MapContainer`
- [ ] Color contrast acceptable on inverse (dark) sections for body and links

---

## Components and patterns

- [ ] Prefer existing shadcn/ui primitives over bespoke duplicates
- [ ] Client boundary (`"use client"`) only where hooks, observers, or Leaflet require it
- [ ] Shared layout logic stays in `components/layout/`, not duplicated in pages
- [ ] `cn()` used for conditional classes in complex UI

---

## Dependencies and config

- [ ] `package.json` changes intentional; lockfile updated
- [ ] `next.config.js` changes justified (e.g. `allowedDevOrigins` for LAN testing)
- [ ] No unnecessary upgrades bundled with feature work

---

## Deploy / ops

- [ ] Vercel build succeeds (or preview URL attached to PR)
- [ ] Large binary assets noted in PR description
- [ ] GitHub ↔ Vercel link status mentioned if deploy automation expected

---

## Documentation

- [ ] README or `docs/ARCHITECTURE.md` updated for structural changes
- [ ] PR uses `.github/templates/pull_request_template.md` when opening the PR
- [ ] Public APIs (data module, hooks, lib helpers) have JSDoc when behavior is non-obvious
- [ ] Sprint ticket / plan updated when work is ticket-driven (`.github/Sprint 1/`)

---

## Reviewer sign-off template

```markdown
## Review summary
- **Scope:** <!-- e.g. WO-005 typography -->
- **Verified locally:** build / lint / viewports <!-- check boxes -->
- **Risks:** <!-- e.g. asset size, motion regression -->
- **Approve / Request changes:**
```
