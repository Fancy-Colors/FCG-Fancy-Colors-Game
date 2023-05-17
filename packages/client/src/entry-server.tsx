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
import { UserDTO } from 'api/types';

type ServerContext = {
  user: Nullable<UserDTO>;
};

export function createRenderer({ user }: ServerContext) {
  const store = createStore();
  const routes = createRoutes(store, user);
  const staticHandler = createStaticHandler(routes);

  const render = (
    router: Router,
    context: StaticHandlerContext,
    theme: string,
    cspNonce: string
  ) => {
    const renderResult = ReactDOMServer.renderToString(
      <App theme={theme} store={store}>
        <StaticRouterProvider
          router={router}
          context={context}
          nonce={cspNonce}
        />
      </App>
    );
    return { renderResult, initialState: store.getState() };
  };

  return { render, staticHandler };
}
