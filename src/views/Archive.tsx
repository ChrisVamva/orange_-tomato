import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES, formatDate } from '../content/articles';

interface ArchiveProps {
  isDarkMode: boolean;
}

export const Archive = ({ isDarkMode }: ArchiveProps) => {
  useEffect(() => {
    document.title = 'Archive | Orange Tomato';
  }, []);

  // Group by year, then month (long name), preserving newest-first order.
  const byYear = new Map<string, Map<string, typeof ARTICLES>>();
  for (const entry of ARTICLES) {
    const date = new Date(`${entry.meta.date}T00:00:00`);
    const year = String(date.getFullYear());
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    if (!byYear.has(year)) byYear.set(year, new Map());
    const months = byYear.get(year)!;
    if (!months.has(month)) months.set(month, []);
    months.get(month)!.push(entry);
  }

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 mb-12">
        Archive
      </h1>
      {[...byYear.entries()].map(([year, months]) => (
        <section key={year} className="mb-12">
          <h2 className="text-2xl font-black tracking-tight uppercase border-b-2 border-black dark:border-orange-500 pb-2 mb-6 text-black dark:text-white">
            {year}
          </h2>
          {[...months.entries()].map(([month, entries]) => (
            <div key={month} className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-3">
                {month}
              </h3>
              <ul className="space-y-4">
                {entries.map((entry) => (
                  <li key={entry.meta.slug}>
                    <Link
                      to={`/articles/${entry.meta.slug}`}
                      className={`block text-lg font-bold leading-snug hover:text-orange-500 dark:hover:text-orange-400 focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-2 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                    >
                      {entry.meta.title.replace(' | Orange Tomato', '')}
                    </Link>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      {formatDate(entry.meta.date)} · {entry.readTimeMinutes} min read
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};
