import _ from 'lodash';
import parseInputValue from '../utils/parse-input-value';
import {
  InputProps,
  EnsureFormConfig,
  UpdateInputsInternal,
  InputToPartialFullMapper,
  GetInputs,
} from '../types';

export default function createGetProps<K extends EnsureFormConfig<K>>(
  isCheckbox: boolean,
  getInputs: GetInputs<K>,
  inputName: keyof K,
  updateInputsInternal: UpdateInputsInternal<K>
) {
  return function (props: InputProps = {}) {
    const valueKey = isCheckbox ? 'checked' : 'value';
    const defaultValue = isCheckbox ? false : '';

    const inputs = getInputs();
    const thisInput = _.get(inputs, inputName);
    const value = _.get(thisInput, valueKey, defaultValue);

    let currentValue: string | boolean | undefined;
    if (typeof value !== 'undefined') {
      // This ensures that we always coerce the value to the proper type
      // for the DOM
      currentValue = isCheckbox ? Boolean(value) : String(value);
    }

    return {
      ...props,
      disabled: thisInput.disabled,
      [valueKey]: currentValue,
      onChange(event: any) {
        const updatedValue = isCheckbox
          ? event.target.checked
          : event.target.value;

        const inputs = getInputs();
        const currentVal = inputs[inputName] || {};
        updateInputsInternal((currentState) => {
          const currentInput = currentState.inputs[inputName];
          // @ts-ignore
          const currentValue = currentInput[valueKey];
          const newValue = parseInputValue(updatedValue, currentVal.type);
          const dirty = currentInput.dirty ? true : newValue !== currentValue;

          return {
            [inputName]: {
              [valueKey]: newValue,
              dirty,
            },
          } as Partial<InputToPartialFullMapper<K>>;
        });

        if (props && typeof props.onChange === 'function') {
          props.onChange(event);
        }
      },
      onBlur(event: any) {
        const update = {
          [inputName]: {
            touched: true,
          },
        };
        updateInputsInternal(update as Partial<InputToPartialFullMapper<K>>);

        if (props && typeof props.onBlur === 'function') {
          props.onBlur(event);
        }
      },
    };
  };
}
