import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const manifest = JSON.parse(readFileSync(join(process.cwd(), 'src', 'content', 'manifest.json'), 'utf8'));
const article = manifest.articles.find(({ slug }) => slug === 'who-authorized-the-agent');
const specialArticle = manifest.articles.find(({ slug }) => slug === 'what-did-the-score-mean');
assert.ok(article, 'the SEO fixture article must exist in the manifest');
assert.ok(specialArticle, 'the replacement-token fixture article must exist in the manifest');

function htmlAt(path) {
  if (path === '/not-a-route/') return readFileSync(join(dist, '404.html'), 'utf8');
  if (path === '/') return readFileSync(join(dist, 'index.html'), 'utf8');
  return readFileSync(join(dist, path.replace(/^\//, '').replace(/\/$/, ''), 'index.html'), 'utf8');
}

function assertRoute(path, { title, description, robots, content }) {
  const html = htmlAt(path);
  assert.match(html, new RegExp(`<title>${escapeRegExp(escapeHtml(title))}</title>`), `${path} title`);
  assert.match(html, new RegExp(`<meta name="description" content="${escapeRegExp(escapeHtml(description))}"`), `${path} description`);
  assert.match(html, new RegExp(`<link rel="canonical" href="https://orange-tomato\\.com${escapeRegExp(path)}"`), `${path} canonical`);
  assert.match(html, new RegExp(`<meta name="robots" content="${robots}"`), `${path} robots`);
  assert.match(html, /<meta property="og:title" content=/, `${path} Open Graph title`);
  assert.match(html, /<meta property="og:description" content=/, `${path} Open Graph description`);
  assert.match(html, /<meta property="og:url" content=/, `${path} Open Graph URL`);
  assert.match(html, /<meta name="twitter:title" content=/, `${path} Twitter title`);
  assert.match(html, /<meta name="twitter:description" content=/, `${path} Twitter description`);
  assert.ok(html.includes(content), `${path} should contain meaningful route content: ${content}`);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const routes = [
  ['/', {
    title: 'Orange Tomato — AI Agent Roadmap',
    description: "Orange Tomato publishes finished, evidence-grounded deep-dives about AI and agent systems. Every number traceable. What can't be verified, said so.",
    robots: 'index,follow', content: '<h1 class="sr-only">Home</h1>',
  }],
  ['/articles/who-authorized-the-agent/', {
    title: article.seoTitle ?? article.title, description: article.seoDescription ?? article.excerpt, robots: 'index,follow', content: '<h1>Who Authorized the Agent?</h1>',
  }],
  ['/deep-dives/', {
    title: 'Deep Dives | Orange Tomato',
    description: 'Deep Dives are the long pieces: connected stories, expanded research, and a companion notebook.',
    robots: 'index,follow', content: '>Deep Dives</h1>',
  }],
  ['/about/', {
    title: 'About | Orange Tomato',
    description: 'Hi, I’m Chris — science-fantasy author, journalist by background, and explorer of emerging technology.',
    robots: 'index,follow', content: '>About</h1>',
  }],
  ['/archive/', {
    title: 'Archive | Orange Tomato',
    description: 'Browse every Orange Tomato article in chronological order.',
    robots: 'index,follow', content: '>Archive</h1>',
  }],
  ['/tags/', {
    title: 'Tags | Orange Tomato',
    description: 'Browse topics covered by Orange Tomato’s evidence-grounded articles.',
    robots: 'index,follow', content: '>Tags</h1>',
  }],
  ['/search/', {
    title: 'Search | Orange Tomato',
    description: 'Search published Orange Tomato articles about AI and agent systems.',
    robots: 'noindex,follow', content: '>Search</h1>',
  }],
  ['/tags/failures-reliability/', {
    title: 'failures/reliability | Orange Tomato',
    description: 'Read Orange Tomato articles tagged failures/reliability.',
    robots: 'noindex,follow', content: '>failures/reliability</h1>',
  }],
  ['/not-a-route/', {
    title: 'Page not found | Orange Tomato',
    description: 'The page you are looking for does not exist or has moved.',
    robots: 'noindex,follow', content: '>Article not found</h2>',
  }],
];

for (const [path, expected] of routes) assertRoute(path, expected);
assertRoute('/articles/what-did-the-score-mean/', {
  title: specialArticle.seoTitle ?? specialArticle.title, description: specialArticle.seoDescription ?? specialArticle.excerpt, robots: 'index,follow', content: '<h1>The Test Changed. What Did the Score Mean?</h1>',
});

const retiredPath = '/articles/kimi-k31-pro-capability-removal/';
const retiredHtml = htmlAt(retiredPath);
assert.match(retiredHtml, /<meta name="robots" content="noindex,follow"/);
assert.match(retiredHtml, /<link rel="canonical" href="https:\/\/orange-tomato\.com\/articles\/october-2026-model-releases\/"/);
assert.match(retiredHtml, /<meta http-equiv="refresh" content="0; url=\/articles\/october-2026-model-releases"/);
assert.match(retiredHtml, /<a href="\/articles\/october-2026-model-releases">/);
assert.match(retiredHtml, /<meta property="og:title" content=/, 'retired route social tags');

console.log(`Verified ${routes.length} prerendered routes and one retired article route.`);

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.ok(locs.length > 0, 'sitemap must list at least one URL');
for (const loc of locs) {
  assert.ok(loc.startsWith('https://orange-tomato.com/'), `sitemap loc must use the HTTPS apex origin: ${loc}`);
}
const tagCounts = new Map();
for (const entry of manifest.articles) {
  for (const tag of entry.tags) tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
}
const slugify = (tag) => tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const expectedLocs = [
  'https://orange-tomato.com/',
  ...manifest.articles.map(({ slug }) => `https://orange-tomato.com/articles/${slug}/`),
  'https://orange-tomato.com/deep-dives/',
  'https://orange-tomato.com/archive/',
  'https://orange-tomato.com/tags/',
  'https://orange-tomato.com/about/',
  ...[...tagCounts.entries()]
    .filter(([, count]) => count >= 2)
    .map(([tag]) => `https://orange-tomato.com/tags/${slugify(tag)}/`),
];
assert.deepEqual([...locs].sort(), [...expectedLocs].sort(), 'sitemap must list exactly the intended indexable URLs');
for (const entry of manifest.articles) {
  assert.match(sitemap, new RegExp(`<loc>https://orange-tomato\\.com/articles/${escapeRegExp(entry.slug)}/</loc>\\s*<lastmod>${escapeRegExp(entry.publishedAt ?? entry.date)}</lastmod>`), `sitemap lastmod for ${entry.slug}`);
}
const excludedPaths = [
  '/search/',
  '/not-a-route/',
  '/series/',
  '/video-gallery/',
  ...[...tagCounts.entries()]
    .filter(([, count]) => count < 2)
    .map(([tag]) => `/tags/${slugify(tag)}/`),
  ...(Array.isArray(manifest.retired) ? manifest.retired.map(({ slug }) => `/articles/${slug}/`) : []),
];
for (const excluded of excludedPaths) {
  assert.ok(!locs.includes(`https://orange-tomato.com${excluded}`), `sitemap must exclude ${excluded}`);
}

const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
assert.match(robots, /^User-agent: \*$/m, 'robots User-agent');
assert.match(robots, /^Allow: \/$/m, 'robots Allow');
assert.match(robots, /^Sitemap: https:\/\/orange-tomato\.com\/sitemap\.xml$/m, 'robots Sitemap');

console.log(`Verified sitemap (${locs.length} URLs) and robots.txt.`);

