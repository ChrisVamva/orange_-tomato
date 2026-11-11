import { useEffect, useSyncExternalStore } from 'react';
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

// Theme lives in a tiny external store so the first render is deterministic:
// the server snapshot is always 'light', and the client re-reads the saved
// preference after hydration without a setState-in-effect or markup mismatch.
let currentTheme: boolean | null = null;
const themeListeners = new Set<() => void>();

function readTheme(): boolean {
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme) return savedTheme === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function subscribeTheme(listener: () => void): () => void {
  themeListeners.add(listener);
  return () => {
    themeListeners.delete(listener);
  };
}

function getThemeSnapshot(): boolean {
  if (currentTheme === null) currentTheme = readTheme();
  return currentTheme;
}

function getThemeServerSnapshot(): boolean {
  return false;
}

function setTheme(value: boolean): void {
  currentTheme = value;
  localStorage.setItem('darkMode', value.toString());
  document.documentElement.classList.toggle('dark', value);
  themeListeners.forEach((listener) => listener());
}

export function RouteTree() {
  const isDarkMode = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setTheme(!isDarkMode);
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
