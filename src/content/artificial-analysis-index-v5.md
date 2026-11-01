# The test changed. What did the score mean?

![The Orange Tomato mascot stands close to a graffiti wall, one mechanical hand raised to a tall ruler whose markings have been half-scrubbed and redrawn in brighter ink; the chest screen shows the article title and the wall reads V5, RULER, REDRAWN, PRIVATE, SETS.](/images/index-v5-instrument-swap-lead.jpg)

On 26 October, the [Artificial Analysis page for Kimi K3.1 Pro](https://web.archive.org/web/20261026042404/https://artificialanalysis.ai/models/kimi-k3-1-pro) put the model fourth of 215 with an Intelligence Index score of 55. Six days later the [same page](https://web.archive.org/web/20261101153614/https://artificialanalysis.ai/models/kimi-k3-1-pro) put it twenty-first of 58 with a score of 46. The model had not been retrained. Its weights had not even been released.

Between those two readings, Artificial Analysis replaced the instrument. [Index v5](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5) went live on 27 October, the biggest rebuild since v4 in January, and it did not simply sharpen the old ruler. It removed three evaluations, added two, upgraded three more, and reweighted the whole thing.

That much is in the announcement. What is worth your attention is what we found when we put the two versions of the page side by side: **not one of Kimi's evaluation scores changed.** Not one, to the last digit. The model's measurements were identical on both days. Only the arithmetic around them moved.

## What the index is

The Intelligence Index is a composite run by Artificial Analysis, which runs its own evaluations rather than republishing vendor scores. Under v4.3.2 it averaged ten evaluations across four weighted categories; under v5 it averages nine. The publisher describes v5 as the first version where most of the index — 60% — rests on private test sets or held-out answers, which is the strongest argument that the new number is the more honest one.

What changed. **Added:** FrontierCode 2.0, a private coding benchmark graded on whether a repository maintainer would merge the change, and Terminal-Bench-Science, seventy agentic research tasks run in a terminal. **Upgraded:** Humanity's Last Exam became HLE-Diamond, a thousand questions split evenly between reasoning and knowledge; AA-Omniscience v1.1 dropped saturated and public questions; CritPt became a private forty-question hard subset. **Removed:** GDPval-AA v2.1, SciCode, and AA-LCR v1.1. Each of the four categories — knowledge work, coding, science, general — now carries 25%.

Read that list against Kimi's own scores and the direction of the change becomes less mysterious than the headline suggested.

## Nothing was re-measured

Here is the comparison that matters, taken from the model's own data on both days.

On Terminal-Bench 4.0, Kimi scored 0.671717171717172 before the change and 0.671717171717172 after it. SciCode: 0.607638888888889 both times. AA-LCR: 0.863333333333333. Humanity's Last Exam: 0.524559777571826. AutomationBench: 0.7329771090921112. GDP.pdf: 0.314. AnalystAgent: 0.3875. Eleven values in that record appear on both days, and every string matches character for character. The odds of a fresh run reproducing eleven scores to fifteen decimal places are effectively zero, so these are the same measurements republished under a different arithmetic.

Three of those evaluations are no longer counted. SciCode, where Kimi scored 60.8%, went. AA-LCR, where it scored 86.3%, went. GDPval-AA, where [its 1,846 Elo had placed it third at launch](https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks), went. Three evaluations arrived in their place: FrontierCode 2.0 at 25.5%, Terminal-Bench-Science at 34.3%, HLE-Diamond at 37.3%. On the new tests the model is ordinary. On the ones it lost, it had been strong.

The composite fell 9.08 points. The measurements did not move at all.

![Notebook diagram showing the Intelligence Index under v4.3.2 with ten evaluations and under v5.0 with nine, the same model reading 55 and 46, and the two readings joined by a dashed line marked 'different instrument — not a comparison'; a note below points to the Progress Index.](/diagrams/index-v5-instrument-swap.svg)

*Diagram: one model, two instruments — the same measurements under a different arithmetic, and why 55 and 46 are not a comparison.*

**And Kimi is not special.** We parsed the embedded records from both captures — 708 models on the first, 718 on the second — and 79 appear in both with a score. For 78 of them, not one of the ten evaluations present in both captures changed by any amount. The single exception, Mistral Large 4 Preview, moved slightly on three tests, which is what a model still being evaluated looks like. Across the 79, the median composite fell 10.12 points. Seventy scores dropped by more than half a point, eight rose, one sat still.

![The mascot stands between two salvaged screens, one showing a single large number and the other a tall column of level, unchanged horizontal bars; the graffiti wall reads SAME, SCORES, MOVED, BARS.](/images/index-v5-instrument-swap-evidence.jpg)

The largest fall was MiMo-V2.6-Pro, down 16.4 points to 29.9. The largest rise was GPT-6 Astra at max effort, up 4.2 to 56.9. At the top of the table Claude Opus 5.5 went from 57.6 to 58.4, so the leader gained while the middle of the field fell away. That matches Artificial Analysis's own line that the open-weights gap "widens from 3 points to 12".

So the eye-catching example is not an outlier. It is the median experience of the models on the leaderboard, and the eight that gained are clustered at the top of it.

## The new ruler is probably the better one

It would be easy to write this as a scandal. The evidence does not support that, and the publisher's own arguments are worth stating plainly.

Retiring an evaluation is what a benchmark is supposed to do when models cluster at the top of it. SciCode and GDPval and AA-LCR were dropped because they had stopped separating the leading systems, and AA says so directly: the composition is "updated periodically: evaluations are added as models improve, and evaluations that no longer differentiate leading models are retired."

Moving to private test sets is a response to a real problem. When test questions are public, models get trained on them, and scores rise for reasons that have nothing to do with capability. Sixty per cent private or held-out answers is a serious attempt to price that out.

And the publisher is explicit that the two numbers are not the same measurement. From the methodology for its [new Progress Index](https://artificialanalysis.ai/methodology/progress-index): "Each version of the Intelligence Index is therefore measured on a different set of evaluations, and scores across versions are not intended for long-run comparison."

That sentence is the whole article in the publisher's own words. What it rules out is not the index. It rules out reading 55 and 46 as two readings of one quantity. They are readings of two quantities that happen to share a name, a dashboard, and a model.

## Part of the movement is not about the test set at all

Two further changes make the current scores harder to compare than the component list alone suggests.

Effort now matters much more. Artificial Analysis reports that Claude Opus 5.5 "scores 35 at low effort and 58 at max", and that Sonnet 5.5's spread across effort settings grew from 20 points to 29. A model's score is a statement about a configuration. Quoting a bare number without the effort setting is now closer to quoting a car's top speed without saying which gear.

The tasks also got longer. Median output tokens per Intelligence Index task rose by two thirds, from 35k to 59k. On the model's own page, Kimi's recorded output across the suite fell from 150M tokens to 110M — a different quantity, since the suite has fewer, heavier tasks — while its cost per task rose from $2.11 to $3.68 with its prices unchanged at $2 and $10 per million tokens.

Then there is a limit that surprised us. Even with every per-evaluation score published, the composite cannot be rebuilt from them. Eight of the nine v5 components are published as percentages, and at the published weights they account for 33.6 of Kimi's 46.0 points. The remaining 12.4 come from AA-Briefcase, which is scored as an Elo and not published as a percentage, which implies a value near 82.5 on whatever internal scale Artificial Analysis uses to fold Elo into the index. We could not find that conversion documented. An index you cannot recompute is an index you have to take on trust, however carefully it was built.

## The publisher's own answer: a second index

Alongside v5, Artificial Analysis launched the Progress Index v1, and it exists precisely because the Intelligence Index cannot do this job.

The Progress Index "estimates the general capability of language models on a single scale that is consistent over time", using item response theory. Rather than averaging whichever tests are currently in the composite, it estimates each task's difficulty and each model's capability together, and links models through the tasks they have in common. A model tested in 2024 and one tested last week can land on one scale without having sat the same exam.

![The mascot crosses a long corridor of small floor tiles, some lit and some dark, running between two separate scoreboards; the graffiti wall reads TIME, SCALE, SHARED, TASKS.](/images/index-v5-instrument-swap-progress.jpg)

The division of labour is stated plainly: the Intelligence Index remains "the recommended basis for comparing models for present-day use cases"; the Progress Index is "intended for analysis of capability over time."

Whether the Progress Index delivers that is a separate question, and one that deserves its own examination. That a publisher felt obliged to build a second instrument to answer "is this model better than last year's" is the clearest sign that the leaderboard number was not built to answer it.

## What to do with a leaderboard number

Five things, all of them cheap.

**Pin the version and the date.** A score without both is not a claim you can check. If a page or a press story hands you a number without one, that is the first thing worth asking about.

**Do not compare ranks across versions.** A rank is a ratio against a pool, and the pool changed size and membership. On 26 October Kimi's page read 4th of 215; on 1 November it read 21st of 58; coverage in between, relying on Gizmodo's reporting, put it ninth. Those are not three measurements of one thing. The score travels better than the rank does.

**Use the per-evaluation scores for questions about skills.** The composite is an editorial judgment about what intelligence is worth weighting. The components are measurements. If you care whether a model handles long terminal work, the benchmark that tests it survives every reweighting.

**Treat cost per task as part of the score.** Kimi's prices did not change, and its cost per index task rose 74% because the tasks got heavier. Budgets built on last month's cost per task are already wrong.

**Ask what the number is for.** If the question is "which model should I use today", the current index is the right instrument, and last week's number describes a different test. If the question is "how much better are models getting", the current index is the wrong instrument entirely, and the publisher has said so.

## What holds

The composite moved by nine points for Kimi and by a median of ten across the field, while the underlying measurements sat still. That is not a story about a model getting worse. It is a demonstration of what a versioned instrument does when it is replaced, and of how much public discussion of model quality rests on a number that can change its meaning without changing its name.

Two things would change this judgment. A re-measurement of the shared tests, showing that the identical digits were coincidence rather than continuity, would turn the finding into a snapshot artifact. And a published conversion from Elo to the index scale would let anyone check the arithmetic rather than inferring it, which would move this from an observation about opacity to a solved problem.

Neither exists yet. What exists is a page that said 55, then said 46, and a model that did nothing in between.

---

*Method: this piece compares two Wayback Machine captures of Artificial Analysis pages, taken 26 October 2026 and 1 November 2026, with the publisher's announcement, methodology pages, and the archived methodology as it stood on 27 October. Per-model scores and component values were parsed from the pages' own data rather than from prose, and the weighted-average figures are recomputation from published component scores at published weights. No evaluation was re-run and no model was called. Sources: [v5 announcement](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5), [Kimi launch analysis](https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks), [methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking), [Progress Index methodology](https://artificialanalysis.ai/methodology/progress-index).*
