import { FC, useState } from 'react';
import styles from './game.module.pcss';
import { useParams } from 'react-router-dom';
import { GameView, GameViewCompleted } from 'components/game-view';
import cn from 'classnames';
import { makeInitialData } from 'components/game-view/utils/make-initial-data';
import { gameData } from 'components/game-view/utils/game-data';
import { GameCompletedData } from 'components/game-view/utils/types';

export const GamePage: FC = () => {
  const { id } = useParams<{ id?: string }>();

  if (!id) {
    throw new Error('game id is not provided');
  }

  // вот здесь будет логика извлечения из стора или подзагрузки с сервера данных игры
  const rawGameData = gameData.find((game) => game.gameId === id);

  if (!rawGameData) {
    throw new Error(`no game found by id: ${id}`);
  }

  const [initColors, initGameData] = makeInitialData(rawGameData);
  const [gameCompleted, setGameCompleted] = useState<GameCompletedData>(null);

  return (
    <div className={cn(styles.content, 'u-page')}>
      {gameCompleted ? (
        <GameViewCompleted data={gameCompleted} />
      ) : (
        <GameView
          initColors={initColors}
          initGameData={initGameData}
          setGameCompleted={setGameCompleted}
          size={initGameData.size}
        />
      )}
    </div>
  );
};
