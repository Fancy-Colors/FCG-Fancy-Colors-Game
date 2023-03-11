import { FC, useState } from 'react';
import styles from './main.module.pcss';
import cn from 'classnames';
import { Outlet } from 'react-router';
import { Lead } from 'components/lead';
import { leadSlides } from 'src/mock/lead-slides';
import { Tabs } from 'components/tabs';
import { tabs } from 'src/mock/tabs';
import { gameCards } from 'src/mock/game-cards';
import { GameCard } from 'components/game-card';

export const MainPage: FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const images = gameCards[activeTab] || [];

  return (
    <div className={cn(styles.content, 'u-page')}>
      <Lead slides={leadSlides} />
      <section className={styles.gameSection}>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(key) => setActiveTab(key)}
        />
        <div className={cn(styles.chooseGame, 'u-fancy-scrollbar')}>
          <ul className={styles.chooseGameContent}>
            {images.map((item) => {
              return (
                <li className={styles.card} key={item.id}>
                  <article className={styles.cardContent}>
                    <GameCard {...item} />
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <Outlet />
    </div>
  );
};
