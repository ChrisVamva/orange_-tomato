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