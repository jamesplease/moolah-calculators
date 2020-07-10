import { InputType } from './base';
import {
  FormInput,
  NumberInput,
  SelectInput,
  CheckboxInput,
  StringInput,
} from './outputs';

interface MapInputTypeToInput {
  checkbox: CheckboxInput;
  number: NumberInput;
  string: StringInput;
  select: SelectInput;
}

interface MapInputTypeToPartialInput {
  checkbox: Partial<CheckboxInput>;
  number: Partial<NumberInput>;
  string: Partial<StringInput>;
  select: Partial<SelectInput>;
}

interface MapTypeToUpdateType {
  checkbox: boolean;
  number: number | string;
  string: string;
  select: string;
}

export type ConfigToInputMapper<
  T extends {
    [key in keyof T]: {
      type: InputType;
    }
  }
> = { [key in keyof T]: MapInputTypeToInput[T[key]['type']] };

export type InputToPartialFullMapper<
  T extends {
    [key in keyof T]: {
      type: InputType;
    }
  }
> = { [key in keyof T]: MapInputTypeToPartialInput[T[key]['type']] };

export type InputToUpdateMapper<
  T extends {
    [key in keyof T]: {
      type: InputType;
    }
  }
> = { [key in keyof T]: MapTypeToUpdateType[T[key]['type']] };

export interface ValuesObject {
  [Key: string]: FormInput;
}
