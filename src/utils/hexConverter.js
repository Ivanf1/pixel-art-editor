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

export const color16To24 = (color16) => {
  let r = (color16 >> 8) & 0xf8;
  r |= r >> 5;
  let g = (color16 >> 3) & 0xfc;
  g |= g >> 6;
  let b = (color16 << 3) & 0xf8;
  b |= b >> 5;

  return (r << 16) | (g << 8) | (b << 0);
};

export const hexToRGB565 = (hex) => {
  const color24 = parseInt(hex.substring(1), 16);
  return color24to16(color24);
};

export const RGB565ToHex = (rgb565) => {
  const color24 = color16To24(rgb565);
  return color24 === 0 ? "#000000" : `#${color24.toString(16)}`;
};
