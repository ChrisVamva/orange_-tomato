# October's Deep Dive: Models: Promises and Breakthroughs



![The Orange Tomato mascot — a tomato-headed robot in cracked dark armor — stands before a graffiti wall at night, its chest screen showing the article title; the wall is sprayed with the words October, claims, receipts, measured, and dated.](/images/october-2026-model-releases-lead.jpg)

October did not ship one model. It shipped a month.

From Mistral's Large 4 preview on 6 October to OpenAI's GPT-6.1 Terra on the 26th, the month gave
us a frontier release roughly every three days: a 1-trillion-parameter open-weight preview from
Paris, a new Haiku, Meta's first frontier models, Google's Gemini 4 Argon, a DeepSeek weight drop,
three unannounced OpenAI image models that appeared and vanished inside a day, a diffusion language
model that promised to make waiting obsolete, a stealth model with a rabbit name, an open-source
inference engine, a laptop coding model "largely built by AI", a Moonshot flagship that says it
deliberately weakened itself, and more.

Every one of them arrived as a sentence. And every sentence was really several claims bundled
together: fast and frontier-quality and cheap; safer and more capable; open and production-grade.
Launch weeks are loud. The question this piece asks is quieter: a month later, what can a reader
actually inspect?

Here is the answer this evidence supports. The load-bearing sentence of each launch outran what a
reader could verify on the day, and the gap is patterned rather than random. Some of what was
promised has held up well: the speed is real in the places it was promised, independent evaluators
have confirmed several of the month's biggest capability gains, and one vendor's benchmark table
turned out to be admirably self-critical. Some of it has not: the headline speed figures remain
four times above live traffic, the cost claims do not reproduce from published prices, "open" has
turned out to mean different things in different licenses, and the single most-cited independent
evaluator has still not measured the month's most promoted model. What this piece will not do is
tell you which model is good. Deciding that takes testing, and this piece ran none. What it
will give you is the habit the month actually rewards: ask who ran the test, with which instrument,
at which version, and what the sentence left out.

## The month at a glance

Dates and headline claims as published by the vendors; the last column is what a reader could
inspect on 28 October 2026.

| Date | Launch | Headline claim | A month later |
|---|---|---|---|
| 6 Oct | Mistral Large 4 preview | "outperforming any open-weight model developed in the US or Europe"; weights "by the end of the month" | Weights still unpublished as of 23 Oct |
| 7 Oct | Claude Haiku 5.5 | "cheapest, fastest, and most capable small model we've released" | Independently indexed (AA 36.2); became the month's comparison anchor |
| 12 Oct | Meta Muse Wonder / Wonder Full | "our most capable models to date… toward personal superintelligence" | AA measured 52/56 — a real, independently confirmed jump |
| 13 Oct | Gemini 4 Argon | "our most capable model"; released "without cyber guardrails to a select set of trusted defenders" | Live on the paid tier; own model card "could not rule out" critical cyber/bio levels |
| 17 Oct | DeepSeek-V4.1-Flash-1017 | "new performance-cost Pareto optimum" | Weights on Hugging Face; gains self-reported |
| 17–18 Oct | OpenAI "aurora" alphas | *nothing — OpenAI never announced them* | Still unannounced; identity a guess |
| 19 Oct | Mercury 3 | "most capable diffusion-based LLM… outperforms GPT-6 Luna and Claude Haiku 5.5… 4–8× faster at 1,000+ tokens per second" | Live median ~241 tok/s; no independent evaluator page yet |
| 19 Oct | MiniMax M3.1 Flash | "generational leap… nearly three times faster… 70% lower usage cost" | Weights public; cost/speed sentences not independently reproduced |
| 20 Oct | DeepSeek DeepInfer | the production inference stack, open-sourced | Incomplete serving stack; "no independent benchmarking of DeepInfer's efficiency gains" |
| 21 Oct | Recursive Flint | a laptop coding model "largely built by AI" | Speed class independently confirmed; the AI-built-AI claim unverified |
| 23 Oct | Moonshot Kimi K3.1 Pro | capability removal before an irreversible release; weights "by Nov 4" | No weights, no license, seven days to the deadline |
| 26 Oct | OpenAI GPT-6.1 Terra | "fast, efficient… Critical in cybersecurity" (its own assessment) | Live; on its own benchmarks "on-par with its predecessor" |

