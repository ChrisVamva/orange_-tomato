import { Link } from 'react-router-dom';
import { watchdogEntries } from '../data/watchdog';

export const Home = ({ isDarkMode }: { isDarkMode: boolean }) => {
  searchTerm: string;
  isDarkMode: boolean;
}

export const Home = ({ posts, searchTerm, isDarkMode }: HomeProps) => {
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-8 py-32">
        {/* Hero Section */}
        <header className="max-w-4xl mb-32">
          <p className="text-tomato font-mono text-xs mb-4 uppercase tracking-widest">
            Est. 2026 • Build in Public
          </p>
          <h1 className={`text-7xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-12 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            Niche <span className="text-tomato">Research</span> for the New Economy
          </h1>
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} font-medium leading-tight tracking-tight mb-8`}>
            Using autonomous agents and historical data to identify 
            the "Orange Tomatoes"—the rare, high-value products 
            hiding in plain sight.
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-tomato rounded-full"></div>
              <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {filteredPosts.length} Reports Published
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border-2 border-tomato rounded-full"></div>
              <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {featuredPosts.length} Featured Analysis
              </span>
            </div>
          </div>
        </header>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-32">
            <h2 className={`text-sm font-black uppercase tracking-widest mb-12 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Featured Reports
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24">
              {featuredPosts.map((post) => (
                <Link key={post.id} to={`/post/${post.id}`} className="group">
                  <article className="cursor-pointer">
                    <div className={`aspect-[16/10] ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-50'} border-2 ${isDarkMode ? 'border-zinc-700' : 'border-zinc-900'} mb-8 overflow-hidden relative`}>
                      <div className={`absolute inset-0 bg-tomato/0 group-hover:bg-tomato/10 transition-colors duration-500`} />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-tomato text-white text-[10px] font-black uppercase tracking-widest">
                          FEATURED
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {post.category.replace('-', ' ')}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        •
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {post.readTime} MIN READ
                      </span>
                    </div>
                    <h3 className={`text-3xl font-bold tracking-tight mb-3 ${isDarkMode ? 'text-white group-hover:text-tomato' : 'text-zinc-900 group-hover:text-tomato'} transition-colors`}>
                      {post.title}
                    </h3>
                    <p className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} leading-relaxed mb-6`}>
                      {post.subtitle}
                    </p>
                    <div className={`flex items-center space-x-2 text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-300 border-zinc-600' : 'text-zinc-900 border-zinc-900'} border-b-2 pb-1 w-fit group-hover:text-tomato group-hover:border-tomato transition-all`}>
                      <span>Read Analysis</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <section>
            <h2 className={`text-sm font-black uppercase tracking-widest mb-12 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              All Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {regularPosts.map((post) => (
                <Link key={post.id} to={`/post/${post.id}`} className="group">
                  <article className="cursor-pointer">
                    <div className={`aspect-[16/10] ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-50'} border ${isDarkMode ? 'border-zinc-700' : 'border-zinc-200'} mb-6 overflow-hidden relative`}>
                      <div className={`absolute inset-0 bg-tomato/0 group-hover:bg-tomato/5 transition-colors duration-500`} />
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {post.category.replace('-', ' ')}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        •
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {post.readTime} MIN
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold tracking-tight mb-2 ${isDarkMode ? 'text-white group-hover:text-tomato' : 'text-zinc-900 group-hover:text-tomato'} transition-colors`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} leading-relaxed mb-4`}>
                      {post.subtitle}
                    </p>
                    <div className={`flex items-center space-x-1 text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      <span>Continue →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-32">
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} mb-4`}>
              No reports found for "{searchTerm}"
            </h3>
            <p className={`${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Try searching for different keywords or browse all reports.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
