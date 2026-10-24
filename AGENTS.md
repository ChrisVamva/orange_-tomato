# Orange Tomato production repository instructions

This checkout contains the public site for Orange Tomato. The editorial source of truth is the sibling vault at `C:\Users\user\Documents\Obsidian Vaults\Command Center\Orange Tomato`.

## Before any change

1. Read `Orange Tomato/AGENTS.md`, `Orange Tomato/Processes step by step/Editorial Workflow.md`, and `Orange Tomato/Processes step by step/Preview Workspace and Release Protocol.md` in the vault.
2. Read this repository's README and inspect `git status`, current branch, remotes, routes, content model, build/lint scripts, and `.github/workflows/` before editing.
3. Find the article's `Article Runs/<slug>/07-final-article.md` and `08-release-packet.md`. Confirm Gate 2 approval and copy only the exact approved reader-facing version. The vault is canonical; `src/content/` is the site copy.
4. Keep research records, briefs, internal review, private data, credentials, and local paths out of public files.
5. Preserve the user's existing changes, including untracked files. Do not reset, clean, or overwrite unrelated work.

## Review and release

- Treat all local changes as unreleased until Gate 3. Build and lint results do not establish factual accuracy, accessibility, or successful deployment.
- Report the exact source and destination, content diff, build/lint result, rendered/keyboard/mobile checks, and open items in the article's release packet.
- Gate 3 may approve with named exceptions. Each exception records the open check, reason, risk, mitigation, owner, due date, and Chris's explicit acceptance. Never describe an incomplete check as passed. Unsupported claims, privacy issues, rights problems, or a mismatch with the approved copy are blockers, not exceptions.
- A separate Gate 3 approval is not publication authorization. Chris must explicitly authorize the exact article/package, repository/branch, and public target. Authorization may be given in the same message if both decisions are explicit.
- The GitHub Actions workflow deploys automatically on every push to `main`. A push to `origin/main` is publication. An agent may push the authorized package directly to `main` only after Chris's explicit authorization. A pull request is optional, not required by this process.
- Before pushing, confirm the working tree contains only the approved release, the intended branch is `main`, and the remote is the expected production remote. Never include unrelated changes.
- After pushing, record the commit and deployment result, then verify the live URL. Do not claim a live page is verified based only on a successful local build or push. If BrowserOS Neo is unavailable, record that check as not performed and report the limitation; do not switch to another browser silently.

## Scope changes and failure

If the approved article's meaning, claims, certainty, attribution, or scope changes, return to the relevant editorial gate. If build, deployment, or live-page verification fails, record the concrete issue and stop further release actions until Chris decides how to proceed.
