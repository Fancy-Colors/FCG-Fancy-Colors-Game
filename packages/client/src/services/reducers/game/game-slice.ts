import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GameCompletedData = {
  movesHistory: string[];
  points: number;
  time: number;
  completed: boolean;
  id: string;
};

interface Game {
  readonly completedGame: GameCompletedData;
  readonly gamesHistory: Array<
    Omit<GameCompletedData, 'completed'> & {
      completedAt: string;
    }
  >;
}

const initialState: Game = {
  completedGame: {
    movesHistory: [],
    points: 0,
    time: 0,
    completed: false,
    id: '',
  },
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
        completed: true,
      };

      const now = new Date();

      state.gamesHistory.push({
        ...action.payload,
        completedAt: now.toISOString(),
      });
    },

    resetCurrentGame: (state, action: PayloadAction<string>) => {
      state.completedGame = {
        ...initialState.completedGame,
        id: action.payload,
      };
    },
  },
});

export const { setGameCompleted, resetCurrentGame } = gameSlice.actions;

export default gameSlice.reducer;
