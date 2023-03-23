import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Forum = {
  [page: string | number]: ForumItem[];
};

export type Threads = {
  [threadId: string | number]: { [page: string | number]: Thread };
};

export type ForumMessage = {
  id: number;
  avatar?: string;
  name: string;
  date: string;
  text: string;
};

export type ForumItem = {
  id: number;
  title: string;
  text: string;
  name: string;
  date: string;
  messageCount: number | string;
  avatar?: string;
};

export type Thread = {
  id: string | number;
  title: string;
  messages: ForumMessage[];
};

type ForumState = {
  count: number;
  forum: Forum;
  threads: Threads;
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
        data: ForumItem[];
      }>
    ) => {
      state.forum = {
        ...state.forum,
        [action.payload.page]: action.payload.data,
      };
    },
    setThread: (
      state,
      action: PayloadAction<{
        threadId: string | number;
        page: string | number;
        data: Thread;
      }>
    ) => {
      state.threads = {
        [action.payload.threadId]: {
          [action.payload.page]: action.payload.data,
        },
      };
    },
  },
});

export const { setForum, setThread } = forumSlice.actions;

export default forumSlice.reducer;
