import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Cookies from 'js-cookie';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const DEFAULT_THEME = Theme.LIGHT;

function getStoredTheme() {
  const storedTheme = Cookies.get('theme') as Theme;

  if (!storedTheme || !Object.values(Theme).includes(storedTheme)) {
    return DEFAULT_THEME;
  }

  return storedTheme;
}

function refreshCurrentTheme(theme: string) {
  Cookies.set('theme', theme);

  if (!import.meta.env.SSR) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeProvider({
  children,
  initialValue,
}: {
  children: React.ReactElement;
  initialValue: string;
}) {
  const [theme, setTheme] = useState(() => {
    return import.meta.env.SSR ? initialValue : getStoredTheme();
  });

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) =>
      currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  }, []);

  useEffect(() => {
    refreshCurrentTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
