import { RawGameData } from 'components/game-view/utils/types';

// тут чуть позже надо типизировать возможные темы enum'ом
const TAGS_LABELS: { [key: string]: string } = {
  art: 'Рисунок',
  cartoon: 'Мультфильм',
  people: 'Люди',
};

type GameCard = {
  id: string;
  name: string;
  preview: string;
};

type GameCardsType = {
  [key: string]: GameCard[];
};

type Tabs = { key: string; label: string };

export const catalogGameCards = (
  data: RawGameData[]
): {
  images: GameCardsType;
  tabs: Tabs[];
} => {
  const tabs: Tabs[] = [];
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
