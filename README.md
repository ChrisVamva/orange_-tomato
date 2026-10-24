# Orange Tomato Preview

A local React + TypeScript + Vite preview/worktree for Orange Tomato reader-facing pages. It is not the production checkout. Production lives at `C:\Users\user\orange_-tomato`; its GitHub Actions workflow deploys automatically on pushes to `main`. The editorial source of truth, briefs, evidence, and approvals live in the sibling `Orange Tomato` vault.

## Current implementation

The preview renders the approved Agent Delegation article at `/` and the Hermes approval article at `/articles/hermes-approval-attention`, using `react-markdown`. Content lives in `src/content/`. `src/App.tsx` owns routing and theme state; `src/views/Article.tsx` renders each article and updates page metadata; shared header/footer live in `src/components/`; `src/index.css` contains global styling.

This is a preview workspace. A file appearing in `src/content` does not mean it passed editorial review or is released. Inspect the current branch and worktree before using this checkout; do not push this preview branch to production.

## Before editing

Read [`AGENTS.md`](./AGENTS.md) and the sibling [`Preview Workspace and Release Protocol`](../Orange%20Tomato/Processes%20step%20by%20step/Preview%20Workspace%20and%20Release%20Protocol.md). Identify the approved article and exact source version in its `Orange Tomato/Article Runs/<slug>/` folder. Keep research records and internal review material in the vault, never in the public content tree.

Inspect the current app and git state before making changes. The legacy `_drafts/research-post-template.md` is for an unrelated market-research project; do not use it for Orange Tomato articles.

## Local commands

Install dependencies with `npm ci` when dependencies need restoration. Use `npm run dev` for a local preview. The configured checks are `npm run build` and `npm run lint`. Report which commands were run and their actual results. A build does not replace a rendered-page review or editorial approval.

## Content handoff

For an article that passed Gate 2:

1. Copy only the exact approved reader-facing article into the appropriate content file.
2. Preserve claims, attribution, links, disclosures, and method note. Keep editorial review artifacts in the vault.
3. Record source file, destination file, and formatting-only changes in the article's release packet.
4. Inspect the rendered page, including narrow layout, links, keyboard use, and image alternatives where applicable.
5. Submit the exact preview and checks for Gate 3. Chris may accept named exceptions; list them in the release packet with reason, risk, mitigation, owner, and due date.

No build, local preview, or Gate 2 approval authorizes publication. Gate 3 is separate from explicit publication authorization. A push to production `main` triggers deployment, so publish only after Chris explicitly authorizes the exact article/package and target.

## Current limitations

- The root route is the Agent Delegation article; the Hermes article has its own path. Inspect routes before adding pages.
- The content parser and markdown rendering behavior are implementation details; verify headings, links, and any new markdown features in the actual preview.
- This preview can differ from the live site. Verify the production checkout and live URL using the release protocol; do not infer live behavior from this worktree.
