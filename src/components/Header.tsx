import { Link } from 'react-router-dom';
import { Logo } from './Logo';
interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
export const Header = ({ isDarkMode, toggleDarkMode }: HeaderProps) => {
  return (
    <header className="header-brutalist">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity group">
            <div className="reticle-logo reticle-active">
              {/* Logo */}
              <Logo className="h-12 w-12 relative z-10 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                ORANGE TOMATO
              </h1>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400">
                A Magazine of Deep-Dives
              </p>
            </div>
          </Link>
          <nav aria-label="Articles" className="flex items-center gap-2 sm:gap-4">
            <Link to="/" className="nav-link-brutalist hidden sm:inline-block px-2 py-1 text-xs">
              Delegation
            </Link>
            <Link to="/articles/hermes-approval-attention" className="nav-link-brutalist px-2 py-1 text-xs">
              <span className="sm:hidden">Hermes</span>
              <span className="hidden sm:inline">Hermes approvals</span>
            </Link>
            <Link to="/articles/ai-system-breach-boundaries" className="nav-link-brutalist hidden sm:inline-block px-2 py-1 text-xs">
              AI breach
            </Link>
            <Link to="/articles/php2shell-vulnerability" className="nav-link-brutalist px-2 py-1 text-xs">
              <span className="sm:hidden">PHP2Shell</span>
              <span className="hidden sm:inline">PHP2Shell</span>
            </Link>
            <Link to="/articles/minimax-m31-flash-inspectability" className="nav-link-brutalist hidden sm:inline-block px-2 py-1 text-xs">
              M3.1 Flash
            </Link>
            <Link to="/articles/revamp-ai-cloning" className="nav-link-brutalist hidden lg:inline-block px-2 py-1 text-xs">
              Playtest
            </Link>
          </nav>
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-3 border-4 border-black dark:border-orange-500 bg-white dark:bg-black hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-black transition-all transform hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6 text-orange-500 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 011-1zm-2 2a1 1 0 100 2h1zm2-4a1 1 0 100 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};