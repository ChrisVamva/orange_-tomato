import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';

const root = process.cwd();
const dist = join(root, 'dist');
const index = join(dist, 'index.html');
const siteOrigin = 'https://orange-tomato.com';

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
const topLevelRoutes = ['deep-dives', 'archive', 'search', 'tags', 'about'];
const tagLabels = [...new Set(manifest.articles.flatMap((article) => article.tags))];

function tagSlug(tag) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const routes = [
  '/',
  ...articleSlugs.map((slug) => `/articles/${slug}/`),
  ...topLevelRoutes.map((route) => `/${route}/`),
  ...tagLabels.map((tag) => `/tags/${tagSlug(tag)}/`),
];

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const vite = await createServer({
  configFile: './vite.config.ts',
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent',
});

let renderedCount = 0;
try {
  const [{ RouteTree }, { resolveSeoMetadata, serializeSeoMetadata }] = await Promise.all([
    vite.ssrLoadModule('/src/App.tsx'),
    vite.ssrLoadModule('/src/seo/metadata.ts'),
  ]);
  const template = readFileSync(index, 'utf8');

  function renderRoute(pathname) {
    const markup = renderToString(createElement(
      MemoryRouter,
      { initialEntries: [pathname] },
      createElement(RouteTree),
    ));
    const metadata = serializeSeoMetadata(resolveSeoMetadata(pathname));
    const html = template.replace(
      /<!-- SEO metadata start -->[\s\S]*?<!-- SEO metadata end -->/,
      () => metadata,
    ).replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`);
    if (html === template || html.includes('SEO metadata start') || !html.includes(`id="root">${markup}</div>`)) {
      throw new Error(`failed to render route HTML for ${pathname}`);
    }
    return html;
  }

  for (const route of routes) {
    const relativeDirectory = route === '/' ? '' : route.replace(/^\/+|\/+$/g, '');
    const directory = join(dist, relativeDirectory);
    mkdirSync(directory, { recursive: true });
    writeFileSync(join(directory, 'index.html'), renderRoute(route));
    renderedCount += 1;
  }

  // Retired routes (Deep Dive absorption) retain their noindex redirect and replacement link.
  const retired = Array.isArray(manifest.retired) ? manifest.retired : [];
  for (const entry of retired) {
    if (!entry.slug || !entry.redirectTo) {
      console.error(`retired entry needs "slug" and "redirectTo": ${JSON.stringify(entry)}`);
      process.exitCode = 1;
      continue;
    }
    if (articleSlugs.includes(entry.slug)) {
      console.error(`retired slug "${entry.slug}" is still in manifest.articles — remove it there before retiring`);
      process.exitCode = 1;
      continue;
    }
    const dir = join(dist, 'articles', entry.slug);
    mkdirSync(dir, { recursive: true });
    const target = entry.redirectTo;
    const absoluteTarget = new URL(`${target.replace(/\/+$/, '')}/`, siteOrigin).href;
    const safeTarget = escapeHtml(target);
    const linkLabel = target.startsWith('/deep-dives')
      ? 'Browse the Deep Dives'
      : 'Read the piece that replaces it';
    const description = 'This story is no longer published by Orange Tomato.';
    const metadata = serializeSeoMetadata({
      title: 'This story is no longer published | Orange Tomato',
      description,
      canonicalUrl: absoluteTarget,
      indexable: false,
      imageUrl: `${siteOrigin}/Logo/New%20Logo.png`,
    });
    const stub = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
${metadata}
    <meta http-equiv="refresh" content="0; url=${safeTarget}" />
  </head>
  <body>
    <p>This story has been retired from Orange Tomato. <a href="${safeTarget}">${linkLabel}</a>.</p>
  </body>
</html>
`;
    writeFileSync(join(dir, 'index.html'), stub);
  }

  // Removed sections: retain their static redirect stubs for old links.
  const removedSections = [
    {
      path: 'series',
      redirectTo: '/',
      note: 'The Series section has been removed from Orange Tomato.',
      linkLabel: 'Browse the latest posts',
    },
    {
      path: 'video-gallery',
      redirectTo: '/',
      note: 'The Video Gallery section has been removed from Orange Tomato.',
      linkLabel: 'Browse the latest posts',
    },
  ];
  let removedStubs = 0;
  for (const entry of removedSections) {
    if (topLevelRoutes.includes(entry.path)) continue;
    const dir = join(dist, entry.path);
    mkdirSync(dir, { recursive: true });
    const target = entry.redirectTo;
    const absoluteTarget = new URL(`${target.replace(/\/+$/, '')}/`, siteOrigin).href;
    const stub = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This section is no longer published | Orange Tomato</title>
    <meta name="robots" content="noindex,follow" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${absoluteTarget}" />
  </head>
  <body>
    <p>${entry.note} <a href="${target}">${entry.linkLabel}</a>.</p>
  </body>
</html>
`;
    writeFileSync(join(dir, 'index.html'), stub);
    removedStubs += 1;
  }

  // Sitemap: indexable routes only, mirroring the route metadata policy
  // (articles, sections, and tag pages with at least two published articles).
  const tagCounts = new Map();
  for (const tag of tagLabels) {
    tagCounts.set(tag, manifest.articles.filter((article) => article.tags.includes(tag)).length);
  }
  const sitemapUrls = [
    { loc: `${siteOrigin}/` },
    ...manifest.articles.map((article) => ({
      loc: `${siteOrigin}/articles/${article.slug}/`,
      lastmod: article.publishedAt ?? article.date,
    })),
    ...['deep-dives', 'archive', 'tags', 'about'].map((route) => ({ loc: `${siteOrigin}/${route}/` })),
    ...tagLabels
      .filter((tag) => (tagCounts.get(tag) ?? 0) >= 2)
      .map((tag) => ({ loc: `${siteOrigin}/tags/${tagSlug(tag)}/` })),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls
    .map(({ loc, lastmod }) =>
      `  <url>\n    <loc>${escapeHtml(loc)}</loc>${lastmod ? `\n    <lastmod>${escapeHtml(lastmod)}</lastmod>` : ''}\n  </url>`,
    )
    .join('\n')}\n</urlset>\n`;
  writeFileSync(join(dist, 'sitemap.xml'), sitemap);

  writeFileSync(join(dist, '404.html'), renderRoute('/not-a-route/'));
  console.log(
    `Prerendered ${renderedCount} route pages, ${retired.length} retired-route stubs, ` +
      `${removedStubs} removed-section stubs, and a noindex 404 page`,
  );
} finally {
  await vite.close();
}


