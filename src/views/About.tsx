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
 * Copy approved by Chris on 2026-11-18. Source:
 * Editorial Audits SEO and Personality/Plan/About/2026-11-18 About Page Draft — The Beginning.md
 */

const PORTRAIT_SRC = '/ABOUT/Thoughtful-Orange-Tomato-Tech-Portrait-V2.webp';
const PORTRAIT_ALT =
  'A woman in round green sunglasses and a mustard hoodie and a man in a dark sweater sit chin-on-hand at a book-filled study desk beside a small tomato-headed robot, with an Orange Tomato chalkboard behind them.';

const START_HERE: { to: string; title: string; description: string }[] = [
  {
    to: '/articles/who-authorized-the-agent',
    title: 'Who Authorized the Agent?',
    description:
      'Meta\u2019s AI assistant sent a stranger to someone\u2019s apartment. I follow the question of agent authority across four real surfaces: who gave permission, and where did the boundary fail?',
  },
  {
    to: '/articles/what-did-the-score-mean',
    title: 'The Test Changed. What Did the Score Mean?',
    description:
      'A model\u2019s score dropped from 55 to 46 overnight. The model hadn\u2019t changed\u2009\u2014\u2009the benchmark had. A clean case for how to read AI claims.',
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
          When you understand what a tool really does, you can make something with
          it that&rsquo;s yours. Something that reflects who you are. That&rsquo;s
          what happened to me. This site, the research behind it, the systems that
          run it&thinsp;&mdash;&thinsp;they became a kind of monument of who I am,
          and we&rsquo;re still growing together. I didn&rsquo;t set out to build
          that. It happened because I kept going, kept learning, and the tools kept
          evolving alongside me.
        </p>

        <p>I want that for the people who read this.</p>

        <p>
          Not the same thing I built&thinsp;&mdash;&thinsp;your thing. Your medium,
          your system, your work. People will want different things, and
          that&rsquo;s the point. What I know for certain is that understanding
          these tools deeply enough to create with them&thinsp;&mdash;&thinsp;not
          just consume what others make&thinsp;&mdash;&thinsp;that&rsquo;s where
          something real begins. A renaissance of what human diversity brings to
          light when people are genuinely empowered to create.
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
          live&thinsp;&mdash;&thinsp;source-traced, revisited, built to last.
          Subscribe to the newsletter and they come to you.
        </p>

        {/* Same form as the front page, in-column: see the
            `.about-page .subscribe-band` rules in index.css. */}
        <SubscribeSection />
      </div>
    </>
  );
};
