import { configureStore } from '@reduxjs/toolkit';
import reducer from './services';
import { ForumState } from './services/forum-slice';
import { Game } from './services/game-slice';

export type RootState = {
  game: Game;
  forum: ForumState;
};

export type InitialState = Partial<RootState>;

export function createStore(initialState?: InitialState) {
  return configureStore({
    reducer,
    preloadedState: initialState,
  });
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
