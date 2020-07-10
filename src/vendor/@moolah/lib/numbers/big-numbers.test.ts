import * as bigNumbers from './big-numbers';

describe('bigNumbers', () => {
  it('is safe to use them', () => {
    expect(Number.isSafeInteger(bigNumbers.ONE_THOUSAND)).toBe(true);
    expect(Number.isSafeInteger(bigNumbers.ONE_MILLION)).toBe(true);
    expect(Number.isSafeInteger(bigNumbers.ONE_BILLION)).toBe(true);
    expect(Number.isSafeInteger(bigNumbers.ONE_TRILLION)).toBe(true);
    expect(Number.isSafeInteger(bigNumbers.ONE_QUADRILLION)).toBe(true);
  });
});
