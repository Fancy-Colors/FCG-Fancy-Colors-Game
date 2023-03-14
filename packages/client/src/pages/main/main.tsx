import { FC, useState } from 'react';
import styles from './main.module.pcss';
import cn from 'classnames';
import { Outlet } from 'react-router';
import { Lead } from 'components/lead';
import { leadSlides } from 'src/mock/lead-slides';
import { Tabs } from 'components/tabs';
import { catalogGameCards } from 'utils/catalog-game-cards';
import { GameCard } from 'components/game-card';
import { gameData } from 'components/game-view/utils/game-data';

export const MainPage: FC = () => {
  // тут логика получения списка доступных игр с бэка или из стора
  // пока данные берем из gameData
  const { images, tabs } = catalogGameCards(gameData);
  const [activeTab, setActiveTab] = useState(tabs[0].key);

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
            {images[activeTab].map((item) => {
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