That is a lot of market in twenty days. Now the three launches where the gap between sentence and
evidence is most instructive.

## Kimi K3.1 Pro: what was removed before letting go

![The mascot stands with its back partly to the viewer, studying a graffiti wall sprayed with removed, weights, license, before, and after.](/images/october-2026-model-releases-kimi.jpg)

By 4 November, Moonshot AI has promised to hand over the files. Kimi K3.1 Pro has been available
through the company's apps and API since 23 October, but the full weights — the files that let
anyone run and modify the model on their own hardware — are promised "by Nov 4". Once files like
that are widely distributed, the developer has less ability to restrict access, monitor use, or
update safeguards than it does with a hosted service. That part is what open weights mean.

What made this launch interesting is what Moonshot says it did first. Before letting go of the
model, it says, it deliberately removed some of its cyber-offensive capability. Two claims travelled
out of launch week: that a Chinese model is closing in on Anthropic's Claude Opus 5.5, and that a
lab weakened its own model on purpose before an irreversible release. For a reader deciding what to
rely on, they are not equally load-bearing.

The leaderboard claim rests on the [Artificial Analysis Intelligence Index](https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks),
where K3.1 Pro scores 55 — fourth place, eleven points above its predecessor, three behind Claude
Opus 5.5's 58. Artificial Analysis runs its own evaluations instead of only republishing vendor
numbers, and its launch analysis is the strongest independent evidence in the set: large agentic
gains, measured outside the vendor. Two cautions belong beside it. A composite index is a bundle of
evaluations, not a verdict on capability, and the most quoted sentence in the analysis is about the
future: once the weights are released, it says, K3.1 Pro "will be the highest-scoring open weights
model". That is a conditional statement about an event that has not happened.

