# Contributing

Thank you for reviewing or extending **figTest**. This repo is an application codebase within the Detroit Labs claude-ops workflow (Jira project **JAK**).

## Before you start

1. Read [README.md](README.md) for setup and scripts.
2. Skim [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for routing, tokens, and motion.
3. Use [docs/CODE_REVIEW.md](docs/CODE_REVIEW.md) when reviewing or opening a PR.

Active sprint work is tracked under [`.github/Sprint 1/`](.github/Sprint%201/) (`ticket.md`, `plan.md`, research). Project IDs and triage mode are in [memory.md](memory.md).

## Development workflow

```bash
npm install
npm run dev
```

Before opening a PR:

```bash
npm run lint
npm run build
npm run tokens:validate-components   # when UI components change
```

## Branching and commits

- Target branch: **`main`** unless the sprint ticket says otherwise.
- Keep commits focused; reference ticket IDs in messages when applicable (e.g. `WO-005: mobile display type scale`).
- Do not commit `.vercel/`, `.env.local`, or `.next/`.

## Code conventions

| Area | Convention |
|------|------------|
| Paths | `@/` alias → `src/` |
| Styling | Tailwind + CSS variables from `src/styles/tokens.css` |
| UI | shadcn/ui in `src/components/ui/` |
| Page sections | `src/components/layout/` |
| Content | `src/data/properties.ts` until a CMS exists |
| Client components | `"use client"` only when needed (hooks, IO, Leaflet) |

Avoid hand-editing generated token blocks in `tokens.css` without a design-system sync plan.

## Pull requests

Use [.github/templates/pull_request_template.md](.github/templates/pull_request_template.md) as the PR body template (also linked from `.github/pull_request_template.md` for GitHub’s auto-fill).

Include in the PR description:

- Ticket link or WO-ID
- Viewports tested (375 / 768 / 1024 / 1440 for layout work)
- Screenshots or recording for visual changes
- Deploy preview URL when available

Reviewers should follow [docs/CODE_REVIEW.md](docs/CODE_REVIEW.md).

## Questions

For process and Jira workflow, see [.github/templates/workflow.md](.github/templates/workflow.md).
