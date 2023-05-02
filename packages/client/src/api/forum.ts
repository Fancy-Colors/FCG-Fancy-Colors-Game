import { thread } from 'src/mock/forum-thread';
import { HTTPClient } from 'api/http-client';
import { ForumItem, Thread } from 'src/services/forum-slice';

class ForumApi {
  http: HTTPClient;

  constructor(protected readonly endnpoint: string) {
    this.http = new HTTPClient(
      import.meta.env.VITE_LOCAL_API_BASE_URL + endnpoint
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getForum = (limit = 20, offset = 0) => {
    return this.http.get<ForumItem[]>(`/threads`, {
      data: {
        limit,
        offset,
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getThread = (pageNumber: string | number = 1): Promise<Thread> => {
    return new Promise<Thread>((resolve) => {
      resolve(thread);
    });
  };

  getThreadsCount = () => {
    return this.http.get<{ threadsCount: number }>(`/threads/count`);
  };
}

export const forumApi = new ForumApi('');
