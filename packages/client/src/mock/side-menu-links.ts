import { RouterPaths } from 'src/app.types';
export type LinkType = {
  iconType: IconType;
  link: RouterPaths;
  text: string;
  informer?: string;
};

export const LINKS: LinkType[] = [
  {
    iconType: 'main',
    link: RouterPaths.MAIN,
    text: 'Главная',
  },
  {
    iconType: 'leaderboard',
    link: RouterPaths.LEADERBOARD,
    text: 'Лидерборд',
  },
  {
    iconType: 'forum',
    link: RouterPaths.FORUM,
    text: 'Форум',
    informer: '23',
  },
];

export const SOCIAL_LINKS = [
  {
    icon: 'github' as IconType,
    link: 'https://github.com/Fancy-Colors',
  },
  {
    icon: 'vk' as IconType,
    link: '#',
  },
  {
    icon: 'telegram' as IconType,
    link: 'https://t.me',
  },
];
