import { configureStore } from '@reduxjs/toolkit';
import reducer from './services';
import { ForumState } from './services/forum-slice';
import { Game } from './services/game-slice';
import { LeaderboardState } from './services/leaderboard-slice';
import { AppState } from './services/app-slice';

export type RootState = {
  game: Game;
  forum: ForumState;
  leaderboard: LeaderboardState;
  app: AppState;
};

export type InitialState = Partial<RootState>;

export function createStore(initialState?: InitialState) {
  return configureStore({
    reducer,
    preloadedState: initialState,
  });
}

export type AppStore = ReturnType<typeof createStore>;

export type AppDispatch = AppStore['dispatch'];
