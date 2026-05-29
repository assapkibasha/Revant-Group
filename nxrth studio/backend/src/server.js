import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js';
import uploadsRoutes from './routes/uploads.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '../uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://127.0.0.1:5173',
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use('/uploads', express.static(uploadDir));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'nxrth-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/uploads', uploadsRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  const isDuplicate = error.code === 'ER_DUP_ENTRY';
  res.status(isDuplicate ? 409 : 500).json({
    message: isDuplicate ? 'A record with that value already exists.' : 'Something went wrong on the server.',
  });
});

app.listen(port, () => {
  console.log(`NXRTH API running on http://127.0.0.1:${port}`);
});
