import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/admin.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('nxrth@stusio.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      await adminApi.login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-ivory px-5">
      <section className="w-full max-w-md border border-line bg-white p-8">
        <p className="eyebrow mb-3">Private Portal</p>
        <h1 className="font-serif text-4xl">NXRTH Admin</h1>
        <p className="mt-4 leading-7 text-muted">Sign in with the admin email and password to manage products and images.</p>
        <form onSubmit={submit} className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm font-medium">
            Email
            <input
              className="field"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Password
            <input
              className="field"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          <button
            className="bg-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      </section>
    </div>
  );
}
