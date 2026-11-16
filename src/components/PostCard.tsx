import { Link } from 'react-router-dom';
import {
  POST_COVER_ALT,
  POST_COVERS,
  formatDate,
  tagSlug,
  type ArticleEntry,
} from '../content/articles';
import { POST_COVER_DIMS } from '../content/imageDimensions';

interface PostCardProps {
  entry: ArticleEntry;
  /** Position in the listing: index 0 carries the LCP boost. */
  index: number;
  isDarkMode: boolean;
}

/** Standard-post card, matching the image-first Deep Dives card treatment. */
export const PostCard = ({ entry, index, isDarkMode }: PostCardProps) => {
  const slug = entry.meta.slug;
  const cover = POST_COVERS[slug];
  const dimensions = POST_COVER_DIMS[slug];

  return (
    <article className={`h-full border-2 ${isDarkMode ? 'border-orange-500 bg-black' : 'border-black bg-white'} flex flex-col`}>
      {cover && (
        <span className="block">
          <img
            src={cover}
            alt={POST_COVER_ALT[slug] ?? ''}
            className={`w-full aspect-[16/10] object-cover border-b-2 ${isDarkMode ? 'border-orange-500' : 'border-black'}`}
            loading={index >= 3 ? 'lazy' : undefined}
            fetchPriority={index === 0 ? 'high' : undefined}
            width={dimensions?.width}
            height={dimensions?.height}
          />
        </span>
      )}
      <div className="p-6 flex flex-col flex-1">
        <p className={`flex flex-wrap gap-x-2 text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
          {entry.meta.tags.length > 0
            ? entry.meta.tags.map((tag, i) => (
                <span key={tag}>
                  {i > 0 && <span aria-hidden="true">· </span>}
                  <Link
                    to={`/tags/${tagSlug(tag)}`}
                    className="hover:underline focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-2"
                  >
                    {tag}
                  </Link>
                </span>
              ))
            : 'Post'}
        </p>
        <h2 className="mt-2 text-xl font-black tracking-tight leading-snug">
          <Link
            to={`/articles/${slug}`}
            className={`transition-colors focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-4 ${isDarkMode ? 'text-white hover:text-orange-400' : 'text-black hover:text-orange-500'}`}
          >
            {entry.meta.title.replace(' | Orange Tomato', '')}
          </Link>
        </h2>
        <p className={`mt-3 text-sm leading-relaxed flex-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {entry.meta.excerpt}
        </p>
        <p className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
          <span className={`font-bold uppercase tracking-wide ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {formatDate(entry.meta.date)} · {entry.readTimeMinutes} min read
          </span>
          <Link
            to={`/articles/${slug}`}
            className={`font-bold transition-colors focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-2 ${isDarkMode ? 'text-white hover:text-orange-400' : 'text-black hover:text-orange-500'}`}
          >
            Read story <span aria-hidden="true">↗</span>
          </Link>
        </p>
      </div>
    </article>
  );
};
