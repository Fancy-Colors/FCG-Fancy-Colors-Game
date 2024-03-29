import cors from 'cors';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createServer as createViteServer, type ViteDevServer } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';
import { dbConnect } from './db.js';
import { router } from './router.js';
import { createSSRController } from './controllers/ssr.controller.js';
import { ErrorResponse } from './utils/error-response.js';
import { authContext } from './middlewares/auth.js';
import helmet from 'helmet';
import { cspNonce } from './middlewares/csp-nonce.js';
import type { IncomingMessage, ServerResponse } from 'node:http';

const isDev = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const db = await dbConnect();
  const app = express();
  const port = Number(process.env.SERVER_PORT) || 5000;

  const require = createRequire(import.meta.url);
  const clientRoot = path.dirname(require.resolve('client/package.json'));

  let vite: ViteDevServer | undefined;

  app.disable('x-powered-by');
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
      target: process.env.PRACTICUM_API_URL,
    })
  );
  app.use(express.json());
  app.use(httpContext.middleware);
  app.use(cookieParser());
  app.use(authContext);
  app.use('/api', router);
  app.use(cspNonce);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: [
            "'self'",
            ...(!isDev
              ? [
                  (_: IncomingMessage, res: ServerResponse) =>
                    `'nonce-${(res as express.Response).locals.cspNonce}'`,
                  // service worker inline-script
                  "'sha256-JKlrQLtbQcmSH0oVBT5qIkf0mOtxyMfcbvu+h4lHFeE='",
                ]
              : ["'unsafe-inline'"]), // Vite не поддерживает nonce
          ],
          imgSrc: [
            "'self'",
            'data:',
            'avatars.mds.yandex.net',
            'fancy-api.kurkov.online',
            'ya-praktikum.tech',
          ],
          objectSrc: "'none'",
          connectSrc: [
            "'self'",
            'fancy-api.kurkov.online',
            'ya-praktikum.tech',
            // Vite dev server
            ...(isDev ? ['ws:', 'http:'] : []),
          ],
        },
      },
      xDnsPrefetchControl: { allow: true },
      xPoweredBy: false,
    })
  );
  app.use('*', createSSRController(vite));

  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new ErrorResponse('Not Found', 404));
  });

  // eslint-disable-next-line promise/prefer-await-to-callbacks
  app.use((err: ErrorResponse, _req: Request, res: Response) => {
    res.status(err.statusCode || 400).send(err.message || 'Bad Request');
  });

  /* eslint-disable no-console */
  const server = app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
  process.on('unhandledRejection', (reason) => {
    console.error('unhandledRejection: ', reason);
  });

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
