import { FC } from 'react';

import { Avatar } from 'components/avatar';

import style from './forum-message.module.pcss';
import { Icon } from 'components/icon';
import { DateFormatted } from 'components/date-formatted';
import { Button, ButtonColor } from 'components/button';
import cn from 'classnames';

export type ForumMessageProps = {
  id: number;
  avatar?: string;
  name: string;
  date: string;
  text: string;
  handleReply: (id: number) => void;
};
export const ForumMessage: FC<ForumMessageProps> = ({
  id,
  avatar,
  name,
  date,
  text,
  handleReply,
}) => {
  const onClickHandler = () => {
    handleReply(id);
  };

  return (
    <section className={style.message}>
      <div className={style.avatar}>
        <Avatar avatar={avatar} name={name} size="small" />
        <h4 className={style.logo}>{name}</h4>
      </div>
      <div className={style.content}>
        <div className={cn('text-main', style.date)}>
          <DateFormatted date={date} />
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
    </section>
  );
};
