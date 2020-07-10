import { useCallback } from "react";
import _ from "lodash";
import { useCurrentRef } from "core-hooks";
import { useForm } from "../../vendor/form";
import useUndo from "./hooks/undo-history";
import reactOnInputBlur from "./react-on-input-blur";
import { SelectConfig, EnsureFormConfig } from "../../vendor/form/types";

interface UseConfigFormOptions<K> {
  formConfig: K;
  useSourceOfTruth: any;
}

// This manages the interplay between form state (which can be invalid...it is whatever the user has
// typed in), and the "source of truth" state that's in context, which is what the results are always
// based off of.

export default function useConfigForm<K extends EnsureFormConfig<K>>({
  formConfig,
  useSourceOfTruth,
}: UseConfigFormOptions<K>) {
  // This is the state that's stored in context. The values in context are ultimately
  // what are used in the calculation.
  // Also, note that state is instantiated with the values pulled from the query params
  // on page load.
  // These are then passed to `applyInitialValue` to set the input values with those
  // query param values.
  const { state, setState } = useSourceOfTruth();

  const { addReverseAction } = useUndo();
  const { inputs, updateInputs } = useForm<K>(formConfig);

  const inputsRef = useCurrentRef(inputs);
  const stateRef = useCurrentRef(state);

  // Should there be an onChange for each kind of select? Probably, why not?
  const changeSelect = useCallback(
    (id: keyof K, e: React.ChangeEvent<HTMLSelectElement>) => {
      // @ts-ignore
      const prevValidValue = stateRef.current[id];
      const inputObject = formConfig[id] as SelectConfig;

      const { value } = e.target;
      const valueObject = _.find(inputObject.values, { key: value });

      if (prevValidValue === valueObject) {
        return;
      }

      addReverseAction(() => {
        // @ts-ignore
        updateInputs({ [id]: prevValidValue.key });
        setState({ [id]: prevValidValue });
      });

      // This is a select, so the value is also valid. We set the form AND update the "source of truth" state used in
      // the calculation.
      // @ts-ignore
      updateInputs({ [id]: value });
      setState({ [id]: valueObject });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const changeCheckbox = useCallback(
    (id: keyof K, e: React.ChangeEvent<HTMLInputElement>) => {
      // @ts-ignore
      const prevValidValue = stateRef.current[id];
      const { checked } = e.target;

      if (prevValidValue === checked) {
        return;
      }

      addReverseAction(() => {
        // @ts-ignore
        updateInputs({ [id]: prevValidValue });
        setState({ [id]: prevValidValue });
      });

      // This is a select, so the value is also valid. We set the form AND update the "source of truth" state used in
      // the calculation.
      // @ts-ignore
      updateInputs({ [id]: checked });
      setState({ [id]: checked });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const commitInput = useCallback((id: keyof K, newValue) => {
    // @ts-ignore
    const prevValidValue = stateRef.current[id];

    const isNumber = formConfig[id]?.type === "number";
    const stringPreviousValidValue = isNumber
      ? String(prevValidValue)
      : newValue;
    const parsedNewValue = isNumber ? Number(newValue) : newValue;

    // If the value has not changed, then we do not need to take any action
    if (newValue === stringPreviousValidValue) {
      return;
    }

    reactOnInputBlur({
      id,
      prevValidValue: stringPreviousValidValue,
      inputs: inputsRef.current,
      updateInputs,
      onPersist() {
        addReverseAction(() => {
          // @ts-ignore
          updateInputs({ [id]: stringPreviousValidValue });

          setState({
            [id]: prevValidValue,
          });
        });

        setState({
          [id]: parsedNewValue,
        });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getProps(inputName: keyof K, otherProps: any) {
    const input = inputsRef.current[inputName];
    const isCheckbox = input.type === "checkbox";
    const valueKey = isCheckbox ? "checked" : "value";
    const props = input.getProps();

    function commit() {
      const input = inputsRef.current[inputName];
      // @ts-ignore
      commitInput(inputName, input[valueKey]);
    }

    return {
      ...props,
      ...otherProps,
      onBlur(e: any) {
        commit();

        props.onBlur(e);
      },
      onKeyDown(event: any) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          commit();
        }
      },
    };
  }

  return {
    state,
    setState,
    addReverseAction,
    inputs,
    updateInputs,
    inputsRef,
    stateRef,
    changeSelect,
    changeCheckbox,
    commitInput,
    getProps,
  };
}
