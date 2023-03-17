import { threads } from 'src/mock/forum-threads';
import { ForumItemProps } from 'components/forum-item/forum-item';

export class ForumApiService {
  getForum = (
    pageNumber: string | number = 1
  ): Promise<Array<ForumItemProps>> => {
    return new Promise<Array<ForumItemProps>>((resolve) => {
      resolve(threads[pageNumber] ?? threads[1]);
    });
  };
}
