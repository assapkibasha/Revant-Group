import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../api/admin.js';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    adminApi.products().then(({ products: rows }) => setProducts(rows)).catch(() => setProducts([]));
  }, []);

  const active = products.filter((product) => product.isActive).length;
  const limited = products.filter((product) => product.isLimited).length;
  const few = products.filter((product) => product.stockStatus === 'Few Pieces').length;

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-2">Overview</p>
          <h1 className="font-serif text-5xl">Admin Dashboard</h1>
        </div>
        <Link to="/admin/products/new" className="bg-ink px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-white">
          Add Product
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ['Active Products', active],
          ['Limited Drops', limited],
          ['Few Pieces', few],
        ].map(([label, value]) => (
          <article key={label} className="border border-line bg-white p-6">
            <p className="text-sm text-muted">{label}</p>
            <strong className="mt-3 block font-serif text-5xl">{value}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}
