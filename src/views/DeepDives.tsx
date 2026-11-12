import { DEEP_DIVES } from '../content/articles';
import { DeepDiveCard } from '../components/DeepDiveCard';

interface DeepDivesProps {
  isDarkMode: boolean;
}

export const DeepDives = ({ isDarkMode }: DeepDivesProps) => {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 mb-12">
        Deep Dives
      </h1>
      <p className={`mb-12 max-w-3xl text-lg leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        The long pieces: connected stories, expanded research, and a companion notebook.
      </p>
      {DEEP_DIVES.length === 0 ? (
        <p
          className={`border-l-4 border-orange-500 pl-6 text-lg leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
        >
          The first Deep Dive is in production. It lands here.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-3">
          {DEEP_DIVES.map((entry, index) => (
            <DeepDiveCard key={entry.meta.slug} entry={entry} index={index} isDarkMode={isDarkMode} />
          ))}
        </div>
      )}
    </div>
  );
};
