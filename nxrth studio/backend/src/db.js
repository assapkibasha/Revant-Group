import 'dotenv/config';
import mysql from 'mysql2/promise';

const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false';
const databaseUrl = new URL(process.env.DATABASE_URL);

export const pool = mysql.createPool({
  host: databaseUrl.hostname,
  port: Number(databaseUrl.port || 3306),
  user: decodeURIComponent(databaseUrl.username),
  password: decodeURIComponent(databaseUrl.password),
  database: databaseUrl.pathname.replace(/^\//, ''),
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
  ssl: {
    rejectUnauthorized,
  },
});

export async function query(sql, params = {}) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
