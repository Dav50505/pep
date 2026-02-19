import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CartProvider } from '@/components/cart/CartProvider';
import CartDrawer from '@/components/cart/CartDrawer';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/product/ProductCard';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { products } from '@/lib/catalog';
import {
  routerPushMock,
  setAuthUser,
  setMockPathname,
} from '@/test/mocks';

describe('catalog and PDP cart interactions', () => {
  it('updates cart badge and drawer totals for signed-in users', async () => {
    const user = userEvent.setup();
    setAuthUser('user_123');
    setMockPathname('/catalog');

    render(
      <CartProvider>
        <Navbar />
        <ProductCard product={products[0]} />
        <ProductDetailClient product={products[1]} />
        <CartDrawer />
      </CartProvider>,
    );

    await user.click(screen.getByRole('button', { name: /quick add subscription/i }));

    expect(screen.getByText(/1 items/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Cart' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cart · 3.0 mL/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^Add to Cart$/i }));

    expect(screen.getByText(/2 items/i)).toBeInTheDocument();
  });

  it('redirects signed-out users to sign-in with redirect_url on add-to-cart', async () => {
    const user = userEvent.setup();
    setAuthUser(null);
    setMockPathname('/catalog');

    render(
      <CartProvider>
        <ProductCard product={products[0]} />
      </CartProvider>,
    );

    await user.click(screen.getByRole('button', { name: /Sign in to add/i }));

    expect(routerPushMock).toHaveBeenCalledWith('/sign-in?redirect_url=%2Fcatalog');
  });
});
