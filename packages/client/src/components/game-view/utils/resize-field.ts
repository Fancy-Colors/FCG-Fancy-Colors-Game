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
    width - 24,
    height,
    document.documentElement.clientHeight - top - 24
  );

  const scale = availableWidth / size;
  resizable.style.transform = `scale(${scale})`;
};
