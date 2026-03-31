import { Link } from 'react-router-dom';
import { watchdogEntries } from '../data/watchdog';
import originLab from '../assets/origin-lab.jpg.png';

export default function Intelligence() {
  const sideArticles = watchdogEntries.slice(0, 2);

  return (
    <div className="min-h-screen w-full relative bg-[#0D0D0D] overflow-x-hidden">
      {/* TITANIUM ANCHOR: FIXED BACKGROUND */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${originLab})`,
          opacity: 0.35
        }}
      />

      {/* CONTENT LAYER */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Header is global, so it should be in App.tsx or added here if missing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full p-4 md:p-8 max-w-7xl">
          {/* Featured Article */}
          <div className="lg:col-span-2 brutalist-card bg-[#F5F5F1] p-12 flex flex-col justify-between min-h-[500px]">
            <div className="space-y-6">
              <span className="bg-black text-white px-3 py-1 font-mono text-sm font-bold uppercase tracking-widest">
                EDITORIAL // MANIFESTO
              </span>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-black">
                The DOM is Dead.
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold uppercase text-[#FF4500] tracking-tight">
                Agents Navigate Outside the Tree.
              </h2>
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-black max-w-2xl">
                We are tracking the tectonic shift in web automation. Traditional DOM manipulation is obsolete. Browser-use, vision-based AI agents now execute complex workflows through natural language.
              </p>
            </div>
            <Link to="/dossier/001" className="mt-8 inline-block bg-black text-[#FF4500] font-mono font-bold px-8 py-4 uppercase tracking-widest hover:bg-[#FF4500] hover:text-black transition-colors duration-300 border-2 border-transparent hover:border-black">
              [ DECRYPT FULL DOSSIER  ]
            </Link>
            <div className="border-t-4 border-black pt-4 mt-8 flex justify-between font-mono font-bold uppercase text-black">
              <span>BY JULES</span>
              <span>2026-03-31</span>
            </div>
          </div>

          {/* Side Intelligence Stack */}
          <div className="flex flex-col gap-8">
            {sideArticles.map(article => (
              <div key={article.id} className="brutalist-card bg-[#F5F5F1] p-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="text-4xl font-black text-[#8B0000]">{article.tomatoScore}</div>
                    <span className="bg-black text-white px-2 py-0.5 text-xs font-bold uppercase">{article.status}</span>
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-black">{article.name}</h3>
                  <p className="text-sm font-medium leading-snug text-black">{article.description}</p>
                </div>
                <Link to={`/watchdog/${article.id}`} className="mt-6 text-sm font-bold uppercase text-[#FF4500] hover:underline flex justify-end">
                  ANALYZE →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
