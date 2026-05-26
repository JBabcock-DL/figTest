#!/usr/bin/env node
/**
 * Generates .designops/<component>.ctx.js for create-component canvas draws.
 * Token paths match Figma Theme/Layout/Typography collections (source of truth).
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const propsDir =
  "c:/Users/jbabc/.claude/plugins/marketplaces/local-desktop-app-uploads/labs-design-ops/skills/create-component/shadcn-props"
const outDir = join(root, ".designops")
const fileKey = "uCpQaRsW4oiXW3DsC6cLZm"

const drawn = new Set([
  "badge", "button", "card", "checkbox", "input", "label",
  "radio-group", "separator", "slider", "switch",
])

const STYLE = {
  default: {
    fill: "color/primary/default",
    fallback: "#6750a4",
    labelVar: "color/primary/content",
    strokeVar: null,
  },
  secondary: {
    fill: "color/secondary/default",
    fallback: "#625b71",
    labelVar: "color/secondary/content",
    strokeVar: null,
  },
  destructive: {
    fill: "color/error/default",
    fallback: "#871d17",
    labelVar: "color/error/content",
    strokeVar: null,
  },
  outline: {
    fill: null,
    fallback: "#ffffff",
    labelVar: "color/background/content",
    strokeVar: "color/border/default",
  },
  ghost: {
    fill: null,
    fallback: "#ffffff",
    labelVar: "color/background/content",
    strokeVar: null,
  },
}

function titleCase(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

function chipCtx(name, props) {
  const variants = ["default", "secondary", "destructive", "outline"]
  const style = Object.fromEntries(
    variants.map((v) => [v, STYLE[v]])
  )
  return {
    component: name,
    title: titleCase(name),
    pageName: props.pageName,
    layout: "chip",
    docsUrl: props.docsUrl,
    summary: props.summary,
    variants,
    sizes: [],
    padH: { default: "space/sm" },
    radius: "radius/full",
    labelStyle: { default: "Label/SM" },
    style,
    label: "(size, variant) => title",
    iconSlots: props.iconSlots ?? { leading: true, trailing: true, size: 24 },
    componentProps: props.componentProps ?? { label: true, leadingIcon: true, trailingIcon: true },
    states: [{ key: "default", group: "default" }],
    applyStateOverride: 'function applyStateOverride(instance, stateKey, ctx) { instance.opacity = stateKey === "disabled" ? 0.38 : 1; }',
    properties: props.properties ?? [],
    usageDo: [`Use ${name} for its intended semantic purpose.`],
    usageDont: [`Don't misuse ${name} outside its design-system role.`],
    composes: [],
  }
}

function fieldCtx(name, props) {
  return {
    component: name,
    title: titleCase(name),
    pageName: props.pageName,
    layout: "field",
    docsUrl: props.docsUrl,
    summary: props.summary,
    variants: ["default"],
    sizes: [],
    padH: { default: "space/md" },
    radius: "radius/md",
    labelStyle: { default: "Label/SM" },
    field: props.field ?? {
      fieldType: name === "textarea" ? "textarea" : "input",
      showLabel: true,
      labelText: "Label",
      labelStyleName: "Label/SM",
      placeholderText: "Placeholder",
      showHelper: false,
      leadingIcon: false,
      trailingIcon: false,
      width: 320,
    },
    style: {
      default: {
        fill: "color/background/bright",
        fallback: "#ffffff",
        labelVar: "color/background/content",
        strokeVar: "color/component/input",
      },
    },
    label: "() => null",
    iconSlots: props.iconSlots ?? { leading: true, trailing: true, size: 24 },
    componentProps: props.componentProps ?? { label: true, placeholder: true, helper: false, leadingIcon: true, trailingIcon: true },
    states: [
      { key: "default", group: "default" },
      { key: "focus", group: "default" },
      { key: "disabled", group: "disabled" },
    ],
    applyStateOverride: 'function applyStateOverride(instance, stateKey, ctx) { instance.opacity = stateKey === "disabled" ? 0.38 : 1; }',
    properties: props.properties ?? [],
    usageDo: [`Use ${name} inside labeled form fields.`],
    usageDont: [`Don't use ${name} without an associated label.`],
    composes: [],
  }
}

function controlCtx(name, props, shape) {
  return {
    component: name,
    title: titleCase(name),
    pageName: props.pageName,
    layout: "control",
    docsUrl: props.docsUrl,
    summary: props.summary,
    variants: ["off", "on"],
    sizes: [],
    padH: { default: "space/xs" },
    radius: shape === "radio" ? "radius/full" : "radius/sm",
    labelStyle: { default: "Label/SM" },
    control: {
      shape,
      width: shape === "switch" ? 36 : 16,
      height: shape === "switch" ? 20 : 16,
      trackOnVar: "color/primary/default",
      trackOffVar: "color/background/variant",
      thumbVar: "color/background/default",
    },
    style: {
      off: { fill: "color/background/variant", fallback: "#edecee", labelVar: null, strokeVar: "color/border/default" },
      on: { fill: "color/primary/default", fallback: "#6750a4", labelVar: null, strokeVar: "color/primary/default" },
    },
    label: "() => null",
    iconSlots: { leading: false, trailing: false, size: 24 },
    componentProps: { label: false, leadingIcon: false, trailingIcon: false },
    states: [
      { key: "default", group: "default" },
      { key: "disabled", group: "disabled" },
    ],
    applyStateOverride: 'function applyStateOverride(instance, stateKey, ctx) { instance.opacity = stateKey === "disabled" ? 0.38 : 1; }',
    properties: props.properties ?? [],
    usageDo: [`Use ${name} for binary selection.`],
    usageDont: [`Don't use ${name} without a visible label.`],
    composes: [],
  }
}

function tinyCtx(name, props) {
  return {
    component: name,
    title: titleCase(name),
    pageName: props.pageName,
    layout: "tiny",
    docsUrl: props.docsUrl,
    summary: props.summary,
    variants: ["default"],
    sizes: [],
    padH: { default: "space/xs" },
    radius: "radius/full",
    labelStyle: { default: "Label/SM" },
    tiny: props.tiny ?? { shape: name, size: 40, initials: "AB" },
    style: {
      default: {
        fill: "color/background/variant",
        fallback: "#edecee",
        labelVar: "color/background/content",
        strokeVar: null,
      },
    },
    label: "() => null",
    iconSlots: props.iconSlots ?? { leading: false, trailing: false, size: 24 },
    componentProps: props.componentProps ?? { label: false, leadingIcon: false, trailingIcon: false },
    states: [{ key: "default", group: "default" }],
    applyStateOverride: 'function applyStateOverride(instance, stateKey, ctx) { instance.opacity = 1; }',
    properties: props.properties ?? [],
    usageDo: [`Use ${name} at the documented size.`],
    usageDont: [`Don't stretch ${name} outside its token bounds.`],
    composes: [],
  }
}

function surfaceCtx(name, props) {
  return {
    component: name,
    title: titleCase(name),
    pageName: props.pageName,
    layout: "surface-stack",
    docsUrl: props.docsUrl,
    summary: props.summary,
    variants: ["default"],
    sizes: [],
    padH: { default: "space/2xl" },
    radius: "radius/lg",
    labelStyle: { default: "Label/LG" },
    surface: props.surface ?? {
      contentSlot: { enabled: true },
      footerSlot: { enabled: true },
    },
    style: {
      default: {
        fill: "color/background/default",
        fallback: "#faf9fa",
        labelVar: "color/background/content",
        strokeVar: "color/border/default",
      },
    },
    label: "() => null",
    iconSlots: props.iconSlots ?? { leading: false, trailing: false, size: 24 },
    componentProps: props.componentProps ?? { label: false, leadingIcon: false, trailingIcon: false },
    states: [{ key: "default", group: "default" }],
    applyStateOverride: 'function applyStateOverride(instance, stateKey, ctx) { instance.opacity = 1; }',
    properties: props.properties ?? [],
    usageDo: [`Use ${name} to group related content.`],
    usageDont: [`Don't nest ${name} too deeply.`],
    composes: [],
  }
}

function containerCtx(name, props) {
  return {
    component: name,
    title: titleCase(name),
    pageName: props.pageName,
    layout: "container",
    docsUrl: props.docsUrl,
    summary: props.summary,
    variants: ["default"],
    sizes: [],
    padH: { default: "space/md" },
    radius: "radius/md",
    labelStyle: { default: "Label/MD" },
    style: {
      default: {
        fill: "color/background/variant",
        fallback: "#edecee",
        labelVar: "color/background/content",
        strokeVar: null,
      },
    },
    label: "(size, variant) => title",
    iconSlots: props.iconSlots ?? { leading: false, trailing: false, size: 24 },
    componentProps: props.componentProps ?? { label: true, leadingIcon: false, trailingIcon: false },
    states: [{ key: "default", group: "default" }],
    applyStateOverride: 'function applyStateOverride(instance, stateKey, ctx) { instance.opacity = 1; }',
    properties: props.properties ?? [],
    usageDo: [`Use ${name} for grouped navigation or disclosure.`],
    usageDont: [`Don't overload ${name} with too many items.`],
    composes: [],
  }
}

function rowItemCtx(name, props) {
  return {
    component: name,
    title: titleCase(name),
    pageName: props.pageName,
    layout: "row-item",
    docsUrl: props.docsUrl,
    summary: props.summary,
    variants: ["default"],
    sizes: [],
    padH: { default: "space/md" },
    radius: "radius/md",
    labelStyle: { default: "Label/MD" },
    style: {
      default: {
        fill: null,
        fallback: "#ffffff",
        labelVar: "color/background/content",
        strokeVar: null,
      },
    },
    label: "(size, variant) => title",
    iconSlots: props.iconSlots ?? { leading: true, trailing: false, size: 24 },
    componentProps: props.componentProps ?? { label: true, leadingIcon: true, trailingIcon: false },
    states: [
      { key: "default", group: "default" },
      { key: "hover", group: "default" },
    ],
    applyStateOverride: 'function applyStateOverride(instance, stateKey, ctx) { instance.opacity = stateKey === "hover" ? 0.92 : 1; }',
    properties: props.properties ?? [],
    usageDo: [`Use ${name} in lists and menus.`],
    usageDont: [`Don't use ${name} as a primary action.`],
    composes: [],
  }
}

function buildCtx(name, props) {
  const layout = props.layout ?? "chip"
  let body
  if (layout === "field") body = fieldCtx(name, props)
  else if (layout === "control") body = controlCtx(name, props, props.control?.shape ?? "checkbox")
  else if (layout === "tiny") body = tinyCtx(name, props)
  else if (layout === "surface-stack") body = surfaceCtx(name, props)
  else if (layout === "container") body = containerCtx(name, props)
  else if (layout === "row-item") body = rowItemCtx(name, props)
  else body = chipCtx(name, props)

  if (name === "toggle") body.variants = ["default", "outline"]
  if (name === "progress") body.layout = "tiny"; body.tiny = { shape: "progress", size: 200, initials: "" }
  if (name === "separator") {
    body.layout = "tiny"
    body.tiny = { shape: "separator", size: 320, initials: "" }
    body.title = "Separator"
  }

  return {
    activeFileKey: fileKey,
    fileKey,
    registryComponents: {},
    usesComposes: false,
    composedWith: [],
    ...body,
  }
}

function serializeCtx(ctx) {
  const fnKeys = new Set(["label", "applyStateOverride"])
  const lines = ["const ctx = {"]
  for (const [key, val] of Object.entries(ctx)) {
    if (fnKeys.has(key) && typeof val === "string" && val.startsWith("function")) {
      lines.push(`  ${key}: ${val},`)
    } else if (typeof val === "string") {
      lines.push(`  ${key}: ${JSON.stringify(val)},`)
    } else if (typeof val === "function") {
      lines.push(`  ${key}: ${val.toString()},`)
    } else {
      lines.push(`  ${key}: ${JSON.stringify(val, null, 2).replace(/\n/g, "\n  ")},`)
    }
  }
  lines.push("};", "", "module.exports = { ctx };", "")
  return lines.join("\n")
}

mkdirSync(outDir, { recursive: true })
const files = readdirSync(propsDir).filter((f) => f.endsWith(".json"))
let generated = 0
const pending = []

for (const file of files.sort()) {
  const name = file.replace(/\.json$/, "")
  if (name === "toast") continue
  if (drawn.has(name)) continue
  const props = JSON.parse(readFileSync(join(propsDir, file), "utf8"))
  const ctx = buildCtx(name, props)
  const outPath = join(outDir, `${name}.ctx.js`)
  writeFileSync(outPath, serializeCtx(ctx))
  generated++
  pending.push(name)
}

console.log(`Generated ${generated} ctx files for undrawn components.`)
console.log(pending.join(", "))
