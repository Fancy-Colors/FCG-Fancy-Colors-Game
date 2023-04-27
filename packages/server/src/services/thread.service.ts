import { Thread } from '../models/index.js';
import type { BaseService } from './base.service.js';

type CreatePayload = {
  title: string;
  createdBy: number;
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

  static create(payload: CreatePayload) {
    return Thread.create(payload);
  }

  static count() {
    return Thread.count();
  }

  static findAll({ limit, offset }: FindAllPayload) {
    return Thread.findAll({ limit, offset });
  }
}
