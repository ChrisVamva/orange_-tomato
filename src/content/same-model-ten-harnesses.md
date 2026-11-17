# The model isn't the agent: what a ten-harness comparison actually shows

![The Orange Tomato mascot stands before a graffiti wall at night, its chest screen showing the article title; the wall is sprayed with model, harness, same, cost, and solved.](/images/same-model-ten-harnesses-lead.png)

Ten coding harnesses. The same open model. The same 113 tasks from the DeepSWE benchmark. Solved counts ranged from **62 to 3**.

That contrast is the cleanest public demonstration we have found of something teams routinely miss when they buy a coding agent: they pick the model, but what they are actually buying is the whole system around it — the harness. The question is what the comparison really shows, because the company that ran it also won it.

## What a "harness" is, and why it decides more than teams assume

A model alone does not fix a bug. Somewhere around the model sits scaffolding: the prompt and instructions that frame the task, the loop that lets the model read files and run commands, the planning step that breaks a change into pieces, possibly a separate checker that reviews work before it lands, and budgets for time and money. "Harness" is the collective name for that scaffolding — the software that makes a model into an agent.

That scaffolding is not decoration. It decides what the model can look at, how long it is allowed to try, whether its work is tested before it is accepted, and what the whole exercise costs. Two teams could wire the same model differently and get very different behavior. This is the claim the AgentField comparison set out to measure.

## Why the comparison is readable: DeepSWE

