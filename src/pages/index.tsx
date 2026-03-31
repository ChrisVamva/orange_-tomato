import { Link } from 'react-router-dom';
import { latestIntelligence } from '../data/watchdog';

export default function Home() {
  const featuredArticle = {
    id: 'manifesto-001',
    title: 'THE DOM IS DEAD. AGENTS NAVIGATE OUTSIDE THE ACCESSIBILITY TREE.',
    snippet: 'We are tracking the tectonic shift in web automation. Legacy frameworks relied on fragile selectors. The new vanguard operates entirely on pure vision loops and spatial reasoning. Prepare for the disruption.',
    author: 'Jules',
    date: new Date().toISOString().split('T')[0],
    tags: ['EDITORIAL', 'MANIFESTO']
  };

  const sideArticles = latestIntelligence.slice(0, 2);

  return (
    <div className="flex flex-col gap-12 w-full">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        
        {/* Featured Left (66%) */}
        <Link to="#" className="lg:col-span-2 block group">
          <article className="h-full bg-[#8B0000] text-[#F5F5F1] border-4 border-black shadow-[8px_8px_0px_#000] p-8 md:p-12 flex flex-col justify-end transition-transform duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_12px_0px_#000] aspect-video">
            <div className="flex flex-wrap gap-2 mb-6">
              {featuredArticle.tags.map(tag => (
                <span key={tag} className="bg-black text-[#F5F5F1] px-3 py-1 text-sm font-bold font-mono tracking-widest uppercase">
                  {tag}
                </span>
              ))}
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-snug mb-6 border-b-8 border-black pb-4 inline-block max-w-fit">
              {featuredArticle.title}
            </h2>
            
            <p className="text-xl md:text-2xl font-bold max-w-3xl leading-snug antialiased">
              {featuredArticle.snippet}
            </p>
            
            <div className="flex justify-between items-center mt-8 pt-4 border-t-4 border-black font-mono font-bold text-sm uppercase">
              <span>BY {featuredArticle.author}</span>
              <span>{featuredArticle.date}</span>
            </div>
          </article>
        </Link>
        
        {/* Stacked Right (33%) */}
        <div className="flex flex-col gap-8 h-full">
          {sideArticles.map(article => (
            <Link to="#" key={article.id} className="block group flex-grow lg:h-1/2">
              <article className="h-full bg-[#F5F5F1] text-black border-4 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_12px_0px_#000] hover:bg-[#C5A059] aspect-[4/3] lg:aspect-auto">
                <div className="flex justify-between items-center border-b-4 border-black pb-2 mb-4 font-mono font-bold text-xs uppercase">
                  <span>BY {article.author}</span>
                  <span>{article.date}</span>
                </div>
                
                <h3 className="text-2xl font-black uppercase tracking-tight leading-snug mb-3 line-clamp-3">
                  {article.title}
                </h3>
                
                <p className="text-base font-medium flex-grow text-[#0F0F0F] antialiased leading-snug line-clamp-4">
                  {article.snippet}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {article.tags.map(tag => (
                    <span key={tag} className="bg-black text-[#F5F5F1] px-2 py-1 text-xs font-bold font-mono uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
