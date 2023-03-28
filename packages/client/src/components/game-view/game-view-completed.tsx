import { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GameData } from './utils/types';
import { drawHistory, resizeField, stringifyTime } from './utils';
import { Button } from 'components/button';
import { useAuth } from 'components/hooks/use-auth';
import { useAppDispatch, useAppSelector } from 'components/hooks';
import { resetCompletedGame } from 'src/services/game-slice';
import { leaderboardApi } from 'api/leaderboard';
import styles from './game-view.module.pcss';
import cn from 'classnames';

type Props = {
  data: GameData;
};

export const GameViewCompleted: FC<Props> = ({ data }) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { completedGame } = useAppSelector((state) => state.game);
  const { player } = useAppSelector((state) => state.leaderboard);

  if (!completedGame) {
    throw new Error('no completed game found');
  }

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizableRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const size = data?.size || 1;

  useEffect(() => {
    if (completedGame) {
      let allPoints = completedGame.points;

      if (player) {
        allPoints = completedGame.points + player.data.score;
      }

      if (user) {
        (async () => {
          try {
            await leaderboardApi.setUser({
              id: user.id,
              login: user.login,
              score: allPoints,
              avatar: user.avatar,
              name: user.firstName,
              surname: user.secondName,
            });
          } catch (error) {
            throw new Error('Не удалось добавить игрока ');
          }
        })();
      }
    }
  }, [completedGame, player, user]);

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

  const { points, time, movesHistory } = completedGame;

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
          onClick={() => dispatch(resetCompletedGame())}
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
