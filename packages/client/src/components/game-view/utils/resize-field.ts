const STANDART_GAP = 24;

export const resizeField = (
  field: Nullable<HTMLDivElement>,
  canvas: Nullable<HTMLCanvasElement>,
  resizable: Nullable<HTMLDivElement>,
  size: number,
  colorPickerElement?: Nullable<HTMLDivElement>
) => {
  if (!field || !canvas || !resizable) {
    return;
  }
  const { width, height, top } = field.getBoundingClientRect();

  const availableWidth = Math.min(
    width - STANDART_GAP,
    height - STANDART_GAP,
    document.documentElement.clientHeight - top - STANDART_GAP
  );

  const scale = availableWidth / size;
  resizable.style.transform = `scale(${scale})`;

  if (colorPickerElement) {
    colorPickerElement.style.setProperty(
      '--max-height',
      `${width - STANDART_GAP}px`
    );
  }
};
