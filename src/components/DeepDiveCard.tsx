import { Link } from 'react-router-dom';
import { FRONTLINE_ALT, FRONTLINE_SINGLES, formatDate, type ArticleEntry } from '../content/articles';
import { FRONTLINE_DIMS } from '../content/imageDimensions';

interface DeepDiveCardProps {
  entry: ArticleEntry;
  /** Position in the listing: index 0 carries the LCP boost. */
  index: number;
  isDarkMode: boolean;
}

/**
 * The Deep Dive card — the established DEEP DIVES visual style: single image
 * on top, tag eyebrow, title, excerpt, date + Read story link.
 */
export const DeepDiveCard = ({ entry, index, isDarkMode }: DeepDiveCardProps) => (
  <article className="border-2 border-black dark:border-orange-500 bg-white dark:bg-black flex flex-col">
    {FRONTLINE_SINGLES[entry.meta.slug] && (
      <span className="block">
        <img
          src={FRONTLINE_SINGLES[entry.meta.slug]}
          alt={FRONTLINE_ALT[entry.meta.slug] ?? ''}
          className="w-full aspect-[16/10] object-cover border-b-2 border-black dark:border-orange-500"
          loading={index >= 3 ? 'lazy' : undefined}
          fetchPriority={index === 0 ? 'high' : undefined}
          width={FRONTLINE_DIMS[entry.meta.slug]?.width}
          height={FRONTLINE_DIMS[entry.meta.slug]?.height}
        />
      </span>
    )}
    <div className="p-6 flex flex-col flex-1">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
        {entry.meta.tags[0] ?? 'Deep Dive'}
      </p>
      <h2 className="mt-2 text-xl font-black tracking-tight leading-snug">
        <Link
          to={`/articles/${entry.meta.slug}`}
          className="text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-4"
        >
          {entry.meta.title.replace(' | Orange Tomato', '')}
        </Link>
      </h2>
      <p className={`mt-3 text-sm leading-relaxed flex-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        {entry.meta.excerpt}
      </p>
      <p className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
        <span className={`font-bold uppercase tracking-wide ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {formatDate(entry.meta.date)}
        </span>
        <Link
          to={`/articles/${entry.meta.slug}`}
          className="font-bold text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-2"
        >
          Read story <span aria-hidden="true">↗</span>
        </Link>
      </p>
    </div>
  </article>
);
