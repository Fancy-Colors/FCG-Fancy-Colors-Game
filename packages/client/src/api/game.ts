import { GameBaseApi } from './game-base-api';
import { GamesListDTO, GameDataDTO, APIError } from './types';

export class GameApi extends GameBaseApi {
  readGames() {
    return this.http.get<GamesListDTO | APIError>(`/games`);
  }

  readGameData(id: string) {
    return this.http.get<GameDataDTO | APIError>(`/games/${id}`);
  }
}

export const gameApi = new GameApi();
