import styles from './leaderboard.module.pcss';
import { Leader } from 'components/leader';
import { ErrorBoundary } from 'utils/error-boundary';
import { TLeader, LEADERS, FILTERED_LEADERS } from 'src/mock/leaders';
import cn from 'classnames';

const CURRENT_USER_LOGIN = 'user_login';

export const Leaderboard = () => {
  return (
    <section className={cn(styles.container, 'u-page')}>
      <div className={cn(styles.leaderboard, 'u-fancy-scrollbar')}>
        <div className={cn(styles.content)}>
          <div className={styles.topLeaders}>
            <ErrorBoundary>
              {LEADERS.length > 1 && <Leader {...LEADERS[1]} size="small" />}
              {LEADERS.length > 0 && <Leader {...LEADERS[0]} size="medium" />}
              {LEADERS.length > 2 && <Leader {...LEADERS[2]} size="small" />}
            </ErrorBoundary>
          </div>
          <div className={styles.leadersList}>
            {LEADERS.slice(3).map((leader: TLeader, key: number) => {
              return (
                <ErrorBoundary key={key}>
                  <Leader
                    {...leader}
                    size="row"
                    active={leader.login === CURRENT_USER_LOGIN}
                  />
                </ErrorBoundary>
              );
            })}
          </div>
          <div className={styles.leadersList}>
            {FILTERED_LEADERS.map((leader: TLeader, key: number) => {
              return (
                <ErrorBoundary key={key}>
                  <Leader
                    {...leader}
                    size="row"
                    active={leader.login === CURRENT_USER_LOGIN}
                  />
                </ErrorBoundary>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
