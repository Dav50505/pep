'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CatalogProduct, SubscriptionCadence } from '@/lib/catalog';
import { formatCurrency } from '@/lib/cartMath';
import { useCart } from '@/components/cart/CartProvider';
import QuantityStepper from '@/components/product/QuantityStepper';

interface ProductCardProps {
  product: CatalogProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, canMutateCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [cadence, setCadence] = useState<SubscriptionCadence>('4_weeks');

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--accent-muted)] hover:shadow-[0_18px_34px_rgba(0,0,0,0.3)] focus-within:-translate-y-1 focus-within:border-[var(--accent-muted)] focus-within:shadow-[0_18px_34px_rgba(0,0,0,0.3)]">
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-[var(--bg-1)] focus-visible:outline-none">
        <Image src={product.imagePath} alt={`${product.name} vial artwork`} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02] group-focus-within:scale-[1.02]" />
        <span className="absolute left-3 top-3 rounded-full bg-[var(--surface-elev)] px-3 py-1 text-xs text-[var(--text-1)]">
          {product.badge}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">{product.concentration}</p>
        <h3 className="mt-2 text-2xl font-semibold text-[var(--text-0)]">{product.name}</h3>
        <p className="mt-2 text-sm text-[var(--text-1)]">{product.shortDescription}</p>
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-[var(--text-0)]">{formatCurrency(product.priceUsd)}</p>
            <p className="text-sm text-[var(--text-1)]">{product.volumeMl} mL vial</p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <select
              value={cadence}
              onChange={(event) => setCadence(event.target.value as SubscriptionCadence)}
              className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-elev)] px-3 py-2 text-xs text-[var(--text-1)]"
              aria-label="Subscription cadence"
            >
              <option value="2_weeks">Q2w</option>
              <option value="4_weeks">Q4w</option>
              <option value="8_weeks">Q8w</option>
            </select>
          </div>

          <button
            type="button"
            disabled={!product.inStock}
            title={!canMutateCart ? 'Sign in required to add items to cart.' : undefined}
            onClick={() =>
              addToCart({
                productSlug: product.slug,
                quantity,
                purchaseType: 'subscription',
                cadence,
                unitPriceUsd: product.priceUsd,
                unitVolumeMl: product.volumeMl,
              })
            }
            className="mt-5 w-full rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--bg-0)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {product.inStock ? (canMutateCart ? 'Quick Add Subscription' : 'Sign in to add') : 'Out of Stock'}
          </button>
        </div>
      </div>
    </article>
  );
}
