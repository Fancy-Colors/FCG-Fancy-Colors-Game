declare module 'client' {
  import type {
    StaticHandlerContext,
    Router,
    StaticHandler,
  } from '@remix-run/router';

  function createRenderer(serverContext: Record<string, unknown>): {
    render: (
      router: Router,
      context: StaticHandlerContext,
      theme: string,
      cspNonce: string
    ) => {
      renderResult: string;
      initialState: Record<string, unknown>;
    };
    staticHandler: StaticHandler;
  };
}
