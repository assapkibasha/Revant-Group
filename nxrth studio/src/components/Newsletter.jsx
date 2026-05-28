import { useState } from 'react';
import Button from './Button.jsx';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!email.includes('@')) {
      setMessage('Please enter a valid email address.');
      return;
    }
    setMessage('You are on the early access list.');
    setEmail('');
  };

  return (
    <section className="bg-ink py-16 text-white sm:py-20">
      <div className="container-pad grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <div>
          <p className="eyebrow mb-3">Early Access</p>
          <h2 className="font-serif text-4xl font-medium sm:text-5xl">Join the NXRTH Circle</h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Get early access to drops, private offers, and collection previews.
          </p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-12 flex-1 border border-white/25 bg-white/10 px-4 text-white outline-none placeholder:text-white/45 focus:border-gold"
            placeholder="Email address"
            type="email"
          />
          <Button variant="gold" type="submit">
            Subscribe
          </Button>
        </form>
        {message && <p className="text-sm text-white/70 lg:col-start-2">{message}</p>}
      </div>
    </section>
  );
}
