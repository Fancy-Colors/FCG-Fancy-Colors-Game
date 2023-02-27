import { FC } from 'react';
import { Outlet } from 'react-router-dom';

type Props = {
  text: string;
};

export const TestPage: FC<Props> = ({ text }) => {
  return (
    <>
      <div>{text}</div>
      <Outlet />
    </>
  );
}
