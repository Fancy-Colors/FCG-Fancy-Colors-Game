import { Message } from '../models/index.js';
import type { BaseService } from './base.service.js';

type CreatePayload = {
  text: string;
  createdBy: number;
  repliedTo: number | null;
  threadId: number;
};

type FindAllPayload = {
  id: string;
  limit?: number;
  offset?: number;
};

export class MessageService implements BaseService {
  static find(id: string) {
    return Message.findByPk(id);
  }

  static create(payload: CreatePayload) {
    return Message.create(payload);
  }

  static count(id: string) {
    return Message.count({
      where: {
        threadId: id,
      },
    });
  }

  static findAll({ id, limit, offset }: FindAllPayload) {
    return Message.findAll({
      limit,
      offset,
      where: {
        threadId: id,
      },
    });
  }
}
