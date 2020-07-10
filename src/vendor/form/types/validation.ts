import { ValuesObject } from './internal';

interface ValidationErrorObject {
  code: string;
  // This should be nested in a `meta` key or something
  [Key: string]: any;
}

export type ValidationError = string | ValidationErrorObject;
export type ValidatorReturn = undefined | ValidationError;

export type Validator = (
  value: string | undefined,
  inputs: ValuesObject
) => ValidatorReturn;
