import { ValidatorReturn } from './validation';
import {
  CheckboxConfig,
  NumberConfig,
  StringConfig,
  SelectConfig,
} from './config';

// Valid props to pass into an input
export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

// The base interface for each input
export interface BaseInput {
  error: ValidatorReturn;
  dirty: boolean;
  touched: boolean;
  disabled: boolean;
  getProps: (props?: InputProps) => any;
}

// Values that are unique to each
export interface CheckboxInput extends CheckboxConfig, BaseInput {
  checked: boolean;
}

// Most inputs are stored as strings. This is an interface that can be used
// for those kinds of inputs.
interface StringBasedInput {
  value?: string | undefined;
}

export interface NumberInput
  extends NumberConfig,
    BaseInput,
    StringBasedInput {}

export interface StringInput
  extends StringConfig,
    BaseInput,
    StringBasedInput {}

export interface SelectInput
  extends SelectConfig,
    BaseInput,
    StringBasedInput {}

export type FormInput = CheckboxInput | NumberInput | StringInput | SelectInput;
