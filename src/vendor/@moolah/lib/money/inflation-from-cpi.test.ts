import inflationFromCpi from './inflation-from-cpi';

describe('inflationFromCpi', () => {
  it('returns the expected result', () => {
    expect(
      inflationFromCpi({
        startCpi: 0.5,
        endCpi: 2,
      })
    ).toEqual(4);

    expect(
      inflationFromCpi({
        startCpi: 5,
        endCpi: 0.25,
      })
    ).toEqual(0.05);
  });

  it('handles NaN', () => {
    expect(
      inflationFromCpi({
        // @ts-ignore
        startCpi: 'a',
        endCpi: 2,
      })
    ).toEqual(1);
  });
});
