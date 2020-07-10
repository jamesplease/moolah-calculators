import { useState, useEffect, useMemo } from 'react';
import createForm from './create-form';
import { EnsureFormConfig, UseFormState } from './types';

export default function useForm<K extends EnsureFormConfig<K>>(formConfig: K) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const form = useMemo(() => createForm(formConfig), []);

  function formToState(): UseFormState<K> {
    const { inputs, isValid } = form.getState();

    return {
      inputs,
      isValid,
      updateInputsInternal: form.updateInputsInternal,
      updateInputs: form.updateInputs,
      reset: form.reset,
    };
  }

  const [formState, setFormState] = useState(() => formToState());

  useEffect(() => {
    const unsuscribe = form.subscribe(() => setFormState(formToState()));
    return () => unsuscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return formState;
}
