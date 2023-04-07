import { FC, useState } from 'react';
import styles from './main.module.pcss';
import cn from 'classnames';
import { Outlet } from 'react-router';
import { Lead } from 'components/lead';
import { leadSlides } from 'src/mock/lead-slides';
import { Tabs } from 'components/tabs';
import { catalogGameCards } from 'utils/catalog-game-cards';
import { GameCard } from 'components/game-card';
import { useAppSelector } from 'components/hooks';

export const MainPage: FC = () => {
  const { levels } = useAppSelector((store) => store.level);

  const { images, tabs } = catalogGameCards(levels);
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
