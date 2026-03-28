

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { PostDetail } from './views/PostDetail';
import { Watchdog } from './pages/Watchdog';
import { posts } from './data/posts';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'true');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'} font-sans selection:bg-tomato selection:text-white`}>
        <Header 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={<Home posts={posts} searchTerm={searchTerm} isDarkMode={isDarkMode} />} 
          />
          <Route 
            path="/post/:id" 
            element={<PostDetail isDarkMode={isDarkMode} />} 
          />
          <Route 
            path="/watchdog" 
            element={<Watchdog isDarkMode={isDarkMode} />} 
          />
        </Routes>
        
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;