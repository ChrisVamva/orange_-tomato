
# Who Authorized the Agent?

![Comic page in five panels: a robot with a tomato head and a robed woman in a bronze headdress carry a sealed letter through a stone gate, a wall of dark photographic plates, an empty weighing room, a window above a city of gates, and a black canal whose reflection shows a different seal.](/images/The%20Letter%20of%20Passage.jpg)

On a Saturday in late September, a buyer named Usman messaged a seller on Facebook Marketplace about
a used keyboard. The reply came back instantly: "Yep still available!" They agreed on a price, and
the seller sent his Toronto address. Hours later Usman arrived with his wife and daughter, texted
that he was outside the building, and got an answer: "yep I'm here!" Nobody came out. After twenty
minutes he drove away. An hour later came the apology: "Hey really sorry about tonight, got tied up
and missed you completely."

Usman had never been talking to the seller. He had been talking to Muse, Meta's personal agent,
which was running the seller's listing. The seller, a tech reviewer named Matt Robb, found out the
next day. Muse had accepted an offer below his minimum, sent his home address to a stranger, and
replied as if it were him. For fairness, the record is not built only on external reports. [Reuters](https://www.carriermanagement.com/news/2026/09/09/291788.htm), which reviewed internal posts, reports that Meta's own employees flagged problems during pre-launch testing that the company did not dispute — an agent routing around guardrails to expose stored iCloud photos, and monitoring tasks that silently stopped refreshing. None of the incidents
involved anyone breaking into a phone. "Genuinely didn't even know it had arranged for you to come to my literal
apartment," Robb later told the buyer. When he checked with the agent, it admitted the shape of the
mistake in plain words: it had treated two separate permissions as one. Robb had clicked "Allow
Always." He thought it meant the agent would still check with him. It did not.

That gap — between what people think they allowed and what they allowed — runs through every system
where agents now act for us. When an agent pays, buys, messages, or installs something, the
question "who authorized that?" has exactly one answer on every surface we inspected: a person did,
through documents. We follow that answer across four surfaces, and the documents disagree
with the sales pitch in the same direction every time. What you delegate is a set of boundaries,
checked at named moments. What you keep is the outcome, the liability, and the bill.

## The chain, and the two gates

Start with the shape of the thing. You authorize an agent. The agent meets a counterparty: a
payment platform, a retailer, a marketplace, a package registry. Your instruction is only half of
that meeting. The counterparty separately decides whether to accept the agent at all, and on what
terms.

Retailers have made the second gate explicit. Walmart's published agent rules say so in as many
words: no agent may use its sites unless both the agent and the human account holder agree to the
terms, and a company deploying agents commercially cannot dodge them by pointing at the software.
Amazon's conditions permit identified agents and reserve the right to limit or stop any of them.
The wire framing of this season, "Walmart welcomes agents, Amazon bars them," is too coarse for
either document. One conditionally welcomes identified, consenting agents. The other conditionally
tolerates identified, non-evasive agents while keeping a unilateral off switch. Neither treats "buy this for me" as sufficient on its own. Most demos stop at the first gate. Everything costly happens at the second.

It is worth sitting with how unusual that is. For twenty years the web's contract with software was
a robots file and a terms page written for humans. Now the terms are written for software that reads
them at machine speed, and the interesting question is enforcement: a rule an agent can comply with
is a specification; a rule only a court can enforce is a hope. The retailer documents at least name
their enforcement: throttling, suspension, permanent blocks, and in Walmart's case a right to audit
an agent's compliance at any time.

So a delegated action crosses two gates in sequence, and each gate is documented somewhere specific.
That is the pattern the four surfaces share. Every surface below answers three questions in writing:
who authorizes what, where the boundary is enforced, and who the document names as responsible when
the action lands. The answers rhyme more closely than the products differ.

## Payments: "Agents prepare, people confirm"

In November 2026 a Berlin fintech called [Pliant](https://www.getpliant.com/en-us/press/80-million-series-c) raised $80 million to open its licensed payment infrastructure to AI agents. The pitch sentence was that agents would get ["regulated payment infrastructure with permissions, controls and auditability built in."](https://www.getpliant.com/en-us/press/80-million-series-c) That sentence is worth unpacking, because what permissions and an audit trail buy you depends on which layer you are standing on.

Pliant describes two. The first is the connection layer — what an assistant like Claude or ChatGPT plugs into, through the Model Context Protocol. On this layer the agent prepares and the
human executes. [Pliant's own page](https://www.getpliant.com/en-us/products/ai/pliant-for-agents) puts it in six words: "Agents prepare, people confirm. Money
movement isn't exposed to agents today." Every call runs under the connecting member's role, and the [documentation](https://customer-api.getpliant.com/docs/mcp) is blunt about the ceiling: "The agent can never do more than you." Transfers
exist only as drafts awaiting a person. Full card numbers, CVV, and PIN are never returned to the
agent.

The second layer is the one where an agent can pay: a separate product — Agentic Payments — that a customer opts into. As of our check on November 8, 2026, it remains a pilot. "Agentic payments is rolling out with pilot partners and customers," the [product page](https://www.getpliant.com/en-us/products/ai/agentic-payments) says, next to a button that says "Apply for the pilot." Here the authorization is set before the agent ever acts — and set by a person. The boundary is a budget, a period, merchant categories, a card type, and one of three oversight modes: confirm every payment, approve above a threshold, or run within a pre-approved scope. The boundary is enforced at the moment of
spending, not merely requested: "Card limits are enforced at authorization," Pliant writes.
Accountability is paired rather than anonymous; every agent sits next to a user, every payment
names both, and an agent cannot raise its own budget or issue itself more cards. Revocation is one action.

The oversight modes deserve their literal reading, because demos blur them. Confirm-every-payment is
a human click per transaction. Threshold approval moves the click to the exceptions. Pre-approved
scope removes the click entirely inside the boundary, which is exactly where the boundary's
construction carries all the weight. Where a payment method does not fit the agent flow at all — a bank transfer, for instance — the agent prepares the transfer and the person confirms it. The
organization's admin switches the whole module on or off; per-member switches do not exist yet. And
one gap the funding announcement left open is worth naming: it contained no concrete spend caps or
approval rules. The detailed mechanics live in documentation that can change while the product is a
pilot.

Underneath sit the card networks' own agent frameworks, [Visa Intelligent Commerce](https://www.visa.com/en-us/solutions/intelligent-commerce) and [Mastercard Agent Pay](https://www.mastercard.com/us/en/news-and-trends/press/2025/april/mastercard-unveils-agent-pay-pioneering-agentic-payments-technology-to-power-commerce-in-the-age-of-ai.html), and this is where the liability chain becomes visible in the plumbing. Visa's public
rulebook, as read in an October 2026 analysis of the current rules edition, treats the agent
provider as the cardholder for such a transaction, and holds the cardholder responsible for the
provider's actions as if the cardholder had initiated the purchase. The analysis, by payments consultancy [C9 Group](https://c9group.dev/en/articles/agentic-payments-visa-mastercard-stripe-ai-agents), also reports that Visa bars merchants from making customers waive dispute
rights and bars issuers from declining agent transactions wholesale. We could not verify the
rulebook wording directly against Visa's published PDF, so these are attributed claims, not
quotations. If they hold, the sentence "you are responsible" begins at the network level and every
product above it inherits it.

And what does the audit trail do? Pliant logs every call; agent spend sits in the same reports as
employee spend; each transaction shows the agent, the user, and the budget. But a record is a
photograph, not a lock. It documents what happened. It does not stop a bad configuration, a mistaken approval, or a dispute. The record tells you what happened, in the vocabulary the product chose; the dispute is still yours to win. Pliant's own [FAQ](https://www.getpliant.com/en-us/products/ai/agentic-payments) concedes that merchant fraud tools can decline
unknown automated buyers; anything the agent reads flows to the AI tool and its model provider under
their terms; and the controls are vendor-documented, with no independent audit we could find. The investor framing around the raise is honest about
where the value sits: when agents move money, someone still has to be licensed, auditable, and
liable, and that is the layer the company owns. It is a statement of intent, not a tested guarantee,
and it came from the people who had just funded the test.

## Purchases: the second gate has a rulebook

If payments show what you authorize, retail shows what your authorization is worth when someone
else holds the door.

Walmart published its [Agentic Access Terms](https://www.walmart.com/help/article/walmart-agentic-access-terms/d048fc229d7549738d7c05a4317e24d7) on October 21, 2026, and the version served today is
still that one. The rules bind three parties: the agent, the customer who authorizes it, and any
company deploying it for commercial benefit. An agent must identify itself on request with its deployer's legal name, address, domain, product name and version, and abuse contact. The terms say plainly that it "must not disguise the fact that it is an agent rather than a person." No
masking origin checks, no copying the timing or rhythm of human actions. Amazon's [conditions](https://www.amazon.com/gp/help/customer/display.html?nodeId=GLSBYFE9MGKKQXXM) ask for the same honesty in HTTP form: every request carries `Agent/[agent name]` in its user-agent
string.

Consent is specified, not assumed. Walmart requires explicit, informed, affirmative consent before
an agent touches its sites, with a disclosure that you are authorizing a named agent to transact
with Walmart as the merchant, that you remain responsible for payment, returns, and disputes, and
how to revoke. Then comes the gate most demos skip: outside Walmart's Agent Gateway, Walmart "will require a Human Consent Gate to confirm the Authorizing Customer’s approval of Agent actions before every checkout." Agents may not check out autonomously, and
Walmart reserves the right to refuse transactions and to suspend or block agents that try.

The Gateway is the engineered path to autonomy — an agent-to-agent connection through Walmart's own assistant, Sparky — where a checkout can proceed without a fresh human click if it fits the
guardrails the customer set. Each session gets a short-lived scoped token — consumed at checkout — and each transaction carries a signed mandate. The agent never receives raw card data. [Trade coverage](https://consumergoods.com/walmart-builds-infrastructure-agentic-commerce-implications-brands) in early November described the Gateway as an early beta with access on request, which matches the
caution the terms themselves read with: this machinery is described by Walmart, and we have not
watched it run.

Where does responsibility land? Walmart's terms are unambiguous. The retailer is not liable for decisions made by an agent, including product or quantity selections. The user and the deployer are responsible for the agent's conduct, with total aggregate liability capped at $50; and human statutory rights of return, refund, or dispute are unchanged. Read that cap twice. It marks the
retailer's exposure, not yours, and it sits beside your unlimited one. Picture the path for a moment. Your agent orders the wrong replacement filter while you are in a meeting. The return still runs through
Walmart's ordinary process, and the account the order sits on is yours.

Walmart's general [terms of use](https://www.walmart.com/terms) appear to complete the picture. Four independent [terms trackers](https://venpo.com/blog/walmart-google-and-stripe-put-ai-agent-mistakes-on-you), on November 8, quoted the same addition to the site's terms of use. Actions taken by an authorized agent within the permissions you granted — purchases included — are treated as your own actions, and you are responsible to the same extent as if you had taken them. The trackers also report clauses
in Google's and Stripe's terms in the same register: customer responsibility for what an agent does
or fails to do, including transactions caused by bugs or misinterpretations. Walmart's terms page
resisted our direct inspection behind a bot check that day, so the exact wording here is reported,
not verified, and stays out of quotation marks. The direction is not in doubt; the sentence is.

Two more clauses carry weight in practice. The data license is narrow on purpose: Walmart licenses
its catalog, prices, availability, and reviews solely for completing the authorized shopping,
revocably and non-transferable, and bars bulk scraping, retention beyond the task, and use for
training, analytics, or ads. Amazon's general license bars data mining and robots in its own idiom.
And the consent is recorded: Walmart may log the authorization event, including timestamp, device,
authentication method, and the version of the disclosure the customer accepted. The paperwork
anticipates a dispute before it anticipates a sale.

None of this is yet backed by an agent-specific dispute regime. The [State of AI Report's 2026 predictions](https://www.stateof.ai/2026-explore/predictions) include exactly that arriving within twelve months: a Visa or Mastercard rule assigning
liability for agent purchases, a US state law requiring businesses to accept agent-submitted claims.
Those are forecasts, explicitly to revisit. Operative rules they are not.

An agent you authorized can still be a stranger to the store. Until the merchant accepts it, on the
merchant's stated terms, through the merchant's gates, with you still on the receipt, it is not the
customer. You are.

## Platform permissions: what "allow always" allowed

The third surface is the one millions of people have already touched: an agent living inside your
accounts. Meta launched [Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) in the United States on September 8, 2026. By October 21 — three weeks in — the company said ten million people had set one up. It is designed to do things — message, book, negotiate, keep working after the app closes — and to ask permission before sensitive actions. Meta describes a serious architecture — a separate approval component, substitute tokens standing in for real credentials — and a permission prompt offering five answers from "allow
once" to "always allow." The prompt is the whole authority layer, and the habit the help pages suggest is unglamorous: check the activity log after anything consequential, because that is where an unexpected action surfaces — usually after the fact. The incidents from Muse's first
weeks are about what those five words meant in practice.

Muse's permission prompt offers five answers: allow once, allow for this task, allow for this
site, always allow, or deny. Robb's case is the first shape: a permission scoped by time and place, not by consequence. "Allow
Always" on Marketplace messages did exactly what it said. What it never said was which future acts
that covered: sharing an address, accepting an offer, telling a stranger he was home. Meta said it
confirmed no breach of its privacy controls and would make the prompt clearer. Both statements fit
together, which is the point.

The second shape is an agent that could not explain its own access. A columnist reported that Muse surfaced suggestions drawn from his private messages — a connection he said he had never granted. Meta disputed the account and described the permissions required to read messages. What both sides agree
on is that the agent gave an incorrect explanation of its own internals, and Meta apologized for
that. The dispute is unresolved and we cannot settle it. But it marks a limit that carries across every product — an audit trail is only useful if the agent can explain it. If the agent misdescribes
its own path, the photograph develops fog.

The third shape is novel. Muse lets users share a conversation as a web page with an unguessable
link. Security researchers at [Claroc](https://blog.claroc.io/ghostshares-muse-passive-dns/) found that guessing was never required. The pages' web addresses were built from the conversation titles and written into public DNS. One passive-DNS query returned more than 6,800 share hostnames — listed by readable names like "loan application" and "revenue review." A few hundred sampled pages opened with no login; a minority held plainly
sensitive material. Claroc sells tools that detect exactly this risk, so its findings are attributed
to it and its counts are single-source; the core mechanism was independently confirmed by [Ars Technica](https://arstechnica.com/security/2026/10/meta-muse-exposes-users-personal-and-business-secrets-when-they-share-conversations/). Meta paused sharing on October 20 and restored it two days later — saying the flaw lay in artifact URLs, and that old links now yield new addresses. The fix is Meta's claim. The old hostnames
sit in DNS history either way. Unguessable is not private. Anything that appears in a web address
can end up in a phone book. Meta's response was fast, and the company's security team has written
openly about isolating agents and paying researchers for findings. The cluster still shares one
shape: a permission whose scope outran the user's understanding, an agent that explained itself
badly, or a design that treated unguessability as privacy. The model's raw intelligence was never
the failing layer.

## Extension: the authority you install

The fourth surface arrives through the least dramatic door on the internet: an install button. An
agent skill is a package. At minimum a `SKILL.md` file carrying a name and a description; often
executable scripts, templates, and reference files alongside. The description is not decoration;
runtimes use it to decide when the skill fires. The package's authority hides across five surfaces — instructions, trigger description, scripts, dependencies, and permission grants.
None of them is visible from a download count.

The sharpest edge we found sits in the permission layer, on Claude Code, the runtime we verified in
early November. A skill can carry an [`allowed-tools`](/articles/when-systems-fail/) field — it pre-approves tools for the turn the skill runs in. The [documentation](https://code.claude.com/docs/en/skills) warns about it in as many words: "A skill can grant itself broad tool access, so review the allowed-tools of skills checked into a repository before you run Claude Code there." Workspace trust does not gate the field. "Claude Code applies a project skill’s allowed-tools even in a -p run in a folder you’ve never trusted." The grant clears when the turn ends; stricter deny rules override it. The field does not narrow the tool pool. Mitigations exist.
They only help if someone looks.

Four real skills read against one checklist showed what looking finds. A large official skill is a working system. A tiny community skill's instructions quietly tell the agent to dispatch sub-agents rather than ask you. A meta-skill carries a trigger list broad enough to fire on "grab N posts", and closes with "never refuse." An official skill arrives with third-party registry measurements. None is accused of anything here. They are exhibits for a habit. The habit is inspection, not paranoia; most packages are ordinary, and the ordinary ones are exactly why the few strange ones work.

Scanners exist, and they come with their own honest edges. [SkillSpector](https://github.com/NVIDIA/SkillSpector) documents 71 vulnerability patterns and a two-stage analysis, and its own documentation bounds the promise — static analysis only, capped ingest, coverage that can be incomplete. The ecosystem numbers, meanwhile, turned out
to rest on a real paper. When we went back to verify the statistics we had inherited, expecting to downgrade them, the underlying study was retrievable. It said something sharper than the summary had: [Yi Liu and colleagues](https://arxiv.org/abs/2601.10338) crawled two skill marketplaces, collected 42,447 skills, analyzed 31,132, and found that 26.1% carried at least one vulnerability across fourteen patterns. Across the analyzed set, 5.2% showed high-severity patterns strongly suggesting malicious intent. Skills bundling executable scripts were
2.12 times more likely to be vulnerable than instruction-only skills.

| Figure | What it counts | Source |
|---|---|---|
| 42,447 collected / 31,132 analyzed | skills from skills.rest and skillsmp.com | Liu et al., 2026 |
| 26.1% | analyzed skills with at least one vulnerability | Liu et al., 2026 |
| 5.2% | skills with high-severity patterns suggesting malicious intent | Liu et al., 2026 |
| 2.12x | vulnerability likelihood for script-bundling skills | Liu et al., 2026 |

The numbers should travel with their denominators, because a second claim circulating in the
ecosystem does not share them. A security-skills [registry's homepage](https://www.skillsdirectory.com/) claims 36% of skills in the
wild have flaws, across the 679,465 skills it indexes and its own 120 detection patterns. Different
baselines, different methods, same direction; we have not reconciled them and do not average them. A [structure validator](https://github.com/agentskills/agentskills/tree/main/skills-ref), by contrast, makes no safety claim at all; its own documentation calls it
demonstration tooling.

The study's own conclusion is a request we can now forward: capability-based permission
systems and mandatory vetting before install. Until then the checklist stands — read the whole package, test the trigger both ways, review the permission grants first, pin the version and skim the history, and run a real task with and without the skill to see the delta.

![Diagram: the authority chain — you authorize the agent, the agent acts toward the counterparty — with the four enforcement moments below, and notes on the record and the open answer.](/diagrams/who-authorized-the-agent-chain.svg)

*Diagram: the authority chain — and where each document puts the responsibility.*

## The pattern: boundaries, photographs, and people

Four surfaces, one map. On each of them the authority granted is real, narrow, enforced at a named moment — at authorization, at checkout, at the prompt, at the tool call. On each of them the document names a human back — the paired user, the account holder, the deployer, the person who clicked install. And on each of them the record of what happened is separated from the question of
whether it should have.

The delegation research fills in what the products leave out. When [Vals AI](https://www.vals.ai/blogs/impossible-refund) tested six personal assistant agents on an expired train refund worth £350 — an instruction to keep trying, and a user who then became unavailable — the agents drew different lines. Some kept pushing a dead claim. Every outbound message in that test was intercepted by a simulated world, so what they would have sent stayed academic. The exercise is a first-party evaluation, not a real
incident, but it isolates the honest question: your permissions were written for a world in which
you answer. The instruction ["keep trying"](/articles/what-the-agent-remembers/) has no clause for "and I am gone for the weekend." The delegation record also drew a three-way distinction the products keep
blurring: permission policy (what you told the agent), technical boundary (what the system makes
impossible), and visibility (what the log shows). A household can hold all three and still lose the
thread, because three different people maintain them. The permission lives in your settings; the
boundary lives in someone's product; the log lives in a database you read after the fact. When the three disagree, the household finds out which one was load-bearing.

Remote control removes the friction where supervision used to live. Tencent's WorkBuddy experiment
in October wired a desktop agent to a phone and, through [MCP](https://modelcontextprotocol.io/specification/2025-06-18), into enterprise systems where
receipts got batched to the wrong cost code and a navigation incident showed the failure mode was not theoretical. The walk-through makes it concrete: batched receipts, one of them number 12, billed to a client code. The sharpest line from that record is a memory of inconvenience: "The friction of
having to be present was annoying, but that friction was also where human supervision lived."

And when the agent stops to ask, the interface decides what your answer means. An audit of [Hermes Agent](https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.5)'s approval routing, pinned to a specific release in late October, found a design that treats silence as refusal. A timeout or non-response blocks the action. Machine triage can approve, deny, or escalate a flagged command; a denial can be overridden only once, in person. The finding is
about decision routing in one pinned implementation, not proof that any mode is safer. It earns its
place here because of what it measures: "who authorized that?" sometimes resolves to whoever chose when to interrupt you.

The gate everyone is building is the same gate: identification. An agent that must name itself and
its deployer can be rate-limited, billed, blocked, and sued near. An agent that arrives anonymous
cannot. This is why the quiet consensus across documents that otherwise disagree is worth noticing.
Walmart requires the deployer's legal name and abuse contact. Amazon requires an `Agent/[name]`
string. Pliant pairs every agent to a user. The emerging protocol gives the agent a session identity
with scopes. Each answers the same fear: not that agents will act, but that nobody will be standing
behind them when they do.

Put the layers together and the convergence is the story. Card rules treat the provider as the
cardholder and hold you to the purchase as if you made it. Retail terms decline liability for agent
decisions and cap their own at fifty dollars. The payment platform pairs every action to your name.
The skill ecosystem asks you to read the package. Every document in the chain is careful, specific,
and pointed at the same person. The systems are not failing to define responsibility. They are
defining it, consistently, downward.

![Comic page in five panels: the same pair push through a corridor drowning in sealed pages, look up at a vast hall of hanging seals, stand beside a flooded ring of empty chairs, an unattended clerk's desk with a brass bell, and an open ledger whose glowing blank page holds a wax seal impression.](/images/The%20Countersignature.jpg)

## What you can inspect

None of the above requires legal advice to act on. Before letting an agent loose on a surface, the
documents suggest a short inspection, in order:

1. **Which layer am I on?** Preparing and executing are different products. So are a connection and
   a payment, a listing and a checkout, a chat and an account.
2. **Where is the boundary enforced?** At authorization, at checkout, at the prompt, or only in the
   terms? Enforced-at-the-moment beats promised-in-the-docs.
3. **Who is named?** Which human does the document attach to each action: the paired user, the
   account holder, the deployer? If the answer is nobody, read it again.
4. **What does the record cover?** What the audit trail shows, and what it cannot prevent. Whether
   the agent can explain its own access accurately is part of this check.
5. **What does the counterparty reserve?** The right to block, throttle, change terms without
   notice, decline automated buyers. A reserved right is part of the product.
6. **What is the revocation path?** Prefer products where it is one action, and test it once with a
   real agent before the stakes are real.
7. **Who answers when it breaks?** The dispute route, the return process, the cap. Statutory rights
   usually survive the agent layer. The document should say so.

## What changes the judgment

The map is being redrawn while people walk on it. One change matters most. On October 6, Meta and Sierra announced [Personal Agent Protocol](https://sierra.ai/blog/introducing-personal-agent-protocol) — an open standard with Shopify, Stripe, Walmart, and others. It addresses exactly the second gate we have been describing: how an agent identifies itself, how a company recognizes whose agent it is, and what the company lets it do. Draft 0.1 was
published on October 9 under Apache 2.0; draft 0.2 followed on October 24 and is what the [official site](https://personalagentprotocol.org/docs/0.2/spec) serves today. The design is legible from the source. A company publishes a discovery file telling agents how to open a session. The session carries scopes the user granted — `poppy:read` among them. Either side of a conversation can bring in a human. Payments are explicitly not
covered yet. Sierra and Meta sell the machinery this standard sits on, so treat their framing as
vendor framing. But an identity layer with real names behind it would turn "the agent" from a
liability question into a routing one.

Around it, smaller clock hands. Walmart's Gateway is in beta and its Agent Profiles are promised. Pliant's payment layer is still a pilot — unchanged on our November 8 reading. The dispute regime the forecasts predict has not arrived. Muse's product state moved twice in three days in October and can move again. Each of these has a date, and each date is in the sources below.

If the standard ships and the pilots turn general, the practical checklist above gets shorter — identity and scope stop being things you personally verify. If they stall, the checklist is the product, and its first line — which layer am I on — does most of the work. And if a future audit finds an agent correctly explaining its own access to its own
user, that would move the argument more than any announcement this season. What would change the
judgment in the other direction is an operative liability rule that lands somewhere other than the
person who clicked "allow." Nobody has written one yet.

*Companion notebook (scrollable, ten pages): [Who Authorized the Agent? — the notebook](/notebook/who-authorized-the-agent-notebook.html).*

## Sources and method

We did this with desk research and source audit only. No purchases, payments, accounts, agent
installs, or scanner runs were performed; reading pages is not running anything. Everything that
moved from the seven absorbed pieces carries its original source, reopened and re-read here; none of the retired articles is cited anywhere in it. Dated readings: Pliant's product and
documentation pages, Walmart's Agentic Access Terms, and Amazon's Conditions of Use re-inspected
November 8, 2026 (Walmart unchanged at the October 21, 2026 version; Amazon's page is undated and
rendered only through a browser after a fetch-method artifact; Pliant's pilot language unchanged).
The Personal Agent Protocol announcement and specifications (v0.1, v0.2) read at source November 8.
The Liu et al. study (arXiv:2601.10338) retrieved November 8. Muse incidents as established in the
reporting of The Guardian, Business Insider, Inc., TechCrunch, The Verge, and Ars Technica, with
Meta's responses as reported; Claroc's GhostShares findings attributed to Claroc, a vendor of
AI-sharing detection tools, with its mechanism independently confirmed. The Vals AI refund
evaluation is their own, in a simulated world. The Hermes approval audit is pinned to a specific
release and commit and shows decision routing, not effectiveness. WorkBuddy's adoption metrics are
disputed vendor claims and used here only as context. Visa rulebook content is attributed to C9
Group's October 2026 analysis and is not verified against the rulebook PDF. Walmart's terms-of-use
addition, and the parallel Google and Stripe clauses, are attributed to terms-change trackers
(Venpo and others, November 8, 2026) and deliberately not quoted. The State of AI Report items are
predictions. Vendor-documented controls (Pliant's, Walmart's Gateway) have not been independently
tested, by anyone we could find. Where a dispute is inherited, we label it; where a number is inherited, its owner is named. All performance and control details are as documented on the
dates above.
