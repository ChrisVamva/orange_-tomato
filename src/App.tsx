import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages';
import WatchdogRegistry from './pages/Watchdog';
import { aiObservations } from './data/watchdog';

function App() {
  return (
    <Router>
      <div className="brutalist-container">
        <header className="main-header">
          <div className="header-top">
            <Link to="/" className="logo-container">
              <div className="logo-reticle">
                <svg className="logo-icon" viewBox="0 0 48 48" width="42" height="42" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="24" cy="28" rx="18" ry="16" fill="#FF4500"/>
                  <ellipse cx="18" cy="22" rx="6" ry="4" fill="#FF6A33" opacity="0.6"/>
                  <path d="M24 12 C24 16 24 18 24 18" stroke="#4A7C2E" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M24 14 C20 10 16 10 14 12 C16 12 20 13 24 14Z" fill="#5A9E3A"/>
                  <path d="M24 14 C28 10 32 10 34 12 C32 12 28 13 24 14Z" fill="#4A8C2E"/>
                  <path d="M24 13 C22 8 18 6 16 7 C18 9 22 12 24 13Z" fill="#6AAE4A"/>
                </svg>
                <span className="logo-text">ORANGE TOMATO</span>
              </div>
            </Link>
            <nav className="main-nav">
              <Link to="/watchdog" className="brutalist-nav-link">
                THE WATCHDOG REGISTRY
              </Link>
            </nav>
          </div>
          
          <div className="ticker-wrap">
            <div className="ticker">
              {aiObservations.map(obs => (
                <span key={obs.id}>
                  [{obs.id}] {obs.title.toUpperCase()}: {obs.summary.toUpperCase()} +++&nbsp;
                </span>
              ))}
              {aiObservations.map(obs => (
                <span key={`${obs.id}-clone`}>
                  [{obs.id}] {obs.title.toUpperCase()}: {obs.summary.toUpperCase()} +++&nbsp;
                </span>
              ))}
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchdog" element={<WatchdogRegistry />} />
            <Route path="/watchdog/:id" element={<div className="placeholder"><h2>INTELLIGENCE FEED TBD</h2><p>Article dynamically loaded here.</p></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;