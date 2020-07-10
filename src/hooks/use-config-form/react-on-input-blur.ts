import _ from 'lodash';
import { StringInputValue, ValuesObject } from '../../vendor/form/types';

interface ReactOnInputBlurOptions {
  inputs: ValuesObject;
  // TODO: make keyof K.
  // Also refactor the String() usage below
  id: string | number | symbol;
  updateInputs: any;
  // Blur only occurs on inputs, which is only ever string values
  prevValidValue: StringInputValue;
  onPersist: () => void;
}

// This small function does two things:
//   1. reverts us to the previous valid value when the input is invalid
//   2. provides a callback to persist the value when it is valid
//
// It is sort of like a "Submit" button functionality for the forms in this app.
export default function reactOnInputBlur({
  inputs,
  updateInputs,
  prevValidValue,
  id,
  onPersist,
}: ReactOnInputBlurOptions) {
  const error = _.get(inputs, `${String(id)}.error`);
  const isValid = typeof error === 'undefined';

  if (!isValid) {
    updateInputs({ [id]: prevValidValue });
  } else {
    onPersist();
  }
}
