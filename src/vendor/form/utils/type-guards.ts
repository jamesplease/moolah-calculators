import {
  InputConfig,
  CheckboxConfig,
  NumberConfig,
  StringConfig,
  SelectConfig,
} from '../types';

export function inputIsCheckbox(input: InputConfig): input is CheckboxConfig {
  return input.type === 'checkbox';
}

export function inputIsNumber(input: InputConfig): input is NumberConfig {
  return input.type === 'number';
}

export function inputIsString(input: InputConfig): input is StringConfig {
  return input.type === 'string';
}

export function inputIsSelect(input: InputConfig): input is SelectConfig {
  return input.type === 'select';
}
