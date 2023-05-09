import { threads } from 'src/mock/forum-threads';
import { ForumItem as ForumItemProps, Thread } from 'src/services/forum-slice';
import { BaseApi } from 'api/base';

class ForumApi extends BaseApi {
  constructor() {
    super('/threads', import.meta.env.VITE_LOCAL_API_BASE_URL);
  }

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

export const forumApi = new ForumApi();
