import { HTTPClient } from './http-client';

export class BaseApi {
  constructor(protected http: HTTPClient) {}
}
