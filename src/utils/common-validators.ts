import { maxDollarInput } from "../vendor/@moolah/lib";
import { Validator } from "../vendor/form/types";
import {
  isRequiredNumber,
  numberRequired,
  tooLarge,
  tooSmall,
  integerRequired,
  greaterThanZero,
} from "./validators";

export const dollars: Validator[] = [
  isRequiredNumber,
  numberRequired,
  tooSmall(0),
  tooLarge(maxDollarInput),
];

export const percent: Validator[] = [
  isRequiredNumber,
  numberRequired,
  tooSmall(0),
  tooLarge(100),
];

export const years: Validator[] = [
  isRequiredNumber,
  numberRequired,
  integerRequired,
  greaterThanZero,
];
