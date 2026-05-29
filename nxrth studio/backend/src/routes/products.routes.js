import { Router } from 'express';
import { pool, query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { mapProduct, normalizeProductBody } from '../utils/products.js';
import { slugify } from '../utils/slug.js';

const router = Router();

async function imagesForProduct(productId) {
  const rows = await query(
    'SELECT image_url FROM product_images WHERE product_id = :productId ORDER BY sort_order ASC, id ASC',
    { productId },
  );
  return rows.map((row) => row.image_url);
}

router.get('/', async (req, res, next) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    const rows = await query(
      `SELECT * FROM products ${includeInactive ? '' : 'WHERE is_active = 1'} ORDER BY created_at DESC`,
    );
    const products = await Promise.all(
      rows.map(async (row) => mapProduct(row, await imagesForProduct(row.id))),
    );
    res.json({ products });
  } catch (error) {
    next(error);
  }
});

router.get('/:idOrSlug', async (req, res, next) => {
  try {
    const key = req.params.idOrSlug;
    const rows = await query(
      `SELECT * FROM products WHERE ${Number.isFinite(Number(key)) ? 'id = :id' : 'slug = :slug'} LIMIT 1`,
      { id: Number(key), slug: key },
    );
    if (!rows.length) return res.status(404).json({ message: 'Product not found' });
    res.json({ product: mapProduct(rows[0], await imagesForProduct(rows[0].id)) });
  } catch (error) {
    next(error);
  }
});

router.post('/', requireAdmin, async (req, res, next) => {
  const data = normalizeProductBody(req.body);
  if (!data.name || !data.category || !data.priceRwf) {
    return res.status(400).json({ message: 'Name, category, and RWF price are required' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const slug = data.slug || slugify(data.name);
    const [result] = await connection.execute(
      `INSERT INTO products
       (name, slug, category, price_rwf, price_usd, description, colors, sizes, is_new, is_limited, stock_status, fabric, care_instructions, is_active)
       VALUES
       (:name, :slug, :category, :priceRwf, :priceUsd, :description, :colors, :sizes, :isNew, :isLimited, :stockStatus, :fabric, :careInstructions, :isActive)`,
      {
        ...data,
        slug,
        colors: JSON.stringify(data.colors),
        sizes: JSON.stringify(data.sizes),
      },
    );

    for (const [index, imageUrl] of data.images.entries()) {
      await connection.execute(
        'INSERT INTO product_images (product_id, image_url, sort_order) VALUES (:productId, :imageUrl, :sortOrder)',
        { productId: result.insertId, imageUrl, sortOrder: index },
      );
    }

    await connection.commit();
    const rows = await query('SELECT * FROM products WHERE id = :id LIMIT 1', { id: result.insertId });
    res.status(201).json({ product: mapProduct(rows[0], await imagesForProduct(result.insertId)) });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
});

router.put('/:id', requireAdmin, async (req, res, next) => {
  const data = normalizeProductBody(req.body);
  if (!data.name || !data.category || !data.priceRwf) {
    return res.status(400).json({ message: 'Name, category, and RWF price are required' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const slug = data.slug || slugify(data.name);
    await connection.execute(
      `UPDATE products SET
        name = :name,
        slug = :slug,
        category = :category,
        price_rwf = :priceRwf,
        price_usd = :priceUsd,
        description = :description,
        colors = :colors,
        sizes = :sizes,
        is_new = :isNew,
        is_limited = :isLimited,
        stock_status = :stockStatus,
        fabric = :fabric,
        care_instructions = :careInstructions,
        is_active = :isActive
       WHERE id = :id`,
      {
        ...data,
        id: req.params.id,
        slug,
        colors: JSON.stringify(data.colors),
        sizes: JSON.stringify(data.sizes),
      },
    );
    await connection.execute('DELETE FROM product_images WHERE product_id = :id', { id: req.params.id });
    for (const [index, imageUrl] of data.images.entries()) {
      await connection.execute(
        'INSERT INTO product_images (product_id, image_url, sort_order) VALUES (:productId, :imageUrl, :sortOrder)',
        { productId: req.params.id, imageUrl, sortOrder: index },
      );
    }
    await connection.commit();

    const rows = await query('SELECT * FROM products WHERE id = :id LIMIT 1', { id: req.params.id });
    res.json({ product: mapProduct(rows[0], await imagesForProduct(req.params.id)) });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
});

router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    await query('UPDATE products SET is_active = 0 WHERE id = :id', { id: req.params.id });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

export default router;
