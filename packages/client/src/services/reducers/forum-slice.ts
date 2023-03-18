import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Threads = {
  [page: string | number]: ForumItem[];
};

type ForumMessage = {
  id: number;
  avatar?: string;
  name: string;
  date: string;
  text: string;
};

type ForumItem = {
  id: number;
  title: string;
  text: string;
  name: string;
  date: string;
  messageCount: number | string;
  avatar?: string;
};

type Thread = {
  id: string | number;
  title: string;
  messages: ForumMessage;
};

type ForumState = {
  count: number;
  forum: Threads;
  threads: {
    [key: string]: Thread; // thread_id => thread entity
  };
};

const initialState: ForumState = {
  count: 20,
  forum: {},
  threads: {},
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setForum: (
      state,
      action: PayloadAction<{
        page: string | number;
        data: Array<ForumItem>;
      }>
    ) => {
      state.forum = {
        ...state.forum,
        [action.payload.page]: action.payload.data,
      };
    },
  },
});

export const { setForum } = forumSlice.actions;

export default forumSlice.reducer;
