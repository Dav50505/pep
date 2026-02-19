import { describe, expect, it } from 'vitest';
import { cartReducer, createInitialCartState } from '@/components/cart/cartReducer';

describe('cartReducer', () => {
  it('merges matching lines when added repeatedly', () => {
    const initial = createInitialCartState();

    const once = cartReducer(initial, {
      type: 'addLine',
      payload: {
        productSlug: 'bpc-157',
        quantity: 1,
        purchaseType: 'subscription',
        cadence: '4_weeks',
        unitPriceUsd: 64,
        unitVolumeMl: 3,
      },
    });

    const twice = cartReducer(once, {
      type: 'addLine',
      payload: {
        productSlug: 'bpc-157',
        quantity: 2,
        purchaseType: 'subscription',
        cadence: '4_weeks',
        unitPriceUsd: 64,
        unitVolumeMl: 3,
      },
    });

    expect(twice.lines).toHaveLength(1);
    expect(twice.lines[0].quantity).toBe(3);
  });

  it('coalesces lines when purchase type changes to an existing option', () => {
    const initial = createInitialCartState();

    const withOneTime = cartReducer(initial, {
      type: 'addLine',
      payload: {
        lineId: 'one-time',
        productSlug: 'tb-500',
        quantity: 1,
        purchaseType: 'one_time',
        cadence: '4_weeks',
        unitPriceUsd: 72,
        unitVolumeMl: 3,
      },
    });

    const withSubscription = cartReducer(withOneTime, {
      type: 'addLine',
      payload: {
        lineId: 'subscription',
        productSlug: 'tb-500',
        quantity: 2,
        purchaseType: 'subscription',
        cadence: '4_weeks',
        unitPriceUsd: 72,
        unitVolumeMl: 3,
      },
    });

    const merged = cartReducer(withSubscription, {
      type: 'updatePurchaseType',
      payload: {
        lineId: 'one-time',
        purchaseType: 'subscription',
        cadence: '4_weeks',
      },
    });

    expect(merged.lines).toHaveLength(1);
    expect(merged.lines[0].purchaseType).toBe('subscription');
    expect(merged.lines[0].quantity).toBe(3);
  });

  it('removes lines for zero quantity and avoids no-op drawer updates', () => {
    const initial = createInitialCartState();
    const withLine = cartReducer(initial, {
      type: 'addLine',
      payload: {
        lineId: 'qty-test',
        productSlug: 'ipamorelin',
        quantity: 3,
        purchaseType: 'one_time',
        cadence: '4_weeks',
        unitPriceUsd: 58,
        unitVolumeMl: 2,
      },
    });

    const normalized = cartReducer(withLine, {
      type: 'updateQuantity',
      payload: { lineId: 'qty-test', quantity: 0 },
    });

    expect(normalized.lines).toHaveLength(0);

    const closed = cartReducer(normalized, { type: 'closeDrawer' });
    expect(closed).toBe(normalized);
  });
});
