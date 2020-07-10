import createGetProps from './create-get-props';
import parseInputValue from '../utils/parse-input-value';
import {
  NumberInput,
  StringInput,
  SelectInput,
  CheckboxInput,
  BaseInput,
  InputConfig,
  EnsureFormConfig,
  SelectConfig,
  ConfigToInputMapper,
  UpdateInputsInternal,
  GetInputs,
} from '../types';
import * as typeGuards from '../utils/type-guards';

export default function computeInitial<K extends EnsureFormConfig<K>>(
  initialData: K,
  updateInputsInternal: UpdateInputsInternal<K>,
  getInputs: GetInputs<K>
): ConfigToInputMapper<K> {
  const result: ConfigToInputMapper<K> = {} as ConfigToInputMapper<K>;

  for (const inputName in initialData) {
    const val = initialData[inputName] as InputConfig;

    const isCheckbox = val.type === 'checkbox';

    // TODO: can I determine value based on the type that I pass in?
    const value = parseInputValue(val.initialValue, val.type);

    const sharedFullInputState: BaseInput = {
      error: undefined,
      dirty: false,
      touched: false,
      disabled: false,
      getProps: createGetProps<K>(
        isCheckbox,
        getInputs,
        inputName,
        updateInputsInternal
      ),
    };

    if (typeGuards.inputIsCheckbox(val)) {
      const returnValue: CheckboxInput = {
        ...sharedFullInputState,
        type: 'checkbox',
        // Can we automatically know that value is a boolean?
        checked: value as boolean,
        initialValue: val.initialValue,
      };

      // @ts-ignore
      result[inputName] = returnValue;
      continue;
    } else if (typeGuards.inputIsNumber(val)) {
      const returnValue: NumberInput = {
        ...sharedFullInputState,
        validators: val.validators,
        type: 'number',
        initialValue: val.initialValue,
        value: value as string,
      };

      // @ts-ignore
      result[inputName] = returnValue;
      continue;
    } else if (typeGuards.inputIsString(val)) {
      const returnValue: StringInput = {
        ...sharedFullInputState,
        type: 'string',
        validators: val.validators,
        initialValue: val.initialValue,
        value: value as string,
      };

      // @ts-ignore
      result[inputName] = returnValue;
      continue;
    }

    let valueToUse = val as SelectConfig;

    // @ts-ignore
    const stringToUse = typeof value === 'string' ? value : value.key;

    const returnValue: SelectInput = {
      ...sharedFullInputState,
      type: 'select',
      initialValue: valueToUse.initialValue,
      value: stringToUse,
      values: val.values,
    };

    // @ts-ignore
    result[inputName] = returnValue;
  }

  return result;
}
