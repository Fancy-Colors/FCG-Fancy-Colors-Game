import React, { FC } from 'react'; // eslint-disable-line @typescript-eslint/no-unused-vars

import style from './error-stub.module.pcss';

type ErrorStubProps = {
  title: string;
  subTitle: string;
  children?: JSX.Element | JSX.Element[];
};

const ErrorStub: FC<ErrorStubProps> = (props) => {
  const { title, subTitle, children } = props;

  return (
    <main className={style.stubContainer}>
      <h1 className={style.title}>{title}</h1>
      <h3 className={style.subTitle}>{subTitle}</h3>
      {children}
    </main>
  );
};

export { ErrorStub };
