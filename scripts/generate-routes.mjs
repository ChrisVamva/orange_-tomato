// Generates static HTML fallbacks for every client-side route so GitHub Pages
// returns HTTP 200 on direct loads of SPA routes. Keep the route lists below in
// sync with src/App.tsx and src/content/articles.ts.
import { mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const index = join(dist, 'index.html');

if (!existsSync(index)) {
  console.error('dist/index.html not found — run vite build first');
  process.exit(1);
}

const articleSlugs = [
  'agent-delegation-boundaries',
  'hermes-approval-attention',
  'ai-system-breach-boundaries',
  'php2shell-vulnerability',
  'minimax-m31-flash-inspectability',
  'revamp-ai-cloning',
  'mercury-3-diffusion-speed',
];

const topLevelRoutes = ['archive', 'search', 'tags'];

const tagLabels = [
  'agents',
  'security',
  'evaluation',
  'generative AI',
  'cost',
  'privacy/control',
  'failures/reliability',
];

function tagSlug(tag) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const routes = [
  ...articleSlugs.map((slug) => `articles/${slug}`),
  ...topLevelRoutes,
  ...tagLabels.map((tag) => `tags/${tagSlug(tag)}`),
];

for (const route of routes) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(index, join(dir, 'index.html'));
}

copyFileSync(index, join(dist, '404.html'));
console.log(`Generated ${routes.length + 1} static route fallbacks`);
