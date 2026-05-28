const looks = [
  ['Street Essentials', 'Oversized layers, grounded neutrals, and easy movement.', '/images/lookbook-black-nxrth.png'],
  ['Studio Minimalism', 'White and black essentials with clean studio branding.', '/images/nxrth-white-black-collection.png'],
  ['Color Signal', 'Muted yellow and deep red pieces bring new energy to the NXRTH uniform.', '/images/nxrth-yellow-red-hero.png'],
  ['Night Collection', 'Charcoal tones and sharper proportions for after dark.', '/images/nxrth-black-models-hero.png'],
  ['Hoodie & Cap Study', 'Branded essentials with a polished street-luxury finish.', '/images/nxrth-hoodie-cap.png'],
  ['Utility Lines', 'Functional structure with a polished street edge.', '/images/nxrth-branded-collection.png'],
  ['Soft Contrast', 'Black, white, and muted gold details in balance.', '/images/nxrth-mountain-tee.png'],
];

export default function Lookbook() {
  return (
    <div className="fade-in pt-20">
      <section className="container-pad py-16 sm:py-20">
        <p className="eyebrow mb-3">NXRTH Editorial</p>
        <h1 className="max-w-4xl font-serif text-6xl font-medium leading-tight">A visual story of texture, movement, and identity.</h1>
      </section>
      <section className="container-pad pb-20">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {looks.map(([title, caption, image], index) => (
            <article key={title} className="mb-5 break-inside-avoid bg-ivory">
              <img
                src={image}
                alt={`${title} lookbook editorial`}
                className={`w-full object-cover ${index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}
                loading="lazy"
              />
              <div className="p-5">
                <p className="eyebrow mb-2">Look {String(index + 1).padStart(2, '0')}</p>
                <h2 className="font-serif text-3xl">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
