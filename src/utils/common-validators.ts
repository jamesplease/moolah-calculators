import { maxDollarInput } from "@moolah/lib";
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

export const numberOfYears: Validator[] = [
  isRequiredNumber,
  numberRequired,
  integerRequired,
];

export const years: Validator[] = [
  isRequiredNumber,
  numberRequired,
  integerRequired,
  greaterThanZero,
];
