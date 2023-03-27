import styles from './score.module.pcss';
import cn from 'classnames';
import { Icon } from 'components/icon';

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
    <div className={cn(styles.score, 'text-main-bold')}>
      <Icon type="star" size="small" />
      {scoreString}
    </div>
  );
};
