/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from 'react';
import { GameCompletedDataType } from './utils/types';
import { Link } from 'react-router-dom';
import { stringifyTime } from './utils/stringify-time';
import styles from './game-view.module.pcss';
import { drawHistory } from './utils/draw-history';
import { resizeField } from './utils/resize-field';
import cn from 'classnames';

type Props = {
  data: GameCompletedDataType;
  user: User;
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
  }, []);

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

  const Message = () => {
    return (
      <p className={cn('text-main', styles.paragraph)}>
        <span className={styles.accent}>{user.firstName}</span>, вы набрали{' '}
        <span className={styles.accent}>{data?.score}</span> очков за{' '}
        {stringifyTime(data?.time)}. Посмотрите на каком Вы месте в общем{' '}
        <Link to="/leaderboard" className={styles.clickable}>
          зачете
        </Link>
        , или начните{' '}
        <Link to="/" className={styles.clickable}>
          новую игру
        </Link>
        . Вы также можете{' '}
        <span
          onClick={playAgain}
          className={cn(styles.accent, styles.clickable)}
        >
          закрасить картинку заново
        </span>
      </p>
    );
  };

  return (
    <div>
      <Message />

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
