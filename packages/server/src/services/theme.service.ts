import { Theme } from '../models/index.js';
import type { BaseService } from './base.service.js';

type ThemeInput = {
  userId: number;
  name: string;
};

export class ThemeService implements BaseService {
  static find(userId: number) {
    return Theme.findOne({
      where: { userId },
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

  static async updateOrCreate(userId: number, name: string) {
    const theme = await Theme.findOne({ where: { userId } });

    if (!theme) {
      return Theme.create({ userId, name });
    }

    return theme.update({ name });
  }
}
