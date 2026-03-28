import { useState } from 'react';

interface FooterProps {
  isDarkMode: boolean;
}

export const Footer = ({ isDarkMode }: FooterProps) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className={`border-t-2 ${isDarkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Brand Section */}
          <div>
            <h3 className={`text-2xl font-black tracking-tighter uppercase italic text-tomato mb-4`}>
              Orange Tomato
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} mb-6 leading-relaxed`}>
              Systems Design Journal. Using autonomous agents and historical data to identify 
              the rare, high-value products hiding in plain sight.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-tomato rounded-full"></div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Build in Public • Est. 2026
              </span>
            </div>
          </div>

          {/* Subscribe Section */}
          <div>
            <h4 className={`text-sm font-black uppercase tracking-widest mb-6 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Subscribe to Analysis
            </h4>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <input
                type="email"
                placeholder="YOUR EMAIL..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-3 text-xs font-bold uppercase tracking-widest border-2 ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-zinc-50 border-zinc-900 text-zinc-900 placeholder-zinc-400'} focus:outline-none focus:border-tomato transition-colors`}
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-tomato text-white text-xs font-black uppercase tracking-widest border-2 border-tomato hover:bg-transparent hover:text-tomato transition-colors"
              >
                {isSubscribed ? 'SUBSCRIBED ✓' : 'SUBSCRIBE'}
              </button>
            </form>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-3 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Weekly reports • No spam • Unsubscribe anytime
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h4 className={`text-sm font-black uppercase tracking-widest mb-6 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Navigation
            </h4>
            <div className="space-y-3">
              <a href="#" className={`block text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400 hover:text-tomato' : 'text-zinc-500 hover:text-tomato'} transition-colors`}>
                Market Archive
              </a>
              <a href="#" className={`block text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400 hover:text-tomato' : 'text-zinc-500 hover:text-tomato'} transition-colors`}>
                Agent Logic
              </a>
              <a href="#" className={`block text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400 hover:text-tomato' : 'text-zinc-500 hover:text-tomato'} transition-colors`}>
                Philosophy
              </a>
              <a href="#" className={`block text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400 hover:text-tomato' : 'text-zinc-500 hover:text-tomato'} transition-colors`}>
                Methodology
              </a>
              <a href="#" className={`block text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400 hover:text-tomato' : 'text-zinc-500 hover:text-tomato'} transition-colors`}>
                About
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-16 pt-8 border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'} flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0`}>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
            © 2026 Orange Tomato Systems Design Journal
          </p>
          <div className="flex items-center space-x-6">
            <a href="#" className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500 hover:text-tomato' : 'text-zinc-400 hover:text-tomato'} transition-colors`}>
              Twitter
            </a>
            <a href="#" className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500 hover:text-tomato' : 'text-zinc-400 hover:text-tomato'} transition-colors`}>
              GitHub
            </a>
            <a href="#" className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500 hover:text-tomato' : 'text-zinc-400 hover:text-tomato'} transition-colors`}>
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
