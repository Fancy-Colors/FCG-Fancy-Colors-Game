import { AppDispatch } from 'src/store';

import { forumApi } from 'src/api';
import { setCount, setForum, setThread } from 'src/services/forum-slice';

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
