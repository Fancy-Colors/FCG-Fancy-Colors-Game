/* eslint-disable @typescript-eslint/naming-convention */
import { BaseApi } from 'api/base';
import { APIError } from 'api/types';

export class OAuthAPI extends BaseApi {
  constructor() {
    super('/v2/oauth');
  }

  signIn(payload: { code: string; redirect_uri: string }) {
    return this.http.post<void | APIError>('/yandex', {
      data: payload,
    });
  }

  getServiceID(redirect_uri: string) {
    return this.http.get<{ service_id: string } | APIError>(
      '/yandex/service-id',
      {
        data: { redirect_uri },
      }
    );
  }
}

export const oAuthApi = new OAuthAPI();
