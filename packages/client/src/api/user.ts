import { BaseApi } from './base';
import { APIError, UserDTO } from './types';

export type UpdateUserPayload = Omit<UserDTO, 'id' | 'avatar'>;

export class UserApi extends BaseApi {
  constructor() {
    super('/user');
  }

  read(id: number) {
    return this.http.get<UserDTO | APIError>(`/${id}`);
  }

  update(payload: UpdateUserPayload) {
    return this.http.put<UserDTO | APIError>('/profile', { data: payload });
  }

  updateAvatar(payload: FormData) {
    return this.http.put<UserDTO | APIError>('/profile/avatar', {
      data: payload,
    });
  }

  updatePassword(payload: { oldPassword: string; newPassword: string }) {
    return this.http.put<void | APIError>('/password', { data: payload });
  }

  search(login: string) {
    return this.http.post<UserDTO[] | APIError>('/search', { data: { login } });
  }
}

export const userApi = new UserApi();
