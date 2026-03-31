import { useState } from 'react';
import { Link } from 'react-router-dom';
import { watchdogEntries } from '../data/watchdog';

export const Watchdog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  const filteredEntries = watchdogEntries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        entry.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'all' || entry.threatLevel === filterLevel;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F1] dark:bg-[#0D0D0D] text-[#0D0D0D] dark:text-white">
      {/* Header */}
      <div className="border-b-4 border-black dark:border-orange-500">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase mb-4 text-black dark:text-white">
            WATCHDOG REGISTRY
          </h1>
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#0D0D0D] dark:text-gray-300 max-w-3xl">
            Identified threats to legacy infrastructure. Real-time monitoring of autonomous agents disrupting web automation.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest mb-2 text-[#0D0D0D] dark:text-gray-400">
              SEARCH TOOLS
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, description, or category..."
              className="input-brutalist w-full px-4 py-3 text-[#0D0D0D] dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest mb-2 text-[#0D0D0D] dark:text-gray-400">
              THREAT LEVEL
            </label>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="input-brutalist w-full px-4 py-3 text-[#0D0D0D] dark:text-white"
            >
              <option value="all">All Levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <span className="text-sm font-bold uppercase tracking-widest text-[#0D0D0D] dark:text-gray-400">
            {filteredEntries.length} TOOLS FOUND
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => {
            const dossierPath = entry.id === 'browser-use-026' ? '/watchdog/browser-use-026' : 
                             entry.id === 'skyvern-001' ? '/watchdog/skyvern-001' : 
                             `/watchdog/${entry.id}`;
            
            return (
              <Link 
                key={entry.id} 
                to={dossierPath}
                className="brutalist-card bg-[#F5F5F1] dark:bg-[#1a1a1a] p-6 group"
              >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-black tracking-tight uppercase mb-2 text-black dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                    {entry.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-bold ${
                    entry.threatLevel === 'critical' ? 'threat-critical' :
                    entry.threatLevel === 'high' ? 'threat-high' :
                    entry.threatLevel === 'medium' ? 'threat-medium' :
                    'threat-low'
                  }`}>
                    {entry.threatLevel.toUpperCase()}
                  </span>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-3xl font-black" style={{ color: '#8B0000' }}>
                    {entry.tomatoScore}/10
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0D0D0D] dark:text-gray-400">
                    TOMATO SCORE
                  </div>
                </div>
              </div>

              {/* Disruption */}
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-2">
                  DISRUPTION VECTOR
                </h4>
                <p className="text-sm leading-relaxed text-[#0D0D0D] dark:text-gray-300">
                  {entry.disruption}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4 text-[#0D0D0D] dark:text-gray-300 line-clamp-3">
                {entry.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="border-2 border-black dark:border-orange-500 p-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0D0D0D] dark:text-gray-400">
                    CATEGORY
                  </div>
                  <div className="text-sm font-black uppercase text-black dark:text-white">
                    {entry.category}
                  </div>
                </div>
                <div className="border-2 border-black dark:border-orange-500 p-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0D0D0D] dark:text-gray-400">
                    STATUS
                  </div>
                  <div className="text-sm font-black uppercase text-black dark:text-white">
                    {entry.status}
                  </div>
                </div>
                <div className="border-2 border-black dark:border-orange-500 p-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0D0D0D] dark:text-gray-400">
                    ESTABLISHED
                  </div>
                  <div className="text-sm font-black uppercase text-black dark:text-white">
                    {entry.founded}
                  </div>
                </div>
                <div className="border-2 border-black dark:border-orange-500 p-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0D0D0D] dark:text-gray-400">
                    UPDATED
                  </div>
                  <div className="text-sm font-black uppercase text-black dark:text-white">
                    {entry.lastUpdated}
                  </div>
                </div>
              </div>

              {/* Tech DNA */}
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#0D0D0D] dark:text-gray-400 mb-2">
                  TECH DNA
                </h4>
                <div className="flex flex-wrap gap-1">
                  {entry.techDNA.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-mono border border-black dark:border-orange-500 text-[#0D0D0D] dark:text-gray-300"
                    >
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                  {entry.techDNA.length > 4 && (
                    <span className="px-2 py-1 text-xs font-mono border border-black dark:border-orange-500 text-[#0D0D0D] dark:text-gray-300">
                      +{entry.techDNA.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t-2 border-black dark:border-orange-500 pt-3 flex justify-between items-center">
                <span className="text-xs font-mono text-[#0D0D0D] dark:text-gray-400">
                  ID: {entry.id.toUpperCase()}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                  ANALYZE →
                </span>
              </div>
            </Link>
            );
          })}
        </div>

        {/* No Results */}
        {filteredEntries.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-black dark:text-white">
              NO THREATS FOUND
            </h3>
            <p className="text-[#0D0D0D] dark:text-gray-300">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
