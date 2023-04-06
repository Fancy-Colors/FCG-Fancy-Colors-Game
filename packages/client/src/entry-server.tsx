import App from './app';
import ReactDOMServer from 'react-dom/server';
import { StaticRouterProvider } from 'react-router-dom/server';
import {
  createStaticHandler,
  type StaticHandlerContext,
  type Router,
} from '@remix-run/router';
import { routes } from './routes';
import { createStore } from './store';

export const staticHandler = createStaticHandler(routes);

export function render(
  router: Router,
  context: StaticHandlerContext,
  theme: string
) {
  const store = createStore();

  const renderResult = ReactDOMServer.renderToString(
    <App theme={theme} store={store}>
      <StaticRouterProvider router={router} context={context} />
    </App>
  );

  return { renderResult, initialState: store.getState() };
}
