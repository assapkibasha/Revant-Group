import 'dotenv/config';
import { pool } from '../db.js';
import { products } from '../../../src/data/products.js';

async function withRetry(task, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1200));
    }
  }
  throw lastError;
}

async function query(sql, values) {
  return withRetry(() => pool.query(sql, values));
}

try {
  for (const product of products) {
    const [result] = await query(
      `INSERT INTO products
       (name, slug, category, price_rwf, price_usd, description, colors, sizes, is_new, is_limited, stock_status, fabric, care_instructions, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, true)
       ON DUPLICATE KEY UPDATE
         name = VALUES(name),
         category = VALUES(category),
         price_rwf = VALUES(price_rwf),
         price_usd = VALUES(price_usd),
         description = VALUES(description),
         colors = VALUES(colors),
         sizes = VALUES(sizes),
         is_new = VALUES(is_new),
         is_limited = VALUES(is_limited),
         stock_status = VALUES(stock_status),
         fabric = VALUES(fabric),
         care_instructions = VALUES(care_instructions),
         is_active = true`,
      [
        product.name,
        product.slug,
        product.category,
        product.priceRwf,
        product.priceUsd,
        product.description,
        JSON.stringify(product.colors),
        JSON.stringify(product.sizes),
        product.isNew,
        product.isLimited,
        product.stockStatus,
        product.fabric,
        product.careInstructions,
      ],
    );

    const productId = result.insertId || (await query('SELECT id FROM products WHERE slug = ? LIMIT 1', [product.slug]))[0][0].id;
    await query('DELETE FROM product_images WHERE product_id = ?', [productId]);

    for (const [index, imageUrl] of product.images.entries()) {
      await query(
        'INSERT INTO product_images (product_id, image_url, sort_order) VALUES (?, ?, ?)',
        [productId, imageUrl, index],
      );
    }
    console.log(`Seeded: ${product.name}`);
  }

  console.log(`Seeded ${products.length} products into MySQL.`);
} catch (error) {
  console.error('Product seed failed:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
