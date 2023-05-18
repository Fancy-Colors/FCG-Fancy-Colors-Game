import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import { themeApi } from 'api/theme';
import { useIsMounted } from 'components/hooks';

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
  const isMounted = useIsMounted();
  const [theme, setTheme] = useState(() => {
    return import.meta.env.SSR ? initialValue : getStoredTheme();
  });

  const toggleTheme = useCallback(async () => {
    const updatedThemeName = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    await themeApi.update(updatedThemeName);
    setTheme(updatedThemeName);
  }, [theme]);

  useEffect(() => {
    if (!import.meta.env.SSR && isMounted()) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, isMounted]);

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
