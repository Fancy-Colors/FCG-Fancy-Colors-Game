import { FC } from 'react';

import style from './error-stub.module.pcss';

export type ErrorStubProps = {
  title: string;
  message: string;
  children?: JSX.Element | JSX.Element[];
};

const ErrorStub: FC<ErrorStubProps> = (props) => {
  const { title, message, children } = props;

  return (
    <main className={style.stubContainer}>
      <h1 className={style.title}>{title}</h1>
      <h3 className={style.message}>{message}</h3>
      {children}
    </main>
  );
};

export { ErrorStub };
