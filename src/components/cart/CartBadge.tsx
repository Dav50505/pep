'use client';

import { useCart } from '@/components/cart/CartProvider';
import { formatCurrency } from '@/lib/cartMath';

export default function CartBadge() {
  const { summary } = useCart();

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-3 py-2 text-xs font-medium text-[var(--text-0)]">
      <span>{summary.itemCount} items</span>
      <span className="text-[var(--text-1)]">{formatCurrency(summary.orderTotalUsd)}</span>
    </span>
  );
}
