function parseJsonList(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return JSON.parse(value);
}

export function mapProduct(row, images = []) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category,
    priceRwf: Number(row.price_rwf),
    priceUsd: row.price_usd === null ? null : Number(row.price_usd),
    description: row.description || '',
    images,
    colors: parseJsonList(row.colors),
    sizes: parseJsonList(row.sizes),
    isNew: Boolean(row.is_new),
    isLimited: Boolean(row.is_limited),
    stockStatus: row.stock_status,
    fabric: row.fabric || '',
    careInstructions: row.care_instructions || '',
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function normalizeProductBody(body) {
  return {
    name: body.name?.trim(),
    slug: body.slug?.trim(),
    category: body.category?.trim(),
    priceRwf: Number(body.priceRwf || 0),
    priceUsd: body.priceUsd === '' || body.priceUsd === null ? null : Number(body.priceUsd || 0),
    description: body.description?.trim() || '',
    images: Array.isArray(body.images) ? body.images.filter(Boolean) : [],
    colors: Array.isArray(body.colors) ? body.colors.filter(Boolean) : [],
    sizes: Array.isArray(body.sizes) ? body.sizes.filter(Boolean) : [],
    isNew: Boolean(body.isNew),
    isLimited: Boolean(body.isLimited),
    stockStatus: body.stockStatus || 'In stock',
    fabric: body.fabric?.trim() || '',
    careInstructions: body.careInstructions?.trim() || '',
    isActive: body.isActive !== false,
  };
}
