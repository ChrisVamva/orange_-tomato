# When a stealth model gets a name: what MiniMax's M3.1 Flash launch lets you inspect

![A carved wooden figure kneels at a dark chalkboard table examining five separate carved objects — two small figures joined by a cord, a cluster of small disc tokens, a slate board with a raised triangular mark, a neat stack of disc-like coins, and a heavy dark block with a chain and a blank tag — with a carved archway form standing to the right.](/images/minimax-m31-flash-lead.jpg)

*Illustration: Five inspectable objects laid out separately on a table — an unnamed-model pair, a pile of usage tokens, a vendor scorecard, a stack of price discs, and a heavy weights-and-license block — with a hosting-platform arch at the edge. An explanatory illustration of distinct evidence layers, not a measurement or a product photograph.*

For about ten days in the autumn, one of the most-used models on the AI platform OpenRouter was one nobody could name. It was listed as "Space Bunny Alpha." On 19 October 2026, MiniMax said what it had been: an early version of MiniMax M3.1 Flash, a model the company was launching that day and marketing for coding and "agentic" work — tasks where a model is expected to call tools and act across several steps rather than answer a single question.

The reveal settled a real question — who made the unnamed model — and it attached a much larger bundle of claims to it: popularity, speed, cost, benchmark scores, and downloadable weights. Those claims are not one thing. Some are documents a reader can open today; some are the vendor's own measurements; some are a platform's statistics. The question here is deliberately narrow: which of them can you actually inspect, and what does each one support? It is not whether M3.1 Flash is a good model. Deciding that would require testing this article did not do.

## Anonymous for ten days, and what the usage numbers say

