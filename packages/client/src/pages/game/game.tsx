import { FC, useEffect } from 'react';
import styles from './game.module.pcss';
import { useParams } from 'react-router-dom';
import { GameView, GameViewCompleted } from 'components/game-view';
import cn from 'classnames';
import { makeInitialData, gameData } from 'components/game-view/utils';
import { useAppDispatch, useAppSelector } from 'components/hooks';
import { resetCompletedGame } from 'src/services/game-slice';

export const GamePage: FC = () => {
  const { id } = useParams<{ id?: string }>();

  const dispatch = useAppDispatch();
  const { completedGame } = useAppSelector((state) => state.game);

  if (!id) {
    throw new Error('game id is not provided');
  }
  // вот здесь будет логика извлечения из стора или подзагрузки с сервера данных игры
  const rawGameData = gameData.find((game) => game.gameId === id);

  if (!rawGameData) {
    throw new Error(`no game found by id: ${id}`);
  }

  useEffect(() => {
    dispatch(resetCompletedGame());
  }, [dispatch]);

  const [initColors, initGameData] = makeInitialData(rawGameData);

  return (
    <div className={cn(styles.content, 'u-page')}>
      {completedGame ? (
        <GameViewCompleted data={initGameData} />
      ) : (
        <GameView
          initColors={initColors}
          initGameData={initGameData}
          size={initGameData.size}
        />
      )}
    </div>
  );
};
