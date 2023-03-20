import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'components/hooks/use-theme';
import App from './app';
import { store } from './store';
import './styles/index.pcss';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
