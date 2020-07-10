import { InputValue, InputType, SelectValueObject } from '../types';

export default function parseInputValue(
  // TODO: properly handle SelectValueObject
  val: InputValue | SelectValueObject,
  type: InputType
): InputValue {
  if (typeof val === 'undefined') {
    return undefined;
  }

  // This is to avoid a situation where, for example, Number('') => 0
  // TODO: verify this is appropriate for booleans, enums?
  if (typeof val === 'string' && !val.length) {
    if (type === 'checkbox') {
      return false;
    }

    return type === 'string' ? '' : undefined;
  }

  if (type === 'checkbox') {
    return Boolean(val);
  } else if (type === 'string') {
    return String(val);
  } else if (type === 'number') {
    return String(val);
  }
  // TODO: handle selects that are numbers
  else {
    // Type guard this
    if (typeof val === 'string') {
      return String(val);
    } else {
      // @ts-ignore
      return val.key;
    }
  }
}
