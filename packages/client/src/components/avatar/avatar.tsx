import { FC } from 'react';
import styles from './avatar.module.pcss';
import cn from 'classnames';

type Props = {
  size: 'large' | 'medium' | 'small' | 'xs';
  avatar?: string;
  name: string;
  label?: string;
};

const IMAGE_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/resources`;

export const Avatar: FC<Props> = ({ avatar, name, label, size }) => {
  const imageUrl = avatar
    ? `${IMAGE_BASE_URL}${encodeURIComponent(avatar)}`
    : null;

  return (
    <div className={cn(styles.avatar, styles[size])}>
      {imageUrl ? (
        <img
          className={styles.image}
          src={imageUrl}
          alt={`Аватар @${name}`}
          draggable="false"
        />
      ) : (
        <span className={styles.letter}>
          {name.length > 0 ? name[0].toUpperCase() : 'U'}
        </span>
      )}
      {label && <span className={cn(styles.label, 'text-menu')}>{label}</span>}
    </div>
  );
};
