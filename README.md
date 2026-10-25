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

## Adding a new article

Published articles are registered in exactly two places:

1. `src/content/<slug>.md` — the approved reader-facing article body (site copy).
2. `src/content/manifest.json` — one record with `slug`, `title`, `date` (ISO), `excerpt`, and `tags` (from the site's controlled vocabulary).

The Posts listing, Archive, Search index, Tags pages, article routes, and static route fallbacks are derived from the manifest at build time, so no other site code needs editing for a new article. Run `npm run build` and `npm run lint`, then verify the new article appears on Posts, Archive, Search, and its tag page(s), and that its direct route returns HTTP 200.

## Production deployment

GitHub Actions deploys automatically when a commit is pushed to `main`. A push to `main` publishes to the live site. Do not push an article without Gate 3 approval and Chris's explicit authorization for that exact release and target. After a push, record the commit and deployment result, then verify the public page.
