export const Freelancing = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className={`border-2 ${isDarkMode ? 'border-zinc-700 bg-zinc-800' : 'border-black bg-zinc-50'} p-16`}>
          <h1 className={`text-6xl font-black tracking-tighter mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            FREELANCING
          </h1>
          <p className={`text-xl font-bold uppercase tracking-widest text-tomato mb-8`}>
            Independent Systems Design
          </p>
          <div className={`space-y-4 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <p className="text-lg">
              Coming soon: Strategies, tools, and frameworks for successful freelance systems design work.
            </p>
            <p className="text-sm font-mono opacity-75">
              This section will cover client acquisition, project management, and scaling freelance operations.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
