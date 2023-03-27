import { leaderboardApi } from '../api/leaderboard';
import { setLeaderboard } from '../services/leaderboard-slice';
import { AppDispatch } from 'src/store';

export const getLeaderboard =
  (limit = 10, cursor = 0) =>
  async (dispatch: AppDispatch) => {
    try {
      const leaders = await leaderboardApi.getLeaders({
        ratingFieldName: 'score',
        cursor,
        limit,
      });

      dispatch(setLeaderboard(leaders));
    } catch (error) {
      throw new Error('Не удалось получить список');
    }
  };

// ?? можно ли передать параметрам UserParams из api, а не указывать для каждого отдельно
export const setUser =
  (
    id: number,
    login: string,
    score: number,
    avatar: string,
    name: string,
    surname: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      await leaderboardApi.setUser({
        id,
        login,
        score,
        avatar,
        name,
        surname,
      });
    } catch (error) {
      throw new Error('Не удалось добавить игрока ');
    } finally {
      dispatch(getLeaderboard());
    }
  };
