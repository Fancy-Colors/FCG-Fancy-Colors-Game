import { ForumMessage } from 'src/services/forum-slice';
import { BaseApi } from 'api/base';
import { APIError } from 'api/types';
import { localHttpClient } from './api-clients';

class MessagesApi extends BaseApi {
  getMessages(id: number, page = 1, limit = 20) {
    const offset = limit * (page - 1);
    return this.http.get<ForumMessage[]>(`/${id}`, {
      data: {
        limit,
        offset,
      },
    });
  }

  createMessage(payload: {
    threadId: number;
    text: string;
    createdBy: number;
    repliedTo: number | null;
  }) {
    return this.http.post<void | APIError>(`/${payload.threadId}`, {
      data: payload,
    });
  }

  getCount(id: number) {
    return this.http.get<{ messagesCount: number }>(`/${id}/count`);
  }
}

export const messagesApi = new MessagesApi(localHttpClient('/messages'));
