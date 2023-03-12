/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  WheelEventHandler,
} from 'react';
import styles from './game-view.module.pcss';
import { ColorPicker } from 'components/color-picker';
import { renderPath } from './utils/render-path';
import { FullScreenButton } from 'components/fullscreen-button';
import { ColorType, GameDataType, GameCompletedDataType } from './utils/types';

const HARD_CODE_POINTS = 2440;
const HARD_CODE_TIME = '2м:39с';

export const GameView: FC<{
  initColors: ColorType[];
  iniGameDataType: GameDataType;
  size: number;
  gameId?: string;
  setGameCompleted: (p: GameCompletedDataType) => void;
}> = ({ initColors, size, iniGameDataType, setGameCompleted }) => {
  const [gameData, setGameData] = useState(iniGameDataType);
  const [colors, setColors] = useState(initColors);
  const [activeColorId, setActiveColorId] = useState(-1);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [zoom, setZoom] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState({
    y: size,
    x: size,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const resizableRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  // основная функция рисования
  const draw = useCallback(() => {
    if (!ctx) return;
    ctx.lineWidth = 4;
    ctx.clearRect(0, 0, size, size);
    renderPath(ctx, gameData.numbers);
    gameData.paths.forEach((path) => {
      renderPath(ctx, path);
    });
  }, [ctx]);

  // увеличиваем средствами css=GPU родителя канвас для того чтобы он занимал всю
  // игровую область и слушаем ресайз окна
  const resizeField = () => {
    if (!fieldRef.current || !canvasRef.current || !resizableRef.current) {
      return;
    }
    const { width, height, top } = fieldRef.current.getBoundingClientRect();

    const availableWidth = Math.min(
      width - 24,
      height,
      document.documentElement.clientHeight - top - 24
    );

    const scale = availableWidth / size;
    resizableRef.current.style.transform = `scale(${scale})`;
  };

  useEffect(() => {
    resizeField();
    window.addEventListener('resize', resizeField);
    return () => window.removeEventListener('resize', resizeField);
  }, []);

  // колбек вынесен на этот уровень для того, чтобы он получал актуальное значение
  // activeColorId, при этом оборачивание в useCallback не сработает
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pathClickHandler = (e: MouseEvent) => {
    if (!ctx || activeColorId < 0) return;
    for (const pathItem of gameData.paths) {
      if (!ctx.isPointInPath(pathItem.path, e.offsetX, e.offsetY)) {
        continue;
      }

      if (activeColorId !== pathItem.colorId || pathItem.completed) {
        break;
      }

      pathItem.completed = true;

      // put it here!

      const renewedColors = colors.map((color) => {
        if (color.id === activeColorId && color.completed !== color.items) {
          color.completed += 1;
          color.progress = Math.floor((color.completed / color.items) * 100);
        }
        return color;
      });

      setColors(renewedColors);
      draw();

      // проверяем не закончена ли игра
      if (gameData.paths.every((i) => i.completed)) {
        setGameCompleted({
          gameData,
          movesHistory: [],
          score: HARD_CODE_POINTS,
          time: HARD_CODE_TIME,
        });
        return;
      }

      break;
    }
  };

  // сохраняем в стейт контекст, паттерн заливки, вешаем слушатель клика и запускаем
  // функцию рисования
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) {
      throw new Error('no canvas HTML element found');
    }
    const context = canvasElement.getContext('2d');
    if (!context) {
      throw new Error('cannot get 2d context from Element');
    }

    setCtx(context);

    canvasElement.addEventListener('click', pathClickHandler);
    draw();
    return () => canvasElement.removeEventListener('click', pathClickHandler);
  }, [pathClickHandler, draw]);

  // слушаем смену цвета
  useEffect(() => {
    setGameData({
      ...gameData,
      paths: gameData.paths.map((item) => {
        if (item.colorId === activeColorId) {
          item.chosen = true;
        } else {
          item.chosen = false;
        }
        return item;
      }),
    });
    draw();
  }, [activeColorId, draw]);

  // слушаем колесико мыши и, если мышка над канвасом,
  // приближаем / отдаляем картинку через стейт zoom
  const handleWheelEvent: WheelEventHandler<HTMLCanvasElement> = (e) => {
    e.stopPropagation();
    if (e.target !== canvasRef.current) {
      return;
    }
    let newZoom;
    if (e.deltaY > 0) {
      newZoom = Math.max(1, zoom - 0.1);
    } else {
      newZoom = Math.min(2, zoom + 0.1); // макс зум - х2
    }

    const { top, left, width } = canvasRef.current.getBoundingClientRect();

    const calculateTransformOrigin = (coord: number) => {
      const coordPosition = (Math.floor(coord) / Math.floor(width)) * 100;
      return coordPosition > 65 ? 100 : coordPosition < 35 ? 0 : 50;
    };

    setTransformOrigin({
      x: calculateTransformOrigin(e.clientX - left),
      y: calculateTransformOrigin(e.clientY - top),
    });
    setZoom(newZoom);
  };

  return (
    <div ref={gameRef} className={styles.fullscreen}>
      <div className={styles.points}>
        <p className="text-menu">{HARD_CODE_POINTS}</p>
        <p className="text-menu">{HARD_CODE_TIME}</p>
        {gameRef.current && <FullScreenButton fsRef={gameRef.current} />}
      </div>

      <div className={styles.game}>
        <ColorPicker
          colors={colors.map(({ progress, id, color }) => {
            return { id, progress, color };
          })}
          selected={activeColorId}
          onSelect={(key) => setActiveColorId(key)}
        />
        <div ref={fieldRef} className={styles.gameField}>
          <div
            ref={resizableRef}
            className={styles.canvasWrap}
            style={{ width: `${size}px`, height: `${size}px` }}
          >
            <canvas
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: `${transformOrigin.x}% ${transformOrigin.y}%`,
              }}
              onWheel={handleWheelEvent}
              ref={canvasRef}
              width={size}
              height={size}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
