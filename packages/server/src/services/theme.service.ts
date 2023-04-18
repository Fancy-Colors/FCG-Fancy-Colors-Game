import { ErrorResponse } from '../utils/error-response.js';
import { Theme } from '../models/index.js';
import type { BaseService } from './base.service.js';

type ThemeInput = {
  colors: string;
  name: string;
};

type FindPayload = {
  id?: number;
  name?: string;
};

export class ThemeService implements BaseService {
  static find({ id, name }: FindPayload) {
    if (id) {
      return Theme.findByPk(id);
    }

    return Theme.findOne({
      where: { name },
    });
  }

  static async delete(id: number) {
    const deletedThemesCount = await Theme.destroy({
      where: { id },
    });

    return Boolean(deletedThemesCount);
  }

  static create(payload: ThemeInput) {
    return Theme.create(payload);
  }

  static async update(id: number, payload: Partial<ThemeInput>) {
    const theme = await Theme.findByPk(id);

    if (!theme) {
      throw new ErrorResponse('Not found', 404);
    }

    return theme.update(payload);
  }
}
