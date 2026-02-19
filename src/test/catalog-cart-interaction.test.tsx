import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CartProvider } from '@/components/cart/CartProvider';
import CartDrawer from '@/components/cart/CartDrawer';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/product/ProductCard';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { products } from '@/lib/catalog';

vi.mock('next/navigation', () => ({
  usePathname: () => '/catalog',
  useRouter: () => ({ push: vi.fn() }),
}));

describe('catalog and PDP cart interactions', () => {
  it('updates cart badge and drawer totals from catalog and product detail adds', async () => {
    const user = userEvent.setup();

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
});
