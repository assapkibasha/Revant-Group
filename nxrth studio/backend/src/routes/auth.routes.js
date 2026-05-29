import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';
import { query } from '../db.js';
import { clearAuthCookie, requireAdmin, setAuthCookie, signAdminToken } from '../middleware/auth.js';

const router = Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function allowedEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

async function isAllowedAdmin(email) {
  const normalized = email.toLowerCase();
  const allowList = allowedEmails();
  if (allowList.includes(normalized)) return true;

  const rows = await query('SELECT id FROM admins WHERE LOWER(email) = :email LIMIT 1', { email: normalized });
  return rows.length > 0;
}

router.post('/login', async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password || '';

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admins = await query(
      'SELECT id, email, name, avatar_url, role, password_hash FROM admins WHERE LOWER(email) = :email LIMIT 1',
      { email },
    );

    if (!admins.length || !admins[0].password_hash) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, admins[0].password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const admin = {
      id: admins[0].id,
      email: admins[0].email,
      name: admins[0].name,
      avatar_url: admins[0].avatar_url,
      role: admins[0].role,
    };
    const token = signAdminToken(admin);
    setAuthCookie(res, token);

    return res.json({ admin });
  } catch (error) {
    return next(error);
  }
});

router.post('/google', async (req, res, next) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: 'Google credential is required' });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({ message: 'GOOGLE_CLIENT_ID is not configured' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email?.toLowerCase();

    if (!email || !(await isAllowedAdmin(email))) {
      return res.status(403).json({ message: 'This Google account is not allowed to access admin.' });
    }

    await query(
      `INSERT INTO admins (email, name, google_id, avatar_url, role)
       VALUES (:email, :name, :googleId, :avatarUrl, 'admin')
       ON DUPLICATE KEY UPDATE
         name = VALUES(name),
         google_id = VALUES(google_id),
         avatar_url = VALUES(avatar_url)`,
      {
        email,
        name: payload.name || email,
        googleId: payload.sub,
        avatarUrl: payload.picture || '',
      },
    );

    const admins = await query('SELECT id, email, name, avatar_url, role FROM admins WHERE email = :email LIMIT 1', {
      email,
    });
    const token = signAdminToken(admins[0]);
    setAuthCookie(res, token);

    return res.json({ admin: admins[0] });
  } catch (error) {
    return next(error);
  }
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ admin: req.admin });
});

router.post('/logout', (req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

export default router;
