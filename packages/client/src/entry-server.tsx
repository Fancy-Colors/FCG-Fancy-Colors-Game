import App from './app';
import ReactDOMServer from 'react-dom/server';
import { StaticRouterProvider } from 'react-router-dom/server';
import {
  createStaticHandler,
  type StaticHandlerContext,
  type Router,
} from '@remix-run/router';
import { createRoutes } from './routes';
import { createStore } from './store';

export function createRenderer() {
  const store = createStore();
  const routes = createRoutes(store);
  const staticHandler = createStaticHandler(routes);

  const render = (
    router: Router,
    context: StaticHandlerContext,
    theme: string
  ) => {
    const renderResult = ReactDOMServer.renderToString(
      <App theme={theme} store={store}>
        <StaticRouterProvider router={router} context={context} />
      </App>
    );
    return { renderResult, initialState: store.getState() };
  };

  return { render, staticHandler };
}