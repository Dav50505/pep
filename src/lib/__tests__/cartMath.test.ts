import { describe, expect, it } from 'vitest';
import { CartLine } from '@/lib/catalog';
import {
  computeCartSummary,
  computeLineTotal,
  computeLineVolume,
  formatCurrency,
  formatVolume,
} from '@/lib/cartMath';

describe('cartMath', () => {
  it('computes line total with subscription discount', () => {
    const line: CartLine = {
      lineId: 'line-a',
      productSlug: 'bpc-157',
      quantity: 2,
      purchaseType: 'subscription',
      cadence: '4_weeks',
      unitPriceUsd: 64,
      unitVolumeMl: 3,
    };

    expect(computeLineTotal(line)).toBe(112.64);
    expect(computeLineVolume(line)).toBe(6);
  });

  it('computes mixed summary totals and savings', () => {
    const lines: CartLine[] = [
      {
        lineId: 'line-a',
        productSlug: 'bpc-157',
        quantity: 2,
        purchaseType: 'subscription',
        cadence: '4_weeks',
        unitPriceUsd: 64,
        unitVolumeMl: 3,
      },
      {
        lineId: 'line-b',
        productSlug: 'tb-500',
        quantity: 1,
        purchaseType: 'one_time',
        cadence: '4_weeks',
        unitPriceUsd: 72,
        unitVolumeMl: 3,
      },
    ];

    const summary = computeCartSummary(lines);

    expect(summary.itemCount).toBe(3);
    expect(summary.vialCount).toBe(3);
    expect(summary.totalVolumeMl).toBe(9);
    expect(summary.oneTimeSubtotalUsd).toBe(72);
    expect(summary.subscriptionSubtotalUsd).toBe(112.64);
    expect(summary.savingsUsd).toBe(15.36);
    expect(summary.orderTotalUsd).toBe(184.64);
  });

  it('formats currency and volume values', () => {
    expect(formatCurrency(72)).toBe('$72.00');
    expect(formatVolume(9)).toBe('9.0 mL');
  });
});