The harness comparison ran on [DeepSWE](https://arxiv.org/abs/2607.07946), a benchmark built by the data-evaluation company Datacurve. DeepSWE is a set of 113 software-engineering tasks written from scratch across 91 active open-source repositories and five programming languages. The tasks are designed to be untouched by model training: they are never contributed back to the public repositories, so a model cannot "remember" the fix from its training data. Each task is graded by a hand-written verifier that checks whether the requested functionality works, not whether the patch matches one specific expected diff.

That design addresses two known weaknesses of older benchmarks like SWE-bench, which mine merged fixes from public GitHub and grade with the tests that shipped with those fixes. DeepSWE's authors report that when an independent LLM judge re-reviews graded runs, it disagrees with DeepSWE's verifier about an order of magnitude less often than with SWE-Bench Pro's inherited tests — 1.4% of runs versus 32.4%. In other words: on this benchmark, a "solved" verdict is more likely to mean the problem is actually solved.

![At a workbench, the mascot sorts a stack of task cards beside a graffiti wall sprayed with tasks, original, verify, hidden, and graded.](/images/same-model-ten-harnesses-tasks.png)

## How the runs were controlled

AgentField's comparison is documented in its [CodeAF repository](https://github.com/Agent-Field/CodeAF/tree/20eb6952de6482ea8f8709784ff447b9d9ed3fc3) (pinned at commit `20eb6952`, 31 October 2026) and on its [senior-dev documentation page](https://agentfield.ai/docs/codeaf/senior-dev). The important controls:

- **One model everywhere.** Every harness ran the same model: DeepSeek V4 Flash 0731 (an open-weight model served via OpenRouter; the 0731 suffix in the model id denotes this release snapshot). For AgentField's own harness, the rig code shows every model role — planner, worker, checker, and the rest — pinned to that one model. The published table states the same model was used for every harness.
- **One grading path.** Regardless of which harness produced a patch, the patch was graded by DeepSWE's official hidden tests in a verifier with no network access. The rig also includes a "gold" control that grades each task's own reference solution first, so a scoring bug is caught before any money is spent on model calls.
- **Costs recorded as model API spend.** The "cost per solved issue" figures come from the harness's own usage ledger — what the provider billed for model calls. That is not the total cost of running a coding agent; it excludes machines, setup, monitoring, and human review time.

This is the strongest part of the comparison: the model is fixed, the tasks are fixed, and the grading is independent of the harness under test. It is a real controlled experiment, not a marketing photo.

## The results

The headline table (solves out of 113 DeepSWE tasks; the 95% confidence intervals for the solve rates are reported in the notes below):

| Harness | Solved | $ per solved issue |
|---|---:|---:|
| CodeAF (senior-dev) | 62 | $0.40 |
| mini-swe-agent | 56 | $0.77 |
| Codex | 51 | $0.83 |
| Pi | 42 | $0.94 |
| omp/kilo/opencode* | 31 | $1.81 |
| omp/kilo/opencode* | 30 | $1.90 |
| omp/kilo/opencode* | 30 | $1.82 |
| Claude Code | 16 | $1.36 |
| deepseek-harness | 16 | $10.59 |
| muse-code | 3 | $4.51 |

\* The order of omp, kilo, and opencode is inferred from the cost ratios (see below).

![Notebook diagram showing one model and the same task set feeding ten harnesses, with solved counts from 62 to 3 and per-solve model API spend annotated.](/diagrams/same-model-ten-harnesses-outcomes.svg)

*Diagram: same model, different outcomes — one engine through ten harnesses yields 3 to 62 solves; costs are model API spend.*

The same model therefore solved anywhere from 3 to 62 of the same 113 tasks depending on the system wrapped around it. Measured as model API spend per solved issue, the spread is even wider: the cheapest harness spent $0.40 per solved issue; the most expensive spent about 26 times that ($10.59). We re-derived those multipliers from the published figures — 1.9×, 2.1×, 2.4×, about 4.5×, 3.4×, 11.3×, and 26.6× — and they match AgentField's chart exactly.

Two notes before the numbers go to work. First, the 95% confidence intervals around these solve rates are wide: CodeAF's 54.9% spans 46–64%, mini-swe-agent's 49.6% spans 41–59%, codex's 45.1% spans 36–54%, pi's 37.2% spans 29–46%, the middle cluster at 27.4%/26.6% spans about 20–36% and 19–35%, Claude Code and deepseek-harness at 14.2% span 9–22%, and muse-code at 2.7% spans 1–8%. The intervals overlap for several neighboring harnesses — the ranking is not cleanly separated everywhere. Second, we could not verify the exact pairing of the three tools clustered around $1.81–1.90 per solve (omp, kilo, and opencode) from any single published table — the solve counts are public, but the letter-to-name mapping in the table is inferred from the cost multipliers. Treat the broad pattern as solid and the exact ordering of that middle cluster as less certain.

## The caveats, front and center

Here is what the comparison does **not** establish.

**The vendor ran it, and the vendor won.** AgentField built the harness, ran the comparison, and published it. Its own product, CodeAF, placed first on both solve count and cost per solve. The benchmark code and a large part of the rig are public — which is why we could inspect the controls — but the experiment was not run by an independent party, and we found no published independent replication. A third-party review of CodeAF (MindStudio, October 2026) makes exactly this point: the benchmark exists, the numbers are CodeAF's own, and they should be treated as a vendor claim until independently verified. That is how this article treats them.

**"Cost" means model API spend.** The per-solve dollars are what the provider billed for model calls. A team's real cost also includes the computers the harness runs on, setup, monitoring, and the human time spent reviewing what the agent proposes. A harness that spends less on model calls can still be more expensive to operate.

**One model, one benchmark, one snapshot.** This is a single comparison: one model, 113 tasks, one point in time (the results page revision is dated 22 October 2026; the repository changes daily). It does not tell you which harness is best for your codebase, your team, or your budget. And the exact settings of the other seven harnesses — their prompts, flags, and versions — are not fully published, so we cannot rule out that some of the spread reflects configuration luck rather than harness quality.

**A context check that prevents misreading.** The public [DeepSWE leaderboard](https://benchlm.ai/benchmarks/deepswe) (mirrored by BenchLM as of 1 September 2026) scores DeepSeek V4 Flash 0731 at 53.3% when run through mini-swe-agent at maximum reasoning effort — close to the 54.9% AgentField reports for its own harness with the same model. The model is plainly capable. The point is not "the model is weak"; it is that the harness around the model changes what that capability becomes.

![At night, the mascot studies a large ledger pinned to a graffiti wall sprayed with cost, solved, rank, caveat, and check.](/images/same-model-ten-harnesses-cost.png)

## What to demand from any agent benchmark

The practical lesson of this comparison is a checklist. When a vendor shows you a coding-agent score, ask:

- **Who ran it?** A vendor-run comparison is a claim, not an independent finding.
- **Was the model fixed across what is being compared?** If the harnesses run different models, you are comparing models, not harnesses.
- **Is the grading independent of the harness?** Hand-written verifiers that check functionality beat tests written for one specific fix.
- **What exactly is "cost"?** API spend is not total cost. Ask what is excluded.
- **Are the failures visible?** A solve rate without the failure cases hides where the harness struggles.
- **Has anyone else replicated it?** Until then, treat the ranking as provisional.

These are editorial suggestions, not a proven standard — but the same questions are what we asked of this comparison, and they are what exposed its limits.

## What would settle it

An independent reproduction — the same model, the same 113 tasks, and the same grading, run by someone with no product in the race — would convert a well-controlled vendor claim into an established result. Multiple runs per task would tell us how stable the spread is, because the published table rests on one pass per task. And a cost accounting that includes infrastructure and human review would tell teams what they will actually pay.

Until then, the honest summary is this: the system around the model decides a lot — enough that the same capable model solved 3 or 62 of the same 113 issues depending on the harness. When you choose a coding agent, you are choosing that system, not just the model. Just don't take anyone's chart — including this one — as the final word until someone else has run it.

---

## Sources & method

Orange Tomato reviewed the primary sources directly on 1 November 2026; the analysis is desk research, not firsthand testing, and no code from the benchmark was executed by us. Vendor claims are attributed as such.

- [CodeAF repository (pinned commit)](https://github.com/Agent-Field/CodeAF/tree/20eb6952de6482ea8f8709784ff447b9d9ed3fc3) — benchmark rig, run scripts, gold control, results chart.
- [AgentField senior-dev documentation](https://agentfield.ai/docs/codeaf/senior-dev) — ranked results table with Wilson intervals and cost per solved issue.
- [DeepSWE paper, arXiv 2607.07946](https://arxiv.org/abs/2607.07946) — benchmark design and verifier audit.
- [DeepSWE leaderboard mirror, BenchLM](https://benchlm.ai/benchmarks/deepswe) — independent mirror of the public leaderboard.
- [OpenRouter — DeepSeek V4 Flash 0731](https://openrouter.ai/deepseek/deepseek-v4-flash-0731) — model identity and availability.
- [MindStudio review of CodeAF](https://www.mindstudio.ai/blog/codeaf-crew-feature-benchmark) — third-party confirmation that the benchmark is vendor-run and not independently verified.

**Method note:** the comparison is a vendor-run, single-snapshot experiment; model API spend is the cost basis; the solve counts and cost multipliers were re-derived from the published table and matched the vendor's chart; the middle-cluster pairing (omp/kilo/opencode) is inferred from cost ratios. No paid API calls or benchmark runs were performed by Orange Tomato.
