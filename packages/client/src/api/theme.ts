import { Theme } from 'components/hooks/use-theme';
import { BaseApi } from './base';

export class ThemeApi extends BaseApi {
  constructor() {
    super('/themes');
  }

  update(name: Theme) {
    return this.http.put<void>('/', { data: { name } });
  }
}

export const themeApi = new ThemeApi();