Space Bunny Alpha appeared on OpenRouter on 23 September 2026, [according to its listing](https://openrouter.ai/stealth/space-bunny-alpha), with a one-million-token context window and support for text, image, and video input. Its maker was hidden, which is the point of [OpenRouter's "stealth" program](https://openrouter.ai/stealth): an unnamed model is test-run on the platform, often for free, in exchange for user feedback before it is announced.

When MiniMax revealed the identity on 19 October, OpenRouter said in [its launch thread](https://xitter.cf/OpenRouter/status/2112152045461680591) that the stealth model had been its number-one model for ten straight days and had processed 56.7 trillion tokens, more than any stealth model it had run; that it left the platform on 5 October and returned that day as M3.1 Flash, free for 72 hours. MiniMax's own account in [its launch blog](https://www.minimax.io/blog/minimax-m31f) uses a bigger number: the company said Space Bunny "processed more than 200 trillion tokens" while it was unnamed.

So three figures describe the same model — 56.7 trillion (OpenRouter, platform-wide), more than 200 trillion (MiniMax, undefined scope), and, on 25 October, a live activity widget on the Space Bunny Alpha page showing roughly 4.06 trillion prompt tokens and 135 billion completion tokens. These can all be accurate descriptions of different periods and different scopes; MiniMax does not say which, and the widget does not explain its own window. The thing to notice is what none of them is: a measure of quality. Token volume counts how much text went in and came out, not whether the output was correct, and a rank on tokens is a rank on traffic.

There is also a data-handling detail worth reading before trusting a free stealth model with anything sensitive. [OpenRouter's stealth terms](https://openrouter.ai/terms/stealth), updated 14 September 2026, say that user content is shared with the stealth provider, that the platform may not disclose who that provider is, and that the terms bar reverse engineering, publishing confidential performance information, and submitting sensitive personal data. The Space Bunny listing adds that prompts and completions may have been retained by the provider but were not used for training.

## What MiniMax claimed, and who checked

MiniMax's [launch blog](https://www.minimax.io/blog/minimax-m31f) and its [launch post](https://xitter.cf/MiniMax_AI/status/2112150867868541221) make the marketing claims: a "generational leap" in agentic tasks, coding, computer use, and cybersecurity; online inference "nearly 3× faster"; usage costs "down 70%"; everyday output "200+ TPS"; and weights "later" that week, with the launch post naming 23 October.

The benchmarks also come from MiniMax. The launch post cites Automation-Bench at 62%, ALE at 30%, DeepSWE at 74%, and BabyVision at 91%. The blog and the [Hugging Face model card](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash), published later, use more precise figures — Automation-Bench v1.0.6 at 62.8, ALE at 29.6, DeepSWE at 73.7 — alongside BankerToolBench 76.2, OSWorld V2 61.7, and CyberGym 82%.

Two cautions. First, this is a vendor's own scorecard, run by the company and presented against a set of comparisons it chose. It is evidence of what MiniMax says it measured, not an independent evaluation. Second, the names matter. OpenRouter's thread, restating MiniMax, refers to "72.5% on AutomationBench-AA," while MiniMax's own blog uses both "AutomationBench-AA" and "Automation-Bench," and the Hugging Face card lists Automation-Bench v1.0.6 at 62.8. Coverage that mixes the 72.5 and the 62.8 into one score is combining figures that appear together in no single source. MiniMax's table also says the model ranks first among Chinese models on OSWorld V2 and ALE; that is a framing defined by MiniMax, and the same table lists higher scores from some non-Chinese models.

Independent scores exist, and they do not simply repeat the vendor table. [Artificial Analysis](https://artificialanalysis.ai/models/minimax-m3-1-flash), which runs its own tests, gave M3.1 Flash an Intelligence Index of 43, measured output at 111.7 tokens per second on MiniMax's API with a 1.46-second time to first token, and put the cost at $0.22 per index task. On OpenRouter's own listing, third-party Terminal-Bench 4.0 results appear at 25.8% (Artificial Analysis) and 25.3% (Vals AI) — against 38.1% in MiniMax's table, run on a different harness. The scores do not agree, and they are not measuring exactly the same thing.

MiniMax also lists internal cybersecurity evaluations, including the 82% CyberGym figure. Those are scores MiniMax states about its own testing, not a demonstration that we performed, and nothing here should be read as operational guidance.

![Diagram of five stacked evidence layers for MiniMax M3.1 Flash, each pairing what it supports with what it does not settle.](/diagrams/minimax-m31-flash-inspectability-stack.svg)

*Diagram: The five inspectable layers of the M3.1 Flash launch — identity, usage, vendor benchmarks, list price, and the weights and license. Each layer is published by a different party and supports a smaller claim than the launch sentence implies. No inspected source independently measures the claimed three-times speed or one-third cost on a real agent workflow.*

## Price: a list rate, then a market

MiniMax's published list price for MiniMax-M3.1-Flash is $0.15 per million input tokens, $0.60 per million output tokens, and $0.015 per million cached input tokens, [per its pricing page](https://platform.minimax.io/docs/pricing/overview). That "cached" price is easy to miss: the model can reuse part of a prompt it has seen before and charge a fraction for it, which changes the effective input cost for repetitive agent runs.

The launch claims a cost cut, so it is worth comparing with the predecessor. MiniMax's price page lists the earlier MiniMax-M3 (at up to 512,000-token context) at $0.60 input / $2.40 output, with a "permanent 50% off" to $0.30 / $1.20. Against those published numbers, Flash is 25% of undiscounted M3's input and output, or 50% of discounted M3 — not one-third. The tweet's "1/3 the cost of M3" and the blog's "70% lower agentic usage cost" are not formulas a reader can reproduce from the list prices; the 70% figure in particular is about the cost of a completed agent task, which MiniMax does not define.

On OpenRouter, the headline rate a buyer sees may not be MiniMax's. On 25 October [the listing](https://openrouter.ai/minimax/minimax-m3.1-flash) showed MiniMax at $0.15 / $0.60 / $0.015, other providers cheaper for the same model (one at $0.09 / $0.50), a weighted average input cost near $0.02 per million because of heavy cache use, and MiniMax holding about 64% of the model's token share over one day. The free 72-hour window had ended; the listing recorded its close on 22 October.

And a list price is not a bill. It excludes retries, tool calls such as MiniMax's web search at $0.01 per request, "thinking" tokens that a reasoning model produces and bills as output, and any human review of what an agent did. The per-token rate is the smallest part of the total cost of an agent workflow; it is also the only part MiniMax publishes.

## The weights arrived — with conditions

MiniMax promised weights on 23 October, and they arrived. The Hugging Face repository [MiniMaxAI/MiniMax-M3.1-Flash](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash) exists, is not access-gated, and its [file metadata](https://huggingface.co/api/models/MiniMaxAI/MiniMax-M3.1-Flash) shows a last modification on 23 October 2026. The model card describes a multimodal mixture-of-experts model — one that activates only part of its capacity for each token — with roughly 428 billion total parameters and 23 billion active per token, a one-million-token context, and local deployment through standard tools such as vLLM or SGLang; it also notes that how much context you can actually use depends on your hardware.

Two official numbers coexist. The model card says ~428B total parameters; Hugging Face's own file metadata reports 220,490,854,016 parameters and about 252 gigabytes of stored files. The release's [`config.json`](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash/raw/main/config.json) shows the mixture-of-experts weights stored in a packed low-precision format (`nvfp4-pack-quantized`), which can make a raw element count differ from a parameter count. We did not recompute a full census, so the discrepancy is a documented gap, not a resolved one. Artificial Analysis's page, meanwhile, still called the model proprietary with no disclosed parameter count on 25 October — four days after the naming and two days after the weights.

The word "open" needs a boundary. [The license](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash/raw/main/LICENSE) is MiniMax's own community license, not an OSI-approved open-source license. It allows free non-commercial use with the notices retained. Commercial use requires prominently displaying "Built with MiniMax M3.1-Flash"; a company with more than $20 million in yearly revenue needs MiniMax's prior written authorization. The license is provided as-is, and it prohibits a list of uses including illegal content, military purposes, and harm to minors.

And downloadable is not the same as runnable on your laptop. A model this size needs far more memory than a personal computer has, which is exactly why MiniMax points at GPU-serving tools. For most readers, the practical form of M3.1 Flash will remain an API call or a hosted app, not a local file.

## What each layer actually supports

Strip away the marketing sentence and the launch is a stack of separately inspectable things, each good for a different decision:

- **Identity.** Two parties now agree: MiniMax says Space Bunny was an early M3.1 Flash, and OpenRouter's listing says the same. That supports "an unnamed model that was later named." It is a vendor and a host confirming a fact, not a test this article ran.
- **Usage.** OpenRouter's platform numbers and MiniMax's 200-trillion figure establish that the model was used a great deal. They do not establish that it was used well.
- **Vendor benchmarks.** MiniMax's scorecard supports what MiniMax claims it measured. Independent scores exist, use different tests, and do not match the card.
- **Price.** The published list rate supports a rough per-token budget. It does not cover the cost of finishing a task.
- **Weights and license.** The Hugging Face repository and the community license support "you can download this and use it under stated conditions." They do not support "open source" or "runs on a normal computer."

What is missing is the layer that would settle the marketing sentence. Nobody in this record has published an independent, defined measurement that M3.1 Flash is three times faster or one-third as expensive as its predecessor on a real agent workflow. The speed and cost claims remain MiniMax's and OpenRouter's, and the methods do not agree. MiniMax claims 170–200+ tokens per second; Artificial Analysis measured 111.7 on MiniMax's own API; and OpenRouter's provider table on 25 October ranged from roughly 50 to nearly 200 tokens per second depending on which host served the call. A reader can verify that the layers exist. A reader cannot yet verify the sentence that ties them together.

## Sources and method

Desk research, sources accessed 25 October 2026. No API call, no local model load, and no benchmark run: nothing here is a firsthand test of M3.1 Flash's speed, cost, or quality. Vendor claims are attributed as vendor claims, platform statistics to the platform. MiniMax and OpenRouter are interested parties in the claims they publish.

One access note: posts from X (formerly Twitter), including MiniMax's and OpenRouter's launch threads, were read through a public third-party mirror because X was not directly reachable during research.

Primary sources: MiniMax launch blog (minimax.io/blog/minimax-m31f); MiniMax launch post and OpenRouter launch thread (via mirror); OpenRouter listings for Space Bunny Alpha and MiniMax M3.1 Flash; OpenRouter Stealth Program terms; MiniMax API pricing overview; Hugging Face model card, LICENSE, config.json, and model API metadata; Artificial Analysis model page.

What this article does not establish: whether M3.1 Flash is faster or cheaper than M3 in a defined workflow; what traffic MiniMax's 200-trillion-token figure counts; why the Space Bunny activity widget and OpenRouter's 56.7-trillion figure differ; the exact parameter count; or whether a typical reader can run the weights locally.
