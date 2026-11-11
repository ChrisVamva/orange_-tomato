import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticle } from '../content/articles';
import { rehypeTableStyle } from '../rehypeTableStyle';
import { rehypeDiagramStyle } from '../rehypeDiagramStyle';

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

  return (
    <div className={`article-page ${isDarkMode ? 'article-page-dark' : ''}`}>
      <div className="article-shell">
        <article className="article-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeTableStyle, rehypeDiagramStyle]}>{content}</ReactMarkdown>
        </article>
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
