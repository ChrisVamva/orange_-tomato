import { Link } from 'react-router-dom';
import { watchdogEntries } from '../data/watchdog';

export default function Intelligence() {
  // Get top 2 entries for side intelligence
  const sideArticles = watchdogEntries.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F5F5F1] dark:bg-[#0D0D0D]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8">
        {/* The Manifesto: Featured Left */}
        <div className="lg:col-span-2 brutalist-card bg-[#F5F5F1] p-12 flex flex-col justify-between aspect-video">
          <div className="space-y-6">
            <span className="bg-black text-white px-3 py-1 font-mono text-sm font-bold uppercase">EDITORIAL // MANIFESTO</span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-black dark:text-white">
              THE DOM IS DEAD
            </h1>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[0.9] text-orange-500 dark:text-orange-400 mb-4">
              Agents Navigate Outside of Tree
            </h2>
            <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-2xl text-[#0D0D0D] dark:text-gray-300">
              We are tracking the tectonic shift in web automation. Traditional DOM manipulation is obsolete. Browser-use, vision-based AI agents now execute complex workflows through natural language commands, rendering legacy selectors irrelevant.
            </p>
            <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-2xl text-[#0D0D0D] dark:text-gray-300">
              We monitor 10 critical tools threatening to replace entire categories of web infrastructure. Each scored for threat level and market impact.
            </p>
          </div>
          <div className="border-t-4 border-black pt-4 mt-8 flex justify-between font-mono font-bold uppercase text-[#0D0D0D] dark:text-gray-400">
            <span>BY JULES</span>
            <span>2026-03-31</span>
          </div>
        </div>

        {/* Intelligence Stack: Right Column */}
        <div className="flex flex-col gap-8">
          {sideArticles.map((article) => (
            <div key={article.id} className="brutalist-card bg-[#F5F5F1] p-6 flex-grow aspect-[4/3] lg:aspect-auto">
              <div className="space-y-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`text-2xl font-black ${
                      article.tomatoScore >= 9 ? 'text-red-600' :
                      article.tomatoScore >= 7 ? 'text-orange-500' :
                      article.tomatoScore >= 5 ? 'text-yellow-500' :
                      'text-gray-500'
                    }`}>
                      {article.tomatoScore}/10
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0D0D0D] dark:text-gray-400">
                      THREAT SCORE
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold ${
                    article.threatLevel === 'critical' ? 'threat-critical' :
                    article.threatLevel === 'high' ? 'threat-high' :
                    article.threatLevel === 'medium' ? 'threat-medium' :
                    'threat-low'
                  }`}>
                    {article.threatLevel.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-black tracking-tight uppercase mb-2 text-black dark:text-white">
                  {article.name}
                </h3>

                <p className="text-sm leading-relaxed mb-4 text-[#0D0D0D] dark:text-gray-300">
                  {article.disruption}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {article.techDNA.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-mono border border-black dark:border-orange-500 text-[#0D0D0D] dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t-2 border-black dark:border-orange-500 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0D0D0D] dark:text-gray-400">
                      [{article.category.toUpperCase()}]
                    </span>
                    <Link 
                      to={`/watchdog#${article.id}`}
                      className="text-xs font-bold uppercase tracking-widest text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
                    >
                      ANALYZE →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}