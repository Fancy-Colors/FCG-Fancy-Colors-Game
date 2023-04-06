import App from './app';
import ReactDOM from 'react-dom/client';
import { createRoutes } from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createStore } from './store';

const initialState = window.__INITIAL_STATE__ ?? {};
delete window.__INITIAL_STATE__;

const store = createStore(initialState);
const router = createBrowserRouter(createRoutes(store));

ReactDOM.hydrateRoot(
  document.querySelector('#root') as HTMLElement,
  <App store={store} initialState={initialState}>
    <RouterProvider router={router} />
  </App>
);
