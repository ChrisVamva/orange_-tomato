8|# October's Deep Dive: Models: Promises and Breakthroughs
9|
10|
11|
12|![The Orange Tomato mascot — a tomato-headed robot in cracked dark armor — stands before a graffiti wall at night, its chest screen showing the article title; the wall is sprayed with the words October, claims, receipts, measured, and dated.](/images/october-2026-model-releases-lead.jpg)
13|
14|October did not ship one model. It shipped a month.
15|
16|From Mistral's Large 4 preview on 6 October to OpenAI's GPT-6.1 Terra on the 26th, the month gave
17|us a frontier release roughly every three days: a 1-trillion-parameter open-weight preview from
18|Paris, a new Haiku, Meta's first frontier models, Google's Gemini 4 Argon, a DeepSeek weight drop,
19|three unannounced OpenAI image models that appeared and vanished inside a day, a diffusion language
20|model that promised to make waiting obsolete, a stealth model with a rabbit name, an open-source
21|inference engine, a laptop coding model "largely built by AI", a Moonshot flagship that says it
22|deliberately weakened itself, and more.
23|
24|Every one of them arrived as a sentence. And every sentence was really several claims bundled
25|together: fast and frontier-quality and cheap; safer and more capable; open and production-grade.
26|Launch weeks are loud. The question this piece asks is quieter: a month later, what can a reader
27|actually inspect?
28|
29|Here is the answer this evidence supports. The load-bearing sentence of each launch outran what a
30|reader could verify on the day, and the gap is patterned rather than random. Some of what was
31|promised has held up well: the speed is real in the places it was promised, independent evaluators
32|have confirmed several of the month's biggest capability gains, and one vendor's benchmark table
33|turned out to be admirably self-critical. Some of it has not: the headline speed figures remain
34|four times above live traffic, the cost claims do not reproduce from published prices, "open" has
35|turned out to mean different things in different licenses, and the single most-cited independent
36|evaluator has still not measured the month's most promoted model. What this piece will not do is
37|tell you which model is good. Deciding that takes testing, and this piece ran none. What it
38|will give you is the habit the month actually rewards: ask who ran the test, with which instrument,
39|at which version, and what the sentence left out.
40|
41|## The month at a glance
42|
43|Dates and headline claims as published by the vendors; the last column is what a reader could
44|inspect on 28 October 2026.
45|
46|| Date | Launch | Headline claim | A month later |
47||---|---|---|---|
48|| 6 Oct | Mistral Large 4 preview | "outperforming any open-weight model developed in the US or Europe"; weights "by the end of the month" | Weights still unpublished as of 23 Oct |
49|| 7 Oct | Claude Haiku 5.5 | "cheapest, fastest, and most capable small model we've released" | Independently indexed (AA 36.2); became the month's comparison anchor |
50|| 12 Oct | Meta Muse Wonder / Wonder Full | "our most capable models to date… toward personal superintelligence" | AA measured 52/56 — a real, independently confirmed jump |
51|| 13 Oct | Gemini 4 Argon | "our most capable model"; released "without cyber guardrails to a select set of trusted defenders" | Live on the paid tier; own model card "could not rule out" critical cyber/bio levels |
52|| 17 Oct | DeepSeek-V4.1-Flash-1017 | "new performance-cost Pareto optimum" | Weights on Hugging Face; gains self-reported |
53|| 17–18 Oct | OpenAI "aurora" alphas | *nothing — OpenAI never announced them* | Still unannounced; identity a guess |
54|| 19 Oct | Mercury 3 | "most capable diffusion-based LLM… outperforms GPT-6 Luna and Claude Haiku 5.5… 4–8× faster at 1,000+ tokens per second" | Live median ~241 tok/s; no independent evaluator page yet |
55|| 19 Oct | MiniMax M3.1 Flash | "generational leap… nearly three times faster… 70% lower usage cost" | Weights public; cost/speed sentences not independently reproduced |
56|| 20 Oct | DeepSeek DeepInfer | the production inference stack, open-sourced | Incomplete serving stack; "no independent benchmarking of DeepInfer's efficiency gains" |
57|| 21 Oct | Recursive Flint | a laptop coding model "largely built by AI" | Speed class independently confirmed; the AI-built-AI claim unverified |
58|| 23 Oct | Moonshot Kimi K3.1 Pro | capability removal before an irreversible release; weights "by Nov 4" | No weights, no license, seven days to the deadline |
59|| 26 Oct | OpenAI GPT-6.1 Terra | "fast, efficient… Critical in cybersecurity" (its own assessment) | Live; on its own benchmarks "on-par with its predecessor" |
60|
61|That is a lot of market in twenty days. Now the three launches where the gap between sentence and
62|evidence is most instructive.
63|
64|## Kimi K3.1 Pro: what was removed before letting go

