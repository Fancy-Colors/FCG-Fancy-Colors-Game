import { BaseApi } from './base';
import { APIError } from './types';

export type UserParams = {
  id: number;
  login: string;
  score: number;
  avatar: string;
  name: string;
  surname: string;
};

type ReqParams = {
  ratingFieldName: string;
  teamName: string;
};

type LeadersReq = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type PlayerData = {
  data: UserParams;
};

// для продакшена сделать другое название
const TEAM_NAME = 'test_colors';

export class LeaderboardApi extends BaseApi {
  constructor() {
    super('/leaderboard');
  }

  getLeaders(payload: LeadersReq) {
    return this.http.post<Array<PlayerData> | APIError>(`/${TEAM_NAME}`, {
      data: payload,
    });
  }

  setUser(payload: UserParams) {
    const requestParams: ReqParams = {
      ratingFieldName: 'score',
      teamName: TEAM_NAME,
    };

    return this.http.post<void | APIError>('/', {
      data: { data: payload, ...requestParams },
    });
  }
}

export const leaderboardApi = new LeaderboardApi();
