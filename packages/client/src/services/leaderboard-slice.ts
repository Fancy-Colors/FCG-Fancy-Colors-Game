import { createSlice } from '@reduxjs/toolkit';
import { UserParams } from '../api/leaderboard';

type UserData = {
  data: UserParams;
};

type State = {
  leaderboard: Array<UserData>;
};

// user score?
const initialState: State = {
  leaderboard: [],
};

export const leadersSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboard: (state, { payload }) => {
      state.leaderboard = payload;
    },
  },
});

export const { setLeaderboard } = leadersSlice.actions;

export default leadersSlice.reducer;
