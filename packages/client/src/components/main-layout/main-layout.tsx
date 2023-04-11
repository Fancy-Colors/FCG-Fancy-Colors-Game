import cn from 'classnames';
import { HowToModal } from 'components/how-to-modal';
import { SideMenu } from 'components/side-menu';
import { Outlet, useLoaderData } from 'react-router-dom';
import styles from './main-layout.module.pcss';

export const MainLayout = () => {
  const modal = useLoaderData();
  return (
    <div className={cn(styles.layout, 'u-container')}>
      <SideMenu />
      {modal === 'howto' && <HowToModal />}
      <main className={styles.page}>
        <Outlet />
      </main>
    </div>
  );
};
