import { createSlice } from '@reduxjs/toolkit';
import { UserParams, PlayerData } from '../api/leaderboard';

type FilteredUser = {
  place: number;
} & UserParams;

type State = {
  leaderboard: Array<PlayerData>;
  filteredPlayers: Array<FilteredUser>;
  player: PlayerData | null;
};

const initialState: State = {
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
