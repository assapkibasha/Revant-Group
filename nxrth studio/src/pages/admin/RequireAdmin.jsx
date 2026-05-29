import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { adminApi } from '../../api/admin.js';

export default function RequireAdmin() {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    adminApi
      .me()
      .then(() => setStatus('allowed'))
      .catch(() => setStatus('denied'));
  }, []);

  if (status === 'loading') {
    return <div className="grid min-h-screen place-items-center bg-ivory text-sm uppercase tracking-[0.18em]">Checking admin access</div>;
  }

  if (status === 'denied') {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
