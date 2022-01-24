import { white, gray, plum } from "./colors";
import { bigRadius, smallRadius } from "./cornerRadius";

export const basicButton = {
  borderRadius: bigRadius,
};

export const defaultButton = {
  ...basicButton,
  backgroundColor: white,
};

export const pressedButton = {
  ...basicButton,
  backgroundColor: plum.mediumDark,
};

export const disabledButton = {
  ...basicButton,
  backgroundColor: gray.medium,
};
