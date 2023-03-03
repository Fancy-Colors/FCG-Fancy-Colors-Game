import { FC } from 'react';
import styles from './avatar.module.pcss';
import cn from 'classnames';

type Props = {
  size: 'large' | 'medium' | 'small' | 'xs';
  avatar?: string;
  name: string;
  label?: string;
};

export const Avatar: FC<Props> = ({ avatar, name, label, size }) => {
  return (
    <div
      className={cn(styles.avatar, styles[size])}
      style={{ backgroundImage: `url(${avatar})` }}
    >
      {!avatar && <p>{name.length > 0 ? name[0].toUpperCase() : 'U'}</p>}
      {label && <span className={cn(styles.label, 'text-menu')}>{label}</span>}
    </div>
  );
};
