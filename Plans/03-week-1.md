---
status: ready
horizon: days 4–7 (2026-10-11 → 2026-10-14)
owner: "@zcode"
depends_on: [02-immediate.md]
---

# Week 1 — pipeline mechanics, issue #1 live

Goal: the shelf stops being a placeholder and becomes **issue #1** — three finished deep-dives, one standard page, and a repeatable way to add the fourth.

## W1-1 — Formalize the content contract in the repo

Turn [01-site-architecture.md](01-site-architecture.md) §3 into the working reality:

- `content/articles/<slug>.md` with the frontmatter schema;
- an **article template** file (frontmatter + the §5 skeleton as headings) so a new piece starts in the right shape;
- a short `content/README.md` stating: no claim IDs in the body, sources live in frontmatter, one structural shape per article.

**Acceptance:** creating a new article is "copy the template, fill it in", with no ambiguity about format.

## W1-2 — Evidence layer v1

Implement §4 of the site architecture: inline source notes (hover/tap) + the "How we show our work" appendix.

**Acceptance:**
- at least the three live articles carry a working appendix;
- the inline note pattern works on one article end-to-end;
- the layer degrades gracefully (no hover on touch → tap; no JS → nothing breaks);
- reading flow is unaffected — verified by reading an article straight through without touching a marker.

## W1-3 — Ship issue #1

With I-2…I-5 done, the shelf is live. This is the moment the magazine exists publicly.

**Acceptance:** https://orange-tomato.com/ shows three deep-dives; each opens; the standard page is reachable; nothing from the old identity remains.

## W1-4 — Define the intake: Article Ideas → repo

Write the mapping between dataframe-elephant's stages and the site's states, so "where is this article?" has one answer.

| dataframe-elephant | Site state |
|---|---|
| `Artifacts/Article Ideas/<wave>/` brainstorm + `Ratings/*` | *candidate* — not on the site |
| `.../Draft/` (first draft) | *in progress* — not on the site |
| `.../Edit/`, `.../Iterations/` | *in review* — not on the site |
| `.../One Step before publication/` | *ready to port* |
| `content/articles/<slug>.md` with `status: published` | *live* |

**Acceptance:** the mapping is written down and used to update [06-article-board.md](06-article-board.md) with real states.

## W1-5 — First reader test

Per `EditingProcess.md` (external review): one non-specialist reader reads one article and answers the six publication-test questions.

**Acceptance:** feedback recorded; any failure becomes a task, not a footnote.

## Risk watch

- **Over-building the evidence layer.** It is service, not ceremony. If W1-2 starts costing more than the articles themselves, cut it to the appendix only and revisit.
- **Porting ≠ publishing.** A file moved into the repo is not a published article until it passes §7 of the standard.
