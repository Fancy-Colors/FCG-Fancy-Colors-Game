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

const isDev = process.env.NODE_ENV === 'development';

async function bootstrap() {
  await dbConnect();
  const app = express();
  const port = Number(process.env.SERVER_PORT) || 5000;

  const require = createRequire(import.meta.url);
  const templatePath = require.resolve('client/index.html');
  const staticPath = path.dirname(templatePath);
  const clientRoot = path.dirname(require.resolve('client/package.json'));

  let vite: ViteDevServer | undefined;

  app.use(cors());

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
      target: 'https://ya-praktikum.tech',
    })
  );
  app.use(express.json());
  app.use(httpContext.middleware);
  app.use(cookieParser());
  app.use(authContext);
  app.use('/api', router);

  if (!isDev) {
    app.use(express.static(staticPath, { index: false }));
  }

  app.use('*', createSSRController(vite));

  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new ErrorResponse('Not Found', 404));
  });

  // eslint-disable-next-line promise/prefer-await-to-callbacks
  app.use((err: ErrorResponse, _req: Request, res: Response) => {
    res.status(err.statusCode || 400).send(err.message || 'Bad Request');
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

bootstrap();
