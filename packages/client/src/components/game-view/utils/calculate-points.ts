const MAX_POINTS_PER_TURN = 120;

export const calcPoints = (time: number): number => {
  return Math.max(1, MAX_POINTS_PER_TURN - Math.floor(time / 10));
};
