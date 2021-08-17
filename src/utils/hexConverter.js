export const hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const color24to16 = (color24) => {
  let r = (color24 >> 8) & 0xf800;
  let g = (color24 >> 5) & 0x07e0;
  let b = (color24 >> 3) & 0x001f;

  return r | g | b;
};

export const hexToRGB565 = (hex) => {
  const color24 = parseInt(hex.substring(1), 16);
  return color24to16(color24);
};
