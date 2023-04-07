import { FC, useEffect, useState } from 'react';
import styles from './game.module.pcss';
import { useParams } from 'react-router-dom';
import { GameView, GameViewCompleted } from 'components/game-view';
import cn from 'classnames';
import { makeInitialData } from 'components/game-view/utils';
import { useAppDispatch, useAppSelector } from 'components/hooks';
import { resetCompletedGame } from 'src/services/game-slice';
import { gameApi } from 'api/game';
import { GameData, RawGameData, Color } from 'components/game-view/utils/types';

export const GamePage: FC = () => {
  const { id } = useParams<{ id?: string }>();
  if (!id) {
    throw new Error('game id is not provided');
  }

  const dispatch = useAppDispatch();
  const { completedGame } = useAppSelector((state) => state.game);

  const [initGameData, setInitGameData] = useState<Nullable<GameData>>(null);
  const [initColors, setInitColors] = useState<Nullable<Color[]>>(null);

  useEffect(() => {
    dispatch(resetCompletedGame());
    gameApi
      .readGameData(id)
      .then((res) => {
        if (Object.hasOwn(res, 'reason')) {
          throw new Error(`no game found by id: ${id}`);
        }
        const [colors, gameData] = makeInitialData(res as RawGameData);
        setInitColors(colors);
        setInitGameData(gameData);
      })
      .catch((e) => {
        return new Error(e);
      });
  }, [dispatch, id]);

  return (
    <>
      {initGameData && initColors && (
        <div className={cn(styles.content, 'u-page')}>
          {completedGame ? (
            <GameViewCompleted data={initGameData} />
          ) : (
            <GameView
              initColors={initColors}
              initGameData={initGameData}
              size={initGameData.size}
            />
          )}
        </div>
      )}
    </>
  );
};
