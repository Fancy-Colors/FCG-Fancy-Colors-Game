import { FC, useEffect, useRef, useState } from 'react';
import { GameData } from './utils/types';
import { Link } from 'react-router-dom';
import { stringifyTime } from './utils/stringify-time';
import styles from './game-view.module.pcss';
import { drawHistory } from './utils/draw-history';
import { resizeField } from './utils/resize-field';
import { Button } from 'components/button';
import cn from 'classnames';
import { useAuth } from 'components/hooks/use-auth';
import { useAppDispatch, useAppSelector } from 'components/hooks';
import { resetCurrentGame } from 'src/services/reducers/game/game-slice';

type Props = {
  data: GameData;
};

export const GameViewCompleted: FC<Props> = ({ data }) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { points, time, movesHistory, id } = useAppSelector(
    (state) => state.game.completedGame
  );

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizableRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const size = data?.size || 1;

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
    drawHistory(ctx, data, movesHistory);
  }, [ctx, data, movesHistory]);

  const GameEndMessage = () => {
    return (
      <p className={cn('text-main', styles.paragraph)}>
        <span className={styles.accent}>{user?.firstName}</span>, вы набрали{' '}
        <span className={styles.accent}>{points}</span> очков за{' '}
        {stringifyTime(time)}. Посмотрите на каком Вы месте в общем{' '}
        <Link to="/leaderboard" className={styles.clickable}>
          зачете
        </Link>
        , или начните{' '}
        <Link to="/" className={styles.clickable}>
          новую игру
        </Link>
        . Вы также можете{' '}
        <Button
          onClick={() => dispatch(resetCurrentGame(id))}
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
