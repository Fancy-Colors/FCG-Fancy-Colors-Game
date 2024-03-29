import { FC, useEffect, useRef, useState, WheelEventHandler } from 'react';
import styles from './game-view.module.pcss';
import { ColorPicker } from 'components/color-picker';
import { FullScreenButton } from 'components/fullscreen-button';
import { Color, GameData } from './utils/types';
import { GameTimer } from 'components/game-timer';
import {
  colorsSortComparator,
  resizeField,
  renderPath,
  calcPoints,
} from './utils';
import { useAppDispatch, useAuth } from 'components/hooks';
import { setGameCompleted } from 'src/services/game-slice';
import { usePatternImage } from './utils/use-pattern-image';
import { getPlayer } from 'src/actions';

// основная функция рисования
const draw = (
  ctx: Nullable<CanvasRenderingContext2D>,
  size: number,
  gameData: GameData,
  patternImage: HTMLImageElement
): void => {
  if (!ctx) return;
  ctx.clearRect(0, 0, size, size);
  renderPath(ctx, gameData.numbers, patternImage);
  gameData.paths.forEach((path) => {
    renderPath(ctx, path, patternImage);
  });
};

export const GameView: FC<{
  initColors: Color[];
  initGameData: GameData;
  size: number;
  gameId?: string;
}> = ({ initColors, size, initGameData }) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const [gameData, setGameData] = useState(initGameData);
  const [colors, setColors] = useState(initColors);
  const [activeColorId, setActiveColorId] = useState(-1);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [zoom, setZoom] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState({
    y: size,
    x: size,
  });
  const patternImage = usePatternImage();
  const [points, setPoints] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [movesHistory, setMovesHistory] = useState<string[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const resizableRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // начинаем отсчет времени
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeElapsed((seconds) => seconds + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // увеличиваем средствами css=GPU родителя канвас для того чтобы он занимал всю
  // игровую область и слушаем ресайз окна
  useEffect(() => {
    const resizeCb = () =>
      resizeField(
        fieldRef.current,
        canvasRef.current,
        resizableRef.current,
        size,
        colorPickerRef.current
      );
    resizeCb();
    window.addEventListener('resize', resizeCb);
    return () => window.removeEventListener('resize', resizeCb);
  }, [size]);

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
      setPoints(points + calcPoints(timeElapsed));
      setMovesHistory([...movesHistory, pathItem.id]);
      pathItem.completed = true;

      const renewedColors = colors
        .map((color) => {
          if (color.id === activeColorId && color.completed !== color.items) {
            color.completed += 1;
            color.progress = Math.floor((color.completed / color.items) * 100);
          }
          return color;
        })
        .sort(colorsSortComparator);

      setColors(renewedColors);
      draw(ctx, size, gameData, patternImage);
      break;
    }
  };

  // проверяем не закончена ли игра
  useEffect(() => {
    if (gameData.paths.every((i) => i.completed)) {
      dispatch(getPlayer(user?.id as number));
      dispatch(
        setGameCompleted({
          movesHistory,
          points,
          time: timeElapsed,
          id: gameData.gameId,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movesHistory.length]);

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
    draw(ctx, size, gameData, patternImage);
    return () => canvasElement.removeEventListener('click', pathClickHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathClickHandler, ctx, size]);

  // слушаем смену цвета
  useEffect(() => {
    setGameData((prevGameData) => {
      return {
        ...prevGameData,
        paths: prevGameData.paths.map((item) => {
          if (item.colorId === activeColorId) {
            item.chosen = true;
          } else {
            item.chosen = false;
          }
          return item;
        }),
      };
    });
    draw(ctx, size, gameData, patternImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeColorId]);

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

    //****
    // В этом блоке вычисляем координаты мышки относительно канваса для реализации зума по этим координатам
    const { top, left, width } = canvasRef.current.getBoundingClientRect();

    const calculateTransformOrigin = (coord: number) =>
      (Math.floor(coord) / Math.floor(width)) * 100;

    setTransformOrigin({
      x: calculateTransformOrigin(e.clientX - left),
      y: calculateTransformOrigin(e.clientY - top),
    });
    //***

    setZoom(newZoom);
  };

  return (
    <div ref={gameRef} className={styles.fullscreen}>
      <div className={styles.points}>
        <GameTimer seconds={timeElapsed} />
        {gameRef.current && <FullScreenButton fsRef={gameRef.current} />}
        <p className="text-menu">{points}</p>
      </div>

      <div className={styles.game}>
        <ColorPicker
          ref={colorPickerRef}
          colors={colors.map(({ progress, id, color }) => {
            return { id, progress, color };
          })}
          activeColorId={activeColorId}
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
              className={styles.canvas}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
