'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import { Product } from '@/lib/types';

export interface LocalCartItem {
  product: Product;
  quantity: number;
  /** Professional installation add-on selected for this line; price confirmed separately (spec §7.5.3). */
  installation: boolean;
}

interface CartContextValue {
  items: LocalCartItem[];
  addItem: (product: Product, quantity?: number, installation?: boolean) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  hasInstallation: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'ecommerce-cart';
const EMPTY_SNAPSHOT = '[]';

// Same-tab writes don't fire the browser's `storage` event (that only fires in
// *other* tabs), so we notify our own subscribers manually after every write.
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
}

function getServerSnapshot(): string {
  return EMPTY_SNAPSHOT;
}

function writeStoredCart(items: LocalCartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  listeners.forEach((callback) => callback());
}

function parseStoredCart(json: string): LocalCartItem[] {
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const storedJson = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const items = useMemo(() => parseStoredCart(storedJson), [storedJson]);
  const [isOpen, setIsOpen] = useState(false);

  const setItems = useCallback((updater: (prev: LocalCartItem[]) => LocalCartItem[]) => {
    writeStoredCart(updater(parseStoredCart(getSnapshot())));
  }, []);

  const addItem = useCallback(
    (product: Product, quantity = 1, installation = false) => {
      if (product.purchaseMode !== 'buy') {
        throw new Error(`Cannot add a POA product to the cart: ${product.slug}`);
      }
      setItems((prev) => {
        const existing = prev.find(
          (item) => item.product.id === product.id && item.installation === installation,
        );
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id && item.installation === installation
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...prev, { product, quantity, installation }];
      });
      setIsOpen(true);
    },
    [setItems],
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
    },
    [setItems],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setItems((prev) =>
        prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
      );
    },
    [setItems],
  );

  const clearCart = useCallback(() => setItems(() => []), [setItems]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0),
    [items],
  );

  const hasInstallation = useMemo(() => items.some((item) => item.installation), [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    hasInstallation,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
