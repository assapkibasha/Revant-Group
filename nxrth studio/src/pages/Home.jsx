import { useEffect, useState } from 'react';
import Button from '../components/Button.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import Newsletter from '../components/Newsletter.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { products } from '../data/products.js';

export default function Home() {
  const featured = products.slice(0, 8);
  const heroImages = [
    {
      src: '/images/nxrth-black-models-hero.png',
      alt: 'Black models wearing premium NXRTH STUDIO clothing',
    },
    {
      src: '/images/nxrth-mixed-hero.png',
      alt: 'Black models wearing mixed black and white NXRTH clothing',
    },
    {
      src: '/images/nxrth-yellow-red-hero.png',
      alt: 'Black models wearing yellow and red NXRTH STUDIO clothing',
    },
  ];
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroImages.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="fade-in">
      <section className="relative min-h-screen overflow-hidden bg-ink text-white">
        {heroImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              activeHero === index ? 'opacity-70' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" />
        <div className="container-pad relative flex min-h-screen items-end pb-24 pt-32">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4 text-white/80">New Collection</p>
            <h1 className="font-serif text-6xl font-medium leading-[0.95] sm:text-7xl lg:text-8xl">NXRTH STUDIO</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/82">Designed for the bold. Made for the refined.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/shop" variant="light">Shop Collection</Button>
              <Button to="/lookbook" variant="outline" className="border-white text-white hover:bg-white hover:text-ink">Explore Lookbook</Button>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 hidden items-center gap-3 md:flex">
            {heroImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Show hero image ${index + 1}`}
                onClick={() => setActiveHero(index)}
                className={`h-px w-10 transition ${activeHero === index ? 'bg-white' : 'bg-white/35'}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad py-16 sm:py-24">
        <SectionHeader eyebrow="Explore" title="Designed by mood, worn by identity." text="From everyday essentials to limited drops, NXRTH STUDIO keeps the silhouette clean and the presence strong." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard title="Men" image="/images/nxrth-black-models-hero.png" filter="T-Shirts" />
          <CategoryCard title="Women" image="/images/lookbook-black-nxrth.png" filter="Sets" />
          <CategoryCard title="New Arrivals" image="/images/nxrth-white-black-collection.png" filter="T-Shirts" />
          <CategoryCard title="Limited Drops" image="/images/nxrth-yellow-red-hero.png" filter="Jackets" />
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-24">
        <div className="container-pad">
          <SectionHeader eyebrow="The Latest Drop" title="Modern street-luxury essentials." text="Original clothing pieces built for clean styling, strong proportion, and premium daily wear." />
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="container-pad grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div className="aspect-[4/5] overflow-hidden bg-ivory">
          <img src="/images/lookbook-black-nxrth.png" alt="Black model wearing NXRTH STUDIO premium brand styling" className="h-full w-full object-cover" />
        </div>
        <div className="max-w-xl lg:pl-10">
          <p className="eyebrow mb-3">Brand Story</p>
          <h2 className="font-serif text-5xl font-medium leading-tight">Original pieces for confidence, identity, and clean style.</h2>
          <p className="mt-5 leading-8 text-muted">
            NXRTH STUDIO designs clothing for people who value restraint, detail, and presence. Every drop is shaped around wearable silhouettes, tactile fabrics, and a point of view that feels composed.
          </p>
          <Button to="/about" className="mt-8">Discover the Brand</Button>
        </div>
      </section>

      <section className="bg-ink py-16 text-white sm:py-24">
        <div className="container-pad">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeader eyebrow="NXRTH Editorial" title="A visual story of texture, movement, and identity." text="Campaign moments styled with calm confidence and precise contrast." />
            <div className="grid gap-4 sm:grid-cols-2">
              <img src="/images/lookbook-black-nxrth.png" alt="Black models in NXRTH editorial lookbook scene" className="aspect-[4/5] w-full object-cover" />
              <img src="/images/nxrth-yellow-red-hero.png" alt="Yellow and red NXRTH editorial campaign styling" className="aspect-[4/5] w-full object-cover sm:mt-12" />
            </div>
          </div>
          <Button to="/lookbook" variant="gold" className="mt-8">View Lookbook</Button>
        </div>
      </section>

      <section className="container-pad py-16 sm:py-20">
        <div className="grid gap-5 md:grid-cols-5">
          {['Original designs', 'Quality fabrics', 'Limited collections', 'Delivery options', 'Easy ordering'].map((item) => (
            <div key={item} className="border-t border-line pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">NXRTH</p>
              <h3 className="mt-2 font-serif text-2xl">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ivory py-16">
        <div className="container-pad grid gap-6 md:grid-cols-3">
          {['The quality feels premium from the first wear.', 'The fit is clean without trying too hard.', 'Ordering was quick and the styling feels considered.'].map((quote, index) => (
            <blockquote key={quote} className="border-l border-gold pl-5 text-lg leading-8">
              “{quote}”
              <footer className="mt-4 text-xs uppercase tracking-[0.18em] text-muted">Client {index + 1}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
