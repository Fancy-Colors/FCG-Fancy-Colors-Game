import styles from './profile-link.module.pcss';
import cn from 'classnames';
import { Icon } from 'components/icon';
import { Avatar } from 'components/avatar';

const IconColor = '#6644EC';

type ProfileLinkProps = {
  label?: string;
  size?: 's' | 'l';
  name: string;
  email: string;
  avatar?: string;
  onClick?: () => void;
};

export const ProfileLink = ({
  label = 'Профиль',
  size = 'l',
  name,
  email,
  avatar = '',
  onClick,
}: ProfileLinkProps) => {
  const sizeClass = size === 's' ? 'small' : 'large';
  return (
    <>
      {size === 'l' ? (
        <p className={cn(styles.label, 'text-main')}>{label}</p>
      ) : (
        ''
      )}
      <div className={cn(styles.profileLink, styles[sizeClass])}>
        {size === 'l' ? (
          <div className={styles.info}>
            <div className={styles.avatar}>
              <Avatar size="xs" name={name} avatar={avatar} />
            </div>
            <div className={cn(styles.content, 'text-main')}>
              <div className={styles.name}>{name}</div>
              <div className={styles.email}>{email}</div>
            </div>
          </div>
        ) : (
          ''
        )}
        <button className={styles.settings} onClick={onClick}>
          <Icon size="medium" type="settings" color={IconColor} />
        </button>
      </div>
    </>
  );
};
