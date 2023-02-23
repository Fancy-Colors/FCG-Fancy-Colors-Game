export function normalizeDate(d: string): string {
  //С API приходит строка вида: 2023-02-23T06:48:31+00:00
  const regEx =
    /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T(?<hour>\d{2}):(?<min>\d{2}):(?<sec>\d{2})/;

  const parsed = d.match(regEx)?.groups;
  if (!parsed) {
    return '';
  }

  const { year, month, day, hour, min, sec } = parsed;
  const date = new Date(
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(min),
      Number(sec)
    )
  );
  const now = new Date(Date.now());

  let dateToRender = '';

  if (
    now.getTime() - date.getTime() < 1000 * 60 * 60 * 24 * 3 &&
    now.getDate() - date.getDate() <= 2
  ) {
    if (now.getDate() === date.getDate()) {
      dateToRender += 'Сегодня ';
    } else if (now.getDate() - date.getDate() === 1) {
      dateToRender += 'Вчера ';
    } else {
      dateToRender += 'Позавчера ';
    }
  } else {
    dateToRender += `${date.toLocaleDateString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })} `;
  }

  dateToRender += `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  return dateToRender;
}
