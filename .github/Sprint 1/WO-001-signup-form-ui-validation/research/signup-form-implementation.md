# Signup form implementation research (WO-001)

## Summary

Implement the signup form using the repo’s existing `react-hook-form` primitives (`src/components/ui/form.tsx`) so accessibility attributes (notably `aria-describedby` and `aria-invalid`) and inline error messaging (`role="alert"`) are handled consistently. Use `tokens.css` CSS custom properties directly (via Tailwind arbitrary values) for padding, gaps, border color, and radius to match the Figma spec.

## Key findings

### 1) Preferred form architecture in this repo

- The repo already includes a shadcn-style `react-hook-form` wrapper in `src/components/ui/form.tsx` that:
  - Links each control’s `id` to its label (`FormLabel` uses `htmlFor={formItemId}`).
  - Sets `aria-describedby` to description + message IDs.
  - Sets `aria-invalid` automatically based on `react-hook-form` field state.
  - Renders inline error copy via `FormMessage` (with `id=` and `className=`).

This is the easiest way to meet the ticket’s a11y requirements without hand-rolling `aria-*` glue.

### 2) Accessible validation and error announcement

- WCAG patterns recommend:
  - Inline errors associated to each input via `aria-describedby` and `aria-invalid`.
  - Error messaging that is announced by assistive tech (commonly `role="alert"` for submission/blur validation).  
- A top-of-form error summary can be added later if desired, but the existing per-field approach is sufficient for this ticket as long as it’s wired to each control.

### 3) Checkbox labeling considerations (Radix / shadcn)

Radix Checkbox “accessible name” warnings can appear in some tooling even when a visual `<label htmlFor>` is present (tooling variance). The safe pattern is:

- Give the checkbox an explicit `id`
- Use a `<Label htmlFor="...">` adjacent to it
- Optionally add `aria-labelledby` to the checkbox root pointing at the label text node (or `aria-label` as a fallback if you hit validator false-positives)

### 4) Tokens and layout parity with Figma

- `src/styles/tokens.css` defines the exact variables referenced in the ticket:
  - spacing aliases like `--space-xl` and `--space-3xl`
  - border/radius like `--color-border` and `--radius-md`
  - typography vars including `--headline-lg-*` and `--label-lg-*`
- Since Tailwind can’t “know” these values, use CSS variable values directly, e.g.:
  - `p-[var(--space-3xl)]`
  - `gap-[var(--space-xl)]`
  - `rounded-[var(--radius-md)]`
  - `border-[var(--color-border)]`

### 5) Routing to Sign in

This repo currently only has `src/app/page.tsx`. There is no sign-in route implemented yet.

- Implement the footer link using Next.js `Link` and point it at the intended route (e.g. `/sign-in`), but treat the exact route as a follow-up if it doesn’t exist yet.

## Recommendations

- Use `react-hook-form` with:
  - `mode: "onBlur"` for email validation on blur (matches requirements).
  - A schema validator (Zod) if/when already installed; otherwise implement lightweight validators inline for WO-001 and add Zod later (avoid introducing new deps unless needed).
- Use the existing `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage` components to ensure consistent accessible markup.
- For the submit CTA:
  - Disable until all fields valid and ToS checked (prefer true `disabled` so keyboard users get correct semantics).
- Implement checkbox label using `id` + `htmlFor`; add `aria-labelledby` if any accessibility tool complains.

## Open questions

- What is the canonical sign-in route for this app (`/sign-in`, `/auth/signin`, etc.)?
- Do you want Zod + resolver added now (dependency change), or keep validation local to this screen for the prototype?

## Sources

- W3C WAI WCAG working example: “Using ARIA live regions or role=alert to identify errors” (`https://www.w3.org/WAI/WCAG21/working-examples/aria-alert-identify-errors/`)
- WAI-ARIA APG Alert pattern (`https://www.w3.org/WAI/ARIA/apg/patterns/alert/examples/alert/`)
- Radix UI Checkbox a11y discussion (tooling warnings) (`https://github.com/radix-ui/primitives/discussions/2905`)
