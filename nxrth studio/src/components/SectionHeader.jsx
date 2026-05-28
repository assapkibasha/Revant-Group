export default function SectionHeader({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`mb-10 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{text}</p>}
    </div>
  );
}
