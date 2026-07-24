// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'otel-demo-theme';

interface IContext {
  isDark: boolean;
  toggleTheme(): void;
}

export const Context = createContext<IContext>({
  isDark: false,
  toggleTheme: () => {},
});

interface IProps {
  children: React.ReactNode;
}

export const useThemeMode = () => useContext(Context);

const ThemeModeProvider = ({ children }: IProps) => {
  const [isDark, setIsDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark') {
        setIsDark(true);
      } else if (stored === 'light') {
        setIsDark(false);
      } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        setIsDark(true);
      }
    } catch {
      // localStorage unavailable (e.g. privacy mode) - keep default light theme
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {
      // ignore write failures
    }
  }, [isDark, hydrated]);

  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ThemeModeProvider;
