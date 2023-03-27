import gameReducer from './game-slice';
import forumReducer from './forum-slice';
import leaderboardSlice from './leaderboard-slice';

const reducer = {
  game: gameReducer,
  forum: forumReducer,
  leaderboard: leaderboardSlice,
};

export default reducer;
