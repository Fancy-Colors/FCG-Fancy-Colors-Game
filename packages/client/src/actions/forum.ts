import { AppDispatch, AppThunk } from 'src/store';

import { ForumApiService } from 'src/services/api';
import { setForum } from 'src/services/reducers/forum/forum-slice';

const api = new ForumApiService();
// TODO нужно пофиксить тему с типом
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const fetchForumPage: AppThunk =
  (page: number) => async (dispatch: AppDispatch) => {
    try {
      const threads = await api.getForum(page);
      dispatch(
        setForum({
          page,
          data: threads,
        })
      );
    } catch (e) {}
  };
