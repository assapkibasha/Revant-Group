import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../api/admin.js';
import { formatRwf } from '../../data/products.js';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  const loadProducts = () => {
    adminApi.products().then(({ products: rows }) => setProducts(rows));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const archive = async (id) => {
    if (!window.confirm('Archive this product?')) return;
    await adminApi.archiveProduct(id);
    setMessage('Product archived.');
    loadProducts();
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-2">Products</p>
          <h1 className="font-serif text-5xl">Manage Clothes</h1>
        </div>
        <Link to="/admin/products/new" className="bg-ink px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-white">
          Add Product
        </Link>
      </div>
      {message && <p className="mt-5 border border-line bg-white p-3 text-sm text-muted">{message}</p>}
      <div className="mt-8 overflow-hidden border border-line bg-white">
        <div className="hidden grid-cols-[80px_1fr_140px_120px_160px] gap-4 border-b border-line px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-muted md:grid">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Actions</span>
        </div>
        {products.map((product) => (
          <article key={product.id} className="grid gap-4 border-b border-line p-4 md:grid-cols-[80px_1fr_140px_120px_160px] md:items-center">
            <img src={product.images[0] || '/images/nxrth-branded-collection.png'} alt={product.name} className="aspect-square w-20 object-cover" />
            <div>
              <h2 className="font-medium">{product.name}</h2>
              <p className="mt-1 text-sm text-muted">{product.isActive ? 'Active' : 'Archived'} · {product.stockStatus}</p>
            </div>
            <p className="text-sm text-muted">{product.category}</p>
            <p className="text-sm font-semibold">{formatRwf(product.priceRwf)}</p>
            <div className="flex gap-3 text-sm">
              <Link to={`/admin/products/${product.id}/edit`} className="font-semibold text-ink">Edit</Link>
              <button type="button" className="text-muted hover:text-ink" onClick={() => archive(product.id)}>Archive</button>
            </div>
          </article>
        ))}
        {!products.length && <p className="p-6 text-muted">No products yet.</p>}
      </div>
    </div>
  );
}
