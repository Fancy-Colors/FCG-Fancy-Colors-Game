import type { Request, Response } from 'express';
import { MessageService } from '../services/message.service.js';

export class MessageController {
  static async find(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'id не предоставлен' });
    }

    if (isNaN(Number(id))) {
      return res.status(400).send({ message: 'id должен быть целым числом' });
    }

    const result = await MessageService.find(id);

    if (!result) {
      return res
        .status(404)
        .send({ message: `Сообщение не найдено по id ${id}` });
    }

    return res.send(result);
  }

  static async create(req: Request, res: Response) {
    const result = await MessageService.create(req.body);
    return res.status(200).send(result);
  }

  static async count(req: Request, res: Response) {
    const { threadId } = req.params;

    const messagesCount = await MessageService.count(threadId);
    return res.status(200).send({ messagesCount });
  }

  static async findAll(req: Request, res: Response) {
    const { threadId } = req.params;

    const payload = {
      id: threadId,
      limit: Number(req.query.limit || 50),
      offset: Number(req.query.offset || 0),
    };

    if (isNaN(payload.limit) || isNaN(payload.offset)) {
      return res.status(400).send({
        message:
          'limit и/или offset query-запросы должны быть числами или должны быть опущены',
      });
    }

    const result = await MessageService.findAll(payload);

    if (!result) {
      return res.status(404).send({ message: 'Не найдены сообщения' });
    }

    return res.send(result);
  }
}
