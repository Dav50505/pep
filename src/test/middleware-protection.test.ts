import { describe, expect, it } from 'vitest';
import { isProtectedPath } from '../../middleware';

describe('middleware protection routes', () => {
  it('marks cart and checkout paths as protected', () => {
    expect(isProtectedPath('/cart')).toBe(true);
    expect(isProtectedPath('/cart/items')).toBe(true);
    expect(isProtectedPath('/checkout')).toBe(true);
    expect(isProtectedPath('/checkout/success')).toBe(true);
  });

  it('keeps content and auth pages public', () => {
    expect(isProtectedPath('/')).toBe(false);
    expect(isProtectedPath('/catalog')).toBe(false);
    expect(isProtectedPath('/product/bpc-157')).toBe(false);
    expect(isProtectedPath('/sign-in')).toBe(false);
    expect(isProtectedPath('/sign-up')).toBe(false);
  });
});
