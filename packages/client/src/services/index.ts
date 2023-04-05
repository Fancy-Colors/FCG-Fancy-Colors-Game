import gameReducer from './game-slice';
import forumReducer from './forum-slice';
import appReducer from './app-slice';

const reducer = {
  game: gameReducer,
  forum: forumReducer,
  app: appReducer,
};

export default reducer;
