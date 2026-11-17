import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface ArticleProps {
  isDarkMode: boolean;
  article: string;
  pageTitle: string;
  description: string;
  previewLabel?: string;
}

export const Article = ({ isDarkMode, article, pageTitle, description, previewLabel }: ArticleProps) => {
  useEffect(() => {
    document.title = pageTitle;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    descriptionTag?.setAttribute('content', description);
  }, [pageTitle, description]);

  return (
    <div className={`article-page ${isDarkMode ? 'article-page-dark' : ''}`}>
      <div className="article-shell">
        {previewLabel && <aside className="preview-status" aria-label="Preview status">{previewLabel}</aside>}
        <article className="article-prose">
          <ReactMarkdown>{article}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
};
