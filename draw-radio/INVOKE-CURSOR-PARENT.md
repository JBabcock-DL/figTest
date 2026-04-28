# Invoke Figma MCP from Cursor (parent thread)

Designed for `/create-component` Step 6: **nothing here replaces parent `call_mcp`**—this is copy-paste contract per `skills/create-component/EXECUTOR.md` §0.

## Preconditions

1. **Figma connector** authenticated (official Figma MCP in Cursor).
2. **Committed payload** assembled: `node scripts/radio-slice.cjs --step <slug>` produces:
   - `draw-radio/slice-<slug>.code.js`
   - `draw-radio/mcp-<slug>.json` (validated by DesignOps `check-use-figma-mcp-args`).

## Algorithm (literally once per slug)

1. **`Read`** `draw-radio/mcp-<slug>.json` **in full** (no truncation—the file is ~15–43 KB UTF-8).
2. **`call_mcp`** with server **`plugin-figma-figma`** (see `mcps/**/SERVER_METADATA.json` if renamed), **`use_figma`**, **`arguments`** = parsed JSON from step 1 (must include **`fileKey`**, **`code`**, **`description`**, **`skillNames`** = `figma-use` or comma list per slice runner).

   **Skills:** pass **`skillNames`** as required by the Figma MCP tool schema (`"figma-use"` minimum; optionally add **`create-component-figma-slice-runner`**).

3. Save the MCP return payload to **`return-<slug>.json`** next to `handoff.json` (same directory).

4. **Merge** — one of:
   ```bash
   node C:/Users/jbabc/Documents/GitHub/DesignOps-plugin/scripts/finalize-slice.mjs <slug> C:/Users/jbabc/Documents/GitHub/figtest/handoff.json --return-path C:/Users/jbabc/Documents/GitHub/figtest/return-<slug>.json
   ```
   or:
   ```bash
   node C:/Users/jbabc/Documents/GitHub/DesignOps-plugin/scripts/merge-create-component-handoff.mjs <slug> C:/Users/jbabc/Documents/GitHub/figtest/handoff.json C:/Users/jbabc/Documents/GitHub/figtest/return-<slug>.json
   ```

5. **`node C:/Users/jbabc/Documents/GitHub/DesignOps-plugin/scripts/designops-step6-engine.mjs status --draw-dir C:/Users/jbabc/Documents/GitHub/figtest`** — confirm **`nextSlug`** advanced.

## Current assembled payload (ready to send)

| Slug | `mcp-*.json` |
|------|----------------|
| `cc-doc-scaffold-header` | `draw-radio/mcp-cc-doc-scaffold-header.json` |

After you run this slice and merge, assemble the next with `node scripts/radio-slice.cjs --step <nextSlug>`.

## Probe (optional)

Parent `use_figma` with small code to confirm file open:

```json
{
  "fileKey": "uCpQaRsW4oiXW3DsC6cLZm",
  "code": "return { pageName: figma.currentPage && figma.currentPage.name, ok: true };",
  "description": "probe file key",
  "skillNames": "figma-use"
}
```
