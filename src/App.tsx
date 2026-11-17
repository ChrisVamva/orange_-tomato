import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Article } from './views/Article';
import agentDelegationArticle from './content/agent-delegation-boundaries.md?raw';
import hermesApprovalArticle from './content/hermes-approval-attention.md?raw';
import aiSystemBreachArticle from './content/ai-system-breach-boundaries.md?raw';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) return savedTheme === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

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
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : 'light'}`}>
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Article
                  isDarkMode={isDarkMode}
                  article={agentDelegationArticle}
                  pageTitle="What Should an AI Agent Be Allowed to Do? | Orange Tomato"
                  description="A simulated refund task shows why an AI agent's goal does not define its authority. Evidence, limits, and practical questions for delegation."
                />
              }
            />
            <Route
              path="/articles/hermes-approval-attention"
              element={
                <Article
                  isDarkMode={isDarkMode}
                  article={hermesApprovalArticle}
                  pageTitle="Who Decides When Hermes Interrupts You? | Orange Tomato"
                  description="A source audit of Hermes Agent v0.22.5 traces how dangerous-command approvals move between a detector, an auxiliary model, and a person."
                />
              }
            />
            <Route
              path="/articles/ai-system-breach-boundaries"
              element={
                <Article
                  isDarkMode={isDarkMode}
                  article={aiSystemBreachArticle}
                  pageTitle="When AI Systems Are Breached, Where Does the Failure Happen? | Orange Tomato"
                  description="IBM's breach findings and a recent incident show why the security boundaries around AI integrations matter."
                  previewLabel="Preview — unpublished; for Gate 3 review."
                />
              }
            />
          </Routes>
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;
