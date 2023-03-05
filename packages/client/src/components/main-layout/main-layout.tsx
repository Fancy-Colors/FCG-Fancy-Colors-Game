import cn from 'classnames';
import { SideMenu } from 'components/side-menu';
import { Outlet } from 'react-router-dom';
import styles from './main-layout.module.pcss';

export const MainLayout = () => {
  return (
    <div className={cn(styles.layout, 'u-container')}>
      <SideMenu />
      <main className={styles.page}>
        <Outlet />
      </main>
    </div>
  );
};
