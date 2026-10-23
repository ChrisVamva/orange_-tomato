import ReactMarkdown from 'react-markdown';
import article from '../content/agent-delegation-boundaries.md?raw';

interface ArticleProps {
  isDarkMode: boolean;
}

export const Article = ({ isDarkMode }: ArticleProps) => (
  <div className={`article-page ${isDarkMode ? 'article-page-dark' : ''}`}>
    <main className="article-shell">
      <article className="article-prose">
        <ReactMarkdown>{article}</ReactMarkdown>
      </article>
    </main>
  </div>
);
