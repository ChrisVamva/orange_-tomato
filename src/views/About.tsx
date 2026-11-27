import { Link } from 'react-router-dom';
import { SubscribeSection } from '../components/SubscribeSection';

/**
 * About page — top-level section at /about.
 *
 * Dark mode is handled by hand-written `.dark` rules on `.about-*` classes in
 * index.css: the theme toggle flips the `dark` class on <html>, while Tailwind's
 * `dark:` variant compiles to the OS prefers-color-scheme media query and would
 * track the wrong signal.
 *
 * The subscribe form sits in the reading column, directly under the newsletter
 * intro copy — it is the same
 * SubscribeSection the front page uses (same Kit endpoint, hidden-iframe POST,
 * and status handling), restyled in-column by the
 * `.about-page .subscribe-band` rules in index.css.
 *
 * Copy approved by Chris on 2026-11-19 (revision of the 2026-11-18 copy). Source:
 * Editorial Audits SEO and Personality/Plan/Done/About/2026-11-19 About Page Copy Revision.md
 */

const PORTRAIT_SRC = '/ABOUT/Thoughtful-Orange-Tomato-Tech-Portrait-V2.webp';
const PORTRAIT_ALT =
  'A woman in round green sunglasses and a mustard hoodie and a man in a dark sweater sit chin-on-hand at a book-filled study desk beside a small tomato-headed robot, with an Orange Tomato chalkboard behind them.';

const START_HERE: { to: string; title: string; description: string }[] = [
  {
    to: '/magazine/volume-1',
    title: 'Orange Tomato Magazine — Volume 1',
    description:
      'The four Deep Dives in one curated issue, in reader-journey order — how a cited score is judged, what a system carries forward, who authorized it to act, and who must act when it fails. Free 47-page PDF included.',
  },
  {
    to: '/articles/deepseek-deepinfer-open-source',
    title: 'What Did DeepSeek Actually Open-Source?',
    description:
      'I opened the repository and read the README. What\u2019s there, what\u2019s withheld, and why both of those sentences are true at once.',
  },
];

export const About = () => {
  return (
    <>
      <div className="about-page max-w-3xl mx-auto px-6 sm:px-8 py-16">
        <h1 className="about-title text-4xl sm:text-5xl font-black tracking-tight uppercase italic mb-10">
          About
        </h1>

        <img
          src={PORTRAIT_SRC}
          alt={PORTRAIT_ALT}
          className="about-portrait w-full mb-10"
          width={1104}
          height={975}
          fetchPriority="high"
          decoding="async"
        />

        {/* ── Personal opening ── */}
        <p className="about-lead">Hi, I&rsquo;m Chris.</p>

        <p>
          I believe people should use artificial intelligence on their own terms.
          Not the way it&rsquo;s been marketed. Not the version of success someone
          else packaged for them. On their terms&thinsp;&mdash;&thinsp;to satisfy
          their creative instincts, to expand what they know, to improve their
          lives by their own definition of improvement.
        </p>

        <p className="about-accent">
          That belief is what Orange Tomato is built on.
        </p>

        {/* ── What OT does ── */}
        <p>
          I report on AI tools and agentic systems&thinsp;&mdash;&thinsp;what they
          are, what they actually do, where they hold up and where they break. I do
          this accurately and I do it deeply, because superficial coverage
          doesn&rsquo;t give anyone real footing. If you&rsquo;re going to build
          with something, you need to understand it. Not the announcement. The
          actual thing.
        </p>

        <p>
          I work with these systems every day&thinsp;&mdash;&thinsp;building,
          prompting, designing the systems they operate inside, watching where they
          fail. When I write about an AI claim, I&rsquo;ve usually bumped into
          something like it already: a model that fabricated a source, a benchmark
          that shifted under a score, an agent that acted outside its instructions.
          I trace claims to primary sources, mark what the evidence supports, note
          what remains unknown, and revisit when things change. You can check the
          method in the work itself.
        </p>

        {/* ── Why it matters ── */}
        <p className="about-accent">
          But the reporting is not the destination. It&rsquo;s the foundation.
        </p>

        <p>
          When you understand what a tool actually does, you can make something
          with it that is yours: your medium, your system, your work. That&rsquo;s
          what this site is for. The reporting gives you the footing to decide what
          to build, what to trust, and what remains yours to decide.
        </p>

        <p>
          People will want different things, and that range is the point.
          Understanding these tools well enough to create with them, not just
          consume what others make, is where it starts.
        </p>

        <p>
          This is not the end of the road. For me or for you.
        </p>

        <p className="about-accent">It&rsquo;s the beginning.</p>

        {/* ── Who this is for ── */}
        <h2 className="about-section-heading">Who this is for</h2>

        <p>
          If you&rsquo;re building with AI and want to understand your tools beyond
          the surface&thinsp;&mdash;&thinsp;what they deliver, what they
          don&rsquo;t, what you still have to decide&thinsp;&mdash;&thinsp;this is
          for you. If you&rsquo;re curious about where agentic systems are heading
          and want to think alongside someone working inside
          them&thinsp;&mdash;&thinsp;stay. If you have something you want to make
          and you need the honest footing to
          start&thinsp;&mdash;&thinsp;you&rsquo;re in the right place.
        </p>

        {/* ── Start here ── */}
        <h2 className="about-section-heading">Start here</h2>

        <ul className="about-start-here">
          {START_HERE.map(({ to, title, description }) => (
            <li key={to}>
              <Link to={to} className="about-start-here-link">
                {title}
              </Link>
              <span className="about-start-here-desc">
                &thinsp;&mdash;&thinsp;{description}
              </span>
            </li>
          ))}
        </ul>

        {/* ── Newsletter ── */}
        <h2 className="about-section-heading">Go deeper</h2>

        <p>
          The Deep Dives are where the longer investigations
          live&thinsp;&mdash;&thinsp;source-traced, dated, and revisited when the
          evidence moves. Subscribe to the newsletter and they come to you.
        </p>

        {/* Same form as the front page, in-column: see the
            `.about-page .subscribe-band` rules in index.css. */}
        <SubscribeSection />
      </div>
    </>
  );
};
