import type { Request, Response } from 'express';
import { ErrorResponse } from '../utils/error-response.js';
import { ThemeService } from '../services/theme.service.js';

export class ThemeController {
  static async create(req: Request, res: Response) {
    const result = await ThemeService.create(req.body);
    return res.status(200).send(result);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const payload = req.body;
    const result = await ThemeService.update(id, payload);

    if (!result) {
      throw new ErrorResponse('Not found', 404);
    }

    return res.status(201).send(result);
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const isDeleted = await ThemeService.delete(id);
    return res.status(isDeleted ? 200 : 404).send({ success: isDeleted });
  }

  static async find(req: Request, res: Response) {
    const payload = {
      id: Number(req.query.id),
      name: req.query.name as string,
    };
    const result = await ThemeService.find(payload);

    if (!result) {
      throw new ErrorResponse('Not found', 404);
    }

    return res.status(200).send(result);
  }
}
