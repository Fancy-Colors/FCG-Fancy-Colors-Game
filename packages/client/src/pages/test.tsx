import { FC } from 'react';
import { Outlet } from 'react-router-dom';

type Props = {
  text: string;
};

export const TestPage: FC<Props> = ({ text }) => {
  return (
    <>
      <div className="App">Вот тут будет жить ваше приложение :)</div>
      <div>{text}</div>
      <Outlet />
    </>
  );
};
