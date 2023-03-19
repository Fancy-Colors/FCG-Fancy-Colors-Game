import styles from './profile-link.module.pcss';
import cn from 'classnames';
import { Icon } from 'components/icon';
import { Avatar } from 'components/avatar';

type ProfileLinkProps = {
  label?: string;
  expanded?: boolean;
  active?: boolean;
  user: User;
};

export const ProfileLink = ({
  label = 'Профиль',
  expanded = true,
  active = false,
  user,
}: ProfileLinkProps) => {
  const { firstName, secondName, email, avatar } = user;
  const name = `${firstName} ${secondName}`;

  return (
    <>
      {expanded && <p className={cn(styles.label, 'text-main')}>{label}</p>}
      <div
        className={cn(styles.profileLink, {
          [styles.collapsed]: !expanded,
          [styles.active]: active,
        })}
      >
        {expanded && (
          <div className={styles.info}>
            <div className={styles.avatar}>
              <Avatar size="xs" name={name} avatar={avatar} />
            </div>
            <div className={cn(styles.content, 'text-main')}>
              <div className={styles.name}>{name}</div>
              <div className={styles.email}>{email}</div>
            </div>
          </div>
        )}
        <div className={styles.settings}>
          <Icon size="medium" type="settings" color="currentcolor" />
        </div>
      </div>
    </>
  );
};
