import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const DEFAULT_THEME = Theme.LIGHT;

function getStoredTheme() {
  const storedTheme = localStorage.getItem('theme');

  if (!storedTheme || !Object.values(Theme).includes(storedTheme as Theme)) {
    return DEFAULT_THEME;
  }

  return storedTheme;
}

function refreshCurrentTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeProvider({ children }: { children: React.ReactElement }) {
  const [theme, setTheme] = useState(getStoredTheme);

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
