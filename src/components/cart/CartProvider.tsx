'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import {
  CartLine,
  CartState,
  PurchaseType,
  SubscriptionCadence,
} from '@/lib/catalog';
import { computeCartSummary } from '@/lib/cartMath';
import {
  AddToCartPayload,
  CartAction,
  cartReducer,
  createInitialCartState,
} from '@/components/cart/cartReducer';
import { getCartStorageKey } from '@/lib/cartStorage';

type AddToCartInput = AddToCartPayload;

interface CartContextValue {
  state: CartState;
  summary: ReturnType<typeof computeCartSummary>;
  dispatch: Dispatch<CartAction>;
  canMutateCart: boolean;
  requireAuthForCartAction: () => boolean;
  addToCart: (input: AddToCartInput) => void;
  removeLine: (lineId: string) => void;
  setLineQuantity: (lineId: string, quantity: number) => void;
  setLinePurchaseType: (
    lineId: string,
    purchaseType: PurchaseType,
    cadence?: SubscriptionCadence,
  ) => void;
  setLineCadence: (lineId: string, cadence: SubscriptionCadence) => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  clearCart: () => void;
  getLine: (lineId: string) => CartLine | undefined;
}

const CartContext = createContext<CartContextValue | null>(null);

function isCartState(value: unknown): value is CartState {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const parsed = value as CartState;
  return (
    Array.isArray(parsed.lines) &&
    typeof parsed.isDrawerOpen === 'boolean' &&
    typeof parsed.lastUpdatedAt === 'string'
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { userId } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [state, dispatch] = useReducer(cartReducer, undefined, createInitialCartState);
  const hydratedStorageKeyRef = useRef<string | null>(null);

  const storageKey = useMemo(() => getCartStorageKey(userId ?? null), [userId]);

  useEffect(() => {
    if (hydratedStorageKeyRef.current === storageKey) {
      return;
    }

    try {
      const storedValue = window.localStorage.getItem(storageKey);
      if (!storedValue) {
        dispatch({ type: 'hydrate', payload: createInitialCartState() });
        return;
      }

      const parsed = JSON.parse(storedValue);
      if (isCartState(parsed)) {
        dispatch({ type: 'hydrate', payload: parsed });
        return;
      }

      dispatch({ type: 'hydrate', payload: createInitialCartState() });
    } catch {
      window.localStorage.removeItem(storageKey);
      dispatch({ type: 'hydrate', payload: createInitialCartState() });
    } finally {
      hydratedStorageKeyRef.current = storageKey;
    }
  }, [storageKey]);

  useEffect(() => {
    if (hydratedStorageKeyRef.current !== storageKey) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const summary = useMemo(() => computeCartSummary(state.lines), [state.lines]);
  const canMutateCart = Boolean(userId);

  const requireAuthForCartAction = useCallback(() => {
    if (userId) {
      return true;
    }

    const queryString = window.location.search.startsWith('?')
      ? window.location.search.slice(1)
      : window.location.search;
    const redirectTarget = `${pathname}${queryString ? `?${queryString}` : ''}`;
    router.push(`/sign-in?redirect_url=${encodeURIComponent(redirectTarget)}`);
    return false;
  }, [pathname, router, userId]);

  const addToCart = useCallback(
    (input: AddToCartInput) => {
      if (!requireAuthForCartAction()) {
        return;
      }

      dispatch({ type: 'addLine', payload: input });
      dispatch({ type: 'openDrawer' });
    },
    [requireAuthForCartAction],
  );

  const removeLine = useCallback((lineId: string) => {
    dispatch({ type: 'removeLine', payload: { lineId } });
  }, []);

  const setLineQuantity = useCallback((lineId: string, quantity: number) => {
    dispatch({ type: 'updateQuantity', payload: { lineId, quantity } });
  }, []);

  const setLinePurchaseType = useCallback(
    (lineId: string, purchaseType: PurchaseType, cadence?: SubscriptionCadence) => {
      dispatch({ type: 'updatePurchaseType', payload: { lineId, purchaseType, cadence } });
    },
    [],
  );

  const setLineCadence = useCallback((lineId: string, cadence: SubscriptionCadence) => {
    dispatch({ type: 'updateCadence', payload: { lineId, cadence } });
  }, []);

  const toggleDrawer = useCallback(() => dispatch({ type: 'toggleDrawer' }), []);
  const openDrawer = useCallback(() => dispatch({ type: 'openDrawer' }), []);
  const closeDrawer = useCallback(() => dispatch({ type: 'closeDrawer' }), []);
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo<CartContextValue>(() => {
    return {
      state,
      summary,
      dispatch,
      canMutateCart,
      requireAuthForCartAction,
      addToCart,
      removeLine,
      setLineQuantity,
      setLinePurchaseType,
      setLineCadence,
      toggleDrawer,
      openDrawer,
      closeDrawer,
      clearCart,
      getLine: (lineId) => state.lines.find((line) => line.lineId === lineId),
    };
  }, [
    addToCart,
    canMutateCart,
    clearCart,
    closeDrawer,
    openDrawer,
    removeLine,
    requireAuthForCartAction,
    setLineCadence,
    setLinePurchaseType,
    setLineQuantity,
    state,
    summary,
    toggleDrawer,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
