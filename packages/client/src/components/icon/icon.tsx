import { FC } from 'react';
import styles from './icon.module.pcss';
import { ReactComponent as MainIcon } from 'assets/icons/main.svg';
import { ReactComponent as LeaderBoardIcon } from 'assets/icons/leaderboard.svg';
import { ReactComponent as ForumIcon } from 'assets/icons/forum.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as VKIcon } from 'assets/icons/vk.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';
import { ReactComponent as CircleIcon } from 'assets/icons/circle.svg';
import { ReactComponent as EnterIcon } from 'assets/icons/enter.svg';
import { ReactComponent as ExitIcon } from 'assets/icons/exit.svg';
import { ReactComponent as GithubIcon } from 'assets/icons/github.svg';
import { ReactComponent as MessageCountIcon } from 'assets/icons/message-count.svg';
import { ReactComponent as SmileIcon } from 'assets/icons/smile.svg';
import { ReactComponent as TelegramIcon } from 'assets/icons/telegram.svg';
import { ReactComponent as StarIcon } from 'assets/icons/star.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as ThemeToggleIcon } from 'assets/icons/theme-toggle.svg';
import { ReactComponent as BurgerIcon } from 'assets/icons/burger.svg';
import { ReactComponent as Success } from 'assets/icons/success.svg';
import { ReactComponent as Error } from 'assets/icons/error.svg';
import { ReactComponent as Info } from 'assets/icons/info.svg';
import { ReactComponent as Warning } from 'assets/icons/warning.svg';

type Props = {
  type: IconType;
  size: 'xs' | 'small' | 'medium' | 'large';
  color?: string;
};

export const Icon: FC<Props> = ({ type, size, color = 'currentColor' }) => {
  switch (type) {
    case 'main':
      return <MainIcon className={styles[size]} fill={color} />;
    case 'leaderboard':
      return <LeaderBoardIcon className={styles[size]} fill={color} />;
    case 'forum':
      return <ForumIcon className={styles[size]} fill={color} />;
    case 'settings':
      return <SettingsIcon className={styles[size]} fill={color} />;
    case 'close':
      return <CloseIcon className={styles[size]} fill={color} />;
    case 'vk':
      return <VKIcon className={styles[size]} fill={color} />;
    case 'search':
      return <SearchIcon className={styles[size]} fill={color} />;
    case 'arrow':
      return <ArrowIcon className={styles[size]} fill={color} />;
    case 'circle':
      return <CircleIcon className={styles[size]} fill={color} />;
    case 'enter':
      return <EnterIcon className={styles[size]} fill={color} />;
    case 'exit':
      return <ExitIcon className={styles[size]} fill={color} />;
    case 'github':
      return <GithubIcon className={styles[size]} fill={color} />;
    case 'message':
      return <MessageCountIcon className={styles[size]} fill={color} />;
    case 'smile':
      return <SmileIcon className={styles[size]} fill={color} />;
    case 'telegram':
      return <TelegramIcon className={styles[size]} fill={color} />;
    case 'star':
      return <StarIcon className={styles[size]} fill={color} />;
    case 'user':
      return <UserIcon className={styles[size]} fill={color} />;
    case 'theme-toggle':
      return <ThemeToggleIcon className={styles[size]} fill={color} />;
    case 'burger':
      return <BurgerIcon className={styles[size]} fill={color} />;
    case 'success':
      return <Success className={styles[size]} fill={color} />;
    case 'error':
      return <Error className={styles[size]} fill={color} />;
    case 'info':
      return <Info className={styles[size]} fill={color} />;
    case 'warning':
      return <Warning className={styles[size]} fill={color} />;

    default:
      return <span>NO ICON</span>;
  }
};
