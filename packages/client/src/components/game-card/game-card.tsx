import { useAppDispatch } from 'components/hooks';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { resetCurrentGame } from 'src/services/reducers/game/game-slice';
import styles from './game-card.module.pcss';

type Props = {
  id: string;
  name: string;
  preview: string;
};

export const GameCard: FC<Props> = ({ id, name, preview }) => {
  const dispatch = useAppDispatch();

  return (
    <Link
      to={`/game/${id}`}
      onClick={() => dispatch(resetCurrentGame(id))}
      className={styles.gameCard}
    >
      <img className={styles.image} alt={name} src={preview} />
    </Link>
  );
};
