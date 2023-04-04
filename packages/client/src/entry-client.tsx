import App from './app';
import ReactDOM from 'react-dom/client';
import { routes } from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
  document.querySelector('#root') as HTMLElement,
  <App>
    <RouterProvider router={router} />
  </App>
);
