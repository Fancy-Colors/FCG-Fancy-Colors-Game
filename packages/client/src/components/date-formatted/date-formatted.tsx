import { FC } from 'react';
import { normalizeDate } from 'utils/normalize-date';

//С API приходит строка вида: 2023-02-23T06:48:31+00:00
type Props = {
  date?: string;
};

export const DateFormatted: FC<Props> = ({
  date = new Date().toISOString(),
}: Props) => {
  return <time dateTime={date}>{normalizeDate(date)}</time>;
};
