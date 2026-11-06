# Who authorized the agent to make that payment?

![Mascot and editorial companion beside a terminal at night, the mascot holding a sealed packet before a check point; a graffiti wall reads WHO AUTHORIZED? and PAYMENT.](/images/pliant-agent-payments-authority-lead.jpg)

When a payment happens, someone authorized it. With an employee, the answer is a person with a budget and a job. With an AI agent, the answer is supposed to be a configuration: a limit, a policy, an approval step. But companies deciding whether to let agents touch money are being sold on a phrase — "permissions and audit trails" — that sounds like a guarantee and is really a design decision.

On November 4, 2026, Berlin-based Pliant, a B2B payments platform, announced an $80 million Series C led by Seaya Nova and Speedinvest. Its pitch: open its licensed payment infrastructure to AI agents — Claude, ChatGPT, or a company's own automations — through the Model Context Protocol (MCP), the standard assistants use to call tools. The company's release says the platform is API-first and lets agents access "regulated payment infrastructure with permissions, controls and auditability built in."

That sentence is the thing worth unpacking, because what "permissions and audit trails" actually buy you depends on which layer you are looking at.

## Two layers, not one

Pliant describes two different things, and conflating them is how "the agent paid someone" headlines get written.

The first is the **connection layer**. This is what Claude or ChatGPT actually plugs into. Pliant's MCP server has no permissions of its own: it acts as the member who connected it, and the platform checks every call against that member's role. "The agent can never do more than that person," the documentation says. Changes require confirmation first; transfers exist only as drafts that need approval inside Pliant. Full card numbers, CVV, and PIN are never returned to the agent. Even the actions that *do* touch money controls — approving card requests, emailing cardholders a secure link to card details — are gated behind a separate server, Pliant Pro MCP, which is in early access. An admin switches the whole module on or off for the organization; per-member off-switches are not possible yet. There is also an early-access CLI for scripts and pipelines, with the same rule: changes are previewed and need a human yes. Teams building their own software use the REST API with credential scopes — for example, merely listing payments requires a `money-movement:read` scope, and a credential without it gets a 403.

The key fact about the connection layer is what it does **not** do: it does not move money. Pliant's own FAQ is blunt: "Agents prepare, people confirm. Money movement isn't exposed to agents today."

The second layer is **Agentic Payments**, a separate product a customer opts into — and it is a pilot. "Agentic payments is rolling out with pilot partners and customers," the page says; it is not generally available.

This is the layer where an agent can actually pay.

## How a payment gets authorized

![High-angle view of the mascot adjusting a control panel with a limit dial and an approval marker; the companion watches from the frame edge.](/images/pliant-agent-payments-authority-limits.jpg)

In Agentic Payments, authorization is set before the agent ever acts, and it is set by a person.

A user or admin defines the agent's boundary: a budget, a period, merchant categories, and a card type. Then they choose an oversight mode: confirm every payment, approve above a threshold, or run within a pre-approved scope. The mechanics are described as enforced at the point of payment: Pliant writes that "card limits are enforced at authorization," and that anything outside them "is declined before money moves." Where a card doesn't fit — a bank transfer, say — the agent prepares the transfer and the user confirms it.

Accountability is named, not anonymous. Every agent is paired with a user, and every payment names both. An agent cannot raise its own budget, cannot issue itself more cards, and has no more permissions than its user. Revoking access is one action.

Underneath, Pliant says agent cards are built on the card networks' own agent frameworks: Visa Intelligent Commerce and Mastercard Agent Pay. These frameworks exist — Mastercard launched Agent Pay in April 2025 and has since expanded it into a wider "trust framework" of identity, intent, controls, execution, and intelligence; Visa's Intelligent Commerce portfolio is real but its developer documentation notes the program "is in the process of development and deployment" and may not be available in all markets. So the network layer is itself young.

![Chalkboard diagram inside the outline of the Orange Tomato mascot head: the authorization chain from boundary set and oversight chosen through agent acts, limits enforced at authorization, and payment executed and recorded naming the agent and user, with an outside-the-proof list.](/diagrams/pliant-agent-payments-authority-what-authorization-proves.svg)

*Diagram: authorization chain for an agent-initiated payment — boundary set, oversight chosen, agent acts, limits enforced at authorization, payment executed and recorded naming agent and user; merchant decline, model-provider data, disputes, and misconfiguration stay outside.*

## What the audit record does and does not prove

Every MCP call is logged, and changes appear in the organization's activity history. Agentic payments sit next to employee spend in the same reports, exports, and accounting flows, and each transaction shows the agent, the user, and the budget.

But a record is a photograph, not a lock. The audit trail documents what happened; it does not stop a bad configuration, a mistaken approval, or a dispute. Pliant itself lists the limits a buyer should care about:

![Wide view of the mascot standing at a boundary line, a ledger on the lit side and dim, unclear shapes in the fog beyond; the companion stands near the ledger.](/images/pliant-agent-payments-authority-audit.jpg)

- **Merchants can say no.** "Merchant fraud tools can decline unknown automated buyers," Pliant's FAQ concedes. The company says it is building in line with Visa Intelligent Commerce and Mastercard Agent Pay so merchants can recognize a legitimate agent — recognition that is still maturing on the network side.
- **Your data leaves your wall.** Anything a connected agent reads goes to the AI tool and its model provider, under their terms. Pliant says the answers are "written by the AI, so review the important ones." A payment agent is also a data pipe into a third-party model provider.
- **It is a pilot, and the numbers are not public.** The funding announcement contains no concrete spend caps or approval rules; the detailed mechanics live in product documentation, and third-party commentary has noted the same gap. Pilot-phase products change, and their controls have not been stress-tested in public.
- **No independent audit was found.** As of this writing, the controls are vendor-documented. A company relying on them is relying on Pliant's description of its own system.

