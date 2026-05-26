#!/usr/bin/env node
/**
 * Migrates shadcn semantic Tailwind classes to explicit Figma CSS custom properties.
 * Does NOT modify tokens.css — only component class strings.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const uiDir = join(dirname(fileURLToPath(import.meta.url)), "../src/components/ui")

const replacements = [
  // Longest / most specific first
  ["text-primary-foreground", "text-[var(--color-on-primary)]"],
  ["text-secondary-foreground", "text-[var(--color-on-secondary)]"],
  ["text-destructive-foreground", "text-[var(--color-on-danger)]"],
  ["text-accent-foreground", "text-[var(--color-on-accent)]"],
  ["text-muted-foreground", "text-[var(--color-content-muted)]"],
  ["text-popover-foreground", "text-[var(--color-content)]"],
  ["text-card-foreground", "text-[var(--color-content)]"],
  ["text-sidebar-foreground", "text-[var(--color-on-sidebar)]"],
  ["text-sidebar-accent-foreground", "text-[var(--color-on-accent)]"],
  ["text-sidebar-primary-foreground", "text-[var(--color-on-primary)]"],
  ["placeholder:text-muted-foreground", "placeholder:text-[var(--color-content-muted)]"],
  ["selection:text-primary-foreground", "selection:text-[var(--color-on-primary)]"],
  ["selection:bg-primary", "selection:bg-[var(--color-primary)]"],
  ["hover:text-foreground", "hover:text-[var(--color-content)]"],
  ["hover:text-accent-foreground", "hover:text-[var(--color-on-accent)]"],
  ["hover:text-sidebar-accent-foreground", "hover:text-[var(--color-on-accent)]"],
  ["hover:bg-sidebar-accent", "hover:bg-[var(--color-accent-subtle)]"],
  ["hover:bg-accent", "hover:bg-[var(--color-accent-subtle)]"],
  ["hover:bg-muted/50", "hover:bg-[color-mix(in_srgb,var(--color-background-variant)_50%,transparent)]"],
  ["dark:hover:bg-input/50", "dark:hover:bg-[color-mix(in_srgb,var(--color-field)_50%,transparent)]"],
  ["dark:bg-input/30", "dark:bg-[color-mix(in_srgb,var(--color-field)_30%,transparent)]"],
  ["dark:aria-invalid:ring-destructive/40", "dark:aria-invalid:ring-[color-mix(in_srgb,var(--color-danger)_40%,transparent)]"],
  ["aria-invalid:ring-destructive/20", "aria-invalid:ring-[color-mix(in_srgb,var(--color-danger)_20%,transparent)]"],
  ["focus-visible:ring-ring/50", "focus-visible:ring-[color-mix(in_srgb,var(--color-focus-ring)_50%,transparent)]"],
  ["bg-primary/5", "bg-[color-mix(in_srgb,var(--color-primary)_5%,transparent)]"],
  ["bg-muted/50", "bg-[color-mix(in_srgb,var(--color-background-variant)_50%,transparent)]"],
  ["border-primary/50", "border-[color-mix(in_srgb,var(--color-primary)_50%,transparent)]"],
  ["bg-sidebar-primary", "bg-[var(--color-primary)]"],
  ["bg-sidebar-accent", "bg-[var(--color-accent-subtle)]"],
  ["bg-popover", "bg-[var(--color-background-container-highest)]"],
  ["bg-card", "bg-[var(--color-background)]"],
  ["bg-background", "bg-[var(--color-background-bright)]"],
  ["bg-sidebar", "bg-[var(--color-sidebar)]"],
  ["bg-primary", "bg-[var(--color-primary)]"],
  ["bg-secondary", "bg-[var(--color-secondary)]"],
  ["bg-destructive", "bg-[var(--color-danger)]"],
  ["bg-accent", "bg-[var(--color-accent-subtle)]"],
  ["bg-muted", "bg-[var(--color-background-variant)]"],
  ["bg-input", "bg-[var(--color-field)]"],
  ["text-primary", "text-[var(--color-primary)]"],
  ["text-foreground", "text-[var(--color-content)]"],
  ["text-destructive", "text-[var(--color-danger)]"],
  ["border-input", "border-[var(--color-field)]"],
  ["border-border", "border-[var(--color-border)]"],
  ["border-primary", "border-[var(--color-primary)]"],
  ["border-destructive", "border-[var(--color-danger)]"],
  ["border-sidebar-border", "border-[var(--color-border)]"],
  ["bg-border", "bg-[var(--color-border)]"],
  ["ring-sidebar-ring", "ring-[var(--color-focus-ring)]"],
  ["ring-ring", "ring-[var(--color-focus-ring)]"],
  ["ring-offset-background", "ring-offset-[var(--color-background)]"],
  ["data-[state=active]:bg-background", "data-[state=active]:bg-[var(--color-background-bright)]"],
  ["data-[state=active]:text-foreground", "data-[state=active]:text-[var(--color-content)]"],
  ["data-[state=open]:bg-accent", "data-[state=open]:bg-[var(--color-accent-subtle)]"],
  ["data-[state=open]:text-accent-foreground", "data-[state=open]:text-[var(--color-on-accent)]"],
  ["data-[state=checked]:bg-primary", "data-[state=checked]:bg-[var(--color-primary)]"],
  ["data-[state=checked]:border-primary", "data-[state=checked]:border-[var(--color-primary)]"],
  ["rounded-lg", "rounded-[var(--radius-lg)]"],
  ["rounded-md", "rounded-[var(--radius-md)]"],
  ["rounded-sm", "rounded-[var(--radius-sm)]"],
  ["rounded-xl", "rounded-[var(--radius-xl)]"],
  ["text-sm font-medium leading-none", "text-label-md leading-none"],
  ["text-sm font-semibold", "text-label-md"],
  ["text-xs font-medium", "text-label-sm"],
  ["text-sm font-medium", "text-label-md"],
  ["file:text-sm file:font-medium", "file:text-label-md"],
  [" md:text-sm", " md:text-body-md"],
  ["text-base ", "text-body-md "],
  ["px-3 py-2", "px-[var(--space-md)] py-[var(--space-sm)]"],
  ["px-3", "px-[var(--space-md)]"],
  ["py-2", "py-[var(--space-sm)]"],
  ["px-2 py-1.5", "px-[var(--space-sm)] py-[var(--space-xs)]"],
  ["px-2.5", "px-[var(--space-sm)]"],
  ["px-2", "px-[var(--space-sm)]"],
  ["py-1.5", "py-[var(--space-xs)]"],
  ["p-2 ", "p-[var(--space-sm)] "],
  ["py-4", "py-[var(--space-lg)]"],
  ["pb-4", "pb-[var(--space-lg)]"],
  ["px-4", "px-[var(--space-lg)]"],
  ["gap-1", "gap-[var(--space-xs)]"],
  ["gap-2", "gap-[var(--space-sm)]"],
  ["text-sm", "text-label-md"],
  ["text-xs", "text-label-sm"],
]

const files = readdirSync(uiDir).filter(
  (f) => f.endsWith(".tsx") && !f.endsWith(".figma.tsx")
)

let changed = 0
for (const file of files) {
  const path = join(uiDir, file)
  let content = readFileSync(path, "utf8")
  const original = content
  for (const [from, to] of replacements) {
    content = content.split(from).join(to)
  }
  if (content !== original) {
    writeFileSync(path, content)
    changed++
    console.log(`updated: ${file}`)
  }
}

console.log(`\n${changed}/${files.length} component files updated.`)
