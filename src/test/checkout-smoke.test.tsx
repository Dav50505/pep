import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CartProvider } from '@/components/cart/CartProvider';
import CheckoutPage from '@/app/checkout/page';
import { getCartStorageKey } from '@/lib/cartStorage';
import { routerPushMock, setAuthUser, setMockPathname } from '@/test/mocks';

describe('checkout smoke flow', () => {
  it('walks shipping -> review -> payment and submits placeholder order', async () => {
    const user = userEvent.setup();
    setAuthUser('user_checkout');
    setMockPathname('/checkout');

    const storageKey = getCartStorageKey('user_checkout');

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        lines: [
          {
            lineId: 'smoke-line',
            productSlug: 'bpc-157',
            quantity: 1,
            purchaseType: 'subscription',
            cadence: '4_weeks',
            unitPriceUsd: 64,
            unitVolumeMl: 3,
          },
        ],
        isDrawerOpen: false,
        lastUpdatedAt: new Date().toISOString(),
      }),
    );

    render(
      <CartProvider>
        <CheckoutPage />
      </CartProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Mock checkout flow/i)).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText(/Full name/i), 'Research Ops');
    await user.type(screen.getByLabelText(/Email/i), 'ops@lab.test');
    await user.type(screen.getByLabelText(/Institution/i), 'PEPT Lab');
    await user.type(screen.getByLabelText(/Address/i), '101 Catalyst Ave');
    await user.type(screen.getByLabelText(/City/i), 'Austin');
    await user.type(screen.getByLabelText(/^State$/i), 'TX');
    await user.type(screen.getByLabelText(/ZIP/i), '73301');

    await user.click(screen.getByRole('button', { name: /Continue to Review/i }));

    expect(screen.getByText(/BPC-157/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Continue to Payment/i }));

    await user.type(screen.getByLabelText(/Cardholder name/i), 'Research Ops');
    await user.type(screen.getByLabelText(/Card number/i), '4242424242424242');
    await user.type(screen.getByLabelText(/Expiry/i), '12/28');
    await user.type(screen.getByLabelText(/CVC/i), '123');

    await user.click(screen.getByRole('button', { name: /Place Placeholder Order/i }));

    expect(routerPushMock).toHaveBeenCalledWith('/checkout/success');

    await waitFor(() => {
      const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? '{}') as {
        lines?: unknown[];
      };
      expect(parsed.lines).toEqual([]);
    });
  });
});
