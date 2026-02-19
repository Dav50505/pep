'use client';

import Image from 'next/image';
import { CartLine, SUBSCRIPTION_CADENCES, SubscriptionCadence } from '@/lib/catalog';
import { computeLineTotal, computeLineVolume, formatCurrency } from '@/lib/cartMath';
import { getProductBySlug } from '@/lib/catalog';
import QuantityStepper from '@/components/product/QuantityStepper';
import { useCart } from '@/components/cart/CartProvider';

interface CartLineItemProps {
  line: CartLine;
}

export default function CartLineItem({ line }: CartLineItemProps) {
  const product = getProductBySlug(line.productSlug);
  const { removeLine, setLineCadence, setLinePurchaseType, setLineQuantity } = useCart();

  if (!product) {
    return null;
  }

  return (
    <article className="flex gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-[var(--bg-1)]">
        <Image src={product.imagePath} alt={product.name} fill className="object-cover" />
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-[var(--text-0)]">{product.name}</h3>
            <p className="text-sm text-[var(--text-1)]">
              {line.unitVolumeMl} mL each · {product.concentration}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeLine(line.lineId)}
            className="text-xs text-[var(--text-1)] transition hover:text-[var(--text-0)]"
          >
            Remove
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <QuantityStepper value={line.quantity} onChange={(quantity) => setLineQuantity(line.lineId, quantity)} />
          <select
            value={line.purchaseType}
            onChange={(event) => setLinePurchaseType(line.lineId, event.target.value as 'one_time' | 'subscription')}
            className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-elev)] px-3 py-2 text-xs text-[var(--text-0)]"
            aria-label="Purchase type"
          >
            <option value="one_time">One-time</option>
            <option value="subscription">Subscription</option>
          </select>

          {line.purchaseType === 'subscription' ? (
            <select
              value={line.cadence}
              onChange={(event) => setLineCadence(line.lineId, event.target.value as SubscriptionCadence)}
              className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-elev)] px-3 py-2 text-xs text-[var(--text-0)]"
              aria-label="Subscription cadence"
            >
              {Object.entries(SUBSCRIPTION_CADENCES).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          ) : null}
        </div>

        <div className="flex items-center justify-between text-sm">
          <p className="text-[var(--text-1)]">
            Volume: {computeLineVolume(line).toFixed(1)} mL
            {line.purchaseType === 'subscription' ? ` · ${SUBSCRIPTION_CADENCES[line.cadence]}` : ''}
          </p>
          <p className="font-semibold text-[var(--text-0)]">{formatCurrency(computeLineTotal(line))}</p>
        </div>
      </div>
    </article>
  );
}
