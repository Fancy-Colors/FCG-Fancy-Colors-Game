import { createSlice } from '@reduxjs/toolkit';
import { UserParams, PlayerData } from '../api/leaderboard';

type FilteredUsers = {
  place: number;
} & UserParams;

type State = {
  leaderboard: Array<PlayerData>;
  players: Array<FilteredUsers>;
};

// user score?
const initialState: State = {
  leaderboard: [],
  players: [],
};

export const leadersSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboard: (state, { payload }) => {
      state.leaderboard = payload;
    },
    setPlayers: (state, { payload }) => {
      state.players = payload;
    },
  },
});

export const { setLeaderboard, setPlayers } = leadersSlice.actions;

export default leadersSlice.reducer;
