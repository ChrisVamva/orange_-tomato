# What does OpenAI's Aurora image-model testing actually establish?

![Explanatory tableau of the chain from quiet listing through arena testing to reporting to silence](/images/quiet-listing.png)

*Illustration: The chain from quiet listing through arena testing to reporting to silence, as an explanatory tableau.*

For about a day in mid-October 2026, OpenAI's API carried three model names that no announcement had introduced: `aurora-red-alpha`, `aurora-green-alpha`, and `aurora-blue-alpha`. In an authenticated read of the model list, the AI agent company CellCog found all three created within two minutes of each other on 17 October — 01:13:49, 01:13:55 and 01:15:26 UTC — with the owner field set to `system` and no shutdown date. Nobody at OpenAI introduced them. By the time most people heard the names, the entries had been pulled.

In the hours around the removal, the same three names turned up somewhere else: a public blind image test, where people were shown pictures — mostly of cats — and asked which they preferred. OpenAI has published nothing about any of it.

That leaves a reader with a narrower question than the headlines ask. Not "is this GPT-Image-3?" but "what can actually be established here, and what should I do with it?" The answer worth relying on is a process story. The sightings establish that OpenAI was quietly testing image models in public, which it has now done repeatedly. They establish almost nothing about what those models can do. Keeping those two findings apart is most of this article.

## Three names, and how anyone saw them

A model list is the catalogue of model IDs your API client is allowed to name. It is not a product announcement, and an entry in it is not a promise: labs add IDs for internal evaluation, staged rollouts, and A/B tests long before anything is documented, priced, or supported. That is why a name appearing and disappearing inside a day is interesting without being decisive.

