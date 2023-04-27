import gameReducer from './game-slice';
import forumReducer from './forum-slice';
import levelReducer from './level-slice';
import leaderboardSlice from './leaderboard-slice';
import appReducer from './app-slice';

const reducer = {
  game: gameReducer,
  forum: forumReducer,
  level: levelReducer,
  leaderboard: leaderboardSlice,
  app: appReducer,
};

export default reducer;
