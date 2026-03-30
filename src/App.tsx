import { watchdogEntries, aiObservations } from './data/watchdog';

function App() {
  return (
    <div className="brutalist-container">
      <header className="brutalist-header">
        <div className="title-container">
          <h1>ORANGE TOMATO</h1>
        </div>
        <h2>MARKETPLACE NICHE NOTES HAVE BEEN TERMINATED</h2>
        <div className="ticker-wrap">
          <div className="ticker">
            {aiObservations.map(obs => (
              <span key={obs.id}>
                [{obs.id}] {obs.title.toUpperCase()}: {obs.summary.toUpperCase()} +++&nbsp;
              </span>
            ))}
            {/* Duplicate for seamless infinite scrolling */}
            {aiObservations.map(obs => (
              <span key={`${obs.id}-clone`}>
                [{obs.id}] {obs.title.toUpperCase()}: {obs.summary.toUpperCase()} +++&nbsp;
              </span>
            ))}
          </div>
        </div>
      </header>

      <main>
        <div className="manifesto">
          <h3>THE WATCHDOG REGISTRY</h3>
          <p>WARNING: THE DOM IS DEAD. SELECTORS ARE FRAGILE. OBSERVE THE THREATS BELOW.</p>
        </div>

        <div className="threat-grid">
          {watchdogEntries.map(entry => (
            <article key={entry.id} className={`neo-card level-${entry.threatLevel}`}>
              <div className="card-header">
                <h3>{entry.name.toUpperCase()}</h3>
                <span className="threat-badge">{entry.threatLevel}</span>
              </div>
              
              <div className="card-content">
                <div className="disruption-zone">
                  {entry.disruption.toUpperCase()}
                </div>
                
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">CATEGORY</span>
                    <span className="stat-value">{entry.category.toUpperCase()}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">STATUS</span>
                    <span className="stat-value">{entry.status.toUpperCase()}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">SCORE</span>
                    <span className="stat-value">{entry.tomatoScore}/10</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">EST.</span>
                    <span className="stat-value">{entry.founded}</span>
                  </div>
                </div>

                <p className="desc-text">{entry.description}</p>
                
                <div className="dna-container">
                  {entry.techDNA.map(dna => (
                    <span key={dna} className="dna-tag">#{dna.toUpperCase()}</span>
                  ))}
                </div>
              </div>
              
              <div className="card-footer">
                <span>ID: {entry.id.toUpperCase()}</span>
                <span>UPDATED: {entry.lastUpdated}</span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;