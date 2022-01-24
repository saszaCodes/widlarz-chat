import { white, gray, plum } from "./colors";
import { bigRadius, smallRadius } from "./cornerRadius";

export const basicButton = {
  borderRadius: smallRadius,
};

export const defaultButton = {
  ...basicButton,
  backgroundColor: plum.mediumDark,
};

export const pressedButton = {
  ...basicButton,
  backgroundColor: plum.dark,
};

export const disabledButton = {
  ...basicButton,
  backgroundColor: gray.medium,
};
