export const rotationColorMap = {
  green: 0,
  blue: 70,
  pink: 150,
  red: 230,
  orange: 260,
};

export type ColorName = keyof typeof rotationColorMap;
export const colorNames = Object.keys(rotationColorMap) as ColorName[];
