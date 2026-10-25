// Generates static HTML fallbacks for every client-side route so GitHub Pages
// returns HTTP 200 on direct loads of SPA routes. Article slugs and tags are
// read from src/content/manifest.json — the single addition point for new
// articles — so no other changes are required here when a new article ships.
import { mkdirSync, copyFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const index = join(dist, 'index.html');

if (!existsSync(index)) {
  console.error('dist/index.html not found — run vite build first');
  process.exit(1);
}

const manifestPath = join(root, 'src', 'content', 'manifest.json');
if (!existsSync(manifestPath)) {
  console.error(`manifest not found: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

const articleSlugs = manifest.articles.map((article) => article.slug);
const topLevelRoutes = ['archive', 'search', 'tags'];
const tagLabels = [...new Set(manifest.articles.flatMap((article) => article.tags))];

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
