import { Link } from 'react-router-dom';
import { watchdogEntries } from '../data/watchdog';

export const Watchdog = () => {
  return (
    <div className="watchdog-page">
      <div className="page-header">
        <h2>WATCHDOG REGISTRY</h2>
        <p>IDENTIFIED THREATS TO LEGACY INFRASTRUCTURE.</p>
      </div>

      <div className="threat-grid">
        {watchdogEntries.map(entry => (
          <Link to={`/watchdog/${entry.id}`} key={entry.id} className={`neo-card level-${entry.threatLevel}`}>
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
          </Link>
        ))}
      </div>
    </div>
  );
}
