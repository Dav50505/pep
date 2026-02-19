import Link from 'next/link';
import { CartSummary } from '@/lib/catalog';
import { formatCurrency, formatVolume } from '@/lib/cartMath';

interface CartSummaryCardProps {
  summary: CartSummary;
  compact?: boolean;
}

export default function CartSummaryCard({ summary, compact = false }: CartSummaryCardProps) {
  const rowSpacingClass = compact ? 'mt-4 space-y-2 text-sm' : 'mt-4 space-y-3 text-sm';

  return (
    <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5">
      <h3 className="text-lg font-semibold text-[var(--text-0)]">Order summary</h3>
      <dl className={rowSpacingClass}>
        <div className="flex items-center justify-between text-[var(--text-1)]">
          <dt>Items</dt>
          <dd>{summary.itemCount}</dd>
        </div>
        <div className="flex items-center justify-between text-[var(--text-1)]">
          <dt>Total volume</dt>
          <dd>{formatVolume(summary.totalVolumeMl)}</dd>
        </div>
        <div className="flex items-center justify-between text-[var(--text-1)]">
          <dt>One-time subtotal</dt>
          <dd>{formatCurrency(summary.oneTimeSubtotalUsd)}</dd>
        </div>
        <div className="flex items-center justify-between text-[var(--text-1)]">
          <dt>Subscription subtotal</dt>
          <dd>{formatCurrency(summary.subscriptionSubtotalUsd)}</dd>
        </div>
        <div className="flex items-center justify-between text-[var(--success)]">
          <dt>Subscription savings</dt>
          <dd>-{formatCurrency(summary.savingsUsd)}</dd>
        </div>
      </dl>
      <div className="mt-5 border-t border-[var(--border-soft)] pt-4">
        <p className="flex items-center justify-between text-base font-semibold text-[var(--text-0)]">
          <span>Total</span>
          <span>{formatCurrency(summary.orderTotalUsd)}</span>
        </p>
      </div>

      {!compact ? (
        <Link
          href="/checkout"
          className="mt-4 inline-flex w-full justify-center rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--bg-0)]"
        >
          Continue to Checkout
        </Link>
      ) : null}
    </div>
  );
}
