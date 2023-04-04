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

const isDev = process.env.NODE_ENV === 'development';

type SSRModule = {
  render: (
    req: express.Request,
    res: express.Response,
    theme: string
  ) => Promise<string | null>;
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

  app.use('*', cookieParser(), async (req, res, next) => {
    if (!req.get('Accept')?.includes('text/html')) {
      return next();
    }

    const url = req.originalUrl;
    let template: string;
    let ssrModule: SSRModule;

    const storedTheme = req.cookies.theme;
    // Получаем предпочитаемую пользователем тему из настроек браузера
    // https://web.dev/user-preference-media-features-headers/
    const userPreferredTheme =
      req.headers['sec-ch-prefers-color-scheme'] ?? 'light';
    const detectedTheme = storedTheme || userPreferredTheme;

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

      const result = await ssrModule.render(req, res, detectedTheme);

      if (typeof result !== 'string') {
        return;
      }

      const html = template
        .replace('<!--ssr-outlet-->', result)
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

  if (!isDev) {
    app.use(express.static(staticPath));
  }

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

bootstrap();
