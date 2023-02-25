import { FC } from 'react';
import cn from 'classnames';
import styles from './icon.module.pcss';
import { ReactComponent as MainIcon } from 'assets/icons/main-icon.svg';
import { ReactComponent as LeaderBoardIcon } from 'assets/icons/leaderboard-icon.svg';
import { ReactComponent as ForumIcon } from 'assets/icons/forum-icon.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings-icon.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close-icon.svg';
import { ReactComponent as VKIcon } from 'assets/icons/vk-icon.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search-icon.svg';

type Props = {
  type:
    | 'main'
    | 'leaderboard'
    | 'forum'
    | 'settings'
    | 'close'
    | 'vk'
    | 'search';
  size: 'small' | 'medium';
  color: string;
};

export const Icon: FC<Props> = ({ type, size, color }) => {
  const cls = cn(styles[size]);

  switch (type) {
    case 'main':
      return <MainIcon className={cls} fill={color} />;

    case 'leaderboard':
      return <LeaderBoardIcon className={cls} fill={color} />;

    case 'search':
      return <SearchIcon className={cls} fill={color} />;

    case 'forum':
      return <ForumIcon className={cls} fill={color} />;

    case 'vk':
      return <VKIcon className={cls} fill={color} />;

    case 'close':
      return <CloseIcon className={cls} fill={color} />;

    case 'settings':
      return <SettingsIcon className={cls} fill={color} />;

    default:
      return <span>NO ICON</span>;
  }
};
