import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DEEP_DIVES, formatDate, tagSlug } from '../content/articles';

interface DeepDivesProps {
  isDarkMode: boolean;
}

export const DeepDives = ({ isDarkMode }: DeepDivesProps) => {
  useEffect(() => {
    document.title = 'Deep Dives | Orange Tomato';
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        'Deep Dives are the long pieces: connected stories, expanded research, and a companion notebook.';
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 mb-12">
        Deep Dives
      </h1>
      <p className={`mb-12 text-lg leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        The long pieces: connected stories, expanded research, and a companion notebook.
      </p>
      {DEEP_DIVES.length === 0 ? (
        <p
          className={`border-l-4 border-orange-500 pl-6 text-lg leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
        >
          The first Deep Dive is in production. It lands here.
        </p>
      ) : (
        <ul className="divide-y-2 divide-black dark:divide-orange-500 border-y-2 border-black dark:border-orange-500">
          {DEEP_DIVES.map((entry) => (
            <li key={entry.meta.slug} className="py-8 group">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                <Link
                  to={`/articles/${entry.meta.slug}`}
                  className="text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-4"
                >
                  {entry.meta.title.replace(' | Orange Tomato', '')}
                </Link>
              </h2>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {formatDate(entry.meta.date)} · {entry.readTimeMinutes} min read ·{' '}
                {entry.meta.tags.map((tag, i) => (
                  <span key={tag}>
                    {i > 0 && ', '}
                    <Link
                      to={`/tags/${tagSlug(tag)}`}
                      className="text-orange-600 dark:text-orange-400 hover:underline focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-2"
                    >
                      {tag}
                    </Link>
                  </span>
                ))}
              </p>
              <p className={`mt-3 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {entry.meta.excerpt}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
