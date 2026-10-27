import delegationContent from './agent-delegation-boundaries.md?raw';
import hermesContent from './hermes-approval-attention.md?raw';
import aiBreachContent from './ai-system-breach-boundaries.md?raw';
import php2shellContent from './php2shell-vulnerability.md?raw';
import minimaxContent from './minimax-m31-flash-inspectability.md?raw';
import revampContent from './revamp-ai-cloning.md?raw';
import mercuryContent from './mercury-3-diffusion-speed.md?raw';
import flintContent from './recursive-flint-laptop-coding-model.md?raw';
import museContent from './meta-muse-agent-authority.md?raw';
import decisionsContent from './openai-decisions-api-calibration.md?raw';
import microduckContent from './microduck-open-source-robots.md?raw';
import kimiContent from './kimi-k31-pro-capability-removal.md?raw';
import auroraContent from './openai-aurora-image-models.md?raw';
import deepseekContent from './deepseek-deepinfer-open-source.md?raw';
import manifest from './manifest.json';

export interface ArticleMeta {
  slug: string;
  /** Page title, including the site suffix. */
  title: string;
  /** Publication date, ISO format (yyyy-mm-dd). */
  date: string;
  /** Exact publication timestamp (ISO 8601 UTC), used for chronological ordering. */
  publishedAt?: string;
  /** Reader-facing one-sentence summary, also used as the meta description. */
  excerpt: string;
  /** Tags from the site's controlled vocabulary. */
  tags: string[];
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
  'agent-delegation-boundaries': delegationContent,
  'hermes-approval-attention': hermesContent,
  'ai-system-breach-boundaries': aiBreachContent,
  'php2shell-vulnerability': php2shellContent,
  'minimax-m31-flash-inspectability': minimaxContent,
  'revamp-ai-cloning': revampContent,
  'mercury-3-diffusion-speed': mercuryContent,
  'recursive-flint-laptop-coding-model': flintContent,
  'meta-muse-agent-authority': museContent,
  'openai-decisions-api-calibration': decisionsContent,
  'microduck-open-source-robots': microduckContent,
  'kimi-k31-pro-capability-removal': kimiContent,
  'openai-aurora-image-models': auroraContent,
  'deepseek-deepinfer-open-source': deepseekContent,
};

const entries: ArticleEntry[] = manifest.articles.map((meta) => ({
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
