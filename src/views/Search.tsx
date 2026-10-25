import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES, formatDate, type ArticleEntry } from '../content/articles';

interface SearchProps {
  isDarkMode: boolean;
}

interface Result {
  entry: ArticleEntry;
  score: number;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text: string, query: string): ReactNode {
  if (!query) return text;
  const escaped = escapeRegExp(query.trim());
  if (!escaped) return text;
  const parts = text.split(new RegExp(`(${escaped})`, 'ig'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.trim().toLowerCase() ? (
      <mark key={i} className="bg-orange-500/25 text-inherit px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export const Search = ({ isDarkMode }: SearchProps) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'Search | Orange Tomato';
    inputRef.current?.focus();
  }, []);

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const scored: Result[] = [];
    for (const entry of ARTICLES) {
      const title = entry.meta.title.toLowerCase();
      const excerpt = entry.meta.excerpt.toLowerCase();
      const tags = entry.meta.tags.join(' ').toLowerCase();
      const body = entry.content.toLowerCase();
      let score = 0;
      if (title.includes(q)) score += 5;
      if (tags.includes(q)) score += 3;
      if (excerpt.includes(q)) score += 2;
      if (body.includes(q)) score += 1;
      if (score > 0) scored.push({ entry, score });
    }
    return scored.sort((a, b) => b.score - a.score);
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 mb-8">
        Search
      </h1>
      <div className="mb-8">
        <label htmlFor="search-input" className="sr-only">
          Search articles
        </label>
        <input
          ref={inputRef}
          id="search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search titles, topics, and article text…"
          className="input-brutalist w-full px-4 py-3 text-base"
          autoComplete="off"
        />
      </div>

      <p role="status" aria-live="polite" className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6">
        {query.trim().length < 2
          ? 'Type at least two characters to search.'
          : results.length === 0
            ? 'No articles match your search.'
            : `${results.length} article${results.length === 1 ? '' : 's'} match${results.length === 1 ? 'es' : ''}.`}
      </p>

      {results.length > 0 && (
        <ul className="divide-y-2 divide-black dark:divide-orange-500 border-y-2 border-black dark:border-orange-500">
          {results.map(({ entry }) => (
            <li key={entry.meta.slug} className="py-6">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                <Link
                  to={`/articles/${entry.meta.slug}`}
                  className="text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-2 transition-colors"
                >
                  {highlight(entry.meta.title.replace(' | Orange Tomato', ''), query)}
                </Link>
              </h2>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {formatDate(entry.meta.date)} · {entry.readTimeMinutes} min read · {entry.meta.tags.join(', ')}
              </p>
              <p className={`mt-2 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {highlight(entry.meta.excerpt, query)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
