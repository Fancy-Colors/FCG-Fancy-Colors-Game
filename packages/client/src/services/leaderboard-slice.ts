import { createSlice } from '@reduxjs/toolkit';
import { UserParams, PlayerData } from '../api/leaderboard';

export type FilteredUser = {
  place: number;
} & UserParams;

export type LeaderboardState = {
  leaderboard: PlayerData[];
  filteredPlayers: FilteredUser[];
  player: PlayerData | null;
};

const initialState: LeaderboardState = {
  leaderboard: [],
  filteredPlayers: [],
  player: null,
};

export const leadersSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboard: (state, { payload }) => {
      state.leaderboard = payload;
    },
    setFilteredPlayers: (state, { payload }) => {
      state.filteredPlayers = payload;
    },
    setPlayer: (state, { payload }) => {
      state.player = payload;
    },
  },
});

export const { setLeaderboard, setFilteredPlayers, setPlayer } =
  leadersSlice.actions;

export default leadersSlice.reducer;
