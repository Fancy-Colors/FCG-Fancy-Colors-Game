import { HTTPClient } from './http-client';

export class BaseApi {
  http: HTTPClient;

  constructor(protected readonly endnpoint: string) {
    this.http = new HTTPClient(import.meta.env.VITE_API_BASE_URL + endnpoint);
  }
}
