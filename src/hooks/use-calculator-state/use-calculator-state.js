import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import configFromLocation from "./config-from-location/config-from-location";
import createSetter from "./create-setter";

export default function useCalculatorState(formConfig) {
  // TODO: useConstant
  const setterConfig = _.mapValues(formConfig, (val) => {
    return val.type;
  });

  const location = useLocation();

  // This is where we load the default values for this form from the query parameters.
  // Any matching values are set on the state.
  // These are then synced to the form in `useCommitForm`
  const defaultValues = useMemo(() => {
    return configFromLocation(location, formConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, naiveSetState] = useState(defaultValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setState = useMemo(() => createSetter(naiveSetState, setterConfig), []);

  return { state, setState };
}
