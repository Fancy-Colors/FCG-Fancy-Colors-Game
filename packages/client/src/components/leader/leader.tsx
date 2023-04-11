import cn from 'classnames';
import styles from './leader.module.pcss';
import { Avatar } from 'components/avatar';
import { Score } from 'components/score';

type LeaderProps = {
  avatar?: string;
  login: string;
  name: string;
  place: number;
  score: number;
  size: 'small' | 'medium' | 'row';
  active?: boolean;
};

export const Leader = ({
  avatar = '',
  login,
  name,
  place,
  score,
  size,
  active = false,
}: LeaderProps) => {
  const avatarSize = size === 'row' ? 'xs' : size;
  return (
    <div
      className={cn(styles.leader, styles[size === 'row' ? 'row' : 'card'], {
        [styles.active]: active,
      })}
    >
      {size === 'row' && (
        <div className={cn(styles.place, 'text-main-bold')}>{place}</div>
      )}
      <div className={styles.avatar}>
        <Avatar size={avatarSize} name={name} avatar={avatar} />
        {size !== 'row' && <div className={styles.place}>{place}</div>}
      </div>
      <div className={cn(styles.login, 'text-main-bold')}>{login}</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.points}>
        <Score score={score} />
      </div>
    </div>
  );
};
