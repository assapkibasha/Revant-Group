import Button from '../components/Button.jsx';

export default function About() {
  return (
    <div className="fade-in pt-20">
      <section className="container-pad grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="eyebrow mb-3">About</p>
          <h1 className="font-serif text-6xl font-medium leading-tight">A clothing brand built around identity, detail, and modern expression.</h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-muted">
          NXRTH STUDIO is a clothing brand built around identity, detail, and modern expression. Every piece is designed to help people dress with confidence.
        </p>
      </section>
      <img src="/images/nxrth-black-models-hero.png" alt="Black models in NXRTH STUDIO campaign portrait with branded clothing" className="h-[60vh] w-full object-cover" />
      <section className="container-pad grid gap-8 py-16 sm:py-24 md:grid-cols-2">
        {[
          ['Our Vision', 'To create a refined clothing label that makes everyday dressing feel intentional, sharp, and personal.'],
          ['Our Design Philosophy', 'Clean lines, strong silhouettes, useful details, and restrained branding define the NXRTH approach.'],
          ['Quality & Detail', 'We focus on fabric feel, weight, fit, finishing, and the small choices that make clothing last in rotation.'],
          ['Limited Drops', 'Collections are intentionally focused so every release feels considered and every piece keeps its presence.'],
        ].map(([title, text]) => (
          <article key={title} className="border-t border-line pt-6">
            <h2 className="font-serif text-4xl">{title}</h2>
            <p className="mt-4 leading-8 text-muted">{text}</p>
          </article>
        ))}
      </section>
      <section className="bg-ivory py-16">
        <div className="container-pad flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-2xl font-serif text-4xl">Dress with confidence. Move with intention.</h2>
          <Button to="/shop">Shop the Collection</Button>
        </div>
      </section>
    </div>
  );
}