![The mascot stands with its back partly to the viewer, studying a graffiti wall sprayed with removed, weights, license, before, and after.](/images/october-2026-model-releases-kimi.jpg)
65|
66|By 4 November, Moonshot AI has promised to hand over the files. Kimi K3.1 Pro has been available
67|through the company's apps and API since 23 October, but the full weights — the files that let
68|anyone run and modify the model on their own hardware — are promised "by Nov 4". Once files like
69|that are widely distributed, the developer has less ability to restrict access, monitor use, or
70|update safeguards than it does with a hosted service. That part is what open weights mean.
71|
72|What made this launch interesting is what Moonshot says it did first. Before letting go of the
73|model, it says, it deliberately removed some of its cyber-offensive capability. Two claims travelled
74|out of launch week: that a Chinese model is closing in on Anthropic's Claude Opus 5.5, and that a
75|lab weakened its own model on purpose before an irreversible release. For a reader deciding what to
76|rely on, they are not equally load-bearing.
77|
78|The leaderboard claim rests on the [Artificial Analysis Intelligence Index](https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks),
79|where K3.1 Pro scores 55 — fourth place, eleven points above its predecessor, three behind Claude
80|Opus 5.5's 58. Artificial Analysis runs its own evaluations instead of only republishing vendor
81|numbers, and its launch analysis is the strongest independent evidence in the set: large agentic
82|gains, measured outside the vendor. Two cautions belong beside it. A composite index is a bundle of
83|evaluations, not a verdict on capability, and the most quoted sentence in the analysis is about the
84|future: once the weights are released, it says, K3.1 Pro "will be the highest-scoring open weights
85|model". That is a conditional statement about an event that has not happened.
86|
87|Here is the small puzzle from launch week that is more useful than the rankings. Terminal-Bench 4.0
88|tests coding agents on real tasks in a terminal. In [Moonshot's benchmark table](https://www.kimi.ai/blog/kimi-k3-1-pro),
89|K3.1 Pro scores 65.7% — narrowly behind Claude Opus 5.5's 66.4%. In Artificial Analysis's own run,
90|the same model on the same benchmark scores 67%, which the analysis calls the highest score of any
91|model on it. Neither number is a mistake. Moonshot ran its model with Anthropic's Claude Code
92|harness and assembled its comparison column from the best numbers others had published; Artificial
93|Analysis ran its own settings. A reader who sees "narrowly behind" and a reader who sees "highest
94|score" are both reading launch week accurately. The table is a mixed document: part measurement,
95|part compilation. Moonshot's footnote disclosure of this is better than most.
96|
97|Now the safety claim, which is the part with direct consequences. Moonshot says vulnerability-
98|research performance kept improving as post-training scaled, that it traced the cause to
99|cyber-related data in training and in the reinforcement-learning environment, and that it removed
100|data from both for the open-weights release while keeping general coding. Then it measured the
101|cost. On xdev-bench-hard, an in-house benchmark built from recently disclosed software flaws, the
102|checkpoint without the measures solves 90.5% of problems; the released K3.1 Pro solves 81.0%
103|(pass@3 — at least one of three attempts succeeds).
104|
105|That comparison is both the strongest and the weakest evidence in the launch. Strongest, because a
106|before/after against the same training pipeline is the right shape of experiment. Weakest, because
107|every number in it is the company's own: the benchmark is in-house, the "without" checkpoint will
108|never be released, and [Reuters noted plainly](https://www.investing.com/news/stock-market-news/moonshot-curbs-hacking-ability-in-new-kimi-model-as-fears-grow-over-aipowered-cyberattacks-4970639)
109|that "the results have not been independently verified." The trend inside the numbers complicates
110|the message too: the released model's 81.0% is about two and a half times its predecessor's 33.3%,
111|and Moonshot says outright that stronger general coding capability "generalize[s] to cyber tasks
112|even after targeted data removal". The cut lowered a level. It did not remove a capability, and it
113|did not set a ceiling.
114|
115|The same lesson applies to hallucination. Moonshot's internal stress test shows the claim-level
116|hallucination rate falling from 23.4% to 8.3%, with the company's own caveat that the numbers "do
117|not represent overall error rates in daily use". Artificial Analysis, using a different instrument,
118|measured the same behavior falling from 53% to 44%. Both show improvement. The absolute levels
119|differ several-fold, because they are different instruments asking different questions. "The
120|hallucination rate" is not one number.
121|
122|Why remove capability before letting go? Because letting go is the point. On the hosted API, the
123|capability level is Moonshot's to manage. On the day the weights ship, the level is set, and
124|everything after that belongs to whoever holds the files. A deliberate reduction is one of the few
125|levers a lab still has before that day, and unlike a terms-of-service clause, it travels with the
126|model itself. Moonshot's stated policy is narrower than the headlines suggested: "we aim not to
127|release open weights that would extend the absolute frontier of cyber capability" — a company
128|policy with self-defined thresholds, not an industry standard.
129|
130|One more part of this story deserves its own paragraph. The launch came days after China proposed
131|export controls on AI-driven malware-generation technology, and it arrived into a year of
132|accusations: in February, [Anthropic alleged](https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks)
133|industrial-scale distillation campaigns by DeepSeek, Moonshot, and MiniMax — an accusation by an
134|interested party, not adjudicated. In July, the White House's science adviser went further,
135|alleging US government information that Moonshot distilled a Claude model to build Kimi K3; the
136|Treasury warned sanctions were "on the table"; Moonshot rejected the distillation explanations.
137|A reading in which the capability cut is partly regulatory positioning fits the same evidence as
138|the safety reading. The company's stated reasons are on record. Its motive is not inspectable, and
139|this piece will not pretend otherwise.
140|
141|One month on, the promised evidence does not exist yet. As of 28 October, Moonshot's blog carries
142|no release announcement, and the company's Hugging Face organization lists no K3.1 Pro repository —
143|its newest repo is Kimi K3, from June. The deadline is seven days out and unmodified. When the
144|files arrive, two things become readable that are not readable now: whether the conditional holds
145|(that this is in fact the highest-scoring open-weights model), and the license. K3.1 Pro's terms
146|have not been published; the only guide is its predecessor's [license](https://huggingface.co/moonshotai/Kimi-K3/raw/main/LICENSE),
147|which allows commercial use but requires a separate agreement for large "Model as a Service"
148|businesses. If you plan to build on the model, read the license before the model: the terms, not
149|the benchmark table, decide what you may build.
150|
151|## Mercury 3: fast is real; the sentence is not

![In profile, the mascot walks past a long graffiti wall in the rain; the wall is sprayed with speed, live, promo, silent, and stack.](/images/october-2026-model-releases-mercury.jpg)
152|
153|On 19 October, Inception released Mercury 3, its flagship diffusion-based language model. The
154|announcement made two claims together: the model is "the most capable diffusion-based LLM released
155|to date", and it "outperforms GPT-6 Luna and Claude Haiku 5.5" while running 4–8× faster at more
156|than 1,000 tokens per second — "a new Pareto frontier in speed and intelligence", per the [launch
157|post](https://www.inceptionlabs.ai/blog/introducing-mercury-3).
158|
159|If the claim were simply "fast and cheap", it would be a small story. The claim that matters is
160|the combination: frontier quality and speed at a low price would change the default math for anyone
161|building a latency-sensitive product. So it is worth separating the sentence into its parts.
162|
163|Start with speed, where the model is genuinely good and the headline is genuinely misleading. Every
164|large language model you have used recently is autoregressive: it writes one token at a time, each
165|step depending on the last. Diffusion models start from a block of noisy, unfinished text and
166|refine the whole block over several rounds, committing many token positions per pass. That is why
167|they can feel fast. But "1,068 tokens per second" is a throughput number measured in a vendor test
168|environment, and real-world speed depends on time-to-first-token, batch size, context length, and
169|the GPU behind the service.
170|
171|The best public picture of what actual users get is [OpenRouter's live statistics](https://openrouter.ai/inception/mercury-3).
172|In the week after launch they showed a median of about 243 tokens per second with a 1.4-second wait
173|before output started. On 28 October, the page showed roughly the same: about 241 tokens per second
174|at the median, a one-week median of 255 with the tail falling fast (a 90th-percentile request saw
175|121 tokens per second; a 99th-percentile request saw 52). That is not a like-for-like comparison —
176|a vendor benchmark and mixed live traffic measure different things — but it is a quarter of the
177|headline number, and it has stayed there for a month.
178|
179|Then quality, where the evidence is a vendor table and a scatter of independent checks. Inception's
180|comparison table runs Mercury 3 and its two rivals at "medium" reasoning effort, all three measured
181|by Inception, with no published harness. Mercury 3 wins 8 of 12 benchmarks on it, including
182|instruction following and short agentic tasks, and loses several: Claude Haiku 5.5 beats it on a
183|long-horizon coding benchmark, GPT-6 Luna edges it on long-context reasoning. Artificial Analysis
184|cautioned that two of the table's scores do not follow its methodology and are not comparable to
185|its own. Independent reporting summarized the table as "a speed story with competitive quality,
186|not a clean sweep", which matches the shape of the numbers.
187|
188|The most useful independent evidence came from a community harness published on GitHub: 637 code
189|problems, five tries each, against the fast tiers of four rivals and an autoregressive control on
190|ultra-fast hardware. Mercury 3 passed 86.0% with a 0.83-second median response — roughly tying
191|Claude Haiku 5.5 (86.1% at 0.97 seconds) and edging GPT-6 Luna (83.2% at 1.28 seconds). The speed
192|is real: about 850–900 visible tokens per second in that setup, six times Luna's. But the Cerebras-
193|hosted autoregressive control passed 84.9% at 0.34 seconds — within a point of Mercury, at less
194|than half the wait. As the tester put it, the speed is a property of model plus serving stack, not
195|of diffusion alone.
196|
197|In an agent loop the same harness found richer texture: Mercury 3 finished SQL tasks at a 2.05-
198|second median against Haiku's 3.87, even though Haiku was several points more accurate and made
199|fewer calls. Per-call speed compounds across turns, but a faster model that needs more turns or
200|gets more wrong does not automatically win. And there was a failure mode worth knowing about: 7.5–8.6%
201|of Mercury 3's code calls "reasoned silently" until the token cap and returned nothing, consuming
202|61% of the model's output tokens in that test. No other tested model did this even once. For a
203|real application, that means a slice of requests can come back empty after burning your token
204|budget.
205|
206|Which brings the price. At launch, the model lists at $0.20 per million input tokens and $0.70 per
207|million output, with a 50%-off promotion at $0.10 and $0.35. On 28 October, nine days after launch,
208|the promotion was still running and no end date had been posted. Cheap per token is real. Cheap per
209|correct answer is a different question: at the promo price, the same harness computed that a
210|thousand passing code answers cost about $0.59 on Mercury 3, against $0.07 for GPT-6 Luna with
211|reasoning off — which was nearly as accurate and faster on that task. The silent failures add to
212|the bill, because wasted output tokens still cost money. Budget for empty responses and plan for
213|prices to double when the promotion ends.
214|
215|Two loose ends from this launch deserve flagging. First, a fixed date: Inception closed Mercury 2
216|and 2.5 to new sign-ups, and existing customers lose access on 15 November — a migration decision
217|on a calendar, with the natural replacement being a model with different pricing and different
218|failure behavior. Second, an honesty note in the record: this section's account of Mercury 3 draws
219|on launch materials and published independent checks, and part of the original material behind it
220|was drafted with assistance from the product under review — a fact disclosed here and the reason
221|none of the testing above is presented as our own.
222|
223|One month on, the decisive check is still missing: Artificial Analysis, the evaluator most cited at
224|launches like this, has no Mercury 3 page at all. Its Inception page lists Mercury 2 and Mercury
225|2.5 and stops. The flagship quality sentence remains unmeasured by the independent evaluator whose
226|measurement the coverage kept asking for.
227|
228|## MiniMax M3.1 Flash: the layers, one month on

![Seen from below, the mascot stands at a corner of layered, torn graffiti; the wall shows 428B, 220B, bunny, license, and layers.](/images/october-2026-model-releases-minimax.jpg)
229|
230|For about ten days in the autumn, one of the most-used models on OpenRouter was one nobody could
231|name. It was listed as "Space Bunny Alpha". On 19 October, [MiniMax said](https://minimax.io/blog/minimax-m31f)
232|what it had been: an early version of MiniMax M3.1 Flash. The reveal settled who made the unnamed
233|model and attached a much larger bundle of claims to it: popularity, speed, cost, benchmarks, and
234|downloadable weights.
235|
236|The usage numbers are the easiest place to get lost. MiniMax's launch blog says Space Bunny
237|"processed more than 200 trillion tokens". OpenRouter's launch thread said 56.7 trillion. The
238|stealth page's own activity widget showed roughly 4 trillion prompt tokens. These can all be
239|accurate descriptions of different periods and different scopes. The thing to notice is what none
240|of them is: a measure of quality. Token volume counts how much text went in and came out; a rank
241|on tokens is a rank on traffic.
242|
243|The claims themselves came from MiniMax: a "generational leap" in agentic tasks, coding, computer
244|use, and cybersecurity; online inference "nearly 3× faster"; usage costs "down 70%"; "200+ TPS"
245|everyday output. The 70%, read carefully in the blog, is about the cost of a completed agent task,
246|which the post does not define. On list prices the arithmetic goes differently: Flash lists at
247|$0.15/$0.60 per million against its predecessor's $0.60/$2.40 — a quarter of the undiscounted
248|price, or half of the "permanent 50% off" price, not one-third. And a list price is not a bill: it
249|excludes retries, tool calls, thinking tokens, and human review. On OpenRouter, other hosts served
250|the same model cheaper than MiniMax's own list rate, and heavy cache use dragged the weighted
251|average input cost near $0.02.
252|
253|The benchmark story is where a month of perspective really helps, because launch week mixed two
254|different instruments with nearly identical names. MiniMax's blog prose says the model "ranks among
255|the top performers on AutomationBench-AA" — no number attached. Its launch post on X says
256|"Automation-Bench: 62%". The [model card on Hugging Face](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash)
257|tables "Automation-Bench v1.0.6" at 62.8, footnoted as 600 publicly released tasks. And the number
258|that travelled furthest — "72.5% on AutomationBench-AA" — appears in launch-partner posts,
259|including OpenRouter's thread, restating MiniMax. The resolution is structural: AutomationBench-AA
260|is not a shorthand for Automation-Bench v1.0.6. It is one of Artificial Analysis's own nine
261|evaluations in its Intelligence Index, and Artificial Analysis measured the model at 73% on it.
262|The 72.5 and the 62.8 are two different benchmarks with near-identical names, and coverage that
263|fused them was combining figures that appear together in no single source. A smaller mystery
264|remains: launch coverage read 62.2 from the blog's chart, and the chart now shows 62.8.
265|
266|The independent measurements disagree with the vendor card in the expected direction and one
267|unexpected one. Artificial Analysis put the model's Intelligence Index at 43 at launch week; on
268|28 October its page shows 29. Both readings are real, and they are not the same measurement: the
269|index is a versioned instrument, now v5.0, with a component set that changed with the version. The
270|cost per index task on the same page moved from $0.22 to $0.49 over the same three days. Any
271|citation of "the Intelligence Index" without a version and a date is not reproducible. On
272|Terminal-Bench 4.0, two third-party runs scored the model at 25.8% and 25.3% against MiniMax's
273|tabled 38.1% — different harnesses, different questions.
274|
275|One independent check cuts the other way, and it belongs here as much as the discrepancies: Plotly's
276|published data-analytics exam put M3.1 Flash at 41 of 43, tying Claude Opus 5.5, Gemini 4 Argon,
277|Muse Wonder, and GPT-6 Sol, with the Space Bunny preview behind at 38. And MiniMax's own model
278|card is admirably self-critical: its table shows DeepSeek's new open model beating M3.1 Flash on
279|DeepSWE and on Terminal-Bench 4.0, and it notes where it borrowed a competitor's score directly
280|rather than re-running it. Vendor tables do not only flatter.
281|
282|The weights arrived on 23 October, as promised, and they are the most inspectable layer of the
283|launch. The [Hugging Face repository](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash) is open,
284|not access-gated, and the model card describes a multimodal mixture-of-experts architecture with
285|"Approximately 428B total; 23B activated per token". But the same repository's metadata sidebar
286|reports a model size of 220.49 billion parameters, and the release's config.json carries no
287|parameter count at all. Packing formats can make raw element counts differ from parameter counts —
288|and a month on, the two official numbers still sit on the same page with no explanation.
289|
290|The word "open" also needs a boundary. The [license](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash/raw/main/LICENSE)
291|is MiniMax's own community license, not an open-source one by the standard definition: free
292|non-commercial use, a "Built with MiniMax M3.1-Flash" display requirement for commercial use, and
293|prior written authorization for companies above $20 million in yearly revenue. Downloadable is not
294|the same as runnable on your laptop, either: a model this size needs far more memory than a
295|personal computer has. For most readers the practical form of M3.1 Flash remains an API call.
296|
297|One month on, the free window is over: OpenRouter's page carries the banner, in MiniMax's colors,
298|that "The free launch period ended Oct 22, 2026" and the model "is now served at list price". The
299|host spread is its own lesson — the same weights served at speeds from 31 to 166 tokens per second
300|depending on which provider answers. And Artificial Analysis's page, the independent one, still
301|labels the model proprietary and answers its own FAQ with "the model weights are not publicly
302|available" — five days after they went public. Independent pages lag too.
303|
304|## The rest of October, kept brief
305|
306|A few more of the month's moves belong in the record, mostly as reminders that the three stories
307|above are samples of a pattern.
308|
309|DeepSeek open-sourced DeepInfer, its production inference framework, on 20 October under Apache-2.0.
310|The [repository](https://github.com/deepseek-ai/deepinfer) is real and substantial, and inspection
311|shows its boundaries honestly listed: the KV cache system, prefill/decode disaggregation, and
312|load balancing are not included, so the release is an offline inference engine rather than a
313|complete serving stack. [Bloomberg's coverage](https://www.bloomberg.com/news/articles/2026-10-20/deepseek-unveils-open-source-tool-to-help-cut-ai-operating-costs)
314|of the release noted that no independent benchmarking of the efficiency gains exists yet.
315|
316|Recursive released Flint, a laptop-sized coding model, on 21 October, with the claim that its
317|automated research system built nearly every part of the pipeline. [TechCrunch measured](https://techcrunch.com/2026/10/21/recursive-launches-flint-a-laptop-coding-model-it-says-was-largely-built-by-ai/)
318|about 131 tokens per second on a MacBook Pro — roughly double comparable small models on the same
319|machine. The speed claim has an independent check. The "AI builds AI" claim rests on the company's
320|own account, and has no auditable development record behind it.
321|
322|OpenAI's aurora models never got a launch at all: three undocumented IDs appeared in the API on
323|17 October, were pulled within hours, and then surfaced generating images in blind community tests.
324|No documentation, no pricing, no announcement — and the identification of them as a GPT-Image-3
325|successor remains a guess.
326|
327|Three more moves round out the picture. Mistral promised Large 4's weights "by the end of the
328|month" and had not published them by the 23rd. Google shipped Gemini 4 Argon with an unusual
329|companion build, a version released "without cyber guardrails to a select set of trusted
330|defenders", while its own model card says it could not rule out critical cyber and biological
331|capability levels. OpenAI classified GPT-6.1 Terra as "Critical in cybersecurity" in its own system
332|card, with its own production benchmarks showing it "on-par with its predecessor". Capability and safety statements are increasingly part of the launch
333|sentence. They are also, almost always, the vendor's own assessments.
334|
335|## The pattern: who ran the test, with which instrument, at which version

![The mascot sits on a step before a low wall where harness, version, price, license, and promised are sprayed in one row; the city glows dimly behind.](/images/october-2026-model-releases-pattern.jpg)
336|
337|Put the three stories side by side and the same seven questions keep deciding what a claim is worth.

![Diagram: a launch sentence decomposed into five evidence checks — who ran the test, which instrument and version, what the price excludes, what the license says, and what live traffic shows.](/diagrams/october-2026-model-releases-layers.svg)
338|
339|**One name, two benchmarks.** The AutomationBench collision is the cleanest example of the month:
340|62.8 and 72.5 were both true, both cited at launch, and measured by different instruments with
341|nearly identical names. The figure's journey does not stop there — the vendor's own chart appears
342|to have been revised from 62.2 to 62.8 after launch coverage read it. When a number is quoted
343|without its exact benchmark name and version, it cannot be checked.
344|
345|**The instrument moves.** The Artificial Analysis Intelligence Index for M3.1 Flash was 43 on
346|25 October and 29 on 28 October, and the cost per task moved with it. Nothing about the model
347|changed. The index did — it is now v5.0. A composite score is a versioned instrument, and
348|cross-version comparisons are not comparisons.
349|
350|**Speed depends on the stack.** The month's two big speed claims — 1,068 tokens per second,
351|"200+ TPS" — both ran into live traffic a fraction of the headline, with wide spreads depending on
352|which host answered. Mercury 3's own control experiment showed a traditional model on fast
353|hardware matching its latency. Speed claims are claims about a configuration.
354|
355|**What token volume counts.** Three incompatible token counts for one stealth model, and not one
356|of them measures whether the output was right.
357|
358|**What the price leaves out.** "One-third the cost" did not reproduce from published prices; "70%
359|lower usage cost" was defined against a task the vendor did not define; per-correct-answer costs
360|favored a rival model at the same table; and the promotion prices have no end date.
361|
362|**"Open" has conditions.** Four different flavors in one month: promised weights (Moonshot,
363|Mistral), weights with a community license and revenue thresholds (MiniMax), an open engine with
364|the serving stack deliberately not included (DeepSeek), and downloadable files too large to run on
365|the machines most readers own. The license text and the file list are the claim.
366|
367|**Independent pages lag too.** The most-cited evaluator still had not measured Mercury 3 a month
368|on, and its MiniMax page still described publicly downloadable weights as unavailable. "Check an
369|independent source" is the right instinct; the independent source is also a maintained page with a
370|backlog.
371|
372|None of this makes the month a fraud. The pattern is what normal launch weeks look like when every
373|headline carries several claims at once: the claims are load-bearing sentences with more supports
374|than the evidence provides. And the counterevidence matters as much as the discrepancies. Artificial
375|Analysis independently confirmed Moonshot's large agentic gains. Plotly's exam tied MiniMax's model
376|with four frontier systems. TechCrunch confirmed Flint's speed class. Moonshot disclosed its mixed
377|table methods in footnotes; MiniMax's card showed rivals winning rows. The month's vendors were not
378|unusually dishonest. The sentences were unusually big.
379|
380|## What you can inspect
381|
382|What follows is editorial guidance from the month's evidence. Seven questions decided every dispute
383|above, and they work as a checklist for the next launch week:
384|
385|1. **Who ran the test?** Vendor, independent evaluator, platform statistics, or a community
386|   harness — each answers a different question.
387|2. **Which instrument, at which version?** A benchmark name and a number is not a claim until the
388|   version and harness are pinned.
389|3. **What does the price exclude?** Retries, thinking tokens, tool calls, cache assumptions, and
390|   the promotion's end date.
391|4. **What does the license actually say?** "Open weights" describes files, not permissions.
392|5. **What does live traffic show?** Platform medians are the closest thing to a user's experience
393|   on the day.
394|6. **Promised or shipped?** Weights "by Nov 4" and weights in a repository are different facts.
395|7. **What is the sentence not saying?** Every launch sentence in this piece was true of a narrower
396|   claim than the one a reader heard.
397|
398|## What changes the judgment
399|
400|Within days, the first real test of this month's most consequential promise arrives: if Moonshot's
401|weights land on 4 November, the license text, the parameter files, and the first independent tests
402|become readable — and the question of what capability travels with open weights becomes an evidence
403|question instead of a policy argument. Beyond that: an Artificial Analysis Mercury 3 page would
404|settle the quality half of Inception's sentence; a reproducible cost-per-correct-answer
405|measurement would settle what "70% lower usage cost" means; a parameter census of MiniMax's files
406|would close the 428-versus-220 gap; Mistral's promised weights would close the month's other open
407|promise.
408|
409|Until then, the honest position is the checklist. The month's launches are real, and several of
410|their gains are independently confirmed. Every headline sentence is still bigger than the evidence
411|behind it, because only some of its parts come with receipts.
412|
413|*Companion notebook (scrollable, ten pages): [October's Deep Dive — the notebook](/notebook/october-2026-model-releases-notebook.html).*

## Sources and method
414|
415|This is desk research: a source review of published documents, with a one-month-later verification
416|pass conducted 28 October 2026. No model was run, queried, or tested; every figure is attributed
417|to the party that measured it, and every moving figure is dated. Launch-week material on Kimi K3.1
418|Pro, Mercury 3, and MiniMax M3.1 Flash was inspected for this piece from primary sources: Moonshot's
419|[launch blog](https://www.kimi.ai/blog/kimi-k3-1-pro) and [Artificial Analysis's launch analysis](https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks)
420|(23 Oct); Inception's [launch post](https://www.inceptionlabs.ai/blog/introducing-mercury-3) (19 Oct);
421|MiniMax's [launch blog](https://minimax.io/blog/minimax-m31f) and [Hugging Face model card](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash)
422|(19–23 Oct); [OpenRouter listings](https://openrouter.ai/inception/mercury-3) and [Artificial Analysis pages](https://artificialanalysis.ai/models/minimax-m3-1-flash)
423|(re-read 28 Oct). Independent checks: the [community Mercury 3 harness](https://github.com/zbruceli/mercury3),
424|Plotly's [data-analytics exam](https://plotly.com/blog/minimax-m3-1-flash-plotly-data-analytics-bench/),
425|and third-party benchmark aggregations, each cited at point of claim. October timeline entries rest
426|on the vendors' own release pages — [Mistral's launch post](https://mistral.ai/news/mistral-large-4/),
427|[Meta's announcement](https://about.fb.com/news/2026/10/introducing-muse-wonder-models/), [Google's
428|Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) and [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/gemini-4-argon-available-on-google-cloud),
429|[OpenAI's system-card addendum](https://deploymentsafety.openai.com/gpt-6-1-terra) — and
430|contemporaneous trackers; table claims are vendor claims as published. Access notes: posts on X were read
431|through a third-party mirror where the platform was not directly reachable; BusinessWire's original
432|release returned a 403 and was read via its syndicated copy. Material limits: in-house benchmarks
433|(Moonshot's xdev-bench and hallucination suite, MiniMax's security evaluations) cannot be audited;
434|the Moonshot weights and license, Mistral's weights, and the aurora models' identity are unshipped
435|or unannounced as of 28 October 2026. Disclosure: part of the original Mercury 3 material behind
436|this piece was drafted with assistance from the product under review; no independent evidence here
437|is presented as our own testing. Where information about DeepSeek DeepInfer, Flint, and the aurora
438|models appears above, it is drawn from the primary sources cited, not from any other publication of
439|ours.