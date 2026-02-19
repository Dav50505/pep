'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/components/cart/CartProvider';
import CartLineItem from '@/components/cart/CartLineItem';
import CartSummaryCard from '@/components/cart/CartSummaryCard';
import EmptyCartState from '@/components/cart/EmptyCartState';

export default function CartDrawer() {
  const { state, summary, closeDrawer } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  useEffect(() => {
    if (!state.isDrawerOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDrawer();
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [state.isDrawerOpen, closeDrawer]);

  if (!state.isDrawerOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-black/60 backdrop-blur-sm">
      <button type="button" className="h-full flex-1" aria-label="Close cart" onClick={closeDrawer} />
      <aside className="flex h-full w-full max-w-xl flex-col border-l border-[var(--border-soft)] bg-[var(--bg-0)] p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--text-0)]">Cart</h2>
          <button
            type="button"
            className="rounded-full border border-[var(--border-soft)] px-3 py-1 text-sm text-[var(--text-1)]"
            onClick={closeDrawer}
          >
            Close
          </button>
        </div>

        {state.lines.length === 0 ? (
          <EmptyCartState />
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto pr-1">
              {state.lines.map((line) => (
                <CartLineItem key={line.lineId} line={line} />
              ))}
            </div>
            <div className="mt-5 space-y-3 border-t border-[var(--border-soft)] pt-5">
              <CartSummaryCard summary={summary} compact />
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  className="rounded-full border border-[var(--border-soft)] px-4 py-3 text-center text-sm font-semibold text-[var(--text-0)]"
                >
                  Full Cart
                </Link>
                <Link
                  href="/checkout"
                  className="rounded-full bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-[var(--bg-0)]"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
