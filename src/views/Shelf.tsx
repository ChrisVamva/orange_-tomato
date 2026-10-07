interface ShelfProps {
  isDarkMode: boolean;
}

export const Shelf = ({ isDarkMode }: ShelfProps) => {
  return (
    <div className="max-w-3xl mx-auto px-8 py-32 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-6">
        Under reconstruction
      </p>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 mb-8">
        A small shelf of deep-dives is coming.
      </h2>
      <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        Orange Tomato is being rebuilt as a magazine of finished, evidence-grounded
        deep-dives — for readers who are optimistic about the future, but refuse to
        be fooled into it. Every number traceable. What can't be verified, said so.
      </p>
    </div>
  );
};
