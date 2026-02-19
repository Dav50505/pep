'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CatalogProduct, PurchaseType, SubscriptionCadence } from '@/lib/catalog';
import { formatCurrency } from '@/lib/cartMath';
import { useCart } from '@/components/cart/CartProvider';
import QuantityStepper from '@/components/product/QuantityStepper';
import SubscriptionSelector from '@/components/product/SubscriptionSelector';
import ComplianceNote from '@/components/product/ComplianceNote';

interface ProductDetailClientProps {
  product: CatalogProduct;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('one_time');
  const [cadence, setCadence] = useState<SubscriptionCadence>('4_weeks');

  return (
    <main className="section-shell pb-20 pt-28">
      <Link href="/catalog" className="text-sm text-[var(--text-1)] transition hover:text-[var(--text-0)]">
        ← Back to catalog
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)]">
          <Image src={product.imagePath} alt={product.name} fill className="object-cover" />
          <span className="absolute left-4 top-4 rounded-full bg-[var(--surface-elev)] px-3 py-1 text-xs text-[var(--text-1)]">
            {product.badge}
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">{product.category}</p>
            <h1 className="font-display text-5xl leading-none text-[var(--text-0)]">{product.name}</h1>
            <p className="mt-4 text-sm text-[var(--text-1)]">{product.longDescription}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--border-soft)] px-3 py-1 text-xs text-[var(--text-1)]">
                {tag}
              </span>
            ))}
          </div>

          <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-semibold text-[var(--text-0)]">{formatCurrency(product.priceUsd)}</p>
              <p className="text-sm text-[var(--text-1)]">
                {product.volumeMl} mL · {product.concentration}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <p className="text-sm text-[var(--text-1)]">Line volume: {(product.volumeMl * quantity).toFixed(1)} mL</p>
            </div>

            <div className="mt-4">
              <SubscriptionSelector
                purchaseType={purchaseType}
                cadence={cadence}
                discountPct={product.subscriptionDiscountPct}
                onPurchaseTypeChange={setPurchaseType}
                onCadenceChange={setCadence}
              />
            </div>

            <button
              type="button"
              disabled={!product.inStock}
              onClick={() =>
                addToCart({
                  productSlug: product.slug,
                  quantity,
                  purchaseType,
                  cadence,
                  unitPriceUsd: product.priceUsd,
                  unitVolumeMl: product.volumeMl,
                })
              }
              className="mt-5 w-full rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg-0)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {product.inStock ? 'Add to Cart' : 'Unavailable'}
            </button>
          </div>

          <div className="grid gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5 text-sm text-[var(--text-1)]">
            <p className="flex items-center justify-between">
              <span>Purity</span>
              <span className="text-[var(--text-0)]">≥ 99% (placeholder)</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Storage</span>
              <span className="text-[var(--text-0)]">-20°C recommended</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Format</span>
              <span className="text-[var(--text-0)]">Lyophilized vial</span>
            </p>
          </div>

          <ComplianceNote />
        </div>
      </div>
    </main>
  );
}
