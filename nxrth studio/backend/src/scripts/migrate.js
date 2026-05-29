import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool } from '../db.js';

const statements = [
  `CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    google_id VARCHAR(255),
    avatar_url TEXT,
    password_hash VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    price_rwf INT NOT NULL,
    price_usd DECIMAL(10, 2),
    description TEXT,
    colors JSON NOT NULL,
    sizes JSON NOT NULL,
    is_new BOOLEAN NOT NULL DEFAULT false,
    is_limited BOOLEAN NOT NULL DEFAULT false,
    stock_status VARCHAR(100) NOT NULL DEFAULT 'In stock',
    fabric TEXT,
    care_instructions TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_products_active (is_active),
    INDEX idx_products_category (category)
  )`,
  `CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_images_product
      FOREIGN KEY (product_id) REFERENCES products(id)
      ON DELETE CASCADE
  )`,
];

try {
  for (const statement of statements) {
    await pool.query(statement);
  }

  await pool.query('ALTER TABLE admins ADD COLUMN password_hash VARCHAR(255) NULL').catch((error) => {
    if (error.code !== 'ER_DUP_FIELDNAME') throw error;
  });

  if (process.env.ADMIN_LOGIN_EMAIL && process.env.ADMIN_LOGIN_PASSWORD) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_LOGIN_PASSWORD, 12);
    await pool.query(
      `INSERT INTO admins (email, name, password_hash, role)
       VALUES (?, ?, ?, 'admin')
       ON DUPLICATE KEY UPDATE
         name = VALUES(name),
         password_hash = VALUES(password_hash),
         role = VALUES(role)`,
      [process.env.ADMIN_LOGIN_EMAIL.toLowerCase(), 'NXRTH Admin', passwordHash],
    );
  }

  console.log('Database migration completed.');
} catch (error) {
  console.error('Migration failed:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
