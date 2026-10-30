import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ARTICLES, formatDate, tagSlug } from '../content/articles';

interface PostsProps {
  isDarkMode: boolean;
}

const PAGE_SIZE = 10;

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export const Posts = ({ isDarkMode }: PostsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(ARTICLES.length / PAGE_SIZE));
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage >= 1 && rawPage <= totalPages ? rawPage : 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const visibleArticles = ARTICLES.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    document.title = 'Orange Tomato — A Magazine of Deep-Dives';
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        'Orange Tomato publishes finished, evidence-grounded deep-dives about AI and agent systems. Every number traceable. What can\'t be verified, said so.';
    }
  }, []);

  const goToPage = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setSearchParams(page === 1 ? {} : { page: String(page) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="posts-page relative isolate max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <section className="mb-14" aria-label="The arrival of Orange Tomato">
        <video
          className="aspect-video w-full bg-black object-contain"
          src="/Video/The%20arrival%20of%20Orange%20Tomato.mp4"
          controls
          playsInline
          preload="metadata"
          aria-label="The arrival of Orange Tomato"
        />
      </section>

      <h1 className="sr-only">Posts</h1>
      <ul className="posts-article-list divide-y-2 divide-black dark:divide-orange-500 border-y-2 border-black dark:border-orange-500">
        {visibleArticles.map((entry) => (
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

      <nav aria-label="Pagination" className="mt-10 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Newer posts"
          className="inline-flex items-center gap-1 px-3 py-2 border-2 border-black dark:border-orange-500 text-sm font-bold uppercase tracking-wide text-black dark:text-white hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Newer
        </button>
        <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Older posts"
          className="inline-flex items-center gap-1 px-3 py-2 border-2 border-black dark:border-orange-500 text-sm font-bold uppercase tracking-wide text-black dark:text-white hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          Older
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
};
