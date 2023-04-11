import { ThemeProvider, Theme } from 'components/hooks/use-theme';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import type { AppStore, InitialState } from './store';
import './styles/index.pcss';

function App({
  children,
  theme = Theme.LIGHT,
  store,
  initialState,
}: {
  children: React.ReactNode;
  theme?: string;
  store: AppStore;
  initialState?: InitialState;
}) {
  return (
    <React.StrictMode>
      <ThemeProvider initialValue={theme}>
        <StoreProvider store={store} serverState={initialState}>
          {children}
        </StoreProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;