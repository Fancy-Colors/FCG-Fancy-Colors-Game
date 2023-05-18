import { ForumItem, Thread } from 'src/services/forum-slice';
import { BaseApi } from 'api/base';
import { localHttpClient } from './api-clients';

class ForumApi extends BaseApi {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getForum = (limit = 20, offset = 0) => {
    return this.http.get<ForumItem[]>('/', {
      data: {
        limit,
        offset,
      },
    });
  };

  createThread = (payload: {
    firstMessage: string;
    createdBy: number;
    title: string;
  }) => {
    return this.http.post<Thread>('/', {
      data: payload,
    });
  };

  count = () => {
    return this.http.get<{ threadsCount: number }>(`/count`);
  };

  getThread = (id: number) => {
    return this.http.get<Thread>(`/${id}/common`);
  };
}

export const forumApi = new ForumApi(localHttpClient('/threads'));
