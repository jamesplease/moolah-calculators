import _ from "lodash";
import { FormConfig } from "../../../vendor/form/types";

export default function normalizeConfig(config: FormConfig) {
  return _.mapValues(config, (configVal) => {
    let defaultValue = configVal.initialValue;
    if (configVal.type === "select" && typeof defaultValue === "undefined") {
      defaultValue = Array.isArray(configVal.values)
        ? configVal.values[0]
        : undefined;
    }

    return {
      ...configVal,
      initialValue: defaultValue,
    };
  });
}
