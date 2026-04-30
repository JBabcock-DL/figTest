# Project memory (claude-ops)

<!-- This file is part of the dl-agent workflow. See CLAUDE.md (repo root) for mandatory read/update rules. -->

## Quick reference

- **Project goal (one line):** *or “see `workflow.md` → Project Goal”*
- **Ticket backend:** `jira`
- **Triage mode:** `mirror`
- **Project IDs:** cloudId=`a36c44c1-853d-4ac5-b0ca-ed9130bf5e6d` siteUrl=`https://detroitlabs.jira.com` projectKey=`JAK` projectName=`jakeTest`
- **Issue type map (Jira):** bug=`Bug`, wo=`Workorder`, ctx=`Context`
- **Default branch / PR target:** *e.g. `main`*
- **Current sprint folder:** `.github/Sprint 1/`
- **Stack / runtimes (if this is an app repo):** Node (see `package.json`), npm (lockfile present)
- **This repo is:** application codebase

---

## Where everything lives (paths)

- **Workflow + IDs:** `.github/templates/workflow.md`
- **Handoff / new sessions:** `.github/templates/agent-handoff.md` (create if/when you start using this workflow)
- **Per ticket:** `.github/Sprint {N}/{TICKET-ID}-{slug}/ticket.md` + `plan.md` + optional `research/`, `scripts/`

---

## Changelog (optional)

- *2026-04-30 — Backend bootstrap completed via /create-backlog (mode: mirror).*
