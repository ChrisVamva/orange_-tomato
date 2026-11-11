import { Link, useSearchParams } from 'react-router-dom';
import { ARTICLES, FRONTLINE, FRONTLINE_ALT, FRONTLINE_SINGLES, formatDate, tagSlug } from '../content/articles';
import { SubscribeSection } from '../components/SubscribeSection';

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

  const goToPage = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setSearchParams(page === 1 ? {} : { page: String(page) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {currentPage === 1 && <SubscribeSection />}
      <div className="posts-page relative isolate mx-auto px-6 sm:px-8 py-16">
      <h1 className="sr-only">Posts</h1>
      {currentPage === 1 && FRONTLINE.length > 0 && (
        <section aria-label="Frontline Deep Dives" className="max-w-6xl mx-auto mb-16 scroll-mt-24">
          <div className="grid gap-6 sm:grid-cols-3">
            {FRONTLINE.map((entry, index) => (
              <article
                key={entry.meta.slug}
                className="border-2 border-black dark:border-orange-500 bg-white dark:bg-black flex flex-col"
              >
                {FRONTLINE_SINGLES[entry.meta.slug] && (
                  <span className="block">
                    <img
                      src={FRONTLINE_SINGLES[entry.meta.slug]}
                      alt={FRONTLINE_ALT[entry.meta.slug] ?? ''}
                      className="w-full aspect-[16/10] object-cover border-b-2 border-black dark:border-orange-500"
                      loading="eager"
                      fetchPriority={index === 0 ? 'high' : undefined}
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
            ))}
          </div>
        </section>
      )}
      <ul className="posts-article-list max-w-3xl mx-auto divide-y-2 divide-black dark:divide-orange-500 border-y-2 border-black dark:border-orange-500">
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
    </>
  );
};
