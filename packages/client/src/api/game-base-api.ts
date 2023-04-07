import { HTTPClient } from './http-client';
const GAME_API_BASE_URL = 'https://fancy-api.kurkov.online';

export class GameBaseApi {
  http: HTTPClient;

  constructor() {
    this.http = new HTTPClient(GAME_API_BASE_URL);
  }
}
