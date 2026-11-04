# What "proved which model answered" actually guarantees

![Mascot and editorial companion beside a neon totem holding a sealed packet tied to a registry plate at night.](/images/anthropic-flashprove-provable-inference-lead.webp)

When an app tells you "this answer came from Model X," you are taking someone's word for it. That word can break in ordinary ways: a routing service sends your request to a cheaper model to save money, a compromised server alters the token stream, or an evaluator tests one model while users get another. The output alone does not settle it. Even a good answer does not say which weights produced it.

[Anthropic's answer](https://www.anthropic.com/research/provable-inference), published November 2 with code under the name [FlashProve](https://github.com/anthropics/FlashProve/), is to make the label checkable with cryptography. The idea is called provable inference. The provider commits to a set of weights once, then attaches a short proof to each reply showing that those committed weights produce exactly those tokens on that prompt. Anyone holding the commitment — obtained from a party they trust, not from the server being checked — plus the prompt and the reply can check the proof on an ordinary CPU, without seeing the weights.

This is a research prototype, not a deployed guarantee. Anthropic describes it as "intermediate progress, and not a completed research agenda", released so others can improve it, with no plans to deploy it at Anthropic or any other lab. The code is Apache 2.0 and explicitly "not maintained". That status matters. The strongest reading of this piece depends on details that are still prototype-grade.

The mechanism comes in two phases.

In the offline phase, the provider publishes a commitment — think of it as a fingerprint that pins down one exact choice of weights while keeping the weights themselves hidden. Later proofs are checked against that fingerprint. In the online phase, the provider's GPU produces a proof file alongside each reply stating: the committed model produces these output tokens when evaluated.

A proof is meant to satisfy four properties. It is accepted when honest (completeness). It cannot be forged without breaking widely believed cryptographic assumptions — a claim proved only for the Lean verifier under narrow conditions (exact-match policy, random-oracle model; see below) (soundness). It reveals nothing about the weights or intermediate computation beyond the statement itself (zero-knowledge). And it is small and cheap to check compared with re-running the model (succinctness). The architecture is not hidden, and was never meant to be.

The demonstration case is Llama 4 Maverick, a 400-billion-parameter mixture-of-experts model where about 17 billion parameters are active per token. It runs in 4-bit quantization with integer arithmetic in prefill. Anthropic reports a single H100 GPU generating proofs at around 110 tokens per second, with about 19 MB of proof per 1,024-token request. Their comparison point is vLLM, a common open-source inference engine: proving takes, per GPU, roughly 70 to 95 times longer than running the model itself. The project's own [performance notes](https://raw.githubusercontent.com/anthropics/FlashProve/main/guide/performance.md) put it at 71.4 times slower than vLLM handling 24 requests at once, and 93.0 times slower than vLLM at the highest load tried — and add that their rates "are not the most that those machines can do, and a baseline that is too low flatters the prover."

![Mascot and companion examining a sealed packet with a verifier lens beside neon structures.](/images/anthropic-flashprove-provable-inference-verify.webp)

Verification is the lightweight side by design. The client downloads the commitment once — about 6.5 MB in Anthropic's summary, 6.24 MB plus config files in the detailed notes — then one proof per request, and checks it with no GPU. Anthropic summarizes the check as seconds on a 24-core CPU; the detailed notes time it at about 17 seconds on 24 threads and about 21 seconds on a single thread. That headline does not include everything a deployment would pay. Batching means a request waits for its whole batch, about 220–226 seconds from a batch's start to its proofs at 24 per batch. The serving scripts' own check adds roughly another 89–94 seconds per batch on top.

The part that deserves slow reading is soundness — and how narrowly it is proved.

Soundness here is machine-checked in Lean, a formal verification language. The proof covers only the Lean verifier, not the C++ verifier users actually run or the CUDA prover that makes proofs. The proved bound is that the Lean verifier accepts a false claim with probability at most about q/2¹²⁴ + 2⁻¹⁰¹ after q hash queries, in the random-oracle model, for exact-match claims. Exact-match means every output token must be the model's top choice — a strict policy. The C++ and CUDA programs are described as written to follow the same protocol and tested against it, not themselves proved. The details are in the project's [what-is-proved](https://raw.githubusercontent.com/anthropics/FlashProve/main/guide/what-is-proved.md) note.

![Notebook diagram showing commit once, prove per reply, check on CPU, and yes or within limits verdict, with a note listing what stays outside the proof.](/diagrams/anthropic-flashprove-what-a-pass-proves.svg?v=2)

*Diagram: what a passing check proves — committed integer weights to tokens to verifier decision; real-model name, correctness, and display stay outside.*

Three limits from Anthropic's own documents narrow what "YES" means, and each belongs beside any claim about proof.

First, the provider chooses the model. As the [known-limits guide](https://raw.githubusercontent.com/anthropics/FlashProve/main/guide/known-limits.md) puts it, a yes "does not say whose weights they are, that the shipped committer made the commitment, or which real model it is." A provider can commit to any model it likes, including a small or degenerate one, and the commitment ID must come from a party you trust — never from the server being checked or files sent with the proof. The proof binds an output to committed weights; it does not tell you those weights are the frontier model named on the invoice.

Second, the policy most likely to be used in practice proves less. Under the looser clipped-gap policy that serving would use, an accept means only that the output's token costs meet the policy's limits. The docs warn that this "by itself bars little", since with loose limits almost any output passes. Lean's theorem for that policy says only that the output meets it. This is not a corner case: of 96 honest replies from stock engines, none would have passed exact-match, which is why serving needs the looser policy — and why the project advises that "if you cannot assess [the limits], accept only exact match."

![Proof token on a plinth with covered markers set beyond a boundary line under neon light.](/images/anthropic-flashprove-provable-inference-outside.webp)

Third, what is proved is an integer, quantized version of the model. How far its outputs track the original floating-point model is, in their words, "a measurement, not part of any proof". In one measurement with a Python implementation, the top token differed at 6.81% of positions. No trained weights are shown to meet the protocol's range conditions in the proved sense.

None of that erases the use cases Anthropic sketches — they are worth stating as proposals, not outcomes. A regulator could ask for certificates covering inference served in a period, to check that the hardware was serving the claimed model, and could require proofs that only approved models are served. Their own caveat applies: this "does not establish that the hardware is not, e.g., training on the side". A company could require a proof on every response so a compromised server or a substituting model cannot pass without forging. A developer could attach a proof that a scan or analysis was done by a specific model rather than a cheaper stand-in. The work is software-only cryptographic proof, described as complementary to hardware approaches like trusted execution environments, not a replacement.

Further cautions come from the project's own honesty. The runs' records behind the speed figures are not in the repository, "so a reader cannot check the figures on this page against them." And two published attacks on the underlying Fiat-Shamir approach "have not been examined against this protocol or these programs." At 64 requests per batch — the fastest rate in the table — the docs say plainly it "is not to be relied on with an 80 GB card."

So what does a passing check actually establish? That the tokens you hold are the output of the integer-quantized weights pinned by that commitment, under the stated policy, as judged by that verifier — if you got the commitment ID and configuration from someone you trust and built the request file yourself. It does not establish which real model those weights are, that the output is correct or safe, how the surrounding app displayed it, or what else the hardware was doing.

That is narrower than "proved which model answered," and still useful. Substitution resistance plus auditability without revealing weights is a genuine step — if future work keeps the meaning narrow, reproduces the numbers independently, documents registry practice for commitment IDs, and gives verifiers a way to judge fitted limits. Until then, treat a "proved" label the way the proof asks to be treated: check where the commitment came from, read the last line and not just the exit code, and ask whether you got exact-match or within-limits.

## Sources and method

Desk research and source audit only; no code was built or run and no proofs were generated or checked for this article.

- Anthropic, [Progress on provable inference for large language models](https://www.anthropic.com/research/provable-inference) (published Nov 2, 2026, accessed Nov 4, 2026) — mechanism, guarantees, uses, performance summary.
- anthropics/FlashProve ([repository](https://github.com/anthropics/FlashProve/), HEAD 9e2bdd8 Oct 30, accessed Nov 4, 2026) — README v0.16.0; [what-is-proved](https://raw.githubusercontent.com/anthropics/FlashProve/main/guide/what-is-proved.md); [performance](https://raw.githubusercontent.com/anthropics/FlashProve/main/guide/performance.md); [known-limits](https://raw.githubusercontent.com/anthropics/FlashProve/main/guide/known-limits.md).
- [TechCrunch launch summary](https://techcrunch.com/2026/11/03/anthropic-is-working-on-a-system-to-prove-ai-models-identity/) (Nov 3, 2026) — context only.

All performance figures are vendor-measured as stated in those sources. A further reporting step searched no independent reproduction as of Nov 4; the technical report, paper PDF, and Lean theorem full text were not inspected.
