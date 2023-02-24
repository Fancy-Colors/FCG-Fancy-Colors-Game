import { FC } from 'react';
import style from './count-indicator.module.pcss';

type CountIndicatorProps = {
  count: number;
  width?: number;
  height?: number;
  radius?: number;
  border?: string;
  fontSize?: number;
  fontWeight?: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

const CountIndicator: FC<CountIndicatorProps> = (props) => {
  const {
    count,
    width,
    height,
    radius,
    border,
    fontSize,
    fontWeight,
    top,
    left,
    right,
    bottom,
  } = props;

  const styles: Record<string, string | number> = {};

  styles.borderRadius =
    radius && radius !== 0 ? `${radius}px` : radius === 0 ? 0 : `${width}px`;
  width && (styles.width = `${width}px`);
  height &&
    (styles.height = `${height}px`) &&
    (styles.lineHeight = `${height}px`);
  border && (styles.border = border);
  fontSize && (styles.fontSize = `${fontSize}px`);
  fontWeight && (styles.fontWeight = fontWeight);
  top && (styles.top = `${top}px`);
  left && (styles.left = `${left}px`);
  right && (styles.right = `${right}px`);
  bottom && (styles.bottom = `${bottom}px`);

  return (
    <section
      className={style.counter}
      style={styles}
      aria-label={`Число новых постов ${count}`}
      title={`Число новых постов ${count}`}
    >
      {count}
    </section>
  );
};

export { CountIndicator };
