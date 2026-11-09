import { useState, type FormEvent } from 'react';

/**
 * Subscribe band — homepage, directly under the sticky header.
 *
 * Endpoint: set this to the mailing-list POST URL (Buttondown, MailerLite,
 * Mailchimp, Formspree, a Cloudflare Worker, …). While it is empty the form
 * validates the address but reports that subscriptions are not connected yet —
 * it never pretends an address was saved.
 */
const SUBSCRIBE_ENDPOINT = '';

type Status = { kind: 'idle' | 'invalid' | 'pending' | 'unconnected' | 'error' | 'success'; message: string };

const IDLE: Status = { kind: 'idle', message: '' };

/** Status tones live in index.css (.subscribe-status…) because the site's dark
 *  toggle drives hand-written `.dark` rules, not Tailwind's `dark:` variant. */
const STATUS_MODIFIER: Record<Status['kind'], string> = {
  idle: '',
  pending: '',
  unconnected: '',
  invalid: ' subscribe-status--error',
  error: ' subscribe-status--error',
  success: ' subscribe-status--success',
};

export const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>(IDLE);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus({ kind: 'invalid', message: 'That address does not look right — check it and try again.' });
      return;
    }
    if (!SUBSCRIBE_ENDPOINT) {
      setStatus({ kind: 'unconnected', message: 'Subscriptions are not connected yet — the form goes live with the mailing list.' });
      return;
    }
    setStatus({ kind: 'pending', message: 'Subscribing…' });
    try {
      const response = await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus({ kind: 'success', message: 'You are in. The next deep dive lands in your inbox.' });
      setEmail('');
    } catch {
      setStatus({ kind: 'error', message: 'Something went wrong on the way out — try again in a moment.' });
    }
  };

  return (
    <section aria-label="Subscribe" className="subscribe-band">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="subscribe-band-label text-xs font-bold uppercase tracking-widest">
            New deep dives, by email
          </p>
          <form onSubmit={handleSubmit} className="mt-3 flex flex-col sm:flex-row gap-3" noValidate>
            <label htmlFor="subscribe-email" className="sr-only">
              Email address
            </label>
            <input
              id="subscribe-email"
              type="email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status.kind !== 'idle') setStatus(IDLE);
              }}
              placeholder="Enter your email"
              autoComplete="email"
              className="input-brutalist w-full px-4 py-3 text-base"
            />
            <button
              type="submit"
              disabled={status.kind === 'pending'}
              className="btn-brutalist shrink-0 disabled:opacity-60 disabled:pointer-events-none"
            >
              {status.kind === 'pending' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
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
