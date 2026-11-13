import { FRONTLINE_SINGLES, getArticle, getTags, tagSlug } from '../content/articles';

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  indexable: boolean;
  imageUrl?: string;
}

const SITE_ORIGIN = 'https://orange-tomato.com';
const BRAND_IMAGE = '/Logo/retro-sci-fi-tomato-thinkers-og.webp';
const POSTS_DESCRIPTION =
  "Orange Tomato publishes finished, evidence-grounded deep-dives about AI and agent systems. Every number traceable. What can't be verified, said so.";
const DEEP_DIVES_DESCRIPTION = 'Deep Dives are the long pieces: connected stories, expanded research, and a companion notebook.';
const ABOUT_DESCRIPTION = 'Hi, I’m Chris — science-fantasy author, journalist by background, and explorer of emerging technology.';
const ABOUT_IMAGE = '/ABOUT/Thoughtful-Orange-Tomato-Tech-Portrait-V2.webp';

function absoluteUrl(path: string): string {
  return new URL(path, SITE_ORIGIN).href;
}

function canonicalPath(pathname: string): string {
  const path = pathname.replace(/\/+$/, '');
  return `${path || ''}/`;
}

function metadata(
  pathname: string,
  title: string,
  description: string,
  indexable = true,
  imagePath = BRAND_IMAGE,
): SeoMetadata {
  return {
    title,
    description,
    canonicalUrl: absoluteUrl(canonicalPath(pathname)),
    indexable,
    imageUrl: absoluteUrl(imagePath),
  };
}

function decodeSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export function resolveSeoMetadata(pathname: string): SeoMetadata {
  const parsedUrl = new URL(pathname, SITE_ORIGIN);
  const path = parsedUrl.pathname.replace(/\/+$/, '') || '/';

  if (path === '/') {
    return metadata(path, 'Orange Tomato — A Magazine of Deep-Dives', POSTS_DESCRIPTION);
  }
  if (path === '/articles' || path.startsWith('/articles/')) {
    const slug = path.startsWith('/articles/') ? decodeSegment(path.slice('/articles/'.length)) : '';
    const entry = getArticle(slug);
    if (entry) {
      return metadata(
        path,
        entry.meta.seoTitle ?? entry.meta.title,
        entry.meta.seoDescription ?? entry.meta.excerpt,
        true,
        FRONTLINE_SINGLES[slug] ?? BRAND_IMAGE,
      );
    }
    return metadata(path, 'Article not found | Orange Tomato', 'The article you are looking for does not exist or has moved.', false);
  }
  if (path === '/deep-dives') {
    return metadata(path, 'Deep Dives | Orange Tomato', DEEP_DIVES_DESCRIPTION);
  }
  if (path === '/archive') {
    return metadata(path, 'Archive | Orange Tomato', 'Browse every Orange Tomato article in chronological order.');
  }
  if (path === '/search') {
    return metadata(path, 'Search | Orange Tomato', 'Search published Orange Tomato articles about AI and agent systems.', false);
  }
  if (path === '/tags') {
    return metadata(path, 'Tags | Orange Tomato', 'Browse topics covered by Orange Tomato’s evidence-grounded articles.');
  }
  if (path.startsWith('/tags/')) {
    const tagPath = decodeSegment(path.slice('/tags/'.length));
    const tagEntry = getTags().find(({ tag }) => tagSlug(tag) === tagPath);
    const tag = tagEntry?.tag ?? tagPath;
    const count = tagEntry?.count ?? 0;
    return metadata(
      path,
      `${tag} | Orange Tomato`,
      count ? `Read Orange Tomato articles tagged ${tag}.` : `No published Orange Tomato articles currently use the “${tag}” tag.`,
      count >= 2,
    );
  }
  if (path === '/about') {
    return metadata(path, 'About | Orange Tomato', ABOUT_DESCRIPTION, true, ABOUT_IMAGE);
  }

  return metadata(
    path,
    'Page not found | Orange Tomato',
    'The page you are looking for does not exist or has moved.',
    false,
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function serializeSeoMetadata(metadata: SeoMetadata): string {
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const canonicalUrl = escapeHtml(metadata.canonicalUrl);
  const imageTags = metadata.imageUrl
    ? `\n    <meta property="og:image" content="${escapeHtml(metadata.imageUrl)}" />\n    <meta name="twitter:image" content="${escapeHtml(metadata.imageUrl)}" />`
    : '';

  return `    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta name="robots" content="${metadata.indexable ? 'index,follow' : 'noindex,follow'}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />${imageTags}
    <meta name="twitter:card" content="${metadata.imageUrl ? 'summary_large_image' : 'summary'}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />`;
}
