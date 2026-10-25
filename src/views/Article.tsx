import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import delegationArticle from '../content/agent-delegation-boundaries.md?raw';
import hermesArticle from '../content/hermes-approval-attention.md?raw';
import aiBreachArticle from '../content/ai-system-breach-boundaries.md?raw';
import php2shellArticle from '../content/php2shell-vulnerability.md?raw';
import minimaxArticle from '../content/minimax-m31-flash-inspectability.md?raw';
interface ArticleProps {
  isDarkMode: boolean;
  article?: 'delegation' | 'hermes' | 'ai-breach' | 'php2shell' | 'minimax';
}
export const Article = ({ isDarkMode, article = 'delegation' }: ArticleProps) => {
  const isHermes = article === 'hermes';
  const isAiBreach = article === 'ai-breach';
  const isPhp2shell = article === 'php2shell';
  const isMinimax = article === 'minimax';
  const content = isHermes
    ? hermesArticle
    : isAiBreach
      ? aiBreachArticle
      : isPhp2shell
        ? php2shellArticle
        : isMinimax
          ? minimaxArticle
          : delegationArticle;
  const title = isHermes
    ? 'Who Decides When Hermes Interrupts You? | Orange Tomato'
    : isAiBreach
      ? 'When AI Systems Are Breached, Where Does the Failure Happen? | Orange Tomato'
      : isPhp2shell
        ? 'PHP2Shell: When a Flaw in the Runtime Goes from Zero to Millions of Attacks | Orange Tomato'
        : isMinimax
          ? 'When a Stealth Model Gets a Name: What MiniMax\'s M3.1 Flash Launch Lets You Inspect | Orange Tomato'
          : 'What Should an AI Agent Be Allowed to Do? | Orange Tomato';
  const description = isHermes
    ? 'A source audit of how Hermes Agent routes dangerous-command approvals through detectors, smart review, and human decisions.'
    : isAiBreach
      ? "IBM's breach findings and a recent incident show why the security boundaries around AI integrations matter."
      : isPhp2shell
        ? 'PHP2Shell affected roughly 70% of the web. The patch exists — but fixing a runtime flaw means the hosting provider has to act, not the site builder.'
        : isMinimax
          ? 'MiniMax named its anonymous Space Bunny model M3.1 Flash. What the stealth run, vendor benchmarks, list price, and downloadable weights actually let a reader inspect.'
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
      <div className="article-shell">
        <article className="article-prose">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
};