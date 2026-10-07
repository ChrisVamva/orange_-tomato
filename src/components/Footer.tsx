interface FooterProps {
  isDarkMode: boolean;
}

export const Footer = ({ isDarkMode }: FooterProps) => {
  return (
    <footer className={`border-t-2 ${isDarkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h3 className="text-xl font-black tracking-tighter uppercase italic text-orange-500 dark:text-orange-400">
            Orange Tomato
          </h3>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
            © 2026 Orange Tomato — Honest numbers about the future
          </p>
        </div>
      </div>
    </footer>
  );
};
