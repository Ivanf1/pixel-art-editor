export const gridDimensions = {
  height: 60,
  width: 60,
};

export const defaultColors = {
  blank: "#ffffff",
  colorPickerInitial: "#2C2C54",
};

export const maxPresetColors = 16;

export const initialCells = Array.from(
  { length: gridDimensions.height * gridDimensions.width },
  () => defaultColors.blank
);
