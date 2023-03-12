/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from 'react';
import { GameCompletedDataType } from './utils/types';
import { Link } from 'react-router-dom';
import { stringifyTime } from './utils/stringify-time';
import styles from './game-view.module.pcss';
import { drawHistory } from './utils/draw-history';
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

  const resizeField = () => {
    if (!fieldRef.current || !canvasRef.current || !resizableRef.current) {
      return;
    }
    const { width, height, top } = fieldRef.current.getBoundingClientRect();

    const availableWidth = Math.min(
      width,
      height,
      document.documentElement.clientHeight - top - 24
    );

    const scale = availableWidth / size;
    resizableRef.current.style.transform = `scale(${scale})`;
  };

  useEffect(() => {
    resizeField();
    window.addEventListener('resize', resizeField);
    return () => window.removeEventListener('resize', resizeField);
  }, []);

  const Message = () => {
    return (
      <p className={cn('text-main', styles.paragraph)}>
        <span className={styles.accent}>{user.firstName}</span>, вы набрали{' '}
        <span className={styles.accent}>{data?.score}</span> очков за{' '}
        {stringifyTime(data?.time)}. Посмотрите на каком Вы месте в общем{' '}
        <Link to="/leaderboard">зачете</Link>, или начните{' '}
        <Link to="/">новую игру</Link>. Вы также можете{' '}
        <span onClick={playAgain} className={styles.accent}>
          закрасить картинку заново
        </span>
      </p>
    );
  };

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
