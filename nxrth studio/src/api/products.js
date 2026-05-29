import { products as fallbackProducts } from '../data/products.js';

export async function fetchProducts({ includeInactive = false } = {}) {
  try {
    const response = await fetch(`/api/products${includeInactive ? '?includeInactive=true' : ''}`);
    if (!response.ok) throw new Error('Could not load products');
    const data = await response.json();
    return data.products?.length ? data.products : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function fetchProductBySlug(slug) {
  try {
    const response = await fetch(`/api/products/${slug}`);
    if (!response.ok) throw new Error('Could not load product');
    const data = await response.json();
    return data.product;
  } catch {
    return fallbackProducts.find((product) => product.slug === slug);
  }
}
