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
  const url = `${import.meta.env.VITE_API_BASE_URL}/resources${avatar}`;

  return (
    <div
      className={cn(styles.avatar, styles[size])}
      style={{ backgroundImage: `url(${url})` }}
    >
      {!avatar && <p>{name.length > 0 ? name[0].toUpperCase() : 'U'}</p>}
      {label && <span className={cn(styles.label, 'text-menu')}>{label}</span>}
    </div>
  );
};
