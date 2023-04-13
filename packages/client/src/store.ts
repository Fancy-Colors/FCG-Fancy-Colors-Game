import { configureStore } from '@reduxjs/toolkit';
import reducer from './services';
import { ForumState } from './services/forum-slice';
import { Game } from './services/game-slice';
import { LeaderboardState } from './services/leaderboard-slice';

export type RootState = {
  game: Game;
  forum: ForumState;
  leaderboard: LeaderboardState;
};

export function createStore(initialState?: RootState) {
  return configureStore({
    reducer,
    preloadedState: initialState,
  });
}

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
