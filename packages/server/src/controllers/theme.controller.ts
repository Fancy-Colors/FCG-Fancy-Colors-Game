import type { Request, Response } from 'express';
import { ThemeService } from '../services/theme.service.js';
import httpContext from 'express-http-context';

export class ThemeController {
  static async update(req: Request, res: Response) {
    const user = httpContext.get('user');

    if (user) {
      await ThemeService.updateOrCreate(user.id, req.body.name);
    }

    res.cookie('theme', req.body.name).status(200).send();
  }
}
