import { ColorType, TGameData, RawGameDataType } from './types';

export const makeInitialData = (
  data: RawGameDataType
): [ColorType[], TGameData] => {
  const { numbers, paths } = data;

  const colors = new Map<number, ColorType>();

  const gameData: TGameData = {
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
        throw new Error('cannot find colorType object by colorId in Map');
      }
      colorData.items += 1;

      colors.set(pathItem.colorId, colorData);
    }
  });

  return [Array.from(colors.values()), gameData];
};
