import cn from 'classnames';
import { forwardRef, memo, useMemo } from 'react';
import { contrast, ColorSpace, sRGB } from 'colorjs.io/fn';
import styles from './color-picker.module.pcss';

type Color = {
  id: number;
  color: string;
  progress: number;
};

type ColorPickerProps = {
  colors: Color[];
  activeColorId: number;
  onSelect: (id: number) => void;
};

type ColorItemProps = {
  onClick: () => void;
  active: boolean;
} & Color;

ColorSpace.register(sRGB);

function getContrastValue(background: string, foreground: string) {
  return Math.abs(contrast(background, foreground, 'WCAG21'));
}

function getContrastForeground(color: string) {
  const contrastOnWhite = getContrastValue(color, 'white');
  const contrastOnBlack = getContrastValue(color, 'black');
  return contrastOnWhite > contrastOnBlack ? '#fff' : '#000';
}

const ProgressIndicator = memo(function ProgressIndicator({
  progress,
}: {
  progress: number;
}) {
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
});

const ColorItem = ({
  progress,
  color,
  id,
  onClick,
  active,
}: ColorItemProps) => {
  const completed = progress === 100;
  const showProgress = active && !completed;
  const label = completed ? 'V' : id;
  const fgColor = useMemo(() => getContrastForeground(color), [color]);

  return (
    <button
      key={id}
      type="button"
      disabled={completed}
      className={cn(styles.color, {
        [styles.selected]: active,
      })}
      style={{ backgroundColor: color, color: fgColor }}
      onClick={onClick}
    >
      {label}
      {showProgress && <ProgressIndicator progress={progress} />}
    </button>
  );
};

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  function ColorPicker({ colors, onSelect, activeColorId }, ref) {
    return (
      <div ref={ref} className={cn(styles.colorPicker, 'u-fancy-scrollbar')}>
        {colors.map(({ color, id, progress }) => {
          return (
            <ColorItem
              key={id}
              id={id}
              color={color}
              progress={progress}
              active={activeColorId === id}
              onClick={() => onSelect(id)}
            />
          );
        })}
      </div>
    );
  }
);
