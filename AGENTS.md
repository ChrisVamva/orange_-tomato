# Orange Tomato Preview agent instructions

This checkout is an isolated local preview/worktree, not the production checkout. The production repository is `C:\Users\user\orange_-tomato`; the editorial source of truth is the sibling `Orange Tomato` vault. Before editing, read this README and `../Orange Tomato/AGENTS.md`, then `../Orange Tomato/Processes step by step/Editorial Workflow.md`, `../Orange Tomato/Processes step by step/Preview Workspace and Release Protocol.md`, and the article's approved brief, evidence review, final article, and release packet.

- Work only from the exact article version that passed Gate 2. Treat all site content as preview/unreleased until Gate 3 and explicit publication authorization.
- Preserve meaning, claims, attribution, links, disclosures, and method notes. Send material editorial changes back through the article gate.
- Keep private research notes, unpublished drafts, internal review, personal data, credentials, and local filesystem paths out of public content.
- Inspect the existing app and repository state before editing. Do not assume scripts, templates, routes, or data models are current; confirm them in source.
- Maintain accessible semantics, keyboard use, mobile layout, readable contrast, alt text, and working links. Check asset permissions.
- Report exactly what build, lint, rendered-page, and accessibility checks were performed. Do not claim checks that were not performed.
- The production GitHub Actions workflow deploys on every push to `main`; a push to `origin/main` is publication. Do not push from this preview worktree. An authorized agent may push only from the production checkout, after Chris explicitly authorizes the exact article/package and target. A PR is optional.
- Gate 3 may approve with named exceptions. Record each open check, reason, risk, mitigation, owner, due date, and Chris's acceptance. Never report an incomplete check as passed.
- Preserve unrelated changes and the exact approved article version. Record source-to-site path and any formatting-only transformation in the release packet.

When instructions conflict, the direct user instruction and approved editorial decision control; otherwise stop before a consequential scope or release decision and report the issue.

