import { Link, useParams } from 'react-router-dom';
import { RouterPaths } from 'src/app.types';
import { ForumMessage } from 'components/forum-message';
import styles from './forum-thread.module.pcss';
import { Icon } from 'components/icon';
import { Pagination } from 'components/pagination';
import { useEffect } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from 'components/hooks';
import { fetchThread } from 'src/actions/forum';
import { setCurrentThreadPage } from 'src/services/forum-slice';

export const ForumThread = () => {
  const {
    thread,
    count,
    currentThreadPage: page,
  } = useAppSelector((state) => state.forum);
  const dispatch = useAppDispatch();
  const { id: threadId } = useParams();

  if (!threadId) {
    throw new Error('Thread id is not provided');
  }

  useEffect(() => {
    dispatch(fetchThread(threadId, page));
  }, [page, threadId, dispatch]);

  useEffect(() => {
    dispatch(setCurrentThreadPage({ page: 1 }));
  }, [threadId, dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickReply = (id: number) => {
    //console.log(id)
  };

  const handlePageChange = (num: number) => {
    dispatch(setCurrentThreadPage({ page: num }));
  };

  return (
    <div className={cn(styles.container, 'u-page')}>
      <Link to={RouterPaths.FORUM} className={styles.link}>
        <Icon type="arrow" size="xs" />
        <span className={styles.text}>К темам</span>
      </Link>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>{thread?.title}</h3>
        <div className={cn(styles.posts, 'u-fancy-scrollbar')}>
          {thread?.messages.map((m) => (
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
