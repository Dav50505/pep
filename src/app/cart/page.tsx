'use client';

import Link from 'next/link';
import CartLineItem from '@/components/cart/CartLineItem';
import CartSummaryCard from '@/components/cart/CartSummaryCard';
import EmptyCartState from '@/components/cart/EmptyCartState';
import ComplianceNote from '@/components/product/ComplianceNote';
import { useCart } from '@/components/cart/CartProvider';

export default function CartPage() {
  const { state, summary, clearCart } = useCart();

  return (
    <main className="section-shell pb-20 pt-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">Cart</p>
          <h1 className="font-display text-5xl leading-none text-[var(--text-0)]">Volume-aware order cart</h1>
        </div>
        {state.lines.length > 0 ? (
          <button
            type="button"
            onClick={clearCart}
            className="rounded-full border border-[var(--border-soft)] px-4 py-2 text-sm text-[var(--text-1)]"
          >
            Clear cart
          </button>
        ) : null}
      </div>

      {state.lines.length === 0 ? (
        <EmptyCartState />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
          <div className="space-y-4">
            {state.lines.map((line) => (
              <CartLineItem key={line.lineId} line={line} />
            ))}
            <Link href="/catalog" className="inline-flex text-sm text-[var(--accent)]">
              + Add more products
            </Link>
          </div>
          <div className="space-y-4">
            <CartSummaryCard summary={summary} />
            <ComplianceNote compact />
          </div>
        </div>
      )}
    </main>
  );
}
