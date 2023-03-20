import { threads } from 'src/mock/forum-threads';
import { ForumItem as ForumItemProps } from 'src/services/reducers/forum-slice';

class ForumApi {
  getForum = (pageNumber: string | number = 1): Promise<ForumItemProps[]> => {
    return new Promise<ForumItemProps[]>((resolve) => {
      resolve(threads[pageNumber] ?? threads[1]);
    });
  };
}

export const forumApi = new ForumApi();
