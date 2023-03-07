import { ButtonLink } from 'components/button';
import { TextField } from 'components/text-field';
import { ForumItem } from 'components/forum-item';

import { threads } from 'src/mock/forum-threads';

import style from './forum.module.pcss';
import { Icon } from 'components/icon';
import { RouterPaths } from 'src/app.types';
import { useEffect, useState } from 'react';
import { Pagination } from 'components/pagination';

export const Forum = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(20);

  useEffect(() => {
    setCount(30);
  }, [page]);

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
          {threads.map((t) => (
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
