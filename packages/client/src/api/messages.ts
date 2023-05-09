import { ForumMessage } from 'src/services/forum-slice';
import { BaseApi } from 'api/base';
import { APIError } from 'api/types';

class MessagesApi extends BaseApi {
  constructor() {
    super('/messages', import.meta.env.VITE_LOCAL_API_BASE_URL);
  }

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

export const messagesApi = new MessagesApi();
