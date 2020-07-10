import _ from "lodash";
import normalizeConfig from "./normalize-config";
import * as parseQueryParams from "./parse-query-params";
import { EnsureFormConfig } from "../../../vendor/form/types";
import { FormToStateMapper } from "../../../state/types";

export default function configFromLocation<
  Config extends EnsureFormConfig<Config>
>(location: Location, config: Config): FormToStateMapper<Config> {
  const normalizedConfig = normalizeConfig(config);

  const validOptions = Object.keys(normalizedConfig);
  const defaults = _.mapValues(normalizedConfig, (settingConfig) => {
    return settingConfig.initialValue;
  });

  return (
    _.chain(location)
      .get("query", {})
      // @ts-ignore
      .pick(validOptions)
      .mapValues((queryVal: string, queryKey: string) => {
        const settingConfig = normalizedConfig[queryKey];
        const parseFn = parseQueryParams[settingConfig.type];
        // TODO: I need to coerce settingConfig to the right type
        // based on settingConfig.type
        // @ts-ignore
        const parsedVal = parseFn(queryVal, settingConfig);

        return parsedVal;
      })
      .defaults(defaults)
      .value()
  );
}
