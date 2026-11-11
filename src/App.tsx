import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RouteMetadata } from './components/RouteMetadata';
import { Article, ArticleNotFound } from './views/Article';
import { Posts } from './views/Posts';
import { DeepDives } from './views/DeepDives';
import { Archive } from './views/Archive';
import { Search } from './views/Search';
import { Tags } from './views/Tags';
import { About } from './views/About';

export function RouteTree() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    setIsDarkMode(savedTheme ? savedTheme === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches);
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode, themeReady]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <RouteMetadata />
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : 'light'}`}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Posts isDarkMode={isDarkMode} />} />
            <Route path="/articles/:slug" element={<Article isDarkMode={isDarkMode} />} />
            <Route path="/deep-dives" element={<DeepDives isDarkMode={isDarkMode} />} />
            <Route path="/archive" element={<Archive isDarkMode={isDarkMode} />} />
            <Route path="/search" element={<Search isDarkMode={isDarkMode} />} />
            <Route path="/tags" element={<Tags isDarkMode={isDarkMode} />} />
            <Route path="/tags/:tag" element={<Tags isDarkMode={isDarkMode} />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<ArticleNotFound />} />
          </Routes>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteTree />
    </BrowserRouter>
  );
}
