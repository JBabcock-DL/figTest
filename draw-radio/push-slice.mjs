#!/usr/bin/env node
/**
 * Loads pre-assembled use_figma args from JSON and prints a one-line summary.
 * Parent agent calls Figma MCP with the same object (Read args JSON + call_mcp).
 * Usage: node push-slice.mjs <args.json>
 */
import fs from 'node:fs';

const p = process.argv[2];
if (!p) {
  console.error('Usage: node push-slice.mjs <args.json>');
  process.exit(2);
}
const raw = fs.readFileSync(p, 'utf8');
const o = JSON.parse(raw);
const need = ['fileKey', 'code', 'description', 'skillNames'];
for (const k of need) {
  if (!(k in o)) {
    console.error(`push-slice: missing key ${k}`);
    process.exit(1);
  }
}
console.log(
  JSON.stringify({
    fileKey: o.fileKey,
    codeChars: o.code.length,
    description: o.description,
    skillNames: o.skillNames,
  }),
);
