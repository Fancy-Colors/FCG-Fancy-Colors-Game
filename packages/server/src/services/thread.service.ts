import { Message, Thread } from '../models/index.js';
import type { BaseService } from './base.service.js';

type CreatePayload = {
  title: string;
  createdBy: number;
  firstMessage: string;
};

type FindPayload = {
  id: string;
};

type FindAllPayload = {
  limit?: number;
  offset?: number;
};

export class ThreadService implements BaseService {
  static find({ id }: FindPayload) {
    return Thread.findByPk(id);
  }

  static async create(payload: CreatePayload) {
    const thread = await Thread.create(payload);

    const { id, firstMessage, createdBy } = thread.dataValues;

    const message = await Message.create({
      text: firstMessage,
      createdBy,
      repliedTo: null,
      threadId: id,
    });

    if (thread && message) {
      return thread.dataValues;
    }
  }

  static count() {
    return Thread.count();
  }

  static findAll({ limit, offset }: FindAllPayload) {
    return Thread.findAll({ limit, offset });
  }
}
