import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GameCompletedData = {
  movesHistory: string[];
  points: number;
  time: number;
  id: string;
};

export interface GameState {
  readonly completedGame: GameCompletedData | null;
  readonly gamesHistory: Array<
    Omit<GameCompletedData, 'completed'> & {
      completedAt: string;
    }
  >;
}

const initialState: GameState = {
  completedGame: null,
  gamesHistory: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameCompleted: (
      state,
      action: PayloadAction<{
        movesHistory: string[];
        points: number;
        time: number;
        id: string;
      }>
    ) => {
      state.completedGame = {
        ...action.payload,
      };

      const now = new Date();

      state.gamesHistory.push({
        ...action.payload,
        completedAt: now.toISOString(),
      });
    },

    resetCompletedGame: (state) => {
      state.completedGame = null;
    },
  },
});

export const { setGameCompleted, resetCompletedGame } = gameSlice.actions;

export default gameSlice.reducer;
