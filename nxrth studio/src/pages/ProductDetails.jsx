import { Link, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { formatRwf, getProductBySlug, products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

function DetailRow({ title, children }) {
  return (
    <details className="border-t border-line py-5" open={title === 'Description'}>
      <summary className="cursor-pointer text-sm font-bold uppercase tracking-[0.18em]">{title}</summary>
      <div className="mt-4 leading-7 text-muted">{children}</div>
    </details>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [image, setImage] = useState(product?.images[0]);
  const [size, setSize] = useState(product?.sizes[0]);
  const [color, setColor] = useState(product?.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const related = useMemo(() => products.filter((item) => item.category === product?.category && item.id !== product?.id).slice(0, 4), [product]);

  if (!product) {
    return (
      <div className="container-pad grid min-h-screen place-items-center pt-20 text-center">
        <div>
          <h1 className="font-serif text-5xl">Product not found.</h1>
          <Button to="/shop" className="mt-6">Back to Shop</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in pt-24">
      <section className="container-pad grid gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 md:grid-cols-[88px_1fr]">
          <div className="order-2 flex gap-3 md:order-1 md:flex-col">
            {product.images.map((src) => (
              <button key={src} onClick={() => setImage(src)} className={`aspect-square overflow-hidden border ${image === src ? 'border-ink' : 'border-line'}`} type="button">
                <img src={src} alt={`${product.name} alternate view`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="order-1 aspect-[4/5] overflow-hidden bg-ivory md:order-2">
            <img src={image} alt={`${product.name} product gallery`} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-3">{product.stockStatus}</p>
          <h1 className="font-serif text-5xl font-medium leading-tight">{product.name}</h1>
          <p className="mt-4 text-xl font-semibold">{formatRwf(product.priceRwf)}</p>
          <p className="mt-5 leading-8 text-muted">{product.description}</p>

          <div className="mt-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em]">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((item) => (
                <button key={item} onClick={() => setSize(item)} className={`h-11 min-w-12 border px-4 text-sm ${size === item ? 'border-ink bg-ink text-white' : 'border-line'}`} type="button">
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em]">Color</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((item) => (
                <button key={item} onClick={() => setColor(item)} className={`border px-4 py-3 text-sm ${color === item ? 'border-ink bg-ink text-white' : 'border-line'}`} type="button">
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em]">Quantity</p>
            <div className="inline-flex border border-line">
              <button className="h-11 w-11" type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span className="grid h-11 w-12 place-items-center">{quantity}</span>
              <button className="h-11 w-11" type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button onClick={() => addItem(product, { size, color, quantity })}>Add to Cart</Button>
            <Button variant="outline" onClick={() => window.alert('WhatsApp ordering placeholder')}>Order via WhatsApp</Button>
          </div>
          <div className="mt-8">
            <DetailRow title="Description">{product.description}</DetailRow>
            <DetailRow title="Fabric & Care">{product.fabric}. {product.careInstructions}</DetailRow>
            <DetailRow title="Size Guide">Choose your regular size for a relaxed fit. Size down for a closer fit, or contact us for measurements.</DetailRow>
            <DetailRow title="Delivery & Returns">Local delivery options are available. Size exchanges are supported when items are unworn and returned promptly.</DetailRow>
          </div>
        </div>
      </section>
      <section className="container-pad py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-serif text-4xl">Related Pieces</h2>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-[0.18em] text-gold">View all</Link>
        </div>
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>
    </div>
  );
}
