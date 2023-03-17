import { threads } from 'src/mock/forum-threads';
import { ForumItemProps } from 'components/forum-item/forum-item';

class ForumApi {
  getForum = (
    pageNumber: string | number = 1
  ): Promise<Array<ForumItemProps>> => {
    return new Promise<Array<ForumItemProps>>((resolve) => {
      resolve(threads[pageNumber] ?? threads[1]);
    });
  };
}

export const forumApi = new ForumApi();
