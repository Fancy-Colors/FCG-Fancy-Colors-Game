import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createServer as createViteServer, type ViteDevServer } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import jsesc from 'jsesc';
import type {
  StaticHandlerContext,
  StaticHandler,
  Router,
} from '@remix-run/router';
import { createStaticRouter } from 'react-router-dom/server.js';

const isDev = process.env.NODE_ENV === 'development';

type SSRModule = {
  staticHandler: StaticHandler;
  render: (
    router: Router,
    context: StaticHandlerContext,
    theme: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => { renderResult: string; initialState: Record<string, any> };
};

async function bootstrap() {
  const app = express();
  const port = Number(process.env.SERVER_PORT) || 3001;

  app.use(cors());

  const require = createRequire(import.meta.url);
  const templatePath = require.resolve('client/index.html');
  const staticPath = path.dirname(templatePath);
  const clientRoot = path.dirname(require.resolve('client/package.json'));

  let vite = null as ViteDevServer | null;

  if (isDev) {
    vite = await createViteServer({
      root: clientRoot,
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite!.middlewares);
  }

  app.use(
    '/api/v2',
    createProxyMiddleware({
      logLevel: isDev ? 'debug' : 'info',
      changeOrigin: true,
      cookieDomainRewrite: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  );

  if (!isDev) {
    app.use(express.static(staticPath, { index: false }));
  }

  app.use('*', cookieParser(), async (req, res, next) => {
    if (!req.get('Accept')?.includes('text/html')) {
      return next();
    }

    const url = req.originalUrl;
    let template: string;
    let ssrModule: SSRModule;

    try {
      if (isDev) {
        template = fs.readFileSync(
          require.resolve('client/dev/index.html'),
          'utf-8'
        );
        template = await vite!.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(templatePath, 'utf-8');
      }

      if (isDev) {
        ssrModule = (await vite!.ssrLoadModule(
          require.resolve('client/dev/entry-server')
        )) as SSRModule;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Разобраться как подтянуть типизацию внешнего пакета
        ssrModule = (await import('client')) as SSRModule;
      }

      const { staticHandler, render } = ssrModule;
      const fetchRequest = createFetchRequest(req);
      const context = await staticHandler.query(fetchRequest);

      if (context instanceof Response) {
        return res.redirect(
          context.status,
          context.headers.get('Location') as string
        );
      }

      const router = createStaticRouter(staticHandler.dataRoutes, context);

      const storedTheme = req.cookies.theme;
      // Получаем предпочитаемую пользователем тему из настроек браузера
      // https://web.dev/user-preference-media-features-headers/
      const userPreferredTheme =
        req.headers['sec-ch-prefers-color-scheme'] ?? 'light';
      const detectedTheme = storedTheme || userPreferredTheme;

      const { initialState, renderResult } = render(
        router,
        context,
        detectedTheme
      );

      const initialStateSerialized = jsesc(initialState, {
        json: true,
        isScriptContext: true,
      });

      const html = template
        .replace('<!--ssr-outlet-->', renderResult)
        .replace('<!--store-data-->', initialStateSerialized)
        .replace('{{__THEME__}}', detectedTheme);

      // eslint-disable-next-line @typescript-eslint/naming-convention
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      if (isDev && e instanceof Error) {
        vite!.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

function createRequestHeaders(
  requestHeaders: express.Request['headers']
): Headers {
  const headers = new Headers();

  for (const [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  return headers;
}

function createFetchRequest(req: express.Request): Request {
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

bootstrap();
