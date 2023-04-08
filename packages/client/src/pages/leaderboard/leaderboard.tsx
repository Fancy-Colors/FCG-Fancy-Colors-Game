import { useEffect } from 'react';
import cn from 'classnames';
import { Leader } from 'components/leader';
import { ErrorBoundary } from 'utils/error-boundary';
import { useAppDispatch, useAppSelector, useAuth } from 'components/hooks';
import { getLeaderboard, getFilteredPlayers } from 'src/actions';
import styles from './leaderboard.module.pcss';

// TODO как то обрабатывать если количество очков равное у нескольких игроков

export const Leaderboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { leaderboard, filteredPlayers } = useAppSelector(
    (state) => state.leaderboard
  );

  useEffect(() => {
    dispatch(getLeaderboard());
  }, [dispatch]);

  useEffect(() => {
    if (leaderboard.length > 0) {
      const player = leaderboard.find((el) => el.data.id === user?.id);

      if (!player) {
        dispatch(getFilteredPlayers(user?.id as number));
      }
    }
  }, [dispatch, leaderboard, user?.id]);

  // TODO переделать верстку на гриды, все едет
  return (
    <section className={cn(styles.container, 'u-page')}>
      <div className={cn(styles.leaderboard, 'u-fancy-scrollbar')}>
        <div className={cn(styles.content)}>
          <div className={styles.topLeaders}>
            <ErrorBoundary>
              {leaderboard.length > 1 && (
                <Leader
                  place={2}
                  login={leaderboard[1].data.login}
                  name={`${leaderboard[1].data.name} ${leaderboard[1].data.surname}`}
                  score={leaderboard[1].data.score}
                  avatar={leaderboard[1].data.avatar}
                  size="small"
                />
              )}
              {leaderboard.length > 0 && (
                <Leader
                  place={1}
                  login={leaderboard[0].data.login}
                  name={`${leaderboard[0].data.name} ${leaderboard[0].data.surname}`}
                  score={leaderboard[0].data.score}
                  avatar={leaderboard[0].data.avatar}
                  size="medium"
                />
              )}
              {leaderboard.length > 2 && (
                <Leader
                  place={3}
                  login={leaderboard[2].data.login}
                  name={`${leaderboard[2].data.name} ${leaderboard[2].data.surname}`}
                  score={leaderboard[2].data.score}
                  avatar={leaderboard[2].data.avatar}
                  size="small"
                />
              )}
            </ErrorBoundary>
          </div>
          <div className={styles.leadersList}>
            {leaderboard.slice(3).map((leader, index) => {
              return (
                <ErrorBoundary key={leader.data.id}>
                  <Leader
                    size="row"
                    login={leader.data.login}
                    name={`${leader.data.name} ${leader.data.surname}`}
                    score={leader.data.score}
                    avatar={leader.data.avatar}
                    active={leader.data.id === user?.id}
                    place={index + 4}
                  />
                </ErrorBoundary>
              );
            })}
          </div>
          {filteredPlayers && (
            <div className={styles.leadersList}>
              {filteredPlayers.map((leader) => {
                return (
                  <ErrorBoundary key={leader.id}>
                    <Leader
                      size="row"
                      login={leader.login}
                      name={`${leader.name} ${leader.surname}`}
                      score={leader.score}
                      avatar={leader.avatar}
                      place={leader.place}
                      active={user ? leader.id === user.id : false}
                    />
                  </ErrorBoundary>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
