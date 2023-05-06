import { BaseApi } from './base';
import { APIError, UserDTO } from './types';

export type SignUpPayload = Omit<UserDTO, 'id' | 'display_name' | 'avatar'> & {
  password: string;
};

export class AuthApi extends BaseApi {
  constructor() {
    super('/v2/auth');
  }

  signIn(payload: { login: string; password: string }) {
    return this.http.post<void | APIError>('/signin', {
      data: payload,
    });
  }

  signUp(payload: SignUpPayload) {
    return this.http.post<{ id: number } | APIError>('/signup', {
      data: payload,
    });
  }

  me(request?: Request) {
    const headers: Record<string, string> = {};

    if (import.meta.env.SSR && request) {
      headers.cookie = request.headers.get('cookie') as string;
    }

    return this.http.get<UserDTO | APIError>('/user', {
      headers,
    });
  }

  logout() {
    return this.http.post('/logout');
  }
}

export const authApi = new AuthApi();
