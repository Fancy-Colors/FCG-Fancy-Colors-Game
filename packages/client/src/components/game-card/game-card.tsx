import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './game-card.module.pcss';

type Props = {
  id: string;
  name: string;
  preview: string;
};

export const GameCard: FC<Props> = ({ id, name, preview }) => {
  return (
    <Link to={`/game/${id}`} className={styles.gameCard}>
      <img className={styles.image} alt={name} src={preview} />
    </Link>
  );
};
