import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ForumItemProps } from 'components/forum-item/forum-item';
import { ForumMessageProps } from 'components/forum-message/forum-message';

export type Threads = {
  [page: string | number]: ForumItemProps[];
};

type Thread = {
  title: string;
  messages: Omit<ForumMessageProps, 'handleReply'>;
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
        data: Array<ForumItemProps>;
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