The aurora entries were noticed twice, by two different routes. [TestingCatalog](https://www.testingcatalog.com/openai-possibly-testing-gpt-image-3/) caught them "through an alert on the Dev Mode Discord server," and reported that "the references were pulled shortly after, which looked like an accidental rollout." Its own post put it more bluntly: "These model references were removed shortly after so it was a mistake rollout." CellCog's read, circulated the same day, is the source of the creation timestamps and the `system` owner field; it read the list but did not call the models.

What happened when people tried is worth noting, because it is the most concrete thing in the record. Accounts of developers attempting calls describe red returning a 503 — no capacity — and green and blue returning 404s, no such model ([coverage of CellCog's read](https://baijiahao.baidu.com/s?id=1879441445751526625); CellCog's own post was not retrievable for this article). An entry that answers a call is a testable thing. An entry that does not is a name in a list.

## The baseline nobody is arguing about

The solid ground in this story is not the aurora names. It is what OpenAI shipped publicly a few weeks earlier.

On 8 September 2026 OpenAI announced [ChatGPT Images 2.5](https://openai.com/index/introducing-chatgpt-images-2-5/), and with it two API models: `gpt-image-2.5-flare` and `gpt-image-2.5-sunburst`. Flare is the default for most applications, with OpenAI claiming higher image quality than GPT-Image-2 at 50% lower latency. Sunburst is aimed at premium workflows that need tighter control across edits, accepting longer generation times. The release carries the now-standard provenance commitments: C2PA metadata and invisible watermarking. [TestingCatalog's write-up](https://www.testingcatalog.com/openai-launches-chatgpt-images-2-5-with-faster-editing/) adds one outside data point — Manus measured Flare at two to four times the generation speed of GPT-Image-2.

Two naming layers matter here, and conflating them is where most of the confusion starts. "ChatGPT Images 2.5" is the consumer product name; `gpt-image-2.5-flare` and `gpt-image-2.5-sunburst` are the API model IDs. The aurora names belong to neither layer — they are unpublished codenames. No official source has joined them to the 2.5 family or to a next-numbered generation.

This is also the part of the story that can be checked directly. Reviewing OpenAI's [models page](https://platform.openai.com/docs/models) on 27 October 2026, the Image section lists exactly two models: Sunburst, "our most capable model for image generation and editing," and Flare, "fast, high-quality everyday image generation." There is no aurora entry, and the [changelog](https://platform.openai.com/changelog) carries no mention of one. That is a real finding with a real limit: a docs review establishes that these names were not documented when we looked, not that they never existed.

## What arena testing can and cannot measure

The arena tests are the part of the record that feels like evidence and is not.

An image arena is a blind preference test. Two anonymous models get the same prompt, a person sees both outputs without knowing which is which, and picks one. Votes accumulate into a leaderboard. It is a genuinely useful instrument — it is hard to game with benchmark-specific training — but it answers a narrow question: which output did this person prefer, right now, on this prompt.

It does not measure capability. There is no disclosed evaluation set, no sample size, no controlled protocol, and no guarantee that the anonymous model you voted on is the configuration that ships. Votes also arrive from whatever prompts people happened to try, which is why cat portraits show up so often.

Here, the entire public observation is small. Per TestingCatalog, "in those tests, red ran faster but with lower quality, while green was slower and looked better. The blue model hasn't been tested yet." The published samples are two cat portraits. TestingCatalog's own assessment is the fair one: "two cat portraits won't tell anyone much about quality, but both look clean and detailed," and on the samples so far, "none of them look like they'd make you write home about."

There is a real hypothesis hiding in the red/green split — a fast variant and a quality variant would mirror the Flare/Sunburst structure OpenAI already ships, and that would be a tidy reading of three names. It is worth stating as a hypothesis and nothing more. Two impressions of two pictures are not a measurement of speed, and blue has not been tested at all.

## The names have a history

Codenamed image models in public blind tests are not new for OpenAI, and the precedent cuts both ways.

In December 2025 the company previewed models codenamed Chestnut and Hazelnut through the same arena-based blind testing; they "ultimately shipped as GPT Image 1.5 just weeks later," per [TestingCatalog](https://www.testingcatalog.com/openai-tests-next-gen-image-v2-model-on-chatgpt-and-lm-arena/). On 6 April 2026 the same outlet recorded three tape-themed variants on LM Arena — `packingtape-alpha`, `maskingtape-alpha`, and `gaffertape-alpha` — ahead of the Image 2 release. The aurora names are the third instance of the same method in under a year.

That establishes the process. It does not establish this particular mapping. The tape names were plausibly Image V2 because the reports said so and a release followed; the aurora names are plausibly image models because [Lumina](https://x.com/LuminaBench/status/2111751820980678939), the evaluation account that surfaced the arena sightings, reported that all three are image models under test. Reporters have gone one step further. "Lumina Bench did speculate that this is probably GPT Image 3, and we'd lean the same way," TestingCatalog wrote, "though that's still a guess."

Two things counsel against tidying that guess into a fact. First, "aurora" is not a fresh or unambiguous OpenAI image codename: OpenRouter listed a cloaked `aurora-alpha` on 9 February 2026, described as tuned for speed with a 128K context window and an unconfirmed connection to GPT-5.3-Codex-Spark — a text-and-code framing, not an image one. When this article checked, direct access to that OpenRouter listing returned 404. Second, names were proliferating that weekend regardless: about an hour after the API references appeared, three more unknown names — Aspen, Cypress and Maple — surfaced on Design Arena, and nothing ties them to the aurora models.

## Where the record stops

Set the two halves side by side and the shape of the story becomes clear.

On one side: three model entries existed, were seen by at least two independent routes, and were removed within about a day; the same names then appeared in a public blind image test; OpenAI has published no documentation, pricing, or announcement. That is a documented-enough process, and it is consistent with everything above.

On the other side: what the models can do, how fast they are, what they cost, whether blue works at all, and whether any of them is GPT-Image-3. None of that is established.

![Notebook page titled "a process, not a capability", divided by a dashed line labelled "the inference stops here". Above the line, three connected boxes run left to right: a quiet API listing (aurora-red, green and blue alpha, created Oct 17, pulled in a day), arena testing (red faster but lower quality, green slower, blue untested), and reporting then silence (no docs, no pricing, no announcement). Below the line, a dashed box for the aurora-equals-GPT-Image-3 mapping, called a guess with no primary source, beside a note listing what is still unknown: capability, speed and cost unmeasured, blue never tested, no OpenAI comment.](/diagrams/aurora-testing-chain.svg?v=2)

*Diagram: what the aurora sightings establish, and where they stop. The row above the boundary is observed and reported — a quiet listing, public arena tests, third-party reports, OpenAI's silence. Below it, the aurora-to-GPT-Image-3 mapping and every capability claim sit unverified.*

The reports also share origins, which is worth saying plainly. The sightings trace back to a handful of social posts, one Discord alert, and one third-party mirror of the model list. Multiple outlets writing about the same three posts is not three confirmations; it is one observation, reported widely. And OpenAI's silence is genuinely uninformative: the company does not comment on unnamed test entries, so its silence here supports no inference in either direction.

## What would change the answer

The gap is not permanent, and it is specific enough to know what would close it. An OpenAI model page or changelog entry naming an aurora model; a pricing line; a first-party benchmark or model card; a product post. Any one of those would move the mapping from guess to fact and start the capability conversation properly. Until then there is nothing to measure: as TestingCatalog put it, "there's no documentation or pricing for any of the Aurora models yet, so the cat pics are all we have."

## What to do with it now

For a reader deciding whether any of this should change what they build: it should not, yet.

The documented, priced, supported OpenAI image models are `gpt-image-2.5-flare` and `gpt-image-2.5-sunburst`. If you are shipping image generation today, those are the ones to plan around, and the Flare/Sunburst split is the one real choice in front of you — speed against edit control. Aurora is a signal that image work is in flight at OpenAI, which is useful to know and useless to schedule against.

The useful habit, if you follow these sightings generally, is to separate the two questions every time. "Is this lab testing image models in public?" is answerable from a model list and an arena leaderboard, and it is usually yes. "What can this model do?" is not answerable from a codename, a cat portrait, or a reporter's guess — and it is the question that actually matters when you are choosing what to build on.

## Bounded conclusion

- **Supported:** OpenAI ran a quiet image-model testing episode in mid-October 2026, observed through third-party reads of its model list and through public arena tests; OpenAI has published no documentation, pricing, or announcement for the aurora names; GPT Image 2.5 (Flare and Sunburst) is the documented baseline.
- **Not supported:** any capability, speed, quality, or cost claim about the aurora models; the mapping from aurora to GPT-Image-3; the outcome of the arena tests; anything at all about blue.

## Sources and method

Desk research, conducted 27 October 2026. No model was called, queried, or tested, and no API credentials or spend were used; every claim about model behaviour is attributed to the party that observed it. Primary and named sources: [TestingCatalog on the aurora sightings](https://www.testingcatalog.com/openai-possibly-testing-gpt-image-3/) (18 Oct 2026); [Lumina's arena sighting](https://x.com/LuminaBench/status/2111751820980678939) (18 Oct 2026); [TestingCatalog on the tape-themed Image V2 tests](https://www.testingcatalog.com/openai-tests-next-gen-image-v2-model-on-chatgpt-and-lm-arena/) (6 Apr 2026); [OpenAI's ChatGPT Images 2.5 announcement](https://openai.com/index/introducing-chatgpt-images-2-5/) (8 Sep 2026) and [TestingCatalog's write-up](https://www.testingcatalog.com/openai-launches-chatgpt-images-2-5-with-faster-editing/) (9 Sep 2026); OpenAI's [models page](https://platform.openai.com/docs/models) and [changelog](https://platform.openai.com/changelog), reviewed 27 Oct 2026; [coverage of CellCog's model-list read](https://baijiahao.baidu.com/s?id=1879441445751526625) (19 Oct 2026).

Material limits: CellCog's own post was not retrievable, so its timestamps and owner field are carried on secondary coverage; the OpenRouter `aurora-alpha` listing returned 404 on 27 October 2026; the docs review is bounded by what was fetched; the arena observations are preference votes on an unknown sample, not measurements; and every party here is interested — OpenAI as the vendor, CellCog as a competing product, Lumina and TestingCatalog as reporters.
