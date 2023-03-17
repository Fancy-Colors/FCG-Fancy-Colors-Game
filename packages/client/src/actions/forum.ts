import { AppDispatch } from 'src/store';

import { forumApi } from 'src/api';
import { setForum } from 'src/services/reducers/forum-slice';

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
