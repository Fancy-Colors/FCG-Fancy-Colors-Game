import { ButtonLink } from 'components/button';
import { TextField } from 'components/text-field';
import { ForumItem } from 'components/forum-item';

import style from './forum.module.pcss';
import { Icon } from 'components/icon';
import { RouterPaths } from 'src/app.types';
import { useEffect, useState } from 'react';
import { Pagination } from 'components/pagination';
import { useAppDispatch, useAppSelector } from 'components/hooks';
import { ForumApiService } from 'src/services/api/forum/forum-api-service';
import { setForum } from 'src/services/reducers/forum/forum-slice';
import { ForumItemProps } from 'components/forum-item/forum-item';

const client = new ForumApiService();

export const Forum = () => {
  const [page, setPage] = useState(1);
  const { forum, count } = useAppSelector((state) => state.forum);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!(page in forum)) {
      // eslint-disable-next-line promise/catch-or-return
      client
        .getForum(page)
        // eslint-disable-next-line promise/prefer-await-to-then
        .then(
          (threads) =>
            dispatch(
              setForum({
                page,
                data: threads,
              })
            ) // не знаю как там через thunk это сделать - поэтому так.
          // .catch(e => {
          //   console.log(e);
          // })
        );
    }
  }, [page, dispatch, forum]); // ESlint хочет тут видеть dispatch, forum.

  const handlePageChange = (num: number) => {
    setPage(num);
  };

  return (
    <main className={style.container}>
      <div className={style.panel}>
        <div className={style.controls}>
          <div>
            <ButtonLink to={RouterPaths.NEW_THREAD} className={style.create}>
              Создать тему
            </ButtonLink>
          </div>
          <div className={style.search}>
            <Icon type="search" size="xs" color="#6d7076" />
            <TextField placeholder="Поиск" />
          </div>
        </div>
        <article className={style.threads}>
          {forum[page] &&
            forum[page].map((t: ForumItemProps) => (
              <ForumItem
                title={t.title}
                text={t.text}
                date={t.date}
                name={t.name}
                messageCount={t.messageCount}
                id={t.id}
                key={t.id}
              />
            ))}
          <Pagination
            currentPage={page}
            pages={count}
            onChange={handlePageChange}
          />
        </article>
      </div>
    </main>
  );
};
