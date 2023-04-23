import gameReducer from './game-slice';
import forumReducer from './forum-slice';
import leaderboardSlice from './leaderboard-slice';
import appReducer from './app-slice';

const reducer = {
  game: gameReducer,
  forum: forumReducer,
  leaderboard: leaderboardSlice,
  app: appReducer,
};

export default reducer;
