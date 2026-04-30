---
id: WO-001
title: "Implement signup (create account) form UI + validation"
backend: jira
jira_issue: JAK-3
jira_issue_id: "93526"
promoted_from: CTX-001
---

## Goal

Ship the "Create account" signup form — a single-page registration surface. The form collects Email, Password, Re-enter Password, and a Terms of Service checkbox, then submits via a primary CTA. Engineering should implement field-level validation (email format, minimum 8-character password, password match), a submit guard that prevents the CTA from firing until all fields are valid and the ToS checkbox is checked, and a footer link routing to the sign-in flow. Accessibility pairing (`htmlFor`/`id`) and full keyboard operability are required.

## Source

- Jira: `JAK-3`

## Design reference

- Figma: `https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc?node-id=6-2`
- File key: `OrDMGL6zOS3U9qYwXvPAvc`
- Node ID: `6:2`

## Requirements

### Functional

1. **Form model** — implement with `react-hook-form` + Zod (deps already present: `react-hook-form`, `zod`, `@hookform/resolvers`). Validate with:
   - email: required + valid email format
   - password: required + min length 8
   - confirmPassword: required + must equal password
   - acceptTerms: must be `true`
2. **Email field** — label: `Email`, placeholder: `you@example.com`, helper text: `We will never share your email.` Required; validate on blur (form `mode: "onBlur"` is acceptable).
3. **Password field** — label: `Password`, placeholder: `••••••••`, helper text: `Use at least 8 characters.` Required; input type `password`.
4. **Re-enter Password field** — label: `Re-enter Password`, placeholder: `••••••••`, helper text: `Must match your password.` Required; input type `password`.
5. **Terms checkbox** — label: `I agree to the Terms of Service and Privacy Policy.` Unchecked by default; must be checked before submit is allowed.
6. **Create account button** — label: `Create account`, size `lg`, full-width. Must be **disabled** until all fields are valid and terms are accepted. While submitting, prevent double-submit (disable + show loading state if available).
7. **Footer sign-in link** — copy: `Already have an account? Sign in` — navigates to the sign-in route on click (use Next.js `Link`). If the sign-in route doesn’t exist yet in this repo, leave TODO in code and document the assumed route in the ticket.

### Visual | layout

- Card container: background `var(--color-background-bright, white)`, border `1px solid var(--color-border, #d6d3d9)`, border-radius `var(--radius-md, 12px)`, padding `var(--space-3xl, 48px)`.
- Vertical gap between all direct children (fields, terms row, button, footer): `var(--space-xl, 24px)`.
- Terms row: `display: flex; align-items: center; gap: 12px` between checkbox and label.
- Headline typography: `Headline/LG` — `var(--headline-lg-font-family)`, size `var(--headline-lg-font-size, 27px)`, weight `var(--headline-lg-font-weight, 400)`, line-height `var(--headline-lg-line-height, 34px)`, color `#1f242e`.
- Footer link typography: `Label/LG` — `var(--label-lg-font-family)`, size `var(--label-lg-font-size, 12px)`, weight `var(--label-lg-font-weight, 500)`, line-height `var(--label-lg-line-height, 17px)`, color `#666b78`.

### Technical

- Use Code Connect components mapped in the codebase:
  - `Input` → `src/components/ui/input.tsx` (`variant="default"`, `size="default"`)
  - `Checkbox` → `src/components/ui/checkbox.tsx` (initial state `variant="off"` / `checked={false}`)
  - `Label` → `src/components/ui/label.tsx` (`variant="default"`, `size="default"`)
  - `Button` → `src/components/ui/button.tsx` (`variant="default"`, `size="lg"`, `leadingIcon={false}`, `trailingIcon={false}`)
- Prefer using the repo’s `react-hook-form` wrappers in `src/components/ui/form.tsx` so each control gets correct `id`, `aria-describedby`, and `aria-invalid` wiring.
- **A11y**:
  - Pair each input/checkbox with `id` + label `htmlFor`.
  - Inline validation errors must be programmatically associated to fields via `aria-describedby` (or equivalent provided by `FormControl`) and announced (use `role="alert"` for submission/blur-triggered errors).
  - Checkbox accessible-name tooling can be noisy; if any validator flags it, add `aria-labelledby` or an `aria-label` fallback on the checkbox root while keeping the visible label.
- CTA must be truly `disabled` until all validation passes (not just a no-op).

## Acceptance criteria

- [ ] All three `Input` fields render with correct labels, placeholders, and helper text matching design copy exactly.
- [ ] Email field rejects invalid format; Password field rejects < 8 characters; Re-enter Password rejects non-matching value — all shown inline.
- [ ] Terms checkbox is unchecked by default; CTA remains disabled until checkbox is checked and all fields are valid.
- [ ] Visual parity confirmed at the design frame's viewport: card padding, section gaps, typography tokens, and button style match the Figma frame.
- [ ] `htmlFor`/`id` pairings on all form controls; keyboard tab order follows visual order; no focus traps.
- [ ] Code Connect components (`Input`, `Checkbox`, `Label`, `Button`) used — no ad-hoc HTML primitives for these elements.

## Out of scope

- Backend API integration / account creation endpoint.
- Success state or post-registration redirect flow.
- OAuth / SSO sign-up options.
- i18n / localization.
- Responsive breakpoints beyond the Figma frame viewport.
- Sign-in page implementation (routing hook only).

## Notes

- All four UI primitives are Code Connect–mapped; import from `src/components/ui/{input,checkbox,label,button}.tsx`.
- Design tokens are CSS custom properties — ensure the token stylesheet is in scope before styling the card wrapper.
- `Checkbox` Code Connect uses `variant="off"` as the design-time state; check the component API for the controlled `checked`/`onChange` props used at runtime.
- Pixel QA: compare against the Figma deep link above at the frame's native viewport; use node-id `6:2` for direct inspection.

## References

- [Signup form implementation research](research/signup-form-implementation.md)
