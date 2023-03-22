import gameReducer from './game-slice';
import forumReducer from './forum-slice';

const reducer = {
  game: gameReducer,
  forum: forumReducer,
};

export default reducer;
