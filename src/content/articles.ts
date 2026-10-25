import delegationContent from './agent-delegation-boundaries.md?raw';
import hermesContent from './hermes-approval-attention.md?raw';
import aiBreachContent from './ai-system-breach-boundaries.md?raw';
import php2shellContent from './php2shell-vulnerability.md?raw';
import minimaxContent from './minimax-m31-flash-inspectability.md?raw';
import revampContent from './revamp-ai-cloning.md?raw';
import mercuryContent from './mercury-3-diffusion-speed.md?raw';

export interface ArticleMeta {
  slug: string;
  /** Page title, including the site suffix. */
  title: string;
  /** Publication date, ISO format (yyyy-mm-dd). */
  date: string;
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

const entries: ArticleEntry[] = [
  {
    meta: {
      slug: 'agent-delegation-boundaries',
      title: 'What Should an AI Agent Be Allowed to Do? | Orange Tomato',
      date: '2026-10-24',
      excerpt:
        "A simulated refund task shows why an AI agent's goal does not define its authority. Evidence, limits, and practical questions for delegation.",
      tags: ['agents', 'privacy/control'],
    },
    content: delegationContent,
  },
  {
    meta: {
      slug: 'hermes-approval-attention',
      title: 'Who Decides When Hermes Interrupts You? | Orange Tomato',
      date: '2026-10-24',
      excerpt:
        'A source audit of how Hermes Agent routes dangerous-command approvals through detectors, smart review, and human decisions.',
      tags: ['agents', 'privacy/control'],
    },
    content: hermesContent,
  },
  {
    meta: {
      slug: 'ai-system-breach-boundaries',
      title: 'When AI Systems Are Breached, Where Does the Failure Happen? | Orange Tomato',
      date: '2026-10-24',
      excerpt:
        "IBM's breach findings and a recent incident show why the security boundaries around AI integrations matter.",
      tags: ['security', 'failures/reliability'],
    },
    content: aiBreachContent,
  },
  {
    meta: {
      slug: 'php2shell-vulnerability',
      title: 'PHP2Shell: When a Flaw in the Runtime Goes from Zero to Millions of Attacks | Orange Tomato',
      date: '2026-10-25',
      excerpt:
        'PHP2Shell affected roughly 70% of the web. The patch exists — but fixing a runtime flaw means the hosting provider has to act, not the site builder.',
      tags: ['security', 'failures/reliability'],
    },
    content: php2shellContent,
  },
  {
    meta: {
      slug: 'minimax-m31-flash-inspectability',
      title: 'When a Stealth Model Gets a Name: What MiniMax\'s M3.1 Flash Launch Lets You Inspect | Orange Tomato',
      date: '2026-10-25',
      excerpt:
        'MiniMax named its anonymous Space Bunny model M3.1 Flash. What the stealth run, vendor benchmarks, list price, and downloadable weights actually let a reader inspect.',
      tags: ['generative AI', 'evaluation', 'cost'],
    },
    content: minimaxContent,
  },
  {
    meta: {
      slug: 'revamp-ai-cloning',
      title: 'What a Playtest Actually Gives Away | Orange Tomato',
      date: '2026-10-25',
      excerpt:
        'A studio shrank a playtest over AI cloning fears. What the public record shows about build leaks, clip-to-lookalike copies, and the limits of hiding a build.',
      tags: ['generative AI', 'privacy/control'],
    },
    content: revampContent,
  },
  {
    meta: {
      slug: 'mercury-3-diffusion-speed',
      title: 'Mercury 3 Says It Is Fast and Frontier-Quality. What Can You Verify? | Orange Tomato',
      date: '2026-10-25',
      excerpt:
        "Inception's diffusion model claims 1,068 tokens per second and quality on par with GPT-6 Luna and Claude Haiku 5.5. The launch materials and the first independent checks tell different stories.",
      tags: ['generative AI', 'evaluation', 'cost'],
    },
    content: mercuryContent,
  },
];

export const ARTICLES: ArticleEntry[] = entries
  .map((entry) => ({
    ...entry,
    readTimeMinutes: estimateReadTime(entry.content),
  }))
  // Newest first; ties broken by title for a stable order.
  .sort((a, b) =>
    a.meta.date === b.meta.date
      ? a.meta.title.localeCompare(b.meta.title)
      : b.meta.date.localeCompare(a.meta.date),
  );

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
