import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/admin.js';

const navItems = [
  ['Dashboard', '/admin'],
  ['Products', '/admin/products'],
  ['Add Product', '/admin/products/new'],
  ['View Site', '/'],
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = async () => {
    await adminApi.logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-white p-6 lg:block">
        <p className="text-sm font-bold uppercase tracking-[0.26em]">NXRTH Admin</p>
        <nav className="mt-10 grid gap-2">
          {navItems.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              end={href === '/admin'}
              className={({ isActive }) =>
                `px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-ink text-white' : 'hover:bg-ivory'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="absolute bottom-6 left-6 right-6 border border-line px-4 py-3 text-sm" type="button" onClick={logout}>
          Sign out
        </button>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-white px-5 lg:hidden">
          <p className="text-xs font-bold uppercase tracking-[0.22em]">NXRTH Admin</p>
          <button type="button" className="text-sm font-semibold" onClick={logout}>
            Sign out
          </button>
        </header>
        <div className="container-pad max-w-6xl py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