The strongest contrary case is the simplest: this is a company describing its own product, in a funding announcement, at a moment when agentic payments are the most fashionable pitch in fintech. The investor framing is honest about why the licensed layer matters — "When agents move money, someone still has to be licensed, auditable and liable, and that is the layer Pliant owns," Seaya Nova's Vinoth Jayakumar told The Next Web — but that is a statement of intent, not a tested guarantee.

## The bounded verdict

So what does "permissions and audit trails" actually buy a company?

It buys **enforceable boundaries**: a per-agent budget and merchant scope that are checked at authorization, not just requested. It buys **named accountability**: every payment carries both an agent and a person, and the agent cannot quietly widen its own powers. It buys **a reversal path at the control level**: one action revokes an agent's access. And it buys **a trail** that sits inside the same accounting flow as employee spend.

It does not buy a guarantee that the payment is correct, the agent is well-intentioned, the merchant will accept the card, or the dispute will resolve smoothly. Those are open questions — and in a pilot product, they are the questions that matter most.

If your company is evaluating an agent payment workflow, the evidence suggests a short checklist, none of it exotic: confirm *which layer* you are using (connection vs. actual payment); confirm the product's availability status; verify who confirms what — per payment, per threshold, or per pre-approved scope; test the revocation path with a real agent; and keep a person on exceptions and disputes, because the trail records them rather than resolving them.

What would change this picture would be general availability, independent testing of the documented controls, and public, concrete dispute and reversal mechanics. Until then, treat "permissions and audit trails" the way the evidence asks: as a design you can inspect — not a promise you can stop watching.

## Sources and method

Desk research and source audit only; no API calls, no payment runs, no simulated transactions, and no interviews were performed for this article. Vendor claims are attributed as vendor claims; the card-network frameworks and independent coverage are cited separately.

- Pliant, [Pliant Raises $80 Million Series C](https://www.getpliant.com/en-us/press/80-million-series-c) (Nov 4, 2026, accessed Nov 6, 2026) — funding, agent claims, licensing.
- Pliant, [Agentic Payments](https://www.getpliant.com/en-us/products/ai/agentic-payments) (accessed Nov 6, 2026) — per-agent boundaries, oversight modes, enforcement, accountability, pilot status, merchant-decline FAQ.
- Pliant, [Connect any agent. Keep every control.](https://www.getpliant.com/en-us/products/ai/pliant-for-agents) (accessed Nov 6, 2026) — MCP/CLI behavior, confirmation steps.
- Pliant, [MCP documentation](https://customer-api.getpliant.com/docs/mcp) and [Access & Permissions](https://customer-api.getpliant.com/docs/mcp-access-permissions) (updated Oct 29, 2026, accessed Nov 6, 2026) — role checks, Pro MCP early access, card-secret handling, data flow, logging.
- Pliant, [CLI documentation](https://customer-api.getpliant.com/docs/pliant-cli) (updated Oct 29, 2026) — early access, human-yes confirmation.
- Pliant, [Partner API — Permissions](https://partner.getpliant.com/docs/endpoint-permissions) and [List of Payments](https://partner.getpliant.com/reference/get-payments) — credential scopes and per-endpoint enforcement.
- Visa, [Visa Intelligent Commerce](https://www.visa.com/en-us/solutions/intelligent-commerce) and [Visa Developer — VIC](https://developer.visa.com/capabilities/visa-intelligent-commerce) (accessed Nov 6, 2026); Visa, [Visa Opens the Door to AI-Driven Shopping for Businesses Worldwide](https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22276.html) (Apr 8, 2026) — Intelligent Commerce Connect press release.
- Mastercard, [Agent Pay launch](https://www.mastercard.com/us/en/news-and-trends/press/2025/april/mastercard-unveils-agent-pay-pioneering-agentic-payments-technology-to-power-commerce-in-the-age-of-ai.html) (Apr 29, 2025) and [Trust and Intelligence services](https://www.mastercard.com/us/en/news-and-trends/press/2026/september/new-trust-and-intelligence-services.html) (Sep 30, 2026).
- The Next Web, [Pliant raises $80M to open its B2B payments platform to AI agents](https://thenextweb.com/news/pliant-80m-series-c-ai-agents-b2b-payments-seaya-speedinvest) (Nov 4, 2026) — investor quote, context.
- PYMNTS, [Pliant Raises $80 Million to Open B2B Payments to AI Agents](https://www.pymnts.com/news/investment-tracker/2026/pliant-raises-80-million-to-open-b2b-payments-to-ai-agents/) (Nov 4, 2026).
- FinTech Futures, [German B2B fintech Pliant bags $80m Series C](https://www.fintechfutures.com/venture-capital-funding/german-b2b-fintech-pliant-bags-80m-series-c) (Nov 6, 2026) — UK EMI licence, total funding.
- Rush Commerce, [Pliant raises $80M to open B2B payments to AI agents](https://rushcommerce.dev/blog/pliant-80m-series-c-b2b-payments-for-ai-agents-mcp-claude-chatgpt-corporate-cards-set-agent-spend-limits-before-you-connect) (Nov 4, 2026) — commentary on missing caps.

All performance, availability, and control details are as documented by the vendor and inspected on the dates above; none were independently tested. The evidence record with full claim ledger is in the article run's `02-evidence.md` (C1–C19).
