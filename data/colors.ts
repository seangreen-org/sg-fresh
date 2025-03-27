export enum ColorName {
  Green = "green",
  Blue = "blue",
  Pink = "pink",
  Red = "red",
  Orange = "orange",
}

export const rotationColorMap: Record<ColorName, number> = {
  [ColorName.Green]: 0,
  [ColorName.Blue]: 70,
  [ColorName.Pink]: 150,
  [ColorName.Red]: 230,
  [ColorName.Orange]: 260,
} as const;

export const colorNames = Object.values(ColorName);
