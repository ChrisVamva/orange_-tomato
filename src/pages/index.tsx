import { latestIntelligence } from '../data/watchdog';

export default function Home() {
  return (
    <div className="magazine-layout">
      <section className="manifesto-featured">
        <div className="manifesto-content">
          <h1>THE MANIFESTO</h1>
          <h2>THE DOM IS DEAD. AGENTS NAVIGATE OUTSIDE THE ACCESSIBILITY TREE.</h2>
          <p>
            We are tracking the tectonic shift in web automation. 
            Legacy frameworks relied on fragile selectors. 
            The new vanguard operates entirely on pure vision loops and spatial reasoning.
            Prepare for the disruption.
          </p>
        </div>
      </section>

      <section className="intelligence-section">
        <div className="section-header">
          <h3>LATEST INTELLIGENCE</h3>
          <div className="section-line"></div>
        </div>
        
        <div className="intelligence-grid">
          {latestIntelligence.map(article => (
            <article key={article.id} className="intel-card">
              <div className="intel-meta">
                <span className="intel-author">BY {article.author.toUpperCase()}</span>
                <span className="intel-date">{article.date}</span>
              </div>
              <h4>{article.title.toUpperCase()}</h4>
              <p>{article.snippet}</p>
              <div className="intel-tags">
                {article.tags.map(tag => (
                  <span key={tag} className="intel-tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
