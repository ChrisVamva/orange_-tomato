import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-tomato selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-100 py-6 px-8 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-black tracking-tighter uppercase italic text-tomato">
          Orange Tomato
        </h1>
        <div className="hidden md:flex space-x-12 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <a href="#" className="hover:text-tomato transition-colors">Market Archive</a>
          <a href="#" className="hover:text-tomato transition-colors">Agent Logic</a>
          <a href="#" className="hover:text-tomato transition-colors">Philosophy</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8 py-32">
        <header className="max-w-3xl mb-32">
          <p className="text-tomato font-mono text-xs mb-4 uppercase tracking-widest">Est. 2026 • Build in Public</p>
          <h2 className="text-8xl font-black tracking-tighter leading-[0.85] mb-12">
            Niche <span className="text-tomato">Research</span> for the New Economy.
          </h2>
          <p className="text-2xl text-zinc-400 font-medium leading-tight tracking-tight">
            Using autonomous agents and historical data to identify 
            the "Orange Tomatoes"—the rare, high-value products 
            hiding in plain sight.
          </p>
        </header>

        {/* The Niche Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          {[1, 2].map((i) => (
            <article key={i} className="group cursor-pointer">
              <div className="aspect-[16/10] bg-zinc-50 border border-zinc-100 mb-8 overflow-hidden relative">
                <div className="absolute inset-0 bg-tomato/0 group-hover:bg-tomato/5 transition-colors duration-500" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight mb-3 group-hover:text-tomato transition-colors">
                Market Gap #00{i}: Digital Stoicism
              </h3>
              <p className="text-zinc-500 leading-relaxed mb-6">
                Analyzing the rise of minimalist SaaS tools designed for the "Deep Work" era. 
                Integrating historical Stoic principles with 2026 UX standards.
              </p>
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-900 pb-1 w-fit group-hover:text-tomato group-hover:border-tomato transition-all">
                <span>Explore Dataset</span>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="py-24 px-8 border-t border-zinc-100 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-zinc-300">
        <p>© 2026 Chris Vamva</p>
        <p>Orchestrated by Gemini 3.1 & Jules</p>
      </footer>
    </div>
  );
}

export default App;