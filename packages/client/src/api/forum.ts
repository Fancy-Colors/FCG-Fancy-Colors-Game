import { threads } from 'src/mock/forum-threads';
import { ForumItem as ForumItemProps, Thread } from 'src/services/forum-slice';
import { BaseApi } from 'api/base';
import { localHttpClient } from './api-clients';

class ForumApi extends BaseApi {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getForum = (pageNumber: string | number = 1): Promise<ForumItemProps[]> => {
    return new Promise<ForumItemProps[]>((resolve) => {
      resolve(threads);
    });
  };

  getThread(id: number) {
    return this.http.get<Thread>(`/${id}/common`);
  }
}

export const forumApi = new ForumApi(localHttpClient('/threads'));
