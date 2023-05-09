import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Forum = ForumItem[];

export type ForumMessage = {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  threadId: string;
  repliedTo: string;
  createdBy: number;
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
  createdBy: number;
  createdAt: string;
  updatedAt: string;
};

export type ForumState = {
  count: number;
  forum: Forum;
  currentForumPage: number;
  currentThreadPage: number;
  thread: Thread;
  messages: ForumMessage[];
  messagesCount: number;
  messagesPagesCount: number;
};

const initialState: ForumState = {
  count: 20,
  forum: [],
  thread: {
    id: -1,
    title: '',
    createdBy: -1,
    createdAt: '',
    updatedAt: '',
  },
  messages: [],
  messagesCount: 0,
  messagesPagesCount: 0,
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
    setMessages: (
      state,
      action: PayloadAction<{
        threadId: number;
        page: number;
        data: ForumMessage[];
      }>
    ) => {
      state.messages = action.payload.data;
    },
    setMessagesCount: (
      state,
      action: PayloadAction<{
        count: number;
      }>
    ) => {
      state.messagesCount = action.payload.count;
    },
    setMessagesPagesCount: (
      state,
      action: PayloadAction<{
        count: number;
      }>
    ) => {
      state.messagesPagesCount = action.payload.count;
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
  setMessages,
  setMessagesCount,
  setMessagesPagesCount,
  setCurrentForumPage,
  setCurrentThreadPage,
} = forumSlice.actions;

export default forumSlice.reducer;
