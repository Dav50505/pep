import Link from 'next/link';

const legalLinks = [
  { href: '/about', label: 'Quality System' },
  { href: '/contact', label: 'Lab Support' },
  { href: '/catalog', label: 'Research Catalog' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--bg-1)] px-6 py-14">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-[0.1em] text-[var(--text-0)]">PEPT</p>
          <p className="mt-3 max-w-sm text-sm text-[var(--text-1)]">
            High-integrity, research-use peptide storefront concept. All product and checkout data shown on this site
            are demonstration placeholders.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--text-1)]">Navigate</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link className="text-[var(--text-1)] transition hover:text-[var(--text-0)]" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--text-1)]">Compliance</h3>
          <p className="mt-3 text-sm text-[var(--text-1)]">
            Research use only. Not for human consumption. No statements on this site are intended to diagnose, treat,
            cure, or prevent disease.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-[var(--border-soft)] pt-5 text-xs text-[var(--text-1)]">
        © {new Date().getFullYear()} PEPT Research Supply. Placeholder storefront implementation.
      </p>
    </footer>
  );
}
