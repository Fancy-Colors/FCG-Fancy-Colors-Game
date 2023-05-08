declare module 'client' {
  import type {
    StaticHandlerContext,
    Router,
    StaticHandler,
  } from '@remix-run/router';

  function createRenderer(): {
    render: (
      router: Router,
      context: StaticHandlerContext,
      theme: string
    ) => {
      renderResult: string;
      initialState: Record<string, unknown>;
    };
    staticHandler: StaticHandler;
  };
}
