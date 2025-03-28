export enum HeartColor {
  Green = "green",
  Blue = "blue",
  Pink = "pink",
  Red = "red",
  Orange = "orange",
}

export const rotationColorMap: Record<HeartColor, number> = {
  [HeartColor.Green]: 0,
  [HeartColor.Blue]: 70,
  [HeartColor.Pink]: 150,
  [HeartColor.Red]: 230,
  [HeartColor.Orange]: 260,
} as const;

export const colorNames = Object.values(HeartColor);
