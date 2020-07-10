import isFormValid from './is-form-valid';

describe('isFormValid', () => {
  it('should return true when form is valid', () => {
    expect(
      isFormValid({
        name: {
          type: 'number',
          value: '20',
          initialValue: 20,
          error: undefined,
          dirty: false,
          touched: false,
          getProps() {},
        },
      })
    ).toBe(true);
  });

  it('should return false when form is invalid', () => {
    expect(
      isFormValid({
        name: {
          type: 'number',
          value: '20',
          initialValue: 20,
          error: 'tooSmall',
          dirty: false,
          touched: false,
          getProps() {},
        },
      })
    ).toBe(false);
  });
});
