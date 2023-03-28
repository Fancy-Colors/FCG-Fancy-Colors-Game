import { leaderboardApi, PlayerData } from '../api/leaderboard';
import {
  setFilteredPlayers,
  setLeaderboard,
  setPlayer,
} from '../services/leaderboard-slice';
import { AppDispatch } from 'src/store';

type Obj = {
  [key: number]: PlayerData;
};

export const getLeaderboard = () => async (dispatch: AppDispatch) => {
  try {
    const leaders = await leaderboardApi.getLeaders({
      ratingFieldName: 'score',
      cursor: 0,
      limit: 10,
    });

    dispatch(setLeaderboard(leaders));
  } catch (error) {
    throw new Error('Не удалось получить список');
  }
};

// сейчас сделано, что бы запрашивалось 200 игроков
// если когда нибудь количество игроков будет приближаться к 200, то можно будет переписать
export const getFilteredPlayers =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      const leaders: Obj = await leaderboardApi.getLeaders({
        ratingFieldName: 'score',
        cursor: 0,
        limit: 200,
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

      dispatch(setFilteredPlayers(players));
    } catch (error) {
      throw new Error('Не удалось получить список');
    }
  };

export const getPlayer = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const leaders = await leaderboardApi.getLeaders({
      ratingFieldName: 'score',
      cursor: 0,
      limit: 200,
    });

    const player = (leaders as Array<PlayerData>).find(
      (el) => el.data.id === id
    );

    if (player) {
      dispatch(setPlayer(player));
    }
  } catch (error) {
    throw new Error('Не удалось получить игрока');
  }
};
