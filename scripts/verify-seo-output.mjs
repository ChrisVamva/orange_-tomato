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
    title: 'Orange Tomato — A Magazine of Deep-Dives',
    description: "Orange Tomato publishes finished, evidence-grounded deep-dives about AI and agent systems. Every number traceable. What can't be verified, said so.",
    robots: 'index,follow', content: '<h1 class="sr-only">Posts</h1>',
  }],
  ['/articles/who-authorized-the-agent/', {
    title: article.title, description: article.excerpt, robots: 'index,follow', content: '<h1>Who Authorized the Agent?</h1>',
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
  title: specialArticle.title, description: specialArticle.excerpt, robots: 'index,follow', content: '<h1>The Test Changed. What Did the Score Mean?</h1>',
});

const retiredPath = '/articles/kimi-k31-pro-capability-removal/';
const retiredHtml = htmlAt(retiredPath);
assert.match(retiredHtml, /<meta name="robots" content="noindex,follow"/);
assert.match(retiredHtml, /<link rel="canonical" href="https:\/\/orange-tomato\.com\/articles\/october-2026-model-releases\/"/);
assert.match(retiredHtml, /<meta http-equiv="refresh" content="0; url=\/articles\/october-2026-model-releases"/);
assert.match(retiredHtml, /<a href="\/articles\/october-2026-model-releases">/);
assert.match(retiredHtml, /<meta property="og:title" content=/, 'retired route social tags');

console.log(`Verified ${routes.length} prerendered routes and one retired article route.`);

