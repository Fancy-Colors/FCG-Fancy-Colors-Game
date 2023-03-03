import { FC, useEffect, useRef, useState } from 'react';
import styles from './game-view.module.pcss';
import cn from 'classnames';
import { ColorPicker } from 'components/color-picker';
import { renderPath } from './utils/renderPath';
import { gameData } from './utils/mockGameData';
import { useGameData } from './utils/useGameData';

const HARD_CODE_POINTS = '2440';
const HARD_CODE_TIME = '2м:39с';

export const GameView: FC<{ id?: string }> = ({ id }) => {
  const [pickerColors, colors] = useGameData(gameData);

  if (!colors || id) {
    throw new Error('!');
  }
  const [activeId, setActiveId] = useState<number>(pickerColors[0].id);

  function CanvasComponent() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = ref.current;

      if (!canvas) {
        throw new Error('no canvas HTML element found');
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('cannot get 2d context');
      }

      const draw = () => {
        ctx.clearRect(0, 0, 400, 400);
        renderPath(ctx, gameData.numbers);
        gameData.paths.forEach((path) => {
          renderPath(ctx, path);
        });
      };
      draw();

      canvas.addEventListener('click', (e: MouseEvent) => {
        for (const pathItem of gameData.paths) {
          if (ctx.isPointInPath(pathItem.path, e.offsetX, e.offsetY)) {
            if (activeId !== pathItem.colorID) {
              break;
            }
            pathItem.completed = true;
            draw();
            break;
          }
        }
      });
    }, []);

    return <canvas ref={ref} width={400} height={400} />;
  }

  return (
    <div>
      <div className={cn(styles.points)}>
        <p className="text-menu">{HARD_CODE_POINTS}</p>
        <p className="text-menu">{HARD_CODE_TIME}</p>
      </div>

      <div className={styles.gridCols}>
        <ColorPicker
          colors={pickerColors}
          selected={activeId}
          onSelect={(colorId) => setActiveId(colorId)}
        />
        <div className={styles.gameField}>
          <CanvasComponent />
        </div>
      </div>
    </div>
  );
};
