import { Link, NavLink } from 'react-router-dom';
import { Logo } from './Logo';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const navItems = [
  { to: '/', label: 'Posts', end: true },
  { to: '/deep-dives', label: 'Deep Dives', end: true },
  { to: '/archive', label: 'Archive', end: false },
  { to: '/search', label: 'Search', end: false },
  { to: '/tags', label: 'Tags', end: false },
];

export const Header = ({ isDarkMode, toggleDarkMode }: HeaderProps) => {
  return (
    <header className="header-brutalist">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5">
        <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-3">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 sm:space-x-4 hover:opacity-80 transition-opacity group min-w-0">
            <Logo className="h-16 sm:h-20 transition-transform group-hover:scale-105" />
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors leading-tight">
                ORANGE TOMATO
              </p>
              <p className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400">
                A Magazine of Deep-Dives
              </p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-3 ml-auto">
          {/* Primary navigation */}
          <nav aria-label="Site" className="flex flex-wrap items-center gap-1 sm:gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-link-brutalist px-1.5 sm:px-2 py-1 text-[11px] sm:text-xs whitespace-nowrap ${
                    isActive ? 'text-orange-500 dark:text-orange-400 border-orange-500' : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 sm:p-3 border-4 border-black dark:border-orange-500 bg-white dark:bg-black hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-black transition-all transform hover:scale-110 shrink-0"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 011-1zm-2 2a1 1 0 100 2h1zm2-4a1 1 0 100 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          </div>
        </div>
      </div>
    </header>
  );
};
