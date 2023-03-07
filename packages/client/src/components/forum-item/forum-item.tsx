import { FC } from 'react';
import { Avatar } from 'components/avatar';
import { Icon } from 'components/icon';
import { DateFormatted } from 'components/date-formatted';
import { RouterPaths } from 'src/app.types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import style from './forum-item.module.pcss';

export type ForumItemProps = {
  id: number;
  title: string;
  text: string;
  name: string;
  date: string;
  messageCount: number | string;
  avatar?: string;
};
export const ForumItem: FC<ForumItemProps> = ({
  id,
  title,
  text,
  name,
  date,
  messageCount,
  avatar,
}) => {
  return (
    <Link to={`${RouterPaths.FORUM}/${id}`}>
      <section className={style.thread}>
        <div>
          <h4 className={style.header}>{title}</h4>
          <p className={cn(style.text, 'text-main')}>{text}</p>
        </div>
        <div className={style.info}>
          <div>
            <div className={style.left}>
              <Avatar name={name} size="xs" avatar={avatar} />
              <div>
                <span className={cn(style.login, 'text-main')}>{name}</span>
              </div>
              <div className={style.date}>
                <DateFormatted date={date} />
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
