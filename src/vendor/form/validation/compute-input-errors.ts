import _ from 'lodash';
import {
  EnsureFormConfig,
  ValidatorReturn,
  FormInput,
  ConfigToInputMapper,
} from '../types';
import * as typeGuards from '../utils/type-guards';

export default function computeInputErrors<K extends EnsureFormConfig<K>>(
  inputs: ConfigToInputMapper<K>
): ConfigToInputMapper<K> {
  type FullInputs = ConfigToInputMapper<K>;

  const result = _.mapValues(
    inputs,
    (inputObj: FormInput): FormInput => {
      if (
        typeGuards.inputIsCheckbox(inputObj) ||
        typeGuards.inputIsSelect(inputObj)
      ) {
        return inputObj;
      }

      const validationFns = inputObj.validators;
      const value = inputObj.value;

      let validationError: ValidatorReturn;

      if (!inputObj.disabled && Array.isArray(validationFns)) {
        for (const validator of validationFns) {
          const possibleError = validator(value, inputs);

          if (possibleError) {
            validationError = possibleError;
            break;
          }
        }
      }

      if (!validationError) {
        return { ...inputObj, error: undefined };
      }

      return {
        ...inputObj,
        error: validationError,
      };
    }
  );

  return result as FullInputs;
}
