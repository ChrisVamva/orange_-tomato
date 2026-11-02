# Can an AI shopping agent be a customer if a retailer says no?

![The Orange Tomato mascot — a tomato-headed robot in cracked dark armor — standing before a graffiti wall sprayed with GATES and retailer terms; its chest screen showing the article title.](/images/shopping-agent-merchant-acceptance-lead.png)

Walmart has a published rule for shopping agents. Amazon has a different one. Both say your instruction is only half the transaction.

Walmart's rule is called the [Agentic Access Terms](https://www.walmart.com/help/article/walmart-agentic-access-terms/d048fc229d7549738d7c05a4317e24d7), versioned October 21, 2026. It governs agents that access Walmart's sites directly, plus the customers who authorize them and the companies that deploy them. Amazon's rule lives inside its [Conditions of Use](https://www.amazon.com/gp/help/customer/display.html?nodeId=GLSBYFE9MGKKQXXM) as an Agent Terms section. It says an agent may access Amazon's services only if it identifies itself and follows Amazon's technical requirements — and Amazon may limit how any agent accesses its services, including by technical measures, or tell an agent to stop.

Wire reporting has framed this as Walmart welcomes outside agents while Amazon bars them. The documents we inspected support a narrower version: Walmart conditionally welcomes identified, consenting agents; Amazon conditionally tolerates identified, non-evasive agents while keeping a unilateral right to block. Neither treats your "buy this for me" as enough on its own.

## Why your yes is not enough

![The Orange Tomato mascot in profile beside a graffiti wall sprayed with PERMISSION and ACCEPTANCE; its chest screen showing the article title.](/images/shopping-agent-merchant-acceptance-gates.webp)

That distinction matters because a purchase is not one permission. It is two gates in sequence. You authorize the agent. The retailer separately decides whether to accept that agent. If the second gate stays closed, there is no customer relationship for the agent to step into, however clear your instruction was.

Walmart makes the two gates explicit. No agent may use its sites unless both the agent and the human account holder agree to its agent terms, on top of the regular Walmart.com Terms of Use. A company that deploys a shopping agent for commercial purposes is also bound where it benefits, receives or can access what the agent touches, or uses what the agent obtains for training, analytics, or ads — and it cannot avoid the terms by saying a human never clicked through, the customer told the agent to act, or no credential was presented.

Before any of that, the agent must be legible as an agent. Walmart requires it to identify on request with its deployer's legal name, address, domain, product name and version, and abuse contact, plus enough to link it to your account — and forbids masking, forging, evading origin checks, defeating human-vs-automated checks, or copying human timing to hide. Amazon requires the same honesty in its own idiom: every HTTP request must carry `Agent/[agent name]` in the user-agent string, no mimicry of keystrokes or navigation, no CAPTCHA circumvention, truthful answers to human-or-computer prompts, and no circumvention of any agent control.

Consent is also specified, not assumed. Walmart requires explicit, informed, affirmative consent before an agent touches its sites, with disclosure that you are authorizing a named agent to transact with Walmart as the merchant, that you remain the responsible account holder for payment, returns, and disputes, that you may revoke, and where and how. Walmart can log that authorization — timestamp, device, method, disclosure version — for security and fraud prevention.

## The six pieces that have to work

Then comes the gate most demos skip. Outside Walmart's Agent Gateway, Walmart requires a human consent gate before every checkout. Agents may not check out autonomously unless they go through the Gateway's requirements. Walmart reserves the right to refuse transactions and suspend or block agents that attempt autonomous checkout in breach of these terms, and it can add further gates — sign-in, Wallet setup, identity verification — that no agent instruction or deployer setting can waive.

The Gateway is Walmart's path to autonomy, described in an addendum as an MCP-like connection where an outside agent shops agent-to-agent with Walmart's agent Sparky. Inside it, Walmart may let an agent check out without a separate human gate if the action fits the customer's standing guardrails and does not conflict with the terms. Those guardrails — spend limits, category or frequency constraints set in account settings — inform the agent but do not make Walmart responsible for enforcing them; the customer and deployer remain responsible for keeping the agent inside them.

![Hand-drawn notebook flow: You say yes and Store says yes feed Agent tries to buy, through Checkout plus payment, to If it breaks (you plus deployer liable, forecast only).](/diagrams/shopping-agent-gates.svg)

