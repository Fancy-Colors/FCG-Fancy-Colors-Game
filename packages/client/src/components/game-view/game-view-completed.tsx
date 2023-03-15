import { FC, useEffect, useRef, useState } from 'react';
import { GameCompletedDataType } from './utils/types';
import { Link } from 'react-router-dom';
import { stringifyTime } from './utils/stringify-time';
import styles from './game-view.module.pcss';
import { drawHistory } from './utils/draw-history';
import { resizeField } from './utils/resize-field';
import { Button } from 'components/button';
import cn from 'classnames';

type Props = {
  data: GameCompletedDataType;
  user: Nullable<User>;
  playAgain: () => void;
};

export const GameViewCompleted: FC<Props> = ({ data, user, playAgain }) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizableRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const size = data?.gameData.size || 1;

  useEffect(() => {
    const resizeCb = () =>
      resizeField(
        fieldRef.current,
        canvasRef.current,
        resizableRef.current,
        size
      );
    resizeCb();
    window.addEventListener('resize', resizeCb);
    return () => window.removeEventListener('resize', resizeCb);
  }, [size]);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) {
      throw new Error('no canvas HTML element found');
    }
    const context = canvasElement.getContext('2d');
    if (!context) {
      throw new Error('cannot get 2d context from Element');
    }

    setCtx(context);
  }, []);

  useEffect(() => {
    if (!ctx) return;
    drawHistory(ctx, data!.gameData, data!.movesHistory);
  }, [ctx, data]);

  const GameEndMessage = () => {
    return (
      <p className={cn('text-main', styles.paragraph)}>
        <span className={styles.accent}>{user?.firstName}</span>, вы набрали{' '}
        <span className={styles.accent}>{data?.score}</span> очков за{' '}
        {stringifyTime(data?.time)}. Посмотрите на каком Вы месте в общем{' '}
        <Link to="/leaderboard">зачете</Link>, или начните{' '}
        <Link to="/">новую игру</Link>. Вы также можете{' '}
        <Button
          onClick={playAgain}
          className={cn(styles.againButton, styles.accent)}
        >
          закрасить картинку заново
        </Button>
      </p>
    );
  };

  return (
    <div>
      <GameEndMessage />

      <div ref={fieldRef} className={styles.gameField}>
        <div
          ref={resizableRef}
          className={styles.canvasWrap}
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <canvas ref={canvasRef} width={size} height={size} />
        </div>
      </div>
    </div>
  );
};
