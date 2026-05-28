import { Link } from 'react-router-dom';

export default function CategoryCard({ title, image, filter }) {
  return (
    <Link to={`/shop?category=${encodeURIComponent(filter || title)}`} className="group block overflow-hidden bg-ink">
      <div className="relative aspect-[3/4]">
        <img
          src={image}
          alt={`${title} collection by NXRTH STUDIO`}
          className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="eyebrow mb-2 text-white/70">Collection</p>
          <h3 className="font-serif text-3xl text-white">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
