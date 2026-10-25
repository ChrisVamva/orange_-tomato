import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES, formatDate, tagSlug } from '../content/articles';

interface PostsProps {
  isDarkMode: boolean;
}

export const Posts = ({ isDarkMode }: PostsProps) => {
  useEffect(() => {
    document.title = 'Orange Tomato — A Magazine of Deep-Dives';
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        'Orange Tomato publishes finished, evidence-grounded deep-dives about AI and agent systems. Every number traceable. What can\'t be verified, said so.';
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <section className="mb-14 border-l-4 border-orange-500 pl-6">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-3">
          A magazine of deep-dives
        </p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase italic text-black dark:text-white leading-tight">
          Finished, evidence-grounded stories about AI and agent systems.
        </h2>
        <p className={`mt-4 text-lg leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Every number traceable. What can't be verified, said so.
        </p>
      </section>

      <h1 className="sr-only">Posts</h1>
      <ul className="divide-y-2 divide-black dark:divide-orange-500 border-y-2 border-black dark:border-orange-500">
        {ARTICLES.map((entry) => (
          <li key={entry.meta.slug} className="py-8 group">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              <Link
                to={entry.meta.slug === 'agent-delegation-boundaries' ? '/articles/agent-delegation-boundaries' : `/articles/${entry.meta.slug}`}
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
    </div>
  );
};
