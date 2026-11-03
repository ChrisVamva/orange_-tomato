# Do agent instruction files measurably improve coding-agent results?

![Mascot robot beside a workbench with three cards feeding a machine slot under an inscription panel, neon totems behind.](/images/agent-instructions-effect-lead.webp)

Every team with a coding agent eventually faces the same file. It sits at the repo root, named `AGENTS.md` or `agents.md`, and it grows. Commands. Test instructions. Folder maps. Style rules. Git conventions. A list of things the agent must never touch. It feels responsible to maintain it — and it costs context on every run.

The practical question is sharper than "should we document?" It is: when the model, harness, codebase, and task are held fixed, do those standing instructions improve completed work enough to justify their tokens — or can a longer spec make results worse?

The honest answer from what we could inspect is: the advice converges, the proof does not exist yet.

![Close view of the mascot holding an etched checklist card beside stacked cards, blurred neon background.](/images/agent-instructions-effect-checklist.webp)

GitHub published an analysis of more than 2,500 agent instruction files in November 2025. If you have seen the checklist since — put commands early with flags, show a real code snippet instead of three paragraphs, name the exact stack, cover commands, testing, structure, style, git workflow, and boundaries, use Always / Ask first / Never — you have seen this post's influence. The example in the post is a docs-agent that may read `src/`, must write to `docs/`, can run `npm run docs:build`, and must never touch `src/` or commit secrets. It is clear, concrete, and easy to copy.

What the post does not give you is a definition of "successful." We read the full text. There is no metric, task set, grader, denominator, or comparison that would let you tell whether files with those traits solved more tasks. "Most agent files fail because they're too vague" appears as a verdict without a failure rate. "Never commit secrets was the most common helpful constraint" appears without a count. That does not make the checklist wrong. It makes it hygiene, not evidence of lift. The patterns may reflect experienced authors or reviewer taste rather than file-caused success — the post cannot separate those explanations.

A widely shared spec-writing guide reaches the same place from practitioner experience. Its version is: start with a short goal statement, let the agent expand it into a plan, enforce plan-first in read-only mode, structure the spec like a small PRD, feed the agent one task slice at a time, require self-checks, and iterate with tests. It also contains the caveat its copiers often drop: do not over-spec a trivial task. Detail helps when it matters, hurts when it distracts.

The strongest harm story comes from a different kind of study, and it needs a boundary around it.

You may have seen "the curse of instructions" invoked to argue that long `AGENTS.md` files must hurt. The secondary summary we could inspect describes a benchmark called ManyIFEval with one to ten objectively verifiable instructions per prompt, tested on GPT-4o, Claude 3.5, Gemini 1.5, Gemma2, and Llama 3.1. The reported pattern is exponential: the chance of satisfying all instructions falls roughly as the single-instruction rate to the power of n. Self-refinement — generate, check what was missed, regenerate — partly recovers performance in that summary, at the cost of extra passes.

Two limits matter before you apply that to your repo file. First, we could not inspect the paper itself; the OpenReview PDF returned a verification wall in this pass, so every percentage from that work stays out of this article until the primary is verified. Second, even on its own terms, that benchmark constrains a single output with N simultaneous requirements. A repo spec is persistent context for multi-step coding with tools, retrieval, iteration, and tests — a different mechanism. The same summary notes that independent tasks sharing context can improve, not degrade — more context is not uniformly harmful. Overload is a plausible mechanism for why bloated specs could hurt, but it is inference for `AGENTS.md`, not a demonstration.

![Three parallel tracks with different-length cards running to a shared scoring block, mascot observing in profile.](/images/agent-instructions-effect-tracks.webp)

And if you want more than hygiene, pre-register a small fair test and publish it. Ours would look like this — design only, no results yet:

- Fix model, harness, repo snapshot, and execution conditions.
- Compare three conditions: no repo spec, a concise task-oriented spec of about fifteen lines, and a longer structured spec covering the six areas.
- Use five or six varied tasks so one brittle issue cannot decide: a bug fix, input validation, a small refactor, adding a test, a docs update, and a boundary-respect check.
- Repeat where feasible. Score completion, test results, requirement adherence against a checklist, regressions, and tokens plus time. Publish prompts, task set, rubric, raw outcomes, and limits.

![Notebook diagram of three equal tracks from one task input to shared scoring, with tokens and time noted.](/diagrams/agent-instructions-effect-test-design.svg)

*Diagram: same task under three instruction conditions, scored on outcome plus tokens and time. Design only; no results.*

Even that test, once run, would establish only what happened under its model, harness, tasks, and specs. It would not crown verbosity as the variable if specificity, freshness, and conflicts differ too. Report cost beside quality: a small quality gain may not justify permanent context on every run.

The files are worth keeping lean, current, and specific. The claim that the standard long file measurably helps is not yet earned. That distinction — between tidy documentation and demonstrated lift — is what the next experiment should settle.

## Sources and method

- GitHub Blog, Matt Nigh, "How to write a great agents.md: Lessons from over 2,500 repositories," published 2025-11-19, updated 2025-11-25. Full page text inspected 2026-11-03. Used for checklist summary and for what "successful" does not define. https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/
- MaxPool research summary, "Curse of Instructions," inspected 2026-11-03 as secondary summary only. Used to describe the ManyIFEval direction and its limits; no percentages cited until primary verified. https://maxpool.dev/research-papers/curse_of_instructions_report.html
- OpenReview PDF (Harada et al.) attempted 2026-11-03; returned verification-wall HTML, not inspected. Withheld from citation.
- Method: desk source audit, lead-only, no model/API execution, no test run. Proposed comparison is design only. Versions/dates as above; fast-moving docs to be rechecked before release.
