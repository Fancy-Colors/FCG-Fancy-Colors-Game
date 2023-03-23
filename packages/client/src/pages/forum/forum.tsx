import { ButtonLink } from 'components/button';
import { TextField } from 'components/text-field';
import { ForumItem } from 'components/forum-item';

import style from './forum.module.pcss';
import { Icon } from 'components/icon';
import { RouterPaths } from 'src/app.types';
import { useEffect } from 'react';
import { Pagination } from 'components/pagination';
import { useAppDispatch, useAppSelector } from 'components/hooks';
import {
  ForumItem as ForumItemProps,
  setCurrentForumPage,
} from 'src/services/forum-slice';
import { fetchForumPage } from 'src/actions';

export const Forum = () => {
  const {
    forum,
    count,
    currentForumPage: page,
  } = useAppSelector((state) => state.forum);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!(page in forum)) {
      dispatch(fetchForumPage(page));
    }
  }, [page, dispatch, forum]);

  const handlePageChange = (num: number) => {
    dispatch(setCurrentForumPage({ page: num }));
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
