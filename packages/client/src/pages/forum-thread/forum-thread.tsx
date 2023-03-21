import { Link, useParams } from 'react-router-dom';
import { RouterPaths } from 'src/app.types';
import { ForumMessage } from 'components/forum-message';
import styles from './forum-thread.module.pcss';
import { Icon } from 'components/icon';
import { Pagination } from 'components/pagination';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from 'components/hooks';
import { fetchThread } from 'src/actions/forum';

export const ForumThread = () => {
  const [page, setPage] = useState(1);
  const { threads, count } = useAppSelector((state) => state.forum);
  const dispatch = useAppDispatch();
  const { id: threadId } = useParams();

  if (!threadId) {
    throw new Error('Thread id is not provided');
  }

  useEffect(() => {
    if (!(threads[threadId] && threads[threadId][page])) {
      dispatch(fetchThread(threadId, page));
    }
  }, [page, threadId, dispatch, threads]);

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
        <h3 className={styles.title}>
          {threads[threadId] && threads[threadId][page]?.title}
        </h3>
        <div className={cn(styles.posts, 'u-fancy-scrollbar')}>
          {threads[threadId] &&
            threads[threadId][page]?.messages.map((m) => (
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
