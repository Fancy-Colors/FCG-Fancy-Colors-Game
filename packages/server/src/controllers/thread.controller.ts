import type { Request, Response } from 'express';
import { ThreadService } from '../services/thread.service.js';

export class ThreadController {
  static async find(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'id не предоставлен' });
    }

    if (isNaN(Number(id))) {
      return res.status(400).send({ message: 'id должен быть целым числом' });
    }

    const result = await ThreadService.find({ id });

    if (!result) {
      return res.status(404).send({ message: `Тред не найден по id ${id}` });
    }

    return res.send(result);
  }

  static async create(req: Request, res: Response) {
    const result = await ThreadService.create(req.body);
    return res.status(200).send(result);
  }

  static async count(_req: Request, res: Response) {
    const threadsCount = await ThreadService.count();
    return res.status(200).send({ threadsCount });
  }

  static async findAll(req: Request, res: Response) {
    const payload = {
      limit: Number(req.query.limit || 20),
      offset: Number(req.query.offset || 0),
    };

    if (isNaN(payload.limit) || isNaN(payload.offset)) {
      return res.status(400).send({
        message:
          'limit и/или offset query-запросы должны быть числами или должны быть опущены',
      });
    }

    const result = await ThreadService.findAll(payload);

    if (!result) {
      return res.status(404).send({ message: 'Не найдены треды' });
    }

    return res.send(result);
  }
}
