import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Intelligence from './views/Intelligence';
import { Watchdog } from './pages/Watchdog';
import { Journal } from './views/Journal';
import { Assets } from './views/Assets';
import { Freelancing } from './views/Freelancing';
import { PostDetail } from './views/PostDetail';
import Article from './views/Article'; // <-- NEW IMPORT

function App() {
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

  // Apply dark mode class to document and save to localStorage
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
      <div className={`min-h-screen ${isDarkMode ? 'dark' : 'light'}`}>
        <Header 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        <main>
          <Routes>
            <Route 
              path="/" 
              element={<Intelligence />} 
            />
            <Route 
              path="/journal" 
              element={<Journal isDarkMode={isDarkMode} />} 
            />
            <Route 
              path="/assets" 
              element={<Assets isDarkMode={isDarkMode} />} 
            />
            <Route 
              path="/freelancing" 
              element={<Freelancing isDarkMode={isDarkMode} />} 
            />
            <Route 
              path="/watchdog" 
              element={<Watchdog />} 
            />
            <Route 
              path="/post/:id" 
              element={<PostDetail isDarkMode={isDarkMode} />} 
            />
            <Route 
              path="/dossier/001" 
              element={<Article />} 
            />
          </Routes>
        </main>
        
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;