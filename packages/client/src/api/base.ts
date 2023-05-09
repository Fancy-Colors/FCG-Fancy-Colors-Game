import { HTTPClient } from './http-client';

export class BaseApi {
  http: HTTPClient;

  constructor(
    protected readonly endnpoint: string,
    baseUrl = import.meta.env.VITE_API_BASE_URL
  ) {
    this.http = new HTTPClient(baseUrl + endnpoint);
  }
}
