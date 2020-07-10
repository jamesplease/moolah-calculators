import { EnsureFormConfig, ConfigToInputMapper } from '../types';

export default function isFormValid<K extends EnsureFormConfig<K>>(
  inputs: ConfigToInputMapper<K>
): boolean {
  for (const property in inputs) {
    const val = inputs[property];

    if (val.error) {
      return false;
    }
  }

  return true;
}
