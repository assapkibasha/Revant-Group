import { useState } from 'react';
import Button from '../components/Button.jsx';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="fade-in pt-20">
      <section className="bg-ivory py-16 sm:py-20">
        <div className="container-pad">
          <p className="eyebrow mb-3">Contact</p>
          <h1 className="font-serif text-6xl font-medium">Let us style the next move.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted">Questions about sizing, orders, custom designs, or delivery? Send a message and the studio team will respond.</p>
        </div>
      </section>
      <section className="container-pad grid gap-10 py-16 lg:grid-cols-[1fr_0.9fr]">
        <form onSubmit={submit} className="grid gap-4">
          <input className="field" required placeholder="Name" aria-label="Name" />
          <input className="field" required type="email" placeholder="Email" aria-label="Email" />
          <input className="field" placeholder="Phone" aria-label="Phone" />
          <textarea className="field min-h-40 resize-y" required placeholder="Message" aria-label="Message" />
          <Button type="submit">Send Message</Button>
          {sent && <p className="text-sm text-muted">Message received. This form is ready to connect to a backend later.</p>}
        </form>
        <div className="grid gap-4">
          {[
            ['Email', 'hello@nxrthstudio.com'],
            ['Phone / WhatsApp', '+250 000 000 000'],
            ['Location', 'Kigali, Rwanda'],
            ['Social Media', 'Instagram, TikTok, X'],
          ].map(([title, text]) => (
            <article key={title} className="border border-line p-6">
              <p className="eyebrow mb-2">{title}</p>
              <p className="font-serif text-2xl">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container-pad pb-20">
        <h2 className="mb-8 font-serif text-4xl">FAQ</h2>
        <div className="grid gap-3">
          {[
            ['How do I order?', 'Add items to cart and place an order, or use the WhatsApp order button for direct assistance.'],
            ['Do you offer custom designs?', 'Custom design requests can be discussed through the contact form or WhatsApp.'],
            ['How long does delivery take?', 'Delivery timing depends on location and stock. Local options can be confirmed before payment.'],
            ['Can I exchange size?', 'Size exchanges are available for unworn items when stock is available.'],
          ].map(([question, answer]) => (
            <details key={question} className="border border-line p-5">
              <summary className="cursor-pointer font-medium">{question}</summary>
              <p className="mt-3 leading-7 text-muted">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
