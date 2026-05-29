import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const cookieName = 'nxrth_admin_token';

export function signAdminToken(admin) {
  return jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );
}

export function setAuthCookie(res, token) {
  res.cookie(cookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(cookieName);
}

export async function requireAdmin(req, res, next) {
  try {
    const token = req.cookies?.[cookieName];
    if (!token) {
      return res.status(401).json({ message: 'Not signed in' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const admins = await query('SELECT id, email, name, avatar_url, role FROM admins WHERE id = :id LIMIT 1', {
      id: payload.id,
    });

    if (!admins.length) {
      return res.status(401).json({ message: 'Admin no longer exists' });
    }

    req.admin = admins[0];
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid session' });
  }
}
