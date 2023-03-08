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
export const EXIT: LinkType = {
  iconType: 'exit',
  text: 'Выйти',
  link: RouterPaths.MAIN,
};
export const PROFILE = {
  label: 'Профиль',
  link: RouterPaths.PROFILE,
  email: 'johnson@ya.ru',
  name: 'Иван Джонсон',
  avatar:
    'https://avatars.mds.yandex.net/i?id=2a00000179f132be486a8a744b50b9b49ec1-5025855-images-thumbs&n=13&exp=1',
};
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
