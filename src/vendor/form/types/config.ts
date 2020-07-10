import { Validator } from './validation';

export type StringInputValue = string | undefined;
export type NumberInputValue = number | undefined;

export type InputValue = StringInputValue | NumberInputValue | boolean;

export interface SelectValueObject {
  key: string | number;
  value: string;
}

export type SelectValue = SelectValueObject;

export interface NumberConfig {
  type: 'number';
  validators?: Validator[];
  initialValue?: number;
}

export interface StringConfig {
  type: 'string';
  validators?: Validator[];
  initialValue?: string;
}

export interface CheckboxConfig {
  type: 'checkbox';
  initialValue: boolean;
}

export interface SelectConfig {
  type: 'select';
  initialValue?: SelectValue;
  values: SelectValue[];
}

export type InputConfig =
  | NumberConfig
  | StringConfig
  | CheckboxConfig
  | SelectConfig;

export interface FormConfig {
  [Key: string]: InputConfig;
}

export type EnsureFormConfig<T> = { [P in keyof T]: InputConfig };
