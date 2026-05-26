#!/usr/bin/env node
/**
 * Validates UI components use Figma token patterns — especially color/state/* interaction tokens.
 */
import { readFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const tokensPath = join(root, "src/styles/tokens.css")
const uiDir = join(root, "src/components/ui")

const STATE_VARS = [
  "--color-state-primary-hover",
  "--color-state-primary-pressed",
  "--color-state-primary-focus",
  "--color-state-secondary-hover",
  "--color-state-secondary-pressed",
  "--color-state-secondary-focus",
  "--color-state-tertiary-hover",
  "--color-state-tertiary-pressed",
  "--color-state-tertiary-focus",
  "--color-state-error-hover",
  "--color-state-error-pressed",
  "--color-state-error-focus",
]

const INTERACTIVE_STATE_FILES = new Set([
  "badge.tsx",
  "button.tsx",
  "toggle.tsx",
  "sidebar.tsx",
  "navigation-menu.tsx",
  "menubar.tsx",
  "dropdown-menu.tsx",
  "context-menu.tsx",
  "accordion.tsx",
  "tabs.tsx",
])

const errors = []
const tokensCss = readFileSync(tokensPath, "utf8")

const lightMatch = tokensCss.match(
  /:root,\s*\[data-theme="light"\]\s*\{([\s\S]*?)\n\}/
)
const darkMatch = tokensCss.match(/\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)

for (const v of STATE_VARS) {
  if (!tokensCss.includes(v)) {
    errors.push(`tokens.css: missing ${v}`)
  }
  if (lightMatch && !lightMatch[1].includes(v)) {
    errors.push(`tokens.css light theme: missing ${v}`)
  }
  if (darkMatch && !darkMatch[1].includes(v)) {
    errors.push(`tokens.css dark theme: missing ${v}`)
  }
}

const componentFiles = readdirSync(uiDir).filter(
  (f) => f.endsWith(".tsx") && !f.endsWith(".figma.tsx")
)

for (const file of componentFiles) {
  const content = readFileSync(join(uiDir, file), "utf8")

  if (/\bhover:opacity-\d+/.test(content)) {
    errors.push(`${file}: uses hover:opacity-* (use state tokens instead)`)
  }

  if (/\bactive:opacity-\d+/.test(content)) {
    errors.push(`${file}: uses active:opacity-* (use state tokens instead)`)
  }

  if (/hover:bg-\[var\(--color-accent-subtle\)\]/.test(content)) {
    errors.push(
      `${file}: hover:bg accent-subtle (use state-surface-tertiary or --color-state-tertiary-*)`
    )
  }

  if (INTERACTIVE_STATE_FILES.has(file)) {
    const hasStateUtility =
      /state-filled-(primary|secondary|error)|state-surface-tertiary/.test(
        content
      )
    const hasExplicitStateVar = /--color-state-/.test(content)
    if (!hasStateUtility && !hasExplicitStateVar) {
      errors.push(
        `${file}: interactive component missing state-filled-* / state-surface-tertiary / --color-state-*`
      )
    }
  }
}

if (errors.length > 0) {
  console.error("Component token validation failed:\n")
  for (const err of errors) {
    console.error(`  • ${err}`)
  }
  process.exit(1)
}

console.log(
  `Component token validation passed (${componentFiles.length} files, ${STATE_VARS.length} state vars).`
)
