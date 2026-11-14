import { Link } from 'react-router-dom';
import { formatDate, AUTHOR_NAME } from '../content/articles';

/**
 * Author byline: avatar + name + publication date, rendered directly under the
 * article H1 and above the lead image (site-wide element, established 2026-11-12).
 *
 * The avatar is a display-sized derivative (88px WebP, 2x the 44px CSS size) of
 * `public/Author image/Chris.png`; the untouched original stays beside it.
 *
 * The name links to the About page (site-wide element, added with S6).
 */
const AUTHOR_AVATAR = '/Author%20image/Chris-avatar.webp';

interface ArticleBylineProps {
  /** Publication date, ISO (yyyy-mm-dd) — the manifest record's `date`. */
  date: string;
  /** Last substantive edit (ISO 8601 UTC) — the manifest record's `updatedAt`, when present. */
  updatedAt?: string;
}

export const ArticleByline = ({ date, updatedAt }: ArticleBylineProps) => {
  const showUpdated = updatedAt && updatedAt.slice(0, 10) !== date;
  return (
    <div className="article-byline">
      <img
        className="article-byline-avatar"
        src={AUTHOR_AVATAR}
        alt=""
        width={44}
        height={44}
      />
      <div className="article-byline-text">
        <Link
          to="/about"
          className="article-byline-name hover:underline focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-4"
        >
          {AUTHOR_NAME}
        </Link>
        <time className="article-byline-date" dateTime={date}>
          {formatDate(date)}
        </time>
        {showUpdated && (
          <time className="article-byline-date" dateTime={updatedAt}>
            Updated {formatDate(updatedAt.slice(0, 10))}
          </time>
        )}
      </div>
    </div>
  );
};
