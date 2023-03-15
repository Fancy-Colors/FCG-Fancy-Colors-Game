const STANDART_GAP = 24;

export const resizeField = (
  field: Nullable<HTMLDivElement>,
  canvas: Nullable<HTMLCanvasElement>,
  resizable: Nullable<HTMLDivElement>,
  size: number
) => {
  if (!field || !canvas || !resizable) {
    return;
  }
  const { width, height, top } = field.getBoundingClientRect();

  const availableWidth = Math.min(
    width - STANDART_GAP,
    height,
    document.documentElement.clientHeight - top - STANDART_GAP
  );

  const scale = availableWidth / size;
  resizable.style.transform = `scale(${scale})`;
};
