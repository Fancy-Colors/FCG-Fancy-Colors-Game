import { leaderboardApi } from '../api/leaderboard';
import {
  setFilteredPlayers,
  setLeaderboard,
  setPlayer,
} from '../services/leaderboard-slice';
import { AppDispatch } from 'src/store';
import { hasApiError } from 'utils/has-api-error';

export const getLeaderboard = () => async (dispatch: AppDispatch) => {
  const response = await leaderboardApi.getLeaders({
    ratingFieldName: 'score',
    cursor: 0,
    limit: 10,
  });

  if (hasApiError(response)) {
    throw new Error(response.reason);
  }

  dispatch(setLeaderboard(response));
};

// сейчас сделано, что бы запрашивалось 200 игроков
// если когда нибудь количество игроков будет приближаться к 200, то можно будет переписать
export const getFilteredPlayers =
  (id: number) => async (dispatch: AppDispatch) => {
    const response = await leaderboardApi.getLeaders({
      ratingFieldName: 'score',
      cursor: 0,
      limit: 200,
    });

    if (hasApiError(response)) {
      throw new Error(response.reason);
    }

    const player = (i: number) => {
      const playerData = response[i];

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
    const arrLength = response.length;

    for (let i = 0; i < arrLength; i++) {
      if (response[i].data.id === id) {
        players.push(player(i - 1));
        players.push(player(i));

        if (i !== arrLength - 1) {
          players.push(player(i + 1));
        }

        break;
      }
    }

    dispatch(setFilteredPlayers(players));
  };

export const getPlayer = (id: number) => async (dispatch: AppDispatch) => {
  const response = await leaderboardApi.getLeaders({
    ratingFieldName: 'score',
    cursor: 0,
    limit: 200,
  });

  if (hasApiError(response)) {
    throw new Error(response.reason);
  }

  const player = response.find((el) => el.data.id === id);

  if (player) {
    dispatch(setPlayer(player));
  }
};

export const setUserToLeaderboard =
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
      dispatch(setLeaderboard([]));
      dispatch(setFilteredPlayers([]));
    }
  };
