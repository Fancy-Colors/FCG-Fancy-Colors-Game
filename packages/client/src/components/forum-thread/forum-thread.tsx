import { Link } from 'react-router-dom';

import { RouterPaths } from 'src/app.types';
import { thread } from 'src/mock/forum-thread';
import { ForumMessage } from 'components/forum-message';

import style from './forum-thread.module.pcss';
import { Icon } from 'components/icon';
import { Pagination } from 'components/pagination';
import { useEffect, useState } from 'react';

export const ForumThread = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(20);

  useEffect(() => {
    setCount(30);
  }, [page]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickReply = (id: number) => {
    //console.log(id)
  };

  const handlePageChange = (num: number) => {
    setPage(num);
  };

  return (
    <main className={style.container}>
      <article className={style.panel}>
        <Link to={RouterPaths.FORUM} className={style.link}>
          <Icon type="arrow" size="xs" color="#6644ECFF" />
          <span className={style.text}>К темам</span>
        </Link>
        <div className={style.thread}>
          <h3 className={style.title}>{thread.title}</h3>
          <div>
            {thread.messages.map((m) => (
              <ForumMessage
                date={m.date}
                name={m.name}
                text={m.text}
                id={m.id}
                key={m.id}
                handleReply={onClickReply}
              />
            ))}
          </div>
          <Pagination
            currentPage={page}
            pages={count}
            onChange={handlePageChange}
          />
        </div>
      </article>
    </main>
  );
};
