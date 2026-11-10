import { useState, type FormEvent } from 'react';

/**
 * Subscribe band — homepage, directly under the sticky header.
 *
 * Posts natively to Kit (ConvertKit): the form's action is the Kit form's
 * HTML-embed URL and the response lands in a hidden iframe, so the reader
 * never leaves the page. A browser form POST is not subject to CORS, which is
 * why no Worker or API key is involved. While SUBSCRIBE_ENDPOINT is empty the
 * form validates the address but reports that subscriptions are not connected
 * — it never pretends an address was saved.
 *
 * The input's name must stay `email_address` (what Kit's endpoint reads), and
 * SUBSCRIBE_ENDPOINT is the form's action URL from Kit's HTML embed (form
 * id 10169839); probe-verified against the live endpoint: 302 → /forms/success.
 */
const SUBSCRIBE_ENDPOINT = 'https://app.kit.com/forms/10169839/subscriptions';

type Status = { kind: 'idle' | 'invalid' | 'unconnected' | 'success'; message: string };

const IDLE: Status = { kind: 'idle', message: '' };

/** Status tones live in index.css (.subscribe-status…) because the site's dark
 *  toggle drives hand-written `.dark` rules, not Tailwind's `dark:` variant. */
const STATUS_MODIFIER: Record<Status['kind'], string> = {
  idle: '',
  unconnected: '',
  invalid: ' subscribe-status--error',
  success: ' subscribe-status--success',
};

export const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>(IDLE);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      event.preventDefault();
      setStatus({ kind: 'invalid', message: 'That address does not look right — check it and try again.' });
      return;
    }
    if (!SUBSCRIBE_ENDPOINT) {
      event.preventDefault();
      setStatus({ kind: 'unconnected', message: 'Subscriptions are not connected yet — the form goes live with the mailing list.' });
      return;
    }
    // Valid: let the native POST proceed to the hidden iframe. The address is
    // deliberately NOT cleared — React state updates race the browser's form
    // serialization, and clearing could submit an empty field.
    setStatus({ kind: 'success', message: "You're on the list! Welcome to Orange Tomato." });
  };

  return (
    <section aria-label="Subscribe" className="subscribe-band">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="subscribe-band-label text-xs font-bold uppercase tracking-widest">
            New deep dives, by email
          </p>
          <form
            action={SUBSCRIBE_ENDPOINT}
            method="post"
            target="ot-kit-subscribe"
            onSubmit={handleSubmit}
            className="mt-3 flex flex-col sm:flex-row gap-3"
            noValidate
          >
            <label htmlFor="subscribe-email" className="sr-only">
              Email address
            </label>
            <input
              id="subscribe-email"
              type="email"
              name="email_address"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status.kind !== 'idle') setStatus(IDLE);
              }}
              placeholder="Enter your email"
              autoComplete="email"
              className="input-brutalist w-full px-4 py-3 text-base"
            />
            <button type="submit" className="btn-brutalist shrink-0">
              Subscribe
            </button>
          </form>
          {/* Kit's response (302 → success page) lands here so the reader stays
              on the page; the endpoint's ALLOWALL framing header was verified. */}
          <iframe
            name="ot-kit-subscribe"
            title="Subscription confirmation"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          />
          <p
            role="status"
            aria-live="polite"
            className={`subscribe-status${STATUS_MODIFIER[status.kind]} mt-3 min-h-4 text-xs font-bold uppercase tracking-widest`}
          >
            {status.message}
          </p>
        </div>
      </div>
    </section>
  );
};
