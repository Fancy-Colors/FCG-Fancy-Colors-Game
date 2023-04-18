import type express from 'express';

function createRequestHeaders(requestHeaders: express.Request['headers']) {
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

export function createFetchRequest(req: express.Request) {
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
