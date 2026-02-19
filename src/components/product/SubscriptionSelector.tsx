'use client';

import { PurchaseType, SUBSCRIPTION_CADENCES, SubscriptionCadence } from '@/lib/catalog';

interface SubscriptionSelectorProps {
  purchaseType: PurchaseType;
  cadence: SubscriptionCadence;
  discountPct: number;
  onPurchaseTypeChange: (next: PurchaseType) => void;
  onCadenceChange: (next: SubscriptionCadence) => void;
}

export default function SubscriptionSelector({
  purchaseType,
  cadence,
  discountPct,
  onPurchaseTypeChange,
  onCadenceChange,
}: SubscriptionSelectorProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onPurchaseTypeChange('one_time')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            purchaseType === 'one_time'
              ? 'bg-[var(--text-0)] text-[var(--bg-0)]'
              : 'bg-[var(--surface-elev)] text-[var(--text-1)] hover:text-[var(--text-0)]'
          }`}
        >
          One-time
        </button>
        <button
          type="button"
          onClick={() => onPurchaseTypeChange('subscription')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            purchaseType === 'subscription'
              ? 'bg-[var(--accent)] text-[var(--bg-0)]'
              : 'bg-[var(--surface-elev)] text-[var(--text-1)] hover:text-[var(--text-0)]'
          }`}
        >
          Subscribe & save {discountPct}%
        </button>
      </div>

      {purchaseType === 'subscription' ? (
        <label className="flex flex-col gap-2 text-sm text-[var(--text-1)]">
          Delivery frequency
          <select
            className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-1)] px-3 py-2 text-[var(--text-0)] outline-none"
            value={cadence}
            onChange={(event) => onCadenceChange(event.target.value as SubscriptionCadence)}
          >
            {Object.entries(SUBSCRIPTION_CADENCES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      ) : null}
    </div>
  );
}
