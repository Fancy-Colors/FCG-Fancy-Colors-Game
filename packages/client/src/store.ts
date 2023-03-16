import {
  ActionCreator,
  AnyAction,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import reducer from './services/reducers';

export const store = configureStore({
  reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// добавил тип thunk для асинхронных экшенов (например, запросов к API)
export type AppThunk<ReturnType = void | Promise<unknown>> = ActionCreator<
  ThunkAction<ReturnType, RootState, unknown, AnyAction>
>;
