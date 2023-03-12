import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from './game-timer.module.pcss';
import cn from 'classnames';
import { stringifyTime } from 'components/game-view/utils/stringify-time';

export const GameTimer: FC<{
  setTimeElapsed: Dispatch<SetStateAction<number>>;
}> = ({ setTimeElapsed }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [seconds]);

  useEffect(() => {
    setTimeElapsed(seconds);
  }, [seconds, setTimeElapsed]);

  return (
    <div className={cn('text-menu', styles.timer)}>
      {stringifyTime(seconds)}
    </div>
  );
};
