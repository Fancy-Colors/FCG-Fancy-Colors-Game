import { renderPath } from './render-path';
import { GameDataType } from './types';

const RENDER_SPEED = 300;

export const drawHistory = (
  ctx: CanvasRenderingContext2D | null,
  gameData: GameDataType,
  movesHistory: string[]
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
      renderPath(ctx, foundPath);
    }

    setTimeout(() => render(++move), RENDER_SPEED);
  }
  render(0);
};
