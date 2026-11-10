import { useEffect } from 'react';

/**
 * About page — top-level section at /about.
 *
 * Dark mode is handled by hand-written `.dark` rules on `.about-*` classes in
 * index.css: the theme toggle flips the `dark` class on <html>, while Tailwind's
 * `dark:` variant compiles to the OS prefers-color-scheme media query and would
 * track the wrong signal.
 */

const PORTRAIT_SRC = '/ABOUT/Thoughtful%20Orange%20Tomato%20Tech%20Portrait.png';
const PORTRAIT_ALT =
  'A bearded man at a book-filled desk beside a small tomato-headed robot, with an Orange Tomato chalkboard behind them.';

export const About = () => {
  useEffect(() => {
    document.title = 'About | Orange Tomato';
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        'Hi, I\u2019m Chris \u2014 science-fantasy author, journalist by background, and explorer of emerging technology.';
    }
  }, []);

  return (
    <div className="about-page max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="about-title text-4xl sm:text-5xl font-black tracking-tight uppercase italic mb-10">
        About
      </h1>

      <img
        src={PORTRAIT_SRC}
        alt={PORTRAIT_ALT}
        className="about-portrait w-full mb-10"
        width={1338}
        height={1176}
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
    </div>
  );
};
