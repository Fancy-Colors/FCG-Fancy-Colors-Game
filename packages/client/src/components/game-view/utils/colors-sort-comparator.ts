import { Color } from './types';

export const colorsSortComparator = (a: Color, b: Color): number => {
  if (a.progress === 100 && b.progress === 100) {
    return 0;
  }

  if (a.progress === 100) {
    return 1;
  }

  if (b.progress === 100) {
    return -1;
  }

  return a.id - b.id;
};
