import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatRwf } from '../data/products.js';

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="fade-in pt-20">
      <section className="container-pad py-16">
        <p className="eyebrow mb-3">Checkout</p>
        <h1 className="font-serif text-6xl font-medium">Your Cart</h1>
      </section>
      <section className="container-pad pb-20">
        {items.length === 0 ? (
          <div className="grid min-h-80 place-items-center bg-ivory text-center">
            <div>
              <h2 className="font-serif text-4xl">Your bag is empty.</h2>
              <Button to="/shop" className="mt-6">Shop Collection</Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="grid gap-5">
              {items.map((item) => (
                <article key={item.cartId} className="grid gap-4 border-b border-line pb-5 sm:grid-cols-[120px_1fr]">
                  <img src={item.image} alt={`${item.name} cart item`} className="aspect-[4/5] w-full max-w-32 object-cover" />
                  <div className="flex flex-col justify-between gap-5 sm:flex-row">
                    <div>
                      <Link to={`/product/${item.slug}`} className="font-serif text-2xl">{item.name}</Link>
                      <p className="mt-2 text-sm text-muted">{item.color} / {item.size}</p>
                      <button className="mt-4 text-sm text-muted hover:text-ink" type="button" onClick={() => removeItem(item.cartId)}>Remove</button>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="flex border border-line">
                        <button className="h-10 w-10" type="button" onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>-</button>
                        <span className="grid h-10 w-10 place-items-center">{item.quantity}</span>
                        <button className="h-10 w-10" type="button" onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                      </div>
                      <strong>{formatRwf(item.priceRwf * item.quantity)}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <aside className="h-fit border border-line p-6">
              <h2 className="font-serif text-3xl">Order Summary</h2>
              <div className="my-6 flex justify-between border-y border-line py-5">
                <span className="text-muted">Subtotal</span>
                <strong>{formatRwf(subtotal)}</strong>
              </div>
              <Button className="w-full" onClick={() => window.alert('Checkout placeholder ready for backend integration')}>Place Order</Button>
              <Button variant="outline" className="mt-3 w-full" onClick={() => window.alert('WhatsApp ordering placeholder')}>Order via WhatsApp</Button>
              <button className="mt-5 w-full text-sm text-muted hover:text-ink" type="button" onClick={clearCart}>Clear cart</button>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
