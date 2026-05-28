import { Link } from 'react-router-dom';
import { formatRwf } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import Button from './Button.jsx';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="group">
      <Link to={`/product/${product.slug}`} className="block overflow-hidden bg-ivory">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.images[0]}
            alt={`${product.name} premium clothing product`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.isNew && <span className="bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">New</span>}
            {product.isLimited && <span className="bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Limited</span>}
          </div>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Link to={`/product/${product.slug}`} className="font-medium text-ink transition hover:text-gold">
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-muted">{product.category}</p>
          <p className="mt-2 text-sm text-muted">Sizes: {product.sizes.join(', ')}</p>
        </div>
        <p className="whitespace-nowrap text-sm font-semibold">{formatRwf(product.priceRwf)}</p>
      </div>
      <Button className="mt-4 w-full" variant="outline" onClick={() => addItem(product)}>
        Quick Add
      </Button>
    </article>
  );
}
