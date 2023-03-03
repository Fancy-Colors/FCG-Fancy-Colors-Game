import { TGameData } from './mockGameData';

export type ColorMapType = {
  id: number;
  color: string;
  progress: number;
  items: number;
  completed: number;
};

export type PickerColorType = {
  id: number;
  color: string;
  progress: number;
};

export const useGameData = (
  gameData: TGameData
): [PickerColorType[], Map<number, ColorMapType>] => {
  const colors = new Map<number, ColorMapType>();

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

  const pickerColors: PickerColorType[] = Array.from(colors.values()).map(
    (item) => {
      return {
        id: item.id,
        color: item.color,
        progress: item.progress,
      };
    }
  );

  return [pickerColors, colors];
};
