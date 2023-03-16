import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Game {
  readonly currentGame: {
    gameId: string;
    movesHistory: string[];
    score: number;
    time: number;
    completed: boolean;
  };
}

const initialState: Game = {
  currentGame: {
    gameId: '',
    movesHistory: [],
    score: 0,
    time: 0,
    completed: false,
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<string>) => {
      state.currentGame = {
        gameId: action.payload,
        movesHistory: [],
        score: 0,
        time: 0,
        completed: false,
      };
    },
    setGameCompleted: (state) => {
      state.currentGame.completed = true;
    },

    replay: (state) => {
      state.currentGame.completed = false;
    },
  },
});

export const { setCurrentGame, setGameCompleted, replay } = gameSlice.actions;

export default gameSlice.reducer;
