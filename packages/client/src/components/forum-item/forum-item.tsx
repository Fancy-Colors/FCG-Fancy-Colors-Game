import { FC } from 'react';
import { Avatar } from 'components/avatar';
import { Icon } from 'components/icon';
import { DateFormatted } from 'components/date-formatted';
import { RouterPaths } from 'src/app.types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ForumItem as ForumItemProps } from 'src/services/forum-slice';

import style from './forum-item.module.pcss';

export const ForumItem: FC<ForumItemProps> = ({
  id,
  title,
  firstMessage,
  name,
  createdAt,
  messageCount,
  avatar,
}) => {
  return (
    <Link to={`${RouterPaths.FORUM}/${id}`}>
      <section className={style.thread}>
        <div>
          <h4 className={style.header}>{title}</h4>
          <p className={cn(style.text, 'text-main')}>{firstMessage}</p>
        </div>
        <div className={style.info}>
          <div>
            <div className={style.left}>
              <Avatar name={name} size="xs" avatar={avatar} />
              <div>
                <span className={cn(style.login, 'text-main')}>{name}</span>
              </div>
              <div className={style.date}>
                <DateFormatted date={createdAt} />
              </div>
            </div>
          </div>
          <div className={style.right}>
            <Icon color="#6D7076" size="xs" type="message" />
            <div className={cn(style.count, 'text-main')}>
              <span>{messageCount}</span>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};
