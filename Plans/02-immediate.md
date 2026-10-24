---
status: ready
horizon: 0–72 hours (2026-10-07 → 2026-10-10)
owner: "@zcode"
depends_on: [00-the-standard.md, 01-site-architecture.md]
command_center_tasks: [OT-1, OT-2, OT-3]
---

# Immediate — the next 72 hours

Step 1 is already shipped: the site is stripped to shell + routing and live (commit `98811d6`). What follows is the smallest sequence that ends with **three real articles on the shelf**.

## I-1 — Housekeeping sweep (delete or archive the non-app legacy)

The shell is live, but the repo still carries the old world. None of it deploys, so this is about honesty and a clean working surface, not the site.

Candidates: `research/` (phase-2…5 JSON), `categories/*.html`, `assets/css|js`, `docs/STRATEGIC_ROADMAP.md`, `_drafts/`, `sync_watchdog.py`.

Two items are **not** blind deletions — inspect first:
- `the_death_of_the_selector.md` — a real article draft; evaluate against the standard, then either commission it or retire it (decision **D7**).
- `docs/STRATEGIC_ROADMAP.md` — the old technical roadmap; its plumbing advice (dynamic routing, data layer, ingestion) is partly superseded by [01-site-architecture.md](01-site-architecture.md). Archive it as history, don't follow it.

**Acceptance:** repo contains only the app, `content/`, `Plans/`, and standard repo files — or an explicit `legacy/` archive with a one-line README saying what it is and why it's kept.

## I-2 — Build the article reading experience

The current app has no article layout. Build the long-form page (`/d/:slug`) and the Markdown pipeline per [01-site-architecture.md](01-site-architecture.md) §3–§5.

**Acceptance:**
- a `.md` file with the frontmatter contract renders to a clean article page;
- measure ~65–75 characters, comfortable line height, dark mode correct;
- deep link `/d/<slug>` works on the live site (SPA fallback);
- no claim IDs anywhere in the rendered body.

## I-3 — Port the three finished articles

Verbatim from `dataframe-elephant/Artifacts/Article Ideas/One Step before publication/`:

| Article | Wave | Words |
|---|---|---|
| Three Ways Your Smart Home Dies | 2 (smart home) | ~1,195 |
| What 10,000 Agent Runs Actually Cost | 3 (automation market) | ~1,550 |
| The Two Gains | 4 (fusion) | ~2,463 |

Port means: convert to the frontmatter contract, add the plain-language `sources` block, and **run the standard's checks** — structure (§5) and voice (§4). These were edited in dataframe-elephant, but nobody has yet applied the *web* publication test.

**Acceptance:** each of the three passes the six-question publication test in [00-the-standard.md](00-the-standard.md) §7, and reads clean on mobile.

## I-4 — Write `/standard`

The reader-facing standard page, from [00-the-standard.md](00-the-standard.md) §1–§6, in plain language. This is written **with Chris** — it is the one page that states the promise, so it gets a real read.

**Acceptance:** a stranger can state, after reading it, what Orange Tomato promises and what it refuses to do.

## I-5 — Deploy and verify

Push to `main`; confirm the Actions workflow succeeds; open the live site and check: shelf renders, three articles open by deep link, dark mode works, mobile is clean.

## I-6 — Register in the command center

- Mark **OT-1** (site audit) done — it was completed in this session.
- Move **OT-2** (define the Article-Ideas → published-post pipeline) to in-progress — [06-article-board.md](06-article-board.md) and this folder are its substance.
- **OT-3** (publish the first post as proof of pipeline) is satisfied by I-3 + I-5.

## What could falsify this plan

- If porting the three articles reveals the *web* voice needs work the dataframe-elephant edits didn't do, then I-3 expands into a real edit pass — that is a finding, not a failure, and it feeds [04-week-2.md](04-week-2.md).
- If the Markdown pipeline choice (D2) blocks a clean build, fall back to the simplest build-time import and revisit later.
