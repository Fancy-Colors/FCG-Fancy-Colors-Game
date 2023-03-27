import { leaderboardApi, PlayerData } from '../api/leaderboard';
import { setLeaderboard, setPlayers } from '../services/leaderboard-slice';
import { AppDispatch } from 'src/store';

type Obj = {
  [key: number]: PlayerData;
};

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

export const getPlayers =
  (id: number, limit = 100, cursor = 0) =>
  async (dispatch: AppDispatch) => {
    try {
      const leaders: Obj = await leaderboardApi.getLeaders({
        ratingFieldName: 'score',
        cursor,
        limit,
      });

      const player = (i: number) => {
        const playerData = leaders[i];

        const obj = {
          id: playerData.data.id,
          login: playerData.data.login,
          name: `${playerData.data.name} ${playerData.data.surname}`,
          score: playerData.data.score,
          avatar: playerData.data.avatar,
          place: i + 1,
        };
        return obj;
      };

      const players = [];

      if (leaders) {
        const arrLength = (leaders as Array<PlayerData>).length;

        for (let i = 0; i < arrLength; i++) {
          if (leaders[i].data.id === id) {
            players.push(player(i - 1));
            players.push(player(i));

            if (i !== arrLength - 1) {
              players.push(player(i + 1));
            }
          }
        }
      }

      dispatch(setPlayers(players));
    } catch (error) {
      throw new Error('Не удалось получить список');
    }
  };
