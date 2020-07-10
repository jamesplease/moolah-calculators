import formatForDisplay from './format-for-display';

describe('formatForDisplay', () => {
  describe('defaults', () => {
    it('displays numbers "normally"', () => {
      expect(formatForDisplay(20)).toEqual('$20.00');
      expect(formatForDisplay(-20)).toEqual('-$20.00');
      expect(formatForDisplay(0)).toEqual('$0.00');
      expect(formatForDisplay(-0)).toEqual('$0.00');
      expect(formatForDisplay(100.1)).toEqual('$100.10');
      expect(formatForDisplay(23.5)).toEqual('$23.50');
      expect(formatForDisplay(10000.5)).toEqual('$10,000.50');
      expect(formatForDisplay(-10000.5)).toEqual('-$10,000.50');
    });

    it('does not display more than 2 decimals', () => {
      expect(formatForDisplay(23.5555)).toEqual('$23.56');
      expect(formatForDisplay(-23.5555)).toEqual('-$23.56');
    });
  });

  describe('digits', () => {
    it('displays numbers as expected', () => {
      expect(formatForDisplay(20, { digits: 0 })).toEqual('$20');
      expect(formatForDisplay(20, { digits: 3 })).toEqual('$20.000');
      expect(formatForDisplay(-20, { digits: 3 })).toEqual('-$20.000');
      expect(formatForDisplay(0, { digits: 3 })).toEqual('$0.000');
      expect(formatForDisplay(-0, { digits: 3 })).toEqual('$0.000');
      expect(formatForDisplay(100.1, { digits: 3 })).toEqual('$100.100');
      expect(formatForDisplay(23.5556, { digits: 3 })).toEqual('$23.556');
    });
  });

  describe('includeDollarSign', () => {
    it('allows you to turn off the dollar sign', () => {
      expect(formatForDisplay(20, { includeDollarSign: false })).toEqual(
        '20.00'
      );

      expect(formatForDisplay(-20, { includeDollarSign: false })).toEqual(
        '-20.00'
      );

      expect(
        formatForDisplay(20542, { digits: 0, includeDollarSign: false })
      ).toEqual('20,542');
    });
  });
});
