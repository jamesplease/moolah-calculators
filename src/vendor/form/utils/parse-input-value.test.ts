import parseInputValue from './parse-input-value';

describe('parseInputValue', () => {
  describe('strings', () => {
    it('handles undefined', () => {
      expect(parseInputValue(undefined, 'string')).toEqual(undefined);
    });

    it('handles empty string', () => {
      expect(parseInputValue('', 'string')).toEqual('');
    });

    it('handles strings', () => {
      expect(parseInputValue('hello', 'string')).toEqual('hello');
      expect(parseInputValue('2', 'string')).toEqual('2');
    });

    it('handles a number', () => {
      expect(parseInputValue(2, 'string')).toEqual('2');
    });
  });

  describe('checkboxes', () => {
    it('handles undefined', () => {
      expect(parseInputValue(undefined, 'checkbox')).toEqual(undefined);
    });

    it('handles true', () => {
      expect(parseInputValue(true, 'checkbox')).toEqual(true);
    });

    it('handles false', () => {
      expect(parseInputValue(false, 'checkbox')).toEqual(false);
    });

    it('handles falsey values', () => {
      expect(parseInputValue(0, 'checkbox')).toEqual(false);
      expect(parseInputValue('', 'checkbox')).toEqual(false);
    });

    it('handles truthy values', () => {
      expect(parseInputValue(1, 'checkbox')).toEqual(true);
      expect(parseInputValue('hello', 'checkbox')).toEqual(true);
    });
  });

  describe('numbers', () => {
    it('handles empty strings', () => {
      expect(parseInputValue('', 'number')).toEqual(undefined);
    });

    it('handles undefined', () => {
      expect(parseInputValue(undefined, 'number')).toEqual(undefined);
    });

    it('handles numbers', () => {
      expect(parseInputValue(0, 'number')).toEqual('0');
      expect(parseInputValue(-20, 'number')).toEqual('-20');
    });

    it('handles numeric strings', () => {
      expect(parseInputValue('0', 'number')).toEqual('0');
      expect(parseInputValue('100', 'number')).toEqual('100');
      expect(parseInputValue('-100', 'number')).toEqual('-100');
      expect(parseInputValue('500.25', 'number')).toEqual('500.25');
    });

    // This is an important behavior for the input interaction.
    // Consider an input of 10,000 that the user wishes to change to 20,000
    // The simplest way to do this is to delete the "1" and replace it with a "2".
    // If strings were parsed as actual numbers, then long strings of zeros would collapse to `0`,
    // and the user would be frustrated.
    it('handles long strings of zeros', () => {
      expect(parseInputValue('00000', 'number')).toEqual('00000');
    });

    // Consider this test a description of the behavior rather than a prescription. I'm not sure
    // what's best.
    it('handles invalid values', () => {
      expect(parseInputValue('hello', 'number')).toEqual('hello');
    });
  });

  describe('select', () => {
    it('handles strings', () => {
      expect(parseInputValue('hello', 'select')).toEqual('hello');
      expect(parseInputValue('2', 'select')).toEqual('2');
    });

    it('handles undefined', () => {
      expect(parseInputValue(undefined, 'select')).toEqual(undefined);
    });
  });
});
