import { FC } from 'react';
import { Avatar } from 'components/avatar';
import { DateFormatted } from 'components/date-formatted';
import { RouterPaths } from 'src/app.types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ForumItem as ForumItemProps } from 'src/services/forum-slice';

import style from './forum-item.module.pcss';

export const ForumItem: FC<ForumItemProps> = ({
  id,
  title,
  text,
  name,
  date,
  avatar,
}) => {
  return (
    <Link to={`${RouterPaths.FORUM}/${id}`}>
      <section className={style.thread}>
        <div>
          <h4 className={style.header}>{title}</h4>
          <p className={style.text}>{text}</p>
        </div>
        <div className={style.info}>
          <div className={style.left}>
            <Avatar name={name} size="xs" avatar={avatar} />
            <div>
              <span className={cn(style.login, 'text-main')}>{name}</span>
            </div>
          </div>
          <div className={cn(style.date, 'text-main')}>
            <DateFormatted date={date} />
          </div>
        </div>
      </section>
    </Link>
  );
};
