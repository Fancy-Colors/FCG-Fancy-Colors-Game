import { Link, useParams } from 'react-router-dom';
import { RouterPaths } from 'src/app.types';
import { ForumMessage } from 'components/forum-message';
import styles from './forum-thread.module.pcss';
import { Icon } from 'components/icon';
import { Pagination } from 'components/pagination';
import { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector, useAuth } from 'components/hooks';
import {
  fetchMessages,
  fetchThread,
  fetchThreadMessagesCount,
} from 'src/actions/forum';
import { setCurrentThreadPage } from 'src/services/forum-slice';
import { TextArea } from 'components/text-area';
import { Button, ButtonColor } from 'components/button';
import { messagesApi } from 'api/messages';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const LIMIT = 20;

export const ForumThread = () => {
  const { user } = useAuth();
  const [reply, setReply] = useState<{
    id: number;
    userName: string;
  } | null>(null);
  const {
    thread,
    messages,
    messagesPagesCount,
    currentThreadPage: page,
  } = useAppSelector((state) => state.forum);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { id: threadId } = useParams();

  if (!threadId) {
    throw new Error('Thread id is not provided');
  }

  const fetchData = useCallback(async () => {
    await Promise.all([
      dispatch(fetchThread(+threadId, page)),
      dispatch(fetchMessages(+threadId, page, LIMIT)),
      dispatch(fetchThreadMessagesCount(+threadId, LIMIT)),
    ]);
    setIsLoading(false);
  }, [page, threadId, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    dispatch(setCurrentThreadPage({ page: 1 }));
  }, [threadId, dispatch]);

  const onClickReply = (id: number, userName: string) => {
    setFocus('replyText');
    setReply({
      id,
      userName,
    });
  };

  const handlePageChange = (num: number) => {
    dispatch(setCurrentThreadPage({ page: num }));
  };

  const cancelReply = () => {
    setReply(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    resetField,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({ replyText }) => {
    await messagesApi.createMessage({
      threadId: +threadId,
      text: replyText,
      createdBy: (user as User).id,
      repliedTo: reply ? reply.id : null,
    });
    fetchData();
    resetField('replyText');
  };

  return (
    <div className={cn(styles.container, 'u-page')}>
      <Link to={RouterPaths.FORUM} className={styles.link}>
        <Icon type="arrow" size="xs" />
        <span className={styles.text}>К темам</span>
      </Link>
      <div className={styles.wrapper}>
        {isLoading ? (
          'Загрузка...'
        ) : (
          <>
            <h3 className={styles.title}>{thread?.title}</h3>
            <div className={cn(styles.posts, 'u-fancy-scrollbar')}>
              {messages?.map((m) => (
                <ForumMessage
                  createdBy={m.createdBy}
                  createdAt={m.createdAt}
                  updatedAt={m.updatedAt}
                  repliedTo={m.repliedTo}
                  threadId={m.threadId}
                  text={m.text}
                  id={m.id}
                  key={m.id}
                  handleReply={onClickReply}
                />
              ))}
            </div>
            <Pagination
              currentPage={page}
              pages={messagesPagesCount}
              onChange={handlePageChange}
            />
            {reply && (
              <div className={styles.replyInfo}>
                <div className={styles.replyInfoText}>
                  Вы отвечаете пользователю <span>{reply.userName}</span>
                </div>
                <div className={styles.replyInfoCancel}>
                  <Button
                    color={ButtonColor.ICON}
                    size="small"
                    onClick={cancelReply}
                  >
                    <Icon type="close" size="xs" color="#6d7076" />
                  </Button>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextArea
                {...register('replyText', {
                  required: 'Обязательное поле',
                })}
                error={errors.replyText?.message as string}
              />
              <div className={styles.formButtons}>
                <Button size="medium" color={ButtonColor.COLORED} type="submit">
                  Отправить
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
