import { threads } from 'src/mock/forum-threads';
import { thread } from 'src/mock/forum-thread';
import { ForumItem as ForumItemProps, Thread } from 'src/services/forum-slice';

class ForumApi {
  getForum = (pageNumber: string | number = 1): Promise<ForumItemProps[]> => {
    return new Promise<ForumItemProps[]>((resolve) => {
      resolve(threads[pageNumber] ?? threads[1]);
    });
  };

  getThread = (
    threadId: string | number = 1,
    pageNumber: string | number = 1
  ): Promise<Thread> => {
    return new Promise<Thread>((resolve) => {
      const res =
        (thread[threadId] && thread[threadId][pageNumber]) || thread[1][1];
      resolve(res);
    });
  };
}

export const forumApi = new ForumApi();
