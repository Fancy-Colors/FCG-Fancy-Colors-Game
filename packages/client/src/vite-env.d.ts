/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/* eslint-disable @typescript-eslint/naming-convention */

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly YANDEX_OAUTH_REDIRECT_URI: string;
  readonly VITE_TEAM_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
