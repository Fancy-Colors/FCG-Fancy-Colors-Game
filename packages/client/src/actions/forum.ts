import { AppDispatch } from 'src/store';

import { forumApi } from 'src/api';
import { setForum, setThread } from 'src/services/forum-slice';

export const fetchForumPage =
  (page: number) => async (dispatch: AppDispatch) => {
    try {
      const threads = await forumApi.getForum(page);
      dispatch(
        setForum({
          page,
          data: threads,
        })
      );
    } catch (e) {}
  };
export const fetchThread =
  (threadId: number | string, page: number) =>
  async (dispatch: AppDispatch) => {
    try {
      const thread = await forumApi.getThread(page);
      dispatch(
        setThread({
          threadId,
          page,
          data: thread,
        })
      );
    } catch (e) {}
  };
