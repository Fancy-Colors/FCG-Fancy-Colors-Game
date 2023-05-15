import type { NextFunction, Request, Response } from 'express';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import jsesc from 'jsesc';
import { createStaticRouter } from 'react-router-dom/server.js';
import { createFetchRequest } from '../utils/request-adapter.js';
import type { ViteDevServer } from 'vite';
import httpContext from 'express-http-context';
import { ThemeService } from '../services/theme.service.js';

type SSREntry = typeof import('client');

async function getUserTheme(req: Request, userId?: number) {
  if (userId) {
    const userTheme = await ThemeService.find(userId);

    if (userTheme) {
      return userTheme.getDataValue('name');
    }
  }

  const storedTheme = req.cookies.theme;
  // Получаем предпочитаемую пользователем тему из настроек браузера
  // https://web.dev/user-preference-media-features-headers/
  const userPreferredTheme =
    req.headers['sec-ch-prefers-color-scheme'] ?? 'light';
  return storedTheme || userPreferredTheme;
}

export function createSSRController(vite?: ViteDevServer) {
  const require = createRequire(import.meta.url);
  const templatePath = require.resolve('client/index.html');

  return async function ssrController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!req.get('Accept')?.includes('text/html')) {
      return next();
    }

    const url = req.originalUrl;
    let template: string;
    let ssrEntry: SSREntry;
    const user = httpContext.get('user');

    try {
      if (vite) {
        template = fs.readFileSync(
          require.resolve('client/dev/index.html'),
          'utf-8'
        );
        template = await vite.transformIndexHtml(url, template);
        ssrEntry = (await vite.ssrLoadModule(
          require.resolve('client/dev/entry-server')
        )) as SSREntry;
      } else {
        template = fs.readFileSync(templatePath, 'utf-8');
        ssrEntry = await import('client');
      }

      const serverContext = { user };
      const { createRenderer } = ssrEntry;
      const { render, staticHandler } = createRenderer(serverContext);
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

      const theme = await getUserTheme(req, user?.id);

      const { initialState, renderResult } = render(
        staticRouter,
        context,
        theme
      );

      const initialStateSerialized = jsesc(initialState, {
        json: true,
        isScriptContext: true,
      });
      const storeState = `<script>window.__INITIAL_STATE__ = ${initialStateSerialized}</script>`;

      const html = template
        .replace('<!--ssr-outlet-->', renderResult)
        .replace('<!--store-state-->', storeState)
        .replace('{{__THEME__}}', theme);

      // eslint-disable-next-line @typescript-eslint/naming-convention
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e: unknown) {
      if (vite && e instanceof Error) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  };
}
