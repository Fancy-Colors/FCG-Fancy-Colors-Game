import image from 'assets/canvas-fill-pattern.png';
import { Path } from './types';

const img = new Image();
img.src = image;

export const renderPath = (
  ctx: CanvasRenderingContext2D,
  pathArg: Path
): void => {
  const { path, color, chosen, completed } = pathArg;

  if (completed) {
    ctx.fillStyle = color;
    ctx.fill(path);
    return;
  }

  if (chosen) {
    const pattern = ctx.createPattern(img, 'repeat');
    if (pattern) {
      ctx.fillStyle = pattern;
    }
    ctx.fill(path);
    return;
  }

  ctx.fillStyle = 'transparent';

  ctx.stroke(path);
};
