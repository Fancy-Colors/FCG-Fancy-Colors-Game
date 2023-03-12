export const stringifyTime = (seconds = 0) => {
  const minutesString = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secondsString = String(seconds % 60).padStart(2, '0');
  return `${minutesString}м : ${secondsString}с`;
};
