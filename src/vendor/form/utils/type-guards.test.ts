import * as typeGuards from './type-guards';

describe('typeGuards', () => {
  describe('checkboxes', () => {
    it('works', () => {
      expect(
        typeGuards.inputIsCheckbox({
          type: 'checkbox',
          initialValue: false,
        })
      ).toBe(true);

      expect(
        typeGuards.inputIsCheckbox({
          type: 'number',
        })
      ).toBe(false);
    });
  });

  describe('numbers', () => {
    it('works', () => {
      expect(
        typeGuards.inputIsNumber({
          type: 'checkbox',
          initialValue: false,
        })
      ).toBe(false);

      expect(
        typeGuards.inputIsNumber({
          type: 'number',
        })
      ).toBe(true);
    });
  });

  describe('string', () => {
    it('works', () => {
      expect(
        typeGuards.inputIsString({
          type: 'checkbox',
          initialValue: false,
        })
      ).toBe(false);

      expect(
        typeGuards.inputIsString({
          type: 'string',
        })
      ).toBe(true);
    });
  });

  describe('select', () => {
    it('works', () => {
      expect(
        typeGuards.inputIsSelect({
          type: 'checkbox',
          initialValue: false,
        })
      ).toBe(false);

      expect(
        typeGuards.inputIsSelect({
          type: 'select',
          initialValue: {
            key: 'yes',
            value: 'yes',
          },
          values: [{ key: 'yes', value: 'yes' }],
        })
      ).toBe(true);
    });
  });
});
