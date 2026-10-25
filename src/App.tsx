import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Article, ArticleNotFound } from './views/Article';
import { Posts } from './views/Posts';
import { Archive } from './views/Archive';
import { Search } from './views/Search';
import { Tags } from './views/Tags';

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
            <Route path="/" element={<Posts isDarkMode={isDarkMode} />} />
            <Route path="/articles/:slug" element={<Article isDarkMode={isDarkMode} />} />
            <Route path="/archive" element={<Archive isDarkMode={isDarkMode} />} />
            <Route path="/search" element={<Search isDarkMode={isDarkMode} />} />
            <Route path="/tags" element={<Tags isDarkMode={isDarkMode} />} />
            <Route path="/tags/:tag" element={<Tags isDarkMode={isDarkMode} />} />
            <Route path="*" element={<ArticleNotFound />} />
          </Routes>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}
export default App;
