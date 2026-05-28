import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { categories, products } from '../data/products.js';

export default function Shop() {
  const [params] = useSearchParams();
  const [category, setCategory] = useState(params.get('category') || 'All');
  const [size, setSize] = useState('All');
  const [color, setColor] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSize = size === 'All' || product.sizes.includes(size);
      const matchesColor = color === 'All' || product.colors.includes(color);
      const matchesAvailability = availability === 'All' || product.stockStatus === availability;
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesSize && matchesColor && matchesAvailability && matchesQuery;
    });
    if (sort === 'Price Low to High') list = [...list].sort((a, b) => a.priceRwf - b.priceRwf);
    if (sort === 'Price High to Low') list = [...list].sort((a, b) => b.priceRwf - a.priceRwf);
    return list;
  }, [category, size, color, availability, sort, query]);

  return (
    <div className="fade-in pt-20">
      <section className="bg-ivory py-16 sm:py-20">
        <div className="container-pad">
          <p className="eyebrow mb-3">Collections</p>
          <h1 className="font-serif text-6xl font-medium">Shop NXRTH</h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted">Browse limited drops, essentials, and refined street-luxury pieces by NXRTH STUDIO.</p>
        </div>
      </section>
      <section className="container-pad py-10">
        <div className="mb-10 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          <input className="field md:col-span-3 lg:col-span-2" placeholder="Search products" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
            {['All', ...categories].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className="field" value={size} onChange={(e) => setSize(e.target.value)}>
            {['All', 'XS', 'S', 'M', 'L', 'XL', 'OS'].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className="field" value={color} onChange={(e) => setColor(e.target.value)}>
            {['All', 'Black', 'Ivory', 'Cream', 'Charcoal', 'Noir', 'Stone', 'Taupe', 'White', 'Midnight', 'Olive', 'Oat'].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className="field" value={availability} onChange={(e) => setAvailability(e.target.value)}>
            {['All', 'In stock', 'Few Pieces', 'Limited Drop'].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className="field md:col-span-3 lg:col-span-1" value={sort} onChange={(e) => setSort(e.target.value)}>
            {['Newest', 'Price Low to High', 'Price High to Low'].map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        {filtered.length ? (
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="grid min-h-80 place-items-center bg-ivory text-center">
            <div>
              <h2 className="font-serif text-4xl">No pieces found.</h2>
              <p className="mt-3 text-muted">Adjust your filters to discover more from the collection.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
