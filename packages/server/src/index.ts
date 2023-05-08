import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createServer as createViteServer, type ViteDevServer } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import { dbConnect } from './db.js';
import { router } from './router.js';
import { createSSRController } from './controllers/ssr.controller.js';

const isDev = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const db = await dbConnect();
  const app = express();
  const port = Number(process.env.SERVER_PORT) || 5000;

  const require = createRequire(import.meta.url);
  const templatePath = require.resolve('client/index.html');
  const staticPath = path.dirname(templatePath);
  const clientRoot = path.dirname(require.resolve('client/package.json'));

  let vite: ViteDevServer | undefined;

  app.use(cors());
  app.use('/healthz', (_req, res) => {
    res.send('ok');
  });

  if (isDev) {
    vite = await createViteServer({
      root: clientRoot,
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);
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
      target: process.env.PRAKTIKUM_API_URL,
    })
  );
  app.use(express.json());
  app.use('/api', router);

  if (!isDev) {
    app.use(express.static(staticPath, { index: false }));
  }

  app.use('*', cookieParser(), createSSRController(vite));

  /* eslint-disable no-console */
  const server = app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
  process.on('unhandledRejection', gracefulShutdown);

  function gracefulShutdown(signal: string | number) {
    console.log(`  ➜ Received signal to terminate: ${signal}`);
    server.close(async () => {
      await vite?.close();
      await db.close();
      process.kill(process.pid, signal);
    });
  }
  /* eslint-enable no-console */
}

bootstrap();
