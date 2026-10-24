---
status: current
as_of: 2026-10-07
owner: "@zcode"
applies_to: every article, every page, every number published on orange-tomato.com
derived_from: dataframe-elephant/Rules and Regulations/Protocols/
---

# The Orange Tomato Standard

The editorial constitution. Everything published on orange-tomato.com is held to this. It is dataframe-elephant's research discipline, translated into the one thing a reader ever sees: a finished article.

The research is the foundation. The article is the house. **No one wants to live in a foundation.**

---

## 1. The promise (reader-facing)

We publish a small shelf of finished deep-dives about how the future actually gets built. We are optimistic about that future — and we refuse to be fooled into it. Every number here is traceable. What we couldn't verify, we say we couldn't.

That paragraph is the whole brand. Nothing else is promised.

---

## 2. The thesis

Most technology writing picks one of two stories: **hype** ("breakthrough") or **doom** ("scam"). Our recurring story is the third one:

> **The gap between the claimed number and the accountable number — and why the honest number is usually more interesting than either headline.**

The claimed number is what a press release, a pricing page, or a certification logo says. The accountable number is what survives when you count the way the real decision counts. Our job is to walk the reader from one to the other without insulting either.

This is why "hope with receipts" is the internal shorthand: the optimism is real, and it is *earned*, not asserted.

---

## 3. Evidence discipline — the invisible scaffold

Sourced from `Research-Evaluation.md` and `ArticleCreation.md`. None of this vocabulary appears in reader-facing prose; it governs what may be written.

### Claim types (never conflated)
| Type | Meaning | In prose |
|---|---|---|
| **Documented fact** | Directly stated or observable in a reliable source | State it plainly |
| **Reported signal** | A report or indication, not enough to establish a general fact | "One test showed…", "The manufacturer claims…" |
| **Inference** | Our reasoned conclusion from cited evidence | "The analysts infer…", "This is an educated guess, not a measurement" |
| **Recommendation** | A proposed action or judgment | "The researchers recommend…" |

### Hard rules
1. **Never upgrade.** A reported signal does not become a documented fact for the sake of a stronger sentence. Vendor and forecast material stays downgraded (extraction decisions `L014`, `L031`).
2. **"Not recorded" is never zero.** Absence of evidence is stated as absence: "We have no evidence either way."
3. **Precision requires evidence.** No precise number without precise support. If the source is one lab test, say one lab test.
4. **Conflicts are shown, not reconciled.** Two values that disagree are presented side by side with the condition or assumption that differs between them.
5. **Conditions travel with the number.** If the conditions aren't stated in the source, the article says so — it does not supply them.
6. **Falsifiers are carried.** Where the corpus records no falsifier, the article says the claim hasn't been re-tested — it does not present it as settled.
7. **Uncertainty is practical guidance**, not academic hedging: "We only have one measurement, and it's from a lab-style test."
8. **Articles are derivative.** The database and extraction logs control; the article must never invent precedence over them.

---

## 4. Human-first law

Sourced from `ThisIsForPeopleToRead.md` and `Article_Circumstance.md`. Non-negotiable.

**Never in reader-facing prose:**
- claim IDs (`C019`) or metric IDs (`M006`)
- Document Control sections, provenance panels, notebook or database paths
- "the corpus records", "the cluster indicates", "the provenance panel shows"
- glossary-dependent openings or report register

**Always:**
- write to **one person** — "you", "we", contractions
- open with a **scene or a number with stakes**, not a methodology
- frame every technical claim in **human consequence**: not "control latency increases" but "your switch stops talking to your bulb"
- use **concrete specifics** — brands, prices, timeframes
- put the **caveat in the sentence**, not the footnote

The evidence discipline of §3 is what we *know*. §4 is how it *sounds*. Both are required; neither substitutes for the other.

---

## 5. The shape of a deep-dive

Sourced from `Article_Structure.md`. One structural shape per article, never mixed.

1. **Hook / lead** (1–4 paragraphs) — a scene, a vivid problem, or one verified number with stakes. Earns the nut graf within ~150 words.
2. **Nut graf** (1 paragraph) — what this is, why it matters to *you*, what you'll be able to decide by the end.
3. **Body** — sections, each with a one-line opener saying what the chunk proves, each following a **scene → data → implication** rhythm. Never three data blocks without a human consequence between them.
4. **Key number** (if one number carries the story) — a callout, not a table: the number, what it means, what it doesn't.
5. **Gaps** — "what we don't know, and why it matters to you." Every gap gets a "so what."
6. **Kicker** — return to the opening with changed understanding, or hand over the decision. No summary, no new claims.

---

## 6. What is negotiable, and what is not

| Negotiable | Not negotiable |
|---|---|
| The stories and examples chosen | That the article is **easy and pleasing to read** |
| Article length | The removal of **self-referential noise** |
| Depth of technical detail | **Conversational, human language** |
| Narrative structure and flow | The **evidence-based foundation** of every claim |

---

## 7. The publication test

Before anything ships, a reader who did not write it answers:

1. Would I read this if I weren't paid to?
2. Would a smart non-technical friend follow it without re-reading?
3. Does it feel like a story, or like a report?
4. Is there any sentence where the article talks about itself?
5. Does the reader know what to do, think, or ask next?
6. Is every number traceable, and is every gap stated?

Five of six failing means rewrite. Any failure of question 6 means do not publish.

---

## 8. How the site expresses the standard

The discipline is invisible in prose but **available on demand**. The web lets us do something print can't: keep the article clean *and* let a curious reader reach the evidence. See [01-site-architecture.md](01-site-architecture.md) §4 for the evidence layer. The rule from `Article_Circumstance.md` holds: IDs and provenance belong in the panel and the hover text, never in the sentence flow.

---

## 9. The standard's own falsifier

Honesty applies to this document too. We would revise it if:

- the evidence layer is never used by readers (it would be ceremony, not service);
- the "gap between claimed and accountable" thesis stops fitting the corpus (the waves are broader than that one move);
- the human-first rewrite consistently loses the evidence (then the intake is wrong, not the standard).

Revisit at the one-month review ([05-weeks-3-4.md](05-weeks-3-4.md)).
