import { FC } from 'react';
import styles from './game.module.pcss';
import { useParams } from 'react-router-dom';
import { GameView } from 'components/game-view';
import cn from 'classnames';

export const GamePage: FC = () => {
  const { id } = useParams<{ id?: string }>();
  return (
    <div className={cn(styles.content, 'u-page')}>
      <GameView gameId={id} />
    </div>
  );
};
