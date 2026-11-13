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
 */

const PORTRAIT_SRC = '/ABOUT/Thoughtful-Orange-Tomato-Tech-Portrait-V2.webp';
const PORTRAIT_ALT =
  'A woman in round green sunglasses and a mustard hoodie and a man in a dark sweater sit chin-on-hand at a book-filled study desk beside a small tomato-headed robot, with an Orange Tomato chalkboard behind them.';

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

        <p className="about-lead">Hi, I&rsquo;m Chris &mdash; science-fantasy author, journalist by background, and explorer of emerging technology.</p>

        <p>
          I&rsquo;m fascinated by generative AI and agentic systems: what they can do, how they work,
          and how they might reshape the way we think, create, and build.
        </p>

        <p>
          Orange Tomato is where I investigate these ideas. Expect thoughtful analysis, research-backed
          deep dives, and explorations beyond the hype.
        </p>

        <p className="about-cta-lead">Want to explore what&rsquo;s next?</p>

        <p>Subscribe to the newsletter and be the first to read my latest stories.</p>

        {/* Same form as the front page, in-column: see the
            `.about-page .subscribe-band` rules in index.css. */}
        <SubscribeSection />
      </div>
    </>
  );
};
