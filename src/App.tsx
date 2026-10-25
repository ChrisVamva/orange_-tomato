import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Article } from './views/Article';
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) return savedTheme === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : 'light'}`}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Article isDarkMode={isDarkMode} />} />
            <Route path="/articles/hermes-approval-attention" element={<Article isDarkMode={isDarkMode} article="hermes" />} />
            <Route path="/articles/ai-system-breach-boundaries" element={<Article isDarkMode={isDarkMode} article="ai-breach" />} />
            <Route path="/articles/php2shell-vulnerability" element={<Article isDarkMode={isDarkMode} article="php2shell" />} />
            <Route path="/articles/minimax-m31-flash-inspectability" element={<Article isDarkMode={isDarkMode} article="minimax" />} />
            <Route path="/articles/revamp-ai-cloning" element={<Article isDarkMode={isDarkMode} article="revamp" />} />
            <Route path="/articles/mercury-3-diffusion-speed" element={<Article isDarkMode={isDarkMode} article="mercury" />} />
          </Routes>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}
export default App;