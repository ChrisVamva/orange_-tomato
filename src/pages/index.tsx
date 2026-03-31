import { Link } from 'react-router-dom';
import { latestIntelligence, watchdogEntries } from '../data/watchdog';

export default function Home() {
  const featuredArticle = {
    id: 'manifesto-001',
    title: 'THE DOM IS DEAD. AGENTS NAVIGATE OUTSIDE THE ACCESSIBILITY TREE.',
    snippet: 'We are tracking the tectonic shift in web automation. Legacy frameworks relied on fragile selectors. The new vanguard operates entirely on pure vision loops and spatial reasoning. Prepare for the disruption.',
    author: 'Jules',
    date: new Date().toISOString().split('T')[0],
    tags: ['EDITORIAL', 'MANIFESTO']
  };

  const sideArticles = latestIntelligence.length >= 2
    ? latestIntelligence.slice(0, 2)
    : watchdogEntries.slice(0, 2).map(entry => ({
        id: entry.id,
        title: entry.name,
        snippet: entry.disruption,
        author: 'Watchdog',
        date: entry.lastUpdated,
        tags: entry.techDNA.slice(0, 2).map(t => t.toUpperCase())
      }));

  return (
    <div className="flex flex-col gap-12 w-full">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        
        {/* Featured Left (66%) */}
        <Link to="#" className="lg:col-span-2 block group">
          <article className="h-full bg-[#1A1A1A] text-white border-4 border-[#FF4500] p-8 md:p-12 flex flex-col justify-end transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 aspect-video"
            style={{ boxShadow: '0 0 15px rgba(255, 69, 0, 0.3), 12px 12px 0px rgba(0,0,0,1)' }}>
            <div className="flex flex-wrap gap-2 mb-6">
              {featuredArticle.tags.map(tag => (
                <span key={tag} className="bg-[#FF4500] text-black px-3 py-1 text-sm font-bold font-mono tracking-widest uppercase">
                  {tag}
                </span>
              ))}
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-white"
              style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}>
              {featuredArticle.title}
            </h2>
            
            <p className="text-xl md:text-2xl font-medium max-w-3xl leading-snug antialiased text-gray-300">
              {featuredArticle.snippet}
            </p>
            
            <div className="flex justify-between items-center mt-8 pt-4 border-t-4 border-[#FF4500] font-mono font-bold text-sm uppercase text-[#FF4500]">
              <span>BY {featuredArticle.author}</span>
              <span>{featuredArticle.date}</span>
            </div>

            {/* Orange bottom accent bar */}
            <div className="w-full h-2 bg-[#FF4500] mt-6" />
          </article>
        </Link>
        
        {/* Stacked Right (33%) */}
        <div className="flex flex-col gap-6 h-full">
          {sideArticles.map(article => (
            <Link to="#" key={article.id} className="block group flex-grow lg:h-1/2">
              <article className="h-full bg-[#1A1A1A] text-white border-4 border-[#FF4500] p-6 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 aspect-[4/3] lg:aspect-auto"
                style={{ boxShadow: '0 0 15px rgba(255, 69, 0, 0.2), 12px 12px 0px rgba(0,0,0,1)' }}>
                <div className="flex justify-between items-center border-b-2 border-[#FF4500]/40 pb-2 mb-4 font-mono font-bold text-xs uppercase text-[#FF4500]">
                  <span>BY {article.author.toUpperCase()}</span>
                  <span>{article.date}</span>
                </div>
                
                <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-3 line-clamp-3 text-white"
                  style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}>
                  {article.title.toUpperCase()}
                </h3>
                
                <p className="text-base font-medium flex-grow text-gray-400 antialiased leading-snug line-clamp-4">
                  {article.snippet}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {article.tags.map(tag => (
                    <span key={tag} className="bg-[#FF4500]/20 text-[#FF4500] border border-[#FF4500]/50 px-2 py-1 text-xs font-bold font-mono uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Orange bottom accent bar */}
                <div className="w-full h-1.5 bg-[#FF4500] mt-4" />
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
