import { FC } from 'react';

import { Avatar } from 'components/avatar';

import style from './forum-message.module.pcss';
import { Icon } from 'components/icon';

export type ForumMessageProps = {
  id: number;
  avatar?: string;
  name: string;
  date: string;
  text: string;
};
const ForumMessage: FC<ForumMessageProps> = ({ avatar, name, date, text }) => {
  return (
    <section className={style.message}>
      <div className={style.messageAvatar}>
        <Avatar avatar={avatar} name={name} size={'small'} />
        <h4 className={style.messageAvatarLogo}>{name}</h4>
      </div>
      <div className={style.messageContent}>
        <h5 className={style.messageContentDate}>{date}</h5>
        <div className={style.messageContentText}>{text}</div>
      </div>
      <div className={style.messageContentAction}>
        <Icon type={'enter'} size={'xs'} color={'#6d7076'} />
      </div>
    </section>
  );
};

export { ForumMessage };
