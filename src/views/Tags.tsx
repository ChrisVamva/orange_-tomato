import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ARTICLES, formatDate, getTags, tagFromSlug, tagSlug } from '../content/articles';

interface TagsProps {
  isDarkMode: boolean;
}

export const Tags = ({ isDarkMode }: TagsProps) => {
  const { tag } = useParams<{ tag: string }>();
  const selectedTag = tagFromSlug(tag);
  const allTags = getTags();

  useEffect(() => {
    document.title = selectedTag ? `${selectedTag} | Orange Tomato` : 'Tags | Orange Tomato';
  }, [selectedTag]);

  if (selectedTag) {
    const tagged = ARTICLES.filter((entry) => entry.meta.tags.includes(selectedTag));
    return (
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-3">
          <Link to="/tags" className="hover:underline focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-2">
            All tags
          </Link>
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 mb-8">
          {selectedTag}
        </h1>
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-8">
          {tagged.length} article{tagged.length === 1 ? '' : 's'}
        </p>
        <ul className="divide-y-2 divide-black dark:divide-orange-500 border-y-2 border-black dark:border-orange-500">
          {tagged.map((entry) => (
            <li key={entry.meta.slug} className="py-6">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                <Link
                  to={`/articles/${entry.meta.slug}`}
                  className="text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-2 transition-colors"
                >
                  {entry.meta.title.replace(' | Orange Tomato', '')}
                </Link>
              </h2>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {formatDate(entry.meta.date)} · {entry.readTimeMinutes} min read · {entry.meta.tags.join(', ')}
              </p>
              <p className={`mt-2 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {entry.meta.excerpt}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 mb-8">
        Tags
      </h1>
      <ul className="flex flex-wrap gap-3">
        {allTags.map(({ tag, count }) => (
          <li key={tag}>
            <Link
              to={`/tags/${tagSlug(tag)}`}
              className="inline-block px-4 py-2 border-2 border-black dark:border-orange-500 font-bold uppercase tracking-widest text-xs text-black dark:text-white hover:bg-orange-500 hover:text-white dark:hover:text-black hover:border-orange-500 focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-2 transition-colors"
            >
              {tag} <span className="text-orange-600 dark:text-orange-400">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
