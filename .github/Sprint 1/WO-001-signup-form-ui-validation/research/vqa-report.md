# VQA report — WO-001 (Signup form)

## Summary

VQA **PASSED** after fixes.

Design reference used for QA:

- **File key**: `OrDMGL6zOS3U9qYwXvPAvc`
- **Node ID**: `6:2`
- Link: `https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc?node-id=6-2`

Key outcomes:

- Inline validation errors render and are announced (via `role="alert"`).
- Terms checkbox toggles and CTA enables only when valid + checked.
- Screen is forced to **light theme** for parity with the Figma frame (`data-theme="light"`).

## Criteria Results

| # | Acceptance criterion | Result | Note |
|---:|---|---|---|
| 1 | All three `Input` fields render with correct labels, placeholders, and helper text matching design copy exactly. | PASS | Copy matches: Email/Password/Re-enter Password + helper lines. |
| 2 | Email rejects invalid format; Password rejects < 8 chars; Re-enter Password rejects non-matching value — all shown inline. | PASS | Verified errors: “Enter a valid email”, “Use at least 8 characters”, “Must match your password”. |
| 3 | Terms checkbox unchecked by default; CTA disabled until checkbox checked and all fields valid. | PASS | Checkbox toggles to checked; CTA enables only when all fields valid + checked. |
| 4 | Visual parity: card padding, section gaps, typography tokens, and button style match the Figma frame. | PASS | Verified light card, 48px padding, 24px gaps, radius 28px, shadow (0,4,16, 10%). |
| 5 | `htmlFor`/`id` pairings; keyboard tab order follows visual order; no focus traps. | PASS | Tab order follows Email → Password → Confirm → Checkbox → CTA → Sign-in link. |
| 6 | Code Connect components used (`Input`, `Checkbox`, `Label`, `Button`) — no ad-hoc HTML primitives. | PASS | Uses `src/components/ui/{input,checkbox,label,button}.tsx`. |

## Failures detail

None after fixes.

## Recommendation

Mark ticket **Completed**.

## Styling QA checklist (explicit)

Compared to Figma `OrDMGL6zOS3U9qYwXvPAvc` / `6:2`:

- [x] **Theme**: light (card is white; background is light) — enforced by `data-theme="light"`.
- [x] **Card background**: `var(--color-background-bright)` (white in light mode).
- [x] **Border**: `1px solid var(--color-border)` (neutral-200).
- [x] **Radius**: `var(--radius-xl)` (28px).
- [x] **Shadow**: `0 4px 16px rgba(0,0,0,0.1)`.
- [x] **Padding**: `var(--space-3xl)` (48px).
- [x] **Vertical gaps**: `var(--space-xl)` (24px).
- [x] **Terms row gap**: 12px.
- [x] **Headline**: 27px / 34px, bold, `#1f242e`.
- [x] **Footer typography**: Label/LG vars with `var(--color-secondary,#625b71)` color.
