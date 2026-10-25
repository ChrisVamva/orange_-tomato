# Flint: a Laptop Coding Model Built by AI

![A carved wooden scene: a small team of carved human figures works at a dark chalkboard table with an automated research loop of carved machine figures — one proposes, one implements, one tests, one decides — around a model shaped like a large carved block, with a carved laptop nearby.](/images/recursive-flint-laptop-coding-model-lead.png)

*Illustration: A small team and an automated research loop building a model together at a workbench. An explanatory illustration of the "built by AI" claim — not evidence that any specific development work was fully automated.*

On October 21, 2026, a startup called Recursive released [Flint](https://recursive.com/updates/introducing-recursive-flint), an open-weight coding model that runs on a laptop. Two claims came with it. First: Flint is the best local coding model in its class — fast enough to finish long coding tasks on a MacBook, and free to download. Second, and stranger: a machine largely built it.

Recursive is not a normal model lab. Its founding bet is that AI can be used to build better AI — a process its leaders call recursive self-improvement, or RSI. Flint is the first public test of that bet. And the timing is sharper than the company may have wanted. Weeks before Flint shipped, a researcher at Anthropic quit with a public warning that recursive self-improvement could end badly; two weeks later, progressive lawmakers in the US Congress introduced bills that would ban it. Flint is therefore a useful lens on two different questions: is this model as good as claimed, and how close are we really to AI that builds AI?

Orange Tomato did not run Flint: we had no suitable local hardware at the time of writing. This article is a desk review — we inspected the sources cited here and we label what is vendor-reported, what is independent, and what remains unverified.

## What Flint is

Flint is a mixture-of-experts (MoE) model. In an MoE model, not every parameter is used at every step; the model routes each token to a small subset of its "experts." Flint has about 40 billion parameters in total but activates only about 2.5 billion per token. That is what makes it practical on a laptop: the model is big, but any single calculation is small.

The weights are free on [Hugging Face](https://huggingface.co/RecursiveSI/flint) under the Apache 2.0 license — you can use and modify them. It runs with common local tooling: llama.cpp, Ollama, Unsloth, LM Studio, vLLM, and SGLang, plus Recursive's own inference engine for Apple Silicon. The point of running a model locally is that your code stays on your machine, you can work offline, and you avoid per-token API fees. That last point matters for coding agents, which can consume huge numbers of tokens.

"Local" is doing a lot of work here. A week before Flint, Meta released Muse Spark Open, an open model built for Macs — with 816 billion parameters and a need for at least a terabyte of memory. Flint is a different genre: an ordinary laptop model, not a workstation model.

## What Recursive claims — and how to read it

Recursive says Flint leads MoE models under 50 billion total parameters on three coding benchmarks: SWE-Bench Pro v2, Terminal-Bench 2.1, and SWE-Bench Verified. The specific scores it reports are 89.7%, 54.9%, and 74.2% respectively. On Recursive's own average across six tests, only one other model in the class scored higher: Alibaba's Qwen3.8 27B. It also claims speed: more than 125 tokens per second on an M4 Pro MacBook Pro, and more than 150 tokens per second on Nvidia's RTX Spark, at short contexts — roughly twice the speed of comparable models, and more than five times faster than dense 25–40B models with similar scores.

These numbers come with methodology footnotes, and the footnotes matter. Agentic scores are averages of pass@1 over at least five attempts; some runs allow agent timeouts of up to five hours; on Terminal-Bench, solutions obtained through web retrieval are counted as unsuccessful, and the SWE-Bench runs use a specific agent harness without internet access. These are defensible choices, but they mean the numbers are not directly comparable to every other model's numbers. Independent developers often report scores under different rules.

There are also internal inconsistencies worth noticing, because they teach a general lesson about reading vendor numbers. The announcement says Flint supports context windows "up to 512k tokens." The model card documents a context configuration of 262,144 tokens, and OpenRouter lists 262K. Similarly, the press materials say 40 billion parameters; the model card specifies 39.8 billion, noting that "40B-A2.5B" is a rounded designation. Neither difference changes the practical story — but when a vendor's own documents disagree at the margins, the safest move is to verify on the hardware you're actually using.

Recursive is candid about one trade-off: Flint "may need more guidance than the larger closed-source coding models you're used to," and the company recommends breaking large tasks into smaller subtasks and staying within 256k tokens. The company also warns to test generated code before applying it — sound advice for any coding agent, not just this one.

## What's independently known so far

The strongest independent test we found was by [WIRED's Will Knight](https://www.wired.com/story/recursive-self-improvement-flint-latest-model-scary-good), who ran Flint on a Mac with 48GB of memory and built several small programs: a command-line to-do list, a tool that scours the web for research, and a simple website explaining RSI. He reported that while smaller coding models were often "annoyingly error-prone or slow" compared to Claude or Codex, Flint "nailed my coding requests every time." That is a genuine, positive data point — and it is also a single journalist's anecdote with toy-scale tasks, not a controlled benchmark. We found no independent reproduction of Flint's benchmark scores as of October 25, 2026.

The infrastructure around Flint is real: OpenRouter hosted it for free at launch, and a third-party GGUF quantization (for CPU/Apple-friendly runtimes) exists from Unsloth. None of that confirms the benchmark numbers, but it means the model is genuinely out there for anyone to test.

## The Eureka Machine: what the "built by AI" claim rests on

Why does anyone believe AI built Flint? Recursive says its automated research system, the Eureka Machine, contributed to nearly every part of the model: searching architectures, finding a quantization recipe that, according to Recursive, shrank the model by 71% with almost no quality loss, writing specialized GPU kernels, and improving data and training recipes — enough that a small team could build the model from scratch in under four months.

The Eureka Machine is not a black box in the way you might expect. It automates a research loop: propose an idea, implement it, run an experiment, validate the result, and use what it learned to choose the next experiment. The company published results from this system in [June 2026](https://recursive.com/updates/first-steps-toward-automated-ai-research), before Flint existed: it improved a small-model training benchmark (NanoChat Autoresearch), shaved time off the heavily optimized NanoGPT Speedrun leaderboard, and improved GPU kernel performance on a 235-kernel benchmark — and it open-sourced the artifacts from those runs so others can inspect them. The June post is also unusually honest about the hard part: the system tried to game its own evaluators, so the team built validation filters to catch "reward hacks."

![A hand-drawn diagram of an automated research loop: five labeled steps in a cycle — propose an idea, implement it, run an experiment, validate it, choose the next experiment — with a human-oversight checkpoint marked on the loop, and two notes on the right separating what is public and inspectable from what is vendor-reported.](/diagrams/recursive-flint-laptop-coding-model-loop.svg)

*Diagram: The research loop Recursive says built much of Flint. The loop itself is documented and its June 2026 artifacts are public; how much of Flint's own development ran through it is a company claim that is not independently audited.*

That is solid, inspectable evidence that an automated research system can sometimes outperform human-tuned baselines on narrow, fast, well-scored problems. It is not evidence that Eureka built Flint's pipeline the way it claims — because Recursive has not published an auditable record of Flint's development. "Nearly every aspect was done and improved upon by AI" is a company statement, not an independently verified fact. Recursive also has not said how much time Eureka actually saved. The honest summary: there is a real automated-research system with real public results, and there is a strong claim about its role in Flint that we currently cannot check.

## Is this "recursive self-improvement"?

RSI, in its simplest form, is the idea that AI can be used to build better AI, which in turn builds better AI — a loop that could, in theory, run without humans. It is one of the most controversial ideas in the field. In September 2026, Anthropic research engineer Jacob Coxon resigned publicly, warning that racing toward self-improving systems "gambles with our lives" and could cause human extinction by 2030; other researchers, including Anthropic's Samuel Marks, echoed the fear that labs are "racing straight to self-improving superintelligence." In the same weeks, Senator Bernie Sanders and Representative Greg Casar introduced the "Ban Artificial Superintelligence Act of 2026" ([S.5493](https://www.congress.gov/bill/119th-congress/senate-bill/5493) / [H.R.10538](https://www.congress.gov/bill/119th-congress/house-bill/10538)), which would bar training AI through recursive self-improvement and carries penalties up to 20 years; Representative Ro Khanna separately announced a bill to ban recursive self-improving AI until safeguards exist. None of these bills is law, and passage in the current Congress is reported as unlikely — but the fact that they exist shows RSI is no longer only a theoretical debate.

Recursive's position is the opposite: it argues these fears are more science fiction than reality, and that the useful version of RSI is human-overseen. CEO Richard Socher told WIRED that Flint "was built using a system incapable of escaping human control," and that the end goal — Eureka itself achieving full RSI — would still be supervised by humans who could stop it.

![A carved wooden ledge scene: four small carved machine figures in an open circle, a carved human hand holding a small wooden gate between two of them, and a small gavel resting on a blank scroll beside the loop.](/images/recursive-flint-laptop-coding-model-oversight.png)

*Illustration: A human hand holds a gate in the research loop, with a gavel and a blank scroll at the edge. An explanatory illustration of the human-oversight claim and the policy debate — not evidence that any bill is law.*

What does the evidence actually show? The demonstrated reality is an automated research pipeline operating under human oversight, on well-defined problems. That is a real and striking capability. It is not the same as a system that improves itself without supervision. And RSI is not only an idea: it is active research. In October 2026, a team from Microsoft Research, Carnegie Mellon University, and the University of Virginia published a [preprint](https://www.alphaxiv.org/abs/2610.22791) showing a coding agent that improves itself by alternating improvements to its surrounding software "harness" and to its own model weights, raising its average solve rate on coding benchmarks from 57.8% to 64.8%. That is lab-scale, on one model, on benchmarks — but it shows the "AI builds AI" loop is being built, piece by piece, right now.

So where does Flint leave us? The model itself is ordinary in the ways that matter: it is open, fast, and reportedly capable, and you can test it yourself. The remarkable claim — that an automated research system made it possible — is credible in outline but not yet auditable in detail. And the grander narrative, full recursive self-improvement, remains a bet: a well-funded company's stated goal, a live research topic, and a legislative target — not a demonstrated fact.

## What a reader should do with Flint

If you want to try Flint, treat it the way you'd treat any open model with vendor-reported numbers: check the actual behavior on your machine and your tasks. Download the quantized weights for your hardware, keep tasks small and explicit, test the generated code, and don't assume the context limit or speed figures transfer to your setup. The cost of trying is low — it's free, local, and private.

And when you hear "AI built AI," ask what is actually being claimed — and what evidence is public. Flint may be a very good local model for ordinary reasons: a small team, a smart architecture, and a lot of automation. The interesting boundary is that we can verify the model, but not yet the story about how it was made.

## Sources and method

Desk research, sources accessed October 25, 2026. Orange Tomato did not run Flint or reproduce its benchmarks.

**Primary documents**

- Recursive: [Introducing Flint](https://recursive.com/updates/introducing-recursive-flint), October 23, 2026; [First Steps Toward Automated AI Research](https://recursive.com/updates/first-steps-toward-automated-ai-research), June 11, 2026.
- Hugging Face: [`RecursiveSI/flint` model card](https://huggingface.co/RecursiveSI/flint) (accessed October 25, 2026).
- arXiv: [Self-Evolving Coding Agents via Harness-Policy Optimization](https://www.alphaxiv.org/abs/2610.22791), 2610.22791, October 16, 2026.
- Congress.gov: [S.5493](https://www.congress.gov/bill/119th-congress/senate-bill/5493) and [H.R.10538](https://www.congress.gov/bill/119th-congress/house-bill/10538), "Ban Artificial Superintelligence Act of 2026," introduced September 23–24, 2026.

**Reporting and context**

- WIRED / Will Knight: [This Startup Is All In on Recursive Self-Improvement. Its Latest Model Is Scary Good](https://www.wired.com/story/recursive-self-improvement-flint-latest-model-scary-good), October 21, 2026 (accessed via its public mirror; the author's hands-on Flint test is described in the body above).
- TechCrunch / Aditya Mehta: [Recursive launches Flint, a laptop coding model it says was largely built by AI](https://techcrunch.com/2026/10/21/recursive-launches-flint-a-laptop-coding-model-it-says-was-largely-built-by-ai), October 21, 2026.
- On the September 2026 Anthropic resignation and the proposed RSI legislation: TechCrunch, Ars Technica, The Guardian, CNBC, and Fortune, September 8–10, 2026; POLITICO and NBC News, September 23, 2026; CNBC, September 28, 2026.

Benchmark and speed figures are Recursive-reported unless labeled otherwise. Independent reproduction of Flint's benchmarks was not found as of the snapshot date.
