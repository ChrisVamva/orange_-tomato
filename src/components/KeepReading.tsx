import { Link } from 'react-router-dom';
import { getArticle, type ArticleEntry } from '../content/articles';

interface KeepReadingProps {
  entry: ArticleEntry;
  isDarkMode: boolean;
}

/**
 * The "Keep reading" block — up to four hand-curated next articles, stored as
 * editorial data in manifest.json (each article's `keepReading` list, in
 * priority order). Rendered after the article body and before the site-wide
 * footer, it uses the Posts-list visual language: text-only cards (title link
 * + one-line rationale), no new artwork.
 *
 * Defensive rules per the Internal Links and Keep Reading plan: the current
 * article, retired/missing slugs, and duplicates are always skipped; the block
 * renders nothing when fewer than one genuinely relevant candidate remains.
 */
export const KeepReading = ({ entry, isDarkMode }: KeepReadingProps) => {
  const candidates: { target: ArticleEntry; reason: string }[] = [];
  const seen = new Set<string>();

  for (const { slug, reason } of entry.meta.keepReading ?? []) {
    const target = getArticle(slug);
    if (!target || target.meta.slug === entry.meta.slug) continue;
    if (seen.has(slug) || !reason.trim()) continue;
    seen.add(slug);
    candidates.push({ target, reason });
    if (candidates.length >= 4) break;
  }

  if (candidates.length === 0) return null;

  return (
    <section aria-label="Keep reading" className="mt-16 border-t-2 border-black dark:border-orange-500 pt-8">
      <h2 className="text-xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400">
        Keep reading
      </h2>
      <ul className="mt-4 divide-y-2 divide-black dark:divide-orange-500">
        {candidates.map(({ target, reason }) => (
          <li key={target.meta.slug} className="py-5">
            <h3 className="text-lg font-black tracking-tight leading-snug">
              <Link
                to={`/articles/${target.meta.slug}/`}
                className="text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-4"
              >
                {target.meta.title.replace(' | Orange Tomato', '')}
              </Link>
            </h3>
            <p className={`mt-1.5 text-sm leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {reason}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
