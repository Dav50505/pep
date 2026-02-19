import { describe, expect, it } from 'vitest';
import { CART_STORAGE_KEY_BASE, getCartStorageKey } from '@/lib/cartStorage';

describe('cart storage key derivation', () => {
  it('uses guest key for signed-out users', () => {
    expect(getCartStorageKey(null)).toBe(`${CART_STORAGE_KEY_BASE}_guest`);
  });

  it('uses user-scoped key for signed-in users', () => {
    expect(getCartStorageKey('user_abc')).toBe(`${CART_STORAGE_KEY_BASE}_user_abc`);
  });
});
