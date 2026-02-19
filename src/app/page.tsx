import Link from 'next/link';
import HeroPeptideScroll from '@/components/HeroPeptideScroll';
import ComplianceNote from '@/components/product/ComplianceNote';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/lib/catalog';

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <main>
      <HeroPeptideScroll />

      <section className="section-shell py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">Assay Integrity</p>
            <p className="mt-3 text-sm text-[var(--text-0)]">Lot-level placeholder COA references and clear concentration labels.</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">Subscription Ops</p>
            <p className="mt-3 text-sm text-[var(--text-0)]">Cadence-based replenishment with transparent discount logic.</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">Volume Tracking</p>
            <p className="mt-3 text-sm text-[var(--text-0)]">Real-time mL totals, vial counts, and order-level summaries.</p>
          </div>
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-1)]">Featured peptides</p>
            <h2 className="font-display text-4xl text-[var(--text-0)] md:text-5xl">Clinical-luxury catalog modules</h2>
          </div>
          <Link href="/catalog" className="text-sm text-[var(--accent)]">
            View full catalog
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-8 md:p-10">
          <h3 className="font-display text-3xl text-[var(--text-0)]">Subscription-ready placeholder checkout</h3>
          <p className="mt-4 max-w-2xl text-sm text-[var(--text-1)]">
            This build demonstrates one-time and subscription purchase paths with cadence selection, volume math, and a
            multi-step mock checkout flow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/catalog" className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg-0)]">
              Start Building Cart
            </Link>
            <Link href="/checkout" className="rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm text-[var(--text-0)]">
              Preview Checkout
            </Link>
          </div>
        </div>
        <div className="mt-6">
          <ComplianceNote />
        </div>
      </section>
    </main>
  );
}
