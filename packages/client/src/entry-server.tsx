import App from './app';
import ReactDOMServer from 'react-dom/server';
import {
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import {
  createStaticHandler,
  type StaticHandlerContext,
} from '@remix-run/router';
import type * as express from 'express';
import { routes } from './routes';
import { createRemixHeaders as createRequestHeaders } from '@remix-run/express/dist/server';

const { query, dataRoutes } = createStaticHandler(routes);

export async function render(
  req: express.Request,
  res: express.Response,
  theme: string
) {
  const fetchRequest = createFetchRequest(req);
  const context = (await query(fetchRequest)) as StaticHandlerContext;
  const router = createStaticRouter(dataRoutes, context);

  if (
    context instanceof Response &&
    [301, 302, 303, 307, 308].includes(context.status)
  ) {
    return res.redirect(
      context.status,
      context.headers.get('Location') as string
    );
  }

  return ReactDOMServer.renderToString(
    <App theme={theme}>
      <StaticRouterProvider router={router} context={context} />
    </App>
  );
}

export function createFetchRequest(req: express.Request): Request {
  const origin = `${req.protocol}://${req.get('host')}`;
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  const requestInit: RequestInit = {
    method: req.method,
    headers: createRequestHeaders(req.headers),
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    requestInit.body = req.body;
  }

  return new Request(url.href, requestInit);
}
