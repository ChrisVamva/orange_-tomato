# What did DeepSeek actually open-source?

![A sculptural tableau of hand-carved wooden figures and objects on a dark, aged chalkboard surface with faint erased chalk haze.](/images/deepseek-deepinfer-lead.jpg)

*Illustration: A sculptural tableau of hand-carved wooden figures and objects on a dark, aged chalkboard surface. An explanatory illustration of a release and its boundary, not a measurement.*

On October 20, 2026, DeepSeek announced that it would open-source DeepInfer, the inference framework behind its production AI service. Chinese coverage of the announcement used the phrase 全面开源 — fully, comprehensively open-source — and the story traveled fast: the engine that runs DeepSeek's fastest and cheapest model, given away.

Open the repository, though, and the first thing the documentation tells you is what the release does *not* include. The README describes DeepInfer as "offline inference with the core features needed for serving at scale", and carries a short list headed **"Required for a complete inference service (not included in this release)"**: a KV cache system; VE/Prefill/Decode disaggregation; load balancing across data-parallel replicas.

Both of those sentences are true at once. Sorting out how is the point of this article — because the same release also produced a second wave of headlines, this time about money: claims that DeepSeek's inference business runs at 80%+ margins, that a single GPU "earns" $38 an hour, that the whole thing pays for itself in under three months. Those numbers are downstream of what was and wasn't in the box. And unlike the first wave, they have a correction trail attached.

## What is actually in the crate

