import Link from 'next/link';

export default function EmptyCartState() {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--border-soft)] bg-[var(--surface)] p-8 text-center">
      <p className="text-lg font-semibold text-[var(--text-0)]">Your cart is empty</p>
      <p className="mt-2 text-sm text-[var(--text-1)]">
        Add placeholder peptide SKUs to preview volume tracking and subscription discounts.
      </p>
      <Link
        href="/catalog"
        className="mt-5 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg-0)]"
      >
        Browse Catalog
      </Link>
    </div>
  );
}
