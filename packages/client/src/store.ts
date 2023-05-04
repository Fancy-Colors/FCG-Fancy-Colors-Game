import { configureStore } from '@reduxjs/toolkit';
import reducer from './services';
import { ForumState } from './services/forum-slice';
import { GameState } from './services/game-slice';
import { LeaderboardState } from './services/leaderboard-slice';
import { LevelState } from './services/level-slice';
import { AppState } from './services/app-slice';

export type RootState = {
  game: GameState;
  forum: ForumState;
  leaderboard: LeaderboardState;
  level: LevelState;
  app: AppState;
};

export function createStore(initialState?: RootState) {
  return configureStore({
    reducer,
    preloadedState: initialState,
  });
}

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
