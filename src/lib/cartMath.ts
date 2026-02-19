import {
  CartLine,
  CartSummary,
  CatalogProduct,
  PurchaseType,
  products,
} from '@/lib/catalog';

export const ROUND_PRECISION = 100;

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * ROUND_PRECISION) / ROUND_PRECISION;
}

function getDiscountPct(productSlug: string, purchaseType: PurchaseType): number {
  if (purchaseType !== 'subscription') {
    return 0;
  }

  const product = products.find((item) => item.slug === productSlug);
  return product?.subscriptionDiscountPct ?? 0;
}

export function computeLineTotal(line: CartLine): number {
  const discountPct = getDiscountPct(line.productSlug, line.purchaseType);
  const subtotal = line.unitPriceUsd * line.quantity;
  const discounted = subtotal * (1 - discountPct / 100);
  return roundCurrency(discounted);
}

export function computeLineVolume(line: CartLine): number {
  return roundCurrency(line.unitVolumeMl * line.quantity);
}

export function computeCartSummary(lines: CartLine[]): CartSummary {
  const initialSummary: CartSummary = {
    itemCount: 0,
    vialCount: 0,
    totalVolumeMl: 0,
    oneTimeSubtotalUsd: 0,
    subscriptionSubtotalUsd: 0,
    savingsUsd: 0,
    orderTotalUsd: 0,
  };

  const summary = lines.reduce((acc, line) => {
    const undiscounted = line.unitPriceUsd * line.quantity;
    const lineTotal = computeLineTotal(line);
    const lineVolume = computeLineVolume(line);

    acc.itemCount += line.quantity;
    acc.vialCount += line.quantity;
    acc.totalVolumeMl += lineVolume;

    if (line.purchaseType === 'subscription') {
      acc.subscriptionSubtotalUsd += lineTotal;
      acc.savingsUsd += undiscounted - lineTotal;
    } else {
      acc.oneTimeSubtotalUsd += lineTotal;
    }

    acc.orderTotalUsd += lineTotal;

    return acc;
  }, initialSummary);

  return {
    itemCount: summary.itemCount,
    vialCount: summary.vialCount,
    totalVolumeMl: roundCurrency(summary.totalVolumeMl),
    oneTimeSubtotalUsd: roundCurrency(summary.oneTimeSubtotalUsd),
    subscriptionSubtotalUsd: roundCurrency(summary.subscriptionSubtotalUsd),
    savingsUsd: roundCurrency(summary.savingsUsd),
    orderTotalUsd: roundCurrency(summary.orderTotalUsd),
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatVolume(value: number): string {
  return `${roundCurrency(value).toFixed(1)} mL`;
}

export function resolveProduct(line: CartLine): CatalogProduct | undefined {
  return products.find((product) => product.slug === line.productSlug);
}
