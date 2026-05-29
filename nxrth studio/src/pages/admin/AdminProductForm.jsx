import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../../api/admin.js';

const emptyProduct = {
  name: '',
  slug: '',
  category: 'T-Shirts',
  priceRwf: '',
  priceUsd: '',
  description: '',
  images: [],
  colors: ['Black', 'White'],
  sizes: ['S', 'M', 'L', 'XL'],
  isNew: false,
  isLimited: false,
  stockStatus: 'In stock',
  fabric: '',
  careInstructions: '',
  isActive: true,
};

const categories = ['T-Shirts', 'Hoodies', 'Jackets', 'Pants', 'Sets', 'Accessories'];
const stockStatuses = ['In stock', 'Few Pieces', 'Limited Drop', 'Out of stock'];

const toList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(emptyProduct);
  const [colorsText, setColorsText] = useState('Black, White');
  const [sizesText, setSizesText] = useState('S, M, L, XL');
  const [imageText, setImageText] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    adminApi.product(id).then(({ product: row }) => {
      setProduct(row);
      setColorsText(row.colors.join(', '));
      setSizesText(row.sizes.join(', '));
      setImageText(row.images.join('\n'));
    });
  }, [id]);

  const update = (field, value) => {
    setProduct((current) => ({ ...current, [field]: value }));
  };

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setError('');
      const { imageUrl } = await adminApi.uploadImage(file);
      const nextImages = [...toList(imageText.replace(/\n/g, ',')), imageUrl];
      setImageText(nextImages.join('\n'));
    } catch (err) {
      setError(err.message);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...product,
      priceRwf: Number(product.priceRwf),
      priceUsd: product.priceUsd === '' ? null : Number(product.priceUsd),
      colors: toList(colorsText),
      sizes: toList(sizesText),
      images: imageText
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (id) {
        await adminApi.updateProduct(id, payload);
      } else {
        await adminApi.createProduct(payload);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <p className="eyebrow mb-2">{id ? 'Edit Product' : 'New Product'}</p>
      <h1 className="font-serif text-5xl">{id ? product.name || 'Edit Product' : 'Add Clothes'}</h1>
      <form onSubmit={submit} className="mt-8 grid gap-5">
        <section className="grid gap-5 border border-line bg-white p-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Product name
            <input className="field" value={product.name} onChange={(event) => update('name', event.target.value)} required />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Slug
            <input className="field" value={product.slug || ''} onChange={(event) => update('slug', event.target.value)} placeholder="Auto-generated if empty" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Category
            <select className="field" value={product.category} onChange={(event) => update('category', event.target.value)}>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Stock status
            <select className="field" value={product.stockStatus} onChange={(event) => update('stockStatus', event.target.value)}>
              {stockStatuses.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Price RWF
            <input className="field" type="number" value={product.priceRwf} onChange={(event) => update('priceRwf', event.target.value)} required />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Price USD
            <input className="field" type="number" value={product.priceUsd || ''} onChange={(event) => update('priceUsd', event.target.value)} />
          </label>
          <label className="grid gap-2 text-sm font-medium md:col-span-2">
            Description
            <textarea className="field min-h-28" value={product.description} onChange={(event) => update('description', event.target.value)} />
          </label>
        </section>

        <section className="grid gap-5 border border-line bg-white p-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Colors
            <input className="field" value={colorsText} onChange={(event) => setColorsText(event.target.value)} placeholder="Black, White, Red" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Sizes
            <input className="field" value={sizesText} onChange={(event) => setSizesText(event.target.value)} placeholder="S, M, L, XL" />
          </label>
          <label className="grid gap-2 text-sm font-medium md:col-span-2">
            Image URLs
            <textarea className="field min-h-28" value={imageText} onChange={(event) => setImageText(event.target.value)} placeholder="/uploads/image.jpg" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Upload image
            <input className="field" type="file" accept="image/*" onChange={uploadImage} />
          </label>
          <div className="grid grid-cols-3 gap-3 md:col-span-2">
            {imageText
              .split('\n')
              .filter(Boolean)
              .map((src) => (
                <img key={src} src={src} alt="Product preview" className="aspect-square w-full object-cover" />
              ))}
          </div>
        </section>

        <section className="grid gap-4 border border-line bg-white p-5 sm:grid-cols-3">
          {[
            ['isNew', 'New arrival'],
            ['isLimited', 'Limited drop'],
            ['isActive', 'Visible on shop'],
          ].map(([field, label]) => (
            <label key={field} className="flex items-center gap-3 text-sm font-medium">
              <input type="checkbox" checked={Boolean(product[field])} onChange={(event) => update(field, event.target.checked)} />
              {label}
            </label>
          ))}
        </section>

        <section className="grid gap-5 border border-line bg-white p-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Fabric
            <textarea className="field min-h-24" value={product.fabric} onChange={(event) => update('fabric', event.target.value)} />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Care instructions
            <textarea className="field min-h-24" value={product.careInstructions} onChange={(event) => update('careInstructions', event.target.value)} />
          </label>
        </section>

        {error && <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white disabled:opacity-60" disabled={saving} type="submit">
            {saving ? 'Saving...' : 'Save Product'}
          </button>
          <button className="border border-line bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.18em]" type="button" onClick={() => navigate('/admin/products')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
