import { renderPath } from './render-path';
import { GameData } from './types';

const RENDER_SPEED = 300;

export const drawHistory = (
  ctx: CanvasRenderingContext2D | null,
  gameData: GameData,
  movesHistory: string[],
  patternImage: HTMLImageElement
) => {
  ctx?.clearRect(0, 0, gameData.size, gameData.size);

  function render(move: number) {
    if (move === movesHistory.length) {
      return;
    }
    const foundPath = gameData.paths.find(
      (item) => item.id === movesHistory[move]
    );

    if (foundPath && ctx) {
      foundPath.completed = true;
      renderPath(ctx, foundPath, patternImage);
    }

    setTimeout(() => render(++move), RENDER_SPEED);
  }
  render(0);
};
