// Generates static HTML fallbacks for every client-side route so GitHub Pages
// returns HTTP 200 on direct loads of SPA routes. Article slugs and tags are
// read from src/content/manifest.json — the single addition point for new
// articles — so no other changes are required here when a new article ships.
import { mkdirSync, copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
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

// Retired routes (Deep Dive absorption): a slug that left the site gets a stub
// that redirects old links and search results to its replacement. Entries live
// in the manifest under "retired": [{ "slug": "...", "redirectTo": "/..." }].
// A retired slug must NOT still be in manifest.articles — that is a mistake.
const retired = Array.isArray(manifest.retired) ? manifest.retired : [];

for (const entry of retired) {
  if (!entry.slug || !entry.redirectTo) {
    console.error(`retired entry needs "slug" and "redirectTo": ${JSON.stringify(entry)}`);
    process.exit(1);
  }
  if (articleSlugs.includes(entry.slug)) {
    console.error(
      `retired slug "${entry.slug}" is still in manifest.articles — remove it there before retiring`,
    );
    process.exit(1);
  }
  const dir = join(dist, 'articles', entry.slug);
  mkdirSync(dir, { recursive: true });
  const target = entry.redirectTo;
  const stub = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This story has moved | Orange Tomato</title>
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${target}" />
  </head>
  <body>
    <p>This story has moved into a Deep Dive. <a href="${target}">Continue there</a>.</p>
  </body>
</html>
`;
  writeFileSync(join(dir, 'index.html'), stub);
}

copyFileSync(index, join(dist, '404.html'));
console.log(
  `Generated ${routes.length + 1} static route fallbacks` +
    (retired.length ? ` and ${retired.length} retired-route stubs` : ''),
);
