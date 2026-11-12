# The Test Changed. What Did the Score Mean?

![Comic page in five panels: a robot with a tomato head and a robed woman in a bronze headdress enter a harbor survey office carrying a sounding lead line, find charts whose soundings depend on tide tables, and watch the lead’s reflection tie knots of its own.](/images/The%20Sounding%20Line.jpg)

On October 23, 2026, a model named Kimi K3.1 Pro launched on a leaderboard page that read like a
verdict. It placed fourth on the Artificial Analysis Intelligence Index and scored 55, and the
[launch page](https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks) promised the
gap between open and proprietary models would "narrow from 12 points to 3". A week later the same
model sat at 46. The weights were unchanged; none had been released. The number moved because the
test moved underneath it.

**55 → 46. No model update in between.**

That is the cleanest case of a much larger question, and it arrived this season on every surface
where numbers get cited. A harness comparison put one model's solved count at 62 and 3 on the same
113 tasks. A cryptographic proof promised to establish "which model answered". A decision endpoint
handed back 0.93. A filing reported roughly $417 billion in obligations. Each figure carries an
instrument, a date, and an owner — and each announcement quoted the figure while the instrument
stayed offstage. So: when an announcement cites a number or a proof, what does it actually
establish?

## The page, the model, and the week between them

The story of 55 and 46 is unusually well documented, so it is the right place to learn the shape of
the problem. Two dated captures of the same model page exist: [October 26](https://web.archive.org/web/20261026042404/https://artificialanalysis.ai/models/kimi-k3-1-pro),
before the index changed, and [November 1](https://web.archive.org/web/20261101153614/https://artificialanalysis.ai/models/kimi-k3-1-pro),
after. Comparing the full page payloads is decisive. Eleven evaluation scores appear in both
captures, and every one is identical to the last digit. The composite moved anyway: 55.09 to 46.00,
a fall of 9.08 points.

The model did not decline. The arithmetic around it was rebuilt. On October 27, Artificial Analysis
published [Intelligence Index v5](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5).
The announcement calls it the biggest rebuild since v4 launched in January. New evaluations arrived, old ones left, and the categories were rebalanced. A new effort regime came with them. Its effect the announcement states plainly: "Every model we measured generates more output tokens per Intelligence Index task than in v4.3, with the median rising by two thirds, from 35k to 59k." Kimi's cost per task went from $2.11 to $3.68 across the same two captures. Sixty
percent of the new index rests on private test sets or held-out answers, which is good for
integrity and hard for outsiders to re-run.

What v5 actually contains is worth one sentence, because the swap is the story. Two new evaluations entered at fifteen percent each, a diamond-grade exam replaced its predecessor, one grading harness was swapped for a harder subset, and three older evaluations left entirely. The categories settled at four quarters: knowledge work, coding, science, and general reasoning. None of that is a criticism. An index that never changes its test goes stale. The point is only that a changing test produces changing numbers, and both readings stay honest about different things.

Kimi's 9-point fall was the typical case, not a special one. Across the 79 models present in both
captures, the composite moved by a median of −10.12, and 78 of the 79 kept every shared measured
score frozen while their composites fell. The one exception was a preview model that had been
re-measured on five evaluations. In other words, for a week in late October, the leaderboard
re-sorted almost entirely without new measurements.

The publisher says as much in its own documentation. The [methodology's](https://artificialanalysis.ai/methodology/progress-index)
progress page warns that "each version of the Intelligence Index is therefore measured on a
different set of evaluations, and scores across versions are not intended for long-run comparison".
Read the ranks the same way: Kimi's page has shown the model at fourth of 215, then 21st of 58,
then ninth in [press coverage](https://letsdatascience.com/news/artificial-analysis-index-v5-drops-kimi-k31-pro-from-fourth-563911c6),
and on November 8 it read first of 26. Every one of those numbers is real. None of them refers to
the same field of models. A rank without its denominator is a mood.

Two loose ends show how far a citation can travel past its evidence. First, the composite cannot be
rebuilt from its published parts. The documented components account for 33.62 of Kimi's 46.00; the
remainder comes from an Elo-scored evaluation whose conversion to the index scale is not documented
anywhere in the [methodology suite](https://artificialanalysis.ai/methodology/intelligence-benchmarking).
Second, the [changelog](https://artificialanalysis.ai/changelog) still shows "Intelligence Index:
46" under the October 23 entry, next to launch coverage whose headline says 55. Whether that entry
was edited or the page renders current values against old dates is undetermined, which is exactly
why a changelog is not a dated record.

There is a second timing wrinkle worth one paragraph. On the announcement day itself, the rendered methodology page still documented the old version while the live scores had already moved. Readers who clicked through from the v5 announcement to the method behind it met v4.3.2. The page has since grown a full version history, so the lag is repaired by documentation rather than repeated. It matters because the lag window is exactly when citations form: the first day's coverage quoted the new scores while the method page still described the old test.

And the instrument kept moving after the window closed. On November 3 the index released v5.0.1,
regrading every model on one component. The same pattern hit the decision-model rankings while this
material was being assembled. The Artificial Analysis [Decision Index](https://artificialanalysis.ai/evaluations/artificial-analysis-decision-index)
bumped from v1 to v2 in early November, and the endpoint analyzed below moved from 48.5 (fifteenth
of seventeen) to 61.73 (thirteenth of seventeen). Neither reading is wrong. They are two
instruments, and a citation that names neither has said almost nothing.

## One model, ten harnesses

The second surface removes the model from the equation entirely. AgentField's CodeAF team ran one open model — [DeepSeek V4 Flash](/articles/deepseek-deepinfer-open-source/) — through ten coding-agent harnesses. Every harness got the same 113 software-engineering tasks. Counts are published on the [benchmark docs](https://agentfield.ai/docs/codeaf/senior-dev)
and code in the [public repository](https://github.com/Agent-Field/CodeAF). The results, with
95% Wilson intervals on the solve rates and the harness's own model-API spend per solved issue:

| Harness | Solved (of 113) | Wilson 95% | Cost per solved |
|---|---|---|---|
| senior-dev (CodeAF) | 62 | 46–64% | $0.40 |
| harness A | 56 | 41–59% | $0.77 |
| harness B | 51 | 36–54% | $0.83 |
| harness C | 42 | 29–46% | $0.94 |
| harness D | 31 | 20–36% | $1.81 |
| harness E | 30 | 19–35% | $1.90 |
| harness F | 30 | 19–35% | $1.82 |
| harness G | 16 | 9–22% | $1.36 |
| harness H | 16 | 9–22% | $10.59 |
| harness I | 3 | 1–8% | $4.51 |

**62 to 3. Same model. Same 113 tasks.**

The table anonymizes nine of the ten harnesses, and the name mapping the README suggests leaves one
cluster of three ordered only by cost inference. The intervals overlap in the middle of the field. A separate two-runs-per-task study by 8090 Labs measured a 4-point average swing between a task's first and second runs — a concrete noise floor for single-pass counts. What survives the noise is the spread itself, and third parties keep reproducing its direction. 8090 Labs' [harness study](https://8090.ai/blog/same-model-different-harness) titles its finding "A 35-point swing from changing only the harness". No model tested there performed best in its maker's own rig.

The newer third-party work sharpens the reading rather than settling it. A November study from Surge AI found that raising thinking effort beat every harness trick tried, at eight times the orchestration cost without a statistically clear gain. An Arena analysis priced the harness choice at up to five times the cost with little success-rate change. The direction is consistent across independent shops; the magnitudes move with the task set. That is the noise floor talking, and it cuts both ways: the spread is real, and any single number from it is fragile.

Two footnotes belong with the numbers. The cost column counts model-API spend from the harness's
usage ledger; infrastructure, setup, monitoring, and human time are outside it. And the comparison
is vendor-run, the vendor's harness won it, and no independent replication existed as of November 8. A number is only as portable as its run conditions.

The benchmark underneath deserves its own sentence. The [DeepSWE paper](https://arxiv.org/abs/2607.07946) describes tasks written from scratch across dozens of live repositories and graded by hand-written functional verifiers rather than inherited tests. Its authors measure verifier disagreement with an LLM judge at about an order of magnitude below the inherited-test rate. That care is what makes the harness spread interesting instead of dismissible: the task set is held fixed by design, so the variance left over belongs to the system around the model.

## What a proof of provenance proves

The third surface sounds like it solves all of this. Anthropic's [FlashProve](https://github.com/anthropics/FlashProve)
is a research prototype that pins one exact set of model weights with a cryptographic commitment,
then attaches to every reply a proof that anyone can check on an ordinary CPU. The [research
page](https://www.anthropic.com/research/provable-inference) states the claim precisely: checkers
can "be convinced that the committed weights, run on this prompt, produce exactly these tokens".
Falsifying a proof is "effectively impossible", short of breaking widely believed cryptographic
assumptions.

The guarantee comes in four named properties, and each name is doing honest work. Completeness: a true statement verifies. Soundness: a false one does not, except with negligible probability, and the Lean-checked verifier carries a concrete bound. Zero knowledge: the checker learns nothing about the weights beyond the statement proved. Succinctness: the proof stays small enough to check cheaply. All four describe the proof system. The model itself is a fifth thing, undescribed.

That is a real guarantee, and it is worth being exact about how narrow it is. The repository's own
limits documents do the narrowing. A passing check does not say which real model the weights belong to: "A yes does not say whose weights they are, that the shipped committer made the commitment, or which real model it is". The commitment ID must come "never from the server you check or from files sent with a proof", and a provider can commit to a small or degenerate model. The proof is about the integer, quantized model that runs. How far that tracks the original floating-point network is "a measurement, not part of any proof" — one measurement in the docs puts the top token at 6.81% of positions.

There is a layer below that one. The strictest check demands exact match: every output token must
be the model's top choice. The looser policy accepts tokens within cost limits, and the docs are
blunt about what that accepts — with loose limits, "close scores or flat (all-zero) weights almost
any output passes". In the authors’ own tests, none of the 96 honest replies scored from each of two stock engines would pass exact match. And 28 of 32 replies with one token swapped for the model’s second choice met limits fitted to honest replies. Their recommendation: if you cannot assess the limits,
accept only exact match.

What is proved is a narrow statement about a chosen artifact. Whether the answer is correct, safe,
or useful is out of scope by construction. The prototype says so itself: "A research artifact: not maintained, not accepting contributions", with no independent security audit, and
AI systems wrote "nearly all of the software, the Lean proofs and the documentation". The
guarantee is exact about the label. The label is not the answer.

The limits documents keep going past the headline caveats. A scale file inside the accepted range can switch off model blocks, up to all of them. Stored tables that have been altered still verify. Proofs are malleable across contexts. None of this contradicts the guarantee; all of it belongs to the part the guarantee does not cover. The honest shape of the docs is the point: the vendor wrote down where the proof stops, in its own pages, before anyone asked.

## The 0.93 is somebody's estimate

The fourth surface is the one teams are already automating on. OpenAI's [Decisions
API](https://openai.com/index/decisions-api), generally available since October 22, answers
structured questions in about a tenth of a second and returns probabilities alongside. When the
[developer guide](https://developers.openai.com/api/docs/guides/decisions) explains a confidence
value, it says what the number is. "The probability is the model’s estimate that the condition is true."

That distinction carries weight because the guide does not say how the estimate is computed. As of
November 8, the word "calibrat" appears zero times in it; there is no calibration curve, no
accuracy figure, no per-domain reliability statement. The only reliability guidance the docs offer
puts the work on the user: "Use labeled examples from your application to set thresholds for
routing, filtering, or review. Choose thresholds based on the cost of false positives and false
negatives." The endpoint returns a number; the policy is yours to build around it.

That ownership is the part teams underestimate. A threshold needs a destination for the cases it rejects, or it is a filter with a silent discard. It needs a review queue with a cost model behind it, because every false positive has a price and every false negative has a different one. And it needs a drift check, because the model behind the endpoint will move while the threshold stays put. None of that ships with the API. The docs hand you the estimate and the instruction to calibrate it yourself; the queue, the costs, and the re-check are your build.

The vendor's own evidence for the product is one customer story: thirty insurance cases routed about five times faster at the same accuracy, with lower-confidence cases going to reviewers. That is a deployment anecdote with a review queue in it, which is exactly the shape the docs recommend. It is not a calibration curve. The price reinforces the shape: input tokens only, no output charge, because the endpoint returns a verdict rather than an essay. You are buying a fast estimate. The threshold is yours, and so is what happens on the wrong side of it.

What does the number track in practice? Artificial Analysis's [Decision
Index](https://artificialanalysis.ai/methodology/decision-index) can measure calibration at all
because the interface exposes probabilities — "That makes them cheap and fast, and lets us measure their calibration", as the index puts it. A property of the interface, not a virtue of the model.
Its binned charts show the pattern on both index versions it has published: every bin is
over-optimistic. In the v2 data read on November 8, the top bin states 0.980 confidence and lands
0.898 accurate.

That pattern is not new with v2. The earlier version's data showed the same shape with a wider gap: the top bin stated about 0.98 and landed near 0.88, and the aggregate overstated accuracy by roughly fifteen points across thousands of answers. The blend underneath was doing quiet work. Routing-style question sets came out nearly honest while the reasoning subset ran backwards, with confidence falling as accuracy rose. An aggregate over both flattered the product and hid the task type where the number carries no signal. The v2 data keeps the direction and narrows the gap; the task-dependence stays.

**0.980 stated. 0.898 delivered. Both real numbers.**

An independent probe goes further in the same direction, within its own limits. A confidence-routing firm that sells the service [tested the model's own log-probabilities](https://anth.us/articles/openai-decisions-api-preview/) on 3,600 logic problems. Its finding is a single line: "When Luna said it was 99% sure or more, it was right 68% of the time."
That study probes the underlying model through a different API. It predates the endpoint's documentation,
and its authors sell confidence-routing services. Treat it as a signal while it stands alone. The vendor's
condition for changing the picture has not arrived: no OpenAI-published calibration data for these
confidence values existed as of November 8.

## $417 billion, and what is not in it

The fifth surface is a filing, which is the most documented kind of number there is. Anthropic's
IPO paperwork carries a figure that traveled widely in late October. In the [amended
S-1](https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm)
read on November 8, the company states that after December 31, 2025 it entered lease and commercial
agreements "with aggregate future minimum payment obligations of approximately $417 billion".
They commence between 2026 and 2027, with terms running "from less than one year to 20 years".

The revenue side belongs in the same frame, because the figure traveled alongside it. Full-year revenue ran from $41 million to $386 million to $4.6 billion across 2023 to 2025, with nine months of 2026 at $33.2 billion. The growth rates are the company's own arithmetic, and the filing declines to project them forward. The third quarter of 2026 shows $17 billion of revenue against a $567 million operating loss. A lab can be growing fast, losing money on operations, and signing hundreds of billions in future capacity at the same time. All three sentences are true at once, and the filing is the only one of the three kinds of number that carries footnotes.

**$417 billion — a floor of floors, or a ceiling? Yes.**

The same filing shows why the aggregate misleads. Amazon's agreement is a floor: "we committed to spend an aggregate of at least $110.0 billion between May 2026 and April 2036, regardless of actual usage". A true-up applies if spending falls short, and cancellation requires Amazon's uncured breach.
The SpaceXAI arrangement is a cap: "up to $120.5 billion over terms extending into 2029". Once the initial periods end in early 2027, "each agreement may be cancelled by either party upon 90 days’ advance written notice". "At least" and "up to" are doing opposite work inside one
headline figure.

Then come the parts that are not in the figure at all. Another expanded set of agreements, for
capacity delivering in 2028–2031, is estimated at $125–150 billion and explicitly "not included in
the contractual obligations table above", because commercial terms are unfinished. An AMD supply
deal expects expenditures "to exceed $20.0 billion" with no fixed dollar commitment, also outside
the table. And the table itself is not frozen: between the [October 26 original](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm) and the November 2 amendment, the Google commitment moved from "at least approximately $114.5 billion" to "at least
approximately $121.3 billion". Two dated readings of the same document, both accurate on their day.

The filing names more than the two counterparties the headlines carried. Alongside Amazon and SpaceXAI sit Microsoft, at no less than $44.9 billion through mid-2033, and Google, at about $121.3 billion through mid-2033 on hosting. An AMD hardware-supply deal adds an expected $20 billion-plus with no fixed dollar commitment. Four infrastructure names and a chipmaker inside one aggregate: the number is a program, not a purchase. And the near term is dated too. About $69.8 billion of the obligations fall due in the twelve months after September 2026, of which $4.3 billion hangs on conditions or termination rights that have not yet resolved.

The filing is candid about all of this in ways the coverage rarely carries. It warns of being
"committed to excess compute that remains underutilized" and of "committed cash outflows that do
not produce immediate revenue". It disclaims its own growth rates: they should not be considered "indicative of our future performance". And its cover page estimates the share price "will be between $ and $" — the range is
still blank as of November 8. What the press reports about valuation and timing remains a report; the filing itself speaks only in blanks. The reported shape, for orientation only, runs near $100 billion raised at a valuation between $1 and $2 trillion, aimed at the week of November 16, against a $965 billion private valuation earlier in the year. One outlet's reporting has some investors calling $1.5 trillion a stretch and $1 to $1.25 trillion more likely. None of this is filed. If the price range lands before this piece ships, the blank fills in; until then the blank is the fact.

For a reader outside the compute business, the stakes sit in the shape of those clauses. A
take-or-pay floor gets paid whether or not the capacity is used, and unused capacity is a cost
someone downstream recovers. A cancellable cap binds only while it is convenient. When the
headline number mixes both, the question is never "how big" but "in which direction does this
bind".

## Documented, asserted, inspectable

Two smaller cases make the same separation in plain view. In October, Microduck — a palm-sized
hopping robot went viral after NVIDIA's keynote featured it. The claims piled up: twenty
thousand preorders in a day, delivery in time for Christmas, a company that is "now an Nvidia company" in the words of [one widely cited report](https://techcrunch.com/2026/10/23/hottest-toy-for-christmas-nvidia-ceo-plays-with-adorable-microduck-robots-20000-sell/). The [product
page](https://store.pollen-robotics.com/products/microduck) quotes "$399 before taxes and shipping"
and seven trained behaviors; the [software](https://pollen-robotics.com/microduck/) ships
Apache-2.0, with policies you can inspect and retrain.

Sort the claims by their evidence and the pile separates cleanly. The preorder count rests on one
stakeholder tweet, cited once and not independently verifiable. The corporate framing collides with
the record. NVIDIA's [September 8-K](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000078/)
records a definitive agreement expected to close in the first half of 2027, subject to regulatory
approvals — signed, not closed — and Reuters later reported regulators asking questions about the
deal. The delivery claim is contradicted by the vendor's own pages. A banner on the product page, read on October 26 and again on November 8, warns that "current pre-orders to ship after April 2027". Yet the shipping policy, updated October 29, lists "first deliveries targeted before Christmas 2026". One vendor, two promises on the same day, and no resolution as of November 8. Even the robot's mass differs between its own pages: 780 grams on the store, 800 grams on the product page.

Against all of that, the inspectable stack is the part anyone can check without trusting a press cycle. The software ships under a permissive license, the trained moves arrive as inspectable policies, and the training recipe runs through an open simulator. None of that settles whether the preorder count is real or the Christmas date holds. It settles what the buyer actually gets to open: the code, the policies, and the tools to retrain them. That is the only claim in the pile that does not depend on someone else's count.

The playtest case is the sharpest illustration, because a studio acted on a capability claim in
public. On October 19, Digital Sun moved its first [ReVamp playtest](https://store.steampowered.com/news/app/3295000)
from Steam to a smaller Discord round. The studio cited "recent news of games being reverse-engineered,
cloned and published before the original is even out." It judged that "sharing a build with tens
of thousands of players felt like too big a risk for ReVamp". Days later the studio added: "Even if
ReVamp isn't the easiest game to clone, a 1% chance is too big a risk for anyone."

That decision is documented. The capability it fears is asserted. What is inspectable sits
elsewhere. The cloning incidents on the record all started from footage, not builds. Within days of a gameplay clip appearing, [PC Gamer counted](https://www.pcgamer.com/gaming-industry/steam-week-in-review-steam-next-fest-has-over-8-000-demos-as-worthless-vibe-coded-slop-levels-up/)
"at least seven Roblox clones of Escape the Walls". One clone's creator told [Kotaku](https://kotaku.com/revamp-public-playtest-cancelled-digital-sun-claude-ai-clones-2000747558)
"Claude did everything for me; I just sat in my chair and watched" — a self-report, not a
measurement. A separate build-leak dispute came with copied code, not a model's output, and the
link to AI in that case is a reporter's inference, "a classic telltale sign of Claude-assisted
decompilation". No inspected source documents a pre-release playtest build being turned into a
competing game.

The surrounding cases keep the same three-way split. One dispute arrived with copied code and matching error strings from a released demo, not a model's output. One fan port decompiled a twenty-five-year-old release to run in browsers, with its own data supplied by players, and no confirmed AI role. The pre-AI history is the control group: mechanics have always traveled fast, and the law has always protected expression more readily than rules. What changed is the speed a studio fears.

As of November 8 the ReVamp playtest's own outcome is unconfirmed in the public
record, and the public round remains deferred "closer to release, once we feel the risk is lower".
The feared event stays untested because the broad distribution never happened — which does not make
the trade wrong. A studio can reasonably pay in lost feedback to buy down a risk it cannot price.

Digital Sun was not alone that week. A second studio cancelled a public demo for a closed session, giving two reasons: unmanageable streaming restrictions, and fear that imitations built with AI or other tools could ship before the original. The two-reason shape matters. Only one of the reasons is about capability at all, and neither was demonstrated. Cloning anxiety has a longer history than the current models: one classic took three weeks from launch to first clone, another arrived as a weekend project. Mechanics have always been hard to protect. What is new is the speed a studio fears, not the fact of copying.

![Comic page in five panels: the pair wade through a flooded chart archive, a hall of thousands of hanging lead lines, a drowned datum post, an unattended survey office, and an open chart whose new datum line glows over moving water.](/images/The%20New%20Datum.jpg)

## What every cited number carries

Put the five surfaces side by side and the same anatomy shows in each. A cited number arrives with
an instrument that defined it, a date that bounds it, an owner who ran it, and a scope that limits
what it settles. The headline keeps the first and drops the other three.

- **Readings** (a score, a solve count) establish what an instrument said, under its method of the
  day. When the method changes, the citation outlives its referent — and both readings stay honest.
- **Guarantees** (a proof, a confidence value) establish exactly their stated statement. A proof of
  provenance certifies the label; an estimate reports a model's belief. Neither certifies the
  answer.
- **Commitments** (a filing figure) establish obligations in named directions. Floors bind down,
  caps bind up, and excluded estimates bind nothing.
- **Claims** (a demo, a launch) exist in three evidential states: documented, asserted, and
  inspectable. Only the third is portable.

The gap between the headline and the guarantee is never hidden. It is written down somewhere
specific — a methodology page, a limits document, a footnote beneath a table, a vendor's own two
disagreeing pages — and the announcement simply does not carry it. The instruments differ, but the
failure mode repeats: the reading gets quoted, the rig gets forgotten. A score without its method,
a proof without its scope, a figure without its footnotes, a demo without its artifacts. Where we land: the number is
rarely the problem. The missing instrument is.

![Diagram: the anatomy of a cited number — a claim linked to its instrument, date, owner, and scope — with readings, guarantees, confidence, filing, and launch-claim surfaces below, and notes on what the number settles and leaves open.](/diagrams/what-did-the-score-mean-anatomy.svg)

*Diagram: the anatomy of a cited number — and what it leaves open.*

## What to ask before you cite the number

1. **Which instrument, which version?** Name the method alongside the score, and give ranks their
   denominator. "Fourth of 215 under v4" is a claim; "fourth" is a vibe.
2. **What does the guarantee exclude?** For a proof: whose weights, which model, exact-match or
   limits? For a confidence value: what is the evidence that stated probability tracks accuracy?
3. **What does the figure count?** Model API spend or total cost? A floor ("at least") or a cap ("up
   to")? In the table, or the estimate the table excludes?
4. **Where does the decision live?** A threshold that routes work is a policy someone owns. The
   endpoint will not pick it, review the remainder, or notice drift.
5. **When was it read?** Two dated readings of a moving page are normal. Report both; never merge
   them into one timeless number.

## What changes the judgment

Everything here is dated at inspection, and some of it moved while the drafting ran. As of
November 8, 2026:

- The Intelligence Index is at v5.0.1 after a November 3 regrade of one component for all models;
  the 55 → 46 finding is scoped to the October 26 – November 1 window.
- The Decision Index's v2 moved its own scores and rankings; the v1 arithmetic behind any
  mid-October citation is now historical.
- FlashProve has not changed since its October 30 release; no independent reproduction, adoption,
  or incident has appeared.
- No calibration data has been published for the Decisions API's confidence values.
- The IPO price range in the filing is still blank; press reports target the week of November 16.
  
- The ReVamp playtest outcome is unconfirmed; MicroDuck's delivery dates conflict across the
  vendor's own pages today.

The items that would move the judgment most are unglamorous: an independent rerun of the
harness comparison; a documented Elo-to-index conversion; vendor-published calibration curves; a
proven case of a playtest build cloned into a competitor (or the quiet end of the fear); a filed
price range. Until then, the reader's leverage is the checklist, and the habit of asking what the
instrument was.

*Companion notebook (scrollable, ten pages): [What Did the Score Mean? — the notebook](/notebook/what-did-the-score-mean-notebook.html).*

## Sources and method

We re-read every primary source named above on November 8, 2026, dated each observation, and
compared the index readings from two archived captures of the same page. Not inspected: the
filing's exhibit terms and Note 17 detail; the FlashProve technical report and its Lean proof
sources; two quote variants confirmable only in search snippets, which stayed out of the text.
Figures reported by outlets (preorder counts, IPO targets, the independent probe's results) are
attributed where they appear; none was independently recomputed.
