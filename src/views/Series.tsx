import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SERIES, formatDate, getSeriesSlotEntry } from '../content/articles';

interface SeriesProps {
  isDarkMode: boolean;
}

/**
 * The Series section: each declared series with its slots in order. A slot whose
 * article exists links to it; the rest read as "coming", so the page can ship
 * while the set is still being written.
 */
export const Series = ({ isDarkMode }: SeriesProps) => {
  useEffect(() => {
    document.title = 'Series | Orange Tomato';
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        'Series: sets of pieces that answer one question across several articles, each worth reading alone.';
    }
  }, []);

  const muted = isDarkMode ? 'text-zinc-400' : 'text-zinc-600';

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 mb-12">
        Series
      </h1>
      <p className={`mb-12 text-lg leading-relaxed ${muted}`}>
        Sets of pieces that answer one question across several articles. Every piece stands alone; read in
        order, they follow one thread to its end.
      </p>

      {SERIES.length === 0 ? (
        <p className={`border-l-4 border-orange-500 pl-6 text-lg leading-relaxed ${muted}`}>
          The first series is in production. It lands here.
        </p>
      ) : (
        SERIES.map((series) => (
          <section key={series.id} id={series.id} className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              {series.title}
            </h2>
            <p className={`mt-3 leading-relaxed ${muted}`}>{series.description}</p>

            <ol className="mt-8 divide-y-2 divide-black dark:divide-orange-500 border-y-2 border-black dark:border-orange-500">
              {series.slots.map((slot) => {
                const entry = getSeriesSlotEntry(slot);
                return (
                  <li key={slot.n} className="py-5 flex gap-4 items-baseline">
                    <span className="text-sm font-black tabular-nums text-orange-600 dark:text-orange-400 w-6 shrink-0">
                      {slot.n}
                    </span>
                    <div className="min-w-0">
                      {entry ? (
                        <>
                          <Link
                            to={`/articles/${entry.meta.slug}`}
                            className="text-xl font-bold leading-snug text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-4"
                          >
                            {entry.meta.title.replace(' | Orange Tomato', '')}
                          </Link>
                          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                            {formatDate(entry.meta.date)} · {entry.readTimeMinutes} min read
                          </p>
                        </>
                      ) : (
                        <>
                          <span className={`text-xl font-bold leading-snug ${muted}`}>{slot.title}</span>
                          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                            Coming
                          </p>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>

            {series.note && (
              <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{series.note}</p>
            )}
          </section>
        ))
      )}
    </div>
  );
};
