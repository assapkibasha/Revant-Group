import { Link } from 'react-router-dom';

const styles = {
  dark: 'bg-ink text-white hover:bg-[#242424]',
  light: 'bg-white text-ink hover:bg-ivory',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-white',
  gold: 'bg-gold text-ink hover:bg-[#d2b36f]',
};

export default function Button({ children, to, variant = 'dark', className = '', ...props }) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
