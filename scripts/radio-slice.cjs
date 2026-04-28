#!/usr/bin/env node
/**
 * Assemble one create-component Figma slice for radio-group — canonical **12**-slug DAG per
 * `skills/create-component/conventions/13-component-draw-orchestrator.md` and
 * `scripts/merge-create-component-handoff.mjs` SLUG_ORDER.
 *
 * Prerequisites (consumer repo layout):
 * - `radio-group.config.js` CONFIG (Mode A or Mode B synthetic)
 * - `.designops-registry.json`, `handoff.json`, `phase-state.json` (next to handoff — merge writes phase-state next to handoff)
 *
 * From figtest repo root:
 *   node scripts/radio-slice.cjs --step cc-doc-scaffold-header
 *
 * Outputs (under `./draw-radio/` only — avoids assemble-slice exit 17 with `figma-slices/invoke-*.json`):
 * - `draw-radio/slice-<step>.code.js`
 * - `draw-radio/mcp-<step>.json`
 *
 * After parent `call_mcp` use_figma succeeds:
 *   echo '<return-json>' | node ..\DesignOps-plugin\scripts\finalize-slice.mjs <slug> handoff.json
 *   Or: node <DesignOps-plugin>/scripts/merge-create-component-handoff.mjs <slug> handoff.json return-<slug>.json
 */

const { execFileSync } = require("node:child_process");
const { resolve, join } = require("node:path");
const { existsSync, mkdirSync } = require("node:fs");

const FIG = resolve(__dirname, "..");
const PLUGIN =
  process.env.DESIGNOPS_PLUGIN ||
  resolve(FIG, "..", "DesignOps-plugin");
const ASSEMBLE = join(PLUGIN, "scripts", "assemble-slice.mjs");

/** Must match scripts/merge-create-component-handoff.mjs SLUG_ORDER */
const STEPS = [
  "cc-doc-scaffold-shell",
  "cc-doc-scaffold-header",
  "cc-doc-scaffold-table-chrome",
  "cc-doc-scaffold-table-body",
  "cc-doc-scaffold-placeholders",
  "cc-variants",
  "cc-doc-component",
  "cc-doc-props-1",
  "cc-doc-props-2",
  "cc-doc-matrix",
  "cc-doc-usage",
  "cc-doc-finalize",
];

const i = process.argv.indexOf("--step");
const step = i >= 0 ? process.argv[i + 1] : null;
if (!step || !STEPS.includes(step)) {
  console.error(
    "Usage: node scripts/radio-slice.cjs --step <" + STEPS.join("|") + ">",
  );
  process.exit(1);
}
if (!existsSync(ASSEMBLE)) {
  console.error("assemble-slice not found:", ASSEMBLE);
  console.error("Set DESIGNOPS_PLUGIN to your DesignOps-plugin repo root.");
  process.exit(2);
}

const drawDir = join(FIG, "draw-radio");
if (!existsSync(drawDir)) mkdirSync(drawDir, { recursive: true });

const configBlock = join(FIG, "radio-group.config.js");
const registry = join(FIG, ".designops-registry.json");
const handoff = join(FIG, "handoff.json");

const fileKey = "uCpQaRsW4oiXW3DsC6cLZm";
const outJs = join(drawDir, `slice-${step}.code.js`);
const mcp = join(drawDir, `mcp-${step}.json`);

const args = [
  ASSEMBLE,
  "--step",
  step,
  "--layout",
  "control",
  "--config-block",
  configBlock,
  "--registry",
  registry,
  "--handoff",
  handoff,
  "--file-key",
  fileKey,
  "--out",
  outJs,
  "--emit-mcp-args",
  mcp,
  "--plugin-root",
  PLUGIN,
];

execFileSync(process.execPath, args, { stdio: "inherit" });
console.log("OK:");
console.log("  code:", outJs);
console.log("  mcp-args:", mcp);
console.log("Next: parent Read mcp-* JSON → call_mcp use_figma; then finalize-slice merge.");
