import { Link } from 'react-router-dom';

import { RouterPaths } from 'src/app.types';
import { thread } from 'src/mock/forum-thread';
import { ForumMessage } from 'components/forum-message';

import style from './forum-thread.module.pcss';
import { Icon } from 'components/icon';

const ForumThread = () => {
  return (
    <main className={style.container}>
      <article className={style.panel}>
        <div className={style.backBox}>
          <Link to={RouterPaths.FORUM} className={style.backBoxLink}>
            <Icon type={'arrow'} size={'xs'} color={'#6644ECFF'} />
            <span className={style.backBoxText}>К темам</span>
          </Link>
        </div>
        <div className={style.thread}>
          <div className={style.threadHeader}>{thread.title}</div>
          <div>
            {thread.messages.map((m) => (
              <ForumMessage
                date={m.date}
                name={m.name}
                text={m.text}
                id={m.id}
                key={m.id}
              />
            ))}
          </div>
        </div>
      </article>
    </main>
  );
};

export { ForumThread };
