import { AppStore } from '../store';
import { gameApi } from '../api';
import { setLevels } from '../services/level-slice';
import { GamesListDTO } from 'api/types';

export async function levelLoader(store: AppStore) {
  if (store.getState().level.levels.length === 0) {
    const res = await gameApi.readGames();
    if (Array.isArray(res)) {
      store.dispatch(setLevels(res as GamesListDTO));
    }
  }
  return null;
}
