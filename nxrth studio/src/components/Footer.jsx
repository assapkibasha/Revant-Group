import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ivory">
      <div className="container-pad grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="text-sm font-bold uppercase tracking-[0.28em]">NXRTH STUDIO</Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Premium clothing designed around identity, confidence, and modern expression.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Shop</h3>
          <div className="mt-4 grid gap-2 text-sm text-muted">
            <Link to="/shop">New Arrivals</Link>
            <Link to="/shop">Limited Drops</Link>
            <Link to="/lookbook">Lookbook</Link>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Company</h3>
          <div className="mt-4 grid gap-2 text-sm text-muted">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <a href="mailto:hello@nxrthstudio.com">hello@nxrthstudio.com</a>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Social</h3>
          <div className="mt-4 flex gap-4 text-sm text-muted">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="TikTok">TikTok</a>
            <a href="#" aria-label="X">X</a>
          </div>
        </div>
      </div>
      <div className="container-pad border-t border-line py-5 text-xs uppercase tracking-[0.18em] text-muted">
        © 2026 NXRTH STUDIO Company. All rights reserved.
      </div>
    </footer>
  );
}
