import styles from './score.module.pcss';
import { Icon } from 'components/icon';

const ICON_COLOR = '#6644EC';

type ScoreProps = {
  score: number;
};

export const Score = ({ score }: ScoreProps) => {
  const scoreString = Array.from(score.toString()).reduce(
    (prev, current, index, array) => {
      return (
        prev +
        (Math.floor((array.length - index) % 3) === 0 ? ' ' : '') +
        current
      );
    },
    ''
  );
  return (
    <div className={styles.score}>
      <Icon type="star" size="small" color={ICON_COLOR} />
      {scoreString}
    </div>
  );
};
