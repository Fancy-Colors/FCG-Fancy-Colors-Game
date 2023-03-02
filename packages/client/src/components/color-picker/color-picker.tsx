import cn from 'classnames';
import { FC } from 'react';
import styles from './color-picker.module.pcss';

type Color = {
  id: number;
  color: string;
  progress: number;
};

type Props = {
  colors: Color[];
  selected: number;
  onSelect: (id: number) => void;
};

const ProgressIndicator = ({ progress }: { progress: number }) => {
  const radius = 25;
  const arcLength = 2 * Math.PI * radius;
  const arcOffset = arcLength * (1 - progress / 100);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.progress}
      viewBox="30 30 60 60"
      fill="none"
    >
      <circle
        cx="60"
        cy="60"
        r={radius}
        strokeDasharray={arcLength}
        strokeDashoffset={arcOffset}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export const ColorPicker: FC<Props> = ({ colors, onSelect, selected }) => {
  return (
    <div className={cn(styles.colorPicker, 'u-fancy-scrollbar')}>
      {colors.map(({ color, id, progress }) => {
        const completed = progress === 100;
        const showProgress = selected === id && progress > 0 && !completed;
        const label = completed ? 'V' : id;

        return (
          <button
            key={id}
            type="button"
            disabled={completed}
            className={cn(styles.color, {
              [styles.selected]: selected === id,
            })}
            style={{ backgroundColor: color }}
            onClick={() => onSelect(id)}
          >
            {label}
            {showProgress && <ProgressIndicator progress={progress} />}
          </button>
        );
      })}
    </div>
  );
};
