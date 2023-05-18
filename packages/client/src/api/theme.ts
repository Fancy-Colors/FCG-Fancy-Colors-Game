import { Theme } from 'components/hooks/use-theme';
import { localHttpClient } from './api-clients';
import { BaseApi } from './base';

export class ThemeApi extends BaseApi {
  update(name: Theme) {
    return this.http.put<void>('/', { data: { name } });
  }
}

export const themeApi = new ThemeApi(localHttpClient('/themes'));
