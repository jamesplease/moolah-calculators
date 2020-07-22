import _ from "lodash";
import {
  CheckboxConfig,
  SelectConfig,
  StringConfig,
  NumberConfig,
  EnsureFormConfig,
  InputConfig,
} from "../../../vendor/form/types";

export default function applyInitialValue<K extends EnsureFormConfig<K>>(
  formConfig: K,
  rawValue?: any
): K {
  return (_.mapValues(formConfig, (val: InputConfig, key: keyof K) => {
    const initialValue =
      typeof rawValue !== "undefined" && typeof rawValue[key] !== "undefined"
        ? rawValue[key]
        : val.initialValue;

    if (val.type === "checkbox") {
      const result: CheckboxConfig = {
        type: "checkbox",
        initialValue,
      };

      return result;
    } else if (val.type === "select") {
      const result: SelectConfig = {
        type: "select",
        initialValue,
        values: val.values,
      };

      return result;
    } else if (val.type === "string") {
      const result: StringConfig = {
        type: "string",
        initialValue,
        // TODO: this could be a number of string object. We're simply
        // doing this so that we can access the validators object
        validators: val.validators,
      };

      return result;
    }

    const result: NumberConfig = {
      type: "number",
      initialValue,
      // TODO: this could be a number of string object. We're simply
      // doing this so that we can access the validators object
      validators: val.validators,
    };

    return result;
  }) as unknown) as K;
}
