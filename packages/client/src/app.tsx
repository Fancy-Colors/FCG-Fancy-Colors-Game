import { ThemeProvider, Theme } from 'components/hooks/use-theme';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import './styles/index.pcss';

function App({
  children,
  theme = Theme.LIGHT,
}: {
  children: React.ReactNode;
  theme?: string;
}) {
  return (
    <React.StrictMode>
      <ThemeProvider initialValue={theme}>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