Here is the small puzzle from launch week that is more useful than the rankings. Terminal-Bench 4.0
tests coding agents on real tasks in a terminal. In [Moonshot's benchmark table](https://www.kimi.ai/blog/kimi-k3-1-pro),
K3.1 Pro scores 65.7% — narrowly behind Claude Opus 5.5's 66.4%. In Artificial Analysis's own run,
the same model on the same benchmark scores 67%, which the analysis calls the highest score of any
model on it. Neither number is a mistake. Moonshot ran its model with Anthropic's Claude Code
harness and assembled its comparison column from the best numbers others had published; Artificial
Analysis ran its own settings. A reader who sees "narrowly behind" and a reader who sees "highest
score" are both reading launch week accurately. The table is a mixed document: part measurement,
part compilation. Moonshot's footnote disclosure of this is better than most.

Now the safety claim, which is the part with direct consequences. Moonshot says vulnerability-
research performance kept improving as post-training scaled, that it traced the cause to
cyber-related data in training and in the reinforcement-learning environment, and that it removed
data from both for the open-weights release while keeping general coding. Then it measured the
cost. On xdev-bench-hard, an in-house benchmark built from recently disclosed software flaws, the
checkpoint without the measures solves 90.5% of problems; the released K3.1 Pro solves 81.0%
(pass@3 — at least one of three attempts succeeds).

That comparison is both the strongest and the weakest evidence in the launch. Strongest, because a
before/after against the same training pipeline is the right shape of experiment. Weakest, because
every number in it is the company's own: the benchmark is in-house, the "without" checkpoint will
never be released, and [Reuters noted plainly](https://www.investing.com/news/stock-market-news/moonshot-curbs-hacking-ability-in-new-kimi-model-as-fears-grow-over-aipowered-cyberattacks-4970639)
that "the results have not been independently verified." The trend inside the numbers complicates
the message too: the released model's 81.0% is about two and a half times its predecessor's 33.3%,
and Moonshot says outright that stronger general coding capability "generalize[s] to cyber tasks
even after targeted data removal". The cut lowered a level. It did not remove a capability, and it
did not set a ceiling.

The same lesson applies to hallucination. Moonshot's internal stress test shows the claim-level
hallucination rate falling from 23.4% to 8.3%, with the company's own caveat that the numbers "do
not represent overall error rates in daily use". Artificial Analysis, using a different instrument,
measured the same behavior falling from 53% to 44%. Both show improvement. The absolute levels
differ several-fold, because they are different instruments asking different questions. "The
hallucination rate" is not one number.

Why remove capability before letting go? Because letting go is the point. On the hosted API, the
capability level is Moonshot's to manage. On the day the weights ship, the level is set, and
everything after that belongs to whoever holds the files. A deliberate reduction is one of the few
levers a lab still has before that day, and unlike a terms-of-service clause, it travels with the
model itself. Moonshot's stated policy is narrower than the headlines suggested: "we aim not to
release open weights that would extend the absolute frontier of cyber capability" — a company
policy with self-defined thresholds, not an industry standard.

One more part of this story deserves its own paragraph. The launch came days after China proposed
export controls on AI-driven malware-generation technology, and it arrived into a year of
accusations: in February, [Anthropic alleged](https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks)
industrial-scale distillation campaigns by DeepSeek, Moonshot, and MiniMax — an accusation by an
interested party, not adjudicated. In July, the White House's science adviser went further,
alleging US government information that Moonshot distilled a Claude model to build Kimi K3; the
Treasury warned sanctions were "on the table"; Moonshot rejected the distillation explanations.
A reading in which the capability cut is partly regulatory positioning fits the same evidence as
the safety reading. The company's stated reasons are on record. Its motive is not inspectable, and
this piece will not pretend otherwise.

One month on, the promised evidence does not exist yet. As of 28 October, Moonshot's blog carries
no release announcement, and the company's Hugging Face organization lists no K3.1 Pro repository —
its newest repo is Kimi K3, from June. The deadline is seven days out and unmodified. When the
files arrive, two things become readable that are not readable now: whether the conditional holds
(that this is in fact the highest-scoring open-weights model), and the license. K3.1 Pro's terms
have not been published; the only guide is its predecessor's [license](https://huggingface.co/moonshotai/Kimi-K3/raw/main/LICENSE),
which allows commercial use but requires a separate agreement for large "Model as a Service"
businesses. If you plan to build on the model, read the license before the model: the terms, not
the benchmark table, decide what you may build.

## Mercury 3: fast is real; the sentence is not

![In profile, the mascot walks past a long graffiti wall in the rain; the wall is sprayed with speed, live, promo, silent, and stack.](/images/october-2026-model-releases-mercury.jpg)

On 19 October, Inception released Mercury 3, its flagship diffusion-based language model. The
announcement made two claims together: the model is "the most capable diffusion-based LLM released
to date", and it "outperforms GPT-6 Luna and Claude Haiku 5.5" while running 4–8× faster at more
than 1,000 tokens per second — "a new Pareto frontier in speed and intelligence", per the [launch
post](https://www.inceptionlabs.ai/blog/introducing-mercury-3).

If the claim were simply "fast and cheap", it would be a small story. The claim that matters is
the combination: frontier quality and speed at a low price would change the default math for anyone
building a latency-sensitive product. So it is worth separating the sentence into its parts.

Start with speed, where the model is genuinely good and the headline is genuinely misleading. Every
large language model you have used recently is autoregressive: it writes one token at a time, each
step depending on the last. Diffusion models start from a block of noisy, unfinished text and
refine the whole block over several rounds, committing many token positions per pass. That is why
they can feel fast. But "1,068 tokens per second" is a throughput number measured in a vendor test
environment, and real-world speed depends on time-to-first-token, batch size, context length, and
the GPU behind the service.

The best public picture of what actual users get is [OpenRouter's live statistics](https://openrouter.ai/inception/mercury-3).
In the week after launch they showed a median of about 243 tokens per second with a 1.4-second wait
before output started. On 28 October, the page showed roughly the same: about 241 tokens per second
at the median, a one-week median of 255 with the tail falling fast (a 90th-percentile request saw
121 tokens per second; a 99th-percentile request saw 52). That is not a like-for-like comparison —
a vendor benchmark and mixed live traffic measure different things — but it is a quarter of the
headline number, and it has stayed there for a month.

Then quality, where the evidence is a vendor table and a scatter of independent checks. Inception's
comparison table runs Mercury 3 and its two rivals at "medium" reasoning effort, all three measured
by Inception, with no published harness. Mercury 3 wins 8 of 12 benchmarks on it, including
instruction following and short agentic tasks, and loses several: Claude Haiku 5.5 beats it on a
long-horizon coding benchmark, GPT-6 Luna edges it on long-context reasoning. Artificial Analysis
cautioned that two of the table's scores do not follow its methodology and are not comparable to
its own. Independent reporting summarized the table as "a speed story with competitive quality,
not a clean sweep", which matches the shape of the numbers.

The most useful independent evidence came from a community harness published on GitHub: 637 code
problems, five tries each, against the fast tiers of four rivals and an autoregressive control on
ultra-fast hardware. Mercury 3 passed 86.0% with a 0.83-second median response — roughly tying
Claude Haiku 5.5 (86.1% at 0.97 seconds) and edging GPT-6 Luna (83.2% at 1.28 seconds). The speed
is real: about 850–900 visible tokens per second in that setup, six times Luna's. But the Cerebras-
hosted autoregressive control passed 84.9% at 0.34 seconds — within a point of Mercury, at less
than half the wait. As the tester put it, the speed is a property of model plus serving stack, not
of diffusion alone.

In an agent loop the same harness found richer texture: Mercury 3 finished SQL tasks at a 2.05-
second median against Haiku's 3.87, even though Haiku was several points more accurate and made
fewer calls. Per-call speed compounds across turns, but a faster model that needs more turns or
gets more wrong does not automatically win. And there was a failure mode worth knowing about: 7.5–8.6%
of Mercury 3's code calls "reasoned silently" until the token cap and returned nothing, consuming
61% of the model's output tokens in that test. No other tested model did this even once. For a
real application, that means a slice of requests can come back empty after burning your token
budget.

Which brings the price. At launch, the model lists at $0.20 per million input tokens and $0.70 per
million output, with a 50%-off promotion at $0.10 and $0.35. On 28 October, nine days after launch,
the promotion was still running and no end date had been posted. Cheap per token is real. Cheap per
correct answer is a different question: at the promo price, the same harness computed that a
thousand passing code answers cost about $0.59 on Mercury 3, against $0.07 for GPT-6 Luna with
reasoning off — which was nearly as accurate and faster on that task. The silent failures add to
the bill, because wasted output tokens still cost money. Budget for empty responses and plan for
prices to double when the promotion ends.

Two loose ends from this launch deserve flagging. First, a fixed date: Inception closed Mercury 2
and 2.5 to new sign-ups, and existing customers lose access on 15 November — a migration decision
on a calendar, with the natural replacement being a model with different pricing and different
failure behavior. Second, an honesty note in the record: this section's account of Mercury 3 draws
on launch materials and published independent checks, and part of the original material behind it
was drafted with assistance from the product under review — a fact disclosed here and the reason
none of the testing above is presented as our own.

One month on, the decisive check is still missing: Artificial Analysis, the evaluator most cited at
launches like this, has no Mercury 3 page at all. Its Inception page lists Mercury 2 and Mercury
2.5 and stops. The flagship quality sentence remains unmeasured by the independent evaluator whose
measurement the coverage kept asking for.

## MiniMax M3.1 Flash: the layers, one month on

![Seen from below, the mascot stands at a corner of layered, torn graffiti; the wall shows 428B, 220B, bunny, license, and layers.](/images/october-2026-model-releases-minimax.jpg)

For about ten days in the autumn, one of the most-used models on OpenRouter was one nobody could
name. It was listed as "Space Bunny Alpha". On 19 October, [MiniMax said](https://minimax.io/blog/minimax-m31f)
what it had been: an early version of MiniMax M3.1 Flash. The reveal settled who made the unnamed
model and attached a much larger bundle of claims to it: popularity, speed, cost, benchmarks, and
downloadable weights.

The usage numbers are the easiest place to get lost. MiniMax's launch blog says Space Bunny
"processed more than 200 trillion tokens". OpenRouter's launch thread said 56.7 trillion. The
stealth page's own activity widget showed roughly 4 trillion prompt tokens. These can all be
accurate descriptions of different periods and different scopes. The thing to notice is what none
of them is: a measure of quality. Token volume counts how much text went in and came out; a rank
on tokens is a rank on traffic.

The claims themselves came from MiniMax: a "generational leap" in agentic tasks, coding, computer
use, and cybersecurity; online inference "nearly 3× faster"; usage costs "down 70%"; "200+ TPS"
everyday output. The 70%, read carefully in the blog, is about the cost of a completed agent task,
which the post does not define. On list prices the arithmetic goes differently: Flash lists at
$0.15/$0.60 per million against its predecessor's $0.60/$2.40 — a quarter of the undiscounted
price, or half of the "permanent 50% off" price, not one-third. And a list price is not a bill: it
excludes retries, tool calls, thinking tokens, and human review. On OpenRouter, other hosts served
the same model cheaper than MiniMax's own list rate, and heavy cache use dragged the weighted
average input cost near $0.02.

The benchmark story is where a month of perspective really helps, because launch week mixed two
different instruments with nearly identical names. MiniMax's blog prose says the model "ranks among
the top performers on AutomationBench-AA" — no number attached. Its launch post on X says
"Automation-Bench: 62%". The [model card on Hugging Face](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash)
tables "Automation-Bench v1.0.6" at 62.8, footnoted as 600 publicly released tasks. And the number
that travelled furthest — "72.5% on AutomationBench-AA" — appears in launch-partner posts,
including OpenRouter's thread, restating MiniMax. The resolution is structural: AutomationBench-AA
is not a shorthand for Automation-Bench v1.0.6. It is one of Artificial Analysis's own nine
evaluations in its Intelligence Index, and Artificial Analysis measured the model at 73% on it.
The 72.5 and the 62.8 are two different benchmarks with near-identical names, and coverage that
fused them was combining figures that appear together in no single source. A smaller mystery
remains: launch coverage read 62.2 from the blog's chart, and the chart now shows 62.8.

The independent measurements disagree with the vendor card in the expected direction and one
unexpected one. Artificial Analysis put the model's Intelligence Index at 43 at launch week; on
28 October its page shows 29. Both readings are real, and they are not the same measurement: the
index is a versioned instrument, now v5.0, with a component set that changed with the version. The
cost per index task on the same page moved from $0.22 to $0.49 over the same three days. Any
citation of "the Intelligence Index" without a version and a date is not reproducible. On
Terminal-Bench 4.0, two third-party runs scored the model at 25.8% and 25.3% against MiniMax's
tabled 38.1% — different harnesses, different questions.

One independent check cuts the other way, and it belongs here as much as the discrepancies: Plotly's
published data-analytics exam put M3.1 Flash at 41 of 43, tying Claude Opus 5.5, Gemini 4 Argon,
Muse Wonder, and GPT-6 Sol, with the Space Bunny preview behind at 38. And MiniMax's own model
card is admirably self-critical: its table shows DeepSeek's new open model beating M3.1 Flash on
DeepSWE and on Terminal-Bench 4.0, and it notes where it borrowed a competitor's score directly
rather than re-running it. Vendor tables do not only flatter.

The weights arrived on 23 October, as promised, and they are the most inspectable layer of the
launch. The [Hugging Face repository](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash) is open,
not access-gated, and the model card describes a multimodal mixture-of-experts architecture with
"Approximately 428B total; 23B activated per token". But the same repository's metadata sidebar
reports a model size of 220.49 billion parameters, and the release's config.json carries no
parameter count at all. Packing formats can make raw element counts differ from parameter counts —
and a month on, the two official numbers still sit on the same page with no explanation.

The word "open" also needs a boundary. The [license](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash/raw/main/LICENSE)
is MiniMax's own community license, not an open-source one by the standard definition: free
non-commercial use, a "Built with MiniMax M3.1-Flash" display requirement for commercial use, and
prior written authorization for companies above $20 million in yearly revenue. Downloadable is not
the same as runnable on your laptop, either: a model this size needs far more memory than a
personal computer has. For most readers the practical form of M3.1 Flash remains an API call.

One month on, the free window is over: OpenRouter's page carries the banner, in MiniMax's colors,
that "The free launch period ended Oct 22, 2026" and the model "is now served at list price". The
host spread is its own lesson — the same weights served at speeds from 31 to 166 tokens per second
depending on which provider answers. And Artificial Analysis's page, the independent one, still
labels the model proprietary and answers its own FAQ with "the model weights are not publicly
available" — five days after they went public. Independent pages lag too.

## The rest of October, kept brief

A few more of the month's moves belong in the record, mostly as reminders that the three stories
above are samples of a pattern.

DeepSeek open-sourced DeepInfer, its production inference framework, on 20 October under Apache-2.0.
The [repository](https://github.com/deepseek-ai/deepinfer) is real and substantial, and inspection
shows its boundaries honestly listed: the KV cache system, prefill/decode disaggregation, and
load balancing are not included, so the release is an offline inference engine rather than a
complete serving stack. [Bloomberg's coverage](https://www.bloomberg.com/news/articles/2026-10-20/deepseek-unveils-open-source-tool-to-help-cut-ai-operating-costs)
of the release noted that no independent benchmarking of the efficiency gains exists yet.

Recursive released Flint, a laptop-sized coding model, on 21 October, with the claim that its
automated research system built nearly every part of the pipeline. [TechCrunch measured](https://techcrunch.com/2026/10/21/recursive-launches-flint-a-laptop-coding-model-it-says-was-largely-built-by-ai/)
about 131 tokens per second on a MacBook Pro — roughly double comparable small models on the same
machine. The speed claim has an independent check. The "AI builds AI" claim rests on the company's
own account, and has no auditable development record behind it.

OpenAI's aurora models never got a launch at all: three undocumented IDs appeared in the API on
17 October, were pulled within hours, and then surfaced generating images in blind community tests.
No documentation, no pricing, no announcement — and the identification of them as a GPT-Image-3
successor remains a guess.

Three more moves round out the picture. Mistral promised Large 4's weights "by the end of the
month" and had not published them by the 23rd. Google shipped Gemini 4 Argon with an unusual
companion build, a version released "without cyber guardrails to a select set of trusted
defenders", while its own model card says it could not rule out critical cyber and biological
capability levels. OpenAI classified GPT-6.1 Terra as "Critical in cybersecurity" in its own system
card, with its own production benchmarks showing it "on-par with its predecessor". Capability and safety statements are increasingly part of the launch
sentence. They are also, almost always, the vendor's own assessments.

## The pattern: who ran the test, with which instrument, at which version

![The mascot sits on a step before a low wall where harness, version, price, license, and promised are sprayed in one row; the city glows dimly behind.](/images/october-2026-model-releases-pattern.jpg)

Put the three stories side by side and the same seven questions keep deciding what a claim is worth.

![Diagram: a launch sentence decomposed into five evidence checks — who ran the test, which instrument and version, what the price excludes, what the license says, and what live traffic shows.](/diagrams/october-2026-model-releases-layers.svg)

**One name, two benchmarks.** The AutomationBench collision is the cleanest example of the month:
62.8 and 72.5 were both true, both cited at launch, and measured by different instruments with
nearly identical names. The figure's journey does not stop there — the vendor's own chart appears
to have been revised from 62.2 to 62.8 after launch coverage read it. When a number is quoted
without its exact benchmark name and version, it cannot be checked.

**The instrument moves.** The Artificial Analysis Intelligence Index for M3.1 Flash was 43 on
25 October and 29 on 28 October, and the cost per task moved with it. Nothing about the model
changed. The index did — it is now v5.0. A composite score is a versioned instrument, and
cross-version comparisons are not comparisons.

**Speed depends on the stack.** The month's two big speed claims — 1,068 tokens per second,
"200+ TPS" — both ran into live traffic a fraction of the headline, with wide spreads depending on
which host answered. Mercury 3's own control experiment showed a traditional model on fast
hardware matching its latency. Speed claims are claims about a configuration.

**What token volume counts.** Three incompatible token counts for one stealth model, and not one
of them measures whether the output was right.

**What the price leaves out.** "One-third the cost" did not reproduce from published prices; "70%
lower usage cost" was defined against a task the vendor did not define; per-correct-answer costs
favored a rival model at the same table; and the promotion prices have no end date.

**"Open" has conditions.** Four different flavors in one month: promised weights (Moonshot,
Mistral), weights with a community license and revenue thresholds (MiniMax), an open engine with
the serving stack deliberately not included (DeepSeek), and downloadable files too large to run on
the machines most readers own. The license text and the file list are the claim.

**Independent pages lag too.** The most-cited evaluator still had not measured Mercury 3 a month
on, and its MiniMax page still described publicly downloadable weights as unavailable. "Check an
independent source" is the right instinct; the independent source is also a maintained page with a
backlog.

None of this makes the month a fraud. The pattern is what normal launch weeks look like when every
headline carries several claims at once: the claims are load-bearing sentences with more supports
than the evidence provides. And the counterevidence matters as much as the discrepancies. Artificial
Analysis independently confirmed Moonshot's large agentic gains. Plotly's exam tied MiniMax's model
with four frontier systems. TechCrunch confirmed Flint's speed class. Moonshot disclosed its mixed
table methods in footnotes; MiniMax's card showed rivals winning rows. The month's vendors were not
unusually dishonest. The sentences were unusually big.

## What you can inspect

What follows is editorial guidance from the month's evidence. Seven questions decided every dispute
above, and they work as a checklist for the next launch week:

1. **Who ran the test?** Vendor, independent evaluator, platform statistics, or a community
   harness — each answers a different question.
2. **Which instrument, at which version?** A benchmark name and a number is not a claim until the
   version and harness are pinned.
3. **What does the price exclude?** Retries, thinking tokens, tool calls, cache assumptions, and
   the promotion's end date.
4. **What does the license actually say?** "Open weights" describes files, not permissions.
5. **What does live traffic show?** Platform medians are the closest thing to a user's experience
   on the day.
6. **Promised or shipped?** Weights "by Nov 4" and weights in a repository are different facts.
7. **What is the sentence not saying?** Every launch sentence in this piece was true of a narrower
   claim than the one a reader heard.

## What changes the judgment

Within days, the first real test of this month's most consequential promise arrives: if Moonshot's
weights land on 4 November, the license text, the parameter files, and the first independent tests
become readable — and the question of what capability travels with open weights becomes an evidence
question instead of a policy argument. Beyond that: an Artificial Analysis Mercury 3 page would
settle the quality half of Inception's sentence; a reproducible cost-per-correct-answer
measurement would settle what "70% lower usage cost" means; a parameter census of MiniMax's files
would close the 428-versus-220 gap; Mistral's promised weights would close the month's other open
promise.

Until then, the honest position is the checklist. The month's launches are real, and several of
their gains are independently confirmed. Every headline sentence is still bigger than the evidence
behind it, because only some of its parts come with receipts.

*Companion notebook (scrollable, ten pages): [October's Deep Dive — the notebook](/notebook/october-2026-model-releases-notebook.html).*

## Sources and method

This is desk research: a source review of published documents, with a one-month-later verification
pass conducted 28 October 2026. No model was run, queried, or tested; every figure is attributed
to the party that measured it, and every moving figure is dated. Launch-week material on Kimi K3.1
Pro, Mercury 3, and MiniMax M3.1 Flash was inspected for this piece from primary sources: Moonshot's
[launch blog](https://www.kimi.ai/blog/kimi-k3-1-pro) and [Artificial Analysis's launch analysis](https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks)
(23 Oct); Inception's [launch post](https://www.inceptionlabs.ai/blog/introducing-mercury-3) (19 Oct);
MiniMax's [launch blog](https://minimax.io/blog/minimax-m31f) and [Hugging Face model card](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash)
(19–23 Oct); [OpenRouter listings](https://openrouter.ai/inception/mercury-3) and [Artificial Analysis pages](https://artificialanalysis.ai/models/minimax-m3-1-flash)
(re-read 28 Oct). Independent checks: the [community Mercury 3 harness](https://github.com/zbruceli/mercury3),
Plotly's [data-analytics exam](https://plotly.com/blog/minimax-m3-1-flash-plotly-data-analytics-bench/),
and third-party benchmark aggregations, each cited at point of claim. October timeline entries rest
on the vendors' own release pages — [Mistral's launch post](https://mistral.ai/news/mistral-large-4/),
[Meta's announcement](https://about.fb.com/news/2026/10/introducing-muse-wonder-models/), [Google's
Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) and [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/gemini-4-argon-available-on-google-cloud),
[OpenAI's system-card addendum](https://deploymentsafety.openai.com/gpt-6-1-terra) — and
contemporaneous trackers; table claims are vendor claims as published. Access notes: posts on X were read
through a third-party mirror where the platform was not directly reachable; BusinessWire's original
release returned a 403 and was read via its syndicated copy. Material limits: in-house benchmarks
(Moonshot's xdev-bench and hallucination suite, MiniMax's security evaluations) cannot be audited;
the Moonshot weights and license, Mistral's weights, and the aurora models' identity are unshipped
or unannounced as of 28 October 2026. Disclosure: part of the original Mercury 3 material behind
this piece was drafted with assistance from the product under review; no independent evidence here
is presented as our own testing. Where information about DeepSeek DeepInfer, Flint, and the aurora
models appears above, it is drawn from the primary sources cited, not from any other publication of
ours.
