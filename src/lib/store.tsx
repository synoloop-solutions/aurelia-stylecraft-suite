import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
};

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (slug: string, size: string, color: string) => void;
  updateQty: (slug: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
};

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = "aurelia.cart.v1";
const WISH_KEY = "aurelia.wishlist.v1";

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function sameLine(a: CartItem, slug: string, size: string, color: string) {
  return a.slug === slug && a.size === size && a.color === color;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readLS<CartItem[]>(CART_KEY, []));
    setWishlist(readLS<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => sameLine(p, item.slug, item.size, item.color));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
        return next;
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((slug: string, size: string, color: string) => {
    setCart((prev) => prev.filter((p) => !sameLine(p, slug, size, color)));
  }, []);

  const updateQty = useCallback((slug: string, size: string, color: string, qty: number) => {
    setCart((prev) =>
      prev.map((p) => (sameLine(p, slug, size, color) ? { ...p, qty: Math.max(1, qty) } : p)),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const value = useMemo<StoreState>(() => {
    const cartCount = cart.reduce((n, i) => n + i.qty, 0);
    const cartSubtotal = cart.reduce((n, i) => n + i.qty * i.price, 0);
    return {
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      isWishlisted: (slug: string) => wishlist.includes(slug),
      cartCount,
      cartSubtotal,
    };
  }, [cart, wishlist, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}