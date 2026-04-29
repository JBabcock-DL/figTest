# Bug / refinement log — `/create-component` radio-group (figtest)

Target file: `uCpQaRsW4oiXW3DsC6cLZm` (v60 updates — Foundations). Consumer repo: **figtest**. Plugin scripts/assemblies: **DesignOps-plugin**.

---

## Session timeline (what went wrong or was slow)

| Phase | Issue | Detail |
|--------|--------|--------|
| Orchestration | **Long wall-clock time** | Step 6 used multiple **`Task` → canvas-bundle-runner** subagents sequentially; large MCP payloads plus subagent startup increased latency versus a single host run. |
| Transport | **Parent `call_mcp` not used for bulk `code`** | Full assembled files (~17–37k chars each) were delegated to subagents because embedding multi‑10k `code` strings in the parent thread is unreliable on short-context hosts (policy: runner first, parent **`Read` → call_mcp** on failure). |
| Interruption | **`cc-matrix` / `cc-usage` Tasks interrupted** | Two parallel Task invocations **did not complete** (Cursor reported interrupt after ~936s). **Canvas state risk:** scaffold + properties + **component-control** ran; matrix + usage likely **not** applied — file may be incomplete vs EXECUTOR ordering. |
| Plan drift | **Incomplete Step 6** | EXECUTOR requires **five** sequential `use_figma` calls through **`cc-usage`**. Stopping after **component-control** violates the documented closeout (matrix + usage missing or stale). |
| Plan drift | **`radio` vs `radio-group` naming** | User said “radio”; shadcn skill component id is **`radio-group`**. Documented early as naming alignment, not a failure. |
| CONFIG quality | **Properties table vs code** | Initial rows came from **`build-config-block`** defaults tied to **`shadcn-props/radio-group.json`**, which listed only five generic Root-ish props. **Missing:** `onValueChange`, `name`, `orientation`, `dir`, and **RadioGroupItem** `value` / `disabled`. Descriptions were vague (“every item”) vs Radix terminology. |
| CONFIG quality | **16px vs desired 24px** | **`control.size`** and canonical **`shadcn-props`** used **16** (checkbox parity). Target design asks **24×24** on canvas; **figtest** `radio-group.tsx` used Tailwind **`h-4 w-4`** (16px), so **code and Figma both drifted** from the 24px intent until this fix. |
| §9 payload | **Sparse `childNames` on `variant=off`** | Component bundle return showed **`variant=off`** with **empty `childNames`** while **`variant=on`** listed `radio/dot`. Worth validating against **`06-audit-checklist`** / control archetype expectations if QA flags layout. |

---

## Fixes applied (this follow-up)

1. **`shadcn-props/radio-group.json`** (+ monolithic **`shadcn-props.json`**): **`control.size` → 24**; **`properties`** rewritten to match **Radix `RadioGroup` root** (`value`, `defaultValue`, `onValueChange`, `disabled`, `required`, `name`, `orientation`, `dir`, `className`) plus **`RadioGroupItem`** (`value`, `disabled`).
2. **`figtest/draw/radio-group.ctx.js`**: Same **`CONFIG`** updates for re-assembly.
3. **`figtest/src/components/ui/radio-group.tsx`**: **`h-6 w-6`** (24px) and indicator **`h-3 w-3`** so implementation matches canvas target.

---

## Required next step for Figma (row count change)

The properties table row count changed (**5 → 11**). Bundles **`throw`** if scaffold body row count ≠ `CONFIG.properties.length` during **`cc-properties`**.

You must **re-run all five** Step 6 assemblies from plugin root **in order**, then **`use_figma`** each:

1. `cc-scaffold`  
2. `cc-properties`  
3. `cc-component-control`  
4. `cc-matrix`  
5. `cc-usage`  

Use updated **`radio-group.ctx.js`** as **`--ctx-file`** with **`assemble-component-use-figma-code.mjs`**, then **`npm run check-payload`** on each output, then MCP (**runner or parent `Read` → `call_mcp`**).

---

---

## Session 3 — 2026-04-28 (this session)

### Steps completed

| Step | Status | Notes |
|------|--------|-------|
| Re-assemble all 5 | ✅ | Re-ran `npm run create-component-step6` from plugin root with updated ctx (11-row properties); all check-payload exit 0 |
| cc-scaffold | ✅ | `pageContentId: 671:10`, `docRootId: 671:11` — ↳ Radio page, cleaned + rebuilt |
| cc-properties | ✅ | 11 property rows written to table |
| cc-component-control | ✅ | `compSetId: 673:17`, 2 variants (`off`/`on`), `propErrorsCount: 0`, `unresolvedTokenPaths.total: 0` |
| cc-matrix | ✅ | Variants × States matrix (default + disabled) inserted |
| cc-usage | ✅ | Do / Don't cards inserted |
| §9 assertions | ✅ | All 9 pass (see component-control return above) |
| Registry upsert | ✅ | `radio-group` added to `.designops-registry.json` (nodeId: 673:17, key: 9563610…) |

### Transport: parent `Read` → `call_mcp` for all five calls (no Task subagents)

Per memory feedback `feedback_no_subagent_runner_for_use_figma.md`, parent transport was attempted first and succeeded for all five calls without any truncation issues.

---

## Archived notes

| # | When | Symptom | Resolution |
|---|------|---------|------------|
| 1 | Earlier | User asked for “radio”; skill lists `radio-group`. | Treat as **radio-group**. |
