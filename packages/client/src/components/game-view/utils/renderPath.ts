import patternImage from '../../../assets/squares.png';

export type TPath = {
  path: Path2D;
  color: string;
  chosen: boolean;
  completed: boolean;
  id: string;
  colorID: number;
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
    const img = new Image();
    img.src = patternImage;

    img.onload = () => {
      const pattern = ctx.createPattern(img, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
      }
      ctx.fill(path);
    };
    return;
  }

  ctx.setLineDash([4, 4]);
  ctx.stroke(path);
};
