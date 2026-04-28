# Radio Group — `/create-component` smoke test (`figtest`)

**Target:** [v60 Updates — Foundations](https://www.figma.com/design/uCpQaRsW4oiXW3DsC6cLZm/v60-updates-%E2%80%94-Foundations) — `fileKey` = `uCpQaRsW4oiXW3DsC6cLZm`. URL `node-id=8-416` references page chrome only; drawings target the Foundations scaffold per `radio-group.config.js` **`pageName`**: `↳ Radio`.

## Skill compliance

- Canonical Step 6 DAG: **12** machine slugs (`13-component-draw-orchestrator` §1) — five scaffold tuples → `cc-variants` → doc ladder including **`cc-doc-props-1`** and **`cc-doc-props-2`**.
- Assembly: `DesignOps-plugin/scripts/assemble-slice.mjs` (same as `EXECUTOR.md` §0).
- **`handoff.json`** at figtest repo root merges after each **`use_figma`** via `finalize-slice` or `merge-create-component-handoff.mjs`.

## Repo paths (everything under this figtest checkout)

| File | Purpose |
|------|---------|
| `radio-group.config.js` | MODE B synthetic CONFIG (`layout`: `control`, `variants`: off/on) |
| `handoff.json` | Multi-slice bridge (merge refreshes **`doc`** / **`afterVariants`**) |
| `phase-state.json` | Same directory as handoff — resume/`nextSlug` |
| `scripts/radio-slice.cjs` | Wraps assemble-slice → `draw-radio/slice-<slug>.code.js` + `draw-radio/mcp-<slug>.json` |

## One slice loop (repeat 12× in DAG order)

```bash
cd C:/Users/jbabc/Documents/GitHub/figtest

# Replace STEP with next slug from: node ..\DesignOps-plugin\scripts\designops-step6-engine.mjs status --draw-dir .
node scripts/radio-slice.cjs --step cc-doc-scaffold-header

# In Cursor parent: Read draw-radio/mcp-<STEP>.json (full file) → call_mcp plugin-figma-figma use_figma with fileKey + code + description + skillNames: "figma-use"

# Persist return JSON (recommended):
type return-cc-doc-scaffold-header.json | node C:/Users/jbabc/Documents/GitHub/DesignOps-plugin/scripts/finalize-slice.mjs cc-doc-scaffold-header handoff.json --return-path return-cc-doc-scaffold-header.json
```

## Slug checklist (paste and tick)

1. cc-doc-scaffold-shell  
2. cc-doc-scaffold-header  
3. cc-doc-scaffold-table-chrome  
4. cc-doc-scaffold-table-body  
5. cc-doc-scaffold-placeholders  
6. cc-variants  
7. cc-doc-component  
8. cc-doc-props-1  
9. cc-doc-props-2  
10. cc-doc-matrix  
11. cc-doc-usage  
12. cc-doc-finalize  

## Registry (after slice 12)

Use `skills/create-component/resolver/merge-registry.mjs` per `EXECUTOR.md` Step 5.2 — extract `registryEntry` from **`cc-doc-finalize`** return.
