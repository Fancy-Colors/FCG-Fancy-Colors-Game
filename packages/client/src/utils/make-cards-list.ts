import { RawGameDataType } from 'components/game-view/utils/types';

// тут чуть позже надо типизировать возможные темы enum'ом
const TAGS_LABELS: { [key: string]: string } = {
  art: 'Рисунок',
  cartoon: 'Мультфильм',
  people: 'Люди',
};

export type GameCardType = {
  id: string;
  name: string;
  preview: string;
};

type GameCardsType = {
  [key: string]: GameCardType[];
};

export type TabsType = { key: string; label: string };

type ReturnType = {
  images: GameCardsType;
  tabs: TabsType[];
};

export const makeCardsList = (data: RawGameDataType[]): ReturnType => {
  const tabs: TabsType[] = [];
  const images: GameCardsType = {};

  data.forEach(({ gameId, tags, preview, name }) => {
    // формируем тематический список картинок
    tags.forEach((tag) => {
      if (!tabs.find((i) => i.key === tag)) {
        tabs.push({
          key: tag,
          label: TAGS_LABELS[tag] || 'Разное',
        });
      }

      // добавляем карточки-превью
      const imagesList = Object.hasOwn(images, tag) ? images[tag] : [];
      imagesList.push({
        id: gameId,
        name,
        preview,
      });

      images[tag] = imagesList;
    });
  });

  return {
    images,
    tabs,
  };
};
