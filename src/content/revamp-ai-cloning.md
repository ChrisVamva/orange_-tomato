# What a playtest actually gives away

![A carved wooden studio scene: a developer stands beside a closed lattice-front cabinet holding a carved castle build, while a lit display stage shows a miniature punch-through-a-wall scene to a small crowd and three rough, unfinished carved figures stand at the edge near a plain market stall.](/images/revamp-ai-cloning-lead.jpg)

*Illustration: A studio guards a finished build while a public display of the same work draws a crowd — and rough, unfinished imitations begin to form from what was shown. An explanatory illustration of two different exposures, not evidence that a specific clone exists.*

On 19 October 2026, [Digital Sun posted a short update](https://store.steampowered.com/news/app/3295000) about its next game. *ReVamp* is a "tower defensevania" in which you play Dracula defending his castle; it was due on 25 March 2027. The studio had opened sign-ups for a first playtest on 29 October. The update kept the date but moved the test to Discord and aimed at a smaller audience. "With launch still months away," the studio wrote, "sharing a build with tens of thousands of players felt like too big a risk for *ReVamp*." The risk it named was cloning; the coverage described it as AI-assisted.

The story traveled as a warning. [Polygon's headline](https://www.polygon.com/revamp-playtest-limited-ai-cloning-fears/) said AI cloning "could become the biggest threat to video game playtests"; [Kotaku said](https://kotaku.com/revamp-public-playtest-cancelled-digital-sun-claude-ai-clones-2000747558) the decision raised questions for "hundreds of other studios in similar positions." The concern is easy to understand: if a playable build can be decompiled, copied, and published before the original is out, showing it early is no longer just a marketing choice. But "AI can clone a game from a playtest" bundles several claims. A build can expose code and assets; a trailer or gameplay clip exposes only what the creator chose to show. Copying code, reimplementing a visible mechanic, and making a fan port or a mod are different acts, with different evidence and different remedies.

This article is not a verdict on Digital Sun. The decision is documented, and it may well be prudent. The narrower question is what a playtest build actually gives away, and what the public record shows about AI-assisted copying. The answer is neither "nothing" nor "everything." The documented pre-release imitation this article found did not use a build at all. It used a gameplay video. The documented code-copying case used a demo, but the AI role is unproven. This article could not find an inspected case of a pre-release playtest build being decompiled into a competing game before launch. That absence does not make the studio's decision irrational. It does make the public claim narrower than it sounds.

## The test that got smaller

The sequence matters. [On 8 October, Digital Sun announced](https://store.steampowered.com/news/app/3295000) the release date and the first round of Steam playtests. "Before launch, and even before a demo, we want to get *ReVamp* into your hands with a private playtest starting October 29th," the studio wrote. Players could sign up on the store page, join the Discord for a higher chance of selection, and receive access in waves. The studio also said the game had passed 200,000 wishlists.

That is not a public demo. It is an access-controlled test with a large sign-up pool. Coverage called it a "public playtest," and Digital Sun itself used "public playtest" for the later event, so the labels are slippery. The material fact is simpler: the studio planned to put a build in front of a large number of interested players, and then decided that the number was too large.

The 19 October update kept the date, changed the channel, and reduced the audience. The test would run on Discord, with access granted in waves; the public playtest was hoped for "around January." The release date was unaffected. The studio also asked platforms to "keep strengthening protections for original work," adding that sharing games early is how indie games "get seen" and find "the fans who keep us going." That is the trade-off in the studio's own words: a smaller test buys some protection and costs some visibility.

On 16 October, another studio made a related choice. Alliance Arts and WHO YOU [cancelled the public Steam Next Fest demo](https://store.steampowered.com/news/app/4150720) for *Drunken Goddess Reflux*, scheduled for 19 October, and replaced it with closed online sessions for players who agreed to participation and streaming rules. The studio gave two reasons: it did not think it could properly manage restrictions on posting and streaming gameplay videos, and it was concerned that "works imitating or replicating this game's presentation and gameplay could be quickly produced using AI or other tools and released ahead of the game's launch."

The two cases are often grouped together, and they do belong to the same pattern: studios choosing controlled access over open distribution. But they are not identical. One concerns a playtest build; the other concerns a demo. One is described as an AI risk; the other names AI *or other tools*, alongside a content-control problem that has nothing to do with cloning. The pattern is real. The shared label hides the differences.

## Four things called a clone

Separate four activities.

**Decompilation** turns compiled code into something a person can read. **Asset extraction** pulls out art, audio, maps, and other files. **Behavior reimplementation** rebuilds a mechanic from watching it work. **Lookalike production** packages a similar game for a storefront. A build can expose the first two. A clip or a trailer exposes the third and fourth. The bottlenecks are different: decompilation needs a build and technical work; reimplementation needs a visible idea and whatever effort the imitator is willing to spend.

The legal and ethical lines are also different. Copying code is the kind of thing copyright exists to address. Copying a rule or a mechanic is generally harder to stop; copyright has tended to protect the specific expression of a game rather than its rules, and [the *Threes* developers concluded](https://www.theverge.com/22914955/threes-2048-ketchapp-copycats-clones-mobile-games) that suing over a similar mechanic was impractical. That is context, not legal advice. The point is that "clone" can describe a fan port, a mod, a reimplementation, and direct code theft, and those are not interchangeable.

The examples are not interchangeable either. A fan port of *Halo* is not a competing commercial release. A mod that puts Mario inside *Elden Ring* is not a standalone game. A game that copies another game's code is not the same as a game that copies its premise. Keeping those apart is most of the work.

## The build path: real, old, and not clearly AI

The strongest public example of decompilation is *Halo: Combat Evolved*. A fan project called [OpenCE](https://github.com/OpenCommunityEdition/OpenCE) is built on a decompilation of the original Xbox game and compiles it to run natively on Windows, Linux, Android, and the web. It is not an emulator; it requires the user to supply their own copy of the game. [Polygon reported](https://www.polygon.com/halo-web-browser-ai-game-mods/) that the browser version drew 20,000 players in its first five hours and supports up to 128 players. The project's GitHub page describes the work as a decompilation and does not claim that AI was used. Polygon found the project's Discord full of references to Claude, but the page itself does not confirm the connection.

That is a real demonstration that a released game's code can be turned into a working port. It is not a demonstration that a pre-release playtest build can be turned into a competing game before launch. The game was released in 2001, the port is a fan project, and the user still needs the original data. The example shows the capability; it does not show the threat in the shape the *ReVamp* decision describes.

The closer case is *Needle In A Haystack*. NoGlyph, the developer of one haystack game, [published a Steam post](https://store.steampowered.com/news/app/5085740) on 17 October alleging that another game, Little Field Studios' *A Game About Needle In A Haystack*, contained code copied from NoGlyph's free demo. "We found 13 of our classes inside it with the exact same names," the post says. "More than half of the functions in that part match ours exactly. Some of our own error messages are still in there word for word, including one that points to a shader from our project that doesn't exist in their game." NoGlyph said it had filed a copyright notice with Valve.

This is the strongest evidence in the record that distributing a demo can expose code. It is also the weakest evidence that AI did it. NoGlyph's post is about copied code, not about a model. [Kotaku described](https://kotaku.com/devs-behind-needle-in-a-haystack-clone-complain-their-clone-has-been-cloned-by-vibe-coder-2000747284) the copied-code pattern as "a classic telltale sign of Claude-assisted decompilation," which is an inference from the shape of the evidence, not a documented workflow. NoGlyph's own post does not allege AI.

The case gets stranger. NoGlyph's game, released on 29 September, is itself one of at least 14 games that followed Studio Bitdot's *Needle In A Haystack Simulator*, which went viral in August. Kotaku described NoGlyph's game as not appearing vibe-coded and noted that it has no AI disclaimer. So the "original" in the code-copying story is one of many imitators of an earlier idea. That does not excuse copying its code. It does show why "original versus clone" is a poor frame: idea imitation is common and legal, and it is the background against which a later code-copying case has to be judged.

## The clip path: the documented pre-release case

The pre-release case this article could document did not involve a build.

On 14 October, Pandorio Games [posted a gameplay clip](https://x.com/pandorioltd/status/2110335569255657628) for *Escape the Walls*, an incremental game about punching through prison walls. The clip showed the loop: punch a wall, break it, collect rubble, upgrade, repeat. It drew 5.6 million views by the time this article opened the post on 25 October. The next day, [according to the Japanese outlet GameSpark](https://www.gamespark.jp/article/2026/10/16/173695.html), a similar game appeared on Roblox. By 18 October, the original's Steam page was live. By 19 October, [PC Gamer counted](https://www.pcgamer.com/gaming-industry/steam-week-in-review-steam-next-fest-has-over-8-000-demos-as-worthless-vibe-coded-slop-levels-up/) at least seven Roblox clones, and a Steam game with the same premise, [*Punch Your Way Out*](https://store.steampowered.com/app/5374280/Punch_Your_Way_Out/), was promoting itself to the original's creator. "Our Steam page is live too!" the competing studio wrote. "Nothing wrong with friendly competition!"

This article opened one of the Roblox experiences, ["Escape the Wall,"](https://www.roblox.com/games/108570802861510/Escape-the-Wall) on 25 October. Its description is the same loop with extra features: break through 10 cells, collect rubble, sell it, upgrade, team up with up to three friends, rebirth, collect fist skins. The page reported no running experiences at that moment, so this article cannot say how many people were playing it or whether it earned anything. The artifact exists; its commercial effect is unmeasured.

GameSpark reported that two of the clone creators appeared to have used Claude, and quoted one saying, in Kotaku's English rendering, "Claude did everything for me; I just sat in my chair and watched." That is a self-report to a journalist, not a verified workflow. It does not tell us which model version, what prompts, how much human editing remained, or whether the claim is true. It is the most direct claim in the record that AI was used in a pre-release imitation, and it is still only a claim.

The case also blurs the line it seems to draw. [*Escape the Walls* discloses](https://store.steampowered.com/app/5450560/Escape_the_Walls/) that it uses generative AI for temporary placeholders while working with professional artists. [*Punch Your Way Out* discloses](https://store.steampowered.com/app/5374280/Punch_Your_Way_Out/) that AI was used for promotional artwork, not in-game imagery. The original is not a pure human artifact, and the lookalike is not an AI-generated game. Both are independent projects that use AI somewhere in the pipeline. The question is not whether AI touched the work; it is what was copied and what remained to be built.

## What the record supports

Put the cases side by side and the pattern is not one chain. It is two.

![Two-lane diagram: the build path runs from a shared build through code and assets, decompilation or copying, to a competing release; the clip path runs from a clip or trailer through a visible mechanic, reimplementation, to a lookalike release. The build lane's evidence note says documented on released games and a demo, AI role unproven, no pre-release build case found. The clip lane's note says documented before release, AI use self-reported, commercial effect unmeasured.](/diagrams/revamp-ai-cloning-paths.svg?v=2)

*Diagram: Two paths that public discussion calls AI cloning. The build path is documented on released games and a demo, with the AI role unproven and no pre-release build-clone case found. The clip path is documented before release, with AI use self-reported and the commercial effect unmeasured. The paths have different requirements and different remedies.*

- **Halo / OpenCE:** a released 2001 game; code and behavior copied as a fan port; AI role not confirmed; not a competing release.
- **AI game mashups:** released games; behavior and assets combined as mods; AI use reported; not competing releases.
- **Needle In A Haystack:** a free demo; actual code allegedly copied; AI role unproven; a competing release after the original.
- **Escape the Walls:** a gameplay clip; a visible mechanic and presentation reimplemented; AI use self-reported; a competing release before the original launched.
- **ReVamp:** a planned build; nothing copied; AI role not applicable; the test was prevented.
- **Drunken Goddess Reflux:** a planned demo; nothing copied; AI role not applicable; the demo was prevented.

The build path is documented for released games and for a demo. The AI role in those cases is unconfirmed or inferred. The pre-release competing-copy path is documented for a clip, and the AI role there is a self-report. This article did not find an inspected case of a pre-release playtest build being decompiled into a competing game before launch. That is a not-found record, not proof that no such case exists; the two studios that might have supplied one prevented the test.

The vendor record does not settle it either. [Anthropic's announcement](https://www.anthropic.com/claude-opus-5-5) of Claude Opus 5.5, released on 22 September, emphasizes coding, cost, and safety. It describes a 680,000-line code migration and a game built from a single prompt. It does not advertise reverse engineering or game cloning. The "minutes instead of years" framing in the coverage is a reporter's characterization, not a measured result in the record. And the capability may not be stable: on 24 October, [Kotaku reported](https://kotaku.com/claudes-reverse-engineering-capabilities-used-to-recompile-games-may-have-been-quietly-nerfed-2000749320) that users were suddenly saying Opus 5.5's reverse-engineering behavior may have been restricted, that Anthropic had not announced a change, and that some users disputed the reports. That is a user-perception story, not a vendor confirmation. It is a reason to date-stamp the claim, not to resolve it.

What the record does support is narrower. A public clip can give away enough of a simple game's idea for someone to rebuild it before release. A distributed build can expose code and assets, and code can be copied. AI appears to lower the cost of the first path, and may lower the cost of the second. But the two paths have different requirements, different evidence, and different remedies.

## Why the smaller test can still be right

If the strong claim is unproven, why does the decision still make sense?

Because a studio does not get to run the experiment twice. *ReVamp* had more than 200,000 wishlists and a March release. A build is a larger exposure than a clip: it contains code and assets, not just a demonstration. The *Needle In A Haystack* case is a reminder that a demo can be followed by copied code, even if the AI role is unclear. A studio may reasonably decide not to bet its launch on the precise mechanism, especially when the cost of being wrong is asymmetric. A lookalike that reaches the market first can take attention that the original needed; a smaller test delays feedback, but it does not by itself end the project.

The *Drunken Goddess Reflux* case adds a second reason that is easy to miss. The studio also said it could not properly manage restrictions on streaming and posting. A closed session with agreed rules solves that problem too. The decision is not only an AI decision, even when AI is the headline.

The cost is real. Fewer external players means less feedback, slower balancing, and less of the pre-release visibility that indie games rely on. Digital Sun's own statement acknowledges that value: sharing games early is how indie games get seen and find the fans who keep them going. The fair reading is not that the studio panicked or that it was proved right. It is that the studio made a defensible trade under uncertainty. The mistake would be to treat the trade as evidence that the feared event happened.

## Four questions for the next claim

The next time a headline says AI can copy a game from a demo, four questions will do more work than a verdict.

**What was public?** A trailer, a gameplay clip, a demo, a playtest build, or source code. The answer determines what could have been copied. *ReVamp* had a planned build. *Escape the Walls* had a clip. *Needle In A Haystack* had a demo.

**What was reproduced?** Code, assets, behavior, or the idea. *Escape the Walls* was a reimplementation of a visible loop. *Needle In A Haystack* was alleged code copying. The *Halo* port was a decompilation of a released game.

**What ties it to AI?** Vendor documentation, logs, a self-report, or a reporter's inference. The *Escape the Walls* cloner's "Claude did everything" is a self-report. The *Needle In A Haystack* AI explanation is an inference. Anthropic's announcement does not mention reverse engineering at all.

**Did the copy compete?** Was it playable, published, released before the original, and earning? A fan port, a mod, and a lookalike are different kinds of competition. The Roblox clone existed before *Escape the Walls* launched; whether it took meaningful revenue is unknown.

The questions generalize beyond games, with a caveat. Any software demo or client-side build can expose more than a marketing video: a build can be decompiled or read; a video can only be watched and imitated. The same distinction between the artifact and the idea applies. But the evidence here is about games, and the legal and platform context is specific. Treat the generalization as a way to ask better questions, not as a measured claim about other industries.

## The bounded conclusion

Digital Sun's decision is documented, dated, and understandable. The build risk is real: a distributed build contains code and assets, and a demo can be followed by copied code. But the public record does not show a pre-release playtest build being decompiled into a competing game before launch. The documented pre-release imitation used a gameplay clip. The documented code-copying case used a demo, and its AI role is unproven.

That makes the smaller playtest a partial remedy, not a proof. It reduces one exposure — the build — and leaves the other — the visible idea — largely untouched. The studio's caution may still be the right call under uncertainty. The stronger public claim, that AI can clone a game from a playtest, is not supported by the evidence this article could inspect.

The better question is not "can AI clone it?" It is "which part of it is exposed, and which part can be copied without the build?" A studio that can answer that can decide what to hide, what to show, and what to accept. A reader who can answer it can tell a demonstration from a threat.

## Sources and method

Desk research, sources accessed 25 October 2026. No game was cloned, decompiled, or played for this article; no model was benchmarked. The claims here rest on dated statements, store pages, project documentation, and reporting, not on a firsthand test of cloning.

**Primary documents**

- Digital Sun: [Steam announcement, 8 October 2026](https://store.steampowered.com/news/app/3295000); [Steam announcement, 19 October 2026](https://steamcommunity.com/games/3295000/announcements/detail/693149194510140841); [Bluesky post, 19 October 2026](https://bsky.app/profile/digitalsungames.com/post/3mya6oryaaw2x).
- WHO YOU: [Steam announcement, 16 October 2026](https://store.steampowered.com/news/app/4150720/view/746066581090468248).
- NoGlyph: [Steam post, 17 October 2026](https://store.steampowered.com/news/app/5085740/view/716793092553835480).
- Steam pages: [*ReVamp*](https://store.steampowered.com/app/3295000/ReVamp/); [*Escape the Walls*](https://store.steampowered.com/app/5450560/Escape_the_Walls/); [*Punch Your Way Out*](https://store.steampowered.com/app/5374280/Punch_Your_Way_Out/).
- [OpenCE repository README](https://github.com/OpenCommunityEdition/OpenCE).
- Anthropic: [Introducing Claude Opus 5.5, 22 September 2026](https://www.anthropic.com/claude-opus-5-5).

**Reporting and context**

- Polygon: [the *ReVamp* decision](https://www.polygon.com/revamp-playtest-limited-ai-cloning-fears/) (19 October); [the *Drunken Goddess Reflux* demo](https://www.polygon.com/drunken-goddess-reflux-demo-canceled/) (18 October); [the *Halo* browser port](https://www.polygon.com/halo-web-browser-ai-game-mods/) (2 October); [the AI game mashups](https://www.polygon.com/ps5-jailbreak-emulator-minecraft-elden-ring-claude-opus-5-ai-games/) (6 October).
- Game Developer: [the *ReVamp* decision and pre-AI clone precedents](https://www.gamedeveloper.com/programming/moonlighter-developer-delays-public-playtest-of-next-game-over-concerns-of-ai-cloning) (19 October).
- Kotaku: [the *ReVamp* decision](https://kotaku.com/revamp-public-playtest-cancelled-digital-sun-claude-ai-clones-2000747558) (19 October); [the *Needle In A Haystack* dispute](https://kotaku.com/devs-behind-needle-in-a-haystack-clone-complain-their-clone-has-been-cloned-by-vibe-coder-2000747284) (18 October); [the reported Opus 5.5 restriction](https://kotaku.com/claudes-reverse-engineering-capabilities-used-to-recompile-games-may-have-been-quietly-nerfed-2000749320) (24 October).
- PC Gamer: [Steam Next Fest roundup](https://www.pcgamer.com/gaming-industry/steam-week-in-review-steam-next-fest-has-over-8-000-demos-as-worthless-vibe-coded-slop-levels-up/) (19 October).
- GameRant: [the *Escape the Walls* clones](https://gamerant.com/escape-the-walls-roblox-clones/) (18 October).
- GameSpark: [the Japanese report on the *Escape the Walls* clones](https://www.gamespark.jp/article/2026/10/16/173695.html) (16 October).
- The Verge: [the history of *Threes* and *2048*](https://www.theverge.com/22914955/threes-2048-ketchapp-copycats-clones-mobile-games) (2022).

Access notes: Steam announcement pages render client-side in this environment, so their text was read through Steam's public news feed. X posts were only partly visible without login; the post text and timestamps were readable, but the attached image statement was not fully legible. The Roblox experience was opened but not played, and at capture it reported no running experiences. The Little Field Studios store page could not be loaded directly; its existence and release date are established by NoGlyph's post and Kotaku's reporting. No studio, developer, or platform was interviewed, and no comment was sought.
