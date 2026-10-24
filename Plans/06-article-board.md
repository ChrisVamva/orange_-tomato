---
status: current
as_of: 2026-10-07
owner: "@zcode"
source_of_truth: dataframe-elephant/Artifacts/Article Ideas/
---

# Article Board — Article Ideas → site slots

The operational bridge. Every row is an article the magazine could publish, with its provenance, its rating, and where it currently sits. **A row is only publishable when it passes the standard's six-question test** ([00-the-standard.md](00-the-standard.md) §7) — a high rating commissions an article, it does not publish one.

Ratings use the house method H/E/N/F/I, 1–5 each, /25, per `Artifacts/Article Ideas/*/Ratings/`.

## Waves and their evidence bases

| Wave | Domain | Evidence base | Strength |
|---|---|---|---|
| 2 | Smart home / Matter | `data/smarthome.duckdb` (claims `C###`, metrics `M###`), notebooks `notebooks/2/` | Strongest — DuckDB-verified ids |
| 3 | Automation market research | Extraction 3 corpus (claims `C001–C105`, metrics `M1–M100`) | Strong |
| 4 | Fusion | Stage 1 fusion corpus | Medium |
| 5 | Critical minerals & semiconductors | Stage 1 register `S01–S75` — **no DuckDB yet** | Weaker — pre-Stage-2 |

The strength column matters: an article from a weaker wave must not read as settled as one from wave 2. Never upgrade across waves.

## Live / ready to publish

| Article | Wave | Rating | Words | State | Site slot |
|---|---|---|---|---|---|
| Three Ways Your Smart Home Dies | 2 | 24/25 (3.1) | ~1,195 | `One Step before publication/` | issue #1 |
| What 10,000 Agent Runs Actually Cost | 3 | — (1.1) | ~1,550 | `One Step before publication/` | issue #1 |
| The Two Gains | 4 | — | ~2,463 | `One Step before publication/` | issue #1 |
| The $4.3 Billion Detour (Russian gold) | 5 | 24/25 (1.1) | ~3,013 | `5/Draft/Edit/` | issue #2 |

*Wave 3 and wave 4 ratings for these specific ideas were not found in a `Ratings/` file during this inventory — mark as "not recorded" rather than assumed.*

## Commissioned candidates (rated, corpus-ready)

| Idea | Wave | Score | Note |
|---|---|---|---|
| 2.1 Matter logo = conformance, not compatibility | 2 | **25/25** | Only perfect score; hook is the integrity lesson |
| 3.1 Three ways your smart home dies | 2 | 24/25 | Already drafted → issue #1 |
| 6.1 The 82% do-nothing baseline | 2 | 24/25 | Single reframing number; strongest wave-2 chart |
| 22.2 Money on three clocks | 2 | 24/25 | Broadest non-technical audience |
| X.1 Certified vs working | 2 | 24/25 | Cross-cutting flagship |
| 24.1 What the corpus admits it doesn't know | 2 | 24/25 | Cut from top-5 deliberately → belongs on the **standard page**, linked, not commissioned as a lead |
| 5.1 The Ledger That Blending Can't Fool | 5 | 24/25 | Best wave-5 idea |
| 1.3 The 86% Problem (UFLPA migration) | 5 | 23/25 | |
| 3.1 19 Out of 20 (refinery chokepoint) | 5 | 23/25 | |
| 1.2 150 Tonnes of Ghost Coltan | 5 | 23/25 | |
| 2.1 Two Continents, Two Burdens | 5 | 23/25 | |
| 4.1 Consistency Is Not Origin (BGR) | 5 | 23/25 | |
| 8.1 Six Ways to Launder an Origin | 5 | 23/25 | |
| 12.1 The model, then the field | 2 | 22/25 | Best energy idea; green-light sixth |
| 19.1 Three prices on a log scale | 2 | 21/25 | Best trade piece |

## Not yet inventoried

- **Wave 2:** 27 ideas rated in full (`2/Ratings/Best5.md`); the remaining ~14 are rated 11–21 and listed there.
- **Wave 3:** `3/ArticleBrainstorm.md` — pricing/total-cost, failure patterns & risk, and further clusters; not rated in a `Ratings/` file during this pass.
- **Wave 4:** `4/brainstorm fusion/FusionBrainstorm.md` — not inventoried.
- **Wave 5:** 28 ideas (1.1–8.3) rated in `5/IdeasSemiconductorsEvaluation.md`; the bottom of that table was not read in full.

## Pipeline rule

```
candidate ──rating──► commissioned ──draft──► in review ──gates──► ready ──port──► live
            H/E/N/F/I              Draft/     Edit/,              One Step      content/articles/
            /25                    Iterations                       before pub.   status: published
```

Each arrow is a gate, not a formality. The last one — `ready → live` — requires the six-question test and a complete "How we show our work" appendix.
