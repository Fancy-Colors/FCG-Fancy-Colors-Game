import { TGameData } from './game-data';

export type ColorType = {
  id: number;
  color: string;
  progress: number;
  items: number;
  completed: number;
};

export const formColors = (gameData: TGameData): ColorType[] => {
  const colors = new Map<number, ColorType>();

  // не через reduce для меньшей когнитивной сложности
  gameData.paths.forEach((pathItem) => {
    if (!colors.has(pathItem.colorID)) {
      colors.set(pathItem.colorID, {
        id: pathItem.colorID,
        progress: 0,
        color: pathItem.color,
        items: 1,
        completed: 0,
      });
    } else {
      const data = colors.get(pathItem.colorID);
      if (!data) {
        throw new Error('cannot find colorType object by colorId in Map');
      }
      data.items += 1;

      colors.set(pathItem.colorID, data);
    }
  });

  const colorsArr: ColorType[] = Array.from(colors.values());

  return colorsArr;
};
