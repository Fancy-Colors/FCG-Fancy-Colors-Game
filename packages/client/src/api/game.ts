import { remoteHttpClient } from './api-clients';
import { BaseApi } from './base';
import { GamesListDTO, GameDataDTO, APIError } from './types';

export class GameApi extends BaseApi {
  readGames() {
    return this.http.get<GamesListDTO | APIError>(`/games`);
  }

  readGameData(id: string) {
    return this.http.get<GameDataDTO | APIError>(`/games/${id}`);
  }
}

export const gameApi = new GameApi(remoteHttpClient());
