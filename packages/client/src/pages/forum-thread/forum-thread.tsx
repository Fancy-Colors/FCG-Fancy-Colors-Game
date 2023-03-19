import { Link } from 'react-router-dom';
import { RouterPaths } from 'src/app.types';
import { thread } from 'src/mock/forum-thread';
import { ForumMessage } from 'components/forum-message';
import styles from './forum-thread.module.pcss';
import { Icon } from 'components/icon';
import { Pagination } from 'components/pagination';
import { useEffect, useState } from 'react';
import cn from 'classnames';

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
    <div className={cn(styles.container, 'u-page')}>
      <Link to={RouterPaths.FORUM} className={styles.link}>
        <Icon type="arrow" size="xs" />
        <span className={styles.text}>К темам</span>
      </Link>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>{thread.title}</h3>
        <div className={cn(styles.posts, 'u-fancy-scrollbar')}>
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
    </div>
  );
};
