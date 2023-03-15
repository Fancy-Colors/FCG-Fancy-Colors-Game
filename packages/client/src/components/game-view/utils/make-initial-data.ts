import { colorsSortComparator } from './colors-sort-comparator';
import { Color, GameData, RawGameData } from './types';

export const makeInitialData = (data: RawGameData): [Color[], GameData] => {
  const { numbers, paths } = data;

  const colors = new Map<number, Color>();

  const gameData: GameData = {
    ...data,
    numbers: {
      ...numbers,
      path: new Path2D(numbers.path),
    },
    paths: paths.map((item) => {
      return {
        ...item,
        path: new Path2D(item.path),
      };
    }),
  };

  // не через reduce для меньшей когнитивной сложности
  paths.forEach((pathItem) => {
    if (!colors.has(pathItem.colorId)) {
      colors.set(pathItem.colorId, {
        id: pathItem.colorId,
        progress: 0,
        color: pathItem.color,
        items: 1,
        completed: 0,
      });
    } else {
      const colorData = colors.get(pathItem.colorId);
      if (!colorData) {
        throw new Error('cannot find Color object by colorId in Map');
      }
      colorData.items += 1;

      colors.set(pathItem.colorId, colorData);
    }
  });

  return [Array.from(colors.values()).sort(colorsSortComparator), gameData];
};
