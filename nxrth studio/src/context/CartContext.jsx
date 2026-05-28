import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem('nxrth-cart')) || [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('nxrth-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, options = {}) => {
    const color = options.color || product.colors[0];
    const size = options.size || product.sizes[0];
    const quantity = options.quantity || 1;
    const cartId = `${product.id}-${color}-${size}`;

    setItems((current) => {
      const existing = current.find((item) => item.cartId === cartId);
      if (existing) {
        return current.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [
        ...current,
        {
          cartId,
          id: product.id,
          slug: product.slug,
          name: product.name,
          priceRwf: product.priceRwf,
          image: product.images[0],
          color,
          size,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (cartId, quantity) => {
    setItems((current) =>
      current
        .map((item) => (item.cartId === cartId ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter(Boolean),
    );
  };

  const removeItem = (cartId) => {
    setItems((current) => current.filter((item) => item.cartId !== cartId));
  };

  const value = useMemo(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.priceRwf * item.quantity, 0);
    return {
      items,
      count,
      subtotal,
      isCartOpen,
      addItem,
      updateQuantity,
      removeItem,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      clearCart: () => setItems([]),
    };
  }, [items, isCartOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
