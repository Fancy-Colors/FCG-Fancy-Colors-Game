import { useEffect } from 'react';
import cn from 'classnames';
import { Leader } from 'components/leader';
import { useAppDispatch, useAppSelector, useAuth } from 'components/hooks';
import { /*setUser,*/ getLeaderboard } from 'src/actions';
import { TLeader, FILTERED_LEADERS } from 'src/mock/leaders';
import styles from './leaderboard.module.pcss';
// import { leaderboardApi, LeaderboardApi } from 'api/leaderboard';

const CURRENT_USER_LOGIN = 'user_login';

// TODO как то обрабатывать если количество очков равное у нескольких игроков

export const Leaderboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { leaderboard } = useAppSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(getLeaderboard());
  }, [dispatch]);

  // может перенести в экшены
  // поиск юзера в списке для вывода его в таблицу, плюс для подсчета очков перед отправкой
  // const searchUser = async () => {
  //   const limit = 100;
  //   const cursor = limit - 100;
  //   const a = await leaderboardApi.getLeaders({
  //     ratingFieldName: 'score',
  //     cursor,
  //     limit,
  //   });
  //   console.log(a)
  //   a.filter((el, index) => {
  //     if (el.data.id === user?.id) {
  //       console.log(user?.id)
  //       console.log(index)
  //     }
  //   })
  // }

  return (
    <div className={cn(styles.leaderboard, 'u-page', 'u-fancy-scrollbar')}>
      <div className={styles.topLeaders}>
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
      </div>
      <div className={styles.leadersList}>
        {leaderboard.slice(3).map((leader, index) => {
          return (
            <Leader
              size="row"
              key={leader.data.id}
              login={leader.data.login}
              name={`${leader.data.name} ${leader.data.surname}`}
              score={leader.data.score}
              avatar={leader.data.avatar}
              active={leader.data.id === user?.id}
              place={index + 4}
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
      {/* <button onClick={() => dispatch(setUser(user?.id, user?.login, 7, user?.avatar, user?.firstName, user?.secondName))}>добавить пользователя</button>
      <button onClick={() => searchUser()}>все игроки</button> */}
    </div>
  );
};
