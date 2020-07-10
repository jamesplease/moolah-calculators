import computeInputErrors from './compute-input-errors';

describe('computeInputErrors', () => {
  it('ignores checkboxes', () => {
    const getProps = () => {};
    const result = computeInputErrors({
      verified: {
        type: 'checkbox',
        checked: false,
        initialValue: true,
        error: undefined,
        dirty: false,
        touched: false,
        getProps: getProps,
      },
    });

    expect(result).toEqual({
      verified: {
        type: 'checkbox',
        checked: false,
        initialValue: true,
        error: undefined,
        dirty: false,
        touched: false,
        getProps: getProps,
      },
    });
  });

  describe('no validators', () => {
    it('should return the same input', () => {
      const getProps = () => {};
      const result = computeInputErrors({
        name: {
          type: 'number',
          value: '20',
          initialValue: 20,
          error: undefined,
          dirty: false,
          touched: false,
          getProps: getProps,
        },
      });

      expect(result).toEqual({
        name: {
          type: 'number',
          value: '20',
          initialValue: 20,
          error: undefined,
          dirty: false,
          touched: false,
          getProps: getProps,
        },
      });
    });
  });

  describe('validators', () => {
    it('should return an error when the validator errors', () => {
      const getProps = () => {};
      const validators = [() => 'error'];
      const result = computeInputErrors({
        name: {
          type: 'number',
          value: '20',
          initialValue: 20,
          error: undefined,
          dirty: false,
          touched: false,
          getProps: getProps,
          validators,
        },
      });

      expect(result).toEqual({
        name: {
          type: 'number',
          value: '20',
          initialValue: 20,
          error: 'error',
          dirty: false,
          touched: false,
          getProps: getProps,
          validators,
        },
      });
    });

    it('does not set an error when validator returns undefined', () => {
      const getProps = () => {};
      const validators = [() => undefined];
      const result = computeInputErrors({
        name: {
          type: 'number',
          value: '20',
          initialValue: 20,
          error: undefined,
          dirty: false,
          touched: false,
          getProps: getProps,
          validators,
        },
      });

      expect(result).toEqual({
        name: {
          type: 'number',
          value: '20',
          initialValue: 20,
          error: undefined,
          dirty: false,
          touched: false,
          getProps: getProps,
          validators,
        },
      });
    });
  });
});
