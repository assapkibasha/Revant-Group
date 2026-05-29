# NXRTH Admin Setup

## Run Locally

```bash
npm install
npm run db:migrate
npm run dev:all
```

Admin URL:

```txt
http://127.0.0.1:5173/admin
```

API health check:

```txt
http://127.0.0.1:4000/api/health
```

## Email/Password Sign-In

The admin portal currently uses a simple email and password login.

```env
ADMIN_LOGIN_EMAIL=nxrth@stusio.com
ADMIN_LOGIN_PASSWORD=nxrth@studio2026
```

Run the migration after changing these values so the admin password hash is updated:

```bash
npm run db:migrate
```

## Google Sign-In Later

Add the same Google OAuth client ID to both environment variables:

```env
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
```

Add allowed admin emails:

```env
ADMIN_EMAILS=owner@example.com,team@example.com
```

Only emails in `ADMIN_EMAILS` or already stored in the `admins` table can access the admin portal.

## MySQL Tables

The migration creates:

- `admins`
- `products`
- `product_images`

Run this after database changes:

```bash
npm run db:migrate
```

## Product Images

The current backend uploads files into:

```txt
backend/uploads
```

This is good for local testing. For production, use persistent storage such as S3, Cloudinary, or a server disk that does not reset on deploy.
