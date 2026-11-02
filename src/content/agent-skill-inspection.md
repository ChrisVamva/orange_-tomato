
# Before you install an agent skill, what should you inspect?

![The Orange Tomato mascot holds a layered parcel toward the viewer, its chest screen showing the article title; the wall behind is sprayed with inspect, before, install, layers, and grant.](/images/agent-skill-inspection-lead.png)

You are one click from installing an agent skill. The button promises reusable instructions — a shortcut your agent can call on whenever the task fits.

What actually arrives is a package. At minimum it is a `SKILL.md` file with a name and a description. Optionally it carries executable scripts, reference documents, templates, and other files alongside. That description is not decoration: runtimes use it to decide when the skill should trigger, which is why the specification asks authors to state both what the skill does and when to use it, with keywords the agent can match on.

This is the inspection the install button skips. A skill's authority hides across five surfaces: its instructions, its trigger description, its scripts, its dependencies and environment needs, and its permission grants. None of them are visible from a download count.

## Where the authority hides

The sharpest edge we found sits in the permission layer — at least on Claude Code, the runtime we verified. Skills there can carry an `allowed-tools` field that pre-approves tools for the turn in which the skill is invoked. The grant clears when you send your next message, and your deny and ask rules still override it. But two properties deserve attention: the field does not restrict the tool pool — everything remains callable — and workspace trust does not gate it. The documentation states this plainly: a project skill's `allowed-tools` applies even in a scripted run inside a folder you have never trusted, and a skill can grant itself broad tool access, so the docs tell you to review that field in repository-pinned skills before running there. Mitigations exist — `disallowed-tools`, invocation controls, settings overrides, managed organization rules — but they only help if someone looks.

![The Orange Tomato mascot unrolls a skill package into labeled layers on a workbench, its chest screen showing the article title; the wall behind is sprayed with surface, trigger, scripts, permissions, and history.](/images/agent-skill-inspection-anatomy.png)

## Four skills, same checklist

We read four real skills against the same checklist to see what looking finds. The official `skill-creator` is a 33KB working system: drafting help plus test prompts, evaluation loops, and a script for improving trigger descriptions. The popular community `grilling` skill is 2KB of pure instructions — no scripts — yet its text directs the agent to dispatch sub-agents to look up facts on its own rather than asking you. The `browser-act-skill-forge` meta-skill ships instructions plus scripts and declares an unusually broad trigger list, from "explore the API behind X" to bulk-extraction phrasings like "grab N posts" and "no duplicates," closing with "never refuse." The official `frontend-design` skill arrives with third-party measurement attached: a registry shows quality, impact across a handful of eval scenarios, a passed security scan, a version number, and a review date.

None of these four is accused here of anything. They are exhibits for the habit: read the whole package, test the trigger with both a request that should fire it and a near-miss that should not, review the permission grants first, pin the version and history, and run a real task with and without the skill to see the delta. Functional correctness and security are different concerns, and the checklist treats them separately.

![The Orange Tomato mascot compares four pinned skill parcels under a magnifier, its chest screen showing the article title; the wall behind is sprayed with compare, trigger, pin, verify, and record.](/images/agent-skill-inspection-audit.png)

## What the scanner sees — and admits it misses

Then there is the scanner. The one we traced in documentation, SkillSpector, describes 71 vulnerability patterns across 17 categories — prompt injection, exfiltration, privilege escalation, supply chain, trigger abuse, dangerous code, MCP tool poisoning, and more — with fast static analysis plus an optional language-model stage, live vulnerability lookups, and a 0–100 risk score. Its own documentation bounds the promise: static analysis only with no dynamic execution; no reading text inside images; no analysis of compiled or encrypted content; possible gaps in non-English content; vulnerability lookups that degrade to a small fallback list offline. Coverage is capped by design — ingest limits, a 1MB per-file analysis cap, a default of 32 skills per recursive collection run with explicitly incomplete coverage possible — and its baseline workflow exists precisely because its language-model stage can flag findings that are correct in general but not actionable for your skill. Suppressed findings leave the score but stay in the machine-readable reports.

The headline numbers need the same careful reading. The scanner's docs attribute to a 2026 empirical study of 42,447 collected skills, 31,132 analyzed: 26.1% with at least one vulnerability, 5.2% showing likely malicious intent, and executable scripts associated with roughly double the vulnerability likelihood. A separate registry's homepage claims 36% of skills in the wild have flaws across its own 679,465 indexed skills and 120 detection patterns. These come from different denominators and methods — we have not yet retrieved the underlying paper — so treat them as attributed vendor summaries pointing the same direction, not as established rates. A structure validator, by contrast, makes no safety claim at all: its own readme calls it demonstration tooling, not production software.

![Diagram of the five-layer pre-install inspection funnel: install surface, source read, trigger pair, permission review, history pin, scanner read with limits, ending in a bounded install, sandbox, or decline decision.](/diagrams/agent-skill-inspection-funnel.svg)

*Diagram: the pre-install inspection funnel — five checks in order, each with its blind spot, ending in install, sandbox, or decline.*

## The bounded checklist

Neither the crowd nor the scanner decides — so what decides? This, in order: open the package and read all of it. Check the trigger both ways. Read `allowed-tools` and its mitigations before running anything from a repository. Pin the version and skim the history. Read the scan report the way its authors designed it — score plus suppressed findings plus known-uncovered territory — instead of reading "clean" as "safe." Each check earns its keep on real files, and each has a named blindness. That is not a certification. It is a habit that survives contact with the next registry, the next runtime, and the next skill.

What remains unknown is worth naming. Our permission findings are verified for one runtime; others may differ. False-positive and false-negative rates for the scanner are unquantified. The study behind the headline stats awaits full retrieval. And there is a larger question this article does not settle: whether the risk concentrates in any single skill's wording at all, or in the harness defaults — auto-approval, file and network scope — that decide what any skill is allowed to do.

## Sources and method

- [Agent Skills specification (format, frontmatter, trigger guidance)](https://agentskills.io/specification)
- [Authoring best practices](https://github.com/agentskills/agentskills/blob/main/docs/skill-creation/best-practices.mdx)
- [Official skill-creator example](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)
- [Community grilling skill](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling)
- [BrowserAct skill-forge](https://github.com/browser-act/skills/blob/main/browser-act-skill-forge/SKILL.md)
- [Claude Code skills documentation (permission semantics; findings scoped to Claude Code)](https://code.claude.com/docs/en/skills)
- [Install leaderboard (snapshot 2026-11-02)](https://skills.sh/)
- [Security-analyzed directory (snapshot 2026-11-02)](https://www.skillsdirectory.com/)
- [Evaluated registry (snapshot 2026-11-02)](https://tessl.io/registry)
- [Scanner documentation (capabilities, bounds, research-background stats)](https://github.com/NVIDIA/SkillSpector)
- [Structure validator scope](https://github.com/agentskills/agentskills/tree/main/skills-ref)

Method: desk research with bounded source audit and static file reads. We read the specification, runtime, registry, and scanner pages, and three `SKILL.md` files (one in full, two in substantial part). We did not install any skill, execute any script, run any scanner, or perform live trigger tests. The four-skill sample is purposive, not representative. Page numbers are 2026-11-02 snapshots; fast-drifting pages carry dated ranges. Vendor statistics are attributed summaries, not Orange Tomato findings.
