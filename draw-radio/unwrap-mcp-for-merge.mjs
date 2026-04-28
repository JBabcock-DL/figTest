#!/usr/bin/env node
/**
 * figma-mcp-invoke (Streamable HTTP) prints MCP callTool { content: [...] }.
 * merge-create-component-handoff.mjs expects the Figma return object (or { raw }).
 * Pipe invoker stdout: node unwrap-mcp-for-merge.mjs < mcp-stdout.txt > return-<slug>.json
 */
import { readFileSync } from "node:fs";

const raw = readFileSync(0, "utf8");
let obj;
try {
  obj = JSON.parse(raw);
} catch (e) {
  console.error("unwrap: stdin is not valid JSON", e.message);
  process.exit(1);
}

let payload = obj;
if (Array.isArray(obj?.content) && obj.content[0]?.type === "text" && typeof obj.content[0].text === "string") {
  try {
    payload = JSON.parse(obj.content[0].text);
  } catch (e) {
    console.error("unwrap: could not parse content[0].text as JSON", e.message);
    process.exit(1);
  }
} else if (obj?.raw && typeof obj.raw === "object") {
  payload = obj.raw;
}

process.stdout.write(JSON.stringify(payload, null, 2) + "\n");
