import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface ArticleProps {
  isDarkMode: boolean;
  article: string;
  pageTitle: string;
  description: string;
}

export const Article = ({ isDarkMode, article, pageTitle, description }: ArticleProps) => {
  useEffect(() => {
    document.title = pageTitle;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    descriptionTag?.setAttribute('content', description);
  }, [pageTitle, description]);

  return (
    <div className={`article-page ${isDarkMode ? 'article-page-dark' : ''}`}>
      <main className="article-shell">
        <article className="article-prose">
          <ReactMarkdown>{article}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
};
