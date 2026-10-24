---
status: current
as_of: 2026-10-07
owner: "@zcode"
decision_owner: Chris
---

# Decisions and Backlog

Open decisions that block or shape the plan, and the work that deliberately sits beyond the one-month horizon. Decisions are Chris's; agents propose a default and proceed on it unless he objects (matching the TODO-vault rule that agents transcribe his decisions).

## Open decisions

| ID | Decision | Default if no objection | Blocks |
|---|---|---|---|
| **D1** | Housekeeping: delete the old non-app files, or archive under `legacy/`? | Archive `the_death_of_the_selector.md` + `docs/STRATEGIC_ROADMAP.md`; delete the rest | [02-immediate.md](02-immediate.md) I-1 |
| **D2** | Article file location + Markdown renderer | `content/articles/*.md`, build-time import | I-2, W1-1 |
| **D3** | URL scheme | `/d/:slug` | I-2 |
| **D4** | Cadence: issues vs rolling shelf | Rolling shelf, one deep-dive / 2 weeks | W2-3 |
| **D5** | Scope: is the magazine strictly technology? | Yes, broadly — "how the future gets built", including supply chains (gold, minerals) | commissioning |
| **D6** | Newsletter / subscribe | Not until a real one exists | — |
| **D7** | Legacy `the_death_of_the_selector.md` | Evaluate against the standard; retire if it fails | I-1 |
| **D8** | Final tagline under the logo | "A Magazine of Deep-Dives" (current placeholder) | I-4 |
| **D9** | Measurement / analytics | Start with none; add aggregate-only if a question needs it | W3-3 |

## Beyond one month (backlog)

Not scheduled; listed so they aren't lost. Each would need its own plan file when it becomes real.

- **Search** across the shelf (only worth it past ~10 articles).
- **RSS feed** (the honest distribution channel for a magazine; pairs with D6).
- **Series / collections** — group deep-dives by theme (e.g. "what breaks", "what's counted") once the shelf is big enough to need it.
- **Book compilation** — `Protocols/BookCreation.md` exists; a shelf of deep-dives is a book waiting to be bound. Long horizon.
- **Translations** — the reader is not language-bound in principle; out of scope for now.
- **Right-of-reply workflow** — needed before any vendor-critical op-ed ships (wave-2 idea 3.3 was deferred for exactly this reason).
- **Second-wave research** — wave 5 has no DuckDB yet; promoting it to Stage 2 would raise its evidence strength (and its articles' confidence).
- **The agentic chat / local search from the old roadmap** — parked. It belongs to the *research* system, not the magazine; do not reintroduce it into the site.

## Decision log

| Date | Decision | By |
|---|---|---|
| 2026-10-07 | Identity: small magazine of finished, evidence-grounded deep-dives; "hope with receipts" | Chris |
| 2026-10-07 | Reader: curious, tech-friendly, cautiously optimistic | Chris |
| 2026-10-07 | Clean sweep — all old content/identity gone; keep stack + name | Chris |
| 2026-10-07 | Jules is backstage (Google repo agent), not part of the identity | Chris |
| 2026-10-07 | Step 1 shipped: site stripped to shell, live at `98811d6` | @zcode |
