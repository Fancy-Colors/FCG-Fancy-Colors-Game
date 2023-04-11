import { FC, useEffect } from 'react';
import styles from './game.module.pcss';
import { useParams } from 'react-router-dom';
import { GameView, GameViewCompleted } from 'components/game-view';
import cn from 'classnames';
import { makeInitialData, gameData } from 'components/game-view/utils';
import { useAppDispatch, useAppSelector } from 'components/hooks';
import { resetCompletedGame } from 'src/services/game-slice';
import { RawGameData } from 'components/game-view/utils/types';
import { ClientOnly } from 'components/client-only';

const GameViewWrapper = ({
  rawGameData,
  completedGame,
}: {
  rawGameData: RawGameData;
  completedGame: boolean;
}) => {
  const [initColors, initGameData] = makeInitialData(rawGameData);

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

  const dispatch = useAppDispatch();
  const { completedGame } = useAppSelector((state) => state.game);

  if (!id) {
    throw new Error('game id is not provided');
  }
  // вот здесь будет логика извлечения из стора или подзагрузки с сервера данных игры
  const rawGameData = gameData.find((game) => game.gameId === id);

  if (!rawGameData) {
    throw new Error(`no game found by id: ${id}`);
  }

  useEffect(() => {
    dispatch(resetCompletedGame());
  }, [dispatch]);

  return (
    <div className={cn(styles.content, 'u-page')}>
      <ClientOnly>
        <GameViewWrapper
          rawGameData={rawGameData}
          completedGame={Boolean(completedGame)}
        />
      </ClientOnly>
    </div>
  );
};
