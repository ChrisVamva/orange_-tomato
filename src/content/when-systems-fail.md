# When Systems Fail

![Comic page in five panels: the pair descend into a harbour engine house with a brass-bound logbook, find a wall of riveted pipes with one tagged valve wheel, set the book on a gauge bench, look out over the town, and watch the book's reflection show an unwritten entry.](/images/Who%20Tends%20the%20Pipes.png)

On the evening of October 21, 2026, the Dutch government took its own front door
offline. DigiD, the login system millions of people use to reach public services,
went dark around half past eight. MijnOverheid, the personal government inbox, had
gone two hours earlier. By the next morning the tax authority's sites were down
too. In Finland, the state IT provider pulled government public-network services
as a precaution, expecting to restore them by late afternoon. France told its
local prefecture sites to wait for a fix. More than thirty government services in
Britain went dark. In Japan, a major bank suspended some online services and the
Finance Ministry halted parts of its website. Wikipedia's project systems
suspended service. The Internet Archive went briefly offline.

No attacker had taken these sites down. Their operators had. Somewhere underneath
all of them, in a layer none of their visitors ever see, two critical holes had
been found in PHP itself. That is the programming language runtime that assembles roughly
seven in ten websites on the internet. The people responsible for those sites had
decided that going dark for a night was safer than staying up on a vulnerability
they could not patch themselves. That decision, repeated across countries in a
matter of hours, is the shape this piece is about. When the failure sits a layer
below your hands, the only question that matters is who holds the fix.

Most of the sites came back within days. The Dutch login systems returned the
same night. The tax sites followed in the morning. Japan's Finance Ministry
restored its pages in stages and declared full resumption five days later.
Wikipedia and the Archive were back within roughly a day. For the French
prefecture sites and the British services, no public restoration date was ever
published in the sources this research could inspect. The silence is part of the
story. Shutdowns are announced. Recoveries often are not. The Dutch liveblogs timed the returns through the night: the login systems back
the same evening, the tax sites in the morning. Japan's Finance Ministry posted
its own sequence, partial resumption the next day and full resumption five days
later, with a press conference in between reporting no damage found. Wikipedia's
project systems and the Archive needed roughly a day, and the Wikimedia
foundation's later bulletin filled in the phased detail. These are the recoveries
the record shows. The French prefectures, the British services, the Finnish
networks: taken offline in public, brought back in private, on schedules nobody
published. A precautionary shutdown is a decision an operator can take alone. A
restoration is a verification, and verifications rarely get press releases.

The holes were [CVE-2026-109618 and CVE-2026-109619](https://www.php.net/archive/2026.php),
collectively called PHP2Shell. Both were rated 9.2 out of 10 on the standard
severity scale. Both let an attacker with no account and no password run their own
code on a web server running a vulnerable PHP. Both lived not in WordPress, not
in a plugin, not in any theme or storefront code, but in PHP's own memory
handling, the engine room underneath every application built on the language.

The first flaw corrupts memory when PHP runs out of it at exactly the wrong
moment, leaving half-built internal structures behind that the engine later
treats as valid. The second lets one web request leave stale internal state
behind for a later request on the same worker process to pick up and reuse.
Both were demonstrated as full remote code execution on the most common Apache
setup, before any application code even ran. That last detail is the one that
matters for everything that follows. The flaw fires before your code loads, so
nothing your code does can stop it.

To feel the weight of that, picture the stack as floors in a building. Your site,
the words, the checkout, the login form, lives on an upper floor. PHP lives on
the floor below, the one with the wiring. Updating a plugin or switching a theme
is rearranging furniture upstairs. PHP2Shell was a fault in the wiring, and
rearranging the furniture changes nothing about it. The fix had to come from
whoever controls the wiring: the hosting provider, the server owner, the people
who ship the container image. Almost never the person who built the site. The
PHP project's own advisory said so in plain terms. Updating an application such
as WordPress or Laravel does not update the PHP runtime beneath it. The fix
arrives through the server package, the host, or the container image.

The patched releases landed on October 21:
[PHP 8.5.12, 8.4.27, 8.3.36, and 8.2.35](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/).
WordPress itself released no software update in response, because there was no
WordPress-layer fix to release. A security firm that protects WordPress sites
spelled out the consequence for its users the same day. Automatic updates would
not apply this fix. If your site runs on managed hosting, you were waiting on
your host. If it runs on your own server, the job was yours. Many site owners
learned that week, some for the first time, which of those two people they were.

## Who holds the binary

That question, who actually controls the PHP binary in your setup, turns out to
be the whole practical story. The answer changes with every kind of hosting, and
each answer names a different holder.

On managed shared hosting, the host controls PHP. The site owner can pick a
version per domain from whatever the host has installed, through tools like
cPanel's MultiPHP Manager or Plesk's per-plan PHP settings, but cannot patch the
runtime. The host installs the fix or nobody does. On hosts using CloudLinux,
there are two stacks: the panel-managed PHP and a hardened vendor-patched
selector that can cover older branches the panel no longer ships. Either way,
the tenant's only move is to ask, to check, and if necessary to leave.

On a VPS or a dedicated server you administer yourself, the job is yours in
full. Update the package or build from source, then restart every PHP worker.
The restart matters more than people expect. A running worker keeps serving the
old code until it is recycled, so a patched binary with un-restarted workers is
a fix that has not taken effect. Several of the post-disclosure guides put the
restart in bold. It earned the emphasis.

In containers, the image maintainer holds the fix, and a running container is
immutable until it is rebuilt. The official PHP images picked up the patched
tags after the php.net release. The official WordPress images reached Docker Hub
later that same day, roughly four hours after the language release. Anyone
running WordPress in Docker who clicked update in the dashboard that afternoon
updated the application only. The runtime underneath changed when somebody
rebuilt the image. One early publisher, Chainguard, had fixed images out hours
before the coordinated release. That drew an angry response about supply-chain
disclosure, and it also demonstrated how the container layer can move faster
than the announcement it is supposed to wait for.

Through Linux distributions, the vendor carries the fix back into older
versions, and the version number will mislead you if you let it. Ubuntu, Debian,
and Red Hat backported the patches into their packaged PHP builds, which keep
the old version string while the package revision carries the fix. Checking the
version flag tells you nothing. The changelog tells you everything. This matters
because the official fix only covers supported branches. PHP 8.1 reached end of
life at the end of 2025, and versions back to 5.4 have no upstream fix at all.
For those, the PHP security team published minimal source backports for 7.4,
8.0, and 8.1, enough to build from source or to tide vendors over, and the
distributions filled the rest unevenly. Ubuntu's extended support covers
branches back to PHP 5.5 on old releases. Debian fixed its current branches
and left older ones to paid extended support. Red Hat's stream table was still
showing one PHP 8.4 stream as affected in early November. Community backports
exist for long-dead versions and carry no official standing whatsoever.

Managed platforms sit at the far end of this spectrum. WordPress.com stated on
the day of disclosure that its sites, along with its VIP, cloud, and Pressable
fleets, were already protected at the infrastructure level, with no customer
action needed. That is the bargain of managed hosting stated honestly. You
cannot fix the runtime yourself, and in exchange, somebody else fixes it for
you. The bargain only works if you know which side of it you are on. For the site
owner who has never asked, the checks are concrete. On shared hosting, open the
panel and see which PHP versions the host offers; if the newest patched branch
is missing, the question goes to support, in writing. On your own server,
update the package, restart every worker, then confirm the running version
rather than assuming the install took. In containers, rebuild the image and
confirm the new tag is what actually deployed. On a distribution package, read
the changelog instead of the version flag. Each of these takes minutes. Each
answers the only question that matters: who holds this binary, and have they
moved.

## From thousands to millions

The disclosure itself nearly went wrong before it started. Technical details of
the flaws leaked online before the coordinated release date. Proof-of-concept
exploits circulated before the patches went live, though the PHP security team
said none of them worked. The project shipped a day early, on October 21
instead of the 22nd. By then, attack traffic was already underway.

Cloudflare had deployed its firewall protections about nine hours before the
public announcement. Its customers on free and paid plans alike were covered by
default from the early hours of the 21st. Amazon's threat intelligence had
spotted exploitation attempts four days before patches existed, on October 17.
Multiple security firms reported pre-disclosure probing. All of it, at that
point, unsuccessful. One threat-intel team later summarized the pre-patch
period precisely: scanning, fingerprinting, and non-working exploits, with no
known compromises.

After disclosure the numbers moved the way they always move. Cloudflare's
figures, reported by its chief executive the next day, traced the arc. Thousands
of attempts before disclosure, tens of thousands within forty-five minutes of
it, hundreds of thousands within two hours, and millions by the following day.
Those are Cloudflare's counts from its own network, not an independent census
of the internet. As a measure of pace, though, they describe what every
administrator already knows. A critical runtime flaw does not get exploited
gradually. The window between a patch being available and mass exploitation is
measured in hours. The patching fleet moves in days and weeks.

The firewall vendors held the line in the meantime, and they were unusually
clear about what their line was worth. Cloudflare built something new for the
occasion: detection that combines signals from the request and the response
inside the same transaction. A blocked attack is confirmed by what the
server almost sent back rather than guessed from what came in. These were the
first managed detections shipped with that capability. [AWS added rules to its
managed rule group in two steps](https://aws.amazon.com/blogs/security/using-aws-waf-to-apply-mitigations-for-php2shell-rce-vulnerabilities-cve-2026-109618-and-cve-2026-109619/), coverage for the second flaw on October 22 and
extended coverage for the first on October 23, switched on by default, with
guidance for the end-of-life versions added the following week. Both vendors
put the same sentence in the same prominent position. "Patching is the only
complete fix, and you should upgrade PHP as your first priority." A firewall rule buys
time. It does not close the hole.

## The month after

As of the first reporting, an important line held. No confirmed successful
compromise had been publicly documented. Attack traffic is not compromise, and
every careful outlet kept the two apart. That line has since moved, and the way
it moved is instructive.

The first substantial confirmation came on October 24, from [honeypots run by a
Perplexity detection lead, Adel Karimi](https://www.bleepingcomputer.com/news/security/php2shell-security-flaws-now-sucessfully-exploited-in-the-wild/). The traps recorded genuine remote code
execution against an Apache setup running PHP 8.4.26, including a memory dump
of several hundred kilobytes pulled out through the flaw. An independent
researcher with a strong record on exactly this kind of evidence called it the
highest-quality in-the-wild confirmation seen to that point. Karimi attached
the bound himself, and it travels with the finding wherever the finding goes.
The demonstration ran on an intentionally favorable single-worker
configuration. It says nothing about how reliable the exploit is on other
setups, builds, or applications. A proof that the chain works end to end is not
a measure of how often it works. Both halves of that sentence belong in any
retelling.

Three days after disclosure, both flaws entered the [US government's catalog of
known exploited vulnerabilities](https://www.cisa.gov/news-events/alerts/2026/10/26/cisa-adds-two-known-exploited-vulnerabilities-catalog), which sets a binding patch deadline for
federal civilian agencies. [A vendor report at the end of the month](https://dreamgroup.com/blog/chained-php2shell-exploit-roots-25-servers) described a
chained campaign pairing PHP2Shell with a separate Linux kernel privilege flaw
to take over firewall appliances. Twenty-five servers across four countries,
with three in a US-government-affiliated environment, according to the vendor.
The firewall maker's own research unit verified the attacker's tooling and
results, according to the same report. The recovered artifacts pointed to an
operation that began with exploit development in a lab and ended with access
to a government organization's internal directory, via credential extraction
after the appliances fell. The report also noted signs of AI-assisted tooling
in the attack infrastructure. All of this comes from a single security vendor
and should be read as its findings, not as an established census. But it points
at the shape of what runtime flaws enable once weaponized. The flaw gets you
in, and something else gets you root.

And yet, as of early November, there were still no reports of mass breaches. [A
Kaspersky review two weeks after the patches](https://www.kaspersky.com/blog/php2shell-two-weeks-after-patches/56647/) noted the retraction of one
claimed hit on a European government agency, and put the exposure in stark
numbers. Of 46 million scannable servers running a vulnerable PHP, 29 million
were still unpatched. The scanners keep scanning. The fleet keeps moving
slowly. Late in the month, the WordPress-focused security press was still
reporting attempts rather than successes: no WordPress compromise known to its
analysts, and request logs showing probes, not takeovers. The gap between those
two facts is the risk, stated without drama.

One more disclosure belongs in this section, because it complicates any
all-clear. On October 23, the PHP project published an advisory for a third
flaw, [CVE-2026-115560](https://blog.cloudflare.com/php-vulnerabilities-waf-protection),
which affects fully patched releases including the newest one. It allows the
same kind of attack, but only under an unusual combination of configuration and
application code. Session handling changed at runtime while upload-progress
tracking stays enabled. PHP's team judged that combination exotic enough to fix
on the regular release schedule rather than by emergency, and no fix release
had appeared as of mid-November. Until one ships, the mitigation is a single
configuration line. Turn the upload-progress setting off. AWS confirmed its
existing firewall rule already covers that vector. The lesson is not that
patching failed. A runtime is never finished being patched. The people who hold
the binary hold an ongoing job, not a one-time errand.

There is a coda to the discovery story worth keeping. The flaws surfaced
through a new round of security attention on PHP itself. The pieces: a first external audit
in years, funded through a European technology agency and carried out by the
firm Quarkslab, plus AI-assisted tooling on several sides of the coordinated
disclosure. A PHP core developer had already glimpsed the first flaw's shape in
2024 while fixing an audit finding, theorizing an exploit nobody could yet
build. Two years later, the tooling caught up with the theory. A researcher at
a London university warned that the same tooling now accelerates the attack
side too. That warning travels as one researcher's view, not as a documented
finding. It earns its place here because it names the next window. Discovery
keeps getting faster. The patching fleet does not.

## The breach that travelled through an AI tool

A different failure, months earlier, shows the same question from the other side
of the stack. In April 2026, attackers reached inside Vercel, the cloud platform
behind a large share of the modern web, and the way in did not touch a model at
all.

[Vercel's own incident bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident),
closed on October 16, traces the path step by step. The entry point was
Context.ai, a small third-party AI tool used by a Vercel employee. Compromising
that tool gave the attackers the employee's Google Workspace account. The Google
account gave them the employee's Vercel account. The Vercel account gave them a
Vercel environment, and from there they moved through internal systems,
enumerating and decrypting stored environment variables. The variables they
reached were the ones customers had not marked sensitive: API keys, tokens,
database credentials, signing keys, the ordinary secrets of running software.
Vercel's bulletin distinguishes this carefully from two things it was not. The
company's published packages were independently confirmed uncompromised, with
no evidence of tampering. A separate small set of customer account compromises
found during the investigation did not appear to originate from Vercel systems
at all. The company brought in outside incident responders, notified law
enforcement, and engaged the AI vendor directly to scope its compromise.

Read that path again and notice what is missing from it. No model was hacked. No
prompt injection appears in the account. The AI tool in the story is a doorway,
not a culprit. One integration among several, each of which trusted the
identity that arrived from the previous one. The failure is a property of the
chain, and the fix belongs to whoever controls each link. Those are the limits on what
the third-party tool can reach, the Workspace account's protections, the
permissions of the Vercel identity, and the marking of which secrets even a
legitimate reader may see. Vercel's recommendations read exactly that way.
Require phishing-resistant login. Treat every unmarked variable as exposed and
rotate it before anything else, since deleting a project does not remove the
threat to copied secrets. Mark secrets sensitive so they cannot be read back.
Review activity logs and recent deployments for anything unexpected. Set
deployment protection to standard at a minimum. Each item hands a specific job
to a specific holder.

## What the breach numbers actually say

The industry's most quoted measurement of this kind of failure arrives with a
denominator most quotations drop. [IBM's 2026 Cost of a Data Breach study](https://newsroom.ibm.com/2026-07-29-ibm-study-one-in-four-malicious-breaches-are-ai-enabled,-costing-companies-6-million-on-average) reports
that 21 percent of the organizations in its sample experienced a security
incident involving an AI model or application, up from 13 percent in its
previous round. The sample is 602 organizations that had already suffered
breaches, surveyed about incidents from March 2025 through February 2026, and
drawn from seventeen industries across sixteen countries. That means the 21
percent describes organizations already in a breach study. It is not the share
of all companies that suffered an AI breach. Quoting it without the denominator
turns a finding into a scare figure. The study was conducted by the Ponemon
Institute and sponsored and analyzed by IBM. The full questionnaire, the
wording, the sampling, the weighting, sits behind a contact form, so none of it
can be inspected. The figure is best read as what respondents in IBM's breach
sample reported. Nothing more specific is available, and nothing more specific
should be claimed.

The same discipline applies to the study's most-shared details. [IBM's summary
says two reported issues](https://www.ibm.com/think/insights/every-ai-agent-followed-rules-data-still-leaked) each appeared in 27 percent of the AI-related
breaches: cloud misconfigurations affecting AI workloads, and compromises of
connected applications, APIs, or plugins. Those two numbers must not be added
together. The public summary does not say whether the categories overlap or how
respondents selected them. They do not establish that any reported condition
caused any breach. They identify what respondents reported seeing around their
incidents. The study also says 92 percent of organizations reporting AI-related
breaches lacked what it calls proper AI access controls, naming role-based
access and multi-factor authentication as examples. The word proper is IBM's,
and the summary never defines how it was assessed. It does not show that any
single control would have prevented any particular breach.

None of this dismisses the finding. The same summary lists AI-specific causes
too: poisoned data, prompt injection, model inversion. The honest reading is
the one the bulletin and the study share. The system around the model belongs
in the security picture. Getting the numbers right does not weaken that point.
It is what makes the point worth acting on, because a holder who is told the
truth about the evidence will still be holding the job after the headline
moves on.

## The pattern: every layer names its holder

Put the two stories side by side and the shared shape appears. In each, the
failure lived one layer below where the reader naturally looks. The site owner
looks at the application. The fix lived in the runtime, held by the host, the
image maintainer, the distribution vendor. The AI adopter looks at the model.
The fix lived in the integration, held by whoever granted the tool its identity
and its permissions. In each, a stopgap existed that bought time without
closing anything. Firewall rules filter the traffic while the binary stays
vulnerable. Access hygiene narrows what a compromised identity can reach while
the trust chain stays long. In each, the pace of exploitation set the terms:
millions of attempts within hours on one side, an attacker moving from a
third-party tool to production secrets before anyone noticed on the other.

The security community has a name for the second half of this. An AI system
granted the ability to call functions and reach other systems, through
extensions, plugins, or connectors, can do damage whenever its outputs go
wrong, for whatever reason. A bad prompt. A weak model. An injected
instruction from a compromised peer, or a hallucination from a perfectly benign
one. The defense, in the
[OWASP guidance on excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)
and in [NIST's API-protection guidelines](https://csrc.nist.gov/pubs/sp/800/228/upd1/final)
(current through the March 2026 update, which added risk and control
catalogs), is structural rather than verbal. An agent given document access
through an extension that can also rewrite and delete was granted too much
function. A reader identity carrying write permissions it never needs was
granted too much permission. A system left to chain its own invocations without
checkpoints was granted too much autonomy. The guidance names all three
excesses because every incident travels through at least one of them, and the
fix in each case is the same. Check authorization in the downstream system,
where the action happens. A prompt telling the model to use only approved data
enforces nothing by itself. These are general principles, not explanations of
any particular breach. Their value is that they name the holder in advance. The
person who configures the connector decides what a compromised agent can
touch, long before anything is compromised.

![Diagram: two layers, one holder each — Site plus Plugin points down to the PHP Binary held by host, image, and vendor, fanning out to a WAF Rule stopgap and a Binary Update fix; AI Tool points down to Shared Identity and then Connected System, with a check note listing minimum capability, minimum permission, and checking authorization where the action happens.](/diagrams/when-systems-fail-holders.svg)

*Diagram: two layers, one holder each — and the check that names the holder in advance.*

![Comic page in five panels: the pair wade through shed tube labels, stand in a hall of thousands of tubes, read damp along a flooded gallery, find an engine house running with no keeper, and kneel at an open logbook whose entries glow while the last page stays blank.](/images/What%20the%20Rooms%20Carry.png)

## What you can inspect

The reader's version of all of this fits on an index card. Find out who
controls your PHP binary: your host, your image maintainer, your distribution,
or you. Confirm the patched version is installed and every worker restarted.
Check whether your branches are still supported, and if they are not, find out
whose backport you are relying on. Treat firewall coverage as a window rather
than a wall, and ask when it expires. For every AI tool connected to your work,
ask which identity it uses and what that identity can reach. Ask which files,
APIs, and actions sit behind its connectors. Ask whether the connected system
checks permission itself or trusts the model to behave. Ask whether you can see
what the integration touched, and whether you can revoke it. Mark your secrets
so they cannot be read back. Rotate what was readable. None of these steps
requires trusting a headline number. Each one names a holder, and in several
cases the holder is you.

## What changes the judgment

Several threads in this piece are dated observations, not settled facts. The
third PHP flaw had no fix release as of mid-November. Its arrival on the
regular schedule would close the open item. Restoration dates for the French,
British, and Finnish shutdowns were never published in sources this research
could inspect. Their confirmation would complete the timeline. Any
independently confirmed compromise beyond the honeypot evidence and the
single-vendor campaign report would change the breach picture. None had
appeared as of early November. IBM's full methodology remains gated. An
inspectable questionnaire would let the 21 percent be read as more than a
reported share. Each of these is checkable, and each is dated at inspection.
A month from now, some will have moved.

*Companion notebook (scrollable, 10 pages): [When Systems Fail — the notebook](/notebook/when-systems-fail-notebook.html).*

## Sources and method

Every load-bearing claim above traces to a primary source reopened at a pinned
date in November 2026: the PHP advisory and release records, the PHP
Foundation's October 21 post, the Cloudflare and AWS engineering posts with
their dated update banners, the CISA catalog entries, the Vercel incident
bulletin, and IBM's public study materials. It also draws on the OWASP and NIST
guidance pages, and on contemporaneous reporting from BleepingComputer, Kaspersky,
and national outlets for the shutdown timeline. Figures travel with their bounds.
Cloudflare's counts are Cloudflare-sourced. IBM's shares carry their
denominator, sponsorship, and gating. The Dream campaign is a vendor report with
vendor-claimed independent verification. The honeypot confirmation carries its
single-worker bound. No Orange Tomato article is cited as a source.
Claim-level provenance lives in the run's evidence ledger. This draft's
evidence review was performed as a distinct second pass by the drafting agent
and is not independent.
