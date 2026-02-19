export const CART_STORAGE_KEY_BASE = 'pept_cart_v1';

export function getCartStorageKey(userId: string | null): string {
  if (!userId) {
    return `${CART_STORAGE_KEY_BASE}_guest`;
  }

  return `${CART_STORAGE_KEY_BASE}_${userId}`;
}
