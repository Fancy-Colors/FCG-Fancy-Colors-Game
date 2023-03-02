import { FC } from 'react';
import styles from './main.module.pcss';
import cn from 'classnames';
import { SideMenu } from 'components/side-menu';
import { Outlet } from 'react-router';

export const MainPage: FC = () => {
  return (
    <main className={styles.main}>
      <SideMenu />
      <div className={cn(styles.content, '')}></div>
      <Outlet />
    </main>
  );
};
