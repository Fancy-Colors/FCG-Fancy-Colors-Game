import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import { ForumItem } from 'components/forum-item';
import cn from 'classnames';

import style from './forum.module.pcss';
import { useEffect, useState } from 'react';
import { Pagination } from 'components/pagination';
import { useAppDispatch, useAppSelector } from 'components/hooks';
import {
  ForumItem as ForumItemProps,
  setCurrentForumPage,
} from 'src/services/forum-slice';
import { fetchForumPage } from 'src/actions';
import { NewThreadModal } from 'components/modal-new-thread';

export const Forum = () => {
  const {
    forum,
    count,
    currentForumPage: page,
  } = useAppSelector((state) => state.forum);
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchForumPage(page));
  }, [page, dispatch]);

  const handlePageChange = (num: number) => {
    dispatch(setCurrentForumPage({ page: num }));
  };

  return (
    <section className={cn(style.container, 'u-page')}>
      <div className={cn(style.panel, 'u-fancy-scrollbar')}>
        <div className={style.controls}>
          <div>
            <Button
              onClick={() => setShowCreateModal(true)}
              type="button"
              className={style.create}
            >
              Создать тему
            </Button>
            <NewThreadModal
              show={showCreateModal}
              onClose={() => setShowCreateModal(false)}
            />
          </div>
          <div className={style.search}>
            <TextField placeholder="Поиск" />
          </div>
        </div>
        <article className={style.threads}>
          {forum?.map((t: ForumItemProps) => (
            <ForumItem
              title={t.title}
              text={t.text}
              date={t.date}
              name={t.name}
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
    </section>
  );
};
