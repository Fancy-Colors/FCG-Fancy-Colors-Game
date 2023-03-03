import { FC } from 'react';
import styles from './game.module.pcss';
import { SideMenu } from 'components/side-menu';
import { useParams } from 'react-router-dom';
import { GameView } from 'components/game-view';

export const GamePage: FC = () => {
  const { id } = useParams<{ id?: string }>();
  return (
    <section className={styles.section}>
      <SideMenu />
      <div className={styles.content}>
        <GameView id={id} />
      </div>
    </section>
  );
};
