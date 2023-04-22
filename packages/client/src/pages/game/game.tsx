import { FC, useEffect, useState } from 'react';
import styles from './game.module.pcss';
import { useParams } from 'react-router-dom';
import { GameView, GameViewCompleted } from 'components/game-view';
import cn from 'classnames';
import { makeInitialData } from 'components/game-view/utils';
import { useAppDispatch, useAppSelector } from 'components/hooks';
import { resetCompletedGame } from 'src/services/game-slice';
import { gameApi } from 'api/game';
import { GameData, Color } from 'components/game-view/utils/types';
import { ClientOnly } from 'components/client-only';
import { hasApiError } from 'utils/has-api-error';

const GameViewWrapper = ({
  initGameData,
  completedGame,
  initColors,
}: {
  initGameData: GameData;
  completedGame: boolean;
  initColors: Color[];
}) => {
  if (completedGame) {
    return <GameViewCompleted data={initGameData} />;
  }

  return (
    <GameView
      initColors={initColors}
      initGameData={initGameData}
      size={initGameData.size}
    />
  );
};

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
        if (hasApiError(res)) {
          throw new Error(res.reason);
        }
        const [colors, gameData] = makeInitialData(res);
        setInitColors(colors);
        setInitGameData(gameData);
      })
      .catch((e) => console.error(e));
  }, [dispatch, id]);

  return (
    <>
      {initGameData && initColors && (
        <div className={cn(styles.content, 'u-page')}>
          <ClientOnly>
            <GameViewWrapper
              initGameData={initGameData}
              initColors={initColors}
              completedGame={Boolean(completedGame)}
            />
          </ClientOnly>
        </div>
      )}
    </>
  );
};
