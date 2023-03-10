import styles from './leaderboard.module.pcss';
import { Leader } from 'components/leader';
import { TLeader, LEADERS, FILTERED_LEADERS } from 'src/mock/leaders';
import cn from 'classnames';

const CURRENT_USER_LOGIN = 'user_login';

export const Leaderboard = () => {
  return (
    <div className={cn(styles.leaderboard, 'u-page', 'u-fancy-scrollbar')}>
      <div className={styles.topLeaders}>
        {LEADERS.length > 1 && <Leader {...LEADERS[1]} size="small" />}
        {LEADERS.length > 0 && <Leader {...LEADERS[0]} size="medium" />}
        {LEADERS.length > 2 && <Leader {...LEADERS[2]} size="small" />}
      </div>
      <div className={styles.leadersList}>
        {LEADERS.slice(3).map((leader: TLeader, key: number) => {
          return (
            <Leader
              {...leader}
              size="row"
              key={key}
              active={leader.login === CURRENT_USER_LOGIN}
            />
          );
        })}
      </div>
      <div className={styles.leadersList}>
        {FILTERED_LEADERS.map((leader: TLeader, key: number) => {
          return (
            <Leader
              {...leader}
              size="row"
              key={key}
              active={leader.login === CURRENT_USER_LOGIN}
            />
          );
        })}
      </div>
    </div>
  );
};
