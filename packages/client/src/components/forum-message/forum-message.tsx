import { FC, useEffect, useState } from 'react';

import { Avatar } from 'components/avatar';

import style from './forum-message.module.pcss';
import { Icon } from 'components/icon';
import { DateFormatted } from 'components/date-formatted';
import { Button, ButtonColor } from 'components/button';
import cn from 'classnames';
import { ForumMessage as ForumMessageType } from 'src/services/forum-slice';
import { userApi } from 'src/api';
import { hasApiError } from 'utils/has-api-error';
import { transformUser } from 'utils/api-transformers';

export type ForumMessageProps = ForumMessageType & {
  handleReply: (id: number, userName: string) => void;
};

export const ForumMessage: FC<ForumMessageProps> = ({
  id,
  createdBy,
  createdAt,
  text,
  handleReply,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const onClickHandler = () => {
    handleReply(id, `${user?.firstName} ${user?.secondName}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await userApi.read(createdBy);
      if (hasApiError(response)) {
        throw new Error(response.reason);
      }
      setUser(transformUser(response));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className={style.message}>
      <div className={style.avatar}>
        <Avatar
          avatar={user?.avatar}
          name={user?.firstName ?? ''}
          size="small"
        />
        {user && (
          <h4 className={style.logo}>
            {`${user.firstName} ${user.secondName}`}
          </h4>
        )}
      </div>
      <div className={style.content}>
        <div className={cn('text-main', style.date)}>
          <DateFormatted date={createdAt} />
        </div>
        <div className={style.text}>
          <p>{text}</p>
        </div>
      </div>
      <div className={style.action}>
        <Button color={ButtonColor.ICON} size="small" onClick={onClickHandler}>
          <Icon type="enter" size="xs" color="#6d7076" />
        </Button>
      </div>
    </article>
  );
};
