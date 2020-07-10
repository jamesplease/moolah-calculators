import { InputType, SelectValueObject } from "../vendor/form/types";

interface MapFormTypeToStateType {
  checkbox: boolean;
  number: number;
  string: string;
  select: SelectValueObject;
}

export type FormToStateMapper<
  T extends {
    [key in keyof T]: {
      type: InputType;
    };
  }
> = { [key in keyof T]: MapFormTypeToStateType[T[key]["type"]] };

// This is a generic utility used for state mgmt in this app
export type Mapper<
  T extends { [key in keyof T]: { [key2 in keyof T[key]]: any } },
  V extends keyof T[keyof T]
> = { [key in keyof T]: T[key][V] };
