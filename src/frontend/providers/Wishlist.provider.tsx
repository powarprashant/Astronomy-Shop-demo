// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'otel-demo-wishlist';

interface IContext {
  wishlist: string[];
  isWishlisted(productId: string): boolean;
  toggleWishlist(productId: string): void;
}

export const Context = createContext<IContext>({
  wishlist: [],
  isWishlisted: () => false,
  toggleWishlist: () => {},
});

interface IProps {
  children: React.ReactNode;
}

export const useWishlist = () => useContext(Context);

const WishlistProvider = ({ children }: IProps) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setWishlist(JSON.parse(raw));
    } catch {
      // corrupt or unavailable localStorage - keep default empty wishlist
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore write failures
    }
  }, [wishlist, hydrated]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  }, []);

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const value = useMemo(() => ({ wishlist, isWishlisted, toggleWishlist }), [wishlist, isWishlisted, toggleWishlist]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default WishlistProvider;
