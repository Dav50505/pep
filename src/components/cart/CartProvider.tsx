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
  CART_STORAGE_KEY,
  createInitialCartState,
} from '@/components/cart/cartReducer';

type AddToCartInput = AddToCartPayload;

interface CartContextValue {
  state: CartState;
  summary: ReturnType<typeof computeCartSummary>;
  dispatch: Dispatch<CartAction>;
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
  const [state, dispatch] = useReducer(cartReducer, undefined, createInitialCartState);
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    if (hasHydratedRef.current) {
      return;
    }

    try {
      const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!storedValue) {
        hasHydratedRef.current = true;
        return;
      }

      const parsed = JSON.parse(storedValue);
      if (isCartState(parsed)) {
        dispatch({ type: 'hydrate', payload: parsed });
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      hasHydratedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hasHydratedRef.current) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const summary = useMemo(() => computeCartSummary(state.lines), [state.lines]);

  const addToCart = useCallback((input: AddToCartInput) => {
    dispatch({ type: 'addLine', payload: input });
    dispatch({ type: 'openDrawer' });
  }, []);
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
    clearCart,
    closeDrawer,
    openDrawer,
    removeLine,
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
