import { FC, useState } from 'react';
import styles from './game.module.pcss';
import { useParams } from 'react-router-dom';
import { GameView, GameCompletedView } from 'components/game-view';
import cn from 'classnames';
import { TGameData } from 'components/game-view/utils/game-data';

export type GameCompletedData = Nullable<{
  gameData: TGameData;
  movesHistory: string[];
  score: number;
  time: string;
}>;

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

  const [gameCompleted, setGameCompleted] = useState<GameCompletedData>(null);

  return (
    <div className={cn(styles.content, 'u-page')}>
      {gameCompleted ? (
        <GameCompletedView
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
        <GameView gameId={id} setGameCompleted={setGameCompleted} />
      )}
    </div>
  );
};
