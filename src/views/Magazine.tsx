import { Link } from 'react-router-dom';

interface MagazineProps {
  isDarkMode: boolean;
}

const PDF_URL = '/magazine/volume-1-october-november-2026.pdf';

interface Feature {
  title: string;
  date: string;
  blurb: string;
  page: number;
  notebook: string;
}

const FEATURES: Feature[] = [
  {
    title: 'The Test Changed. What Did the Score Mean?',
    date: 'November 8, 2026',
    blurb: 'Measurement and proof: what a cited benchmark score establishes — and what it does not.',
    page: 4,
    notebook: 'https://orange-tomato.com/notebook/what-did-the-score-mean-notebook.html',
  },
  {
    title: 'What the Agent Remembers',
    date: 'November 11, 2026',
    blurb: 'Memory and upkeep: what a system carries forward between questions, and the upkeep that earns trust.',
    page: 16,
    notebook: 'https://orange-tomato.com/notebook/what-the-agent-remembers-notebook.html',
  },
  {
    title: 'Who Authorized the Agent?',
    date: 'November 8, 2026',
    blurb: 'Delegation and authority: the chain behind an agent’s actions — who gave permission, and where the boundary failed.',
    page: 27,
    notebook: 'https://orange-tomato.com/notebook/who-authorized-the-agent-notebook.html',
  },
  {
    title: 'When Systems Fail',
    date: 'November 12, 2026',
    blurb: 'Responsibility across system boundaries: who holds each fix when a system fails.',
    page: 38,
    notebook: 'https://orange-tomato.com/notebook/when-systems-fail-notebook.html',
  },
];

export const Magazine = ({ isDarkMode }: MagazineProps) => {
  const muted = isDarkMode ? 'text-zinc-400' : 'text-zinc-600';
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-3">
        October–November 2026
      </p>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 mb-8">
        Orange Tomato Magazine — Volume 1
      </h1>
      <p className={`mb-6 text-lg leading-relaxed ${muted}`}>
        A curated light edition of four October–November 2026 Deep Dives, in reader-journey order:
        from how a cited score is judged, through what a system carries forward and who authorized
        it to act, to who must act when it fails. Each feature stands on its own evidence, dated
        at inspection. These four Deep Dives now live here; their former pages redirect to this issue.
      </p>
      <p className="mb-12">
        <a
          href={PDF_URL}
          className="btn-brutalist"
          download="orange-tomato-magazine-vol-1-october-november-2026.pdf"
        >
          Download the issue (PDF · 47 pages · 22.6 MB)
        </a>
      </p>
      <h2 className={`text-2xl font-black tracking-tight uppercase italic mb-6 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
        In this issue
      </h2>
      <ol className="space-y-8 mb-12">
        {FEATURES.map((feature, index) => (
          <li
            key={feature.title}
            className="border-l-4 border-orange-500 pl-6"
          >
            <p className={`text-xs font-bold uppercase tracking-widest ${muted} mb-1`}>
              {index + 1} · {feature.date} · PDF p. {feature.page}
            </p>
            <h3 className={`text-xl font-black tracking-tight leading-snug ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
              {feature.title}
            </h3>
            <p className={`mt-2 leading-relaxed ${muted}`}>{feature.blurb}</p>
            <p className="mt-2">
              <a
                href={feature.notebook}
                className="font-bold text-orange-500 dark:text-orange-400 hover:underline focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-2"
              >
                Companion notebook
              </a>
            </p>
          </li>
        ))}
      </ol>
      <h2 className={`text-2xl font-black tracking-tight uppercase italic mb-6 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
        Sources and method
      </h2>
      <p className={`leading-relaxed ${muted}`}>
        Every feature closes with its own sources-and-method note and its companion notebook link
        inside the PDF. For the latest reporting, see the{' '}
        <Link
          to="/"
          className="font-bold text-orange-500 dark:text-orange-400 hover:underline focus-visible:outline-3 focus-visible:outline-orange-500 focus-visible:outline-offset-2"
        >
          front page
        </Link>
        .
      </p>
    </div>
  );
};
