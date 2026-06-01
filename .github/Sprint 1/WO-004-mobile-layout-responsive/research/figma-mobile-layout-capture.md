# Figma capture — mobile page + mobile nav (layout only)

**File key:** `OrDMGL6zOS3U9qYwXvPAvc`  
**Rule:** Layout, structure, and interaction shells only — implement colors/spacing/type from repo `var(--*)` tokens, **not** handoff variables.

**Nav content rule (WO-004):** Use **flat 5 primary links** from code. Figma `56:4076` shows expandable groups (Office, Retail, …) — treat as **future enhancement**, not this WO.

---

## Node `56:2962` — `/properties/{propertyName} mobile`

| | |
| --- | --- |
| **Node ID** | `56:2962` |
| **Name** | `/properties/{propertyName} mobile` |
| **Deep link** | https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-2962 |
| **Artboard** | 393px wide (iPhone-class) |

### What to take from this frame

| Pattern | Figma behavior | Code target |
| --- | --- | --- |
| Page structure | Single column, full-width sections | `flex-col` below `lg` for hero, neighborhood, contact |
| Horizontal padding | ~16px (`space/400`) | `max-lg:px-[var(--space-md)]` or keep `space-4xl` only on desktop |
| Top chrome | Sticky ~130px bar, logo + menu icon | `SiteNav` compact on mobile |
| Hero image | Spans content width, not 750px fixed | `w-full aspect-square max-w-[750px]` |
| Explore More | Horizontal strip of ~322px tiles | `overflow-x-auto`, `280px` tile min |
| Section media | Map, form image bleed to content width | Remove `size-[712px]`, `min-w-[600px]` |
| Footer | Sign in / Create account present | Keep `site-footer.tsx` auth row only |

### What not to copy literally

- Status bar / 9:41 chrome (decorative in Figma).
- Handoff color variables (`color/primary/black`, etc.).
- Expandable nav inside hero instance (use flat 5 in app nav).

### Child nodes

| Child | Node | Use |
| --- | --- | --- |
| property hero | `56:2963` | Sticky nav + stacked hero |
| Explore More mobile | `56:2586` | Horizontal tiles, `w-full` inner max 1560 |
| Footer | (in page) | Account links QA |

---

## Node `56:4076` — `mobile nav` (full-screen menu shell)

| | |
| --- | --- |
| **Node ID** | `56:4076` |
| **Name** | `mobile nav` |
| **Deep link** | https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-4076 |
| **Panel size** | 393 × 725px in design |

### What to take from this frame (shell only)

| Pattern | Figma | Implementation |
| --- | --- | --- |
| Coverage | Near full viewport white panel | `fixed inset-0` or full-height `Sheet` on mobile |
| Top bar | `56:4132` — logo + **close** 32px | Persist header row; swap menu icon ↔ close when open |
| Background | White / bright | `var(--color-background-bright)` |
| Link typography | 16px body, bold top-level in design | `text-body-lg`, `font-bold` optional for active |
| Vertical rhythm | ~48px between **groups** in Figma | Flat 5 list: use `gap-[var(--space-2xl)]` or `space-3xl` between links |
| Account auth | **Absent** in menu tree | Aligns with footer-only decision |

### What not to implement in WO-004

- Expandable **Our Story** → Our Values, Our People.
- **Our Properties** two-column subnav (Office, Retail, …).
- **News** → Press Releases, Media Inquiries.
- Arrows/chevrons on every top-level row (flat links only).

### Implementation mapping (flat 5)

```
Our Story      → /our-story
Our Properties → /properties
News           → /news
Careers        → /careers
Contact Us     → /contact
```

Close menu on link click (`SheetClose` or `setOpen(false)`).

---

## Node `56:4132` — mobile top bar

| | |
| --- | --- |
| **Node ID** | `56:4132` (child of `56:4076` / hero instance) |
| **Closed state** | Logo + **menu** icon |
| **Open state** | Logo + **close** (X) |

Use `lucide-react` `Menu` / `X` at ~32px touch target.

---

## Tablet vs mobile menu

| Breakpoint | Behavior | Figma |
| --- | --- | --- |
| ≤767px | Full-screen menu content | Shell from `56:4076` |
| 768–1023px | Right drawer ~360px, same **flat 5** links | No separate Figma frame — extrapolate |
| ≥1024px | Inline header links | Desktop bar |

---

## VQA checklist hints (for `/vqa`)

- [ ] Mobile page at 393px: no horizontal page scroll.
- [ ] Menu open: full-screen (mobile), not exposing Sign in / Create account.
- [ ] Menu: exactly 5 links, no nested accordion.
- [ ] Footer still shows Sign in | Create account.
- [ ] Hero image width tracks viewport on `56:2962` comparison screenshot.
