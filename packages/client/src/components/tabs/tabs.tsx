import { FC } from 'react';
import styles from './tabs.module.pcss';
import cn from 'classnames';

type TabItem = {
  key: string;
  label: string;
};

type Props = {
  tabs: TabItem[];
  activeTab: string;
  onChange: (key: string) => void;
};

export const Tabs: FC<Props> = ({ tabs, activeTab, onChange }) => {
  return (
    <ul className={styles.tabs}>
      {tabs.map(({ key, label }) => {
        return (
          <li
            className={cn(styles.tabItem, {
              [styles.active]: key === activeTab,
            })}
            key={key}
          >
            <button
              className={styles.control}
              type="button"
              onClick={() => onChange(key)}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
