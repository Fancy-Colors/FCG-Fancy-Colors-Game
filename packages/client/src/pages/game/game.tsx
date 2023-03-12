import { FC, useState } from 'react';
import styles from './game.module.pcss';
import { useParams } from 'react-router-dom';
import { GameView, GameViewCompleted } from 'components/game-view';
import cn from 'classnames';
import { makeInitialData } from 'components/game-view/utils/make-initial-data';
import { gameDataMinion } from 'components/game-view/utils/game-data';
import { GameCompletedDataType } from 'components/game-view/utils/types';

const HARD_CODE_USER: User = {
  id: 45,
  login: 'Логин',
  firstName: 'NAME',
  secondName: 'SURNAME',
  displayName: 'NICK',
  avatar: 'path-to-avatar',
  phone: '112',
  email: 'me@me.me',
};

export const GamePage: FC = () => {
  const { id } = useParams<{ id?: string }>();

  if (!id) {
    throw new Error(`no game Data found by id: ${id}`);
  }

  const [initColors, iniGameDataType] = makeInitialData(gameDataMinion);
  const [gameCompleted, setGameCompleted] =
    useState<GameCompletedDataType>(null);

  return (
    <div className={cn(styles.content, 'u-page')}>
      {gameCompleted ? (
        <GameViewCompleted
          data={gameCompleted}
          user={HARD_CODE_USER}
          playAgain={() => {
            gameCompleted.gameData.paths.forEach(
              (path) => (path.completed = false)
            );
            setGameCompleted(null);
          }}
        />
      ) : (
        <GameView
          initColors={initColors}
          iniGameDataType={iniGameDataType}
          setGameCompleted={setGameCompleted}
          size={iniGameDataType.size}
        />
      )}
    </div>
  );
};
