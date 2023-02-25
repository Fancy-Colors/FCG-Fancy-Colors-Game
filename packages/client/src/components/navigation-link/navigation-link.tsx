import { FC } from 'react';
import styles from './navigation-link.module.pcss';
import cn from 'classnames';
import { Icon } from 'components/icon';

type Props = {
  expanded: boolean;
  type: 'main' | 'leaderboard' | 'forum';
  active: boolean;
  text: string;
  informer?: string;
};

export const NavigationLink: FC<Props> = ({ type, active, text }) => {
  return (
    <div className={cn(styles.navigation, { [styles.active]: active })}>
      <Icon type={type} size="small" />
      {text}
    </div>
  );
};
