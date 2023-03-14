import { FC } from 'react';
import styles from './game-timer.module.pcss';
import cn from 'classnames';
import { stringifyTime } from 'components/game-view/utils/stringify-time';

export const GameTimer: FC<{
  seconds: number;
}> = ({ seconds }) => {
  return (
    <div className={cn('text-menu', styles.timer)}>
      {stringifyTime(seconds)}
    </div>
  );
};
