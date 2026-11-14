import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticle } from '../content/articles';
import { ARTICLE_IMAGE_DIMS } from '../content/imageDimensions';
import { rehypeTableStyle } from '../rehypeTableStyle';
import { rehypeDiagramStyle } from '../rehypeDiagramStyle';
import { KeepReading } from '../components/KeepReading';
import { ArticleByline } from '../components/ArticleByline';

interface ArticleProps {
  isDarkMode: boolean;
}

export const Article = ({ isDarkMode }: ArticleProps) => {
  const { slug } = useParams<{ slug?: string }>();
  const entry = slug ? getArticle(slug) : undefined;

  if (!entry) {
    return <ArticleNotFound />;
  }

  const { content } = entry;

  // LCP candidate: the first inline markdown image (the lead image). Matched
  // by src string comparison so server and client agree deterministically.
  // Plain const (no hook): the early return above would break hook order.
  const leadImageSrc = content.match(/!\[[^\]]*\]\(([^)\s]+)/)?.[1] ?? null;

  // 1-based source line of the article title H1, so the byline renders under
  // that heading only — deterministic across SSR and hydration (a mutable
  // "seen" flag would trip the react-hooks/immutability lint rule).
  const titleLine = content.split('\n').findIndex((line) => line.startsWith('# ')) + 1;

  return (
    <div className={`article-page ${isDarkMode ? 'article-page-dark' : ''}`}>
      <div className="article-shell">
        <article className="article-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeTableStyle, rehypeDiagramStyle]}
            components={{
              // The byline (avatar + name + date) sits under the article title
              // and above the lead image. It renders only for the H1 on the
              // title's source line, so a future second H1 cannot duplicate it.
              h1: ({ children, node }) => {
                const isTitle =
                  titleLine > 0 && node?.position?.start.line === titleLine;
                return (
                  <>
                    <h1>{children}</h1>
                    {isTitle && <ArticleByline date={entry.meta.date} updatedAt={entry.meta.updatedAt} />}
                  </>
                );
              },
              img: ({ src, alt }) => {
                const dims = src ? ARTICLE_IMAGE_DIMS[src] : undefined;
                return (
                  <img
                    src={src ?? ''}
                    alt={alt ?? ''}
                    fetchPriority={src === leadImageSrc ? 'high' : undefined}
                    loading={src === leadImageSrc ? undefined : 'lazy'}
                    width={dims?.width}
                    height={dims?.height}
                  />
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
        <KeepReading entry={entry} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export const ArticleNotFound = () => {
  return (
    <div className="max-w-3xl mx-auto px-8 py-24 text-center">
      <h2 className="text-4xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 mb-6">
        Article not found
      </h2>
      <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        The article you are looking for does not exist or has moved.
      </p>
      <Link to="/" className="btn-brutalist mt-8">
        Back to Posts
      </Link>
    </div>
  );
};
