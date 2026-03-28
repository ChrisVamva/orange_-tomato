import { useState, useMemo } from 'react';
import type { WatchdogEntry } from '../data/watchdog';
import { watchdogEntries, aiObservations } from '../data/watchdog';

export const Watchdog = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories = ['all', 'email', 'social', 'browser', 'logic', 'ai-agents'];
  const statuses = ['all', 'active', 'monitoring', 'declining', 'emerging'];

  const filteredEntries = useMemo(() => {
    return watchdogEntries.filter(entry => {
      const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entry.techDNA.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || entry.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-green-600';
      case 'monitoring': return 'border-yellow-500';
      case 'declining': return 'border-red-600';
      case 'emerging': return 'border-blue-500';
      default: return 'border-gray-400';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-white'} font-mono`}>
      {/* TOP SECRET HEADER */}
      <div className="border-b-4 border-tomato bg-tomato text-white p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-white animate-pulse"></div>
              <h1 className="text-2xl font-black tracking-tighter">WATCHDOG DATABASE</h1>
              <span className="text-xs font-bold uppercase tracking-widest bg-black px-2 py-1">
                TOP SECRET // EYES ONLY
              </span>
            </div>
            <div className="text-xs font-bold">
              CLASSIFICATION: ORANGE TOMATO // LEVEL 9
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* SEARCH AND FILTER CONTROLS */}
        <div className={`border-2 ${isDarkMode ? 'border-zinc-700 bg-zinc-800' : 'border-black bg-zinc-50'} p-6 mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                SEARCH DATABASE
              </label>
              <input
                type="text"
                placeholder="SCAN FOR ENTRIES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2 font-mono text-sm border-2 ${isDarkMode ? 'bg-zinc-900 border-zinc-600 text-white' : 'bg-white border-black text-black'} focus:outline-none focus:border-tomato`}
              />
            </div>
            
            <div>
              <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                FILTER CATEGORY
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-4 py-2 font-mono text-sm border-2 ${isDarkMode ? 'bg-zinc-900 border-zinc-600 text-white' : 'bg-white border-black text-black'} focus:outline-none focus:border-tomato`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'ALL CATEGORIES' : cat.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                FILTER STATUS
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`w-full px-4 py-2 font-mono text-sm border-2 ${isDarkMode ? 'bg-zinc-900 border-zinc-600 text-white' : 'bg-white border-black text-black'} focus:outline-none focus:border-tomato`}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'ALL STATUS' : status.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={`mt-4 pt-4 border-t-2 ${isDarkMode ? 'border-zinc-700' : 'border-black'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                RESULTS: {filteredEntries.length} / {watchdogEntries.length} ENTRIES
              </span>
              <span className={`text-xs font-bold uppercase tracking-widest text-tomato`}>
                DATABASE LAST UPDATED: 2026-03-28
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* MAIN GRID */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className={`border-2 ${getStatusColor(entry.status)} ${isDarkMode ? 'bg-zinc-800' : 'bg-white'} p-6 hover:border-tomato transition-colors`}
                >
                  {/* TOP SECTION - TOMATO SCORE */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className={`text-4xl font-black ${getScoreColor(entry.tomatoScore)} mb-1`}>
                        {entry.tomatoScore}/10
                      </div>
                      <div className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        TOMATO SCORE
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-bold ${getThreatColor(entry.threatLevel)}`}>
                        {entry.threatLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* ENTRY NAME */}
                  <h3 className={`text-xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {entry.name}
                  </h3>

                  {/* CATEGORY AND STATUS */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-bold border ${isDarkMode ? 'border-zinc-600 text-zinc-400' : 'border-black text-black'}`}>
                      [{entry.category.toUpperCase()}]
                    </span>
                    <span className={`text-xs font-bold uppercase ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
                      STATUS: {entry.status.toUpperCase()}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className={`text-sm mb-4 leading-tight ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    {entry.description}
                  </p>

                  {/* TECH DNA */}
                  <div className="mb-4">
                    <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      TECH DNA:
                    </div>
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
                  <div className={`grid grid-cols-2 gap-2 text-xs ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    <div>
                      <span className="font-bold">FOUNDED:</span> {entry.founded}
                    </div>
                    <div>
                      <span className="font-bold">MARKET CAP:</span> {entry.marketCap || 'N/A'}
                    </div>
                    <div className="col-span-2">
                      <span className="font-bold">LAST UPDATED:</span> {entry.lastUpdated}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI OBSERVATIONS SIDEBAR */}
          <div className="lg:col-span-1">
            <div className={`border-2 border-tomato ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-50'} p-6 sticky top-24`}>
              <h2 className={`text-lg font-black mb-4 text-tomato`}>
                AI OBSERVATIONS
              </h2>
              <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                NOTEBOOKLM ANALYSIS
              </p>

              <div className="space-y-4">
                {aiObservations.map((obs) => (
                  <div key={obs.id} className={`pb-4 border-b ${isDarkMode ? 'border-zinc-700' : 'border-zinc-300'}`}>
                    <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {obs.title}
                    </h3>
                    <p className={`text-xs leading-relaxed mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {obs.summary}
                    </p>
                    
                    <div className="space-y-1">
                      <div className={`text-xs font-bold uppercase ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
                        PATTERNS:
                      </div>
                      {obs.patterns.map((pattern, i) => (
                        <div key={i} className={`text-xs font-mono ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          • {pattern}
                        </div>
                      ))}
                    </div>

                    <div className={`mt-2 pt-2 border-t ${isDarkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
                          CONFIDENCE
                        </span>
                        <span className={`text-xs font-mono font-bold text-tomato`}>
                          {(obs.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-6 pt-4 border-t-2 border-tomato`}>
                <div className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  SYSTEM STATUS
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
                  <span className={`text-xs font-mono ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    AI MONITORING ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
