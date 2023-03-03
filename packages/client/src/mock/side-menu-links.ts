export type RoutesType =
  | '/forum'
  | '/'
  | '/profile'
  | '/how-to'
  | '/leaderboard'
  | '/game';

export type LinkType = {
  iconType: IconType;
  link: RoutesType;
  text: string;
  informer?: string;
};

export const LINKS: LinkType[] = [
  {
    iconType: 'main',
    link: '/',
    text: 'Главная',
  },
  {
    iconType: 'leaderboard',
    link: '/leaderboard',
    text: 'Лидерборд',
  },
  {
    iconType: 'forum',
    link: '/forum',
    text: 'Форум',
    informer: '23',
  },
];
export const EXIT: LinkType = {
  iconType: 'exit',
  text: 'Выйти',
  link: '/',
};
export const PROFILE = {
  label: 'Профиль',
  link: 'profile' as RoutesType,
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
