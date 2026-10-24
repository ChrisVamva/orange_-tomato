# Orange Tomato website

This is the production React, TypeScript, and Vite site for [orange-tomato.com](https://orange-tomato.com/). The editorial source of truth, evidence, article approvals, and release packets live in the Orange Tomato vault.

## Agent instructions

Read [`AGENTS.md`](./AGENTS.md) before changing this repository. Follow the vault's `Orange Tomato/Processes step by step/Editorial Workflow.md` and `Preview Workspace and Release Protocol.md` for article handoffs and releases.

## Development

- `npm ci` — restore the locked dependencies.
- `npm run dev` — start the local development server.
- `npm run build` — type-check and build the site.
- `npm run lint` — run ESLint.
- `npm run preview` — serve the built site locally.

A successful build or lint is not a rendered-page, accessibility, editorial, or deployment check.

## Production deployment

GitHub Actions deploys automatically when a commit is pushed to `main`. A push to `main` publishes to the live site. Do not push an article without Gate 3 approval and Chris's explicit authorization for that exact release and target. After a push, record the commit and deployment result, then verify the public page.
