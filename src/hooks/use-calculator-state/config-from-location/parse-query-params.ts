import _ from "lodash";
import {
  SelectConfig,
  NumberConfig,
  CheckboxConfig,
  StringConfig,
} from "../../../vendor/form/types";
const falseMap = ["0", "false", "fals", "f", "no"];

type QueryParamValue = string | undefined;

export function checkbox(val: QueryParamValue, settingConfig: CheckboxConfig) {
  if (typeof val !== "undefined" && falseMap.includes(val)) {
    return false;
  } else {
    return true;
  }
}

export function number(val: QueryParamValue, settingConfig: NumberConfig) {
  const possibleValue = Number(val);

  if (Number.isNaN(possibleValue)) {
    return settingConfig.initialValue || null;
  }

  return Number(possibleValue);
}

export function string(val: QueryParamValue, settingConfig: StringConfig) {
  return val;
}

export function select(val: QueryParamValue, settingConfig: SelectConfig) {
  const values = settingConfig.values || [];

  return (
    _.find(values, {
      key: val,
    }) || settingConfig.initialValue
  );

  // const simpleValues = values.map(v => {
  //   if (typeof v === 'object') {
  //     return v.value;
  //   } else {
  //     return v;
  //   }
  // });

  // if (typeof val === 'string' && simpleValues.includes(val)) {
  //   return val;
  // } else {
  //   return settingConfig.initialValue;
  // }
}