Two repositories shipped. The first is [DeepInfer](https://github.com/deepseek-ai/DeepInfer) itself, released under the Apache License 2.0 — a real inference engine with optimized kernels (DeepSeek's FlashMLA, DeepGEMM, DeepEP and others), a batch scheduler, speculative decoding ("DSpark"), sliding-window replay, deterministic sampling, and structured outputs. The second is [deepseek-recipe](https://github.com/deepseek-ai/deepseek-recipe), a token encoding/decoding component that translates between mainstream LLM API protocols and model token sequences — MIT-licensed, notably, despite some coverage describing the whole release as Apache.

The hardware list is short and pointed: NVIDIA SM100 GPUs and Huawei Ascend 950 NPUs. Two features — batch-invariant inference and deterministic sampling — are flagged NVIDIA-only, and every official benchmark ran on SM100. As of this writing we have found no published throughput figure for Ascend 950 anywhere; "supported" currently means compatible, not measured.

There is also a floor. The Q&A states it plainly: "the smallest efficient deployment unit is 64 GPUs of prefill plus 64 GPUs of decode" — ordinary 8-GPU machines for prefill, 64–128-GPU supernodes for decode. This is a datacenter-scale artifact. Nothing about it pretends otherwise, and credit where due: few vendors publish their serving stack's shape in this much detail, even in prose.

The word that does the most work in the README is *offline*. DeepInfer as released runs batches. A production service does something more: it holds a giant shared cache of past computations, routes requests to whichever machine can reuse them, splits work between prefill and decode clusters, and keeps all of that balanced under live traffic. That layer is where the "not included" list lives.

## The list of three — and the stubs behind it

Here is the box verbatim, from the README at commit [`5537415`](https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/README.md):

> **Required for a complete inference service (not included in this release):**
> - A KV cache system
> - VE/Prefill/Decode disaggregation (most required engine functionality is already implemented)
> - Load balancing across data-parallel replicas for both prefill and decode

And from DeepSeek's [deployment Q&A](https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/doc/inference_deployment_qa.md), the reason: "The KV cache management and load balancing components of the inference system are tightly coupled to our internal infrastructure, so that code is not yet fully open-sourced."

A word on the first item, because the acronym does no favors. "VE" is the vision encoder — the piece that turns images into embeddings before text processing begins; the Q&A describes a deployment with the vision encoder, prefill, and decode each on their own hardware ("EPD disaggregation"), each independently scalable. It is not some exotic fourth engine.

This is not merely a documentation omission. Inspecting the pinned source directly — reading it, not running it — we found the boundary visible in the code. [`llm_engine.py`](https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/engine/llm_engine.py) carries a section comment that translates as "everything from here on is virtual functions," followed by empty placeholder methods: `init_pd_split` (its docstring, translated from the Chinese, reads "virtual function, initialise the data structures PD separation needs"), `do_save_kvcache`, `pe_prepare_save_kvcache`, `pe_do_save_kvcache`. The hooks where a KV cache would be saved and where prefill would hand work to decode are literally one-line stubs. An independent practitioner's [code walkthrough](https://subhadipmitra.com/blog/2026/deepinfer-cache-is-the-business) (October 24) reached the same conclusion: "the engine has the hooks; the methods are empty virtual functions."

Two fair counters belong here. First, "not included" is not "never included": DeepSeek says inference code for future models "will continue to be open-sourced in DeepInfer." Second, keeping infrastructure-coupled ops code private is ordinary industry practice — arguably DeepSeek is unusual only in *documenting* what it kept. All true. But hold on to the shape of the list, because of what those three components turn out to be for.

## Why those three are the business

Start with DeepSeek's own production figures, from the Q&A [as published](https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/doc/inference_deployment_qa.md): "A single cluster currently serves 155 trillion tokens per day, with overall revenue of US$38 per GPU-hour (at valley pricing)." Two qualifiers are load-bearing and were dropped in most retellings: *revenue*, not profit; and *one cluster*, not the company.

Now notice what most of those tokens are. When a request arrives with a prefix DeepSeek has processed before — an agent's previous turn, a chatbot's earlier context — the model does not recompute it. The KV cache stores the intermediate state of past tokens so that reused input is nearly free to serve. The economics follow the price list (as read on 2026-10-27; prices drift): at off-peak rates a cached input token bills at $0.003 per million, an uncached one at $0.15 — a cache hit is charged at **one-fiftieth** of a miss, and costs almost no compute. Cached input is where the volume is; uncached input and output are where the compute is.

The withheld components are precisely the machinery that manufactures those hits. The Q&A describes it in unusual detail: roughly 100 petabytes of SSD storage on DeepSeek's 3FS filesystem hold the block-KV cache, with retention tuned per workload — "a TTL of around 3 days costs chatbot traffic 0.5%–1% of KV cache hit rate" — and a dedicated storage cluster "lets every prefill machine hit any prefix," because the cache lives there rather than on the machine that computed it. Tokens produced during decode are written back to the cache too, "in order to improve the cache hit rate": an agent's next turn begins with its previous answer as prefix. About "14.4 TB per GPU measured as logical size" of cache stands behind each online accelerator. The load balancer routes by hit length; the prefill/decode split moves cached state between stages. Remove those three pieces and you remove the system that converts traffic into the disclosed $38-per-GPU-hour revenue rate. That is an editorial reading of the architecture — labeled as such — but it is built entirely from DeepSeek's own descriptions.

This is the sentence an independent analyst, Subhadip Mitra, reached after walking the same material: "What the numbers do show is which token DeepSeek's business is built on. It is the one it never computes."

## The reproducibility ladder

If you want to know what an open release is worth, it helps to separate three questions that coverage tends to blur: can you *run* it, can you *match* its numbers, and can you *reproduce the business*?

**Rung one — run the engine.** Yes, genuinely. The code is real, the license is permissive, and the reproduction scripts are published. The floor is 64+64 GPUs of the right hardware, so "run" means your organization's datacenter, not your laptop — but nothing artificial blocks you.

**Rung two — match the benchmark.** Also yes, and faster than almost any release in memory. The README's performance charts carry asterisks worth reading: measured on 4 SM100 GPUs for prefill and 64 for decode within one scale-up domain; the decode sweep runs 131,072-token contexts with 3 draft tokens — against a model that supports one-million-token contexts — and offline mode only. On launch day, the independent guide [deepinfer.net](https://deepinfer.net) recorded "0 third-party reproductions we could find." Within four days that was stale: [vLLM published](https://vllm.ai/blog/2026-10-23-deepseek-v41-flash-pd-wide-ep) matched-configuration decode comparisons on October 23, and [SGLang on October 24](https://gist.github.com/sglang-bot/f03d7d0dd268b0386177eb2ef09f8b3b).

**Rung three — reproduce the service.** Not from this release, by the vendor's own statement. The KV cache system, the disaggregation layer, and the load balancing are listed as not included and exist as stubs. Until those land — or someone rebuilds them — the thing that produced the headline economics stays inside DeepSeek.

You can run the engine. You cannot, from this release, run the business.

![A hand-drawn notebook diagram on ruled paper with three stacked bands separated by a dashed boundary line. Band one: what DeepInfer released — the engine, its kernels, and the recipe — marked runnable. Band two: what a complete inference service requires but the release does not include — a KV cache system, VE/prefill/decode disaggregation, and load balancing — present in the code only as empty stubs. Band three: the reported economics — 155 trillion tokens a day and $38 revenue per GPU-hour at valley pricing — with the community margin range drawn as a hatched scenario. Ladder rungs down the side read: run the engine, yes; match the benchmark, yes; reproduce the service, no.](/diagrams/deepseek-deepinfer-release-boundary.svg)

*Diagram: the release boundary — you can run the engine and match its benchmarks; the service layer behind the reported economics was not in the box. The economics band is first-party disclosure and community scenario, not measurement.*

## What the neighbors found

The two fastest reproductions are also the most interested parties: vLLM and SGLang are DeepInfer's direct competitors. They say so, and their artifacts are public enough to check.

vLLM's headline: "Under DeepSeek's decode configuration (131K context, nextn=3), vLLM on GB200 achieves throughput within 6% of DeepInfer's published results across batch sizes 8 to 256." On prefill the team explicitly refused an engine-versus-engine claim — "Because the setups differ, we do not read the gap between the two curves as an engine-to-engine speedup" — and noted the awkward genealogy both ways: "DeepInfer was originally built on vLLM, and vLLM in turn has continuously integrated kernels from DeepSeek's libraries." The comparison values, they note, were "read from the charts in its README." And the scope gap is the thesis in one line: "DeepInfer targets a single model in offline mode; the same vLLM build also serves this model online with P/D disaggregation and Wide-EP across a full NVL72 rack."

SGLang went further and ran both engines *at DeepInfer's own benchmark settings*, deliberately favoring DeepInfer — its best of four configurations at each batch size, its expert layout on both engines, its real draft-token acceptance against SGLang's simulated one. The result is honest and mixed: SGLang's prefill is faster at most points (up to ~4%) but DeepInfer edges it at two; on decode SGLang's step time is shorter at five of six batch levels — at 256 requests per GPU, 31.19 ms down to 28.88 ms, about 7.4% — while DeepInfer is marginally ahead at the smallest batch.

The Chinese tech outlet QbitAI, [covering both](https://zhuanlan.zhihu.com/p/2098164686487282787), drew two conclusions worth quoting carefully. On completeness (translated from the Chinese): next to DeepInfer's open release, SGLang "is more complete, additionally supplying the key service components — the KV cache system, prefill/decode disaggregated architecture, and load balancing modules" — the same three items, again. On fairness: having re-run DeepInfer on GB300 and B300 and found some configurations *higher* than originally published, the outlet's gloss was that DeepSeek's benchmark numbers are honest ones. (That characterization is the reporter's; SGLang's write-up makes no such claim, though its tables do show DeepInfer winning several points.)

Read together: the engine-level moat around DeepInfer looks smaller than the announcement implied — a general-purpose engine matches a model-specific one within single-digit percent — but neither team touched the cache, routing, or retention layer. The rung-two result is real. It says nothing about rung three.

## The $38 is a revenue rate, not a margin

Within a day of the release, a community analyst posting as @zephyr_z9 turned DeepSeek's disclosures into a margin estimate, and the estimate traveled further than anything else in the story. The model is worth understanding because it is careful work: assume a token mix of 97% cached input, 2% uncached, 1% output; take the published per-GPU peaks (80K prefill, 16K decode tokens/s); a full-load GPU then produces up to ~$49/hour of billed tokens against a rental cost of a few dollars, implying gross margins of 87.76–96.94%. Then — and this is the part that usually gets cropped out of the retellings — the author publicly **corrected** the estimate after DeepSeek's Q&A landed: the idealized $49/hour overstated reality, since DeepSeek disclosed $38/hour at valley pricing and, in the correction's account of the operating figures, production runs at "about 80% of benchmark performance"; the revised range is **84.2–96.1%**. The digest carrying the thread adds the sentence that should ride with any citation of these numbers: "The original estimate should not be repeated without that correction."

We re-derived the arithmetic from the price list and the thread's stated inputs, and the revenue side reproduces exactly ($11.91 per billion billed tokens at off-peak rates, $23.82 at peak). The corrected band's internals are not fully reconstructable from the public digests — the thread sits behind X's login — so it travels as a quoted scenario, not a verified figure.

And the counter-estimates cut in both directions. Others in the same thread used higher hardware costs: at $5–10 per GPU-hour the same arithmetic spans 73.7–86.8% — "rather than establishing one universal '80% serving margin'" — and at $7/hour about 81.6% before any other cost. DeepSeek has never disclosed which accelerator the $38 figure refers to. What all the models omit is its own line item: Mitra notes "the storage cluster alone adds 14.4 TB of SSD per GPU, plus the servers and network around it, before you count power or the GPUs," and his plain summary of the margin genre is the one to keep: "It does not show a margin. The Q&A gives no cost at all… Chinese coverage of this release has put the gross margin at around 80 percent, but that is a third-party estimate." Idle capacity, failures, engineering, and support appear in none of the scenarios either.

![A small sculptural arrangement of carved wooden objects on a dark, aged chalkboard surface with faint erased chalk haze.](/images/deepseek-deepinfer-economics.jpg)

*Illustration: A small sculptural arrangement of carved wooden objects on a dark, aged chalkboard surface. An explanatory illustration of the economics estimates, not a measurement.*

One Chinese analysis put the口径 problem — the measurement-basis problem — in a single line: the same string of numbers "was read within 24 hours as revenue, as profit, and as a payback period." The Q&A sentence says *overall revenue … at valley pricing*. Everything past that is extrapolation, and the honest state of the art is a corrected range of scenarios with visible assumptions, not a margin.

## So what did DeepSeek actually open-source?

The bounded answer, dated 2026-10-27:

- **The engine, for real.** Apache-2.0 code that two competing teams could match within four days, plus an MIT-licensed protocol layer. That is a genuine contribution to the field, and the practitioners who raced to build on it — including a solo developer whose [Resin layer](https://zhuanlan.zhihu.com/p/2098164686487282787) runs within 5–10% of DeepInfer while adding HTTP serving and prefix caching — confirm it.
- **The map, generously.** The deployment Q&A is arguably the release's most valuable artifact: it describes what a hyperscale inference service consists of — cache tiers, TTL tuning, disaggregation, load balancers — in more detail than any vendor has published. You cannot clone the service from it. You can learn what the service *is*.
- **Not the service.** The KV cache system, the P/D disaggregation, and the load balancing remain internal "infrastructure-coupled" code, visible in the release as empty stubs. The economics headline lives on the far side of that boundary.

Two status footnotes, both checkable. The repository is a reference implementation in the early sense: five commits and zero tagged releases as of 2026-10-27, with community patches beginning to land. And the dual-platform claim (NVIDIA + Huawei Ascend) has no published Ascend measurements behind it yet.

What would change this judgment is concrete: KV cache and load-balancing code appearing in the repo would move the service onto rung two; tagged releases and third-party Ascend 950 measurements would speak to durability and portability. DeepSeek has said more is coming. Until then, the honest framing of the October 20 release is also its own README's framing: the core of an inference engine, offline, with the hardest parts of the service still at home.

## Sources and method

This article is desk research plus a source audit, not a test run. The DeepInfer repository was pinned at commit [`5537415`](https://github.com/deepseek-ai/DeepInfer/tree/553741557a57df44a46fb3ab72b6aafeaf945337) (2026-10-25) and its README, license, deployment Q&A, and engine source were read — code was not run, and we hold none of the required hardware. Production figures are DeepSeek's own disclosures ([deployment Q&A](https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/doc/inference_deployment_qa.md)), attributed as such. Benchmark comparisons are self-reports by competing engine teams ([vLLM](https://vllm.ai/blog/2026-10-23-deepseek-v41-flash-pd-wide-ep), [SGLang](https://gist.github.com/sglang-bot/f03d7d0dd268b0386177eb2ef09f8b3b)), whose interest is disclosed; press characterizations come from [QbitAI](https://zhuanlan.zhihu.com/p/2098164686487282787). The margin thread (@zephyr_z9) was traced through convergent digests rather than read at source; the Resin layer is likewise cited via QbitAI's coverage, its original thread sitting behind X's login. Pricing is a 2026-10-27 snapshot of [DeepSeek's API docs](https://api-docs.deepseek.com/quick_start/pricing) and will drift. Model architecture facts come from the [V4.1-Flash paper](https://arxiv.org/abs/2609.19969); independent analysis from [deepinfer.net](https://deepinfer.net) and [Subhadip Mitra's walkthrough](https://subhadipmitra.com/blog/2026/deepinfer-cache-is-the-business) (his B300 measurements are his own). Open limits: DeepSeek's original announcement post was not inspected (its "全面开源" wording is quoted via relays); the widely repeated "96% cache hit rate" figure could not be traced to any primary document and is not used here as fact; which accelerator underlies the $38/GPU-hour figure is undisclosed. The repository state and prices cited will need rechecking before republication.
