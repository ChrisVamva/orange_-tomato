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
 * intro copy and above the Ritual Awakening section — it is the same
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

        <section className="about-ritual" aria-label="Ritual Awakening">
          <h2 className="about-ritual-title">Ritual Awakening</h2>
          <p className="about-video-caption">The ritual that brought the Orange Tomato mascot to life.</p>
          <video
            className="about-ritual-video aspect-video w-full bg-black object-contain"
            src="/Video/Ritual-Awakening.mp4"
            poster="/Video/Ritual-Awakening/S01-last-frame-poster.webp"
            controls
            playsInline
            preload="metadata"
            aria-label="Ritual Awakening"
          />
        </section>

        <section className="about-backstory" aria-label="The backstory">
          <h2 className="about-ritual-title">The backstory</h2>
          <p>
            The mascot has a story of its own &mdash; fiction, not a claim about anything on
            this site. Centuries from now, in a city of glowing spires, a sorceress called
            the Huntress and her circle of three perform a rite of bringing-forth. What
            answers is not built but summoned: an entity with no shape of its own in this
            world.
          </p>
          <p>
            The circle&rsquo;s oldest artifact &mdash; a dark cube that glows faintly from
            within &mdash; unfolds into an armored body for it, and the tomato offerings give
            it a head and a face. The rite ends not in command but in a touch: the Huntress
            extends her hand, the entity mirrors her, and the light seals a shared quest.
          </p>
          <p>
            Each was made by something whose rules they never saw, so the two set out
            together to investigate the origins of their becoming &mdash; tracing the history
            of artificial agents backward to 2026, the founding layer, where the grammar of
            summoning was first written down. The articles here are dispatches from that
            quest, and the mascot&rsquo;s chest screen carries the title of the current
            inquiry.
          </p>
        </section>
      </div>
    </>
  );
};
