import { FC } from 'react';
import { GameCompletedData } from 'pages/game/game';
import { Link } from 'react-router-dom';
import { Button } from 'components/button';

type Props = {
  data: GameCompletedData;
  user: User;
  playAgain: () => void;
};

export const GameCompletedView: FC<Props> = ({ data, user, playAgain }) => {
  return (
    <>
      <p className="text-main">
        <span className="">{user.firstName}</span>, вы набрали {data?.score}{' '}
        очков за {data?.time}. Посмотрите на каком Вы месте в общем{' '}
        <Link to="/leaderboard">зачете</Link>, начните{' '}
        <Link to="/">новую игру</Link> или закрасьте эту картинку{' '}
        <Button onClick={playAgain}>еще раз</Button>
      </p>
      <div className="canvas"></div>
    </>
  );
};
