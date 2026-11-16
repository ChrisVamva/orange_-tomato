import { useSearchParams } from 'react-router-dom';
import { POSTS } from '../content/articles';
import { PostCard } from '../components/PostCard';
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
  const totalPages = Math.max(1, Math.ceil(POSTS.length / PAGE_SIZE));
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage >= 1 && rawPage <= totalPages ? rawPage : 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const visibleArticles = POSTS.slice(start, start + PAGE_SIZE);

  const goToPage = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setSearchParams(page === 1 ? {} : { page: String(page) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {currentPage === 1 && <SubscribeSection />}
      <div className="posts-page relative isolate mx-auto px-6 sm:px-8 py-16">
      <h1 className="sr-only">Home</h1>
      <ul className="posts-article-list max-w-6xl mx-auto grid gap-6 sm:grid-cols-3">
        {visibleArticles.map((entry, index) => (
          <li key={entry.meta.slug} className="min-w-0">
            <PostCard entry={entry} index={index} isDarkMode={isDarkMode} />
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