*Diagram: two gates feed the transaction spine; failure falls back on the shopper and deployer.*

Under Walmart's terms, each Gateway session needs its own short-lived scoped token, consumed at checkout and not reusable beyond its merchant, cart, amount, and session; each transaction carries a cryptographically signed mandate of instructions, identity, consent, and timestamp. Under those terms, only you may designate which payment method the agent may use, and the agent never receives raw card data — number, CVV, or equivalent — and must route payment data only through Walmart's channels while submitting hashes, mandates, and consent records as an immutable record.

Access to product data is equally narrow. Walmart licenses its catalog, prices, availability, fulfillment data, and reviews solely for completing your authorized shopping, revocably and non-transferably. Bulk or systematic scraping, retention beyond the task, training models or targeting ads from that data, and reselling or redistributing it are all barred. Amazon's general license similarly bars data mining, robots, or similar gathering tools, to be read alongside its Agent Terms that contemplate compliant agent access. Both reserve performance control: Walmart may throttle, suspend, or permanently block agents at its discretion; Amazon may limit whether and how any agent accesses its services.

## Where it breaks and who fixes it

![The Orange Tomato mascot seated with a long receipt before a graffiti wall sprayed with LIABLE and DISPUTE; its chest screen showing the article title.](/images/shopping-agent-merchant-acceptance-breaks.webp)

Where this leaves accountability is blunt. Walmart says it is not liable for agent decisions — product or quantity, delivery, substitutions, or out-of-scope acts — and the user and deployer are responsible for the agent's conduct, with total liability capped at $50 to a deployer or third party. Human statutory rights of return, refund, or dispute are unchanged; the agent layer does not remove them. Amazon's structure points the same way: the human deploys or allows the agent, the agent must obey the stated controls, and Amazon keeps the right to say stop.

None of this is yet backed by an agent-specific dispute regime. The [State of AI Report 2026](https://www.stateof.ai/2026-explore/predictions) predicts one — a Visa or Mastercard rule assigning liability for agent purchases, a US state law requiring businesses to accept agent-submitted cancellations and claims, even a regulator blaming correlated retail-agent orders for an abnormal stock move — but those are forecasts for the next twelve months, explicitly to revisit, not operative rules. The same page notes its prior agentic-commerce thresholds went unmet, which is a reason not to claim adoption or volume here.

## What to check before you let an agent buy

So the practical test before you let an agent buy is paperwork, not persuasion. Check the current, dated agent terms for that retailer and confirm which path you are on — Gateway with guardrails and tokens, or direct with a human gate every time. Confirm the agent identifies as an agent and cannot be set to hide. Confirm consent names the agent, states you stay responsible for payment, returns, and disputes, and tells you how to revoke. Confirm who designated the payment method and that no card data passes to the agent. Confirm who owns a return if the agent picks wrong, and that you know the retailer's human dispute path still applies. If any answer is "the demo didn't say," do not treat the purchase as routine.

An agent you authorized can still be a stranger to the store. Until the merchant accepts it — on the merchant's stated terms, through the merchant's gates, with you still on the receipt — it is not the customer. You are.

## Sources and method

Desk research only; no purchase, account, payment, or block circumvention. No live flow observed or tested.

- Walmart Agentic Access Terms, October 21, 2026 version — inspected full article body 2026-11-02. Direct-access rule plus Agent Gateway addendum. Walmart may update immediately for fraud/security/legal; recheck before publication.
- Amazon Conditions of Use, Agent Terms + license clause — inspected via decompressed page 2026-11-02. Conditional permission + unilateral limit/refrain right. Page undated in extraction; recheck before publication.
- State of AI Report 2026, predictions for 2027 — snapshot revised 2026-10-07, published 2026-10-08, inspected 2026-11-02. Nine forecasts; agent-payment, agent-cancellation-law, and correlated-orders predictions are forecasts, not facts.
- Vibe Report (vault secondary, 2026-10-30) and its AFP wire pointer treated as discovery leads; AFP original not inspected.

Limitations: AFP originals not located; operative card-network or consumer-protection agent rule not found (prediction only); Gateway internals terms-described, not observed; returns mechanics beyond policy sentences unresolved; both retailer pages drift and must be rechecked close to publication.
