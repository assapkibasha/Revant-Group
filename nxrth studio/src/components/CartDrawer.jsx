import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatRwf } from '../data/products.js';
import Button from './Button.jsx';

export default function CartDrawer() {
  const { items, subtotal, isCartOpen, closeCart, updateQuantity, removeItem } = useCart();

  return (
    <>
      {isCartOpen && <button className="fixed inset-0 z-[60] bg-black/40" aria-label="Close cart" onClick={closeCart} />}
      <aside
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-soft transition duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-line p-5">
          <h2 className="font-serif text-3xl">Your Cart</h2>
          <button className="text-2xl" type="button" aria-label="Close cart" onClick={closeCart}>
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="font-serif text-3xl">Your bag is empty.</p>
                <Link to="/shop" onClick={closeCart} className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                  Shop Collection
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-5">
              {items.map((item) => (
                <div key={item.cartId} className="grid grid-cols-[86px_1fr] gap-4">
                  <img src={item.image} alt={`${item.name} in cart`} className="aspect-[4/5] w-full object-cover" />
                  <div>
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="mt-1 text-sm text-muted">{item.color} / {item.size}</p>
                      </div>
                      <button type="button" className="text-sm text-muted hover:text-ink" onClick={() => removeItem(item.cartId)}>
                        Remove
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex border border-line">
                        <button className="h-9 w-9" type="button" onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>-</button>
                        <span className="grid h-9 w-10 place-items-center text-sm">{item.quantity}</span>
                        <button className="h-9 w-9" type="button" onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                      </div>
                      <p className="text-sm font-semibold">{formatRwf(item.priceRwf * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-line p-5">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="uppercase tracking-[0.18em] text-muted">Subtotal</span>
            <strong>{formatRwf(subtotal)}</strong>
          </div>
          <Button to="/cart" className="w-full" onClick={closeCart}>Checkout</Button>
          <Button variant="outline" className="mt-3 w-full" onClick={() => window.alert('WhatsApp ordering placeholder')}>
            Order via WhatsApp
          </Button>
        </div>
      </aside>
    </>
  );
}
