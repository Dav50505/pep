import {
  CartLine,
  CartState,
  PurchaseType,
  SubscriptionCadence,
} from '@/lib/catalog';
import { getCartStorageKey } from '@/lib/cartStorage';

export const CART_STORAGE_KEY = getCartStorageKey(null);
export const DEFAULT_CADENCE: SubscriptionCadence = '4_weeks';

export interface AddToCartPayload {
  lineId?: string;
  productSlug: string;
  quantity: number;
  purchaseType: PurchaseType;
  cadence?: SubscriptionCadence;
  unitPriceUsd: number;
  unitVolumeMl: number;
}

export type CartAction =
  | { type: 'hydrate'; payload: CartState }
  | { type: 'toggleDrawer' }
  | { type: 'openDrawer' }
  | { type: 'closeDrawer' }
  | { type: 'addLine'; payload: AddToCartPayload }
  | { type: 'removeLine'; payload: { lineId: string } }
  | { type: 'updateQuantity'; payload: { lineId: string; quantity: number } }
  | {
      type: 'updatePurchaseType';
      payload: {
        lineId: string;
        purchaseType: PurchaseType;
        cadence?: SubscriptionCadence;
      };
    }
  | { type: 'updateCadence'; payload: { lineId: string; cadence: SubscriptionCadence } }
  | { type: 'clear' };

function nowIso(): string {
  return new Date().toISOString();
}

function createLineId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function normalizeQuantity(quantity: number): number {
  return Math.max(1, Math.floor(quantity));
}

export function createInitialCartState(): CartState {
  return {
    lines: [],
    isDrawerOpen: false,
    lastUpdatedAt: nowIso(),
  };
}

function withTimestamp(state: CartState): CartState {
  return {
    ...state,
    lastUpdatedAt: nowIso(),
  };
}

function mergeLine(lines: CartLine[], payload: AddToCartPayload): CartLine[] {
  const cadence = payload.cadence ?? DEFAULT_CADENCE;
  const quantity = normalizeQuantity(payload.quantity);

  const matchingIndex = lines.findIndex(
    (line) =>
      line.productSlug === payload.productSlug &&
      line.purchaseType === payload.purchaseType &&
      line.cadence === cadence,
  );

  if (matchingIndex === -1) {
    return [
      ...lines,
      {
        lineId: payload.lineId ?? createLineId(),
        productSlug: payload.productSlug,
        quantity,
        purchaseType: payload.purchaseType,
        cadence,
        unitPriceUsd: payload.unitPriceUsd,
        unitVolumeMl: payload.unitVolumeMl,
      },
    ];
  }

  return lines.map((line, index) => {
    if (index !== matchingIndex) {
      return line;
    }

    return {
      ...line,
      quantity: line.quantity + quantity,
      unitPriceUsd: payload.unitPriceUsd,
      unitVolumeMl: payload.unitVolumeMl,
    };
  });
}

function coalesceLines(lines: CartLine[]): CartLine[] {
  return lines.reduce<CartLine[]>((acc, current) => {
    const existingIndex = acc.findIndex(
      (line) =>
        line.productSlug === current.productSlug &&
        line.purchaseType === current.purchaseType &&
        line.cadence === current.cadence,
    );

    if (existingIndex === -1) {
      acc.push(current);
      return acc;
    }

    const existing = acc[existingIndex];
    acc[existingIndex] = {
      ...existing,
      quantity: existing.quantity + current.quantity,
    };
    return acc;
  }, []);
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'hydrate':
      return action.payload;
    case 'toggleDrawer':
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case 'openDrawer':
      return state.isDrawerOpen ? state : { ...state, isDrawerOpen: true };
    case 'closeDrawer':
      return state.isDrawerOpen ? { ...state, isDrawerOpen: false } : state;
    case 'addLine':
      return withTimestamp({
        ...state,
        lines: mergeLine(state.lines, action.payload),
      });
    case 'removeLine':
      return withTimestamp({
        ...state,
        lines: state.lines.filter((line) => line.lineId !== action.payload.lineId),
      });
    case 'updateQuantity':
      if (action.payload.quantity <= 0) {
        return withTimestamp({
          ...state,
          lines: state.lines.filter((line) => line.lineId !== action.payload.lineId),
        });
      }

      return withTimestamp({
        ...state,
        lines: state.lines.map((line) => {
          if (line.lineId !== action.payload.lineId) {
            return line;
          }

          return {
            ...line,
            quantity: normalizeQuantity(action.payload.quantity),
          };
        }),
      });
    case 'updatePurchaseType':
      return withTimestamp({
        ...state,
        lines: coalesceLines(
          state.lines.map((line) => {
            if (line.lineId !== action.payload.lineId) {
              return line;
            }

            return {
              ...line,
              purchaseType: action.payload.purchaseType,
              cadence: action.payload.cadence ?? line.cadence,
            };
          }),
        ),
      });
    case 'updateCadence':
      return withTimestamp({
        ...state,
        lines: coalesceLines(
          state.lines.map((line) => {
            if (line.lineId !== action.payload.lineId) {
              return line;
            }

            return {
              ...line,
              cadence: action.payload.cadence,
            };
          }),
        ),
      });
    case 'clear':
      return withTimestamp({
        ...state,
        lines: [],
        isDrawerOpen: false,
      });
    default:
      return state;
  }
}
