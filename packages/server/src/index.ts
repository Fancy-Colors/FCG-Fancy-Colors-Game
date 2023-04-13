import cors from 'cors';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createServer as createViteServer, type ViteDevServer } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import jsesc from 'jsesc';
import { createStaticRouter } from 'react-router-dom/server.js';
import { dbConnect } from './db.js';
import { createFetchRequest } from './utils/request-adapter.js';
import { router } from './router.js';

const isDev = process.env.NODE_ENV === 'development';

async function bootstrap() {
  await dbConnect();
  const app = express();
  const port = Number(process.env.SERVER_PORT) || 5000;

  const require = createRequire(import.meta.url);
  const templatePath = require.resolve('client/index.html');
  const staticPath = path.dirname(templatePath);
  const clientRoot = path.dirname(require.resolve('client/package.json'));

  let vite = null as ViteDevServer | null;

  app.use(cors());

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
  app.use(express.json());
  app.use('/api', router);

  if (!isDev) {
    app.use(express.static(staticPath, { index: false }));
  }

  app.use('*', cookieParser(), async (req, res, next) => {
    if (!req.get('Accept')?.includes('text/html')) {
      return next();
    }

    const url = req.originalUrl;
    let template: string;
    let ssrModule;

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
        )) as typeof import('client');
      } else {
        ssrModule = await import('client');
      }

      const { createRenderer } = ssrModule;
      const { render, staticHandler } = createRenderer();
      const fetchRequest = createFetchRequest(req);
      const context = await staticHandler.query(fetchRequest);

      if (context instanceof Response) {
        return res.redirect(
          context.status,
          context.headers.get('Location') as string
        );
      }

      const staticRouter = createStaticRouter(
        staticHandler.dataRoutes,
        context
      );

      const storedTheme = req.cookies.theme;
      // Получаем предпочитаемую пользователем тему из настроек браузера
      // https://web.dev/user-preference-media-features-headers/
      const userPreferredTheme =
        req.headers['sec-ch-prefers-color-scheme'] ?? 'light';
      const detectedTheme = storedTheme || userPreferredTheme;

      const { initialState, renderResult } = render(
        staticRouter,
        context,
        detectedTheme
      );

      const initialStateSerialized = jsesc(initialState, {
        json: true,
        isScriptContext: true,
      });
      const storeState = `<script>window.__INITIAL_STATE__ = ${initialStateSerialized}</script>`;

      const html = template
        .replace('<!--ssr-outlet-->', renderResult)
        .replace('<!--store-state-->', storeState)
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

bootstrap();
