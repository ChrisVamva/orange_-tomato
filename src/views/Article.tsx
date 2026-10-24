import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import delegationArticle from '../content/agent-delegation-boundaries.md?raw';
import hermesArticle from '../content/hermes-approval-attention.md?raw';

interface ArticleProps {
  isDarkMode: boolean;
  article?: 'delegation' | 'hermes';
}

export const Article = ({ isDarkMode, article = 'delegation' }: ArticleProps) => {
  const isHermes = article === 'hermes';
  const content = isHermes ? hermesArticle : delegationArticle;
  const title = isHermes
    ? 'Who Decides When Hermes Interrupts You? | Orange Tomato'
    : 'What Should an AI Agent Be Allowed to Do? | Orange Tomato';
  const description = isHermes
    ? 'A source audit of how Hermes Agent routes dangerous-command approvals through detectors, smart review, and human decisions.'
    : "A simulated refund task shows why an AI agent's goal does not define its authority. Evidence, limits, and practical questions for delegation.";

  useEffect(() => {
    document.title = title;
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
  }, [title, description]);

  return (
    <div className={`article-page ${isDarkMode ? 'article-page-dark' : ''}`}>
      <main className="article-shell">
        <article className="article-prose">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
};
