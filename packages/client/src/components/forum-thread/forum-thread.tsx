import { Link } from 'react-router-dom';

import { RouterPaths } from 'src/app.types';
import { thread } from 'src/mock/forum-thread';
import { ForumMessage } from 'components/forum-message';

import style from './forum-thread.module.pcss';
import { Icon } from 'components/icon';

export const ForumThread = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickReply = (id: number) => {
    //console.log(id)
  };

  return (
    <main className={style.container}>
      <article className={style.panel}>
        <Link to={RouterPaths.FORUM} className={style.link}>
          <Icon type={'arrow'} size={'xs'} color={'#6644ECFF'} />
          <span className={style.text}>К темам</span>
        </Link>
        <div className={style.thread}>
          <div className={style.title}>{thread.title}</div>
          <div>
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
        </div>
      </article>
    </main>
  );
};
