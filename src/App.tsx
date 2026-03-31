import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages';
import WatchdogRegistry from './pages/Watchdog';
import { aiObservations } from './data/watchdog';

function App() {
  return (
    <Router>
      <div className="brutalist-container">
        <header className="main-header">
          {/* Classification bar */}
          <div className="classification-bar">
            TOP SECRET // EYES ONLY // ORANGE TOMATO INTELLIGENCE DIRECTORATE
          </div>

          <div className="header-top">
            <Link to="/" className="logo-container">
              <div className="logo-reticle">
                {/* Slashed Tomato Icon */}
                <svg className="logo-icon" viewBox="0 0 48 48" width="42" height="42" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="26" r="14" fill="#FF4500"/>
                  <ellipse cx="19" cy="21" rx="5" ry="3.5" fill="#FF6A33" opacity="0.5"/>
                  <path d="M24 12 C24 15 24 16 24 16" stroke="#4A7C2E" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M24 14 C21 11 18 11 16 12.5 C18 12.5 21 13.5 24 14Z" fill="#5A9E3A"/>
                  <path d="M24 14 C27 11 30 11 32 12.5 C30 12.5 27 13.5 24 14Z" fill="#4A8C2E"/>
                  <line x1="16" y1="34" x2="32" y2="18" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round"/>
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

          {/* Classification bar bottom */}
          <div className="classification-bar classification-bar--alt">
            CLASSIFICATION: ΔELTA-7 // AUTOMATION THREAT MONITORING // LAST SWEEP: {new Date().toISOString().split('T')[0]}
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