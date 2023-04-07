import gameReducer from './game-slice';
import forumReducer from './forum-slice';
import levelReducer from './level-slice';

const reducer = {
  game: gameReducer,
  forum: forumReducer,
  level: levelReducer,
};

export default reducer;
