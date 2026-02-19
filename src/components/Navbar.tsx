'use client';

import Link from 'next/link';
import CartBadge from '@/components/cart/CartBadge';
import { useCart } from '@/components/cart/CartProvider';
import { formatVolume } from '@/lib/cartMath';

const links = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { summary, toggleDrawer } = useCart();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--bg-0)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="font-display text-2xl tracking-[0.12em] text-[var(--text-0)]">
          PEPT
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-[var(--text-1)] transition hover:text-[var(--text-0)]">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleDrawer}
            className="rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-0)] transition hover:border-[var(--accent-muted)]"
          >
            Cart · {formatVolume(summary.totalVolumeMl)}
          </button>
          <CartBadge />
        </div>
      </div>
    </nav>
  );
}
