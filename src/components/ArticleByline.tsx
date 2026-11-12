import { formatDate } from '../content/articles';

/**
 * Author byline: avatar + name + publication date, rendered directly under the
 * article H1 and above the lead image (site-wide element, established 2026-11-12).
 *
 * The avatar is a display-sized derivative (88px WebP, 2x the 44px CSS size) of
 * `public/Author image/Chris.png`; the untouched original stays beside it.
 */
const AUTHOR_NAME = 'Chris Vam';
const AUTHOR_AVATAR = '/Author%20image/Chris-avatar.webp';

interface ArticleBylineProps {
  /** Publication date, ISO (yyyy-mm-dd) — the manifest record's `date`. */
  date: string;
}

export const ArticleByline = ({ date }: ArticleBylineProps) => (
  <div className="article-byline">
    <img
      className="article-byline-avatar"
      src={AUTHOR_AVATAR}
      alt=""
      width={44}
      height={44}
    />
    <div className="article-byline-text">
      <span className="article-byline-name">{AUTHOR_NAME}</span>
      <time className="article-byline-date" dateTime={date}>
        {formatDate(date)}
      </time>
    </div>
  </div>
);
