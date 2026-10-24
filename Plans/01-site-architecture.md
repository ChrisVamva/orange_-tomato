---
status: draft
as_of: 2026-10-07
owner: "@zcode"
depends_on: [00-the-standard.md]
---

# Site Architecture — what orange-tomato.com becomes

The identity change is deep, so the site is rebuilt around exactly one object: **the finished deep-dive**. Everything that isn't the shelf, the article, or the standard is out.

## 1. What it is, and what it is not

**Is:** a magazine. A shelf of finished deep-dives, plus a page stating the standard we hold ourselves to.

**Is not** (removed 2026-10-07, commit `98811d6`): a watchdog registry, a dossier library, a dashboard, a journal of filler posts, a newsletter funnel, an assets/freelancing section.

## 2. Pages

| Route | Purpose | Notes |
|---|---|---|
| `/` | **The shelf** — the table of contents of the magazine | Cards: title, one honest sentence, read time, date. No sidebar, no widget. |
| `/d/:slug` | **The deep-dive** — one finished article | Long-form reading layout; evidence layer on demand (§4). |
| `/standard` | **The standard** | The reader-facing version of [00-the-standard.md](00-the-standard.md) §1–§6, in plain language. The magazine's trust page. |
| `/404` | Not found | Keep it plain; link back to the shelf. |

Deliberately absent until a real need exists: search, tags/filters, comments, newsletter capture, author pages, analytics dashboards.

## 3. The content contract

An article is a **Markdown file with frontmatter**, committed to the repo. No CMS, no external database. Rationale: the pipeline is already file-based in dataframe-elephant, and push-to-`main` already deploys.

Proposed location: `content/articles/<slug>.md` (decision **D2**, [07-decisions-and-backlog.md](07-decisions-and-backlog.md)).

Proposed frontmatter:

```yaml
---
title: "The Two Gains"
slug: the-two-gains
dek: "One machine, two true numbers, and the 500x gap between them."
date: 2026-10-07          # publication date
readTime: 12              # minutes, computed or set
topic: energy             # broad shelf grouping, reader-facing
wave: 4                   # provenance: which dataframe-elephant wave
evidenceBasis: "Wave 4 fusion corpus (Stage 1 register)"   # for internal traceability
status: published         # draft | review | published
sources:                  # the evidence layer (§4) — never rendered as IDs in prose
  - label: "NIF milestone record, April 7 2025"
    note: "documented fact — official facility record"
  - label: "LLNL shot records"
    note: "one facility, its own accounting"
---
```

**Rule carried from the protocols:** the body contains **no** claim/metric IDs, no Document Control, no database paths. Those live in `sources` and the evidence layer.

## 4. The evidence layer — the discipline, available on demand

`Article_Circumstance.md` §3 is explicit: IDs and provenance "belong in the provenance panel and hover text, not in the reader's sentence flow." The web can honour that literally.

**v1 (Week 1, see [03-week-1.md](03-week-1.md)):**
- A number or claim in prose can carry a subtle marker (dotted underline / superscript dot).
- Hover (desktop) or tap (mobile) reveals a short note: the source, the evidence class in plain words, the confidence, and the caveat — e.g. *"about one minute (one test, one switch-light pair)"*.
- Every article ends with a **"How we show our work"** appendix: the sources list in plain language, plus what we couldn't verify.

**Constraints:** the layer must never break reading flow; it degrades to nothing on browsers that can't hover; and it is *optional depth*, not a required interaction. If readers never use it, we revise (see the standard's falsifier).

## 5. Design constraints

- **Keep:** the brutalist shell, the tomato logo, orange accent, dark mode, Inter/Space Grotesk/IBM Plex Mono pairing.
- **Add:** a long-form reading typography scale (measure ~65–75 characters, generous line height) — the current app has no article layout yet.
- **Header:** logo → shelf; one link to `/standard`. No nav clutter.
- **Footer:** brand + the standard's one-liner + RSS (once it exists). No fake subscribe form.
- **Mobile:** the shelf and article must both read well on a phone; the evidence layer becomes tap.

## 6. Build & deploy

- Vite + React + TS + Tailwind v4 (unchanged). Markdown is imported at build time; no runtime fetch.
- GitHub Pages, custom domain `orange-tomato.com`, GitHub Actions on push to `main`. **Proven working 2026-10-07.**
- SPA routing already works via the copied `dist/404.html` (Vite config `shx cp dist/index.html dist/404.html`), so `/d/:slug` deep links resolve.

## 7. Open decisions

| ID | Decision | Default if Chris doesn't object |
|---|---|---|
| D2 | Article file location + renderer | `content/articles/*.md`, build-time import |
| D3 | URL scheme (`/d/:slug` vs `/:slug`) | `/d/:slug` |
| D5 | Is the magazine strictly technology? | Yes, broadly: "how the future gets built", including supply chains (gold, minerals) |
| D6 | Newsletter | Not until a real one exists |
| D7 | Legacy article `the_death_of_the_selector.md` | Evaluate for the shelf; retire if it fails the standard |
