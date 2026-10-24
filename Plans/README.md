---
status: current
as_of: 2026-10-07
owner: "@zcode"
horizon: 2026-10-07 → 2026-11-07
governing_law: dataframe-elephant/Rules and Regulations/Protocols/
---

# Orange Tomato — Plans

This folder holds the plan structure that turns `orange-tomato.com` from an emptied shell into a publishing magazine whose content pipeline **is** the dataframe-elephant artifact process.

## The identity (one sentence)

> **A small magazine of finished, evidence-grounded deep-dives, for readers who are optimistic about the future but refuse to be fooled into it.**

Internal shorthand: **hope with receipts.** The recurring editorial move is the gap between the *claimed* number and the *accountable* number — NIF's "4.13" headline gain versus its 0.008 on the accounting that matters; a $3,003 pricing page versus a $7,200 invoice; a "works seamlessly" claim versus one measured minute to darkness.

## How to read this folder

| File | Horizon | Purpose | Status |
|---|---|---|---|
| [README.md](README.md) | — | This index: horizons, law, cross-system links | current |
| [00-the-standard.md](00-the-standard.md) | standing | The editorial constitution — dataframe-elephant's evidence discipline imprinted onto the site | current |
| [01-site-architecture.md](01-site-architecture.md) | standing | What the site becomes: pages, content contract, evidence layer, out-of-scope | draft |
| [02-immediate.md](02-immediate.md) | 0–72 h | Immediate next actions | ready |
| [03-week-1.md](03-week-1.md) | days 4–7 | Pipeline mechanics, issue #1 live | ready |
| [04-week-2.md](04-week-2.md) | days 8–14 | Fourth article through the editorial gates; cadence | ready |
| [05-weeks-3-4.md](05-weeks-3-4.md) | days 15–30 | Commissioning, trust appendix, one-month review | ready |
| [06-article-board.md](06-article-board.md) | rolling | Status board: Article Ideas → site slots | current |
| [07-decisions-and-backlog.md](07-decisions-and-backlog.md) | rolling | Open decisions (owner: Chris) + beyond-month backlog | current |

## The law

These plans are **subordinate to the dataframe-elephant protocols**. A plan proposes; a protocol governs. Where a plan conflicts with a protocol, the protocol wins and the plan is revised.

| Governing document | What it governs here |
|---|---|
| `dataframe-elephant/Rules and Regulations/Protocols/Research-Evaluation.md` | Evidence classes, confidence, falsifiers, the six gates, decision rules |
| `.../Protocols/Article creation expertise/ArticleCreation.md` | What the evidence allows; article acceptance gates |
| `.../Protocols/Article creation expertise/ThisIsForPeopleToRead.md` | Human-first law: no self-referential noise, conversational language |
| `.../Protocols/Article creation expertise/Article_Structure.md` | Hook → nut graf → body → key number → gaps → kicker |
| `.../Protocols/Article creation expertise/Article_Circumstance.md` | Voice: write to one person; IDs live in the provenance panel and hover text |
| `.../Protocols/Article creation expertise/EditingProcess.md` | Three-stage revision, external review, fact-check |
| `.../Artifacts/Article Ideas/*/Ratings/*` | The H/E/N/F/I commissioning method (1–5 ×5, /25) |

## Cross-system links

- **Command center:** `TODO/Core/projects/OT/` (code **OT** — "orange-tomato.com Revival"). Tasks OT-1…OT-4 live there; agents transcribe decisions via `todo decide`. This folder is the working detail behind those tasks.
- **Content source:** `dataframe-elephant/Artifacts/Article Ideas/` — waves 2 (smart home), 3 (automation market), 4 (fusion), 5 (critical minerals & semiconductors).
- **Live site:** https://orange-tomato.com/ — React + TypeScript + Vite + Tailwind on GitHub Pages; **push to `main` = deploy** (proven 2026-10-07).

## Horizons at a glance

```
now ──► 0–72h          Week 1            Week 2            Weeks 3–4
      strip done ✅    issue #1 live     4th article       cadence + review
      read experience  evidence layer    editorial gates    next commissions
      port 3 articles  content contract  trust appendix     one-month memo
```

## Status legend

`current` — reflects today's reality · `ready` — executable now · `draft` — needs a decision first · `blocked` — waiting on something named in the file.

## Change log

- **2026-10-07** — folder created; identity fixed (magazine, "hope with receipts"); step 1 (strip to shell) already shipped and live at commit `98811d6`.
