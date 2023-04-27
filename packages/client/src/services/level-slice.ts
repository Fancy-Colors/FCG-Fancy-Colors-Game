import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameRaw } from 'api/types';
import { transformGameList } from 'utils/api-transformers';

export interface LevelState {
  levels: GameRaw[];
}

const initialState: LevelState = {
  levels: [],
};

export const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    setLevels: (state, action: PayloadAction<GameRaw[]>) => {
      state.levels = transformGameList(action.payload);
    },
  },
});

export const { setLevels } = levelSlice.actions;

export default levelSlice.reducer;
