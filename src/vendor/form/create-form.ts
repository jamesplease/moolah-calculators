import createInitialState from './initial-state/get-initial-state';
import isFormValid from './validation/is-form-valid';
import computeInputErrors from './validation/compute-input-errors';
import {
  EnsureFormConfig,
  ConfigToInputMapper,
  InputToUpdateMapper,
  Listener,
  Form,
  FormState,
  GetInputs,
  UpdateInputsInternal,
  UpdateInputsFn,
} from './types';

export default function createForm<K extends EnsureFormConfig<K>>(
  formConfig: K
): Form<ConfigToInputMapper<K>> {
  type inputKeys = keyof K;
  // The inputs that are returned
  type FullInputs = ConfigToInputMapper<K>;
  // This is what an update would be like if the entire form were updated at once
  type CompleteUpdateObject = InputToUpdateMapper<K>;
  // This is the argument you can pass to updateInputs
  type UpdateObject = Partial<CompleteUpdateObject>;

  let listeners: Listener[] = [];

  function onUpdate() {
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function subscribe(listener: Listener) {
    listeners.push(listener);

    let subscribed = true;

    return function unsubscribe() {
      if (!subscribed) {
        return;
      }

      subscribed = false;

      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  let currentForm: FormState<FullInputs> = {
    inputs: {} as ConfigToInputMapper<K>,
    isValid: true,
  };

  function getState() {
    return currentForm;
  }

  const getInputs: GetInputs<K> = () => {
    return currentForm.inputs;
  };

  function setInputs(rawInputs: FullInputs) {
    const inputsWithErrors = computeInputErrors(rawInputs);
    const isValid = isFormValid(inputsWithErrors);

    currentForm = {
      inputs: inputsWithErrors,
      isValid,
    };

    onUpdate();
  }

  const updateInputsInternal: UpdateInputsInternal<K> = (updateFn) => {
    const latestForm = getState();
    const update =
      typeof updateFn === 'function' ? updateFn(latestForm) : updateFn;
    let updatedInputs: any = {};

    for (const inputName in update) {
      const currentInput = latestForm.inputs[inputName as inputKeys];
      const updatedInput = update[inputName];

      updatedInputs[inputName] = {
        ...currentInput,
        ...updatedInput,
      };
    }

    const newInputs = {
      ...currentForm.inputs,
      ...updatedInputs,
    };

    setInputs(newInputs);
  };

  const unvalidatedInputs = createInitialState(
    formConfig,
    updateInputsInternal,
    getInputs
  );

  const initialInputs = computeInputErrors(unvalidatedInputs);

  const initialState = {
    inputs: initialInputs,
    isValid: isFormValid(initialInputs),
  };

  function reset() {
    currentForm = initialState;
    onUpdate();
  }

  const updateInputs: UpdateInputsFn<K> = (update: UpdateObject = {}) => {
    const latestForm = getState();
    let updatedInputs: FullInputs = {} as FullInputs;

    for (const inputName in update) {
      const currentInput = latestForm.inputs[inputName];
      const updatedInput = update[inputName];
      const key = currentInput.type === 'checkbox' ? 'checked' : 'value';

      updatedInputs[inputName] = {
        ...currentInput,
        [key]: updatedInput,
      };
    }

    const newInputs = {
      ...currentForm.inputs,
      ...updatedInputs,
    };

    setInputs(newInputs);
  };

  currentForm = initialState;

  return {
    getState,
    updateInputs,
    updateInputsInternal,
    reset,
    subscribe,
  };
}
