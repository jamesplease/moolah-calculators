import { EnsureFormConfig } from './config';
import {
  ConfigToInputMapper,
  InputToUpdateMapper,
  InputToPartialFullMapper,
} from './internal';

export type Listener = () => void;

export interface FormState<K> {
  inputs: K;
  isValid: boolean;
}

export type UpdateInputsFn<K extends EnsureFormConfig<K>> = (
  update: Partial<InputToUpdateMapper<K>>
) => void;

export interface Form<K extends EnsureFormConfig<K>> {
  reset: () => void;
  subscribe: (listener: Listener) => () => void;
  getState: () => FormState<K>;
  updateInputsInternal: UpdateInputsInternal<K>;
  updateInputs: UpdateInputsFn<K>;
}

export interface UseFormState<K extends EnsureFormConfig<K>> {
  inputs: ConfigToInputMapper<K>;
  isValid: boolean;
  updateInputs: UpdateInputsFn<K>;
  updateInputsInternal: UpdateInputsInternal<K>;
  reset: () => void;
}

export type GetInputs<
  K extends EnsureFormConfig<K>
> = () => ConfigToInputMapper<K>;

export type Updater<K extends EnsureFormConfig<K>> =
  | Partial<InputToPartialFullMapper<K>>
  | ((
      form: FormState<ConfigToInputMapper<K>>
    ) => Partial<InputToPartialFullMapper<K>>);

export type UpdateInputsInternal<K extends EnsureFormConfig<K>> = (
  updater: Updater<K>
) => void;
