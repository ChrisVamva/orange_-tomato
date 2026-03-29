import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header = ({ searchTerm, setSearchTerm, isDarkMode, toggleDarkMode }: HeaderProps) => {
  return (
    <header className={`sticky top-0 z-50 border-b-2 ${isDarkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-900'} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <Logo className="h-12 w-12" />
            <div>
              <h1 className={`text-2xl font-black tracking-tighter uppercase italic ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                Orange Tomato
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-tomato">
                Systems Design Journal
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            <Link to="/journal" className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-zinc-400 hover:text-tomato' : 'text-zinc-500 hover:text-tomato'} transition-colors`}>
              JOURNAL
            </Link>
            <Link to="/assets" className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-zinc-400 hover:text-tomato' : 'text-zinc-500 hover:text-tomato'} transition-colors`}>
              DIGITAL ASSETS
            </Link>
            <Link to="/freelancing" className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-zinc-400 hover:text-tomato' : 'text-zinc-500 hover:text-tomato'} transition-colors`}>
              FREELANCING
            </Link>
            <Link to="/watchdog" className={`text-[10px] font-bold uppercase tracking-[0.2em] text-tomato hover:text-red-600 transition-colors border-b border-tomato pb-1`}>
              WATCHDOG
            </Link>
          </nav>

          {/* Search and Dark Mode */}
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH REPORTS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-64 px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-zinc-50 border-zinc-900 text-zinc-900 placeholder-zinc-400'} focus:outline-none focus:border-tomato transition-colors`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className={`w-4 h-4 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="butt" strokeLinejoin="miter" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 border-2 ${isDarkMode ? 'border-zinc-700 hover:border-tomato' : 'border-zinc-900 hover:border-tomato'} transition-colors`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-tomato" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-tomato" fill="currentColor" viewBox="0 0 20 20">
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
