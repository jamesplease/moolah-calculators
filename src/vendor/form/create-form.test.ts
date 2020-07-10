import createForm from './create-form';

describe('createForm', () => {
  describe('no inputs', () => {
    it('return an object with the right shape', () => {
      const form = createForm({});
      expect(form).toHaveProperty('getState');
      expect(form).toHaveProperty('updateInputs');
      expect(form).toHaveProperty('subscribe');
      expect(form).toHaveProperty('reset');
    });

    it('works with getState', () => {
      const form = createForm({});
      expect(form.getState()).toEqual({
        inputs: {},
        isValid: true,
      });
    });
  });

  describe('with inputs', () => {
    it('works', () => {
      const form = createForm({
        name: {
          type: 'string',
          initialValue: 'james',
        },
      });

      const formState = form.getState();
      expect(formState.isValid).toBe(true);
      expect(formState.inputs.name).toEqual(
        expect.objectContaining({
          type: 'string',
          initialValue: 'james',
          value: 'james',
          dirty: false,
          touched: false,
          error: undefined,
        })
      );
    });

    it('supports all input types', () => {
      const form = createForm({
        name: {
          type: 'string',
          initialValue: 'james',
        },
        age: {
          type: 'number',
          initialValue: 60,
        },
        size: {
          type: 'select',
          values: ['s', 'm', 'l'],
          initialValue: 'm',
        },
        verified: {
          type: 'checkbox',
          initialValue: true,
        },
      });

      const state = form.getState();
      expect(state.inputs.name).toEqual(
        expect.objectContaining({
          type: 'string',
          initialValue: 'james',
          value: 'james',
          dirty: false,
          touched: false,
          error: undefined,
        })
      );

      expect(state.inputs.age).toEqual(
        expect.objectContaining({
          type: 'number',
          initialValue: 60,
          value: '60',
          dirty: false,
          touched: false,
          error: undefined,
        })
      );

      expect(state.inputs.size).toEqual(
        expect.objectContaining({
          type: 'select',
          initialValue: 'm',
          value: 'm',
          dirty: false,
          touched: false,
          error: undefined,
        })
      );

      expect(state.inputs.verified).toEqual(
        expect.objectContaining({
          type: 'checkbox',
          initialValue: true,
          checked: true,
          dirty: false,
          touched: false,
          error: undefined,
        })
      );
    });

    it('returns the right props', () => {
      const form = createForm({
        name: {
          type: 'string',
          initialValue: 'james',
        },
      });
      const formState = form.getState();
      const props = formState.inputs.name.getProps({
        id: 'yes',
      });

      expect(props.id).toBe('yes');
      expect(typeof props.onChange).toBe('function');
      expect(typeof props.onBlur).toBe('function');
    });

    it('props.onChange works as expected for strings', () => {
      const form = createForm({
        name: {
          type: 'string',
          initialValue: 'james',
        },
      });
      const formState = form.getState();
      const customOnBlur = jest.fn();
      const customOnChange = jest.fn();
      const props = formState.inputs.name.getProps({
        id: 'yes',
        onBlur: customOnBlur,
        onChange: customOnChange,
      });

      expect(customOnBlur).toHaveBeenCalledTimes(0);
      expect(customOnChange).toHaveBeenCalledTimes(0);
      props.onChange({
        target: {
          value: 'james2',
        },
      });
      expect(customOnBlur).toHaveBeenCalledTimes(0);
      expect(customOnChange).toHaveBeenCalledTimes(1);

      const formState2 = form.getState();
      expect(formState2).not.toBe(formState);
      expect(formState2.inputs.name).toEqual(
        expect.objectContaining({
          type: 'string',
          initialValue: 'james',
          value: 'james2',
          dirty: true,
          touched: false,
          error: undefined,
        })
      );
    });

    it('props.onBlur works as expected for strings', () => {
      const form = createForm({
        name: {
          type: 'string',
          initialValue: 'james',
        },
      });
      const formState = form.getState();
      const customOnBlur = jest.fn();
      const customOnChange = jest.fn();
      const props = formState.inputs.name.getProps({
        id: 'yes',
        onBlur: customOnBlur,
        onChange: customOnChange,
      });

      expect(customOnBlur).toHaveBeenCalledTimes(0);
      expect(customOnChange).toHaveBeenCalledTimes(0);
      props.onBlur({
        target: {},
      });
      expect(customOnBlur).toHaveBeenCalledTimes(1);
      expect(customOnChange).toHaveBeenCalledTimes(0);

      const formState2 = form.getState();
      expect(formState2).not.toBe(formState);
      expect(formState2.inputs.name).toEqual(
        expect.objectContaining({
          type: 'string',
          initialValue: 'james',
          value: 'james',
          dirty: false,
          touched: true,
          error: undefined,
        })
      );
    });
  });

  describe('updateInputs', () => {
    it('works', () => {
      const form = createForm({
        name: {
          type: 'string',
          initialValue: 'james',
        },
      });

      const formState = form.getState();
      expect(formState.inputs.name).toEqual(
        expect.objectContaining({
          type: 'string',
          initialValue: 'james',
          value: 'james',
          dirty: false,
          touched: false,
          error: undefined,
        })
      );

      form.updateInputs({
        name: 'james2',
      });

      const formState2 = form.getState();
      expect(formState2).not.toBe(formState);
      expect(formState2.inputs.name).toEqual(
        expect.objectContaining({
          type: 'string',
          initialValue: 'james',
          value: 'james2',
          dirty: false,
          touched: false,
          error: undefined,
        })
      );
    });
  });

  describe('subscribe', () => {
    it('works when the form is reset', () => {
      const form = createForm({});
      const listener = jest.fn();

      // Create our listener
      const unsubscribe = form.subscribe(listener);
      expect(listener).toHaveBeenCalledTimes(0);

      // Change the form
      form.reset();
      expect(listener).toHaveBeenCalledTimes(1);

      // Unsubscribe
      unsubscribe();
      form.reset();
      expect(listener).toHaveBeenCalledTimes(1);

      // Multiple unsubscribes
      unsubscribe();
      form.reset();
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });
});
