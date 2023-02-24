import { FC } from 'react';
import cn from 'classnames';
import styles from './icon.module.pcss';
import { ReactComponent as MainIcon } from 'assets/icons/main-icon.svg';
import { ReactComponent as LeaderBoardIcon } from 'assets/icons/leaderboard-icon.svg';
import { ReactComponent as ForumIcon } from 'assets/icons/forum-icon.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings-icon.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close-icon.svg';

type Props = {
  type: 'main' | 'leaderboard' | 'forum' | 'settings' | 'close';
  size: 'small' | 'medium';
  color: string;
};

export const Icon: FC<Props> = ({ type, size, color }) => {
  switch (type) {
    case 'main':
      return (
        <MainIcon className={cn(styles[size])} style={{ stroke: color }} />
      );

    case 'leaderboard':
      return (
        <LeaderBoardIcon
          className={cn(styles[size])}
          style={{ stroke: color }}
        />
      );

    case 'forum':
      return (
        <ForumIcon className={cn(styles[size])} style={{ stroke: color }} />
      );

    case 'close':
      return <CloseIcon className={cn(styles[size])} style={{ fill: color }} />;

    case 'settings':
      return (
        <SettingsIcon className={cn(styles[size])} style={{ fill: color }} />
      );

    default:
      return <MainIcon data-size={size} style={{ stroke: color }} />;
  }
};
