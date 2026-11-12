import flintContent from './recursive-flint-laptop-coding-model.md?raw';
import octoberContent from './october-2026-model-releases.md?raw';
import auroraContent from './openai-aurora-image-models.md?raw';
import deepseekContent from './deepseek-deepinfer-open-source.md?raw';
import whoAuthorizedContent from './who-authorized-the-agent.md?raw';
import scoreMeanContent from './what-did-the-score-mean.md?raw';
import agentRemembersContent from './what-the-agent-remembers.md?raw';
import systemsFailContent from './when-systems-fail.md?raw';
import manifest from './manifest.json';

export interface ArticleMeta {
  slug: string;
  /** Page title, including the site suffix. */
  title: string;
  /** Search engine optimized title (<= 60 chars including suffix). Falls back to title if omitted. */
  seoTitle?: string;
  /** Publication date, ISO format (yyyy-mm-dd). */
  date: string;
  /** Exact publication timestamp (ISO 8601 UTC), used for chronological ordering. */
  publishedAt?: string;
  /** Reader-facing one-sentence summary, also used as the meta description. */
  excerpt: string;
  /** Search engine optimized description (130-155 chars). Falls back to excerpt if omitted. */
  seoDescription?: string;
  /** Tags from the site's controlled vocabulary. */
  tags: string[];
  /**
   * Content kind. Absent or "article" = a post in the primary Posts stream;
   * "deep-dive" = a Deep Dive: the long piece in the DEEP DIVES stream that
   * absorbs connected articles (see the vault's Deep Dive Process).
   */
  kind?: 'article' | 'deep-dive';
}

export interface ArticleEntry {
  meta: ArticleMeta;
  /** Raw Markdown body imported at build time. */
  content: string;
  /** Estimated reading time in minutes (computed from word count). */
  readTimeMinutes: number;
}

const WORDS_PER_MINUTE = 200;

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * Markdown bodies keyed by article slug. The manifest (manifest.json) is the
 * single addition point for a new article; content files live alongside it.
 */
const contentBySlug: Record<string, string> = {
  'recursive-flint-laptop-coding-model': flintContent,
  'october-2026-model-releases': octoberContent,
  'openai-aurora-image-models': auroraContent,
  'deepseek-deepinfer-open-source': deepseekContent,
  'who-authorized-the-agent': whoAuthorizedContent,
  'what-did-the-score-mean': scoreMeanContent,
  'what-the-agent-remembers': agentRemembersContent,
  'when-systems-fail': systemsFailContent,
};

const entries = (manifest.articles as ArticleMeta[]).map((meta) => ({
  meta,
  content: contentBySlug[meta.slug] ?? '',
}));

export const ARTICLES: ArticleEntry[] = entries
  .map((entry) => ({
    ...entry,
    readTimeMinutes: estimateReadTime(entry.content),
  }))
  // Newest first by exact publication timestamp; ties broken by title for a stable order.
  .sort((a, b) => {
    const at = Date.parse(a.meta.publishedAt ?? `${a.meta.date}T00:00:00Z`);
    const bt = Date.parse(b.meta.publishedAt ?? `${b.meta.date}T00:00:00Z`);
    if (at !== bt) return bt - at;
    return a.meta.title.localeCompare(b.meta.title);
  });

export function getArticle(slug: string | undefined): ArticleEntry | undefined {
  return ARTICLES.find((entry) => entry.meta.slug === slug);
}

/** Deep Dives (`kind: "deep-dive"`), newest first — the DEEP DIVES stream. */
export const DEEP_DIVES: ArticleEntry[] = ARTICLES.filter((entry) => entry.meta.kind === 'deep-dive');

/**
 * Card images for the Deep Dives section (kept under their original
 * "Frontline Singles" name): the dominant single image per Deep Dive. Files
 * live in `public/images/`; paths are URL-encoded. The mapping is verified
 * against the approved deliveries — never guess it from titles.
 */
export const FRONTLINE_SINGLES: Record<string, string> = {
  'when-systems-fail': '/images/The%20House%20Above%20the%20Pipes.png',
  'what-the-agent-remembers': '/images/The%20Kept%20Shelf.png',
  'what-did-the-score-mean': '/images/office.jpg',
  'who-authorized-the-agent': '/images/every%20surface%20answers%20three%20questions%20in%20writing.jpg',
  'october-2026-model-releases': '/images/the%20market%20depth.jpg',
};

/** Alt text for the Frontline Singles, written from their prompt scenes. */
export const FRONTLINE_ALT: Record<string, string> = {
  'when-systems-fail':
    'A tomato-headed robot and a robed woman at the door of an engine house beneath a dawn harbour town, pipes rising into every house, one tagged valve wheel, sandbags at a pipe joint.',
  'what-the-agent-remembers':
    'A tomato-headed robot holds an empty wooden tray at a testing bench while a robed woman touches a twine-tied seed packet on a granary wall.',
  'what-did-the-score-mean':
    'A tomato-headed robot holds a sounding line over an open chart while a robed woman studies tide tables in a harbor survey office.',
  'who-authorized-the-agent':
    'A robed woman hands a sealed letter to a tomato-headed robot before two stone gates at dusk.',
  'october-2026-model-releases':
    'A tomato-headed robot and a robed woman stand at a receipts desk before a market row at dawn.',
};

/**
 * Posts: the front-page stream — every published piece that is not a Deep
 * Dive, newest first. The two streams are separate products: Deep Dives
 * appear only in the DEEP DIVES section, Posts carry the front page.
 */
export const POSTS: ArticleEntry[] = ARTICLES.filter((entry) => entry.meta.kind !== 'deep-dive');

export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const entry of ARTICLES) {
    for (const tag of entry.meta.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/** URL-safe slug for a tag label, e.g. "privacy/control" → "privacy-control". */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Look up a display label from a tag slug; returns the slug itself if unknown. */
export function tagFromSlug(slug: string | undefined): string {
  if (!slug) return '';
  const found = getTags().find(({ tag }) => tagSlug(tag) === slug);
  return found ? found.tag : slug;
}
