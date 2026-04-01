import { Link } from 'react-router-dom';
import { watchdogEntries } from '../data/watchdog';

export const Landing = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-red-600';
    if (score >= 7) return 'text-orange-500';
    if (score >= 5) return 'text-yellow-500';
    return 'text-gray-500';
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-gray-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-white'} font-mono`}>
      {/* BRUTALIST HEADER */}
      <div className="border-b-4 border-tomato bg-tomato text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-white animate-pulse"></div>
              <h1 className="text-4xl font-black tracking-tighter">ORANGE TOMATO</h1>
            </div>
            <div className="text-sm font-bold">
              INTELLIGENCE REPORT // CLASSIFIED
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto p-8">
        {/* SUBHEADER */}
        <div className={`border-4 ${isDarkMode ? 'border-zinc-700 bg-zinc-800' : 'border-black bg-zinc-50'} p-8 mb-8`}>
          <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            AUTOMATION THREAT ASSESSMENT
          </h2>
          <p className={`text-lg font-bold uppercase tracking-widest text-tomato mb-4`}>
            {watchdogEntries.length} TOOLS MONITORED // REAL-TIME ANALYSIS
          </p>
          <p className={`${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'} font-mono`}>
            Continuous monitoring of automation platforms disrupting traditional workflows. 
            Each tool scored on market impact and threat level.
          </p>
        </div>

        {/* INTELLIGENCE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {watchdogEntries.map((entry, index) => (
            <div
              key={entry.id}
              className={`border-4 ${isDarkMode ? 'border-zinc-700 bg-zinc-800' : 'border-black bg-white'} p-6 hover:border-tomato transition-colors`}
            >
              {/* ENTRY HEADER */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`text-3xl font-black ${getScoreColor(entry.tomatoScore)}`}>
                    {entry.tomatoScore}/10
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      THREAT SCORE
                    </div>
                    <div className={`text-xs font-bold uppercase text-tomato mt-1`}>
                      #{index + 1}
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-bold ${getThreatColor(entry.threatLevel)}`}>
                  {entry.threatLevel.toUpperCase()}
                </span>
              </div>

              {/* TOOL NAME */}
              <h3 className={`text-xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {entry.name}
              </h3>

              {/* CATEGORY */}
              <div className="mb-3">
                <span className={`px-3 py-1 text-xs font-bold border-2 ${isDarkMode ? 'border-zinc-600 text-zinc-400' : 'border-black text-black'}`}>
                  [{entry.category.toUpperCase()}]
                </span>
              </div>

              {/* DISRUPTION */}
              <div className="mb-4">
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  DISRUPTION VECTOR:
                </h4>
                <p className={`text-sm leading-tight ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {entry.disruption}
                </p>
              </div>

              {/* DESCRIPTION */}
              <div className="mb-4">
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  ANALYSIS:
                </h4>
                <p className={`text-sm leading-tight ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {entry.description}
                </p>
              </div>

              {/* TECH DNA */}
              <div className="mb-4">
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  TECH DNA:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {entry.techDNA.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-xs font-mono border ${isDarkMode ? 'border-zinc-700 bg-zinc-900 text-zinc-400' : 'border-black bg-zinc-100 text-black'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* METADATA */}
              <div className={`grid grid-cols-2 gap-2 text-xs ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'} border-t-2 ${isDarkMode ? 'border-zinc-700' : 'border-black'} pt-3`}>
                <div>
                  <span className="font-bold">STATUS:</span> {entry.status.toUpperCase()}
                </div>
                <div>
                  <span className="font-bold">FOUNDED:</span> {entry.founded}
                </div>
                <div className="col-span-2">
                  <span className="font-bold">MARKET CAP:</span> {entry.marketCap || 'N/A'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER INTELLIGENCE */}
        <div className={`border-4 border-tomato ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-50'} p-8 mt-8`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-black mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                SYSTEM STATUS: ACTIVE
              </h3>
              <p className={`text-sm font-mono ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Continuous monitoring enabled • Last update: 2026-03-28
              </p>
            </div>
            <div className="text-right">
              <Link 
                to="/watchdog" 
                className="block px-6 py-3 bg-tomato text-white text-sm font-bold uppercase tracking-widest border-2 border-tomato hover:bg-transparent hover:text-tomato transition-colors"
              >
                ACCESS FULL DATABASE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
