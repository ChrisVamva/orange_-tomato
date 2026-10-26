# What a 0.93 actually means

![A carved wooden tableau on a dark chalkboard: a small slotted wooden machine at the left has released a single blank wooden wedge, which lies in a pool of light before a low carved wooden rail; to the right, a carved human figure seen from behind rests one hand on the rail's end post, beside a tray of identical blank wedges.](/images/decisions-api-calibration-lead.png?v=1)

*Illustration: A fast machine releases a blank wedge; a person at the barrier decides which wedges pass and which wait in the tray. An explanatory illustration of an estimate and a threshold, not a measurement.*

When an application asks OpenAI's Decisions API to sort a support message into a department, it does not get a paragraph back. It gets a category, a probability for every option, and a separate confidence value. The [API's own guide](https://developers.openai.com/api/docs/guides/decisions) uses this example:

```
{
  "type": "choice",
  "name": "department",
  "choice": "billing",
  "probabilities": [...],
  "confidence": 0.93
}
```

The number is not decoration. In a system built to route work, it is usually the thing that decides whether a person ever looks at the case. Above some threshold the ticket goes where the model said. Below it, someone checks.

So the practical question is not whether the API is fast. It is what 0.93 told you.

The answer, on the evidence available, is narrower than the launch coverage implies and more useful than a dismissal. The confidence value ranks cases: when it is high, the model is more likely to be right than when it is low. Across 6,843 answers measured by an independent evaluator, accuracy rose at every step up the confidence scale. But the number is optimistic at every level. When the model reported confidence near 0.98, it was right 88% of the time. When it reported near 0.65, it was right 35% of the time. And the size of that gap is not a property of the product. It depends on what you ask the model to decide. On routing-style decisions the gap was about four points. On a reasoning test where the model answered at 11.7%, the relationship between its confidence and its correctness ran backwards.

That last sentence is the article. The aggregate calibration chart that a vendor or a benchmark site will show you is a blend of very different behaviours, and the blend flatters the product, because more than half the answers sit in the single bin where the gap is smallest.

## What the number is

The Decisions API, generally available since [22 October 2026](https://openai.com/index/decisions-api/), takes a question with a fixed set of permitted answers and returns one of three [answer types](https://developers.openai.com/api/docs/guides/decisions). A `predicate` returns a probability between 0 and 1 that a condition holds. A `choice` returns the selected value, a probability for every option, and that separate `confidence` field. A `score` returns a probability-weighted average across ordered levels.

That third type deserves a second look, because it produces a number shaped like a category that is not one. The guide's own worked example returns `"score": 1.1` against levels indexed from zero. A downstream system that treats the score as a label will be reading a decimal where it expected an integer. The documentation is explicit that this can happen — "the returned `score` is a probability-weighted average, so it can fall between levels" — but a reader who has only skimmed the launch material will not expect it.

Two more properties matter for anyone building on this. A request can carry [up to 400 questions](https://openai.com/index/decisions-api/), so a batch of decisions can arrive in a single call. And questions that depend on an earlier answer require separate requests: "For decisions that depend on an earlier answer, send separate requests." A decision chain therefore pays latency at every link, which is worth knowing before assuming the millisecond figures apply to a multi-step workflow.

The guide's code samples also handle an answer of type `refusal`, which means a request can come back with no decision at all. How often that happens is not published.

None of this is criticism. It is the shape of the thing, and it is documented. The question is what the confidence field means, and here the documentation is unusually precise about its own limits.

## What the documentation tells you to do with it

Two sentences from the guide carry most of the weight.

The first defines the number: "The `probability` is the model's estimate that the condition is true."

The second tells you what to do about it: "Use labeled examples from your application to set thresholds for routing, filtering, or review. Choose thresholds based on the cost of false positives and false negatives."

Read together, they place the decision somewhere specific. The model supplies an estimate. The customer supplies the threshold, and with it the consequence. What the guide does not contain is equally relevant: no calibration curve, no accuracy figure, no statement that a given confidence corresponds to a given error rate in any domain. That is an absence as of 26 October 2026, and absences can be filled. But at this moment the vendor is telling you, in its own documentation, that the interpretation of the number is your problem to solve.

This article began from a simpler assumption: that the absence was the story — that the marketing had run ahead of the evidence and the documentation quietly conceded it. The measurement says something more interesting, and less convenient for a debunking.

## Why speed is the easy claim

The performance claim is the one that travels. OpenAI says the API makes decisions "up to 10x faster than GPT‑6 Luna through the Responses API." Its product lead put the gain in concrete terms to TechCrunch: "shrinking things from one to three seconds to 100, 120, 180 milliseconds."

That comparison is not like-for-like, and the reason is structural rather than sinister. The baseline is the same model generating text; the Decisions API returns a typed answer instead. Generating a paragraph takes work that selecting from a fixed list does not. So "10x faster" is best read as a statement about what happens when you stop asking for prose, not as a claim that this endpoint outruns other decision models.

Judged that way, the claim holds up better than the framing suggests. [Artificial Analysis](https://artificialanalysis.ai/evaluations/artificial-analysis-decision-index), which runs its own evaluations rather than republishing vendor numbers, measures a median of 168 milliseconds per task for this model across its decision index. That sits inside the band OpenAI quoted. The speed is real; the multiplier is a comparison against a different mode of the same model.

It is also not a lead. On the same measure, TypeSafe's Jev 1.14 came in at 78 milliseconds, Celeris-1 at 63, and Liquid's d1-ultra at 93. OpenAI's endpoint sits in the middle of that field rather than at the front, and the index score that Artificial Analysis computes for it — 48.5, fifteenth of the seventeen decision models in its published data — is not the score of a category leader.

The adoption numbers point the same way. In the week beginning 19 October, which included the three days before general availability, [OpenRouter's decision rankings](https://openrouter.ai/rankings/decisions) put OpenAI at 2.5% of decision requests on that gateway. TypeSafe held 80.5%. OpenAI's model was fourth by request count, at 41.6 million; a single version of Jev recorded 949 million. None of that measures quality, and one gateway is not the market. It does mean the competitive framing in the launch coverage describes an intention rather than a position.

## The price is the same; the saving is the thinking

The pricing deserves the same treatment, because the headline is easy to misread.

The Decisions API costs $0.10 per million input tokens, $0.01 for cached input, and nothing for output. On [OpenAI's pricing page](https://developers.openai.com/api/docs/pricing), `gpt-6-luna` is also $0.10 per million input tokens. The input price is identical. The entire price difference is the output charge the Decisions API does not levy — $0.50 per million tokens on the text model.

So the saving depends on what you were previously buying. A decision with a 1,000-token prompt costs about $0.0001, or roughly ten cents per thousand decisions. If the previous call produced a one-word answer, the output cost you avoided was a rounding error, and the real gain was latency. If it produced five hundred tokens of reasoning before answering, that output cost $0.00025 — about two and a half times the input cost of the prompt itself.

The saving, in other words, is not in the answer. It is in the thinking the answer used to require. That is a genuine efficiency, and it is also the part where a reader should ask what else the thinking was doing.

## The thirty cases

The most-quoted accuracy claim comes from a customer, in OpenAI's own launch post. Biswaroop Palit of Box describes classifying business documents and routing them: "In our evaluation, the Decisions API delivered ~5x faster route selection on 30 certificate of insurance cases, with the same accuracy as the Responses API—automating routine work and sending lower-confidence cases to reviewers."

Two things are worth separating. The workflow described is exactly the one the documentation recommends: automate the confident cases, send the rest to people. That is a reasonable design and it is being used. The evidence behind it is 30 cases, chosen by the customer and published by the vendor, with "same accuracy" left undefined — no metric, no baseline figure, no error breakdown.

Thirty cases can produce a true statement and still tell a reader almost nothing. If the task is easy, both systems will be right and the comparison is uninformative. If the task is hard, thirty cases is too few to distinguish a real difference from noise. Speak's figure, also reported by TechCrunch, is a latency result — 1.4 seconds between actions down to 0.13 — and says nothing about accuracy at all.

## What independent measurement shows

![Diagram of two zones divided by a horizontal dashed boundary. The upper zone, the API's side, shows a question, a set of allowed answers and context feeding a decision endpoint that returns a choice with a confidence. The boundary is labelled "the estimate ends here". The lower zone, your side, shows labeled examples feeding your threshold, which splits into an automated route and a review queue. A footer reads: the API ships the top half of this picture; the threshold, the queue and the drift check are yours.](/diagrams/decisions-api-calibration-threshold.svg?v=1)

*Diagram: the estimate crosses the boundary; the authority to act does not. Turning a confidence value into a decision takes a threshold, a destination for the cases that miss it, and a way to notice when the traffic has moved.*

The left side of that boundary is what you buy. The right side is what makes it safe, and it does not ship. What crosses the boundary is a probability attached to a choice, and that is the one part of an AI system that can be scored against outcomes directly: a system that generates text gives you an answer, while a system that returns a probability gives you a prediction, and predictions can be checked against what happened.

Artificial Analysis says as much in explaining why it built the index: decision models "choose from a fixed set of options, with a probability for each, in one call. That makes them cheap and fast, and lets us measure their calibration."

Its method is straightforward. For each task, the model picks the option it assigns the highest probability, and the evaluator records that probability alongside whether the pick was correct. The results are grouped into bins of 0.1, and the published chart plots accuracy against the confidence the model gave its own answer. A perfectly calibrated model sits on the diagonal: when it says 70%, it is right 70% of the time.

The index itself is a weighted average of four evaluations — 500 private knowledge questions, 513 multiple-choice reasoning questions from Humanity's Last Exam, 3,423 tool-calling tasks from NVIDIA's When2Call, and 835 classification rows from WildGuardTest — each weighted equally. The evaluator states that the work is conducted independently, publishes no per-item data, and does not publish confidence intervals.

For this model, the aggregate picture is a curve that rises steadily and sits below the diagonal everywhere. Every bin tells the same story in the same direction: the model's confidence runs ahead of its accuracy. Near the top, where 3,710 of the 6,843 answers sit, a stated confidence of about 0.98 corresponded to 88% accuracy. Lower down, a stated confidence of about 0.65 corresponded to 35%.

Orange Tomato's own arithmetic on the published bins puts the average gap at about 0.155, weighted by the number of answers in each bin. That figure is a calculation on Artificial Analysis's data, not a measurement by this publication, and the scripts and extracted data are kept with the article's research record so the number can be checked or disputed.

An average gap of 0.155 is worth having a number for, but the average is the least interesting part of it.

## The curve is a blend

Artificial Analysis's four evaluations are not four flavours of the same task, and the calibration data behaves accordingly.

On the tool-calling set — the closest thing in the index to the routing decision a support system makes — the gap between confidence and accuracy was about 0.04. Confidence rose with accuracy at every bin, and the values stayed close to honest. On the classification set the gap was 0.035. On the knowledge set it was 0.139, with the same orderly relationship.

On the reasoning set it was 0.436, and the ordering broke. The model answered 11.7% of those questions correctly. Across the eight bins with enough answers to count, higher confidence did not mean higher accuracy; the measured trend ran the other way. At a stated confidence near 0.95 the model was right 7.4% of the time. At a stated confidence near 0.25 it was right 19.6%.

That inversion rests on small numbers — eight bins of 45 to 90 answers each — and this article will not claim more than they support. The defensible reading is not that confidence reliably inverts on hard questions. It is that on this task type the confidence value carried no usable signal at all, and the point estimate of its direction was negative.

The average concealed this for a mundane reason. More than half of all the answers sit in the single highest-confidence bin, where the model is at its most reliable, and that mass pulls the aggregate curve toward respectability. A reader shown only the blended chart would reasonably conclude that the number is mildly optimistic. A reader shown the decomposition learns something the average cannot tell them: whether the number is trustworthy depends on what kind of decision is being made, and the reliability is worst exactly where the model is weakest.

That is not a scandal. It is the ordinary behaviour of a system that is competent at some tasks and not at others, reporting a confidence that reflects its own sense of the task rather than its measured performance on it. But it changes what a threshold means. A threshold calibrated on your routing traffic tells you nothing about the same threshold applied to a question that needs knowledge the model does not have.

## What the vendors themselves concede

It would be easy, and wrong, to end this as a story about a company overselling a number. The category's leading vendor is more candid than that story requires.

TypeSafe's [release notes for Jev 1.14](https://typesafe.ai/blog/jev-1-14) open with "we dislike public benchmarks," then publish internal numbers anyway — with warnings attached. "Don't believe it entirely. Always favor your own experimentation and evals with your use cases." "This is likely biased towards our models." "This measurement is our best guess and will continue to evolve."

The same post concedes two limits that apply to the whole category. All decision models, including Jev, "perform worse on multimodality over pure text." And the company deliberately caps context length because its model, "like all models, is less reliable on longer contexts."

None of this resolves the calibration question. It does establish that the honest version of this product category is bounded, that its vendors know it, and that the boundary runs along the same line the measurement does: the model is useful inside a range, and the range is a property of the task.

## What a team still has to build

If the confidence value is a ranking signal rather than a probability, then the work of turning it into a decision is not optional, and it is not small.

Four pieces, none of which come with the API:

**A labeled set from your own traffic.** Not a public benchmark. The documentation says "from your application," and the decomposition above explains why: a threshold derived from someone else's task distribution will not transfer.

**A threshold priced against both kinds of error.** The guide's phrasing is the right frame — "the cost of false positives and false negatives." In a routing system those costs are usually asymmetric. Sending a billing question to technical support wastes a handoff; sending a refund request to the wrong queue costs a customer. The threshold should encode that asymmetry, which means someone has to write the asymmetry down.

**A review queue that actually receives the low-confidence cases.** This is the part Box described and the part that is easy to skip. A threshold without a destination for the remainder is just a filter with a silent discard.

**A way to notice when the distribution moves.** The measurement this article relies on is a snapshot of a model against a fixed task set on one date. Your traffic is not fixed. A threshold calibrated in October is a claim about October.

This is editorial synthesis, not tested guidance. Orange Tomato ran no test here. What the evidence supports is narrower: these four pieces are what the documentation asks of you, what the customer example describes doing, and what the calibration data implies is necessary.

## What can be relied on

The confidence value is informative. It ranks cases in the right order often enough to be useful for triage, and on routing-style decisions it is close to honest. A team that treats it as a sorting key, sets a threshold from its own labeled examples, and keeps a person at the end of the low-confidence path is using the product roughly as documented, and the evidence does not undermine that use.

The number is not a probability you can spend. Reading 0.93 as "93% likely correct" is not supported by the measurement: where the model was most reliable, a stated confidence near 0.98 came with 88% accuracy, and lower down the scale the gap widened to about thirty points. On tasks where the model is weak, the number stopped carrying information altogether.

What would change this judgment: calibration data published by OpenAI for this endpoint, measured on realistic tasks, showing that the gap closes outside benchmark conditions. A second independent evaluation reaching different numbers. Or a customer report with a defined accuracy metric and a sample large enough to mean something, replacing the thirty cases. Any of those would be a better basis than the one this article had.

Until then, the honest description of the product is the one its own documentation gives. You are buying a fast estimate. The threshold is yours, and so is what happens on the wrong side of it.

## Sources and method

Desk research, sources accessed 26 October 2026. No request was sent to the Decisions API, no credentials were held, and no model was tested. The performance figures below come from the sources that measured them; the calibration arithmetic is this publication's own calculation on published data. All prices, limits, and rankings are as of that date and will change.

**Primary documents**

- OpenAI: [Build more responsive apps with the Decisions API](https://openai.com/index/decisions-api/) (22 October 2026); [decisions guide](https://developers.openai.com/api/docs/guides/decisions); [API pricing](https://developers.openai.com/api/docs/pricing); [developer community announcement](https://community.openai.com/t/decisions-api-is-now-generally-available-with-new-updates/1408934).
- TypeSafe: [Jev 1.14 release notes](https://typesafe.ai/blog/jev-1-14) (14 October 2026).

**Independent measurement**

- Artificial Analysis: [Decision Index](https://artificialanalysis.ai/evaluations/artificial-analysis-decision-index); [Decision Index methodology](https://artificialanalysis.ai/methodology/decision-index); [HLE-MultiChoice](https://artificialanalysis.ai/evaluations/hle-multichoice).
- OpenRouter: [decision model rankings](https://openrouter.ai/rankings/decisions), request counts through 25 October 2026.

**Reporting**

- TechCrunch: [OpenAI makes its Jev competitor widely available as decision model competition heats up](https://techcrunch.com/2026/10/22/openai-makes-its-jev-competitor-widely-available-as-decision-model-competition-heats-up/), Tim Fernholz, 22 October 2026.

**How the calibration figures were derived**

Artificial Analysis presents its calibration data as a chart rather than a table. The per-bin values behind it — the number of answers in each bin, the mean confidence, and the observed accuracy — were read from the index page's underlying data on 26 October 2026 and saved with the extraction and calculation scripts. The weighted gap of 0.155, the four per-evaluation gaps, and the ordering of the seventeen models are Orange Tomato's arithmetic on that data, not Artificial Analysis's published metrics. The evaluator publishes no per-item results and no confidence intervals, which is why the reasoning-set finding is reported as a direction rather than a magnitude.

Every party named here has an interest. OpenAI sells the product, TypeSafe sells the rival, Artificial Analysis sells benchmark analysis, and TechCrunch reported a launch. That is a reason to read each claim with its source attached, not a reason to discount all of them equally.

One source could not be read: a community thread titled "Results from toy experiments with Decisions API" returned an access error on two attempts. It appears, from its listing alongside the general-availability announcement, to contain an independent user test. It is not cited here because this article did not read it.
