import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

const links = [
  ['Home', '/'],
  ['Shop', '/shop'],
  ['Collections', '/collections'],
  ['Lookbook', '/lookbook'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

function IconButton({ label, children, onClick }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center border border-transparent text-current transition hover:border-line"
      type="button"
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, openCart } = useCart();
  const location = useLocation();
  const onHero = location.pathname === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition ${
        onHero ? 'bg-transparent text-white' : 'border-b border-line bg-white/95 text-ink backdrop-blur'
      }`}
    >
      <nav className="container-pad flex h-20 items-center justify-between">
        <Link to="/" className="text-sm font-bold uppercase tracking-[0.28em]">
          NXRTH STUDIO
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <NavLink
              key={label}
              to={href}
              className={({ isActive }) =>
                `text-xs font-semibold uppercase tracking-[0.18em] transition hover:text-gold ${
                  isActive ? 'text-gold' : ''
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <IconButton label="Search">
            <span aria-hidden="true" className="text-lg">⌕</span>
          </IconButton>
          <IconButton label="Open cart" onClick={openCart}>
            <span aria-hidden="true" className="relative text-sm font-bold">
              Bag
              {count > 0 && (
                <span className="absolute -right-3 -top-3 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] text-ink">
                  {count}
                </span>
              )}
            </span>
          </IconButton>
          <IconButton label="Open menu" onClick={() => setOpen(true)}>
            <span aria-hidden="true" className="text-xl">☰</span>
          </IconButton>
        </div>
      </nav>
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 text-ink shadow-soft transition duration-300 lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.24em]">Menu</p>
          <button className="text-2xl" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>
        <div className="mt-10 grid gap-6">
          {links.map(([label, href]) => (
            <NavLink key={label} to={href} className="font-serif text-3xl">
              {label}
            </NavLink>
          ))}
        </div>
      </div>
      {open && <button className="fixed inset-0 z-40 bg-black/30 lg:hidden" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </header>
  );
}
