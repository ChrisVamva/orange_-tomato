import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createServer } from 'vite';

const vite = await createServer({
  configFile: './vite.config.ts',
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent',
});
const metadataModule = await vite.ssrLoadModule('/src/seo/metadata.ts').catch((error) => {
  if (error.code === 'ERR_LOAD_URL') return undefined;
  throw error;
});
const { getTags, tagSlug } = await vite.ssrLoadModule('/src/content/articles.ts');

after(async () => {
  await vite.close();
});

function getResolver() {
  assert.equal(typeof metadataModule?.resolveSeoMetadata, 'function', 'resolveSeoMetadata is not implemented');
  return metadataModule.resolveSeoMetadata;
}

test('articleMetadataUsesManifest', () => {
  const metadata = getResolver()('/articles/who-authorized-the-agent');

  assert.equal(metadata.title, 'Who Authorized the Agent? | Orange Tomato');
  assert.equal(
    metadata.description,
    'What you delegate is a set of boundaries, checked at named moments. What you keep is the outcome, the liability, and the bill.',
  );
  assert.equal(metadata.canonicalUrl, 'https://orange-tomato.com/articles/who-authorized-the-agent/');
  assert.equal(metadata.indexable, true);
  assert.equal(
    metadata.imageUrl,
    'https://orange-tomato.com/images/every%20surface%20answers%20three%20questions%20in%20writing.jpg',
  );
});

test('canonicalsUseHttpsApexAndIgnoreQueryAndHash', () => {
  const metadata = getResolver()('/about?utm_source=newsletter#team');

  assert.equal(metadata.canonicalUrl, 'https://orange-tomato.com/about/');
  assert.equal(metadata.canonicalUrl.startsWith('https://'), true);
  assert.equal(metadata.canonicalUrl.includes('?'), false);
  assert.equal(metadata.canonicalUrl.includes('#'), false);
});

test('searchAndUnknownRoutesAreNoindex', () => {
  assert.equal(getResolver()('/search').indexable, false);
  assert.equal(getResolver()('/search').description.length > 0, true);
  assert.equal(getResolver()('/not-a-route').indexable, false);
  assert.equal(getResolver()('/not-a-route').canonicalUrl, 'https://orange-tomato.com/not-a-route/');
  assert.equal(getResolver()('/articles/missing').title, 'Article not found | Orange Tomato');
  assert.equal(getResolver()('/articles/missing').indexable, false);
});

test('tagIndexabilityUsesTwoArticleThreshold', () => {
  const tags = getTags();
  const singleArticleTag = tags.find(({ count }) => count === 1);
  const multiArticleTag = tags.find(({ count }) => count >= 2);

  assert.ok(singleArticleTag);
  assert.ok(multiArticleTag);
  assert.equal(getResolver()(`/tags/${tagSlug(singleArticleTag.tag)}`).indexable, false);
  assert.equal(getResolver()(`/tags/${tagSlug(multiArticleTag.tag)}`).indexable, true);
});

test('metadataAttributesAreEscaped', () => {
  assert.equal(typeof metadataModule?.serializeSeoMetadata, 'function', 'serializeSeoMetadata is not implemented');
  const html = metadataModule.serializeSeoMetadata({
    title: 'A "quoted" & <story>',
    description: `Fish & Chips "special" <today>—it's ready`,
    canonicalUrl: 'https://orange-tomato.com/story/?a=1&b="two"',
    indexable: true,
    imageUrl: 'https://orange-tomato.com/image.jpg?caption="bright"&crop=1',
  });

  assert.match(html, /<title>A &quot;quoted&quot; &amp; &lt;story&gt;<\/title>/);
  assert.match(html, /content="Fish &amp; Chips &quot;special&quot; &lt;today&gt;—it&#39;s ready"/);
  assert.match(html, /href="https:\/\/orange-tomato\.com\/story\/\?a=1&amp;b=&quot;two&quot;"/);
  assert.match(html, /content="https:\/\/orange-tomato\.com\/image\.jpg\?caption=&quot;bright&quot;&amp;crop=1"/);
});
