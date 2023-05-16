import { HTTPClient } from './http-client';

export const localHttpClient = (endpoint?: string) =>
  new HTTPClient(`/api${endpoint}`);

export const practicumHttpClient = (endpoint?: string) =>
  new HTTPClient(import.meta.env.VITE_API_BASE_URL + endpoint);

export const remoteHttpClient = () =>
  new HTTPClient('https://fancy-api.kurkov.online');
