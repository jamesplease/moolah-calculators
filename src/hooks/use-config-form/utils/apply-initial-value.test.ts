import applyInitialValue from './apply-initial-value';

describe('rawToFormInput', () => {
  it('should work', () => {
    const result = applyInitialValue(
      {
        name: {
          type: 'string',
          initialValue: '',
        },
        size: {
          type: 'number',
          initialValue: 20,
        },
        verified: {
          type: 'checkbox',
          initialValue: true,
        },
        type: {
          type: 'select',
        },
      },
      {
        name: 'james',
        size: 500,
      }
    );

    expect(result).toEqual({
      name: {
        type: 'string',
        initialValue: 'james',
        validators: undefined,
      },
      size: {
        type: 'number',
        initialValue: 500,
        validators: undefined,
      },
      verified: {
        type: 'checkbox',
        initialValue: true,
      },
      type: {
        type: 'select',
        initialValue: undefined,
      },
    });
  });
});
