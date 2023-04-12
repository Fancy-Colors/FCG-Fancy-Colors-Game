import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Forum = ForumItem[];

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
  messageCount: string | number;
  avatar?: string;
};

export type Thread = {
  id: number;
  title: string;
  messages: ForumMessage[];
};

type ForumState = {
  count: number;
  forum: Forum;
  currentForumPage: number;
  currentThreadPage: number;
  thread: Thread;
};

const initialState: ForumState = {
  count: 20,
  forum: [],
  thread: {
    id: -1,
    title: '',
    messages: [],
  },
  currentForumPage: 1,
  currentThreadPage: 1,
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setForum: (
      state,
      action: PayloadAction<{
        page: number;
        data: ForumItem[];
      }>
    ) => {
      state.forum = action.payload.data;
    },
    setThread: (
      state,
      action: PayloadAction<{
        threadId: number;
        page: number;
        data: Thread;
      }>
    ) => {
      state.thread = action.payload.data;
    },
    setCurrentForumPage: (state, action: PayloadAction<{ page: number }>) => {
      state.currentForumPage = action.payload.page;
    },
    setCurrentThreadPage: (state, action: PayloadAction<{ page: number }>) => {
      state.currentThreadPage = action.payload.page;
    },
  },
});

export const {
  setForum,
  setThread,
  setCurrentForumPage,
  setCurrentThreadPage,
} = forumSlice.actions;

export default forumSlice.reducer;
