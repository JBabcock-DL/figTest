# Checkbox /create-component run log

**File key:** `uCpQaRsW4oiXW3DsC6cLZm`  
**Component:** `checkbox`  
**Layout:** `control`  
**Mode:** B — `synthetic-fallback` (expected: checkbox has no `cva()` in shadcn source)

---

## Session 1 (prior — spiraled) — 2026-04-25

### What happened
- Goal: assemble + fire 7 `use_figma` slices for checkbox.
- Agent discovered `fetch`, `atob`, `TextDecoder` are not defined in the Figma plugin sandbox.
- **Root cause of spiral:** agent incorrectly interpreted absent browser APIs as a problem to solve, and invented a base64 + custom-UTF-8 + `AsyncFunction` wrapper to "load" the slice into the sandbox.
- **Actual issue:** none. The assembled slice bytes ARE the plugin code. `use_figma`'s `code` argument is executed directly — no fetch, decode, or eval is needed.
- **Concrete bug introduced:** `String(base64).replace(/s/g, "")` — the regex `\s` (whitespace) was written as `s` (literal letter s), corrupting the base64 stream and causing binary garbage output.
- **Wasted work:** entire session spent debugging the wrapper instead of the draw pipeline.
- **Resolution:** wrapper deleted. Guardrails added to DesignOps-plugin in EXECUTOR.md, 08-cursor-composer-mcp.md, and figma-slice-runner/SKILL.md naming the exact trigger phrases.

### Artifacts left (now cleaned)
- ~~`figma-slices/invoke-scaffold-utf8.js`~~ — deleted
- ~~`figma-slices/scaffold.b64.txt`~~ — deleted
- ~~`tmp-assemble-checkbox-figma.mjs`~~ — deleted (scratch staging file, violated AGENTS.md)
- ~~`tmp-figma-checkbox-payload.js`~~ — deleted (scratch staging file)
- ~~`figma-slices/mcp-b64-wrapper-scaffold.js`~~ — deleted
- ~~`slice-cc-doc-scaffold.js`~~ (root) — deleted (duplicate; canonical is `figma-slices/cc-doc-scaffold.js`)

---

## Session 2 — 2026-04-26

### Steps completed

| Step | Status | Notes |
|------|--------|-------|
| 1 — Resolve component | ✅ | `checkbox` |
| 2 — Locate tokens.css | ✅ | `src/styles/tokens.css` |
| 3 — shadcn init | ✅ | `components.json` present |
| 3a — Wire tokens.css | ✅ | Already imported in `src/app/globals.css` line 1 |
| 3b — Icon pack | ✅ | `lucide-react` stored in `designops.config.json` — no prompts |
| 4 — Install checkbox | ✅ | `already_exists` at `src/components/ui/checkbox.tsx` |
| 4.3 — Peer dep audit | ✅ | `@radix-ui/react-checkbox` ✓  `lucide-react` ✓  all present |
| 4.4 — Icon rewrite | ✅ | Skipped — `already_exists` |
| 4.5 — CVA extract | ✅ | exit 1: `"no \`const X = cva(...)\` call found in source"` — correct, Mode B |
| 4.7 — Token paths | ⚠️  | Verified in prior session (comment in `checkbox.config.js`). Live Figma probe skipped — Figma MCP not connected to this Claude Code session. Paths assumed valid. |
| 5 — Figma file key | ✅ | `uCpQaRsW4oiXW3DsC6cLZm` (from user) |

### Token paths in CONFIG (to verify against Figma if re-running)

| Field | Path | Collection |
|-------|------|-----------|
| `style.off.fill` | `color/background/default` | Theme |
| `style.off.labelVar` | `color/background/content` | Theme |
| `style.off.strokeVar` | `color/border/default` | Theme |
| `style.on.fill` | `color/primary/default` | Theme |
| `style.on.labelVar` | `color/primary/content` | Theme |
| `style.on.strokeVar` | `color/primary/default` | Theme |
| `control.indicatorVar` | `color/primary/content` | Theme |
| `padH.default` | `space/xs` | Layout |
| `radius` | `radius/sm` | Layout |
| `labelStyle.default` | `Label/SM` | Typography (text style) |

### Slice 1 assembled

```
node scripts/assemble-slice.mjs \
  --step cc-doc-scaffold \
  --layout control \
  --config-block figtest/checkbox.config.js \
  --registry figtest/.designops-registry.json \
  --handoff "{}" \
  --file-key uCpQaRsW4oiXW3DsC6cLZm \
  --out figtest/figma-slices/cc-doc-scaffold.js
```

Result: `code=23569B  wrapper=24772B  exit=0  check-payload=PASS`

**Canonical location:** `figtest/figma-slices/cc-doc-scaffold.js`

---

## Blocker — Figma MCP not connected to Claude Code session

`use_figma` is not in the tool list for this Claude Code session. The Figma MCP connector must be active to fire the draw calls.

### What to do next (in a session that has Figma MCP)

**Step 6 — seven sequential `use_figma` calls, parent-owned, no wrapper:**

For each slice, the workflow is:
1. In DesignOps-plugin repo: `node scripts/assemble-slice.mjs --step <slug> ... --handoff figtest/handoff.json --out figtest/figma-slices/<slug>.js`
2. `use_figma` with `code = Read("figtest/figma-slices/<slug>.js")`, `fileKey = "uCpQaRsW4oiXW3DsC6cLZm"`
3. Persist Figma return JSON to `figtest/figma-slices/<slug>-return.json`
4. `node scripts/merge-create-component-handoff.mjs <slug> figtest/handoff.json figtest/figma-slices/<slug>-return.json`
5. Repeat for next slug

**Slice order:**
1. `cc-doc-scaffold` → handoff `{}`  ← **ASSEMBLED, READY**
2. `cc-variants` → handoff needs `{ doc: { pageContentId, docRootId } }` from scaffold return
3. `cc-doc-component` → handoff needs `doc` + `afterVariants`
4. `cc-doc-props` → full handoff
5. `cc-doc-matrix` → full handoff
6. `cc-doc-usage` → full handoff
7. `cc-doc-finalize` → full handoff → run S9.1–S9.9 assertions + registry write-back

**To connect Figma MCP in Claude Code:** run `/mcp` to verify the Figma connector is listed and active, or check `.claude/settings.json` for `mcpServers`.

---

## Errors / bugs log

| Session | Step | Error | Root cause | Fix |
|---------|------|-------|-----------|-----|
| 1 | Wrapper | `/s/g` regex corrupted base64 decode | Typo — `\s` (whitespace) written as `s` (letter) | Fixed and wrapper deleted entirely |
| 1 | Architecture | Base64+AsyncFunction wrapper invented | Agent saw absent sandbox APIs (`fetch`, `atob`) and treated it as a transport problem | Guardrails added to plugin docs |
| 2 | Step 4.7 | Live token probe skipped | Figma MCP not connected to Claude Code session | Connect Figma MCP; verify paths listed above before draw |
| 2 | Step 6 | Draw not started | Figma MCP not connected | Connect Figma MCP |
