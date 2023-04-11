import { Path } from './types';

export const renderPath = (
  ctx: CanvasRenderingContext2D,
  pathArg: Path,
  patternImage: HTMLImageElement
): void => {
  const { path, color, chosen, completed } = pathArg;

  if (completed) {
    ctx.fillStyle = color;
    ctx.fill(path);
    return;
  }

  if (chosen) {
    const pattern = ctx.createPattern(patternImage, 'repeat');
    if (pattern) {
      ctx.fillStyle = pattern;
    }
    ctx.fill(path);
    return;
  }

  ctx.fillStyle = 'transparent';

  ctx.stroke(path);
};
