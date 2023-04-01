/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_TEAM_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
