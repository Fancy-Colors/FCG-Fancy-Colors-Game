import { threads } from 'src/mock/forum-threads';
import { thread } from 'src/mock/forum-thread';
import { ForumItem as ForumItemProps, Thread } from 'src/services/forum-slice';

class ForumApi {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getForum = (pageNumber: string | number = 1): Promise<ForumItemProps[]> => {
    return new Promise<ForumItemProps[]>((resolve) => {
      resolve(threads);
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getThread = (pageNumber: string | number = 1): Promise<Thread> => {
    return new Promise<Thread>((resolve) => {
      resolve(thread);
    });
  };
}

export const forumApi = new ForumApi();
