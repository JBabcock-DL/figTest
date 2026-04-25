#!/usr/bin/env node
/**
 * Emit one create-component Figma slice (.js + MCP args JSON) for checkbox.
 * Usage: node scripts/emit-checkbox-figma-slice.mjs <cc-doc-scaffold|cc-variants|...>
 * Set DESIGNOPS_ROOT to a DesignOps-plugin checkout. Merge handoff after each Figma return.
 */
import { mkdirSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const FIGTEST = resolve(__dirname, "..");
const DESIGNOPS_ROOT = process.env.DESIGNOPS_ROOT || "C:/Users/jbabc/Documents/GitHub/DesignOps-plugin";
const ASSEMBLE = join(DESIGNOPS_ROOT, "scripts", "assemble-slice.mjs");
const CONFIG = join(FIGTEST, "checkbox.config.js");
const REGISTRY = join(FIGTEST, ".designops-registry.json");
const HANDOFF = join(FIGTEST, "handoff.json");
const OUT = join(FIGTEST, ".figma-run");
const FILE_KEY = "uCpQaRsW4oiXW3DsC6cLZm";

const step = process.argv[2];
if (!step) {
  console.error("Usage: node scripts/emit-checkbox-figma-slice.mjs <step-slug>");
  process.exit(1);
}
if (!existsSync(ASSEMBLE)) {
  console.error("Set DESIGNOPS_ROOT to DesignOps-plugin (scripts/assemble-slice.mjs).");
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });
const outJs = join(OUT, `slice-${step}.js`);
const outMcp = join(OUT, `mcp-${step}.json`);
const r = spawnSync(
  process.execPath,
  [
    ASSEMBLE,
    "--step",
    step,
    "--layout",
    "control",
    "--config-block",
    CONFIG,
    "--registry",
    REGISTRY,
    "--handoff",
    HANDOFF,
    "--file-key",
    FILE_KEY,
    "--out",
    outJs,
    "--description",
    `create-component ${step} checkbox`,
    "--emit-mcp-args",
    outMcp,
  ],
  { encoding: "utf8", stdio: "inherit" },
);
process.exit(r.status ?? 0);
