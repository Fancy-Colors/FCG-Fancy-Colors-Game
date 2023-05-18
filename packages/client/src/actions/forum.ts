import { AppDispatch } from 'src/store';

import { forumApi } from 'src/api';
import {
  setCount,
  setForum,
  setMessages,
  setMessagesCount,
  setMessagesPagesCount,
  setThread,
} from 'src/services/forum-slice';
import { messagesApi } from 'api/messages';

export const fetchForumPage =
  (page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
      const threadsCount = await forumApi.getThreadsCount();
      dispatch(setCount(threadsCount));
      const threads = await forumApi.getForum(limit, (page - 1) * limit);
      dispatch(
        setForum({
          page,
          data: threads,
        })
      );
    } catch (e) {
      // console.log(e)
    }
  };
export const fetchThread =
  (threadId: number, page: number) => async (dispatch: AppDispatch) => {
    try {
      const thread = await forumApi.getThread(threadId);
      dispatch(
        setThread({
          threadId,
          page,
          data: thread,
        })
      );
    } catch (e) {}
  };

export const fetchMessages =
  (threadId: number, page: number, limit: number) =>
  async (dispatch: AppDispatch) => {
    try {
      const messages = await messagesApi.getMessages(threadId, page, limit);
      dispatch(
        setMessages({
          threadId,
          page,
          data: messages,
        })
      );
    } catch (e) {}
  };

export const fetchThreadMessagesCount =
  (threadId: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await messagesApi.getCount(threadId);
      dispatch(
        setMessagesCount({
          count: response.messagesCount,
        })
      );
      const pageCount =
        Math.floor(response.messagesCount / limit) +
        (response.messagesCount % limit > 0 ? 1 : 0);
      dispatch(
        setMessagesPagesCount({
          count: pageCount,
        })
      );
    } catch (e) {}
  };
