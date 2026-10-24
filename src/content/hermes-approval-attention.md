# Who Decides When Hermes Interrupts You?

An approval prompt can look like a simple exchange: the agent pauses, you say yes or no, and work continues. But in Hermes, that prompt is only one possible stop in a longer decision path. A command may be flagged by a detector, assessed by an auxiliary model, and approved or denied before a person sees anything.

That difference matters. “The agent asked me” does not tell you who first judged the command, what settings were active, or whether the command reached a human at all.

This article follows the dangerous-command approval path in Hermes Agent v0.22.5’s CLI and TUI. It is a source audit, not a live walkthrough: no Hermes interface was available to inspect.

## The first decision happens before the prompt

Hermes does not ask a person about every terminal command. It first checks commands against dangerous patterns. If a command is not flagged—or an earlier approval already covers that pattern—it bypasses this particular prompt path. That does not prove the command is harmless. It means this detector did not route it to this gate.

Once a command is flagged, the configured approval mode decides what happens next. The official [Hermes configuration guide](https://hermes-agent.nousresearch.com/docs/user-guide/configuration#smart-approvals) describes three modes: smart, manual, and off. In v0.22.5, the source defaults to smart and a 300-second approval timeout when those settings are unset. A saved profile setting can change the mode; the CLI’s `/approvals` command can read or change that persistent setting. So “smart is the default” describes a fresh unset configuration, not necessarily the setting on a particular machine.

In manual mode, flagged commands go to a human approval prompt. The CLI’s [prompt implementation](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/tools/approval_prompt.py) provides choices such as once, session, always, and deny. Session and always choices can remember approval for a pattern; they reach further than approving one command. The [CLI symbol guide](https://hermes-agent.nousresearch.com/docs/reference/cli-symbols#approval-and-confirmation-prompts) describes the approval panel as showing a command preview. The code and tests establish those controls, but we did not observe the panel on a live screen.

## Smart mode moves some decisions out of view

In smart mode, a command that the detector flags is sent to an auxiliary language model for another assessment. The [v0.22.5 implementation](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/tools/approval_smart.py) strips unquoted shell comments, marks the command text as untrusted input, and asks for one of three verdicts: approve, deny, or escalate.

An approval allows that command only. It does not automatically approve every later command with the same pattern. An escalation follows the human approval path. A denial blocks the command when no interactive owner is present. In an interactive CLI/TUI, the owner can still override that denial, but the prompt is restricted to once or deny; the owner cannot turn that override into a session-wide or permanent pattern approval.

The auxiliary model therefore does not simply decide whether “the agent is safe.” It evaluates a particular flagged command under a particular configuration. Its answer shapes whether a person is interrupted and what choices that person receives.

The implementation also routes uncertainty and failures toward a human decision. If the auxiliary response is empty, unrecognized, or errors, the code escalates rather than treating the command as approved. If a human approval prompt times out, the action is blocked. In v0.22.5, the default human approval window is five minutes when no other timeout is configured. That is a fail-closed path for the CLI/TUI code we reviewed; it is not evidence that every surface displays or delivers a prompt reliably.

## The label “approval” hides different judgments

A prompt after manual mode means a flagged command reached the person directly. A prompt after smart mode may mean the auxiliary model was uncertain or failed, or that it denied the command and the person is being offered a one-time override. Those situations may look similar to the user even though the preceding decision differs.

This is not just theoretical. A user report about older Hermes versions described the smart reviewer failing in a Desktop/serve context and routing flagged commands to a human prompt. The linked [upstream issue](https://github.com/NousResearch/hermes-agent/issues/131375) names v0.21.5 builds. Its proposed fix, [PR #131377](https://github.com/NousResearch/hermes-agent/pull/131377), was still open when checked on October 24, two days after v0.22.5 was released. I could not inspect the tagged relay source, so this audit cannot confirm whether v0.22.5 includes an equivalent fix. The report is a reason for caution, not proof of how every v0.22.5 CLI/TUI session behaves. Another [open issue](https://github.com/NousResearch/hermes-agent/issues/132291) reports that a guardian failure could lead to a long wait on surfaces where the person could not see the resulting prompt. That report highlights why interface matters, but it does not establish a CLI/TUI failure in the pinned release.

Hermes has also changed this path over time. A stalled auxiliary call was reported against v0.19.0, and a [maintainer-merged change](https://github.com/NousResearch/hermes-agent/pull/93809) added an explicit timeout and failure logging. The v0.22.5 source now passes a configured timeout to the reviewer call. That history is a reason to pin versions when discussing behavior; it is not a safety evaluation of the model’s verdicts.

## What this audit can—and cannot—say

The source and tests support a concrete account of routing: a detector flags a command; the configured mode either sends it directly to a person, asks an auxiliary model first, or skips this approval gate; and some paths then expose different human choices. Tests verify expected branches and prompt controls. We read those tests but did not run them.

They do not measure whether the detector misses dangerous commands, whether the auxiliary model’s approvals are correct, how often users are interrupted, or whether people understand what they are approving. Nor did we capture the live interface. The product documentation describes smart mode as a way to reduce approval fatigue, but the material reviewed here does not establish that it does so in practice.

For a user trying to understand an approval request, the useful questions are more specific than “Why did the agent stop?” Which mode is active? Was the command judged by a detector, an auxiliary model, or both? Is this prompt a direct request, an uncertainty escalation, or an override after denial? And does the choice apply once or persist?

In Hermes v0.22.5, an approval prompt is not the whole control system. It is one visible point in a chain where the detector, configuration, auxiliary reviewer, and person each make—or inherit—a different decision.

## Sources and method

This article examines Hermes Agent v0.22.5, pinned to commit [`bf0203a794a07aac3ff764972ab9087baa4e4f4e`](https://github.com/NousResearch/hermes-agent/commit/bf0203a794a07aac3ff764972ab9087baa4e4f4e), released October 22, 2026. I reviewed the official approval implementation, smart-reviewer code, CLI prompt, configuration defaults, approval-mode command, and relevant tests. Tests were read but not run. I also reviewed relevant upstream issue reports and pull requests, distinguishing reports about earlier versions or other surfaces from what the pinned source establishes.

No Hermes app or CLI was run, no approval prompt was observed, and no safety or usability outcomes were measured. Inline links point to official Hermes documentation, tagged source, tests, or issue records. The issue reports are attributed user reports, not independent evaluations.

