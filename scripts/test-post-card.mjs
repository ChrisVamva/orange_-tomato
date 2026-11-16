import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';

const vite = await createServer({
  configFile: './vite.config.ts',
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent',
});
const articles = await vite.ssrLoadModule('/src/content/articles.ts');
const dimensions = await vite.ssrLoadModule('/src/content/imageDimensions.ts');
let cardModule = {};
let cardLoadError;
try {
  cardModule = await vite.ssrLoadModule('/src/components/PostCard.tsx');
} catch (error) {
  cardLoadError = error;
}
const { PostCard } = cardModule;

after(async () => {
  await vite.close();
});

const expected = {
  'recursive-flint-laptop-coding-model': {
    src: '/images/artwork/recursive-flint-laptop-coding-model-cover.webp',
    alt: 'A researcher and tomato-headed robot collaborate at a laptop beneath a chalkboard showing a Flint workflow.',
  },
  'deepseek-deepinfer-open-source': {
    src: '/images/artwork/deepseek-deepinfer-open-source-cover.webp',
    alt: 'A tomato-headed robot presents a DeepInfer crate beside a ‘What’s Still Missing?’ board and a ‘Not Included’ stamp.',
  },
  'openai-aurora-image-models': {
    src: '/images/artwork/openai-aurora-image-models-cover.webp',
    alt: 'A researcher and tomato-headed robot compare three image samples beneath a large question mark.',
  },
};
const expectedDims = Object.fromEntries(
  Object.keys(expected).map((slug) => [slug, { width: 688, height: 459 }]),
);

function render(entry, index, isDarkMode = false) {
  assert.equal(
    typeof PostCard,
    'function',
    cardLoadError ? `PostCard module is unavailable: ${cardLoadError.message}` : 'PostCard is not implemented',
  );
  return renderToStaticMarkup(
    createElement(MemoryRouter, null, createElement(PostCard, { entry, index, isDarkMode })),
  );
}

test('mapped cards render their own approved cover, alt text, and dimensions', () => {
  assert.deepEqual(articles.POST_COVERS, Object.fromEntries(Object.entries(expected).map(([slug, value]) => [slug, value.src])));
  assert.deepEqual(articles.POST_COVER_ALT, Object.fromEntries(Object.entries(expected).map(([slug, value]) => [slug, value.alt])));
  assert.deepEqual(dimensions.POST_COVER_DIMS, expectedDims);

  for (const [slug, cover] of Object.entries(expected)) {
    const entry = articles.ARTICLES.find((item) => item.meta.slug === slug);
    assert.ok(entry, `article entry exists for ${slug}`);
    const html = render(entry, 1);
    const image = html.match(/<img\b[^>]*>/)?.[0];
    assert.ok(image, `mapped image renders for ${slug}`);
    assert.ok(image.includes(`src="${cover.src}"`), `correct source renders for ${slug}`);
    assert.ok(image.includes(`alt="${cover.alt}"`), `approved alt text renders for ${slug}`);
    assert.ok(image.includes('width="688"') && image.includes('height="459"'), `intrinsic dimensions render for ${slug}`);
    assert.match(image, /aspect-\[16\/10\].*object-cover|object-cover.*aspect-\[16\/10\]/);
  }
});

test('only the first card gets high fetch priority and cards at index three are lazy', () => {
  const entry = articles.ARTICLES.find((item) => item.meta.slug === 'recursive-flint-laptop-coding-model');
  assert.ok(entry);
  const firstImage = render(entry, 0).match(/<img\b[^>]*>/)?.[0] ?? '';
  assert.match(firstImage, /fetchPriority="high"|fetchpriority="high"/);
  const laterImage = render(entry, 3).match(/<img\b[^>]*>/)?.[0] ?? '';
  assert.match(laterImage, /loading="lazy"/);
  assert.doesNotMatch(laterImage, /fetchPriority="high"|fetchpriority="high"/);
});

test('card surface and text styles follow the user-controlled theme state', () => {
  const entry = articles.ARTICLES.find((item) => item.meta.slug === 'recursive-flint-laptop-coding-model');
  assert.ok(entry);
  const light = render(entry, 1, false);
  const dark = render(entry, 1, true);
  const articleClasses = (html) => html.match(/<article class=\"([^\"]+)\"/)?.[1].split(' ') ?? [];
  const lightClasses = articleClasses(light);
  const darkClasses = articleClasses(dark);
  assert.ok(lightClasses.includes('bg-white') && lightClasses.includes('border-black'));
  assert.ok(darkClasses.includes('bg-black') && darkClasses.includes('border-orange-500'));
  const titleClasses = dark.match(/<h2[^>]*>\s*<a[^>]*class=\"([^\"]+)\"/)?.[1].split(' ') ?? [];
  assert.ok(titleClasses.includes('text-white'));
});

test('an unmapped future post stays text-only and preserves its card information', () => {
  const entry = {
    meta: {
      slug: 'future-unmapped-post',
      title: 'A Future Post | Orange Tomato',
      date: '2026-11-01',
      excerpt: 'A useful future-post excerpt.',
      tags: ['Research', 'Model safety'],
    },
    content: 'Example article content.',
    readTimeMinutes: 7,
  };
  const html = render(entry, 4, true);
  assert.doesNotMatch(html, /<img\b/);
  assert.match(html, /A Future Post/);
  assert.doesNotMatch(html, /A Future Post \| Orange Tomato/);
  assert.match(html, /A useful future-post excerpt\./);
  assert.match(html, /Research/);
  assert.match(html, /Model safety/);
  assert.match(html, /November 1, 2026/);
  assert.match(html, /7 min read/);
  assert.match(html, /Read story/);
  assert.match(html, /href="\/articles\/future-unmapped-post"/);
  assert.match(html, /href="\/tags\/research"/);
  assert.match(html, /href="\/tags\/model-safety"/);
});
