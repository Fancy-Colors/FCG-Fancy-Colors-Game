import { createSlice } from '@reduxjs/toolkit';

type Toast = {
  id: number;
  text: string;
  type: 'success' | 'error' | 'info' | 'warning';
};

type State = {
  notifications: Toast[];
};

const initialState: State = {
  notifications: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNotification: (state, { payload }) => {
      state.notifications = [
        ...state.notifications,
        {
          id: Math.floor(Math.random() * 10000),
          ...payload,
        },
      ];
    },
    deleteNotification: (state, { payload }) => {
      state.notifications = state.notifications.filter(
        (el) => el.id !== payload
      );
    },
  },
});

export const { setNotification, deleteNotification } = appSlice.actions;

export default appSlice.reducer;
