import image from 'assets/canvas-fill-pattern.png';

const img = new Image();
img.src = image;

export type TPath = {
  path: Path2D;
  color: string;
  chosen: boolean;
  completed: boolean;
  id: string;
  colorId: number;
};

export const renderPath = (
  ctx: CanvasRenderingContext2D,
  pathArg: TPath
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

  ctx.setLineDash([1, 4]);
  ctx.stroke(path);
};
