---
status: ready
horizon: days 8–14 (2026-10-15 → 2026-10-21)
owner: "@zcode"
depends_on: [03-week-1.md]
---

# Week 2 — the fourth article, and the editorial gates made real

Issue #1 proved the *port*. Week 2 proves the *pipeline*: take an article that is not yet published, run it through the dataframe-elephant gates, and publish it.

## W2-1 — Publish "The $4.3 Billion Detour" (Russian gold)

The strongest near-ready piece: wave 5, rated **24/25** (H5 E5 N4 F5 I5), ~3,013 words, sitting in `5/Draft/Edit/Russian gold edited.md`.

**One important difference from the first three:** wave 5 has **no DuckDB yet** — its evidence base is the Stage 1 survey register (`S01–S75`), and `IdeasSemiconductorsEvaluation.md` records that it was rated *before* Stage 2 promotion. So this article carries a heavier traceability obligation than the smart-home pieces: every number must be followable to a register entry, and the article must not borrow the confidence of the DuckDB-backed waves.

**Steps (per `EditingProcess.md` three-stage revision + `ArticleCreation.md` gates):**
1. Big-picture read — does it achieve its purpose?
2. Structure & flow — reverse outline, transitions, trim.
3. Line edit — grammar, tense, voice consistency, active voice.
4. Fact-check gate — every figure to its register entry; mark anything not verifiable.
5. Voice check — read aloud; the `Article_Circumstance.md` §6 checklist.
6. Publication test — [00-the-standard.md](00-the-standard.md) §7.

**Acceptance:** live on the shelf with a complete "How we show our work" appendix; the register basis stated honestly (a Stage 1 survey, not a verified database).

## W2-2 — Turn the standard into a checklist

The gates exist as protocol prose. Convert them into a short, reusable **pre-publication checklist** in the repo (`content/PUBLICATION-CHECKLIST.md`), drawn from the standard §5 and §7 and the circumstance §6.

**Acceptance:** every article that ships after W2-1 is checked against it, and the checklist is cited in the article's PR/commit.

## W2-3 — Decide the cadence

With four articles live, the question becomes rhythm. Proposal: **one finished deep-dive every two weeks** — slow enough that the standard holds, fast enough that the shelf grows visibly.

Related decision (**D4**): **issues** (dated collections) or a **rolling shelf**? Default: rolling shelf with dates on cards; introduce issues only if/when a theme emerges.

**Acceptance:** cadence recorded in the command center (OT) and in [06-article-board.md](06-article-board.md).

## W2-4 — Retrofit the appendix pattern

Bring issue #1's three articles up to the W2 appendix standard so all four are uniform.

**Acceptance:** four articles, one consistent evidence-layer pattern.

## Risk watch

- **Borrowed confidence across waves.** Wave 5's evidence base is weaker than wave 2's; the article must not read as more settled than the smart-home pieces. This is exactly the "never upgrade" rule, applied across waves rather than within a claim.
- **Right of reply.** Not relevant for gold; it *will* matter for the vendor-critical smart-home pieces (3.3 op-ed was deferred for this reason in the wave-2 ratings).
